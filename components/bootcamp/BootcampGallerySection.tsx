"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useMemo, useState } from "react"

type GalleryImage = {
  src: string
  alt: string
}

const GALLERY_IMAGES: GalleryImage[] = [
  { src: "/galeria.jpg", alt: "Bootcamp EurekAI — sesión colaborativa en mesa de trabajo" },
  { src: "/galeria1.jpg", alt: "Participantes aplicando metodologías de innovación con IA" },
  { src: "/galeria2.jpg", alt: "Dinámica grupal presencial con facilitación en vivo" },
  { src: "/galeria3.jpg", alt: "Equipos trabajando casos reales de alto impacto" },
  { src: "/galeria4.jpg", alt: "Momento de networking entre líderes en bootcamp" },
  { src: "/galeria5.jpg", alt: "Taller experiencial de innovación potenciada con IA" },
  { src: "/galeria6.jpg", alt: "Prototipado y validación con participantes del bootcamp" },
  { src: "/galeria7.jpg", alt: "Sesión intensiva de transformación digital e IA" },
  { src: "/galeria8.jpg", alt: "Comunidad EurekAI en jornada de aprendizaje práctico" },
  { src: "/galeria9.jpg", alt: "Cierre de bootcamp con equipos y facilitadores" },
]

function getGallerySlide(index: number) {
  const total = GALLERY_IMAGES.length
  return {
    main: GALLERY_IMAGES[index],
    thumbs: [1, 2, 3].map((offset) => GALLERY_IMAGES[(index + offset) % total]),
  }
}

export type BootcampGallerySectionProps = {
  onInscribir: () => void
}

export default function BootcampGallerySection({ onInscribir }: BootcampGallerySectionProps) {
  const [slideIndex, setSlideIndex] = useState(0)
  const slide = useMemo(() => getGallerySlide(slideIndex), [slideIndex])
  const totalSlides = GALLERY_IMAGES.length

  const goPrev = () => setSlideIndex((current) => (current - 1 + totalSlides) % totalSlides)
  const goNext = () => setSlideIndex((current) => (current + 1) % totalSlides)

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Galería</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 md:text-4xl lg:text-[2.75rem]">
            Experiencia en acción
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
            Facilitando procesos de innovación, transformación digital e implementación de Inteligencia
            Artificial con líderes y equipos de alto impacto.
          </p>
        </div>

        {/* Mobile: una foto a la vez */}
        <div className="mt-10 lg:hidden">
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-100">
            <Image
              key={GALLERY_IMAGES[slideIndex].src}
              src={GALLERY_IMAGES[slideIndex].src}
              alt={GALLERY_IMAGES[slideIndex].alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </div>
        </div>

        {/* Desktop: principal + 3 miniaturas que avanzan con el carrusel */}
        <div className="mt-10 hidden min-h-[440px] grid-cols-[1.45fr_1fr] gap-3 lg:mt-12 lg:grid">
          <div className="relative min-h-[440px] overflow-hidden bg-slate-100">
            <Image
              key={`main-${slideIndex}-${slide.main.src}`}
              src={slide.main.src}
              alt={slide.main.alt}
              fill
              className="object-cover"
              sizes="640px"
            />
          </div>

          <div className="grid grid-rows-3 gap-3">
            {slide.thumbs.map((thumb, thumbIndex) => (
              <div
                key={`${slideIndex}-thumb-${thumbIndex}-${thumb.src}`}
                className="relative min-h-[140px] overflow-hidden bg-slate-100"
              >
                <Image src={thumb.src} alt={thumb.alt} fill className="object-cover" sizes="320px" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="inline-flex h-10 w-10 items-center justify-center text-slate-800 transition hover:text-[#fd7914]"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
          </button>

          <div className="flex max-w-[min(100%,280px)] flex-wrap items-center justify-center gap-2">
            {GALLERY_IMAGES.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSlideIndex(index)}
                className={`h-2.5 rounded-full transition ${
                  index === slideIndex ? "w-8 bg-slate-900" : "w-2.5 bg-slate-300 hover:bg-slate-400"
                }`}
                aria-label={`Ir a la foto ${index + 1}`}
                aria-current={index === slideIndex ? "true" : undefined}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={goNext}
            className="inline-flex h-10 w-10 items-center justify-center text-slate-800 transition hover:text-[#fd7914]"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
          </button>
        </div>

        <div className="mt-10 flex justify-center">
          <button
            type="button"
            onClick={onInscribir}
            className="inline-flex rounded-full bg-[#fd7914] px-10 py-4 text-base font-bold text-white shadow-lg shadow-[#fd7914]/30 transition hover:bg-[#ff7a29] md:px-14 md:text-lg"
          >
            Sé parte del próximo Bootcamp
          </button>
        </div>
      </div>
    </section>
  )
}
