"use client"

import CourseContactSidebar, { CoursePriceBadge } from "@/components/course/CourseContactSidebar"
import CourseHeroShell from "@/components/course/CourseHeroShell"
import Navbar from "@/components/Navbar"
import {
  CourseDoubtsSection,
  CourseFacilitatorSection,
  CourseFeatureCards,
  CourseInscribeCta,
  CourseLogosSection,
  CoursePageFooter,
  CourseRequirementsGrid,
} from "@/components/course/course-shared-sections"
import {
  CURSO_EXPLORANDO_EVENT_DATE_LABEL,
  CURSO_EXPLORANDO_NAME,
  CURSO_EXPLORANDO_PAYMENT_URL,
  CURSO_EXPLORANDO_PRICE_LABEL,
  CURSO_EXPLORANDO_SUBTITLE,
} from "@/lib/curso-explorando-config"
import { whatsappUrl } from "@/lib/site-config"
import {
  Award,
  Calendar,
  Clock,
  ImageIcon,
  Laptop,
  MapPin,
  Sparkles,
  Users,
  UsersRound,
} from "lucide-react"
import Image from "next/image"
import "@/styles/info-bar.css"

const aprendizajes = [
  "Panorama global de IA desde una perspectiva asiática y su impacto en LATAM.",
  "Metodologías de innovación aplicadas en ecosistemas de alto crecimiento.",
  "Estrategias de adopción de IA con casos reales de empresas y universidades en China.",
  "Networking con emprendedores, académicos e innovadores de la región.",
  "Marco para diseñar una hoja de ruta de IA al regresar a tu organización.",
  "Comprensión cultural y empresarial del futuro de la tecnología en Asia.",
  "Herramientas para identificar oportunidades de colaboración internacional.",
  "Experiencia inmersiva que amplía tu visión estratégica como líder.",
]

const temasRelacionados = [
  "Innovación",
  "Inteligencia Artificial",
  "Transformación digital",
  "Liderazgo global",
  "Estrategia corporativa",
  "Networking internacional",
  "Experiencia inmersiva",
  "Adopción de IA",
  "Visión global",
  "Emprendimiento",
]

const porQueElegir = [
  "Oportunidad rara: experiencia inmersiva única en el mercado latinoamericano.",
  "Aprendizaje en contexto: formación + visitas + networking en el epicentro de la innovación asiática.",
  "Metodología probada: 7 días de formación intensiva con facilitadores con trayectoria internacional.",
  "Certificación internacional: respaldo de universidad partner en China.",
  "Red global: conexiones con líderes latinoamericanos y asiáticos.",
  "Visión ampliada: comprende tendencias de IA que llegarán a LATAM en los próximos años.",
  "Aliados de confianza: acceso a ecosistema de innovadores y empresas en China.",
  "ROI transformacional: experiencia memorable con impacto estratégico duradero.",
]

const dirigidoA = [
  "Líderes que buscan una visión global de la IA y su impacto en los negocios.",
  "Empresarios y emprendedores con ambición internacional.",
  "Profesionales en transición de carrera hacia roles de innovación o estrategia.",
  "Equipos de innovación que necesitan inspiración y casos de referencia globales.",
  "Directores corporativos que quieren entender el futuro desde el epicentro tecnológico.",
]

const andresFacilitador = {
  name: "Andrés Rubiano",
  role: "CEO eki | Co-Fundador EurekAI",
  bio: "CEO eki | Consultor experto, 18+ años de experiencia en innovación corporativa con impacto y educación ejecutiva. Ha implementado sistemas en 60+ empresas de LATAM, desde startups hasta corporativos.",
  quote: "El método detrás de la locura.",
  image: "/andreswht.png",
  objectPosition: "center 38%",
  tags: ["Innovación", "Impacto"] as const,
  linkedin: "https://linkedin.com/in/andresrubiano32",
  instagram: null,
}

