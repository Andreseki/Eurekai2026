"use client"

import { Instagram, Linkedin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
// import PromoBottomBar from "@/components/floating-cta"

import { whatsappUrl } from "@/lib/site-config"

const WHATSAPP_HREF = whatsappUrl("Hola EurekAI, quiero conversar con ustedes")

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "loading" | "ok" | "error">("idle")

  return (
    <footer className="mt-auto" data-site-footer>
      {/* <PromoBottomBar /> */}
      <div className="footer-body">
      <div className="border-b border-white/10 bg-[#0F172A] px-4 py-10 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">Mantente informado</p>
            <p className="mt-1 text-sm text-slate-400">
              Recibe actualizaciones sobre experiencias y recursos
            </p>
          </div>
          <form
            className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
            onSubmit={async (event) => {
              event.preventDefault()
              const email = newsletterEmail.trim()
              if (!email) return
              setNewsletterStatus("loading")
              try {
                const res = await fetch("/api/newsletter", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email, fuente: "footer" }),
                })
                if (!res.ok) {
                  setNewsletterStatus("error")
                  return
                }
                setNewsletterStatus("ok")
                setNewsletterEmail("")
              } catch {
                setNewsletterStatus("error")
              }
            }}
          >
            <input
              type="email"
              placeholder="Tu correo aquí"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 rounded-xl border border-white/10 bg-slate-800/80 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-[#F97316] focus:outline-none"
              aria-label="Correo electrónico"
              required
            />
            <button
              type="submit"
              disabled={newsletterStatus === "loading"}
              className="rounded-xl bg-[#F97316] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ea580c] disabled:opacity-60"
            >
              {newsletterStatus === "loading" ? "Enviando…" : "Suscríbete"}
            </button>
          </form>
          {newsletterStatus === "ok" ? (
            <p className="text-sm text-green-400 md:text-right">¡Gracias! Te avisaremos pronto.</p>
          ) : null}
          {newsletterStatus === "error" ? (
            <p className="text-sm text-red-400 md:text-right">No pudimos suscribirte. Intenta de nuevo.</p>
          ) : null}
        </div>
      </div>

      <div className="bg-[#0F172A] px-4 py-12 md:px-8">
        <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:border-r lg:border-white/10 lg:pr-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Explora</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>
                <Link href="#" className="transition hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/comunidad" className="transition hover:text-white">
                  Comunidad
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Recursos
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:border-r lg:border-white/10 lg:pr-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Legal</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-200">
              <li>
                <Link href="#" className="transition hover:text-white">
                  Términos de servicio
                </Link>
              </li>
              <li>
                <Link href="#" className="transition hover:text-white">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>
          <div className="lg:border-r lg:border-white/10 lg:pr-8">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Contacto</p>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-3 flex w-full max-w-xs items-center rounded-xl border border-white/15 bg-slate-800/60 px-4 py-3 text-sm text-slate-300 transition hover:border-white/30 hover:text-white"
            >
              Hablemos
            </a>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Síguenos</p>
            <div className="mt-3 flex gap-3">
              <a
                href="https://www.instagram.com/eurekai.es/"
                target="_blank"
                rel="noreferrer noopener"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-[#F97316]"
                aria-label="Instagram EurekAI"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.linkedin.com/company/eurekai-es/"
                target="_blank"
                rel="noreferrer noopener"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-[#F97316]"
                aria-label="LinkedIn EurekAI"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 bg-[#0b1220] px-4 py-5 md:px-8">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-slate-400 md:flex-row">
          <Link href="/" className="opacity-90 transition hover:opacity-100">
            <Image
              src="/LogoEurekai-WTH.png"
              alt="EurekAI"
              width={160}
              height={44}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <p>© 2025 EurekAI. Todos los derechos reservados</p>
        </div>
      </div>
      </div>
    </footer>
  )
}
