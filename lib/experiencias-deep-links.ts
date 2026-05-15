/** Ancla HTML por experiencia (id del listado en /experiencias). */
export function experienciaAnchorId(experienceId: string) {
  return `experiencia-${experienceId}`
}

/** Desde inicio «Escoge tu camino» → pestaña + tarjeta concreta. */
export const HOME_CAMINO_LINKS = {
  cursos: `/experiencias?tab=cursos#${experienciaAnchorId("2")}`,
  incompany: `/experiencias?tab=incompany#${experienciaAnchorId("6")}`,
  misiones: `/experiencias?tab=misiones#${experienciaAnchorId("7")}`,
} as const
