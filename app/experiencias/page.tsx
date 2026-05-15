"use client"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { ChevronLeft, ChevronRight, LayoutGrid, List, MapPin, Timer } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useMemo, useState } from "react"

type ExpType = "Bootcamp" | "Curso" | "InCompany" | "Misiones"

type Experience = {
  id: string
  tipo: ExpType
  fecha: string | null
  confirmado: boolean
  modalidad: "Presencial" | "Online"
  titulo: string
  desc: string
  duracion: string
  link: string
  thumb: string
}

const experiences: Experience[] = [
  {
    id: "1",
    tipo: "Bootcamp",
    fecha: "MIÉRCOLES 30 MAYO",
    confirmado: true,
    modalidad: "Presencial",
    titulo: "Innovación potenciada con IA",
    desc: "Del problema correcto al prototipo y pitch ante mentores.",
    duracion: "8 horas · 1 día",
    link: "/bootcamp",
    thumb: "/30mayo.jpg",
  },
  {
    id: "2",
    tipo: "Curso",
    fecha: "AGOSTO",
    confirmado: false,
    modalidad: "Online",
    titulo: "IA aplicada para empresarios",
    desc: "Curso práctico para empresarios que buscan llevar la IA del entusiasmo a la ejecución.",
    duracion: "16 horas",
    link: "#",
    thumb: "/iaparaempresarios.png",
  },
  {
    id: "3",
    tipo: "Curso",
    fecha: "SEPTIEMBRE",
    confirmado: false,
    modalidad: "Online",
    titulo: "IA para el Liderazgo",
    desc: "Programa ejecutivo para líderes que necesitan orientar la adopción de IA con criterio estratégico y responsabilidad.",
    duracion: "16 horas",
    link: "#",
    thumb: "/ialiderazgo.png",
  },
  {
    id: "4",
    tipo: "Curso",
    fecha: "OCTUBRE",
    confirmado: false,
    modalidad: "Online",
    titulo: "IA para Marketing y Comunicaciones",
    desc: "Para equipos de marketing que buscan optimizar la producción de contenido sin perder coherencia de marca.",
    duracion: "12 horas",
    link: "#",
    thumb: "/iamarketing.png",
  },
  {
    id: "5",
    tipo: "Curso",
    fecha: "NOVIEMBRE",
    confirmado: false,
    modalidad: "Online",
    titulo: "IA para Datos y Dashboards",
    desc: "Para profesionales que necesitan convertir datos en decisiones sin perderse en hojas de cálculo.",
    duracion: "8 horas",
    link: "#",
    thumb: "/iadatodashboard.png",
  },
  {
    id: "6",
    tipo: "InCompany",
    fecha: null,
    confirmado: false,
    modalidad: "Presencial",
    titulo: "LEGO Serious Play · Workshop experiencial para equipos",
    desc: "Tu equipo usará bloques LEGO para desbloquear la imaginación colectiva y construir un lenguaje compartido de colaboración.",
    duracion: "8 horas",
    link: "#",
    thumb: "/legoserius.jpg",
  },
  {
    id: "7",
    tipo: "Misiones",
    fecha: "OCTUBRE",
    confirmado: false,
    modalidad: "Presencial",
    titulo: "Explorando el Futuro de la IA",
    desc: "Experiencia inmersiva de 10 días combinando formación en IA con una universidad en China y networking con innovadores asiáticos.",
    duracion: "10 días",
    link: "#",
    thumb: "/explorando.png",
  },
]

type FilterTab = "Todo" | "Cursos" | "Bootcamp" | "Laboratorio" | "Misiones"

const categoryCopy: Record<
  FilterTab,
  { title: string; body: string }
> = {
  Todo: {
    title: "Todas las experiencias",
    body: "Explora cursos, bootcamps, laboratorios experienciales y misiones diseñadas para acelerar innovación con IA.",
  },
  Cursos: {
    title: "Cursos",
    body: "Rutas profundas para dominar IA aplicada al negocio, al liderazgo y a disciplinas clave como marketing y datos.",
  },
  Bootcamp: {
    title: "Bootcamp",
    body: "Jornadas intensivas para pasar de un reto real a prototipo y pitch con mentores en tiempo récord.",
  },
  Laboratorio: {
    title: "Laboratorio",
    body: "Workshops experienciales y sesiones in-company donde el equipo construye soluciones tangibles con método.",
  },
  Misiones: {
    title: "Misiones",
    body: "Inmersión en ecosistemas globales para conectar con quienes ya están implementando IA a escala.",
  },
}

function matchesFilter(e: Experience, tab: FilterTab) {
  if (tab === "Todo") return true
  if (tab === "Cursos") return e.tipo === "Curso"
  if (tab === "Bootcamp") return e.tipo === "Bootcamp"
  if (tab === "Laboratorio") return e.tipo === "InCompany"
  if (tab === "Misiones") return e.tipo === "Misiones"
  return true
}

