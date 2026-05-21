"use client"

import Link from "next/link"
import { X } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import { WOMPI_CHECKOUT_URL } from "@/lib/site-config"

export default function PromoBottomBar() {
  const [visible, setVisible] = useState(true)
  const [docked, setDocked] = useState(false)

  const dismiss = useCallback(() => {
    setVisible(false)
    document.querySelector("[data-site-footer]")?.removeAttribute("data-promo-docked")
  }, [])

  useEffect(() => {
    if (!visible) return

    const footer = document.querySelector<HTMLElement>("[data-site-footer]")
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isDocked = entry.isIntersecting
        setDocked(isDocked)
        footer.toggleAttribute("data-promo-docked", isDocked)
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" },
    )

    observer.observe(footer)
    return () => {
      observer.disconnect()
      footer.removeAttribute("data-promo-docked")
    }
  }, [visible])

  if (!visible) return null

  return (
    <div
      className={`promo-bottom-bar${docked ? " promo-bottom-bar--docked" : ""}`}
      aria-label="Reservar cupo bootcamp"
    >
      <button
        type="button"
        className="promo-bottom-bar__close"
        onClick={dismiss}
        aria-label="Cerrar aviso"
      >
        <X aria-hidden="true" />
      </button>
      <div className="promo-bottom-bar__inner">
        <h2 className="promo-bottom-bar__title">Faltan pocos días, asegura tu entrada ahora.</h2>
        <Link
          href={WOMPI_CHECKOUT_URL}
          target="_blank"
          rel="noreferrer noopener"
          className="promo-bottom-bar__cta"
        >
          Reservar ahora
        </Link>
      </div>
    </div>
  )
}
