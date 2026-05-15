"use client"

import { X } from "lucide-react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"

type ModalContactoProps = {
  open: boolean
  onClose: () => void
}

export default function ModalContacto({ open, onClose }: ModalContactoProps) {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!open) return
    setError(null)
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
        aria-labelledby="modal-contacto-title"
        className="relative z-[101] w-full max-w-4xl rounded-2xl bg-white p-6 shadow-2xl md:p-10"
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
            <h2
              id="modal-contacto-title"
              className="text-2xl font-bold text-[#0F172A] md:text-3xl"
            >
              ¡Contáctanos!
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-slate-600">
              ¿Tienes dudas, solicitudes, comentarios o simplemente quieres enviarnos un saludo?
              Escríbenos en este formulario, te contactáremos en el menor tiempo posible.
            </p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={async (e) => {
              e.preventDefault()
              setError(null)
              const form = e.currentTarget
              const fd = new FormData(form)
              const nombre = String(fd.get("nombre") ?? "").trim()
              const email = String(fd.get("email") ?? "").trim()
              const telefono = String(fd.get("telefono") ?? "").trim()
              const mensaje = String(fd.get("mensaje") ?? "").trim()
              setSubmitting(true)
              try {
                const res = await fetch("/api/contact", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ nombre, email, telefono, mensaje }),
                })
                if (!res.ok) {
                  setError("No pudimos enviar el mensaje. Intenta de nuevo o escríbenos por WhatsApp.")
                  return
                }
                form.reset()
                onClose()
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
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Nombre*
              </label>
              <input
                name="nombre"
                required
                placeholder="Tu nombre"
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-[#F97316]/30 transition focus:ring-2"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Correo electrónico*
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="ejemplo@correo.com"
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-[#F97316]/30 transition focus:ring-2"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Teléfono*
              </label>
              <input
                name="telefono"
                type="tel"
                required
                placeholder="314 231 5678"
                className="w-full rounded-full border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-[#F97316]/30 transition focus:ring-2"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                Mensaje*
              </label>
              <textarea
                name="mensaje"
                required
                rows={4}
                placeholder="Cuéntanos cómo podemos ayudarte"
                className="w-full resize-none rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none ring-[#F97316]/30 transition focus:ring-2"
              />
            </div>
            <div className="pt-2 text-center">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex rounded-full bg-[#F97316] px-10 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#ea580c] disabled:opacity-60"
              >
                {submitting ? "Enviando…" : "Enviar información"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.body,
  )
}
