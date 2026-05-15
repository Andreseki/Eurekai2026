"use client"

import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { useSiteModals } from "@/components/site-modals-provider"

const navLinks = [
  { href: "/", label: "INICIO" },
  { href: "/experiencias", label: "EXPERIENCIAS" },
  { href: "/nosotros", label: "NOSOTROS" },
] as const

export default function Navbar() {
  const { openContact, openAgenda } = useSiteModals()
  const [mobileOpen, setMobileOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const go = (href: string) => {
    setMobileOpen(false)
    router.push(href)
  }

  return (
    <div className="sticky top-0 z-[100]">
      <div className="relative z-[101] bg-[#F97316] py-2 text-center text-white">
        <Link
          href="/bootcamp"
          className="inline-block px-3 text-xs font-semibold leading-snug transition hover:underline md:text-sm"
        >
          Innovación potenciada con Inteligencia Artificial · Bootcamp · Presencial · 30 Mayo · Bogotá
        </Link>
      </div>

      <header className="relative z-[102] px-3 pt-0 md:px-5">
        <div className="mx-auto flex w-full max-w-[1680px] items-center gap-4 rounded-b-[1.6rem] border border-white/90 bg-white/90 px-4 py-2.5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur-md md:px-6 md:py-3">
          <Link href="/" className="relative z-[1] flex shrink-0 items-center" prefetch>
            <Image
              src="/placeholder-logo.png"
              alt="EurekAI"
              width={220}
              height={62}
              className="h-10 w-auto object-contain md:h-12"
            />
          </Link>

          <nav className="relative z-[1] hidden flex-1 items-center justify-center gap-9 lg:flex xl:gap-12">
            {navLinks.map((l) => {
              const active = pathname === l.href
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  prefetch
                  className={`text-sm font-semibold uppercase tracking-wide transition hover:text-[#F97316] ${
                    active ? "text-[#F97316]" : "text-[#0F172A]"
                  }`}
                >
                  {l.label}
                </Link>
              )
            })}
          </nav>

          <div className="relative z-[1] ml-auto hidden items-center gap-3 lg:flex">
            <button
              type="button"
              onClick={openContact}
              className="rounded-full border border-[#0F172A] bg-white px-5 py-2 text-sm font-semibold text-[#0F172A] transition hover:bg-slate-50"
            >
              Contáctanos
            </button>
            <button
              type="button"
              onClick={openAgenda}
              className="rounded-full bg-[#F97316] px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ea580c]"
            >
              Agendar reunión
            </button>
          </div>

          <button
            type="button"
            className="relative z-[1] inline-flex rounded-full border border-slate-200 p-2 text-slate-700 lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="relative z-[102] mt-2 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-lg lg:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <button
                  key={l.href}
                  type="button"
                  onClick={() => go(l.href)}
                  className={`rounded-lg px-3 py-2 text-left text-sm font-semibold uppercase tracking-wide ${
                    pathname === l.href ? "text-[#F97316]" : "text-[#0F172A]"
                  }`}
                >
                  {l.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  openContact()
                }}
                className="mt-2 rounded-full border border-[#0F172A] py-2 text-sm font-semibold text-[#0F172A]"
              >
                Contáctanos
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false)
                  openAgenda()
                }}
                className="rounded-full bg-[#F97316] py-2 text-sm font-semibold text-white"
              >
                Agendar reunión
              </button>
            </div>
          </div>
        ) : null}
      </header>
    </div>
  )
}
