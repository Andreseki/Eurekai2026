"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"

interface Testimonial {
  quote: string
  name: string
  role: string
  company?: string
  secondaryRole?: string
  image?: string
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
  /** En desktop: 2 (por defecto, bootcamp) o 3 (inicio EurekAI). */
  desktopColumns?: 2 | 3
}

const MOBILE_BREAKPOINT = 768

export default function TestimonialsCarousel({
  testimonials,
  desktopColumns = 2,
}: TestimonialsCarouselProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [page, setPage] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const cardsPerPage = isMobile ? 1 : desktopColumns
  const totalPages = Math.max(1, Math.ceil(testimonials.length / cardsPerPage))
  const pageClamped = Math.min(page, totalPages - 1)

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const syncViewport = () => setIsMobile(mediaQuery.matches)
    syncViewport()
    mediaQuery.addEventListener("change", syncViewport)
    return () => mediaQuery.removeEventListener("change", syncViewport)
  }, [])

  const visibleTestimonials = useMemo(() => {
    const start = pageClamped * cardsPerPage
    return testimonials.slice(start, start + cardsPerPage)
  }, [cardsPerPage, pageClamped, testimonials])

  const goPrev = () => {
    setPage((current) => {
      const c = Math.min(current, totalPages - 1)
      return (c - 1 + totalPages) % totalPages
    })
  }

  const goNext = () => {
    setPage((current) => {
      const c = Math.min(current, totalPages - 1)
      return (c + 1) % totalPages
    })
  }

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0]
    touchStartX.current = touch.clientX
    touchStartY.current = touch.clientY
  }

  const onTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return

    const touch = event.changedTouches[0]
    const deltaX = touch.clientX - touchStartX.current
    const deltaY = touch.clientY - touchStartY.current

    // Only trigger swipe when horizontal gesture is dominant.
    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) {
        goNext()
      } else {
        goPrev()
      }
    }

    touchStartX.current = null
    touchStartY.current = null
  }

  const renderCard = (testimonial: Testimonial, key: string) => {
    const compact = desktopColumns === 3
    return (
    <article
      key={key}
      className="relative flex h-full min-h-[320px] flex-col overflow-hidden rounded-[2rem] bg-[#0F172A] p-6 shadow-[0_18px_30px_rgba(2,8,23,0.2)] md:min-h-[360px] md:p-8"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.22),transparent_66%)]" />

      <Image
        src="/comillas.svg"
        alt="Comillas"
        width={44}
        height={34}
        className="absolute left-6 top-5 h-9 w-auto object-contain md:left-8 md:top-6 md:h-11"
      />

      <p
        className={`mt-10 flex-1 italic leading-relaxed text-white/92 md:mt-12 ${
          compact ? "text-sm md:text-[0.95rem]" : "text-[1.05rem] md:text-[1.12rem]"
        }`}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-5 border-t border-white/15 pt-5">
        <div
          className={`flex gap-4 ${
            compact ? "flex-col items-start" : "items-center justify-between"
          }`}
        >
          {testimonial.image && (
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/20 md:h-20 md:w-20">
              <Image
                src={testimonial.image}
                alt={`Foto de ${testimonial.name}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          )}

          <div className={`min-w-0 ${compact ? "text-left" : "text-right"}`}>
            <p
              className={`font-bold leading-tight text-white ${
                compact ? "text-base md:text-lg" : "text-3xl md:text-4xl"
              }`}
            >
              {testimonial.name}
            </p>
            <p className={`mt-1 text-white/85 ${compact ? "text-xs md:text-sm" : "text-xl"}`}>
              {testimonial.role}
              {testimonial.company ? ` — ${testimonial.company}` : ""}
            </p>
            {testimonial.secondaryRole && (
              <p className="text-lg text-white/70">{testimonial.secondaryRole}</p>
            )}
          </div>
        </div>
      </div>
    </article>
    )
  }

  return (
    <div className="relative mt-14">
      {totalPages > 1 && (
        <>
          <button
            type="button"
            aria-label="Testimonios anteriores"
            onClick={goPrev}
            className="absolute -left-12 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full p-2 text-slate-500 transition hover:text-slate-800 lg:inline-flex"
          >
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="Siguientes testimonios"
            onClick={goNext}
            className="absolute -right-12 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full p-2 text-slate-500 transition hover:text-slate-800 lg:inline-flex"
          >
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

      <div
        className={`grid grid-cols-1 items-stretch gap-6 ${desktopColumns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"}`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {visibleTestimonials.map((testimonial, index) =>
          renderCard(testimonial, `${testimonial.name}-${pageClamped}-${index}`),
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-3">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setPage(index)}
              aria-label={`Ir a página ${index + 1} de testimonios`}
              className={
                index === pageClamped
                  ? "h-4 w-14 rounded-full bg-[#0F172A]"
                  : "h-4 w-4 rounded-full bg-slate-300 transition hover:bg-slate-400"
              }
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <p className="mt-3 text-center text-xs font-medium text-slate-500 md:hidden">
          Página {pageClamped + 1} de {totalPages}
        </p>
      )}

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-4 md:hidden">
          <button
            type="button"
            aria-label="Testimonio anterior"
            onClick={goPrev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Siguiente testimonio"
            onClick={goNext}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-sm"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}
