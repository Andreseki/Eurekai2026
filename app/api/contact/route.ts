import { CONTACT_INBOX_EMAIL } from "@/lib/site-config"
import { NextResponse } from "next/server"

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

  const { nombre, email, telefono, mensaje } = body as Record<string, unknown>
  const n = typeof nombre === "string" ? nombre.trim() : ""
  const e = typeof email === "string" ? email.trim() : ""
  const t = typeof telefono === "string" ? telefono.trim() : ""
  const m = typeof mensaje === "string" ? mensaje.trim() : ""

  if (!n || !e || !t || !m) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 })
  }

  const resendKey = process.env.RESEND_API_KEY
  if (resendKey) {
    const from = process.env.RESEND_FROM ?? "EurekAI <onboarding@resend.dev>"
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [CONTACT_INBOX_EMAIL],
        reply_to: e,
        subject: `Contacto web EurekAI: ${n}`,
        text: `Nombre: ${n}\nEmail: ${e}\nTeléfono: ${t}\n\nMensaje:\n${m}`,
      }),
    })
    if (!res.ok) {
      const err = await res.text()
      console.error("Resend error", res.status, err)
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 })
    }
    return NextResponse.json({ ok: true })
  }

  const ajaxUrl = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_INBOX_EMAIL)}`
  try {
    const res = await fetch(ajaxUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: `Contacto web EurekAI: ${n}`,
        _captcha: "false",
        _template: "table",
        nombre: n,
        email: e,
        telefono: t,
        mensaje: m,
      }),
    })

    if (!res.ok) {
      console.error("FormSubmit error", res.status, await res.text())
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ ok: false, error: "send_failed" }, { status: 500 })
  }
}
