"use client"

import { Instagram, Linkedin } from "lucide-react"
import Image from "next/image"

export type TrainersSectionProps = Record<string, never>

const trainers = [
  {
    name: "Andrés Rubiano",
    role: "CEO eki | Co-Fundador EurekAI",
    bio: "CEO EKI, experto en innovación corporativa. Ha implementado sistemas en 60+ empresas. \"El método detrás de la locura\".",
    image: "/andreswht.png",
    imagePosition: "center 38%",
    linkedin: "https://linkedin.com/in/andresrubiano32",
    instagram: null as string | null,
  },
  {
    name: "César Trujillo",
    role: "Co-Fundador EurekAI | PhD IA & ML",
    bio: "Socio Fundador Superminds, 30 años en tecnología y humanidades. Candidato a Doctor en IA y Machine Learning. \"La conexión entre la IA y los negocios\".",
    image: "/cesarwht.jpg",
    imagePosition: "center",
    linkedin: "https://linkedin.com/in/cesartrujillo",
    instagram: "https://instagram.com",
  },
] as const

export default function TrainersSection(_props: TrainersSectionProps) {
  return (
    <section id="facilitadores" className="bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="text-center text-3xl font-bold leading-tight text-[#0F172A] md:text-4xl lg:text-5xl">
          Tus entrenadores en el campo de batalla
          <br />
          <span className="text-[#F97316]">Y con muchas horas de vuelo.</span>
        </h2>

        <div className="mt-14 grid gap-8 md:grid-cols-2 md:gap-10">
          {trainers.map((t) => (
            <article
              key={t.name}
              className="flex flex-col items-center rounded-3xl bg-[#1a1f2e] px-8 pb-10 pt-10 text-center transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="relative h-40 w-40 overflow-hidden rounded-full ring-2 ring-white/20">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover grayscale"
                  style={{ objectPosition: t.imagePosition }}
                  sizes="160px"
                />
              </div>

              <div className="mt-5 flex items-center gap-4">
                {t.instagram ? (
                  <a
                    href={t.instagram}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-white transition hover:text-[#F97316]"
                    aria-label={`Instagram de ${t.name}`}
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                ) : (
                  <span className="text-white/40" aria-hidden>
                    <Instagram className="h-5 w-5" />
                  </span>
                )}
                <a
                  href={t.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-white transition hover:text-[#F97316]"
                  aria-label={`LinkedIn de ${t.name}`}
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>

              <h3 className="mt-5 text-xl font-bold text-white">{t.name}</h3>
              <p className="mt-2 text-sm text-slate-300">{t.role}</p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-400">{t.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
