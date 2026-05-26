export const BOOTCAMP_NAME = "Innovación potenciada con Inteligencia Artificial."

/** Cierre de inscripciones — 30 mayo 2026, 23:59 hora Bogotá (UTC-5) */
export const BOOTCAMP_ENROLLMENT_DEADLINE = "2026-05-30T23:59:59-05:00"

/** Inicio del bootcamp presencial */
export const BOOTCAMP_EVENT_START = "2026-05-30T08:00:00-05:00"

export const BOOTCAMP_EVENT_DATE_LABEL = "30 de Mayo. 2026"

export const BOOTCAMP_PAYMENT_URL =
  process.env.NEXT_PUBLIC_PAYMENT_URL ?? "https://checkout.wompi.co/l/P9hY3x"

export function getEnrollmentDeadlineMs(): number {
  return new Date(BOOTCAMP_ENROLLMENT_DEADLINE).getTime()
}
