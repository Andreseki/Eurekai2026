import { saveNewsletterSubscriber } from "@/lib/leads-db"
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

  const email = typeof (body as { email?: unknown }).email === "string" ? (body as { email: string }).email.trim() : ""
  if (!email || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 })
  }

  const fuente =
    typeof (body as { fuente?: unknown }).fuente === "string"
      ? (body as { fuente: string }).fuente.trim()
      : "footer"

  const saved = await saveNewsletterSubscriber({ email, fuente })
  return NextResponse.json({ ok: true, saved })
}
