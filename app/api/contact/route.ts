import { saveLead } from "@/lib/leads-db"
import { CONTACT_INBOX_EMAIL } from "@/lib/site-config"
import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

type ContactPayload = {
  nombre?: string
  email?: string
  telefono?: string
  mensaje?: string
  tipo?: string
  curso?: string
  empresa?: string
  participantes?: string
  origen?: string
  cantidad?: number
  tipoDocumento?: string
  numero?: string
  nacionalidad?: string
  profesion?: string
  esParaMi?: boolean
  metadata?: Record<string, unknown>
  fecha?: string
  hora?: string
}

const EMAIL_LABELS: Record<string, string> = {
  nombre: "Nombre",
  email: "Correo",
  telefono: "Teléfono",
  mensaje: "Mensaje",
  tipo: "Tipo de solicitud",
  curso: "Curso",
  empresa: "Empresa",
  participantes: "Participantes",
  origen: "Origen",
  fecha: "Fecha solicitada",
  hora: "Hora solicitada",
  cantidad: "Cantidad",
  tipoDocumento: "Tipo de documento",
  numero: "Número de documento",
  nacionalidad: "Nacionalidad",
  profesion: "Profesión",
  esParaMi: "Es para mí",
}

function flattenForEmail(data: ContactPayload): Record<string, string> {
  const out: Record<string, string> = {}

  for (const [key, value] of Object.entries(data)) {
    if (key === "metadata") continue
    if (value === undefined || value === "") continue
    out[key] = String(value)
  }

  if (data.metadata && typeof data.metadata === "object") {
    for (const [key, value] of Object.entries(data.metadata)) {
      if (value === undefined || value === "") continue
      out[key] = String(value)
    }
  }

  return out
}

function emailSubject(data: ContactPayload) {
  const tipo = data.tipo ?? "contacto"
  const n = data.nombre ?? ""

  if (tipo === "inscripcion_grupal") return `Inscripción grupal bootcamp: ${n}`
  if (tipo === "info") return `Más información: ${n}${data.curso ? ` — ${data.curso}` : ""}`
  if (tipo === "agenda") {
    const slot = data.fecha && data.hora ? ` — ${data.fecha} ${data.hora}` : ""
    return `Agendar reunión: ${n}${slot}`
  }
  return `Contacto web EurekAI: ${n}`
}

function buildHtml(data: ContactPayload) {
  const flat = flattenForEmail(data)
  const tipo = data.tipo ?? "contacto"
  const title =
    tipo === "agenda"
      ? "Nueva solicitud de reunión — EurekAI"
      : tipo === "inscripcion_grupal"
        ? "Nueva inscripción grupal — EurekAI"
        : "Nuevo mensaje — EurekAI"

  const priorityKeys =
    tipo === "agenda" ? ["fecha", "hora", "nombre", "email", "telefono", "mensaje", "origen"] : []
  const orderedKeys = [
    ...priorityKeys.filter((k) => k in flat),
    ...Object.keys(flat).filter((k) => !priorityKeys.includes(k)),
  ]

  const rows = orderedKeys
    .map((key) => {
      const label = EMAIL_LABELS[key] ?? key
      return `<tr><td style="padding:8px 12px;font-weight:600;color:#334155;white-space:nowrap;">${label}</td><td style="padding:8px 12px;">${flat[key]}</td></tr>`
    })
    .join("")

  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:560px;">
      <h2 style="color:#F97316;">${title}</h2>
      <table style="border-collapse:collapse;width:100%;">${rows}</table>
    </div>
  `
}

function buildText(data: ContactPayload) {
  const flat = flattenForEmail(data)
  return Object.entries(flat)
    .map(([key, value]) => `${EMAIL_LABELS[key] ?? key}: ${value}`)
    .join("\n")
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
  const subject = emailSubject(data)

  await transporter.sendMail({
    from: `"EurekAI Web" <${user}>`,
    to,
    replyTo: data.email,
    subject,
    html: buildHtml(data),
    text: buildText(data),
  })

  return true
}

async function sendViaResend(data: ContactPayload) {
  const resendKey = process.env.RESEND_API_KEY
  if (!resendKey) return false

  const from = process.env.RESEND_FROM ?? "EurekAI <onboarding@resend.dev>"
  const n = data.nombre ?? ""
  const subject = emailSubject(data)

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [process.env.CONTACT_EMAIL_TO ?? CONTACT_INBOX_EMAIL],
      reply_to: data.email,
      subject,
      html: buildHtml(data),
      text: buildText(data),
    }),
  })

  return res.ok
}

async function sendViaFormSubmit(data: ContactPayload) {
  const flat = flattenForEmail(data)
  const n = data.nombre ?? ""
  const e = data.email ?? ""
  const t = data.telefono ?? ""
  const m = data.mensaje ?? buildText(data)

  const ajaxUrl = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_INBOX_EMAIL)}`
  const res = await fetch(ajaxUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      _subject: emailSubject(data),
      _captcha: "false",
      _template: "table",
      ...flat,
      nombre: n,
      email: e,
      telefono: t,
      mensaje: m,
    }),
  })

  return res.ok
}

async function persistLead(data: ContactPayload) {
  const extra: Record<string, unknown> = {}
  if (data.cantidad) extra.cantidad = data.cantidad
  if (data.tipoDocumento) extra.tipoDocumento = data.tipoDocumento
  if (data.numero) extra.numero = data.numero
  if (data.nacionalidad) extra.nacionalidad = data.nacionalidad
  if (data.profesion) extra.profesion = data.profesion
  if (data.esParaMi !== undefined) extra.esParaMi = data.esParaMi
  if (data.metadata && typeof data.metadata === "object") {
    Object.assign(extra, data.metadata)
  }
  if (typeof data.fecha === "string" && data.fecha.trim()) extra.fecha = data.fecha.trim()
  if (typeof data.hora === "string" && data.hora.trim()) extra.hora = data.hora.trim()

  await saveLead({
    nombre: data.nombre!,
    email: data.email!,
    telefono: data.telefono!,
    mensaje: data.mensaje ?? null,
    tipo: data.tipo ?? "contacto",
    curso: data.curso ?? null,
    empresa: data.empresa ?? null,
    participantes: data.participantes ?? null,
    origen: data.origen ?? null,
    metadata: Object.keys(extra).length ? extra : undefined,
  })
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

  data.nombre = n
  data.email = e
  data.telefono = t

  if (typeof data.curso === "string") data.curso = data.curso.trim() || undefined
  if (typeof data.empresa === "string") data.empresa = data.empresa.trim() || undefined
  if (typeof data.participantes === "string") data.participantes = data.participantes.trim() || undefined
  if (typeof data.origen === "string") data.origen = data.origen.trim() || undefined
  if (typeof data.fecha === "string") data.fecha = data.fecha.trim() || undefined
  if (typeof data.hora === "string") data.hora = data.hora.trim() || undefined

  if (!data.fecha && data.metadata && typeof data.metadata.fecha === "string") {
    data.fecha = data.metadata.fecha.trim()
  }
  if (!data.hora && data.metadata && typeof data.metadata.hora === "string") {
    data.hora = data.metadata.hora.trim()
  }

  if (tipo === "info" || tipo === "contacto" || tipo === "agenda") {
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
    await persistLead(data)

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
