export const CURSO_EMPRESARIOS_SLUG = "ia-aplicada-para-empresarios"

export const CURSO_EMPRESARIOS_PATH = `/experiencias/${CURSO_EMPRESARIOS_SLUG}`

export const CURSO_EMPRESARIOS_NAME = "IA aplicada para Empresarios"

export const CURSO_EMPRESARIOS_SUBTITLE = "Del caso de uso al primer prototipo"

/** Cierre de inscripciones — 5 agosto 2026, 23:59 hora Bogotá */
export const CURSO_EMPRESARIOS_ENROLLMENT_DEADLINE = "2026-08-05T23:59:59-05:00"

export const CURSO_EMPRESARIOS_EVENT_DATE_LABEL = "6 de Agosto, 2026"

export const CURSO_EMPRESARIOS_PRICE_LABEL = "$2.000.000"

export const CURSO_EMPRESARIOS_PAYMENT_URL =
  process.env.NEXT_PUBLIC_CURSO_EMPRESARIOS_PAYMENT_URL ?? process.env.NEXT_PUBLIC_PAYMENT_URL ?? ""

export function getCursoEmpresariosEnrollmentDeadlineMs(): number {
  return new Date(CURSO_EMPRESARIOS_ENROLLMENT_DEADLINE).getTime()
}
