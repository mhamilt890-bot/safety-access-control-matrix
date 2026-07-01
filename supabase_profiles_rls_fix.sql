create or replace function app_current_role()
returns text as $$
  select case
    when lower(coalesce(role, '')) in ('admin', 'system admin', 'safety admin') then 'admin'
    when lower(coalesce(role, '')) in ('reviewer', 'safety reviewer', 'safety manager', 'editor') then 'reviewer'
    when lower(coalesce(role, '')) in ('viewer', 'read only', 'read-only') then 'viewer'
    when approved = true then 'approved'
    else ''
  end
  from public.profiles
  where (
      id::text = auth.uid()::text
      or lower(coalesce(email, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
    )
    and approved = true;
$$ language sql stable security definer set search_path = public;

create or replace function app_is_admin()
returns boolean as $$
  select exists (
    select 1
    from public.profiles
    where (
        id::text = auth.uid()::text
        or lower(coalesce(email, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
      )
      and approved = true
      and lower(coalesce(email, '')) = 'mhamilt890@gmail.com'
      and lower(coalesce(role, '')) = 'admin'
  );
$$ language sql stable security definer set search_path = public;

alter table public.profiles enable row level security;

drop policy if exists "authenticated read profiles" on public.profiles;
drop policy if exists "authenticated manage profiles" on public.profiles;
drop policy if exists "approved read profiles" on public.profiles;
drop policy if exists "admin manage profiles" on public.profiles;
drop policy if exists "signed in read own profile or admin profiles" on public.profiles;
drop policy if exists "admin update profiles" on public.profiles;

create policy "signed in read own profile or admin profiles" on public.profiles
for select to authenticated
using (
  id::text = auth.uid()::text
  or lower(coalesce(email, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
  or app_is_admin()
);

create policy "admin update profiles" on public.profiles
for update to authenticated
using (app_is_admin())
with check (app_is_admin());
