/** Ancla HTML por experiencia (id del listado en /experiencias). */
export function experienciaAnchorId(experienceId: string) {
  return `experiencia-${experienceId}`
}

/** Desde inicio «Escoge tu camino» → pestaña + tarjeta concreta. */
export const HOME_CAMINO_LINKS = {
  cursos: `/experiencias/ia-aplicada-para-empresarios`,
  incompany: `/experiencias/lego-serious-play`,
  misiones: `/experiencias/explorando-el-futuro-de-la-ia`,
} as const
