"use client"

import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { useSiteModals } from "@/components/site-modals-provider"
import { Brain, Instagram, Lightbulb, Linkedin, Target } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const logosCesar = [
  { src: "/Bancolombia.png", alt: "Bancolombia" },
  { src: "/Nestle.png", alt: "Nestlé" },
  { src: "/Keraltu.png", alt: "Keralty" },
  { src: "/BancoAzteca.png", alt: "Banco Azteca" },
  { src: "/UniversidaddelRosario.png", alt: "Universidad del Rosario" },
  { src: "/Envia.png", alt: "Envia" },
]

const logosAndres = [
  { src: "/Bancolombia.png", alt: "Bancolombia" },
  { src: "/Carvajal.png", alt: "Carvajal" },
  { src: "/Sodexo.png", alt: "Sodexo" },
  { src: "/Compensar.png", alt: "Compensar" },
  { src: "/GrupoBolivar.png", alt: "Grupo Bolívar" },
  { src: "/Proteccion.png", alt: "Protección" },
  { src: "/MacPollo.png", alt: "Mac Pollo" },
  { src: "/Alfa.png", alt: "Alfa" },
]

export default function EurekAiNosotrosPage() {
  const { openContact, openAgenda } = useSiteModals()

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <section className="relative min-h-[460px] overflow-hidden bg-[#0F172A] text-white lg:min-h-[520px]">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/quienessomos.jpg"
            alt="Equipo EurekAI"
            fill
            className="scale-110 object-cover object-[92%_center] sm:object-[94%_center] md:scale-105 md:object-[96%_center] lg:object-[100%_center]"
            priority
            sizes="100vw"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[min(100%,46rem)] bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(15,23,42,0.88)_14%,rgba(15,23,42,0.72)_32%,rgba(15,23,42,0.35)_52%,rgba(15,23,42,0.06)_72%,transparent_100%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-[min(100%,30rem)] bg-[linear-gradient(90deg,rgba(2,6,23,0.65)_0%,transparent_100%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto flex min-h-[460px] max-w-6xl flex-col justify-center px-6 py-20 lg:min-h-[520px] lg:py-28">
          <div className="max-w-xl text-left">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/90">Quiénes somos</p>
            <h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">
              Dos personas que renunciaron para{" "}
              <span className="text-[#F97316]">construir algo real.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/90">
              No somos influencers de IA, somos profesionales con trayectorias en empresa, academia y
              consultoría que aplicaron el método en organizaciones reales y luego renunciaron para
              democratizarlo.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/bootcamp"
                className="inline-flex rounded-full bg-[#F97316] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#ea580c]"
              >
                Bootcamp
              </Link>
              <button
                type="button"
                onClick={openContact}
                className="inline-flex rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Guía gratuita
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#F97316]">
            La ruta que nos trajo aquí
          </p>
          <h2 className="mt-4 text-center text-3xl font-bold text-[#0F172A] md:text-4xl">
            Historias de los fundadores
          </h2>

          <div className="mt-16 space-y-16 border-t border-slate-200 pt-16">
            <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
              <div className="flex w-full shrink-0 flex-col items-center md:w-48">
                <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-[#F97316] bg-slate-200 shadow-lg">
                  <Image src="/cesarwht.jpg" alt="César Trujillo" fill className="object-cover" />
                </div>
                <div className="mt-4 flex w-full justify-center gap-3">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-full border border-slate-200 p-3 text-slate-700 transition hover:bg-slate-50"
                    aria-label="Instagram César Trujillo"
                  >
                    <Instagram className="h-4 w-4" />
                  </a>
                  <a
                    href="https://linkedin.com/in/cesartrujillo"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-full border border-slate-200 p-3 text-slate-700 transition hover:bg-slate-50"
                    aria-label="LinkedIn César Trujillo"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="min-w-0 flex-1 space-y-4 text-slate-700">
                <h3 className="text-2xl font-bold text-[#F97316]">César Trujillo</h3>
                <p className="text-sm font-semibold text-slate-900">Co-Fundador EurekAI | PhD IA &amp; ML</p>
                <p className="leading-relaxed">
                  Lideraba la adopción de IA en una compañía de la que era socio. Les guardaba gratitud,
                  pero muy en el fondo… no era feliz. Así que decidí escuchar a mi instinto.
                </p>
                <p className="leading-relaxed">
                  Arranqué mi Doctorado en AI &amp; Machine Learning, renuncié en octubre, y empecé de
                  cero. Y en todo este tiempo me he dado cuenta de algo crítico:{" "}
                  <strong>La IA es rapidísima, pero sin un marco humano estratégico, solo genera ruido.</strong>
                </p>
                <p className="leading-relaxed">
                  En este viaje de reinvención me reencontré con Andrés y nos dimos cuenta de que estábamos
                  buscando lo mismo. Así nació EurekAI.
                </p>
                <hr className="border-slate-200" />
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Clientes:</p>
                <div className="flex flex-wrap items-center gap-x-10 gap-y-10 py-4 md:gap-x-12 md:gap-y-10">
                  {logosCesar.map((l) => (
                    <Image
                      key={l.alt}
                      src={l.src}
                      alt={l.alt}
                      width={130}
                      height={48}
                      className="h-10 w-auto max-w-[140px] object-contain grayscale opacity-80 md:h-12 md:max-w-[160px]"
                    />
                  ))}
                </div>
              </div>
            </div>

            <hr className="border-slate-200" />

            <div className="flex flex-col gap-10 md:flex-row md:items-start md:gap-12">
              <div className="flex w-full shrink-0 flex-col items-center md:w-48">
                <div className="relative h-40 w-40 overflow-hidden rounded-full border-4 border-[#F97316] bg-slate-200 shadow-lg">
                  <Image
                    src="/andreswht.png"
                    alt="Andrés Rubiano"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "center 38%" }}
                  />
                </div>
                <div className="mt-4 flex w-full justify-center gap-3">
                  <a
                    href="https://linkedin.com/in/andresrubiano32"
                    target="_blank"
                    rel="noreferrer noopener"
                    className="rounded-full border border-slate-200 p-3 text-slate-700 transition hover:bg-slate-50"
                    aria-label="LinkedIn Andrés Rubiano"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                </div>
              </div>
              <div className="min-w-0 flex-1 space-y-4 text-slate-700">
                <h3 className="text-2xl font-bold text-[#F97316]">Andrés Rubiano</h3>
                <p className="text-sm font-semibold text-slate-900">CEO eki | Co-Fundador EurekAI</p>
                <p className="leading-relaxed">
                  Renuncié a mi puesto como gerente de una empresa de transporte y dejé mi silla en la junta
                  del gremio más importante del sector logístico de Colombia, decidí poner mi propósito por
                  encima de todo.
                </p>
                <p className="leading-relaxed">
                  Me di cuenta de algo doloroso: No estaba resolviendo la causa de mis propios problemas, mi
                  incertidumbre y mi miedo a no arrancar venían de no estar atacando la raíz de lo que
                  realmente me generaba ese brillo en los ojos.
                </p>
                <p className="leading-relaxed">
                  Apliqué en mi vida lo que hoy hago en los negocios: Buscar la causa raíz. Con César
                  descubrimos que{" "}
                  <strong>la innovación da la dirección y la IA da la velocidad.</strong>
                </p>
                <hr className="border-slate-200" />
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Clientes:</p>
                <div className="flex flex-wrap items-center gap-x-10 gap-y-10 py-4 md:gap-x-12 md:gap-y-10">
                  {logosAndres.map((l) => (
                    <Image
                      key={l.alt}
                      src={l.src}
                      alt={l.alt}
                      width={130}
                      height={48}
                      className="h-10 w-auto max-w-[140px] object-contain grayscale opacity-80 md:h-12 md:max-w-[160px]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-100 py-16 lg:py-24">
        <div className="mx-auto max-w-5xl px-6">
          <p className="text-center text-xs font-bold uppercase tracking-[0.22em] text-[#0F172A]">
            PROPÓSITO
          </p>
          <h2 className="mx-auto mt-4 max-w-4xl text-center text-3xl font-bold leading-snug text-[#0F172A] md:text-4xl">
            La Innovación da la dirección. La IA da la velocidad.
            <br />
            <span className="text-[#F97316]">Juntos crean Impacto.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-center text-lg text-slate-700">
            EurekAI es una comunidad de pioneros que se reúne para convertir relaciones humanas en libertad:
            libertad de crear, de servir, de emprender y de vivir con sentido.
          </p>

          <div className="mt-14 grid gap-8 sm:grid-cols-2">
            <div className="rounded-3xl border border-[#0F172A] bg-slate-50 p-8 text-left shadow-sm">
              <Target className="h-10 w-10 text-[#F97316]" strokeWidth={1.75} aria-hidden />
              <h3 className="mt-5 text-lg font-bold text-[#0F172A]">Misión</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-800">
                Democratizar el acceso a la innovación con IA a través de experiencias formativas prácticas,
                accesibles y de alto impacto que permitan a profesionales y organizaciones resolver sus retos
                reales en horas, no en meses.
              </p>
            </div>

            <div className="rounded-3xl border border-[#0F172A] bg-slate-50 p-8 text-left shadow-sm">
              <Lightbulb className="h-10 w-10 text-[#F97316]" strokeWidth={1.75} aria-hidden />
              <h3 className="mt-5 text-lg font-bold text-[#0F172A]">Visión</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-800">
                Ser la plataforma de referencia en LATAM para profesionales y empresas que quieren usar la
                Inteligencia Artificial con método, criterio humano e impacto real — construyendo una comunidad
                de pioneros.
              </p>
            </div>

            <div className="rounded-3xl border border-[#0F172A] bg-slate-50 p-8 text-left shadow-sm">
              <p className="text-2xl font-black leading-none tracking-tight text-[#F97316]" aria-hidden>
                3i
              </p>
              <h3 className="mt-4 text-lg font-bold text-[#0F172A]">Las 3i</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-800">
                <strong>Innovación</strong> → da la dirección · <strong>IA</strong> → da la velocidad ·{" "}
                <strong>Impacto</strong> → es el norte. No enseñamos IA por usarla, la integramos dentro de
                un proceso probado de innovación.
              </p>
            </div>

            <div className="rounded-3xl border border-[#0F172A] bg-slate-50 p-8 text-left shadow-sm">
              <Brain className="h-10 w-10 text-[#F97316]" strokeWidth={1.75} aria-hidden />
              <h3 className="mt-5 text-lg font-bold text-[#0F172A]">Filosofía</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-800">
                En el origen de toda comunidad humana hay un círculo, un fuego, una plaza, un lugar donde las
                personas se miran a los ojos. Antes que &quot;usuarios&quot;, fuimos tribu, EurekAI trae ese
                círculo al presente.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#374151] py-16 text-center text-white">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-3xl font-bold md:text-4xl">¿Listo para unirte a la tribu?</h2>
          <p className="mt-4 text-lg text-slate-200">
            Aplica al Bootcamp del 30 de mayo o descarga la guía gratuita para empezar ahora mismo.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button
              type="button"
              onClick={openAgenda}
              className="w-full rounded-full border-2 border-white px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
            >
              Agendar una charla
            </button>
            <button
              type="button"
              onClick={openContact}
              className="w-full rounded-full bg-[#F97316] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#ea580c] sm:w-auto"
            >
              Aplicar ahora
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
