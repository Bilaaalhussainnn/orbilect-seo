create table if not exists public.orbilect_leads (
  id uuid primary key,
  created_at timestamptz not null default now(),
  source text not null,
  form_name text not null,
  source_page text not null,
  name text,
  email text not null,
  phone text,
  website text not null,
  service text not null,
  message text not null default '',
  email_status text not null default 'pending' check (email_status in ('pending', 'failed', 'accepted')),
  email_id text
);

create index if not exists orbilect_leads_recent_idx
  on public.orbilect_leads (created_at desc, id desc);

alter table public.orbilect_leads enable row level security;
revoke all on public.orbilect_leads from public, anon, authenticated;
grant select, insert, update on public.orbilect_leads to service_role;
