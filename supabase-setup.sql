-- Chinesisch festigen: geräteübergreifender Lernfortschritt
-- Im Supabase-Dashboard unter SQL Editor einmal ausführen.

create table if not exists public.user_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  key text not null,
  value text,
  deleted boolean not null default false,
  updated_at bigint not null,
  primary key (user_id, key),
  constraint user_progress_key_length check (char_length(key) between 1 and 160),
  constraint user_progress_key_prefix check (left(key, 3) = 'cf_')
);

alter table public.user_progress enable row level security;

-- Vor erneutem Ausführen vorhandene gleichnamige Policies entfernen.
drop policy if exists "Users read own progress" on public.user_progress;
drop policy if exists "Users insert own progress" on public.user_progress;
drop policy if exists "Users update own progress" on public.user_progress;
drop policy if exists "Users delete own progress" on public.user_progress;

create policy "Users read own progress"
on public.user_progress
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "Users insert own progress"
on public.user_progress
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "Users update own progress"
on public.user_progress
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "Users delete own progress"
on public.user_progress
for delete
to authenticated
using ((select auth.uid()) = user_id);

revoke all on table public.user_progress from anon;
grant select, insert, update, delete on table public.user_progress to authenticated;
