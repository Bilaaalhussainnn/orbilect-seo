begin;
lock table public.orbilect_leads in access exclusive mode;

alter table public.orbilect_leads
  add column if not exists inquiry_code text,
  add column if not exists email_error text,
  add column if not exists email_claimed_at timestamptz;

create table if not exists public.orbilect_inquiry_counters (
  prefix text primary key,
  last_value bigint not null default 0
);

alter table public.orbilect_inquiry_counters enable row level security;
revoke all on public.orbilect_inquiry_counters from public, anon, authenticated;

insert into public.orbilect_inquiry_counters (prefix)
values ('SEO-'), ('SEO-P-') on conflict do nothing;

create or replace function public.next_orbilect_inquiry_code(lead_source text)
returns text language plpgsql security definer set search_path = '' as $$
declare
  code_prefix text := case when lead_source = 'starter-offer' then 'SEO-P-' else 'SEO-' end;
  code_number bigint;
begin
  update public.orbilect_inquiry_counters
  set last_value = last_value + 1
  where prefix = code_prefix
  returning last_value into strict code_number;
  return code_prefix || case when code_number < 10 then '0' else '' end || code_number::text;
end;
$$;

revoke all on function public.next_orbilect_inquiry_code(text) from public, anon, authenticated;

do $$
declare
  lead record;
begin
  for lead in
    select id, source from public.orbilect_leads
    where inquiry_code is null order by created_at, id
  loop
    update public.orbilect_leads
    set inquiry_code = public.next_orbilect_inquiry_code(lead.source)
    where id = lead.id;
  end loop;
end;
$$;

alter table public.orbilect_leads alter column inquiry_code set not null;
create unique index if not exists orbilect_leads_inquiry_code_idx
  on public.orbilect_leads (inquiry_code);

create or replace function public.set_orbilect_inquiry_code()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  perform pg_catalog.pg_advisory_xact_lock(pg_catalog.hashtextextended(new.id::text, 0));
  select inquiry_code into new.inquiry_code
  from public.orbilect_leads where id = new.id;
  if new.inquiry_code is null then
    new.inquiry_code := public.next_orbilect_inquiry_code(new.source);
  end if;
  return new;
end;
$$;

revoke all on function public.set_orbilect_inquiry_code() from public, anon, authenticated;
drop trigger if exists set_orbilect_inquiry_code on public.orbilect_leads;
create trigger set_orbilect_inquiry_code before insert on public.orbilect_leads
for each row execute function public.set_orbilect_inquiry_code();
commit;