export default function ExperienciasPage() {
  const [tab, setTab] = useState<FilterTab>("Todo")
  const [view, setView] = useState<"grid" | "list">("list")

  const filtered = useMemo(() => experiences.filter((e) => matchesFilter(e, tab)), [tab])
  const cat = categoryCopy[tab]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <section className="relative overflow-hidden bg-[#0F172A] pb-20 pt-28 text-white lg:pb-28 lg:pt-36">
        <div className="absolute inset-0">
          <Image
            src="/escogetucamino.jpg"
            alt="Experiencias formativas"
            fill
            className="object-cover object-[70%_center] sm:object-[65%_center] md:object-[58%_center]"
            priority
            sizes="100vw"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-full max-w-[min(100%,46rem)] bg-[linear-gradient(90deg,rgba(2,6,23,0.92)_0%,rgba(15,23,42,0.8)_30%,rgba(15,23,42,0.42)_54%,rgba(15,23,42,0.06)_80%,transparent_100%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-6xl px-6 text-left">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/90">
            Explora soluciones de formación
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Escoge <span className="text-[#F97316]">tu camino</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/90">
            Experiencias formativas diseñadas para la economía del futuro. Con método, con IA y con
            resultados desde el primer día.
          </p>
        </div>
      </section>

      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex flex-wrap gap-6">
            {(["Todo", "Cursos", "Bootcamp", "Laboratorio", "Misiones"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={`relative pb-2 text-sm font-semibold uppercase tracking-wide transition ${
                  tab === t ? "text-[#F97316]" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t}
                {tab === t ? (
                  <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#F97316]" />
                ) : null}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 self-end md:self-auto">
            <button
              type="button"
              aria-label="Vista cuadrícula"
              onClick={() => setView("grid")}
              className={`rounded-full border p-2 transition ${
                view === "grid"
                  ? "border-[#F97316] text-[#F97316]"
                  : "border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              <LayoutGrid className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Vista lista"
              onClick={() => setView("list")}
              className={`rounded-full border p-2 transition ${
                view === "list"
                  ? "border-[#F97316] text-[#F97316]"
                  : "border-slate-200 text-slate-500 hover:border-slate-300"
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 py-12 md:px-6 lg:py-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
          <aside className="shrink-0 lg:w-[26%]">
            <h2 className="text-3xl font-extrabold leading-tight text-[#0F172A] md:text-4xl lg:text-5xl">
              {cat.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">{cat.body}</p>
          </aside>

          <div className="min-w-0 flex-1">
            <div
              className={
                view === "grid"
                  ? "grid gap-6 sm:grid-cols-2"
                  : "flex flex-col divide-y divide-slate-200"
              }
            >
              {filtered.map((e) => (
                <article
                  key={e.id}
                  className={
                    view === "grid"
                      ? "flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm"
                      : "flex flex-col gap-4 py-8 first:pt-0 md:flex-row md:items-stretch"
                  }
                >
                  <div
                    className={
                      view === "grid"
                        ? "relative h-36 w-full shrink-0"
                        : "relative h-40 w-full shrink-0 overflow-hidden rounded-lg md:h-auto md:w-[190px]"
                    }
                  >
                    <Image
                      src={e.thumb}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width:768px) 100vw, 190px"
                    />
                  </div>
                  <div className={view === "grid" ? "flex flex-1 flex-col p-5" : "flex min-w-0 flex-1 flex-col"}>
                    <div className="flex flex-wrap items-center gap-2">
                      {e.confirmado && e.fecha ? (
                        <span className="rounded-full bg-[#F97316] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                          {e.fecha}
                        </span>
                      ) : (
                        <>
                          {e.fecha ? (
                            <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
                              {e.fecha}
                            </span>
                          ) : null}
                          <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-700">
                            POR CONFIRMAR
                          </span>
                        </>
                      )}
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                        {e.modalidad}
                      </span>
                    </div>
                    <p className="mt-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                      {e.tipo}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-[#0F172A] md:text-xl">{e.titulo}</h3>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">{e.desc}</p>
                    <hr className="my-4 border-slate-200" />
                    <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap gap-4 text-sm text-slate-600">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-[#F97316]" /> Bogotá
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <Timer className="h-4 w-4 text-[#F97316]" /> {e.duracion}
                        </span>
                      </div>
                      <Link
                        href={e.link}
                        className="inline-flex shrink-0 rounded-full border-2 border-[#F97316] px-5 py-2 text-sm font-semibold text-[#F97316] transition hover:bg-orange-50"
                      >
                        Ver contenido
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <nav
              className="mt-10 flex flex-wrap items-center justify-center gap-2 text-sm font-medium text-slate-600"
              aria-label="Paginación"
            >
              <span className="inline-flex items-center gap-1 px-2 text-slate-400">
                <ChevronLeft className="h-4 w-4" /> Anterior
              </span>
              {[1, 2, 3, "…", 8, 9, 10].map((p, i) =>
                typeof p === "number" ? (
                  <button
                    key={`${p}-${i}`}
                    type="button"
                    className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                      p === 1
                        ? "bg-[#0F172A] text-white"
                        : "hover:bg-slate-100"
                    }`}
                  >
                    {p}
                  </button>
                ) : (
                  <span key={p} className="px-1 text-slate-400">
                    {p}
                  </span>
                ),
              )}
              <span className="inline-flex items-center gap-1 px-2 text-slate-400">
                Siguiente <ChevronRight className="h-4 w-4" />
              </span>
            </nav>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
