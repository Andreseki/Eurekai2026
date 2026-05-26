"use client"

import { Calendar, Clock, MapPin, Users } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { BOOTCAMP_EVENT_DATE_LABEL, getEnrollmentDeadlineMs } from "@/lib/bootcamp-config"
import "@/styles/info-bar.css"

export type InfoBarProps = {
  onOpenInfo: () => void
  onOpenInscripcion: () => void
}

type CountdownParts = {
  days: number
  hours: number
  minutes: number
}

function pad(n: number) {
  return String(n).padStart(2, "0")
}

function getCountdown(targetMs: number): CountdownParts {
  const diff = Math.max(0, targetMs - Date.now())
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
  const minutes = Math.floor((diff / (1000 * 60)) % 60)
  return { days, hours, minutes }
}

export default function InfoBar({ onOpenInfo, onOpenInscripcion }: InfoBarProps) {
  const targetMs = useMemo(() => getEnrollmentDeadlineMs(), [])
  const [countdown, setCountdown] = useState<CountdownParts>(() => getCountdown(targetMs))

  useEffect(() => {
    const tick = () => setCountdown(getCountdown(targetMs))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [targetMs])

  const infoItems = [
    { icon: Clock, label: "16 horas" },
    { icon: Users, label: "20 cupos" },
    { icon: MapPin, label: "Modalidad online" },
    { icon: Calendar, label: BOOTCAMP_EVENT_DATE_LABEL },
  ] as const

  return (
    <section id="bootcamp-info-bar" className="info-bar">
      <div className="info-bar__container">
        <div className="info-bar__left">
          <div className="info-bar__grid">
            {infoItems.map(({ icon: Icon, label }) => (
              <div key={label} className="info-bar__grid-item">
                <Icon strokeWidth={1.75} aria-hidden />
                <span>{label}</span>
              </div>
            ))}
          </div>

          <div className="info-bar__countdown">
            <p className="info-bar__countdown-label">Cierre de inscripciones</p>
            <div className="info-bar__countdown-values">
              <CountdownUnit value={pad(countdown.days)} label="DÍAS" />
              <span className="info-bar__countdown-sep" aria-hidden>
                |
              </span>
              <CountdownUnit value={pad(countdown.hours)} label="HORAS" />
              <span className="info-bar__countdown-sep" aria-hidden>
                |
              </span>
              <CountdownUnit value={pad(countdown.minutes)} label="MINUTOS" />
            </div>
          </div>
        </div>

        <div className="info-bar__actions">
          <button type="button" className="info-bar__btn info-bar__btn--outline" onClick={onOpenInfo}>
            ¿Quieres más información?
          </button>
          <button type="button" className="info-bar__btn info-bar__btn--outline" onClick={onOpenInfo}>
            Conoce descuentos disponibles
          </button>
          <button
            type="button"
            className="info-bar__btn info-bar__btn--primary"
            onClick={onOpenInscripcion}
          >
            Inscríbete ahora
          </button>
        </div>
      </div>
    </section>
  )
}

function CountdownUnit({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <p className="info-bar__countdown-unit-value">{value}</p>
      <p className="info-bar__countdown-unit-label">{label}</p>
    </div>
  )
}
