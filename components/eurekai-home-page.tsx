"use client"

import "@/styles/home-page.css"
import SitePageFooter from "@/components/site-page-footer"
import Navbar from "@/components/Navbar"
import TestimonialsCarousel from "@/components/testimonials-carousel"
import { useSiteModals } from "@/components/site-modals-provider"
import { HOME_CAMINO_LINKS } from "@/lib/experiencias-deep-links"
import { homeTestimonials } from "@/lib/home-testimonials-data"
import {
  Backpack,
  Bookmark,
  Building2,
  CalendarCheck,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Lightbulb,
  Linkedin,
  MapPin,
  Network,
  Rocket,
  Timer,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { useState } from "react"

const facilitadores = [
  {
    name: "César Trujillo",
    role: "Co-Fundador EurekAI | PhD(c) IA & ML",
    image: "/cesarwht.jpg",
    objectPosition: "center" as const,
    bio: "Socio Fundador SupermAInds, Bogotá Chapter Lead para The AI Collective, cursando Doctorado en IA + ML (Walsh College, USA). 30+ años en la intersección entre tecnología, humanidades y negocios.",
    quote: "La conexión entre la IA y los negocios.",
    tags: ["Innovación", "IA"] as const,
    linkedin: "https://linkedin.com/in/cesartrujillo",
    instagram: "https://instagram.com",
  },
  {
    name: "Andrés Rubiano",
    role: "CEO eki | Co-Fundador EurekAI",
    image: "/andreswht.png",
    objectPosition: "center 38%" as const,
    bio: "CEO eki | Consultor experto, 15+ años de experiencia en innovación corporativa con impacto y educación ejecutiva. Ha implementado sistemas de innovación en 60+ empresas de LATAM, desde startups hasta corporativos.",
    quote: "La innovación da la dirección; la IA, la velocidad.",
    tags: ["Innovación", "IA"] as const,
    linkedin: "https://linkedin.com/in/andresrubiano32",
    instagram: "https://instagram.com",
  },
]

const faqItems = [
  {
    q: "¿Cuál es el nivel de experiencia requerido?",
    a: "Nuestros programas están pensados para líderes y equipos con distintos niveles técnicos. Partimos de lo esencial y avanzamos con ejercicios aplicables sin requerir que seas experto en IA.",
  },
  {
    q: "¿Qué pasa después del curso?",
    a: "Recibes material de apoyo, comunidad y, según la experiencia, acompañamiento para seguir implementando lo aprendido en tu contexto real.",
  },
  {
    q: "¿Puedo hacer el curso en mi horario?",
    a: "Depende del formato: algunas experiencias son intensivas presenciales y otras online con sesiones programadas. Te compartimos el calendario antes de inscribirte.",
  },
  {
    q: "¿Qué entregables recibo?",
    a: "Plantillas, guías y prototipos trabajados durante la sesión, además de un plan de acción claro para continuar.",
  },
  {
    q: "¿Hay opciones de pago?",
    a: "Sí. Puedes consultar planes corporativos y opciones de facturación escribiéndonos desde el formulario de contacto.",
  },
  {
    q: "¿Qué pasa si no puedo asistir a una sesión?",
    a: "Cuéntanos tu caso con anticipación y buscamos la mejor alternativa según el programa (reposición, grabación cuando aplique o ajustes in-company).",
  },
]

const logoItems: { src?: string; alt: string; text?: string }[] = [
  { src: "/Bancolombia.png", alt: "Bancolombia" },
  { src: "/Compensar.png", alt: "Compensar" },
  { src: "/BancoAzteca.png", alt: "Banco Azteca" },
  { src: "/UniversidaddelRosario.png", alt: "Universidad del Rosario" },
  { src: "/GrupoBolivar.png", alt: "Grupo Bolívar" },
  { src: "/Sodexo.png", alt: "Sodexo" },
  { src: "/Alfa.png", alt: "Alfa" },
  { src: "/Carvajal.png", alt: "Carvajal" },
  { src: "/Keraltu.png", alt: "Keralty" },
  { src: "/Nestle.png", alt: "Nestlé" },
  { src: "/Proteccion.png", alt: "Protección" },
  { src: "/MacPollo.png", alt: "Mac Pollo" },
  { text: "Visma", alt: "Visma" },
  { src: "/Envia.png", alt: "Envia" },
  { src: "/D1.png", alt: "D1" },
]

function EyebrowOrange({ children }: { children: ReactNode }) {
  return (
    <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#F97316]">{children}</p>
  )
}

function EyebrowNavy({ children }: { children: ReactNode }) {
  return (
    <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#0F172A]">
      {children}
    </p>
  )
}

export default function EurekAiHomePage() {
  const { openContact } = useSiteModals()
  const [facIdx, setFacIdx] = useState(0)
  const [faqOpen, setFaqOpen] = useState<number | null>(null)

  const fPrev = () =>
    setFacIdx((i) => (i === 0 ? facilitadores.length - 1 : i - 1))
  const fNext = () =>
    setFacIdx((i) => (i === facilitadores.length - 1 ? 0 : i + 1))

  const f = facilitadores[facIdx]

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="relative flex flex-1 flex-col">
      <section className="eurekai-hero-section relative min-h-[min(92vh,880px)] overflow-hidden bg-[#0F172A] pb-24 text-white lg:pb-32">
        <div className="absolute inset-0 z-0">
          <Image
            src="/iniciohero.jpg"
            alt="Equipos construyendo con metodología práctica"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0F172A]/95 via-[#0F172A]/75 to-[#0F172A]/25" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pb-8">
          <h1 className="max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl">
            Construcción de habilidades 3i:
            <br />
            <span className="text-[#F97316]">Innovación + IA = Impacto</span>
          </h1>
          <h2 className="mt-4 max-w-2xl text-2xl font-bold text-white md:text-3xl">
            Resultados en tiempo récord.
          </h2>
          <p className="mt-6 max-w-xl text-lg text-slate-200">
            Programas para líderes y equipos que quieren pasar de idea a prototipo y plan de
            implementación. Sin humo. Con método.
          </p>
          <Link
            href="/experiencias"
            className="mt-10 inline-flex rounded-full bg-[#F97316] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange-900/25 transition hover:bg-[#ea580c]"
          >
            Próximas Experiencias
          </Link>
        </div>
      </section>

      <section className="home-porque py-16 lg:py-24">
        <div className="home-section-inner">
          <EyebrowNavy>POR QUÉ</EyebrowNavy>
          <div className="mt-8 flex justify-center">
            <Image
              src="/placeholder-logo.png"
              alt="EurekAI"
              width={280}
              height={80}
              className="h-16 w-auto object-contain md:h-20"
            />
          </div>
          <h2 className="mx-auto mt-8 max-w-4xl text-center text-3xl font-bold text-[#0F172A] md:text-4xl">
            Las habilidades que necesitas para el{" "}
            <span className="text-[#F97316]">trabajo del futuro</span>
          </h2>
          <p className="mx-auto mt-5 max-w-4xl text-center text-lg leading-relaxed text-slate-600">
            Ayudamos a personas y organizaciones a aprender, innovar y transformar sus realidades con
            soluciones prácticas y aplicables. Construimos experiencias donde la inteligencia artificial
            y la innovación se convierten en herramientas reales para decidir, prototipar e implementar
            con impacto medible en tu equipo y en tu negocio.
          </p>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              {
                Icon: Lightbulb,
                title: "Enfoque Práctico y Aplicable",
                body: "Enseñamos IA y diseñamos soluciones prácticas que se aplican a problemas reales de negocio, superando las respuestas genéricas.",
              },
              {
                Icon: CalendarCheck,
                title: "Experiencias a la Medida y Ágiles",
                body: "Diseñamos bootcamps de innovación y cursos prácticos diseñados para líderes que no tienen tiempo, adaptándonos al contexto actual.",
              },
              {
                Icon: Network,
                title: "Transformaciones Reales",
                body: "Creamos laboratorios corporativos para resolver retos reales, combinando Big Data + Small Data para lograr un impacto profundo en las decisiones.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="home-porque-card rounded-xl border bg-white p-8 shadow-sm transition hover:shadow-md"
              >
                <card.Icon className="h-10 w-10 text-[#F97316]" strokeWidth={1.75} />
                <h3 className="mt-4 text-lg font-bold text-[#0F172A]">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-camino border-t-2 border-[#0F172A]/10 py-16 lg:py-24">
        <div className="home-section-inner relative">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-600">
            ESCOGE TU CAMINO
          </p>
          <h2 className="mt-4 text-center text-3xl font-bold text-[#0F172A] md:text-4xl">
            Experiencias Formativas
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Cuatro experiencias diseñadas para la economía del futuro
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                Icon: Bookmark,
                title: "Cursos",
                desc: "Formación en Inteligencia Artificial e Innovación.",
                href: HOME_CAMINO_LINKS.cursos,
              },
              {
                Icon: Backpack,
                title: "Bootcamps",
                desc: "Entrenamientos rápidos, ágiles y a la medida.",
                href: "/bootcamp",
              },
              {
                Icon: Building2,
                title: "InCompany",
                desc: "Experiencias a la medida de las necesidades.",
                href: HOME_CAMINO_LINKS.incompany,
              },
              {
                Icon: Rocket,
                title: "Misiones",
                desc: "Visitar empresas que están implementando IA.",
                href: HOME_CAMINO_LINKS.misiones,
              },
            ].map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="block rounded-2xl border-2 border-[#0F172A] bg-white p-8 text-center shadow-sm transition hover:border-[#F97316] hover:shadow-md"
              >
                <c.Icon className="mx-auto h-9 w-9 text-[#F97316]" strokeWidth={1.75} />
                <h3 className="mt-4 font-bold text-[#0F172A]">{c.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{c.desc}</p>
              </Link>
            ))}
          </div>
          <div className="mt-12 flex justify-center">
            <Link
              href="/experiencias"
              className="inline-flex rounded-full bg-[#F97316] px-10 py-3.5 text-sm font-semibold text-white transition hover:bg-[#ea580c]"
            >
              Explorar los caminos
            </Link>
          </div>
        </div>
      </section>

      <section className="home-camino border-y border-slate-100 py-16 lg:py-24">
        <div className="home-section-inner">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <h2 className="text-4xl font-bold leading-tight text-[#0F172A] md:text-5xl">
                Próximas Fechas
              </h2>
              <p className="mt-3 text-slate-600">
                Mantente al tanto de los próximos eventos y actividades
              </p>
            </div>
            <div className="divide-y divide-slate-200 lg:col-span-8">
              {[
                {
                  topOrange: true,
                  topLabel: "SÁBADO",
                  day: "30",
                  month: "MAYO",
                  badge: "Presencial",
                  kind: "Bootcamp",
                  title: "Innovación potenciada con Inteligencia Artificial.",
                  desc: "Del problema correcto al prototipo y pitch ante mentores.",
                  meta: ["Bogotá", "8 horas · 1 día"],
                  href: "/bootcamp",
                },
                {
                  topOrange: false,
                  topLabel: "POR CONFIRMAR",
                  day: "6",
                  month: "AGOSTO",
                  badge: "Online",
                  kind: "Curso",
                  title: "IA aplicada para empresarios",
                  desc: "Curso práctico orientado a empresarios y emprendedores que buscan llevar la inteligencia artificial del entusiasmo a la ejecución.",
                  meta: ["Bogotá", "16 horas"],
                  href: "/experiencias",
                },
                {
                  topOrange: false,
                  topLabel: "POR CONFIRMAR",
                  day: "3",
                  month: "SEPTIEMBRE",
                  badge: "Online",
                  kind: "Curso",
                  title: "IA para el Liderazgo",
                  desc: "Programa ejecutivo para líderes que necesitan orientar la adopción de IA con criterio estratégico y responsabilidad.",
                  meta: ["Bogotá", "16 horas"],
                  href: "/experiencias",
                },
              ].map((ev) => (
                <div
                  key={ev.title}
                  className="flex flex-col gap-6 py-10 first:pt-0 md:flex-row md:items-center"
                >
                  <div className="flex w-full shrink-0 gap-4 md:w-auto md:min-w-[200px]">
                    <div className="w-24 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white text-center shadow-sm">
                      <div
                        className={`py-1.5 text-[10px] font-bold uppercase tracking-wide text-white ${
                          ev.topOrange ? "bg-[#F97316]" : "bg-slate-400"
                        }`}
                      >
                        {ev.topLabel}
                      </div>
                      <div className="px-2 py-3">
                        <p className="text-3xl font-extrabold leading-none text-[#0F172A]">{ev.day}</p>
                        <p className="mt-1 text-xs font-bold uppercase text-[#0F172A]">{ev.month}</p>
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 space-y-2">
                    <span className="inline-block rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                      {ev.badge}
                    </span>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{ev.kind}</p>
                    <h3 className="text-lg font-bold text-[#0F172A]">{ev.title}</h3>
                    <p className="text-sm text-slate-600">{ev.desc}</p>
                    <div className="flex flex-wrap gap-4 pt-1 text-sm text-slate-600">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-4 w-4 text-[#F97316]" />
                        {ev.meta[0]}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Timer className="h-4 w-4 text-[#F97316]" />
                        {ev.meta[1]}
                      </span>
                    </div>
                  </div>
                  <div className="shrink-0 md:self-center">
                    <Link
                      href={ev.href}
                      className="inline-flex rounded-full border border-[#0F172A] bg-white px-6 py-2.5 text-sm font-semibold text-[#0F172A] transition hover:bg-slate-50"
                    >
                      Ver contenido
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-12 flex justify-center lg:col-span-12">
            <Link
              href="/experiencias"
              className="inline-flex rounded-full bg-[#F97316] px-10 py-4 text-sm font-semibold text-white transition hover:bg-[#ea580c]"
            >
              Próximas experiencias
            </Link>
          </div>
        </div>
      </section>

      <section className="home-ventajas py-16 lg:py-24">
        <div className="home-section-inner">
          <EyebrowOrange>VENTAJAS</EyebrowOrange>
          <h2 className="mt-4 text-center text-3xl font-bold text-[#0F172A] md:text-4xl">
            Lo que nos diferencia
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-slate-600">
            No somos una plataforma masiva. No somos una consultoría costosa.
            <br className="hidden sm:block" />
            Somos la intersección única entre Método + IA + Comunidad.
          </p>
          <div className="mt-12 grid grid-cols-1 justify-items-center gap-6 md:grid-cols-3">
            {[
              {
                title: "Aplicación de casos reales",
                body: "Enfoque práctico basado en retos reales, no teóricos.",
                img: "/aplicacioncasosreales.jpg",
              },
              {
                title: "Eficiencia y costos",
                body: "Resultados en poco tiempo con expertos de grandes consultoras a precios razonables.",
                img: "/eficienciaycostos.png",
              },
              {
                title: "Comunidad (Networking)",
                body: "Creación de tribu, acceso a mentores, colaboraciones y proyectos conjuntos.",
                img: "/comunidad.jpg",
              },
            ].map((c) => (
              <div
                key={c.title}
                className="home-ventaja-card relative mx-auto overflow-hidden rounded-3xl border border-[#080808]/15 shadow-md"
              >
                <Image src={c.img} alt="" fill className="object-cover brightness-[0.65]" />
                <div className="home-ventaja-overlay absolute inset-0" />
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <h3 className="text-lg font-bold">{c.title}</h3>
                  <p className="mt-2 text-sm text-white/90">{c.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-testimonios py-16 lg:py-24">
        <div className="home-section-inner">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
              Experiencias transformadoras
            </p>
            <h2 className="mt-3 text-3xl font-bold text-[#0F172A] md:text-4xl lg:text-5xl">Testimonios</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-slate-600 md:text-xl">
              Escucha de ex-alumnos reales que han cambiado su futuro a partir de nuestros cursos.
            </p>
          </div>

          <TestimonialsCarousel
            testimonials={homeTestimonials}
            desktopColumns={3}
            controlsPosition="bottom"
            cardSize="home"
          />
        </div>
      </section>

      <section className="bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-2xl font-bold leading-snug text-[#0F172A] md:text-3xl lg:text-4xl">
            Más de 6000 profesionales formados. Metodologías aplicadas con empresarios y líderes de{" "}
            <span className="text-[#F97316]">grandes empresas:</span>
          </h2>
          <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-8 md:gap-x-14">
            {logoItems.map((item) => (
              <div key={item.alt} className="flex h-12 items-center justify-center md:h-14">
                {item.text ? (
                  <span className="text-sm font-bold uppercase tracking-wide text-slate-500">
                    {item.text}
                  </span>
                ) : item.src ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={150}
                    height={48}
                    className="h-10 w-auto max-w-[140px] object-contain grayscale transition hover:grayscale-0 md:h-11 md:max-w-[160px]"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-facilitadores py-16 lg:py-24">
        <div className="home-section-inner">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500">EQUIPO</p>
          <h2 className="mt-4 text-center text-3xl font-bold text-[#0F172A] md:text-4xl">Facilitadores</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-slate-600">
            Profesionales con experiencia en transformación digital
          </p>

          <div className="mt-12 overflow-hidden rounded-2xl bg-[#0F172A] p-8 text-white shadow-xl md:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-10">
              <div className="flex flex-col items-center md:items-start">
                <div className="relative h-40 w-40 shrink-0 overflow-hidden rounded-full border-2 border-white/30 bg-slate-800">
                  <Image
                    src={f.image}
                    alt={f.name}
                    fill
                    className="object-cover grayscale"
                    style={{ objectPosition: f.objectPosition }}
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
                <p className="mt-4 text-sm italic text-white/90">“{f.quote}”</p>
                <div className="mt-6 flex justify-center gap-3 md:justify-start">
                  {f.name !== "Andrés Rubiano" ? (
                    <a
                      href={f.instagram}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="rounded-full border border-white/25 p-2.5 text-white transition hover:bg-white/10"
                      aria-label="Instagram"
                    >
                      <Instagram className="h-4 w-4" />
                    </a>
                  ) : null}
                  <a
                    href={f.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-full border border-white/25 p-2.5 text-white transition hover:bg-white/10"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-8">
            <button
              type="button"
              onClick={fPrev}
              className="text-slate-500 transition hover:text-[#0F172A]"
              aria-label="Anterior facilitador"
            >
              <ChevronLeft className="h-7 w-7" />
            </button>
            <div className="flex gap-2">
              {facilitadores.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Facilitador ${i + 1}`}
                  onClick={() => setFacIdx(i)}
                  className={`h-2 rounded-full transition ${
                    i === facIdx ? "w-8 bg-[#0F172A]" : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={fNext}
              className="text-slate-500 transition hover:text-[#0F172A]"
              aria-label="Siguiente facilitador"
            >
              <ChevronRight className="h-7 w-7" />
            </button>
          </div>

          <div className="mt-12 p-8 text-center">
            <h3 className="text-xl font-bold text-[#0F172A]">Sé parte del equipo</h3>
            <p className="mx-auto mt-3 max-w-lg text-slate-600">
              Buscamos facilitadores y mentores apasionados por la educación en IA
            </p>
            <button
              type="button"
              onClick={openContact}
              className="mt-6 inline-flex rounded-full bg-[#F97316] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#ea580c]"
            >
              Ser parte del equipo
            </button>
          </div>
        </div>
      </section>

      <section className="home-faq py-16 lg:py-24">
        <div className="home-section-inner max-w-3xl">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
            PREGUNTAS FRECUENTES
          </p>
          <h2 className="mt-4 text-center text-3xl font-bold text-[#0F172A] md:text-4xl">
            Respuestas a <span className="text-[#F97316]">lo que importa</span>
          </h2>
          <div className="mt-10 divide-y divide-[#080808]/20 border-y border-[#080808]/20">
            {faqItems.map((item, i) => {
              const open = faqOpen === i
              return (
                <div key={item.q}>
                  <button
                    type="button"
                    onClick={() => setFaqOpen(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-[#0F172A] md:text-base"
                  >
                    {item.q}
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#F97316] transition ${
                        open ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {open ? (
                    <div className="border-t border-[#080808]/15 px-5 py-4 text-sm leading-relaxed text-slate-600">
                      {item.a}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </div>
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={openContact}
              className="inline-flex rounded-full bg-[#F97316] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#ea580c]"
            >
              ¿Tienes más dudas?
            </button>
          </div>
        </div>
      </section>

      <SitePageFooter />
      </main>
    </div>
  )
}
