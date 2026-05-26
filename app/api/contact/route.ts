import { CONTACT_INBOX_EMAIL } from "@/lib/site-config"
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

type ContactPayload = {
  nombre?: string
  email?: string
  telefono?: string
  mensaje?: string
  tipo?: string
  cantidad?: number
  tipoDocumento?: string
  numero?: string
  nacionalidad?: string
  profesion?: string
  esParaMi?: boolean
}

function buildHtml(data: ContactPayload) {
  const rows = Object.entries(data)
    .filter(([, v]) => v !== undefined && v !== "")
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 12px;font-weight:600;color:#334155;">${k}</td><td style="padding:8px 12px;">${String(v)}</td></tr>`,
    )
    .join("")

  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;">
      <h2 style="color:#F97316;">Nuevo mensaje — EurekAI Bootcamp</h2>
      <table style="border-collapse:collapse;width:100%;">${rows}</table>
    </div>
  `
}

async function sendViaSmtp(data: ContactPayload) {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT ?? "587")
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const to = process.env.CONTACT_EMAIL_TO ?? CONTACT_INBOX_EMAIL

  if (!host || !user || !pass) return false

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  })

  const tipo = data.tipo ?? "contacto"
  const subject =
    tipo === "inscripcion_grupal"
      ? `Inscripción grupal bootcamp: ${data.nombre}`
      : tipo === "info"
        ? `Más información bootcamp: ${data.nombre}`
        : `Contacto web EurekAI: ${data.nombre}`

  await transporter.sendMail({
    from: `"EurekAI Web" <${user}>`,
    to,
    replyTo: data.email,
    subject,
    html: buildHtml(data),
    text: JSON.stringify(data, null, 2),
  })

  return true
}

async function sendViaResend(data: ContactPayload) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) return false

  const from = process.env.RESEND_FROM ?? "EurekAI <onboarding@resend.dev>"
  const n = data.nombre ?? ""
  const tipo = data.tipo ?? "contacto"
  const subject =
    tipo === "inscripcion_grupal"
      ? `Inscripción grupal bootcamp: ${n}`
      : tipo === "info"
        ? `Más información bootcamp: ${n}`
        : `Contacto web EurekAI: ${n}`

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [CONTACT_INBOX_EMAIL],
      reply_to: data.email,
      subject,
      text: JSON.stringify(data, null, 2),
    }),
  })

  return res.ok
}

async function sendViaFormSubmit(data: ContactPayload) {
  const n = data.nombre ?? ""
  const e = data.email ?? ""
  const t = data.telefono ?? ""
  const m = data.mensaje ?? JSON.stringify(data)

  const ajaxUrl = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_INBOX_EMAIL)}`
  const res = await fetch(ajaxUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: `Contacto EurekAI: ${n}`,
      _captcha: "false",
      _template: "table",
      ...data,
      nombre: n,
      email: e,
      telefono: t,
      mensaje: m,
    }),
  })

  return res.ok
}

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 })
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 })
  }

  const data = body as ContactPayload
  const n = typeof data.nombre === "string" ? data.nombre.trim() : ""
  const e = typeof data.email === "string" ? data.email.trim() : ""
  const t = typeof data.telefono === "string" ? data.telefono.trim() : ""
  const tipo = typeof data.tipo === "string" ? data.tipo : "contacto"

  if (!n || !e || !t) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 })
  }

  if (tipo === "info" || tipo === "contacto") {
    const m = typeof data.mensaje === "string" ? data.mensaje.trim() : ""
    if (!m) {
      return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 })
    }
    data.mensaje = m
  }

  if (tipo === "inscripcion_grupal") {
    const required = ["tipoDocumento", "numero", "nacionalidad", "profesion"] as const
    for (const key of required) {
      const val = data[key]
      if (typeof val !== "string" || !val.trim()) {
        return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 })
      }
    }
    if (!data.cantidad || data.cantidad < 2) {
      return NextResponse.json({ ok: false, error: "invalid_cantidad" }, { status: 400 })
    }
  }

  try {
    if (await sendViaSmtp(data)) {
      return NextResponse.json({ ok: true })
    }
    if (await sendViaResend(data)) {
      return NextResponse.json({ ok: true })
    }
    if (await sendViaFormSubmit(data)) {
      return NextResponse.json({ ok: true })
    }
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 })
  }
}
