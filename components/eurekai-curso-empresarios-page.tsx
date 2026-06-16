"use client"

import CourseContactSidebar, { CoursePriceBadge } from "@/components/course/CourseContactSidebar"
import CourseHeroShell from "@/components/course/CourseHeroShell"
import Navbar from "@/components/Navbar"
import {
  CourseDoubtsSection,
  CourseFacilitatorSection,
  CourseFeatureCards,
  CourseIncludesSection,
  CourseLogosSection,
  CoursePageFooter,
  CourseRequirementsGrid,
} from "@/components/course/course-shared-sections"
import { useSiteModals } from "@/components/site-modals-provider"
import {
  CURSO_EMPRESARIOS_EVENT_DATE_LABEL,
  CURSO_EMPRESARIOS_NAME,
  CURSO_EMPRESARIOS_PAYMENT_URL,
  CURSO_EMPRESARIOS_PRICE_LABEL,
  CURSO_EMPRESARIOS_SUBTITLE,
  getCursoEmpresariosEnrollmentDeadlineMs,
} from "@/lib/curso-empresarios-config"
import { whatsappUrl } from "@/lib/site-config"
import { Calendar, Clock, Laptop, MapPin, Sparkles, Users } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import "@/styles/info-bar.css"

const aprendizajes = [
  "Identificar oportunidades de IA en tu negocio con criterio estratégico.",
  "Traducir dolores de negocio en casos de uso priorizados y accionables.",
  "Diseñar prompts y flujos para asistentes que produzcan resultados consistentes.",
  "Prototipar asistentes low-code sin depender de equipos técnicos.",
  "Construir un plan de adopción para los próximos 30, 60 y 90 días.",
]

const incluye = [
  "Sesiones en vivo (virtuales) con ejercicios guiados.",
  "Plantillas de identificación y priorización de casos de uso.",
  "Guía de prompts y checklist de calidad para asistentes.",
  "Actividad final: prototipo y pitch corto del caso de uso.",
  "Recomendaciones para hoja de ruta de adopción (30, 60, 90 días).",
]

const temasRelacionados = ["Adopción de IA", "Casos de uso", "Productividad", "Prototipado", "Estrategia"]

const porQueElegir = [
  "Enfoque 100% aplicado a negocio: menos teoría, más decisiones y entregables.",
  "Metodología clara para pasar de ideas a prototipos funcionales.",
  "Pensado para equipos pequeños y medianos, sin requerir infraestructura compleja.",
  "Se puede adaptar a necesidades sectoriales de la región.",
]

const dirigidoA = [
  "Empresarios, emprendedores y dueños de PYMES.",
  "Gerentes que necesiten acelerar productividad, ventas, servicio u operaciones.",
  "Líderes de innovación y transformación digital que requieren quick wins.",
]

const facilitadores = [
  {
    name: "César Trujillo",
    role: "Co-Fundador EurekAI | PhD(c) IA & ML",
    bio: "Socio Fundador SupermAInds, Bogotá Chapter Lead para The AI Collective, cursando Doctorado en IA + ML (Walsh College, USA). 30+ años en la intersección entre tecnología, humanidades y negocios.",
    quote: "La conexión entre la IA y los negocios.",
    image: "/cesarwht.jpg",
    objectPosition: "center",
    tags: ["Innovación", "IA"] as const,
    linkedin: "https://linkedin.com/in/cesartrujillo",
    instagram: "https://instagram.com",
  },
  {
    name: "Andrés Rubiano",
    role: "CEO eki | Co-Fundador EurekAI",
    bio: "CEO eki | Consultor experto, 15+ años de experiencia en innovación corporativa con impacto y educación ejecutiva. Ha implementado sistemas de innovación en 60+ empresas de LATAM.",
    quote: "La innovación da la dirección; la IA, la velocidad.",
    image: "/andreswht.png",
    objectPosition: "center 38%",
    tags: ["Innovación", "IA"] as const,
    linkedin: "https://linkedin.com/in/andresrubiano32",
    instagram: null,
  },
]

