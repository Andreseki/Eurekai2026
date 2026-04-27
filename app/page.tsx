"use client"

import {
  Menu,
  Users,
  UserPlus,
  Check,
  X,
  Package,
  BadgeCheck,
  Shield,
  Settings,
  Instagram,
  Linkedin,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import CountdownTimer from "../components/countdown-timer"
import TestimonialsCarousel from "../components/testimonials-carousel"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  // Central place to edit CTA, navigation and social destinations.
  const actionLinks = {
    inicio: "#inicio",
    cursos: "#cursos",
    facilitadores: "#facilitadores",
    preguntas: "#preguntas",
    reserva: "#reserva",
    whatsapp:
      "https://wa.me/573150564078?text=Hola%20EurekAI,%20quiero%20informacion%20del%20bootcamp",
  }

  const brandLogos = [
    { src: "/Alfa.png", alt: "Alfa" },
    { src: "/BancoAzteca.png", alt: "Banco Azteca" },
    { src: "/Carvajal.png", alt: "Carvajal" },
    { src: "/Compensar.png", alt: "Compensar" },
    { src: "/D1.png", alt: "D1" },
    { src: "/Envia.png", alt: "Envia" },
    { src: "/GrupoBolivar.png", alt: "Grupo Bolívar" },
    { src: "/Keraltu.png", alt: "Keraltu" },
    { src: "/MacPollo.png", alt: "MacPollo" },
    { src: "/Nestle.png", alt: "Nestlé" },
    { src: "/Proteccion.png", alt: "Protección" },
    { src: "/Sodexo.png", alt: "Sodexo" },
    { src: "/UniversidaddelRosario.png", alt: "Universidad del Rosario" },
    { src: "/Bancolombia.png", alt: "Bancolombia" },
  ]

  const benefitCards = [
    {
      icon: Package,
      title: "Toolkit Digital EurekAI:",
      description:
        "Acceso exclusivo a nuestros asistentes GPTs pre-configurados y Sandboxes de innovación.",
    },
    {
      icon: BadgeCheck,
      title: "Badge de Certificación:",
      description:
        "Credencial digital validada por Credly via Blockchain para LinkedIn.",
    },
    {
      icon: Shield,
      title: "1 mes de Soporte de seguimiento:",
      description:
        "Acceso exclusivo a nuestros asistentes GPTs pre-configurados y Sandboxes de innovación.",
    },
    {
      icon: Settings,
      title: "Roadmap de Implementación:",
      description: "Tu plan de acción listo para presentar el lunes a las 8:00 AM.",
    },
    {
      icon: Users,
      title: "Networking de Alto Nivel:",
      description: "Conecta con otros 24 líderes que están en tu misma sintonía.",
    },
    {
      icon: Check,
      title: "Tus proyectos evaluados por expertos:",
      description:
        "La tranquilidad de tener verdaderos Sharks en la evaluación de tu proyecto.",
    },
  ]

  const [benefitsPage, setBenefitsPage] = useState(0)
  const benefitCardsPerPage = 3
  const benefitPageCount = Math.ceil(benefitCards.length / benefitCardsPerPage)
  const visibleBenefitCards = benefitCards.slice(
    benefitsPage * benefitCardsPerPage,
    benefitsPage * benefitCardsPerPage + benefitCardsPerPage,
  )

  const testimonials = [
    {
      quote:
        "La metodología de aprender creando, combinada con ejercicios reales, transformó mi práctica como médica. Descubrí cómo acercarme a las verdaderas necesidades de mis pacientes y caminar hacia la excelencia en salud.",
      name: "Johanna Vásquez B",
      role: "Pediatra",
      company: "Los Cobos Medical Center",
      image: "/johanna.jpeg",
    },
    {
      quote:
        "La innovación dejó de ser concepto y se convirtió en práctica viva. Aprendí a equivocarme y construir desde la acción. Hoy construyo sistemas de innovación que generan resultados reales en mi empresa.",
      name: "Claudia Varga C",
      role: "Gerente General",
      company: "Construvid",
      image: "/claudia.jpeg",
    },
    {
      quote: "Salgo con la cabeza volada y queriendo implementar mil cosas.",
      name: "Erika Cano",
      role: "Experiencias Inteligentes (GenAI)",
      company: "Bancolombia",
      image: "/erika.jpeg",
    },
    {
      quote: "Nos abriste los ojos y nos encendiste una llama.",
      name: "Jenny García",
      role: "Jefe de Analítica Financiera",
      company: "Seguros del Estado S.A.",
      image: "/jenny.jpeg",
    },
    {
      quote:
        "Este curso me abrió la mente frente a las múltiples aplicaciones que podemos tener con IA. Cada clase me dejó un caso de uso para aplicar en mi trabajo.",
      name: "Óscar Zuluaga",
      role: "Director",
      company: "Global Demo and Innovation Team, Oracle",
      image: "/oscar.jpeg",
    },
    {
      quote:
        "Me voy muy satisfecha porque me dio una visión estratégica del gran mundo de la IA para poder ejecutarlo desde el liderazgo.",
      name: "Adriana Grillo Correa",
      role: "CEO",
      company: "Grillo Correa Consultorías SAS",
      image: "/adriana.jpeg",
    },
    {
      quote:
        "Salgo con un millón de ideas para crear. El curso está muy bien armado y las herramientas son inmediatamente aplicables.",
      name: "Verónica Patrón Nieto",
      role: "Directora legal corporativa",
      company: "Grillo Correa Consultorías SAS",
      image: "/veronica.jpeg",
    },
    {
      quote:
        "Algo que me impactó muchísimo fue la generosidad del conocimiento y del tiempo. Eso hizo la experiencia excepcional.",
      name: "Sarita Trujillo Durán",
      role: "Gerente Estratégica y Comercial",
      company: "Montoya Valle Abogados",
      image: "/sarita.jpeg",
    },
    {
      quote:
        "Fue una explosión en la mente. Me ayudó a aterrizar ideas de negocio basadas en IA que hoy quiero hacer realidad.",
      name: "Benjamín Estrella Aguilar",
      role: "Consultor independiente",
      image: "/benjamin.jpeg",
    },
    {
      quote: "Una ventana de infinitas posibilidades y oportunidades de negocio con propósito.",
      name: "María Isabel Marulanda",
      role: "Líder empresarial",
      image: "/maria_isabel.jpeg",
    },
  ]

  return (
    <main className="min-h-screen">
      {/* Banner promocional */}
      <a href="#reserva-middle" className="relative z-40 block bg-[#fd7914] py-1.5 text-center transition-colors hover:bg-[#ff7a1a] md:py-2">
        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white md:text-sm">
          Transforma tu negocio en un solo día. Aprovecha el 20% de descuento por tiempo limitado !
        </p>
      </a>

      {/* Header / Navegación */}
      <header className="relative z-30 -mb-[80px] px-3 pt-0 md:-mb-[88px] md:px-5">
        <div className="mx-auto flex w-full max-w-[1680px] items-center gap-5 rounded-b-[1.6rem] border border-white/90 bg-white/90 px-4 py-2.5 shadow-[0_10px_28px_rgba(15,23,42,0.08)] backdrop-blur-md md:px-6 md:py-3">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/placeholder-logo.png"
              alt="EurekAI logo"
              width={220}
              height={62}
              className="h-10 w-auto object-contain md:h-12"
            />
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden flex-1 items-center justify-center gap-9 md:flex lg:gap-12">
            <Link
              href={actionLinks.inicio}
              className="text-base font-medium text-slate-800 transition-colors hover:text-slate-950"
            >
              Inicio
            </Link>
            <Link
              href={actionLinks.cursos}
              className="text-base font-medium text-slate-800 transition-colors hover:text-slate-950"
            >
              Cursos
            </Link>
            <Link
              href={actionLinks.facilitadores}
              className="text-base font-medium text-slate-800 transition-colors hover:text-slate-950"
            >
              Facilitadores
            </Link>
            <Link
              href={actionLinks.preguntas}
              className="text-base font-medium text-slate-800 transition-colors hover:text-slate-950"
            >
              Preguntas
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="ml-auto flex items-center gap-4">
            <a
              href="#reserva-middle"
              className="hidden rounded-full bg-[#fd7914] px-9 py-2.5 text-base font-semibold text-white transition-all hover:bg-[#fd7914] md:inline-block"
            >
              Inscríbete
            </a>
            <button className="md:hidden" aria-label="Abrir menú">
              <Menu className="h-6 w-6 text-slate-700" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section id="inicio" className="relative overflow-hidden bg-slate-900 pb-20 pt-36 lg:pb-28 lg:pt-44">
        <div className="absolute inset-0">
          <Image
            src="/banner.jpg"
            alt="Bootcamp presencial"
            fill
            className="object-cover brightness-110 contrast-90"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/50" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/30 to-slate-950/70" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
              <span className="text-balance">
                Bootcamp
                <br />
                de innovación
                <br />
                potenciada con
                <br />
                <span className="text-[#fd7914]">Inteligencia Artificial.</span>
              </span>
            </h1>

            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-slate-200 md:text-xl">
              Tu empresa, tus gerentes y tu equipo no quieren más demos de IA ni innovaciones sin sentido.
              Quieren ROI.
              Únete al único bootcamp que te permite entrar con un reto de negocio a las 8:00 AM y salir con un
              prototipo funcional y un plan validado a las 6:00 PM.
            </p>
            <p className="mt-6 max-w-3xl text-3xl font-bold uppercase leading-tight text-white sm:text-4xl md:text-[2.8rem] lg:text-[3rem]">
              9 DE MAYO
            </p>
            <p className="mt-2 max-w-3xl text-lg font-semibold leading-relaxed text-[#fd7914] md:text-xl">
              Hannah Hopes, Usaquén, Bogotá
            </p>

          </div>
        </div>
      </section>

      {/* Reserva rápida Section */}
      <section id="cursos" className="bg-white pt-10 pb-14 lg:pt-10 lg:pb-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="mt-[10px] text-2xl font-extrabold uppercase tracking-tight text-[#fd7914] sm:text-[2.1rem]">¡FALTAN POCOS DÍAS!</p>
            <div className="mt-4 flex justify-center">
              <CountdownTimer targetDate="2026-05-09T00:00:00-05:00" variant="boxedLight" />
            </div>
            <div className="mt-8">
              <p className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-[2.85rem]">Son solo 25 cupos, ya tenemos</p>

              <div className="mt-5 flex justify-center">
                <div className="relative flex h-24 w-24 items-center justify-center sm:h-28 sm:w-28">
                  <div className="absolute inset-0 rounded-full border-[5px] border-[#d9d9d9]" />
                  <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_360deg,_#fd7914_0deg_108deg,_transparent_108deg_360deg)]" />
                  <div className="absolute inset-[6px] rounded-full bg-white" />
                  <div className="relative flex flex-col items-center leading-none">
                    <span className="text-[3rem] font-extrabold text-[#fd7914] sm:text-[3.2rem]">5</span>
                    <span className="-mt-0.5 text-[0.68rem] font-extrabold uppercase tracking-[0.08em] text-[#fd7914]">Inscritos</span>
                  </div>
                </div>
              </div>

              <p className="mt-6 text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-[2.85rem]">
                Asegura tu entrada 2026 a precio del 2025.
              </p>
              <p className="mt-1 text-3xl font-extrabold leading-tight text-[#fd7914] sm:text-4xl lg:text-[2.8rem]">¡Ahorra un 20% hoy!</p>
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-[1060px] items-stretch gap-8 lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
            <div className="text-left text-slate-800 lg:ml-auto lg:max-w-[470px] lg:pr-6">
              <h3 className="text-[2rem] font-extrabold uppercase tracking-tight">Incluye:</h3>
              <ul className="mt-1.5 list-disc space-y-1.5 pl-7 text-[1.12rem] leading-[1.55] sm:text-[1.22rem]">
                <li>Acceso al Bootcamp Presencial</li>
                <li>Materiales</li>
                <li>Toolkit Digital</li>
                <li>Certificado</li>
                <li>Brunch, Almuerzo y Breaks</li>
                <li>Soporte Post Curso.</li>
              </ul>
            </div>

            <div className="hidden h-full w-px bg-slate-400/75 lg:block" />

            <div className="text-left text-slate-800 mt-8 lg:mt-0 lg:max-w-[560px] lg:pl-12 lg:flex lg:flex-col lg:justify-end">
              <p className="text-[1.18rem] leading-[1.65] sm:text-[1.3rem] lg:text-[1.32rem]">
                <span className="font-extrabold">
                  Aprende con metodologías
                  <br />
                  líderes, comprobadas por más
                  <br />
                  de 600 profesionales,
                </span>{" "}
                directores
                <br />
                de innovación y líderes
                <br />
                corporativos en Latinoamérica
                <br />
                durante +10 años
              </p>
            </div>
          </div>

          <div className="mt-10 flex justify-center">
            <a
              href="#reserva-middle"
              className="inline-flex rounded-full bg-[#fd7914] px-12 py-4 text-base font-bold uppercase text-white shadow-lg shadow-[#fd7914]/30 transition hover:bg-[#ff7a29]"
            >
              QUIERO RESERVAR MI CUPO AHORA
            </a>
          </div>
        </div>
      </section>

      {/* Para Quienes Toman Decisiones Section */}
      <section className="relative overflow-hidden bg-slate-800 py-16 lg:py-24">
        <div className="absolute inset-0">
          <Image
            src="/disenado_banner.jpg"
            alt="Diseñado exclusivamente"
            fill
            className="object-cover brightness-90"
            priority
          />
          <div className="absolute inset-0 bg-slate-900/60" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            {/* Texto izquierdo */}
            <div className="max-w-lg">
              <h2 className="text-3xl font-light text-white md:text-4xl">Diseñado exclusivamente</h2>
              <p className="mt-2 text-4xl font-bold uppercase leading-tight text-white md:text-5xl lg:text-6xl">
                Para quienes
                <br />
                toman decisiones
              </p>
              <p className="mt-6 text-lg leading-relaxed text-slate-200 md:text-xl">
                Hemos creado este programa pensando en perfiles específicos que buscan dar un salto cuántico en su
                capacidad de venta. Esto es para ti si haces parte de alguno de estos grupos:
              </p>
            </div>

            {/* Card derecha */}
            <div className="w-full max-w-xl rounded-[2.5rem] border border-white/15 bg-slate-950/80 p-8 backdrop-blur-2xl shadow-2xl shadow-black/30 lg:p-10">
              <div className="flex flex-col divide-y divide-white/10">
                {/* Item 1 */}
                <div className="flex gap-5 border-b border-white/10 py-6">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src="/vectorlideres.svg"
                      alt="Vector lideres"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Líderes de Innovación y Transformación</h3>
                    <p className="mt-2 text-base leading-7 text-slate-300">
                      Que necesitan un método replicable para acelerar la adopción en sus equipos.
                    </p>
                  </div>
                </div>

                {/* Item 2 */}
                <div className="flex gap-5 border-b border-white/10 py-6">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src="/vectorgerentes.svg"
                      alt="Vector gerentes"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Gerentes de Marketing y Agencias</h3>
                    <p className="mt-2 text-base leading-7 text-slate-300">
                      Que deben pasar de la &quot;idea creativa&quot; a la ejecución eficiente y medible.
                    </p>
                  </div>
                </div>

                {/* Item 3 */}
                <div className="flex gap-5 border-b border-white/10 py-6">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src="/ejecutivos.png"
                      alt="Vector ejecutivos"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Ejecutivos y Empresarios</h3>
                    <p className="mt-2 text-base leading-7 text-slate-300" style={{ textWrap: "pretty" }}>
                      Que no tienen tiempo para cursos de un mes y necesitan entender el &quot;How-to&quot; estratégico en 8 horas.
                    </p>
                  </div>
                </div>

                {/* Item 4 */}
                <div className="flex gap-5 py-6">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src="/emprendedores.svg"
                      alt="Vector emprendedores"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white">Emprendedores</h3>
                    <p className="mt-2 text-base leading-7 text-slate-300">
                      Que buscan llevar su negocio al siguiente nivel con una estrategia ágil y resultados claros.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bootcamp Ideal Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-slate-800 md:text-4xl lg:text-5xl">
            ¿Cómo sé si es el Bootcamp ideal para mi?
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:gap-8">
            {/* Card SI */}
            <div className="flex h-full flex-col justify-start rounded-[2rem] bg-[#fd7914] p-6 lg:p-8 shadow-[0_20px_50px_rgba(253,121,20,0.15)]">
              <div className="mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-[5px] border-white/95">
                  <Check className="h-10 w-10 text-white" strokeWidth={4} />
                </div>
                <h3 className="mt-4 text-[1.95rem] font-extrabold leading-tight text-white md:text-[2.55rem]">SI es para ti:</h3>
              </div>
              <ul className="flex flex-1 flex-col justify-between gap-4 text-base font-semibold text-white/95 md:text-lg" style={{ textWrap: "pretty" }}>
                <li className="flex items-start gap-3">
                  <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-white" />
                  <span className="leading-relaxed">Eres un emprendedor o un líder en tu empresa, y quieres llevar tus proyectos a otro nivel.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-white" />
                  <span className="leading-relaxed">Quieres llevar a cabo una innovación de producto o servicio y no quieres desperdiciar tiempo ni energía.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-white" />
                  <span className="leading-relaxed">Quieres aprender con verdaderos expertos, con un enfoque 100% práctico.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-white" />
                  <span className="leading-relaxed">Quieres formar parte de una comunidad que te acompañe en el proceso</span>
                </li>
              </ul>
            </div>

            {/* Card NO */}
            <div className="flex h-full flex-col justify-start rounded-[2rem] bg-[#0f172a] p-6 lg:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.2)]">
              <div className="mb-6">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border-[5px] border-white/95">
                  <X className="h-10 w-10 text-white" strokeWidth={4} />
                </div>
                <h3 className="mt-4 text-[1.95rem] font-extrabold leading-tight text-white md:text-[2.55rem]">NO es para ti:</h3>
              </div>
              <ul className="flex flex-1 flex-col justify-between gap-4 text-base font-semibold text-white/90 md:text-lg" style={{ textWrap: "pretty" }}>
                <li className="flex items-start gap-3">
                  <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-white/90" />
                  <span className="leading-relaxed">Buscas un curso genérico para aprender IA, hacer prompting o aprender exclusivamente aplicaciones de IA.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-white/90" />
                  <span className="leading-relaxed">Quieres un hack o una fórmula mágica para resolver un proyecto.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-white/90" />
                  <span className="leading-relaxed">Crees que la IA te puede resolver todos los problemas de negocio, y solo es cuestión de encontrar el agente mágico.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-3 h-2.5 w-2.5 shrink-0 rounded-full bg-white/90" />
                  <span className="leading-relaxed">Solo quieres tomar un curso, y resolver en solitario tu problema de negocio o innovación.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Agenda / Timeline Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            {/* Texto izquierdo */}
            <div className="max-w-md lg:sticky lg:top-24">
              <h2 className="text-3xl font-bold leading-tight text-slate-800 md:text-4xl lg:text-5xl">
                Un día intensivo.
                <br />
                100% presencial.
                <br />
                <span className="text-[#fd7914]">Completamente orientado a resultados.</span>
              </h2>
            </div>

            {/* Timeline derecha */}
            <div className="relative flex-1 max-w-xl">
              {/* Línea vertical */}
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-slate-400/80" />

              {/* Items del timeline */}
              <div className="flex flex-col gap-6">
                {[
                  { time: "8:00", activity: "Bienvenida" },
                  { time: "8:30", activity: "Instrucciones y agrupación" },
                  { time: "9:00", activity: "Revisión de tendencias (Radar)" },
                  { time: "9:45", activity: <strong>Break</strong> },
                  { time: "10:00", activity: "Definición del Reto, Arbol de Problemas, 5 Porqués, IA" },
                  { time: "11:00", activity: "Ideación, Lego Serious Play y brainstorming con IA" },
                  { time: "12:00", activity: <strong>Almuerzo</strong> },
                  { time: "1:30", activity: "Prototipado: Brochure, Safari, Agente de prototipado IA" },
                  { time: "3:30", activity: <strong>Break</strong> },
                  { time: "3:45", activity: "Implementación: Trello y asistente de IA" },
                  { time: "5:00", activity: "Pitch & Shark Tank con jurados invitados expertos en innovación" },
                  { time: "6:00", activity: "Cierre y Celebración" },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    {/* Punto naranja */}
                    <div className="relative z-10 mt-1 h-6 w-6 shrink-0 rounded-full bg-[#fd7914]" />
                    {/* Contenido */}
                    <p className="text-lg text-slate-700" style={{ textWrap: "pretty" }}>
                      <span className="font-bold">{item.time}:</span> {item.activity}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modalidad Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="mx-auto max-w-6xl px-6">
          {/* Banner Modalidad */}
          <div className="mx-auto max-w-4xl rounded-[2rem] bg-[#fd7914] px-4 py-5 md:px-8 md:py-8">
            <div className="grid items-center gap-4 md:grid-cols-[1.08fr_1fr_1fr] md:gap-6">
              <div className="text-left md:max-w-[300px]">
                <p className="text-2xl font-extrabold uppercase tracking-tight leading-[0.95] text-white md:text-[2.5rem] md:leading-[1]">
                  MODALIDAD
                  <br />
                  PRESENCIAL:
                </p>
              </div>

              <div className="flex min-h-[180px] flex-col items-center justify-center gap-4 text-center md:min-h-[190px]">
                <div className="icon1 flex h-[72px] w-[72px] items-center justify-center">
                  <Image src="/icono70.svg" alt="Icono 70" width={60} height={60} className="object-contain" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="block text-[3.5rem] font-black leading-none text-white md:text-[4.4rem]">70%</span>
                  <span className="text-[1.7rem] font-semibold text-white md:text-[2.1rem]">Práctico</span>
                </div>
              </div>

              <div className="flex min-h-[180px] flex-col items-center justify-center gap-4 border-l border-white/70 px-3 text-center md:min-h-[190px] md:px-4">
                <div className="icon2 flex h-[72px] w-[72px] items-center justify-center">
                  <Image src="/icono30.svg" alt="Icono 30" width={60} height={60} className="object-contain" />
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="block text-[3.5rem] font-black leading-none text-white md:text-[4.4rem]">30%</span>
                  <span className="text-[1.7rem] font-semibold text-white md:text-[2.1rem]">Teórico</span>
                </div>
              </div>
            </div>
          </div>

          {/* Título */}
          <h2 className="mt-16 text-center text-3xl font-bold leading-tight text-slate-800 md:text-4xl lg:text-5xl">
            Te llevas muchísimo más que un diploma
            <br />
            <span className="text-[#fd7914]">Te llevas un Sistema Operativo de Innovación.</span>
          </h2>

          {/* Cards de beneficios */}
          <div className="mt-12">
            <div className="flex gap-6 overflow-hidden">
              {visibleBenefitCards.map((card) => {
                const Icon = card.icon
                return (
                  <div key={card.title} className="min-w-[320px] flex-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                    <Icon className="h-10 w-10 text-[#fd7914]" strokeWidth={1.5} />
                    <h3 className="mt-4 text-lg font-bold text-slate-800">{card.title}</h3>
                    <p className="mt-2 text-base font-semibold leading-relaxed text-slate-600">{card.description}</p>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setBenefitsPage((current) => (current - 1 + benefitPageCount) % benefitPageCount)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
                aria-label="Anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex items-center gap-2">
                {Array.from({ length: benefitPageCount }).map((_, index) => (
                  <span
                    key={index}
                    className={`h-2.5 w-8 rounded-full transition ${
                      benefitsPage === index ? "bg-[#fd7914]" : "bg-slate-300"
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={() => setBenefitsPage((current) => (current + 1) % benefitPageCount)}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
                aria-label="Siguiente"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Entrenadores Section */}
      <section id="facilitadores" className="bg-slate-100 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6">
          {/* Título */}
          <h2 className="text-center text-3xl font-bold leading-tight text-slate-800 md:text-4xl lg:text-5xl">
            Tus entrenadores en el campo de batalla
            <br />
            <span className="text-[#fd7914]">Y con muchas horas de vuelo.</span>
          </h2>

          {/* Perfiles */}
          <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
            {/* Andrés Rubiano */}
            <div className="flex flex-col items-center text-center">
              <div className="relative h-56 w-56 overflow-hidden rounded-full bg-slate-300 shadow-xl ring-4 ring-white lg:h-64 lg:w-64">
                <Image
                  src="/andreswht.png"
                  alt="Andrés Rubiano"
                  fill
                  className="object-cover object-top"
                />
              </div>
              {/* Social Icons */}
              <div className="mt-4 flex items-center gap-3" aria-label="Iconos sociales visuales">
                <a
                  href="https://linkedin.com/in/andresrubiano32"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-full border border-slate-300 bg-white p-3 shadow-sm transition hover:bg-slate-50"
                  aria-label="LinkedIn de Andrés Rubiano"
                >
                  <Linkedin className="h-4 w-4 text-slate-700" />
                </a>
              </div>
              <h3 className="mt-4 text-[1.18rem] font-bold text-[#fd7914] md:text-[1.35rem]">Andrés Rubiano</h3>
              <p className="mt-2 max-w-[20rem] text-center text-[1.03rem] leading-8 text-slate-700 md:max-w-[24rem] md:text-[1.08rem]">
                <strong>CEO eki | Consultor experto, 15+ años de experiencia en innovación corporativa con impacto y educación ejecutiva.</strong> Ha implementado sistemas de innovación en 60+ empresas de LATAM, desde startups hasta corporativos.
              </p>
            </div>

            {/* César Trujillo */}
            <div className="flex flex-col items-center text-center">
              <div className="relative h-56 w-56 overflow-hidden rounded-full bg-slate-300 shadow-xl ring-4 ring-white lg:h-64 lg:w-64">
                <Image
                  src="/cesarwht.jpg"
                  alt="César Trujillo"
                  fill
                  className="object-cover object-top"
                />
              </div>
              {/* Social Icons */}
              <div className="mt-4 flex items-center gap-3" aria-label="Iconos sociales visuales">
                <span className="rounded-full border border-slate-300 bg-white p-3 shadow-sm">
                  <Instagram className="h-4 w-4 text-slate-700" />
                </span>
                <a
                  href="https://linkedin.com/in/cesartrujillo"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-full border border-slate-300 bg-white p-3 shadow-sm transition hover:bg-slate-50"
                  aria-label="LinkedIn de César Trujillo"
                >
                  <Linkedin className="h-4 w-4 text-slate-700" />
                </a>
              </div>
              <h3 className="mt-4 text-[1.18rem] font-bold text-[#fd7914] md:text-[1.35rem]">César Trujillo</h3>
              <p className="mt-2 max-w-[20rem] text-center text-[1.03rem] leading-8 text-slate-700 md:max-w-[24rem] md:text-[1.08rem]">
                <strong>Socio Fundador SupermAInds | Bogotá Chapter Lead para The AI Collective | Cursando un Doctorado en IA + ML. Walsh College (USA)</strong> 30+ años de experiencia en la intersección entre tecnología, humanidades y negocios.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Marcas / Logos Section */}
      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          {/* Título */}
          <h2 className="text-center text-2xl font-bold leading-tight text-slate-800 md:text-3xl lg:text-4xl">
            Metodologías aplicadas con empresarios
            <br />
            y líderes de <span className="text-[#fd7914]">grandes empresas:</span>
          </h2>

          {/* Carrusel de marcas */}
          <div className="brands-marquee mt-12 overflow-hidden py-7">
            <div className="brands-track">
              {[...brandLogos, ...brandLogos].map((logo, index) => (
                <div key={`${logo.alt}-${index}`} className="brands-item flex h-12 min-w-[170px] items-center justify-center">
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

      {/* Testimonios Section */}
      <section className="bg-slate-100 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Título */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-slate-800 md:text-4xl lg:text-5xl">
              Experiencias <span className="text-[#fd7914]">Transformadoras</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-xl text-slate-600">
              Escucha de ex-alumnos reales que han cambiado su futuro a partir de nuestros cursos.
            </p>
          </div>

          <TestimonialsCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Early Bird Offer Section */}
      <section id="reserva" className="relative overflow-hidden py-16 lg:py-24 scroll-mt-24">
        <div className="absolute inset-0">
          <Image
            src="/early_bird.png"
            alt="Early Bird fondo"
            fill
            className="object-cover brightness-95"
            priority
          />
          <div className="absolute inset-0 bg-slate-950/46" />
        </div>

        <div className="relative mx-auto max-w-[1440px] px-6 text-center text-white">
          <p className="text-lg font-semibold uppercase tracking-[0.2em] text-white/80 sm:text-xl">
            9 de mayo · Hannah Hopes, Usaquén, Bogotá
          </p>
          <h2 id="reserva-middle" className="text-[4.4rem] font-extrabold uppercase tracking-[0.015em] text-[#fd7914] sm:text-[4.9rem] lg:text-[5.4rem]">
            Early Bird
          </h2>
          <p className="mt-3 text-[2.1rem] font-semibold text-white/90 sm:text-[2.5rem] lg:text-[2.8rem]">
            Precio especial hasta el 01 de mayo
          </p>

          <div id="reserva-countdown" className="mx-auto mt-8 inline-flex justify-center rounded-[1.35rem] bg-white/10 px-4 py-4 shadow-[0_24px_60px_rgba(2,8,23,0.22)] sm:px-6">
            <CountdownTimer
              targetDate="2026-05-01T00:00:00-05:00"
              variant="boxed"
              size="large"
              className="text-white"
            />
          </div>

          <div className="relative mt-12 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="pointer-events-none absolute left-1/2 top-3 hidden h-[86%] w-px -translate-x-1/2 bg-white/45 lg:block" />

            <div className="text-center lg:pr-10">
              <h3 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Valor normal del Bootcamp:</h3>
              <p className="mt-10 text-5xl font-bold tracking-tight text-white line-through decoration-[3px] decoration-white/85 sm:text-6xl lg:text-7xl xl:text-[4.5rem]">
                $ 2.750.000
              </p>
            </div>

            <div id="preventa" className="text-center lg:pl-10">
              <h3 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">Precio Especial de Preventa:</h3>
              <div className="mt-8 inline-flex rounded-[1.35rem] bg-white px-7 py-5 shadow-[0_24px_60px_rgba(2,8,23,0.28)] sm:px-9 sm:py-6">
                <p className="text-4xl font-extrabold tracking-tight text-[#fd7914] sm:text-5xl lg:text-[3.4rem]">$ 2.200.000</p>
              </div>

            </div>
          </div>

          <div className="mt-10 flex flex-col items-center">
            <a
              href="https://checkout.wompi.co/l/MIULqQ"
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex rounded-full bg-[#fd7914] px-12 py-5 text-2xl font-bold uppercase tracking-wide text-white shadow-lg shadow-[#fd7914]/40 transition hover:bg-[#fd7914] sm:px-16"
            >
              !Reserva tu cupo ahora!
            </a>
            <p className="mt-4 text-xl text-white/80 sm:text-2xl">Pago seguro. Factura corporativa disponible.</p>
          </div>
        </div>
      </section>

      {/* Post Bootcamp Support Section */}
      <section className="bg-[#f2f2f3] py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
            ¿Y después del sábado qué?
            <br />
            ¡No te dejamos solo!
          </h2>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <article className="flex items-start gap-5 rounded-3xl border-2 border-slate-800/55 bg-transparent px-7 py-7">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                <Users className="h-10 w-10 text-[#fd7914]" strokeWidth={2.1} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Acceso a Comunidad de Alumni</h3>
                <p className="mt-2 text-lg leading-relaxed text-slate-700">
                  Nutrición continua y actualizaciones en nuestra comunidad Eurekai en WhatsApp.
                </p>
              </div>
            </article>

            <article className="flex items-start gap-5 rounded-3xl border-2 border-slate-800/55 bg-transparent px-7 py-7">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center">
                <UserPlus className="h-10 w-10 text-[#fd7914]" strokeWidth={2.1} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-slate-900">Seguimiento Post Bootcamp:</h3>
                <p className="mt-2 text-lg leading-relaxed text-slate-700">
                  Acompañamiento con tus instructores para asegurar que implementes lo aprendido.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="preguntas" className="bg-[#ececed] py-16 lg:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-center text-4xl font-bold text-slate-900 md:text-5xl">Preguntas</h2>
          <p className="mt-4 text-center text-2xl text-slate-500">Respuestas a lo que importa</p>

          <div className="mt-10 grid gap-6 items-start md:grid-cols-2">
            {[
              {
                question: "¿Qué voy a lograr al terminar el día?",
                answer:
                  "Saldrás con tres entregables concretos: un prototipo funcional de solución a tu reto de negocio, una hoja de ruta de implementación lista para presentar a tu equipo o liderazgo, y el Método EurekAI interiorizado para poder repetirlo en cualquier reto futuro. Lo que a un equipo le toma meses de reuniones, aquí lo estructuras en un solo día.",
              },
              {
                question: "¿Cuál es el nivel de experiencia requerido?",
                answer:
                  "No necesitas ser experto en IA ni en innovación. El bootcamp está diseñado para líderes, gerentes, emprendedores y ejecutivos que quieren resolver problemas reales de negocio. Lo único que necesitas traer es un reto concreto de tu empresa u organización. Nosotros te damos el método, las herramientas y el acompañamiento para resolverlo ese mismo día.",
              },
              {
                question: "¿Este bootcamp sirve para cualquier tipo de empresa o industria?",
                answer:
                  "Sí. El Método EurekAI ha sido aplicado en empresas de tecnología, finanzas, salud, retail, educación, logística y más. No importa el sector — lo que importa es que traigas un reto real y las ganas de trabajarlo. Hemos visto el método funcionar desde startups hasta grandes corporativos y entidades del sector público.",
              },
              {
                question: "¿Puedo hacer el bootcamp en mi horario o hay versión virtual?",
                answer:
                  "Este bootcamp es 100% presencial — esa es precisamente su magia. El modelo de aprendizaje intensivo requiere tu presencia completa el sábado 9 de mayo, de 8:00 AM a 6:00 PM, en Hannah Hopes, Usaquén, Bogotá. No existe versión virtual ni grabación. Lo que se construye en el espacio, con la energía del grupo y la facilitación en vivo, no se replica en un video.",
              },
              {
                question: "¿Cuánto cuesta y cuáles son las opciones de pago?",
                answer:
                  "El valor regular del bootcamp es $2.750.000 COP. Para quienes se inscriban con el precio especial de lanzamiento, el valor es $2.200.000 COP (20% de descuento). El pago se realiza de forma segura a través de nuestra pasarela de pagos y se emite factura corporativa. Si tu empresa requiere otro proceso de facturación, escríbenos directamente.",
              },
              {
                question: "¿Qué incluye exactamente mi inscripción?",
                answer:
                  "Tu inscripción incluye: acceso al bootcamp presencial completo (8AM–6PM), brunch y almuerzo, el toolkit digital EurekAI, tu insignia blockchain Credly verificable en LinkedIn, acceso a la Comunidad Alumni en WhatsApp y 1 mes de soporte post-evento. Si te inscribes con el precio especial del webinar, también recibes el Sandbox EurekAI (prompts exclusivos listos para usar), el Kit de Aplicación (plantillas y estructuras de trabajo) y 3 bonos adicionales de recursos.",
              },
              {
                question: "¿Puedo inscribir a mi equipo o comprar más de un cupo?",
                answer:
                  "Sí, y de hecho es una de las formas más poderosas de aprovechar el bootcamp. Si traes a tu equipo, todos trabajan sobre el mismo reto y salen alineados con el mismo método y prototipo. Escríbenos directamente para coordinar inscripciones grupales y opciones de facturación corporativa. Los cupos son limitados a 25 personas, así que te recomendamos no esperar.",
              },
              {
                question: "¿Dónde es el bootcamp exactamente?",
                answer:
                  "El bootcamp se realiza en Hannah Hopes, Usaquén, Bogotá, el sábado 9 de mayo de 2025, de 8:00 AM a 6:00 PM. Es un espacio diseñado para experiencias de alto impacto, con toda la infraestructura que necesitas para trabajar en profundidad durante el día.",
              },
              {
                question: "¿Qué debo llevar el día del bootcamp?",
                answer:
                  "Solo tu computador portátil (o tablet) y el reto de negocio que quieres resolver. Nosotros nos encargamos del resto: metodología, herramientas de IA, materiales, brunch, almuerzo y todo lo que necesitas para que el día fluya sin fricción.",
              },
              {
                question: "¿Qué pasa si aplico el método y no logro desbloquear mi reto?",
                answer:
                  "Tenemos una garantía clara: si el día del bootcamp participas activamente, aplicas las herramientas y aun así sientes que tu reto no avanzó, te regalamos una sesión privada de 45 minutos 1 a 1 con Andrés y César para destrabarlo juntos. El riesgo lo asumimos nosotros.",
              },
              {
                question: "¿Qué pasa después del bootcamp?",
                answer:
                  "El día del bootcamp es solo el comienzo. Al finalizar tendrás acceso a la Comunidad Alumni EurekAI en WhatsApp con nutrición continua, actualizaciones y conexión con otros profesionales. Además, incluye 1 mes de soporte post-evento para acompañarte en la implementación de lo que construiste. Y si vienes con el precio especial del webinar, también recibes los 3 bonos adicionales para seguir avanzando por tu cuenta.",
              },
              {
                question: "¿Qué es la insignia Credly y para qué sirve?",
                answer:
                  "Es una certificación digital verificable en blockchain que acredita tu participación y los conocimientos adquiridos en el Bootcamp EurekAI. Puedes agregarla directamente a tu perfil de LinkedIn, compartirla con tu empresa o incluirla en tu hoja de vida. Es la prueba tangible de que no solo asististe — sino que construiste algo real.",
              },
            ].map((faq, index) => (
              <details
                key={index}
                className="group w-full rounded-[2rem] border-2 border-slate-300 bg-white/95 p-7 shadow-lg shadow-slate-950/5 transition hover:border-slate-400"
              >
                <summary className="flex cursor-pointer items-center justify-between text-lg font-semibold text-slate-900 md:text-[1rem]">
                  {faq.question}
                  <ChevronDown className="h-6 w-6 text-slate-500 transition duration-200 group-open:-rotate-180" />
                </summary>
                <p className="mt-5 text-base leading-8 text-slate-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contacto" className="bg-[#5a5a5d] py-16 lg:py-20">
        <div className="mx-auto max-w-4xl px-6 text-center text-white">
          <h2 className="text-4xl font-bold md:text-5xl">¿Tienes dudas?</h2>
          <p className="mx-auto mt-6 max-w-[34rem] text-base leading-relaxed text-white/90 md:text-lg">
            Escríbenos por WhatsApp y te ayudamos a resolver tus dudas. Queremos que tomes una decisión con claridad y sin presiones.
          </p>

          <a
            href={actionLinks.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="mx-auto mt-10 inline-flex items-center gap-2 rounded-full bg-[#fd7914] px-8 py-3 text-xl font-bold text-white transition hover:bg-[#fd7914] sm:px-10"
          >
            Contáctanos
            <Image src="/whatsapp.svg" alt="WhatsApp" width={24} height={24} className="h-6 w-6" />
          </a>
        </div>
      </section>

      <section className="bg-black">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-4 sm:flex-row">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/LogoEurekai-WTH.png"
              alt="EurekAI logo"
              width={140}
              height={42}
              className="h-8 w-auto object-contain"
            />
          </Link>
          <p className="text-sm text-white/65">© 2025 EurekAI. Todos los derechos reservados</p>
        </div>
      </section>

      <a
        href={actionLinks.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="fixed bottom-4 right-4 z-50 inline-flex items-center justify-center rounded-full bg-[#fd7914] p-4 text-white shadow-2xl shadow-slate-950/35 transition hover:bg-[#e26b0e] md:bottom-6 md:right-6"
      >
        <Image src="/whatsapp.svg" alt="WhatsApp" width={28} height={28} className="h-7 w-7" />
      </a>
    </main>
  )
}
