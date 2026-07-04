-- RTD 2026 Agenda — run this once in the Supabase SQL editor.
-- Creates the content tables, locks writes behind authentication,
-- and enables realtime so CMS edits push to every open browser.

create table if not exists public.days (
  id text primary key,
  date date not null,
  label text not null,
  title text not null default '',
  sort integer not null default 0
);

create table if not exists public.sessions (
  id text primary key,
  day_id text not null references public.days (id) on delete cascade,
  type text not null check (type in ('keynote', 'special', 'parallel', 'break', 'ceremony')),
  code text,
  title text not null,
  speaker text,
  chair text,
  panelists text,
  room text,
  start_time text not null,
  end_time text not null,
  description text,
  paper_count integer,
  sort integer not null default 0
);

create table if not exists public.settings (
  key text primary key,
  value text not null default ''
);

alter table public.days enable row level security;
alter table public.sessions enable row level security;
alter table public.settings enable row level security;

-- Everyone may read; only the signed-in CMS user may write.
drop policy if exists "public read days" on public.days;
create policy "public read days" on public.days for select using (true);
drop policy if exists "cms write days" on public.days;
create policy "cms write days" on public.days for all to authenticated using (true) with check (true);

drop policy if exists "public read sessions" on public.sessions;
create policy "public read sessions" on public.sessions for select using (true);
drop policy if exists "cms write sessions" on public.sessions;
create policy "cms write sessions" on public.sessions for all to authenticated using (true) with check (true);

drop policy if exists "public read settings" on public.settings;
create policy "public read settings" on public.settings for select using (true);
drop policy if exists "cms write settings" on public.settings;
create policy "cms write settings" on public.settings for all to authenticated using (true) with check (true);

-- Realtime: broadcast row changes to connected browsers.
do $$
begin
  alter publication supabase_realtime add table public.days;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.sessions;
exception when duplicate_object then null;
end $$;
do $$
begin
  alter publication supabase_realtime add table public.settings;
exception when duplicate_object then null;
end $$;
