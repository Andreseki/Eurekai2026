"use client"

import { Minus, Plus, X } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { useModalLock } from "@/components/bootcamp/use-modal-lock"
import { BOOTCAMP_NAME, BOOTCAMP_PAYMENT_URL } from "@/lib/bootcamp-config"

export type InscripcionModalProps = {
  open: boolean
  onClose: () => void
}

type FieldErrors = Partial<
  Record<
    | "nombre"
    | "email"
    | "telefono"
    | "tipoDocumento"
    | "numero"
    | "nacionalidad"
    | "profesion",
    string
  >
>

const DOC_TYPES = ["Cédula de Ciudadanía", "Pasaporte", "Cédula Extranjería"] as const
const NACIONALIDADES = ["Colombiano", "Venezolano", "Otro"] as const

export default function InscripcionModal({ open, onClose }: InscripcionModalProps) {
  const [mounted, setMounted] = useState(false)
  const [cantidad, setCantidad] = useState(1)
  const [esParaMi, setEsParaMi] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const formRef = useRef<HTMLFormElement>(null)
  const primerInscritoRef = useRef<Record<string, string>>({})

  useModalLock(open, onClose)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) {
      setCantidad(1)
      setEsParaMi(true)
      setSuccessMessage(null)
      setError(null)
      setFieldErrors({})
      primerInscritoRef.current = {}
    }
  }, [open])

  useEffect(() => {
    if (!esParaMi || !formRef.current) return
    const data = primerInscritoRef.current
    if (!data.nombre) return
    const form = formRef.current
    ;(form.elements.namedItem("nombre") as HTMLInputElement).value = data.nombre ?? ""
    ;(form.elements.namedItem("email") as HTMLInputElement).value = data.email ?? ""
    ;(form.elements.namedItem("telefono") as HTMLInputElement).value = data.telefono ?? ""
  }, [esParaMi])

  const savePrimerInscrito = (form: HTMLFormElement) => {
    const fd = new FormData(form)
    primerInscritoRef.current = {
      nombre: String(fd.get("nombre") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      telefono: String(fd.get("telefono") ?? "").trim(),
    }
  }

  const validate = (form: HTMLFormElement) => {
    const fd = new FormData(form)
    const errors: FieldErrors = {}
    if (!String(fd.get("nombre") ?? "").trim()) errors.nombre = "Requerido"
    if (!String(fd.get("email") ?? "").trim()) errors.email = "Requerido"
    if (!String(fd.get("telefono") ?? "").trim()) errors.telefono = "Requerido"
    if (!String(fd.get("tipoDocumento") ?? "").trim()) errors.tipoDocumento = "Requerido"
    if (!String(fd.get("numero") ?? "").trim()) errors.numero = "Requerido"
    if (!String(fd.get("nacionalidad") ?? "").trim()) errors.nacionalidad = "Requerido"
    if (!String(fd.get("profesion") ?? "").trim()) errors.profesion = "Requerido"
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  if (!mounted || !open) return null

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4">
      <button
        type="button"
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        aria-label="Cerrar modal"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="inscripcion-modal-title"
        className="relative z-[101] my-8 w-full max-w-5xl rounded-2xl bg-white p-6 shadow-2xl md:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
          aria-label="Cerrar"
        >
          <X className="h-5 w-5" />
        </button>

        {successMessage ? (
          <p className="py-16 text-center text-lg font-semibold text-[#F97316]">{successMessage}</p>
        ) : (
          <div className="mt-2 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-12">
            <div>
              <h2
                id="inscripcion-modal-title"
                className="text-2xl font-bold text-[#0F172A] md:text-3xl"
              >
                Confirmación de Inscripción
              </h2>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                BOOTCAMP
              </p>
              <p className="mt-2 text-lg font-bold text-[#F97316] md:text-xl">{BOOTCAMP_NAME}</p>

              <div className="mt-8 flex items-center justify-between gap-4">
                <span className="text-sm font-medium text-slate-700">¿Este Bootcamp es para mí?</span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={esParaMi}
                  onClick={() => {
                    if (formRef.current) savePrimerInscrito(formRef.current)
                    setEsParaMi((v) => !v)
                  }}
                  className={`relative h-7 w-12 shrink-0 rounded-full transition ${
                    esParaMi ? "bg-[#F97316]" : "bg-slate-300"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition ${
                      esParaMi ? "left-[22px]" : "left-0.5"
                    }`}
                  />
                  <span className="sr-only">{esParaMi ? "Sí" : "No"}</span>
                </button>
                <span className="text-sm font-semibold text-[#F97316]">{esParaMi ? "Sí" : "No"}</span>
              </div>

              <div className="mt-8">
                <p className="text-sm font-medium text-slate-700">Cantidad de inscripciones</p>
                <div className="mt-3 flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                    disabled={cantidad <= 1}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50 disabled:opacity-40"
                    aria-label="Disminuir cantidad"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-[2rem] text-center text-xl font-bold text-slate-900">
                    {cantidad}
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (formRef.current) savePrimerInscrito(formRef.current)
                      setCantidad((c) => c + 1)
                    }}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-50"
                    aria-label="Aumentar cantidad"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <form
              ref={formRef}
              className="flex flex-col gap-4"
              onSubmit={async (e) => {
                e.preventDefault()
                setError(null)
                const form = e.currentTarget
                if (!validate(form)) return

                savePrimerInscrito(form)
                const fd = new FormData(form)
                const payload = {
                  nombre: String(fd.get("nombre")).trim(),
                  email: String(fd.get("email")).trim(),
                  telefono: String(fd.get("telefono")).trim(),
                  tipoDocumento: String(fd.get("tipoDocumento")).trim(),
                  numero: String(fd.get("numero")).trim(),
                  nacionalidad: String(fd.get("nacionalidad")).trim(),
                  profesion: String(fd.get("profesion")).trim(),
                  cantidad,
                  esParaMi,
                  mensaje: `Inscripción bootcamp — ${cantidad} cupo(s)`,
                  curso: BOOTCAMP_NAME,
                  origen: window.location.pathname,
                }

                if (cantidad === 1) {
                  window.open(BOOTCAMP_PAYMENT_URL, "_blank", "noopener,noreferrer")
                  onClose()
                  return
                }

                setSubmitting(true)
                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ ...payload, tipo: "inscripcion_grupal" }),
                  })
                  if (!res.ok) {
                    setError("No pudimos procesar tu solicitud. Intenta de nuevo.")
                    return
                  }
                  setSuccessMessage(
                    "Recibimos tu solicitud grupal. Te contactaremos en menos de 24h con el link de pago.",
                  )
                } catch {
                  setError("Error de conexión. Intenta de nuevo.")
                } finally {
                  setSubmitting(false)
                }
              }}
            >
              {error ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                  {error}
                </p>
              ) : null}

              <Field label="NOMBRE*" error={fieldErrors.nombre}>
                <input name="nombre" placeholder="Tu nombre" className={inputClass(!!fieldErrors.nombre)} />
              </Field>
              <Field label="CORREO ELECTRÓNICO*" error={fieldErrors.email}>
                <input
                  name="email"
                  type="email"
                  placeholder="ejemplo@correo.com"
                  className={inputClass(!!fieldErrors.email)}
                />
              </Field>
              <Field label="TELÉFONO*" error={fieldErrors.telefono}>
                <input
                  name="telefono"
                  type="tel"
                  placeholder="314 231 5678"
                  className={inputClass(!!fieldErrors.telefono)}
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="TIPO DE DOCUMENTO*" error={fieldErrors.tipoDocumento}>
                  <select
                    name="tipoDocumento"
                    defaultValue={DOC_TYPES[0]}
                    className={selectClass(!!fieldErrors.tipoDocumento)}
                  >
                    {DOC_TYPES.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="NÚMERO*" error={fieldErrors.numero}>
                  <input
                    name="numero"
                    placeholder="1 432 234 789"
                    className={inputClass(!!fieldErrors.numero)}
                  />
                </Field>
              </div>
              <Field label="NACIONALIDAD*" error={fieldErrors.nacionalidad}>
                <select
                  name="nacionalidad"
                  defaultValue={NACIONALIDADES[0]}
                  className={selectClass(!!fieldErrors.nacionalidad)}
                >
                  {NACIONALIDADES.map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="PROFESIÓN*" error={fieldErrors.profesion}>
                <input
                  name="profesion"
                  placeholder="Diseñador"
                  className={inputClass(!!fieldErrors.profesion)}
                />
              </Field>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex rounded-full bg-[#F97316] px-10 py-3 text-sm font-semibold text-white transition hover:bg-[#ea580c] disabled:opacity-60"
                >
                  {submitting ? "Enviando…" : "Confirmar inscripción"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </label>
      {children}
      {error ? <p className="mt-1 text-xs text-red-600">{error}</p> : null}
    </div>
  )
}

function inputClass(hasError: boolean) {
  return `w-full rounded-full border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:ring-2 ${
    hasError ? "border-red-400 ring-red-200" : "border-slate-200 ring-[#F97316]/30"
  }`
}

function selectClass(hasError: boolean) {
  return `w-full rounded-full border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:ring-2 ${
    hasError ? "border-red-400 ring-red-200" : "border-slate-200 ring-[#F97316]/30"
  }`
}
