-- EurekAI · ejecutar en Supabase → SQL Editor
-- Panel: https://supabase.com/dashboard

-- Leads de formularios (contacto, info, inscripción, cursos)
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nombre text not null,
  email text not null,
  telefono text not null,
  mensaje text,
  tipo text not null default 'contacto',
  curso text,
  empresa text,
  participantes text,
  origen text,
  estado text not null default 'nuevo',
  metadata jsonb not null default '{}'::jsonb
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_estado_idx on public.leads (estado);
create index if not exists leads_curso_idx on public.leads (curso);

-- Newsletter del footer
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique,
  activo boolean not null default true,
  fuente text default 'footer'
);

-- Solo el API (service role) escribe; sin políticas públicas
alter table public.leads enable row level security;
alter table public.newsletter_subscribers enable row level security;
