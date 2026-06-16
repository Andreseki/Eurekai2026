export type LeadInput = {
  nombre: string
  email: string
  telefono: string
  mensaje?: string | null
  tipo?: string
  curso?: string | null
  empresa?: string | null
  participantes?: string | null
  origen?: string | null
  metadata?: Record<string, unknown>
}

export type NewsletterInput = {
  email: string
  fuente?: string
}

function supabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY)
}

async function supabaseInsert(table: string, row: Record<string, unknown>): Promise<boolean> {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) return false

  const res = await fetch(`${url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify(row),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => "")
    console.error(`[supabase] insert ${table} failed:`, res.status, detail)
  }

  return res.ok
}

export async function saveLead(lead: LeadInput): Promise<boolean> {
  if (!supabaseConfigured()) return false

  const { metadata, ...fields } = lead

  return supabaseInsert("leads", {
    ...fields,
    mensaje: fields.mensaje ?? null,
    curso: fields.curso ?? null,
    empresa: fields.empresa ?? null,
    participantes: fields.participantes ?? null,
    origen: fields.origen ?? null,
    tipo: fields.tipo ?? "contacto",
    estado: "nuevo",
    metadata: metadata ?? {},
  })
}

export async function saveNewsletterSubscriber(input: NewsletterInput): Promise<boolean> {
  if (!supabaseConfigured()) return false

  return supabaseInsert("newsletter_subscribers", {
    email: input.email.trim().toLowerCase(),
    fuente: input.fuente ?? "footer",
    activo: true,
  })
}

export function isLeadsDbEnabled() {
  return supabaseConfigured()
}