type CountdownParts = { days: number; hours: number; minutes: number; seconds: number }

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function getCountdown(targetMs: number): CountdownParts {
  const diff = Math.max(0, targetMs - Date.now())
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const ZERO: CountdownParts = { days: 0, hours: 0, minutes: 0, seconds: 0 }

export default function EurekAiCursoEmpresariosPage() {
  const { openContact } = useSiteModals()
  const targetMs = useMemo(() => getCursoEmpresariosEnrollmentDeadlineMs(), [])
  const [countdown, setCountdown] = useState<CountdownParts>(ZERO)

  useEffect(() => {
    const tick = () => setCountdown(getCountdown(targetMs))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [targetMs])

  const handleInscribir = () => {
    if (CURSO_EMPRESARIOS_PAYMENT_URL) {
      window.open(CURSO_EMPRESARIOS_PAYMENT_URL, "_blank", "noopener,noreferrer")
      return
    }
    window.open(
      whatsappUrl(`Hola EurekAI, quiero inscribirme al curso ${CURSO_EMPRESARIOS_NAME}`),
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex flex-1 flex-col">
        <CourseHeroShell
          imageSrc="/iaparaempresarios.png"
          imageAlt={CURSO_EMPRESARIOS_NAME}
          imageClassName="object-cover object-center"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/90">Curso</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">{CURSO_EMPRESARIOS_NAME}</h1>
            <p className="mt-4 text-xl font-medium text-white/95 md:text-2xl">{CURSO_EMPRESARIOS_SUBTITLE}</p>
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-white/90">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#F97316]" aria-hidden />
                Online
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#F97316]" aria-hidden />
                16 horas
              </span>
            </div>
            <button
              type="button"
              onClick={handleInscribir}
              className="mt-8 inline-flex rounded-full bg-[#F97316] px-10 py-4 text-base font-bold text-white shadow-lg shadow-[#F97316]/30 transition hover:bg-[#ea580c]"
            >
              ¡Inscríbete ahora!
            </button>
          </div>
        </CourseHeroShell>

        <section className="border-b border-slate-200 bg-white py-12 lg:py-16">
          <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-[1fr_340px] lg:gap-12 xl:grid-cols-[1fr_360px]">
            <div className="min-w-0">
              <div className="info-bar__grid max-w-xl">
                <div className="info-bar__grid-item">
                  <Clock strokeWidth={1.75} aria-hidden />
                  <span>16 horas (4 sesiones de 4 horas)</span>
                </div>
                <div className="info-bar__grid-item">
                  <Users strokeWidth={1.75} aria-hidden />
                  <span>30 cupos</span>
                </div>
                <div className="info-bar__grid-item">
                  <MapPin strokeWidth={1.75} aria-hidden />
                  <span>Modalidad online</span>
                </div>
                <div className="info-bar__grid-item">
                  <Calendar strokeWidth={1.75} aria-hidden />
                  <span>{CURSO_EMPRESARIOS_EVENT_DATE_LABEL}</span>
                </div>
              </div>

              <div className="info-bar__countdown mt-8 max-w-2xl">
                <p className="info-bar__countdown-label">Cierre de inscripciones</p>
                <div className="info-bar__countdown-values">
                  <CountdownUnit value={pad(countdown.days)} label="DÍAS" />
                  <span className="info-bar__countdown-sep" aria-hidden>:</span>
                  <CountdownUnit value={pad(countdown.hours)} label="HORAS" />
                  <span className="info-bar__countdown-sep" aria-hidden>:</span>
                  <CountdownUnit value={pad(countdown.minutes)} label="MINUTOS" />
                  <span className="info-bar__countdown-sep" aria-hidden>:</span>
                  <CountdownUnit value={pad(countdown.seconds)} label="SEGUNDOS" />
                </div>
              </div>

              <div className="mt-10 border-t border-slate-200 pt-10">
                <h2 className="text-2xl font-bold text-[#0F172A]">Descripción</h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                  Curso práctico orientado a empresarios y emprendedores que buscan llevar la inteligencia
                  artificial del entusiasmo a la ejecución. El participante aprenderá a identificar casos de uso
                  relevantes, estructurarlos con enfoque de negocio, y construir un primer prototipo funcional
                  para validar valor. El curso prioriza claridad, método y resultados, evitando tecnicismos
                  innecesarios.
                </p>
              </div>

              <div className="mt-10 border-t border-slate-200 pt-10">
                <h2 className="text-2xl font-bold text-[#0F172A]">En este curso aprenderás</h2>
                <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-600">
                  {aprendizajes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <CourseContactSidebar
              courseName={CURSO_EMPRESARIOS_NAME}
              priceLabel={CURSO_EMPRESARIOS_PRICE_LABEL}
              onInscribir={handleInscribir}
              onVerBeneficios={openContact}
            />
          </div>
        </section>

        <CourseIncludesSection incluye={incluye} temas={temasRelacionados} onInscribir={handleInscribir} />
        <CourseFeatureCards porQue={porQueElegir} dirigidoA={dirigidoA} />
        <CourseRequirementsGrid
          items={[
            { icon: Laptop, text: "Computador con acceso a internet." },
            { icon: Sparkles, text: "No se requiere experiencia previa en programación." },
          ]}
        />
        <CourseFacilitatorSection facilitators={facilitadores} />
        <CourseLogosSection />
        <CourseDoubtsSection />
        <CoursePageFooter />
      </main>
    </div>
  )
}

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="info-bar__countdown-unit">
      <p className="info-bar__countdown-unit-value">{value}</p>
      <p className="info-bar__countdown-unit-label">{label}</p>
    </div>
  )
}
