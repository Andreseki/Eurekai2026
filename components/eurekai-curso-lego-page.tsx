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
import { CURSO_LEGO_NAME, CURSO_LEGO_PAYMENT_URL, CURSO_LEGO_PRICE_LABEL } from "@/lib/curso-lego-config"
import { whatsappUrl } from "@/lib/site-config"
import {
  Brain,
  Calendar,
  Clock,
  MapPin,
  Puzzle,
  Square,
  UserX,
  Users,
} from "lucide-react"
import "@/styles/info-bar.css"

const aprendizajes = [
  "La metodología PREGUNTAR: formular las preguntas correctas que desbloquean insights del equipo.",
  "La metodología CONSTRUIR: materializar ideas complejas en modelos tridimensionales compartidos.",
  "La metodología COMPARTIR: crear un lenguaje común y narrativas que alineen al grupo.",
  "La metodología REFLEXIONAR: extraer aprendizajes accionables de cada construcción.",
  "Facilitar sesiones donde todos participan por igual, sin importar jerarquía.",
  "Resolver retos estratégicos u operativos con resultados tangibles en una jornada.",
  "Aplicar la metodología certificada internacionalmente en contextos corporativos reales.",
]

const incluye = [
  "Sesión presencial de 8 horas con facilitador certificado.",
  "Materiales de LEGO® Serious Play® para todo el grupo.",
  "Diseño de dinámica adaptada al reto de tu organización.",
  "Documentación de resultados y próximos pasos.",
  "Certificado de participación.",
  "Facilitador con experiencia en innovación corporativa.",
  "Metodología probada en Fortune 500 y empresas LATAM.",
  "Espacio para hasta 25 participantes con acompañamiento directo.",
]

const temasRelacionados = [
  "Design Thinking",
  "Innovación corporativa",
  "Trabajo en equipo",
  "Facilitación",
  "Creatividad",
  "Alineación estratégica",
  "Cambio organizacional",
  "Colaboración",
  "Metodologías experienciales",
]

const porQueElegir = [
  "100% de participación garantizada: no hay jerarquías ni \"el jefe habla más\".",
  "Resultados en tiempo real: resuelves en un día lo que meses de reuniones no han logrado.",
  "Memorable outcomes: los participantes recuerdan exactamente qué construyeron y por qué (impacto duradero).",
  "Desbloquea imaginación en equipos \"racionales\" o muy estructurados.",
  "Construye confianza auténtica y lenguaje compartido en el equipo.",
  "Soluciones complejas surgen de forma natural, sin resistencia.",
  "Metodología certificada internacionalmente y probada en Fortune 500 companies.",
  "Experiencia única y motivadora que transforma dinámicas corporativas.",
]

const dirigidoA = [
  "Equipos de transformación digital o innovación.",
  "Juntas directivas en búsqueda de alineación estratégica.",
  "Áreas que necesitan innovación interna y pensamiento creativo.",
  "Grupos en transición cultural o cambio organizacional.",
  "Equipos de liderazgo en etapa de reinvención.",
  "Emprendimientos en búsqueda de dirección clara.",
  "Cualquier equipo que necesite desbloquear creatividad y colaboración.",
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

export default function EurekAiCursoLegoPage() {
  const handleInscribir = () => {
    if (CURSO_LEGO_PAYMENT_URL) {
      window.open(CURSO_LEGO_PAYMENT_URL, "_blank", "noopener,noreferrer")
      return
    }
    window.open(
      whatsappUrl(`Hola EurekAI, quiero información sobre ${CURSO_LEGO_NAME}`),
      "_blank",
      "noopener,noreferrer",
    )
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />

      <main className="flex flex-1 flex-col">
        <CourseHeroShell
          imageSrc="/legoserius.jpg"
          imageAlt={CURSO_LEGO_NAME}
          imageClassName="object-cover object-center"
        >
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-white/90">In Company</p>
            <h1 className="mt-4 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
              {CURSO_LEGO_NAME}
            </h1>
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-white/90">
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#F97316]" aria-hidden />
                Presencial
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#F97316]" aria-hidden />
                8 horas
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
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Workshop experiencial basado en la metodología LEGO® Serious Play®, diseñado para equipos que
                  necesitan alinear visiones, resolver retos complejos y construir confianza real. A través de
                  dinámicas guiadas con bloques, cada participante contribuye por igual, sin importar su rol
                  jerárquico.
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Ideal para juntas directivas, equipos de innovación, áreas en transformación o grupos que
                  buscan desbloquear creatividad colectiva y llegar a decisiones concretas en una sola jornada.
                </p>
                <p className="mt-4 text-base leading-relaxed text-slate-600">
                  Facilitamos el proceso completo: diseño de la dinámica según tu reto, materiales, sesión
                  presencial y documentación de resultados.
                </p>
              </div>

              <div className="info-bar__grid mt-10 max-w-xl">
                <div className="info-bar__grid-item">
                  <Clock strokeWidth={1.75} aria-hidden />
                  <span>8 horas</span>
                </div>
                <div className="info-bar__grid-item">
                  <Users strokeWidth={1.75} aria-hidden />
                  <span>Mínimo 15 | Máximo 25</span>
                </div>
                <div className="info-bar__grid-item">
                  <MapPin strokeWidth={1.75} aria-hidden />
                  <span>Modalidad presencial</span>
                </div>
                <div className="info-bar__grid-item">
                  <Calendar strokeWidth={1.75} aria-hidden />
                  <span>Fecha según disponibilidad</span>
                </div>
              </div>

              <div className="mt-8">
                <CoursePriceBadge label={CURSO_LEGO_PRICE_LABEL} icon="coffee" />
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
              courseName={CURSO_LEGO_NAME}
              extraFields={[
                { name: "empresa", label: "EMPRESA", placeholder: "EurekAI" },
                { name: "participantes", label: "CANTIDAD DE PARTICIPANTES", placeholder: "15", type: "number" },
              ]}
              showPricingFooter={false}
            />
          </div>
        </section>

        <CourseIncludesSection incluye={incluye} temas={temasRelacionados} onInscribir={handleInscribir} />
        <CourseFeatureCards porQue={porQueElegir} dirigidoA={dirigidoA} />
        <CourseRequirementsGrid
          items={[
            { icon: Clock, text: "Disponibilidad de 8 horas continuas (o 2 sesiones de 4 horas si se requiere flexibilidad)." },
            { icon: Square, text: "Espacio físico con mesas amplias y luz natural (preferentemente)." },
            { icon: Users, text: "Grupo de mínimo 15 personas (máximo 25 para garantizar efectividad)." },
            { icon: Brain, text: "Disposición genuina para participar activamente en dinámicas creativas." },
            { icon: Puzzle, text: "Los participantes deben estar dispuestos a construir modelos \"sin presión estética\"." },
            { icon: UserX, text: "No se requieren conocimientos previos en LEGO ni en metodologías de innovación." },
          ]}
        />
        <CourseFacilitatorSection title="Tu Facilitador" facilitators={[andresFacilitador]} />
        <CourseLogosSection />
        <CourseDoubtsSection />
        <CoursePageFooter />
      </main>
    </div>
  )
}
