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
  /** En desktop: 2 (bootcamp) o 3 (inicio). */
  desktopColumns?: 2 | 3
  /** Controles laterales (bootcamp) o flechas + puntos abajo (home). */
  controlsPosition?: "sides" | "bottom"
  /** Tarjeta fija 374×380, estilo Figma home (sin foto). */
  cardSize?: "default" | "home"
}

const MOBILE_BREAKPOINT = 768

export default function TestimonialsCarousel({
  testimonials,
  desktopColumns = 2,
  controlsPosition = "sides",
  cardSize = "default",
}: TestimonialsCarouselProps) {
  const [isMobile, setIsMobile] = useState(false)
  const [page, setPage] = useState(0)
  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)
  const cardsPerPage = isMobile ? 1 : desktopColumns
  const totalPages = Math.max(1, Math.ceil(testimonials.length / cardsPerPage))
  const pageClamped = Math.min(page, totalPages - 1)
  const compact = desktopColumns === 3
  const homeCard = cardSize === "home"

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

    if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX < 0) goNext()
      else goPrev()
    }

    touchStartX.current = null
    touchStartY.current = null
  }

  const renderCard = (testimonial: Testimonial, key: string) => (
    <article
      key={key}
      className={`relative flex flex-col overflow-hidden rounded-[1.25rem] bg-[#0F172A] shadow-[0_18px_30px_rgba(2,8,23,0.2)] ${
        homeCard
          ? "home-testimonio-card mx-auto w-full max-w-[374px] p-6"
          : "h-full min-h-[320px] p-6 md:min-h-[360px] md:p-8"
      }`}
    >
      <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.22),transparent_66%)]" />

      <Image
        src="/comillas.svg"
        alt=""
        width={44}
        height={34}
        className="h-8 w-auto object-contain md:h-9"
        aria-hidden
      />

      <p
        className={`mt-6 flex-1 italic leading-relaxed text-white/92 ${
          homeCard ? "text-sm md:text-[0.95rem]" : compact ? "text-sm md:text-[0.95rem]" : "text-[1.05rem] md:text-[1.12rem]"
        }`}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="mt-5 border-t border-white/15 pt-4">
        {!homeCard && testimonial.image ? (
          <div
            className={`flex gap-4 ${
              compact ? "flex-col items-start" : "items-center justify-between"
            }`}
          >
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-white/20 md:h-20 md:w-20">
              <Image
                src={testimonial.image}
                alt={`Foto de ${testimonial.name}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
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
        ) : (
          <div className="text-left">
            <p className={`font-bold text-white ${homeCard ? "text-lg" : "text-base md:text-lg"}`}>
              {testimonial.name}
            </p>
            <p className={`mt-1 text-white/75 ${homeCard ? "text-sm" : "text-xs md:text-sm"}`}>
              {testimonial.role}
            </p>
            {testimonial.company ? (
              <p className={`text-white/60 ${homeCard ? "text-sm" : "text-xs md:text-sm"}`}>
                {testimonial.company}
              </p>
            ) : null}
          </div>
        )}
      </div>
    </article>
  )

  const arrowBtnClass =
    "inline-flex items-center justify-center rounded-full p-2 text-[#0F172A] transition hover:text-[#F97316]"

  const paginationDots = (
    <div className="flex items-center gap-2">
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          type="button"
          onClick={() => setPage(index)}
          aria-label={`Ir a página ${index + 1} de testimonios`}
          aria-current={index === pageClamped ? "true" : undefined}
          className={
            index === pageClamped
              ? "h-2 w-10 rounded-full bg-[#0F172A] transition"
              : "h-2 w-2 rounded-full bg-slate-300 transition hover:bg-slate-400"
          }
        />
      ))}
    </div>
  )

  const sideArrows =
    controlsPosition === "sides" && totalPages > 1 ? (
      <>
        <button
          type="button"
          aria-label="Testimonios anteriores"
          onClick={goPrev}
          className={`${arrowBtnClass} absolute -left-12 top-1/2 z-10 hidden -translate-y-1/2 lg:inline-flex`}
        >
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Siguientes testimonios"
          onClick={goNext}
          className={`${arrowBtnClass} absolute -right-12 top-1/2 z-10 hidden -translate-y-1/2 lg:inline-flex`}
        >
          <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </>
    ) : null

  const bottomControls =
    controlsPosition === "bottom" && totalPages > 1 ? (
      <div className="mt-10 flex items-center justify-center gap-8">
        <button type="button" aria-label="Testimonios anteriores" onClick={goPrev} className={arrowBtnClass}>
          <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {paginationDots}
        <button type="button" aria-label="Siguientes testimonios" onClick={goNext} className={arrowBtnClass}>
          <svg className="h-9 w-9" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    ) : null

  return (
    <div className="relative mt-14">
      {sideArrows}

      <div
        className={`grid grid-cols-1 items-stretch gap-6 ${
          desktopColumns === 3 ? "md:grid-cols-3" : "md:grid-cols-2"
        }`}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {visibleTestimonials.map((testimonial, index) =>
          renderCard(testimonial, `${testimonial.name}-${pageClamped}-${index}`),
        )}
      </div>

      {bottomControls}

      {totalPages > 1 && controlsPosition === "sides" && (
        <div className="mt-8 flex items-center justify-center gap-3">{paginationDots}</div>
      )}

      {totalPages > 1 && (
        <p className="mt-3 text-center text-xs font-medium text-slate-500 md:hidden">
          Página {pageClamped + 1} de {totalPages}
        </p>
      )}

      {totalPages > 1 && controlsPosition === "sides" && (
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