export default function EurekAiCursoExplorandoPage() {
  const handleInscribir = () => {
    if (CURSO_EXPLORANDO_PAYMENT_URL) {
      window.open(CURSO_EXPLORANDO_PAYMENT_URL, "_blank", "noopener,noreferrer")
      return
    }
    window.open(
      whatsappUrl(`Hola EurekAI, quiero inscribirme a ${CURSO_EXPLORANDO_NAME}`),
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex flex-1 flex-col">
        <CourseHeroShell
          imageSrc="/explorando.png"
          imageAlt={CURSO_EXPLORANDO_NAME}
          imageClassName="object-cover object-center"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/90">Misiones</p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
              {CURSO_EXPLORANDO_NAME}
            </h1>
            <p className="mt-4 text-xl font-medium text-white/95 md:text-2xl">{CURSO_EXPLORANDO_SUBTITLE}</p>
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-white/90">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#F97316]" aria-hidden />
                Presencial | China
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#F97316]" aria-hidden />
                10 días corridos
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
              <div className="border-b border-slate-200 pb-10">
                <h2 className="text-2xl font-bold text-[#0F172A]">Descripción</h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                  Experiencia inmersiva de 10 días en China que combina formación intensiva en innovación e
                  Inteligencia Artificial con una universidad partner, visitas a ecosistemas de innovación y
                  networking con emprendedores y líderes asiáticos.
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                  Siete días de formación práctica más tres días de experiencia cultural y conexiones
                  estratégicas. Un programa diseñado para líderes que quieren ampliar su visión global y
                  traer aprendizajes accionables a su organización.
                </p>
              </div>

              <div className="info-bar__grid mt-10 max-w-xl">
                <div className="info-bar__grid-item">
                  <Clock strokeWidth={1.75} aria-hidden />
                  <span>10 días corridos</span>
                </div>
                <div className="info-bar__grid-item">
                  <Users strokeWidth={1.75} aria-hidden />
                  <span>12 cupos</span>
                </div>
                <div className="info-bar__grid-item">
                  <MapPin strokeWidth={1.75} aria-hidden />
                  <span>Presencial | Formación + Experiencia cultural + Networking internacional</span>
                </div>
                <div className="info-bar__grid-item">
                  <Calendar strokeWidth={1.75} aria-hidden />
                  <span>{CURSO_EXPLORANDO_EVENT_DATE_LABEL}</span>
                </div>
              </div>

              <div className="mt-8">
                <CoursePriceBadge label={CURSO_EXPLORANDO_PRICE_LABEL} />
              </div>
            </div>

            <CourseContactSidebar courseName={CURSO_EXPLORANDO_NAME} showPricingFooter={false} />
          </div>
        </section>

        <section className="bg-white py-12 lg:py-16">
          <div className="mx-auto max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A]">En este curso aprenderás</h2>
                <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700">
                  {aprendizajes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#0F172A]">Temas relacionados</h2>
                <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-slate-700">
                  {temasRelacionados.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <CourseInscribeCta onInscribir={handleInscribir} />
          </div>
        </section>

        <section className="relative overflow-hidden py-16 lg:py-24">
          <div className="absolute inset-0">
            <Image src="/explorando.png" alt="" fill className="object-cover brightness-75" />
            <div className="absolute inset-0 bg-slate-950/72" />
          </div>
          <div className="relative mx-auto max-w-6xl px-6 text-white">
            <h2 className="text-center text-3xl font-bold md:text-4xl">¿Qué incluye el programa?</h2>
            <div className="mt-12 grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div>
                <h3 className="text-xl font-bold">7 días de formación intensiva en innovación + IA</h3>
                <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-white/90 md:text-base">
                  <li>Facilitadores con experiencia internacional en innovación e IA.</li>
                  <li>Contenido aplicado con casos reales del ecosistema asiático.</li>
                  <li>Ejercicios prácticos y proyectos guiados durante la formación.</li>
                </ul>
                <h3 className="mt-8 text-xl font-bold">3 días de experiencia cultural y networking</h3>
                <ul className="mt-4 list-disc space-y-2 pl-6 text-sm leading-relaxed text-white/90 md:text-base">
                  <li>Visitas a hubs de innovación y empresas referentes.</li>
                  <li>Encuentros con líderes, emprendedores y académicos locales.</li>
                  <li>Experiencias culturales que enriquecen la perspectiva global.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/15 bg-slate-900/60 p-8 backdrop-blur-sm">
                <div className="space-y-6">
                  {[
                    {
                      icon: Award,
                      title: "Certificado de participación internacional",
                      desc: "Emitido por la universidad partner en China.",
                    },
                    {
                      icon: UsersRound,
                      title: "Conexiones valiosas",
                      desc: "Red latinoamericana y asiática de innovadores y líderes.",
                    },
                    {
                      icon: ImageIcon,
                      title: "Acceso a documentación y materiales",
                      desc: "Recursos, plantillas y registro fotográfico del programa.",
                    },
                    {
                      icon: Sparkles,
                      title: "Recuerdos e historias únicas",
                      desc: "Una experiencia transformadora que amplía tu visión como líder.",
                    },
                  ].map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="flex gap-4">
                      <Icon className="mt-1 h-6 w-6 shrink-0 text-[#F97316]" strokeWidth={1.75} aria-hidden />
                      <div>
                        <p className="font-bold">{title}</p>
                        <p className="mt-1 text-sm text-white/80">{desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <CourseFeatureCards porQue={porQueElegir} dirigidoA={dirigidoA} />
        <CourseRequirementsGrid
          items={[
            { icon: Laptop, text: "Computador con acceso a internet." },
            { icon: Sparkles, text: "No se requiere experiencia previa en programación." },
          ]}
        />
        <CourseFacilitatorSection facilitators={[andresFacilitador]} />
        <CourseLogosSection />
        <CourseDoubtsSection />
        <CoursePageFooter />
      </main>
    </div>
  )
}
