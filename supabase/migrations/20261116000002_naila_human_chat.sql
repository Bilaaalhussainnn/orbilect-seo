create sequence if not exists public.naila_chat_visitor_number;

create table if not exists public.naila_human_chats (
  id uuid primary key,
  number bigint not null unique default nextval('public.naila_chat_visitor_number'),
  owner text not null,
  state text not null default 'waiting' check (state in ('waiting', 'live', 'closed')),
  agent text,
  history jsonb not null default '[]'::jsonb check (jsonb_typeof(history) = 'array'),
  rating integer check (rating between 1 and 5),
  review text check (length(review) <= 2000),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists naila_one_active_human_chat
  on public.naila_human_chats (owner) where state in ('waiting', 'live');
create index if not exists naila_human_chat_updated on public.naila_human_chats (updated_at desc);

alter table public.naila_human_chats enable row level security;
revoke all on public.naila_human_chats from public, anon, authenticated;
revoke all on sequence public.naila_chat_visitor_number from public, anon, authenticated;
grant select, insert, update, delete on public.naila_human_chats to service_role;
grant usage on sequence public.naila_chat_visitor_number to service_role;

create or replace function public.naila_human_chat(
  chat uuid, owner_key text, operation text, payload jsonb default '{}'::jsonb
) returns jsonb
language plpgsql
security invoker
set search_path = ''
as $$
declare
  item public.naila_human_chats%rowtype;
  actor text;
  body text := btrim(coalesce(payload->>'text', ''));
  agent_name text := btrim(coalesce(payload->>'agent', ''));
  stars integer;
begin
  -- Only the authenticated server can call this function. Visitor calls carry
  -- an owner key computed from their signed session cookie.
  if operation = 'start' and owner_key is not null then
    insert into public.naila_human_chats(id, owner, history)
      values (chat, owner_key, coalesce(payload->'history', '[]'::jsonb))
      on conflict do nothing;
  end if;

  select * into item from public.naila_human_chats
    where id = chat and (owner_key is null or owner = owner_key)
    for update;
  if not found then return jsonb_build_object('error', 'Conversation unavailable.'); end if;

  if operation in ('start', 'status') then
    null;
  elsif operation = 'claim' and owner_key is null and item.state = 'waiting'
      and length(agent_name) between 1 and 80 then
    update public.naila_human_chats set state = 'live', agent = agent_name, updated_at = now()
      where id = chat returning * into item;
  elsif (operation = 'visitor-message' and owner_key is not null and item.state in ('waiting', 'live'))
      or (operation = 'agent-message' and owner_key is null and item.state = 'live') then
    if length(body) not between 1 and 1000 or jsonb_array_length(item.history) >= 500 then
      return jsonb_build_object('error', 'Message is empty, too long, or the conversation is full.');
    end if;
    actor := case when owner_key is null then 'agent' else 'visitor' end;
    update public.naila_human_chats
      set history = history || jsonb_build_array(jsonb_build_object('role', actor, 'text', body, 'at', now())), updated_at = now()
      where id = chat returning * into item;
  elsif operation = 'close' and owner_key is null and item.state = 'live'
      and item.history @> '[{"role":"agent"}]'::jsonb then
    update public.naila_human_chats set state = 'closed', updated_at = now() where id = chat returning * into item;
  elsif operation = 'rate' and owner_key is not null and item.state = 'closed' then
    if item.rating is null then
      stars := (payload->>'rating')::integer;
      if stars is null or stars not between 1 and 5 or length(body) > 2000
          or (body <> '' and cardinality(regexp_split_to_array(body, '\s+')) > 160) then
        return jsonb_build_object('error', 'Enter a rating and use up to 160 words.');
      end if;
      update public.naila_human_chats set rating = stars, review = nullif(body, ''), updated_at = now()
        where id = chat returning * into item;
    end if;
  else
    return jsonb_build_object('error', 'This action isn’t available for the current conversation.');
  end if;

  return to_jsonb(item) - 'owner';
end;
$$;

revoke all on function public.naila_human_chat(uuid, text, text, jsonb) from public, anon, authenticated;
grant execute on function public.naila_human_chat(uuid, text, text, jsonb) to service_role;
