"use client"

import { Calendar } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { BOOTCAMP_EVENT_DATE_LABEL } from "@/lib/bootcamp-config"
import "@/styles/bootcamp-sticky-banner.css"

export type BootcampStickyBannerProps = {
  onOpenInscripcion: () => void
}

/**
 * Barra inferior: aparece al pasar la sección SOLD OUT,
 * pegada al borde inferior; se oculta al llegar al footer.
 */
export default function BootcampStickyBanner({ onOpenInscripcion }: BootcampStickyBannerProps) {
  const [visible, setVisible] = useState(false)

  const update = useCallback(() => {
    const anchor = document.getElementById("cursos")
    const footer = document.querySelector<HTMLElement>("[data-site-footer]")
    if (!anchor) {
      setVisible(false)
      return
    }

    const anchorRect = anchor.getBoundingClientRect()
    const pastAnchor = anchorRect.bottom <= 0

    let footerInView = false
    if (footer) {
      const footerRect = footer.getBoundingClientRect()
      footerInView = footerRect.top < window.innerHeight
    }

    setVisible(pastAnchor && !footerInView)
  }, [])

  useEffect(() => {
    update()
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)

    const anchor = document.getElementById("cursos")
    const footer = document.querySelector<HTMLElement>("[data-site-footer]")
    const ro = new ResizeObserver(update)
    if (anchor) ro.observe(anchor)
    if (footer) ro.observe(footer)

    return () => {
      window.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
      ro.disconnect()
    }
  }, [update])

  return (
    <div
      className={`bootcamp-sticky-bar${visible ? " bootcamp-sticky-bar--visible" : ""}`}
      aria-hidden={!visible}
    >
      <div className="bootcamp-sticky-bar__inner">
        <div>
          <p className="bootcamp-sticky-bar__title">
            Innovación potenciada con Inteligencia Artificial
          </p>
          <p className="bootcamp-sticky-bar__date">
            <Calendar className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
            {BOOTCAMP_EVENT_DATE_LABEL}
          </p>
        </div>
        <button type="button" className="bootcamp-sticky-bar__cta" onClick={onOpenInscripcion}>
          Inscríbete ahora
        </button>
      </div>
    </div>
  )
}
