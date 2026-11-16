create table if not exists public.naila_chat_archive (
  owner_hash text not null,
  chat_id uuid not null,
  started_at timestamptz not null,
  expires_at timestamptz not null,
  closed_at timestamptz,
  close_reason text check (close_reason in ('declined', 'inactive', 'last-tab')),
  primary key (owner_hash, chat_id)
);

create table if not exists public.naila_chat_archive_events (
  owner_hash text not null,
  chat_id uuid not null,
  event_id text not null,
  kind text not null check (kind in ('turn', 'warning', 'close')),
  at timestamptz not null,
  visitor_text text,
  reply_text text,
  primary key (owner_hash, chat_id, event_id),
  foreign key (owner_hash, chat_id) references public.naila_chat_archive (owner_hash, chat_id) on delete cascade
);

alter table public.naila_chat_archive enable row level security;
alter table public.naila_chat_archive_events enable row level security;
revoke all on public.naila_chat_archive, public.naila_chat_archive_events from public, anon, authenticated;
grant select on public.naila_chat_archive, public.naila_chat_archive_events to service_role;

create or replace function public.naila_record_chat_event(
  p_chat_id uuid, p_owner text, p_event_id text, p_kind text, p_visitor text,
  p_reply text, p_reason text, p_at timestamptz, p_expires_at timestamptz,
  p_human_id uuid, p_human_owner text
)
returns void language plpgsql security definer set search_path = '' as $$
declare
  inserted integer;
begin
  insert into public.naila_chat_archive (owner_hash, chat_id, started_at, expires_at)
  values (p_owner, p_chat_id, p_at, p_expires_at)
  on conflict (owner_hash, chat_id) do nothing;

  insert into public.naila_chat_archive_events (owner_hash, chat_id, event_id, kind, at, visitor_text, reply_text)
  values (p_owner, p_chat_id, p_event_id, p_kind, p_at, p_visitor, p_reply)
  on conflict (owner_hash, chat_id, event_id) do nothing;

  get diagnostics inserted = row_count;
  if inserted = 0 then return; end if;

  if p_kind = 'close' then
    update public.naila_chat_archive
      set closed_at = p_at, close_reason = p_reason
      where owner_hash = p_owner and chat_id = p_chat_id and closed_at is null;
    if p_human_id is not null and p_human_owner is not null then
      update public.naila_human_chats
      set state = 'closed', updated_at = p_at,
        history = history || jsonb_build_array(jsonb_build_object('role', 'assistant', 'text', p_reply, 'at', p_at))
      where id = p_human_id and owner = p_human_owner and state in ('waiting', 'live');
    end if;
  elsif p_kind = 'turn' then
    update public.naila_chat_archive
      set expires_at = greatest(expires_at, p_expires_at)
      where owner_hash = p_owner and chat_id = p_chat_id and closed_at is null;
  end if;
end;
$$;

revoke all on function public.naila_record_chat_event(uuid,text,text,text,text,text,text,timestamptz,timestamptz,uuid,text)
  from public, anon, authenticated;
grant execute on function public.naila_record_chat_event(uuid,text,text,text,text,text,text,timestamptz,timestamptz,uuid,text)
  to service_role;
