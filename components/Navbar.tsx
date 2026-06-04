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
    <div className="sticky top-0 z-[100] bg-transparent">
      <div className="relative z-[101] bg-[#F97316] py-2 text-center text-white">
        <Link
          href="/bootcamp"
          className="inline-block px-3 text-xs leading-snug transition hover:underline md:text-sm"
        >
          Innovación potenciada con Inteligencia Artificial · Bootcamp · Presencial · 25 de
          julio · Bogotá
        </Link>
      </div>

      <header className="relative z-[102] mx-3 rounded-b-2xl border border-white/25 bg-white/95 shadow-md backdrop-blur-md md:mx-5 md:rounded-b-3xl">
        <div className="mx-auto flex w-full max-w-[1680px] items-center gap-4 px-3 py-2.5 md:px-5 md:py-3">
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
            className="relative z-[1] inline-flex rounded-full border border-slate-200 bg-white p-2 text-slate-700 lg:hidden"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="border-t border-slate-200/80 bg-white/95 px-4 py-4 lg:hidden">
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
                className="mt-2 rounded-full border border-[#0F172A] bg-white py-2 text-sm font-semibold text-[#0F172A]"
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
