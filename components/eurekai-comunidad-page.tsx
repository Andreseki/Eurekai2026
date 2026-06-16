"use client"

import SitePageFooter from "@/components/site-page-footer"
import CourseHeroShell from "@/components/course/CourseHeroShell"
import Navbar from "@/components/Navbar"
import { useSiteModals } from "@/components/site-modals-provider"
import { AlarmClock, Banknote, Zap } from "lucide-react"
import Image from "next/image"

const tribeBullets = [
  "Volver a sentir tribu en un mundo hiperconectado pero solitario.",
  "Experiencias que dejan historias, aliados y próximos pasos.",
  "Conocimiento que se convierte en acción el mismo día.",
  "Afecto como activo; aquí se construyen misioneros, no consumidores.",
]

const alumniStats = [
  {
    value: "6000+",
    title: "Profesionales y líderes",
    description: "Egresados activos en LATAM aplicando el método EurekAI.",
  },
  {
    value: "4",
    title: "Mercados clave",
    description: "Bogotá · Medellín · Ciudad de México · Lima — y creciendo.",
  },
  {
    value: "-70%",
    title: "Tiempo de estructuración",
    description: "Reducción vs. consultoría tradicional para llegar a soluciones accionables.",
  },
]

const premiumCards = [
  {
    icon: Zap,
    title: "Membresía comunidad",
    description:
      "Acceso a fogatas privadas, biblioteca de herramientas y red de pioneros, mensual o anual.",
  },
  {
    icon: AlarmClock,
    title: "Círculos premium",
    description:
      "Cohortes de 6 a 8 semanas para ejecutar proyectos con acompañamiento directo de los fundadores.",
  },
  {
    icon: Banknote,
    title: "Marketplace de expertos",
    description: "Clínicas pagas con mentores curados, horas de acompañamiento 1:1 con especialistas.",
  },
]

export default function EurekAiComunidadPage() {
  const { openContact, openAgenda } = useSiteModals()

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex flex-1 flex-col">
        <CourseHeroShell
          imageSrc="/galeria.jpg"
          imageAlt="Comunidad EurekAI en sesión colaborativa"
        >
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/90">La comunidad</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl lg:text-[3.25rem]">
              La tribu que convierte tecnología en humanidad, y{" "}
              <span className="text-[#F97316]">humanidad en libertad.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/90">
              No es networking superficial, es una comunidad con experiencia que se hacen cargo, construyen
              confianza y generan valor real.
            </p>
          </div>
        </CourseHeroShell>

        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 lg:grid-cols-2 lg:gap-16">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Quiénes somos</p>
              <h2 className="mt-4 text-3xl font-bold text-[#0F172A] md:text-4xl">
                Antes que usuarios, <span className="text-[#F97316]">fuimos tribu</span>
              </h2>
              <p className="mt-6 text-base leading-relaxed text-slate-600 md:text-lg">
                EurekAI nació alrededor de un círculo: un lugar donde las personas se miran a los ojos,
                comparten lo que funciona y se hacen cargo del cambio. Hoy esa tribu sigue creciendo con
                egresados, aliados y pioneros que aplican innovación e Inteligencia Artificial con criterio
                humano.
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                Aquí no vienes a consumir contenido. Vienes a pertenecer, a construir confianza y a convertir
                conocimiento en acción el mismo día.
              </p>
              <ul className="mt-8 space-y-4">
                {tribeBullets.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-slate-700 md:text-base">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#F97316]" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 shadow-lg">
              <Image
                src="/legoserius.jpg"
                alt="Sesión de comunidad EurekAI con dinámicas colaborativas"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-16 lg:py-20">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Red de egresados</p>
              <h2 className="mt-4 text-3xl font-bold text-[#0F172A] md:text-4xl">
                Egresados en <span className="text-[#F97316]">tu industria</span>
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
                Una red activa que sigue construyendo después del programa.
              </p>
            </div>

            <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0">
              {alumniStats.map((stat, index) => (
                <div
                  key={stat.title}
                  className={`px-4 text-center md:px-8 ${
                    index > 0 ? "md:border-l md:border-slate-200" : ""
                  }`}
                >
                  <p className="text-4xl font-extrabold text-[#F97316] md:text-5xl">{stat.value}</p>
                  <p className="mt-4 text-lg font-bold text-[#0F172A]">{stat.title}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-24">
          <div className="mx-auto max-w-6xl px-6">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Próximamente</p>
              <h2 className="mt-4 text-3xl font-bold text-[#0F172A] md:text-4xl">Círculos Premium</h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-slate-600 md:text-lg">
                Grupos pequeños y curados para ejecutar proyectos en 6 a 8 semanas.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {premiumCards.map(({ icon: Icon, title, description }) => (
                <article
                  key={title}
                  className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-slate-300"
                >
                  <Icon className="h-8 w-8 text-[#F97316]" strokeWidth={1.75} aria-hidden />
                  <h3 className="mt-6 text-lg font-bold text-[#0F172A]">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 md:text-base">{description}</p>
                </article>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <button
                type="button"
                onClick={openContact}
                className="inline-flex rounded-full bg-[#F97316] px-10 py-4 text-base font-bold text-white shadow-lg shadow-[#F97316]/30 transition hover:bg-[#ea580c] md:px-12"
              >
                Únete a la lista de espera
              </button>
            </div>
          </div>
        </section>

        <section className="bg-[#334155] py-16 text-white lg:py-20">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">¿Listo para unirte a la tribu?</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-200 md:text-lg">
              Aplica al Bootcamp del 22 de agosto o descarga la guía gratuita para empezar ahora mismo.
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

        <SitePageFooter />
      </main>
    </div>
  )
}
