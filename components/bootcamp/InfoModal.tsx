"use client"

import { X } from "lucide-react"
import { useEffect, useState, type ReactNode } from "react"
import { createPortal } from "react-dom"
import { useModalLock } from "@/components/bootcamp/use-modal-lock"
import { BOOTCAMP_NAME } from "@/lib/bootcamp-config"

export type InfoModalProps = {
  open: boolean
  onClose: () => void
}

type FieldErrors = Partial<Record<"nombre" | "email" | "telefono" | "mensaje" | "autorizacion", string>>

export default function InfoModal({ open, onClose }: InfoModalProps) {
  const [mounted, setMounted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [autorizacion, setAutorizacion] = useState(false)

  useModalLock(open, onClose)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) {
      setSuccess(false)
      setError(null)
      setFieldErrors({})
      setAutorizacion(false)
    }
  }, [open])

  if (!mounted || !open) return null

  const validate = (form: HTMLFormElement) => {
    const fd = new FormData(form)
    const errors: FieldErrors = {}
    if (!String(fd.get("nombre") ?? "").trim()) errors.nombre = "Requerido"
    if (!String(fd.get("email") ?? "").trim()) errors.email = "Requerido"
    if (!String(fd.get("telefono") ?? "").trim()) errors.telefono = "Requerido"
    if (!String(fd.get("mensaje") ?? "").trim()) errors.mensaje = "Requerido"
    if (!autorizacion) errors.autorizacion = "Debes autorizar el tratamiento de datos"
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        aria-label="Cerrar modal"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="info-modal-title"
        className="relative z-[101] w-full max-w-4xl rounded-2xl bg-white p-6 shadow-2xl md:p-10"
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

        {success ? (
          <p className="py-16 text-center text-lg font-semibold text-[#F97316]">
            ¡Gracias! Te contactaremos pronto.
          </p>
        ) : (
          <div className="mt-2 grid gap-10 md:grid-cols-2 md:gap-12">
            <div>
              <h2 id="info-modal-title" className="text-2xl font-bold text-[#0F172A] md:text-3xl">
                ¿Quieres más información?
              </h2>
              <p className="mt-4 leading-relaxed text-slate-600">
                Déjanos tus datos para brindarte más información personalizada y acompañarte en tu
                proceso de inscripción.
              </p>
            </div>

            <form
              className="flex flex-col gap-4"
              onSubmit={async (e) => {
                e.preventDefault()
                setError(null)
                const form = e.currentTarget
                if (!validate(form)) return

                const fd = new FormData(form)
                setSubmitting(true)
                try {
                  const res = await fetch("/api/contact", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      nombre: String(fd.get("nombre")).trim(),
                      email: String(fd.get("email")).trim(),
                      telefono: String(fd.get("telefono")).trim(),
                      mensaje: String(fd.get("mensaje")).trim(),
                      tipo: "info",
                      curso: BOOTCAMP_NAME,
                      origen: window.location.pathname,
                    }),
                  })
                  if (!res.ok) {
                    setError("No pudimos enviar el mensaje. Intenta de nuevo.")
                    return
                  }
                  setSuccess(true)
                  window.setTimeout(() => {
                    onClose()
                  }, 2000)
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
                <input
                  name="nombre"
                  placeholder="Tu nombre"
                  className={inputClass(!!fieldErrors.nombre)}
                />
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
              <Field label="MENSAJE*" error={fieldErrors.mensaje}>
                <textarea
                  name="mensaje"
                  rows={4}
                  placeholder="Cuéntanos cómo podemos ayudarte"
                  className={`${inputClass(!!fieldErrors.mensaje)} resize-none rounded-3xl`}
                />
              </Field>

              <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-600">
                <input
                  type="checkbox"
                  checked={autorizacion}
                  onChange={(e) => {
                    setAutorizacion(e.target.checked)
                    if (e.target.checked) {
                      setFieldErrors((prev) => {
                        const next = { ...prev }
                        delete next.autorizacion
                        return next
                      })
                    }
                  }}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-[#F97316] focus:ring-[#F97316]"
                />
                <span>Autorizo el tratamiento de uso de mis datos personales</span>
              </label>
              {fieldErrors.autorizacion ? (
                <p className="-mt-2 text-xs text-red-600">{fieldErrors.autorizacion}</p>
              ) : null}

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex rounded-full bg-[#F97316] px-10 py-3 text-sm font-semibold text-white transition hover:bg-[#ea580c] disabled:opacity-60"
                >
                  {submitting ? "Enviando…" : "Enviar información"}
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

function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: ReactNode
}) {
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
