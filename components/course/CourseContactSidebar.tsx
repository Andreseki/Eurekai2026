"use client"

import { Coffee, PiggyBank } from "lucide-react"
import { useState, type ReactNode } from "react"

type ExtraField = {
  name: string
  label: string
  placeholder: string
  type?: "text" | "number" | "tel" | "email"
}

type FieldErrors = Partial<Record<string, string>>

export type CourseContactSidebarProps = {
  courseName: string
  extraFields?: ExtraField[]
  priceLabel?: string | null
  priceIcon?: "piggy" | "coffee"
  showPricingFooter?: boolean
  onInscribir?: () => void
  onVerBeneficios?: () => void
}

export default function CourseContactSidebar({
  courseName,
  extraFields = [],
  priceLabel = null,
  priceIcon = "piggy",
  showPricingFooter = true,
  onInscribir,
  onVerBeneficios,
}: CourseContactSidebarProps) {
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [autorizacion, setAutorizacion] = useState(false)

  const allFieldNames = ["nombre", "email", "telefono", "mensaje", ...extraFields.map((f) => f.name)]

  const validate = (form: HTMLFormElement) => {
    const fd = new FormData(form)
    const errors: FieldErrors = {}
    for (const name of allFieldNames) {
      if (!String(fd.get(name) ?? "").trim()) errors[name] = "Requerido"
    }
    if (!autorizacion) errors.autorizacion = "Debes autorizar el tratamiento de datos"
    setFieldErrors(errors)
    return Object.keys(errors).length === 0
  }

  const PriceIcon = priceIcon === "coffee" ? Coffee : PiggyBank

  return (
    <aside className="rounded-2xl border border-slate-200 bg-slate-100 p-6 shadow-sm lg:sticky lg:top-28 lg:self-start">
      {success ? (
        <p className="py-12 text-center text-base font-semibold text-[#F97316]">
          ¡Gracias! Te contactaremos pronto.
        </p>
      ) : (
        <>
          <h2 className="text-xl font-bold text-[#0F172A]">¿Quieres más información?</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Déjanos tus datos para brindarte información personalizada y acompañarte en tu proceso de
            inscripción.
          </p>

          <form
            className="mt-6 flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault()
              setError(null)
              const form = e.currentTarget
              if (!validate(form)) return

              const fd = new FormData(form)
              const payload: Record<string, string> = {
                tipo: "info",
                curso: courseName,
                origen: typeof window !== "undefined" ? window.location.pathname : "",
              }
              for (const name of allFieldNames) {
                payload[name] = String(fd.get(name)).trim()
              }

              setSubmitting(true)
              try {
                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(payload),
                })
                if (!res.ok) {
                  setError("No pudimos enviar el mensaje. Intenta de nuevo.")
                  return
                }
                setSuccess(true)
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
            {extraFields.map((field) => (
              <Field key={field.name} label={`${field.label}*`} error={fieldErrors[field.name]}>
                <input
                  name={field.name}
                  type={field.type ?? "text"}
                  placeholder={field.placeholder}
                  className={inputClass(!!fieldErrors[field.name])}
                />
              </Field>
            ))}
            <Field label="MENSAJE*" error={fieldErrors.mensaje}>
              <textarea
                name="mensaje"
                rows={4}
                placeholder="Cuéntanos cómo podemos ayudarte"
                className={`${inputClass(!!fieldErrors.mensaje)} resize-none rounded-2xl`}
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

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full justify-center rounded-full bg-[#F97316] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#ea580c] disabled:opacity-60"
            >
              {submitting ? "Enviando…" : "Enviar"}
            </button>
          </form>
        </>
      )}

      {showPricingFooter && priceLabel && onInscribir ? (
        <div className="mt-8 border-t border-slate-300 pt-6">
          <div className="flex items-center gap-2">
            <PriceIcon className="h-5 w-5 text-[#F97316]" aria-hidden />
            <p className="text-lg font-bold text-[#F97316]">Costo: {priceLabel}</p>
          </div>
          {onVerBeneficios ? (
            <button
              type="button"
              onClick={onVerBeneficios}
              className="mt-4 inline-flex w-full justify-center rounded-full border border-[#0F172A] bg-white px-6 py-3 text-sm font-semibold text-[#0F172A] transition hover:bg-slate-50"
            >
              Ver beneficios y descuentos
            </button>
          ) : null}
          <button
            type="button"
            onClick={onInscribir}
            className="mt-3 inline-flex w-full justify-center rounded-full bg-[#F97316] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#ea580c]"
          >
            Inscríbete ahora
          </button>
        </div>
      ) : null}
    </aside>
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

export function CoursePriceBadge({
  label,
  icon = "piggy",
}: {
  label: string
  icon?: "piggy" | "coffee"
}) {
  const Icon = icon === "coffee" ? Coffee : PiggyBank
  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-[#F97316] px-5 py-3">
      <Icon className="h-5 w-5 text-[#F97316]" aria-hidden />
      <p className="text-lg font-bold text-[#F97316]">Costo: {label}</p>
    </div>
  )
}
