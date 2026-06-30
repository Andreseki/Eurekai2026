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

function parseKey(key: string) {
  const [y, m, d] = key.split("-").map(Number)
  return new Date(y, m - 1, d)
}

function isWeekday(date: Date) {
  const day = date.getDay()
  return day >= 1 && day <= 5
}

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

type ModalAgendaProps = {
  open: boolean
  onClose: () => void
}

export default function ModalAgenda({ open, onClose }: ModalAgendaProps) {
  const today = useMemo(() => startOfDay(new Date()), [])
  const [viewYear, setViewYear] = useState(() => today.getFullYear())
  const [viewMonth, setViewMonth] = useState(() => today.getMonth())
  const [selectedKey, setSelectedKey] = useState<string | null>(null)
  const [selectedHour, setSelectedHour] = useState<string>("10:00")
  const [step, setStep] = useState<"pick" | "confirm" | "done">("pick")
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setStep("pick")
    setError(null)
    setSelectedKey(null)
    setSelectedHour("10:00")
    setViewYear(today.getFullYear())
    setViewMonth(today.getMonth())

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
  }, [open, onClose, today])

  const cells = useMemo(() => {
    const first = new Date(viewYear, viewMonth, 1)
    const startWeekday = first.getDay()
    const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
    const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate()

    const items: {
      label: number
      inMonth: boolean
      key: string | null
      weekday: number
      date: Date | null
    }[] = []

    for (let i = 0; i < startWeekday; i++) {
      const d = prevMonthDays - startWeekday + 1 + i
      const pm = viewMonth === 0 ? 11 : viewMonth - 1
      const py = viewMonth === 0 ? viewYear - 1 : viewYear
      const date = new Date(py, pm, d)
      items.push({
        label: d,
        inMonth: false,
        key: toKey(py, pm, d),
        weekday: date.getDay(),
        date,
      })
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const date = new Date(viewYear, viewMonth, d)
      items.push({
        label: d,
        inMonth: true,
        key: toKey(viewYear, viewMonth, d),
        weekday: date.getDay(),
        date,
      })
    }

    const remainder = items.length % 7
    const fill = remainder === 0 ? 0 : 7 - remainder
    for (let i = 1; i <= fill; i++) {
      const nm = viewMonth === 11 ? 0 : viewMonth + 1
      const ny = viewMonth === 11 ? viewYear + 1 : viewYear
      const date = new Date(ny, nm, i)
      items.push({
        label: i,
        inMonth: false,
        key: toKey(ny, nm, i),
        weekday: date.getDay(),
        date,
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

  const isSelectable = (date: Date | null, inMonth: boolean) => {
    if (!date || !inMonth) return false
    if (startOfDay(date) < today) return false
    return isWeekday(date)
  }

  const selectedDateLabel = selectedKey
    ? parseKey(selectedKey).toLocaleDateString("es-CO", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : ""

  const handleAgendarClick = () => {
    if (!selectedKey) {
      setError("Selecciona una fecha disponible.")
      return
    }
    setError(null)
    setStep("confirm")
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!selectedKey) return

    setSubmitting(true)
    setError(null)

    const form = event.currentTarget
    const fd = new FormData(form)
    const nombre = String(fd.get("nombre") ?? "").trim()
    const email = String(fd.get("email") ?? "").trim()
    const telefono = String(fd.get("telefono") ?? "").trim()

    if (!nombre || !email || !telefono) {
      setError("Completa todos los campos.")
      setSubmitting(false)
      return
    }

    const mensaje = `Reunión solicitada: ${selectedDateLabel} a las ${selectedHour} (COT).`

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          email,
          telefono,
          mensaje,
          tipo: "agenda",
          origen: "modal_agenda",
          fecha: selectedKey,
          hora: selectedHour,
        }),
      })

      if (!res.ok) {
        setError("No pudimos registrar tu cita. Intenta de nuevo.")
        setSubmitting(false)
        return
      }

      setStep("done")
    } catch {
      setError("No pudimos registrar tu cita. Intenta de nuevo.")
    } finally {
      setSubmitting(false)
    }
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

        {step === "done" ? (
          <div className="py-10 text-center">
            <h2 className="text-2xl font-bold text-[#0F172A] md:text-3xl">¡Cita solicitada!</h2>
            <p className="mx-auto mt-4 max-w-md text-slate-600">
              Recibimos tu solicitud para el {selectedDateLabel} a las {selectedHour}. Te
              confirmaremos por correo en breve.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-8 inline-flex rounded-full bg-[#F97316] px-10 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ea580c]"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <div className="mt-2 grid gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <h2 id="modal-agenda-title" className="text-2xl font-bold text-[#0F172A] md:text-3xl">
                Agenda una reunión
              </h2>
              <p className="mt-4 text-pretty leading-relaxed text-slate-600">
                Cuéntanos cuándo te funciona y nuestro equipo te confirma la sesión. Sesiones de
                orientación sobre experiencias, bootcamps y soluciones para tu organización.
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

            {step === "pick" ? (
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
                      {WEEK_HEADERS.map((d, i) => (
                        <div key={`${d}-${i}`} className="py-1">
                          {d}
                        </div>
                      ))}
                    </div>

                    <div className="mt-1 grid grid-cols-7 gap-1 text-center text-sm">
                      {cells.map((cell, idx) => {
                        const selectable = isSelectable(cell.date, cell.inMonth)
                        const isSelected = cell.key !== null && cell.key === selectedKey
                        const base =
                          "flex h-9 w-9 items-center justify-center rounded-full text-xs font-medium md:h-10 md:w-10 md:text-sm mx-auto transition"

                        if (!cell.inMonth) {
                          return (
                            <span
                              key={`o-${idx}`}
                              className={`${base} cursor-default text-slate-300`}
                            >
                              {cell.label}
                            </span>
                          )
                        }

                        if (!selectable) {
                          return (
                            <span
                              key={cell.key ?? idx}
                              className={`${base} cursor-default text-slate-300`}
                            >
                              {cell.label}
                            </span>
                          )
                        }

                        return (
                          <button
                            type="button"
                            key={cell.key ?? idx}
                            onClick={() => cell.key && setSelectedKey(cell.key)}
                            className={`${base} ${
                              isSelected
                                ? "bg-[#0F172A] text-white shadow-sm"
                                : "bg-slate-200/90 text-slate-800 hover:bg-slate-300"
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
                            ? "bg-[#0F172A] text-white"
                            : "bg-slate-200 text-slate-800 hover:bg-slate-300"
                        }`}
                      >
                        {h}
                      </button>
                    ))}
                  </div>
                </div>

                {error ? <p className="text-center text-sm text-red-600">{error}</p> : null}

                <div className="text-center">
                  <button
                    type="button"
                    onClick={handleAgendarClick}
                    className="inline-flex rounded-full bg-[#F97316] px-10 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ea580c]"
                  >
                    Agendar
                  </button>
                </div>
              </div>
            ) : (
              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                  <p className="font-semibold text-slate-900">Tu horario</p>
                  <p className="mt-1 capitalize">{selectedDateLabel}</p>
                  <p>{selectedHour} · COT</p>
                </div>

                <div>
                  <label htmlFor="agenda-nombre" className="text-sm font-medium text-slate-700">
                    Nombre
                  </label>
                  <input
                    id="agenda-nombre"
                    name="nombre"
                    required
                    className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#F97316]"
                  />
                </div>
                <div>
                  <label htmlFor="agenda-email" className="text-sm font-medium text-slate-700">
                    Correo
                  </label>
                  <input
                    id="agenda-email"
                    name="email"
                    type="email"
                    required
                    className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#F97316]"
                  />
                </div>
                <div>
                  <label htmlFor="agenda-telefono" className="text-sm font-medium text-slate-700">
                    Teléfono
                  </label>
                  <input
                    id="agenda-telefono"
                    name="telefono"
                    required
                    className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none focus:border-[#F97316]"
                  />
                </div>

                {error ? <p className="text-sm text-red-600">{error}</p> : null}

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep("pick")}
                    className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Volver
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex rounded-full bg-[#F97316] px-10 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ea580c] disabled:opacity-60"
                  >
                    {submitting ? "Enviando…" : "Confirmar cita"}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
