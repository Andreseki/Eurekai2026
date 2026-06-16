"use client"

import SitePageFooter from "@/components/site-page-footer"
import { useSiteModals } from "@/components/site-modals-provider"
import { ChevronLeft, ChevronRight, Check, Instagram, Linkedin, UserPlus } from "lucide-react"
import Image from "next/image"
import type { LucideIcon } from "lucide-react"
import { useState } from "react"

export const COURSE_BRAND_LOGOS = [
  { src: "/Nestle.png", alt: "Nestlé" },
  { src: "/UniversidaddelRosario.png", alt: "Universidad del Rosario" },
  { src: "/Bancolombia.png", alt: "Bancolombia" },
  { src: "/Sodexo.png", alt: "Sodexo" },
  { src: "/Compensar.png", alt: "Compensar" },
  { src: "/GrupoBolivar.png", alt: "Grupo Bolívar" },
  { src: "/Keraltu.png", alt: "Keralty" },
  { src: "/Proteccion.png", alt: "Protección" },
]

export function CourseLogosSection() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-2xl font-bold leading-tight text-slate-800 md:text-3xl lg:text-4xl">
          Metodologías aplicadas con empresarios
          <br />y líderes de <span className="text-[#F97316]">grandes empresas:</span>
        </h2>
        <div className="brands-marquee mt-12 overflow-hidden py-7">
          <div className="brands-track">
            {[...COURSE_BRAND_LOGOS, ...COURSE_BRAND_LOGOS].map((logo, index) => (
              <div
                key={`${logo.alt}-${index}`}
                className="brands-item flex h-12 min-w-[170px] items-center justify-center"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={170}
                  height={52}
                  className="h-11 w-auto object-contain grayscale opacity-85"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function CourseDoubtsSection() {
  const { openContact, openAgenda } = useSiteModals()

  return (
    <section className="bg-[#64748B] py-16 text-white lg:py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">¿Tienes dudas?</h2>
        <p className="mt-4 text-base leading-relaxed text-white/90 md:text-lg">
          Escríbenos por WhatsApp y te ayudamos a resolverlas ahora mismo.
          <br />
          Queremos que tomes una decisión con claridad y sin presiones.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={openContact}
            className="inline-flex rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Contáctanos
          </button>
          <button
            type="button"
            onClick={openAgenda}
            className="inline-flex rounded-full bg-[#F97316] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#ea580c]"
          >
            Agendar reunión
          </button>
        </div>
      </div>
    </section>
  )
}

export function CoursePageFooter() {
  return <SitePageFooter />
}

export function CourseFeatureCards({
  porQue,
  dirigidoA,
}: {
  porQue: string[]
  dirigidoA: string[]
}) {
  return (
    <section className="bg-slate-100 py-12 lg:py-16">
      <div className="mx-auto grid max-w-6xl gap-6 px-6 md:grid-cols-2">
        <article className="rounded-2xl border border-[#0F172A] bg-white p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F97316] text-white">
            <Check className="h-6 w-6" strokeWidth={2.5} aria-hidden />
          </div>
          <h3 className="mt-6 text-xl font-bold text-[#0F172A]">¿Por qué elegir este curso?</h3>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-slate-700 md:text-base">
            {porQue.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
        <article className="rounded-2xl border border-[#0F172A] bg-white p-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-[#F97316] text-[#F97316]">
            <UserPlus className="h-6 w-6" strokeWidth={2} aria-hidden />
          </div>
          <h3 className="mt-6 text-xl font-bold text-[#0F172A]">¿A quién está dirigido?</h3>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-slate-700 md:text-base">
            {dirigidoA.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  )
}

export function CourseRequirementsGrid({
  items,
}: {
  items: { icon: LucideIcon; text: string }[]
}) {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-3xl font-bold text-[#0F172A] md:text-4xl">Requerimientos</h2>
        <div
          className={`mt-10 grid gap-6 ${
            items.length > 2 ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"
          }`}
        >
          {items.map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-4 rounded-2xl border border-[#0F172A] px-6 py-5"
            >
              <Icon className="h-8 w-8 shrink-0 text-[#F97316]" strokeWidth={1.75} aria-hidden />
              <p className="font-semibold text-[#0F172A]">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

type Facilitator = {
  name: string
  role: string
  bio: string
  quote: string
  image: string
  objectPosition?: string
  tags: readonly string[]
  linkedin: string
  instagram: string | null
}

export function CourseFacilitatorSection({
  title = "Tus Facilitadores",
  facilitators,
}: {
  title?: string
  facilitators: Facilitator[]
}) {
  const [idx, setIdx] = useState(0)
  const f = facilitators[idx]
  if (!f) return null

  return (
    <section className="bg-slate-50 py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Equipo</p>
        <h2 className="mt-4 text-center text-3xl font-bold text-[#0F172A] md:text-4xl">{title}</h2>

        <div className="mt-12 overflow-hidden rounded-2xl bg-[#0F172A] p-8 text-white shadow-xl md:p-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
            <div className="flex flex-col items-center md:items-start">
              <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border-2 border-white/30 bg-slate-800">
                <Image
                  src={f.image}
                  alt={f.name}
                  fill
                  className="object-cover grayscale"
                  style={f.objectPosition ? { objectPosition: f.objectPosition } : undefined}
                  sizes="160px"
                />
              </div>
              <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
                {f.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/90"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="min-w-0 flex-1 text-center md:text-left">
              <h3 className="text-2xl font-bold text-[#F97316]">{f.name}</h3>
              <p className="mt-1 text-sm font-medium text-white/90">{f.role}</p>
              <p className="mt-4 text-sm leading-relaxed text-slate-200">{f.bio}</p>
              <p className="mt-4 text-sm italic text-white/90">&ldquo;{f.quote}&rdquo;</p>
              <div className="mt-6 flex justify-center gap-3 md:justify-start">
                {f.instagram ? (
                  <a
                    href={f.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-full border border-white/25 p-2.5 text-white transition hover:bg-white/10"
                    aria-label={`Instagram de ${f.name}`}
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                ) : null}
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-full border border-white/25 p-2.5 text-white transition hover:bg-white/10"
                  aria-label={`LinkedIn de ${f.name}`}
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {facilitators.length > 1 ? (
          <div className="mt-8 flex items-center justify-center gap-8">
            <button
              type="button"
              onClick={() => setIdx((i) => (i === 0 ? facilitators.length - 1 : i - 1))}
              className="text-slate-500 transition hover:text-[#0F172A]"
              aria-label="Anterior facilitador"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
            <div className="flex gap-2">
              {facilitators.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Facilitador ${i + 1}`}
                  onClick={() => setIdx(i)}
                  className={`h-2 rounded-full transition ${
                    i === idx ? "w-8 bg-[#0F172A]" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIdx((i) => (i === facilitators.length - 1 ? 0 : i + 1))}
              className="text-slate-500 transition hover:text-[#0F172A]"
              aria-label="Siguiente facilitador"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  )
}

export function CourseInscribeCta({ onInscribir }: { onInscribir: () => void }) {
  return (
    <div className="mt-12 flex justify-center">
      <button
        type="button"
        onClick={onInscribir}
        className="inline-flex rounded-full bg-[#F97316] px-12 py-4 text-base font-bold uppercase tracking-wide text-white shadow-lg shadow-[#F97316]/30 transition hover:bg-[#ea580c]"
      >
        ¡Inscríbete ahora!
      </button>
    </div>
  )
}

export function CourseIncludesSection({
  incluye,
  temas,
  onInscribir,
}: {
  incluye: string[]
  temas: string[]
  onInscribir: () => void
}) {
  return (
    <section className="bg-white py-12 lg:py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Incluye:</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700">
              {incluye.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Temas relacionados</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700">
              {temas.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <CourseInscribeCta onInscribir={onInscribir} />
      </div>
    </section>
  )
}
