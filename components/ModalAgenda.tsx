"use client"

import { ChevronLeft, ChevronRight, Clock, MapPin, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { createPortal } from "react-dom"

const MONTH_NAMES = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
]

const WEEK_HEADERS = ["D", "L", "M", "M", "J", "V", "S"]

const HOURS = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
]

function pad2(n: number) {
  return String(n).padStart(2, "0")
}

function toKey(y: number, m: number, d: number) {
  return `${y}-${pad2(m + 1)}-${pad2(d)}`
}

type ModalAgendaProps = {
  open: boolean
  onClose: () => void
}

export default function ModalAgenda({ open, onClose }: ModalAgendaProps) {
  const [viewYear, setViewYear] = useState(2026)
  const [viewMonth, setViewMonth] = useState(5) // Junio
  const [selectedKey, setSelectedKey] = useState<string | null>(() =>
    toKey(2026, 5, 15),
  )
  const [selectedHour, setSelectedHour] = useState<string>("10:00")

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKey)
      document.body.style.overflow = prev
    }
  }, [open, onClose])

  const cells = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1)
    const startWeekday = first.getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate()

    const items: { label: number; inMonth: boolean; key: string | null }[] = []

    for (let i = 0; i < startWeekday; i++) {
      const d = prevMonthDays - startWeekday + 1 + i
      const pm = viewMonth === 0 ? 11 : viewMonth - 1
      const py = viewMonth === 0 ? viewYear - 1 : viewYear
      items.push({
        label: d,
        inMonth: false,
        key: toKey(py, pm, d),
      })
    }

    for (let d = 1; d <= daysInMonth; d++) {
      items.push({
        label: d,
        inMonth: true,
        key: toKey(viewYear, viewMonth, d),
      })
    }

    const remainder = items.length % 7
    const fill = remainder === 0 ? 0 : 7 - remainder
    for (let i = 1; i <= fill; i++) {
      const nm = viewMonth === 11 ? 0 : viewMonth + 1
      const ny = viewMonth === 11 ? viewYear + 1 : viewYear
      items.push({
        label: i,
        inMonth: false,
        key: toKey(ny, nm, i),
      })
    }

    return items
  }, [viewYear, viewMonth])

  const goPrevMonth = () => {
    setViewMonth((m) => {
      if (m === 0) {
        setViewYear((y) => y - 1)
        return 11
      }
      return m - 1
    })
  }

  const goNextMonth = () => {
    setViewMonth((m) => {
      if (m === 11) {
        setViewYear((y) => y + 1)
        return 0
      }
      return m + 1
    })
  }

  if (!open || typeof document === "undefined") return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"
        aria-label="Cerrar modal"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-agenda-title"
        className="relative z-[101] max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mt-2 grid gap-10 md:grid-cols-2 md:gap-12">
          <div>
            <h2 id="modal-agenda-title" className="text-2xl font-bold text-[#0F172A] md:text-3xl">
              Agenda una reunión
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-slate-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Selecciona una fecha y hora
              que te funcione; nuestro equipo confirmará la sesión contigo.
            </p>
            <div className="mt-8 flex items-start gap-3 text-slate-700">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-[#F97316]" aria-hidden />
              <p className="text-sm font-medium">Lunes a viernes 9:00 - 17:00</p>
            </div>
            <div className="mt-4 flex items-start gap-3 text-slate-700">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-[#F97316]" aria-hidden />
              <p className="text-sm font-medium">Colombia - COT (Colombia Time) - UTC/GMT-5</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-800">
                Selecciona fecha
              </h3>
              <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4">
                <div className="mb-3 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={goPrevMonth}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
                    aria-label="Mes anterior"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <p className="text-center text-sm font-semibold text-slate-900 md:text-base">
                    {MONTH_NAMES[viewMonth]} {viewYear}
                  </p>
                  <button
                    type="button"
                    onClick={goNextMonth}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50"
                    aria-label="Mes siguiente"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-500">
                  {WEEK_HEADERS.map((d) => (
                    <div key={d} className="py-1">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="mt-1 grid grid-cols-7 gap-1 text-center text-sm">
                  {cells.map((cell, idx) => {
                    const isSelected = cell.key !== null && cell.key === selectedKey
                    const base =
                      "flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium md:h-10 md:w-10 md:text-sm mx-auto transition"
                    if (!cell.inMonth) {
                      return (
                        <button
                          type="button"
                          key={`o-${idx}`}
                          disabled
                          className={`${base} cursor-default text-slate-300`}
                        >
                          {cell.label}
                        </button>
                      )
                    }
                    return (
                      <button
                        type="button"
                        key={cell.key ?? idx}
                        onClick={() => cell.key && setSelectedKey(cell.key)}
                        className={`${base} ${
                          isSelected
                            ? "bg-[#F97316] text-white shadow-sm"
                            : "bg-slate-200/80 text-slate-800 hover:bg-slate-200"
                        }`}
                      >
                        {cell.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-800">
                Escoge una hora
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {HOURS.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setSelectedHour(h)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                      selectedHour === h
                        ? "bg-[#F97316] text-white shadow-sm"
                        : "bg-slate-200 text-slate-800 hover:bg-slate-300"
                    }`}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  onClose()
                }}
                className="inline-flex rounded-full bg-[#F97316] px-10 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ea580c]"
              >
                Agendar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}
