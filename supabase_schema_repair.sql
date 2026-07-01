create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade
);

create table if not exists access_records (
  id text primary key
);

create table if not exists incidents (
  id text primary key
);

create table if not exists restricted_banned_records (
  id text primary key
);

create table if not exists corrective_actions (
  id text primary key
);

create table if not exists report_records (
  id text primary key
);

create table if not exists app_roles (
  id text primary key
);

create table if not exists audit_log (
  id uuid primary key default gen_random_uuid()
);

do $$
declare
  constraint_row record;
begin
  for constraint_row in
    select conrelid::regclass as table_name, conname
    from pg_constraint
    where contype = 'f'
      and confrelid = 'public.access_records'::regclass
  loop
    execute format('alter table %s drop constraint if exists %I', constraint_row.table_name, constraint_row.conname);
  end loop;
end $$;

alter table access_records alter column id type text using id::text;
alter table incidents alter column id type text using id::text;
alter table restricted_banned_records alter column id type text using id::text;
alter table corrective_actions alter column id type text using id::text;
alter table report_records alter column id type text using id::text;
alter table app_roles alter column id type text using id::text;

alter table profiles add column if not exists email text;
alter table profiles add column if not exists role text;
alter table profiles add column if not exists approved boolean not null default false;
alter table profiles alter column role drop not null;
alter table profiles alter column role drop default;
alter table profiles add column if not exists created_at timestamptz not null default now();
alter table profiles add column if not exists updated_at timestamptz not null default now();

alter table access_records add column if not exists name text;
alter table access_records add column if not exists source text;
alter table access_records add column if not exists contractor text;
alter table access_records add column if not exists prior_contractor text;
alter table access_records add column if not exists project text;
alter table access_records add column if not exists prior_project text;
alter table access_records add column if not exists event_date date;
alter table access_records add column if not exists event_type text;
alter table access_records add column if not exists severity text;
alter table access_records add column if not exists sif text;
alter table access_records add column if not exists investigation text;
alter table access_records add column if not exists evidence text;
alter table access_records add column if not exists access_status text;
alter table access_records add column if not exists restriction_scope text;
alter table access_records add column if not exists corrective_action text;
alter table access_records add column if not exists review_date date;
alter table access_records add column if not exists authority text;
alter table access_records add column if not exists updated_label text;
alter table access_records add column if not exists repeat_event boolean not null default false;
alter table access_records add column if not exists utility text;
alter table access_records add column if not exists job_class text;
alter table access_records add column if not exists banned text;
alter table access_records add column if not exists disposition text;
alter table access_records add column if not exists notes text;
alter table access_records add column if not exists stop_work text;
alter table access_records add column if not exists removed_from_site text;
alter table access_records add column if not exists utility_restriction text;
alter table access_records add column if not exists rca text;
alter table access_records add column if not exists corrective_status text;
alter table access_records add column if not exists redispatch_concern text;
alter table access_records add column if not exists management_review text;
alter table access_records add column if not exists created_by uuid references auth.users(id);
alter table access_records add column if not exists created_by_email text;
alter table access_records add column if not exists created_at timestamptz not null default now();
alter table access_records add column if not exists updated_at timestamptz not null default now();
alter table access_records add column if not exists data jsonb not null default '{}'::jsonb;

alter table incidents add column if not exists access_record_id text;
alter table incidents alter column access_record_id type text using access_record_id::text;
alter table incidents add column if not exists event_date date;
alter table incidents add column if not exists event_type text;
alter table incidents add column if not exists severity text;
alter table incidents add column if not exists sif text;
alter table incidents add column if not exists investigation text;
alter table incidents add column if not exists notes text;
alter table incidents add column if not exists created_by uuid references auth.users(id);
alter table incidents add column if not exists created_by_email text;
alter table incidents add column if not exists created_at timestamptz not null default now();
alter table incidents add column if not exists updated_at timestamptz not null default now();
alter table incidents add column if not exists data jsonb not null default '{}'::jsonb;

alter table restricted_banned_records add column if not exists access_record_id text;
alter table restricted_banned_records alter column access_record_id type text using access_record_id::text;
alter table restricted_banned_records add column if not exists worker_name text;
alter table restricted_banned_records add column if not exists contractor text;
alter table restricted_banned_records add column if not exists access_status text;
alter table restricted_banned_records add column if not exists banned text;
alter table restricted_banned_records add column if not exists restriction_scope text;
alter table restricted_banned_records add column if not exists disposition text;
alter table restricted_banned_records add column if not exists review_date date;
alter table restricted_banned_records add column if not exists created_by uuid references auth.users(id);
alter table restricted_banned_records add column if not exists created_by_email text;
alter table restricted_banned_records add column if not exists created_at timestamptz not null default now();
alter table restricted_banned_records add column if not exists updated_at timestamptz not null default now();
alter table restricted_banned_records add column if not exists data jsonb not null default '{}'::jsonb;

alter table corrective_actions add column if not exists access_record_id text;
alter table corrective_actions alter column access_record_id type text using access_record_id::text;
alter table corrective_actions add column if not exists action text;
alter table corrective_actions add column if not exists owner text;
alter table corrective_actions add column if not exists status text;
alter table corrective_actions add column if not exists review_date date;
alter table corrective_actions add column if not exists evidence text;
alter table corrective_actions add column if not exists created_by uuid references auth.users(id);
alter table corrective_actions add column if not exists created_by_email text;
alter table corrective_actions add column if not exists created_at timestamptz not null default now();
alter table corrective_actions add column if not exists updated_at timestamptz not null default now();
alter table corrective_actions add column if not exists data jsonb not null default '{}'::jsonb;

alter table report_records add column if not exists title text;
alter table report_records add column if not exists report_date date;
alter table report_records add column if not exists owner text;
alter table report_records add column if not exists notes text;
alter table report_records add column if not exists created_by uuid references auth.users(id);
alter table report_records add column if not exists created_by_email text;
alter table report_records add column if not exists created_at timestamptz not null default now();
alter table report_records add column if not exists updated_at timestamptz not null default now();
alter table report_records add column if not exists data jsonb not null default '{}'::jsonb;

alter table app_roles add column if not exists role text not null default 'Safety Reviewer';
alter table app_roles add column if not exists permissions text;
alter table app_roles add column if not exists audit text not null default 'Yes';
alter table app_roles add column if not exists created_by uuid references auth.users(id);
alter table app_roles add column if not exists created_by_email text;
alter table app_roles add column if not exists created_at timestamptz not null default now();
alter table app_roles add column if not exists updated_at timestamptz not null default now();
alter table app_roles add column if not exists data jsonb not null default '{}'::jsonb;

alter table audit_log add column if not exists action text;
alter table audit_log add column if not exists table_name text;
alter table audit_log add column if not exists record_id text;
alter table audit_log add column if not exists user_id uuid references auth.users(id);
alter table audit_log add column if not exists user_email text;
alter table audit_log add column if not exists details jsonb not null default '{}'::jsonb;
alter table audit_log add column if not exists created_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'incidents_access_record_id_fkey'
      and conrelid = 'public.incidents'::regclass
  ) then
    alter table incidents
      add constraint incidents_access_record_id_fkey
      foreign key (access_record_id) references access_records(id) on delete cascade not valid;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'restricted_banned_records_access_record_id_fkey'
      and conrelid = 'public.restricted_banned_records'::regclass
  ) then
    alter table restricted_banned_records
      add constraint restricted_banned_records_access_record_id_fkey
      foreign key (access_record_id) references access_records(id) on delete cascade not valid;
  end if;

  if not exists (
    select 1 from pg_constraint
    where conname = 'corrective_actions_access_record_id_fkey'
      and conrelid = 'public.corrective_actions'::regclass
  ) then
    alter table corrective_actions
      add constraint corrective_actions_access_record_id_fkey
      foreign key (access_record_id) references access_records(id) on delete cascade not valid;
  end if;
end $$;

create or replace function create_profile_for_auth_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role, approved)
  values (new.id, new.email, null, false)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists create_profile_for_auth_user on auth.users;
create trigger create_profile_for_auth_user
after insert on auth.users
for each row execute function create_profile_for_auth_user();

insert into public.profiles (id, email, role, approved)
select id, email, null, false
from auth.users
on conflict (id) do nothing;

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_access_records_updated_at on access_records;
create trigger set_access_records_updated_at before update on access_records
for each row execute function set_updated_at();

drop trigger if exists set_incidents_updated_at on incidents;
create trigger set_incidents_updated_at before update on incidents
for each row execute function set_updated_at();

drop trigger if exists set_restricted_banned_records_updated_at on restricted_banned_records;
create trigger set_restricted_banned_records_updated_at before update on restricted_banned_records
for each row execute function set_updated_at();

drop trigger if exists set_corrective_actions_updated_at on corrective_actions;
create trigger set_corrective_actions_updated_at before update on corrective_actions
for each row execute function set_updated_at();

drop trigger if exists set_report_records_updated_at on report_records;
create trigger set_report_records_updated_at before update on report_records
for each row execute function set_updated_at();

drop trigger if exists set_app_roles_updated_at on app_roles;
create trigger set_app_roles_updated_at before update on app_roles
for each row execute function set_updated_at();

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

create or replace function app_can_view()
returns boolean as $$
  select app_current_role() in ('admin', 'reviewer', 'viewer', 'approved');
$$ language sql stable security definer set search_path = public;

create or replace function app_can_write()
returns boolean as $$
  select app_current_role() in ('admin', 'reviewer', 'viewer', 'approved');
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

create or replace function public.get_my_profile()
returns table (
  id uuid,
  email text,
  role text,
  approved boolean
) as $$
  select p.id, p.email, p.role, p.approved
  from public.profiles p
  where p.id = auth.uid()
  limit 1;
$$ language sql stable security definer set search_path = public;

grant execute on function public.get_my_profile() to authenticated;

create or replace function app_owns_record(record_created_by uuid, record_created_by_email text)
returns boolean as $$
  select auth.uid() = record_created_by
    or lower(coalesce(auth.jwt() ->> 'email', '')) = lower(coalesce(record_created_by_email, ''));
$$ language sql stable security definer set search_path = public;

create or replace function app_owns_record(record_created_by text, record_created_by_email text)
returns boolean as $$
  select auth.uid()::text = coalesce(record_created_by, '')
    or lower(coalesce(auth.jwt() ->> 'email', '')) = lower(coalesce(record_created_by_email, ''));
$$ language sql stable security definer set search_path = public;

alter table profiles enable row level security;
alter table access_records enable row level security;
alter table incidents enable row level security;
alter table restricted_banned_records enable row level security;
alter table corrective_actions enable row level security;
alter table report_records enable row level security;
alter table app_roles enable row level security;
alter table audit_log enable row level security;

drop policy if exists "authenticated read profiles" on profiles;
drop policy if exists "authenticated manage profiles" on profiles;
drop policy if exists "authenticated read access records" on access_records;
drop policy if exists "authenticated insert access records" on access_records;
drop policy if exists "authenticated update access records" on access_records;
drop policy if exists "authenticated delete access records" on access_records;
drop policy if exists "authenticated read incidents" on incidents;
drop policy if exists "authenticated manage incidents" on incidents;
drop policy if exists "authenticated read restricted records" on restricted_banned_records;
drop policy if exists "authenticated manage restricted records" on restricted_banned_records;
drop policy if exists "authenticated read corrective actions" on corrective_actions;
drop policy if exists "authenticated manage corrective actions" on corrective_actions;
drop policy if exists "authenticated read report records" on report_records;
drop policy if exists "authenticated manage report records" on report_records;
drop policy if exists "authenticated read app roles" on app_roles;
drop policy if exists "authenticated manage app roles" on app_roles;
drop policy if exists "authenticated read audit log" on audit_log;
drop policy if exists "authenticated insert audit log" on audit_log;
drop policy if exists "approved read profiles" on profiles;
drop policy if exists "admin manage profiles" on profiles;
drop policy if exists "signed in read own profile or admin profiles" on profiles;
drop policy if exists "admin update profiles" on profiles;
drop policy if exists "approved read access records" on access_records;
drop policy if exists "reviewer insert access records" on access_records;
drop policy if exists "reviewer update access records" on access_records;
drop policy if exists "admin delete access records" on access_records;
drop policy if exists "approved insert shared access records" on access_records;
drop policy if exists "owner update access records" on access_records;
drop policy if exists "owner delete access records" on access_records;
drop policy if exists "approved read incidents" on incidents;
drop policy if exists "reviewer manage incidents" on incidents;
drop policy if exists "approved insert shared incidents" on incidents;
drop policy if exists "owner update incidents" on incidents;
drop policy if exists "owner delete incidents" on incidents;
drop policy if exists "approved read restricted records" on restricted_banned_records;
drop policy if exists "reviewer manage restricted records" on restricted_banned_records;
drop policy if exists "approved insert shared restricted records" on restricted_banned_records;
drop policy if exists "owner update restricted records" on restricted_banned_records;
drop policy if exists "owner delete restricted records" on restricted_banned_records;
drop policy if exists "approved read corrective actions" on corrective_actions;
drop policy if exists "reviewer manage corrective actions" on corrective_actions;
drop policy if exists "approved insert shared corrective actions" on corrective_actions;
drop policy if exists "owner update corrective actions" on corrective_actions;
drop policy if exists "owner delete corrective actions" on corrective_actions;
drop policy if exists "approved read report records" on report_records;
drop policy if exists "reviewer manage report records" on report_records;
drop policy if exists "approved insert shared report records" on report_records;
drop policy if exists "owner update report records" on report_records;
drop policy if exists "owner delete report records" on report_records;
drop policy if exists "admin read app roles" on app_roles;
drop policy if exists "admin manage app roles" on app_roles;
drop policy if exists "admin read audit log" on audit_log;
drop policy if exists "approved insert audit log" on audit_log;

create policy "signed in read own profile or admin profiles" on profiles
for select to authenticated
using (
  id::text = auth.uid()::text
  or lower(coalesce(email, '')) = lower(coalesce(auth.jwt() ->> 'email', ''))
  or app_is_admin()
);

create policy "admin update profiles" on profiles
for update to authenticated
using (app_is_admin())
with check (app_is_admin());

create policy "approved read access records" on access_records for select to authenticated using (app_can_view());
create policy "approved insert shared access records" on access_records for insert to authenticated with check (app_can_write() and (app_is_admin() or app_owns_record(created_by, created_by_email)));
create policy "owner update access records" on access_records for update to authenticated using (app_is_admin() or app_owns_record(created_by, created_by_email)) with check (app_is_admin() or app_owns_record(created_by, created_by_email));
create policy "owner delete access records" on access_records for delete to authenticated using (app_is_admin() or app_owns_record(created_by, created_by_email));

create policy "approved read incidents" on incidents for select to authenticated using (app_can_view());
create policy "approved insert shared incidents" on incidents for insert to authenticated with check (app_can_write() and (app_is_admin() or app_owns_record(created_by, created_by_email)));
create policy "owner update incidents" on incidents for update to authenticated using (app_is_admin() or app_owns_record(created_by, created_by_email)) with check (app_is_admin() or app_owns_record(created_by, created_by_email));
create policy "owner delete incidents" on incidents for delete to authenticated using (app_is_admin() or app_owns_record(created_by, created_by_email));

create policy "approved read restricted records" on restricted_banned_records for select to authenticated using (app_can_view());
create policy "approved insert shared restricted records" on restricted_banned_records for insert to authenticated with check (app_can_write() and (app_is_admin() or app_owns_record(created_by, created_by_email)));
create policy "owner update restricted records" on restricted_banned_records for update to authenticated using (app_is_admin() or app_owns_record(created_by, created_by_email)) with check (app_is_admin() or app_owns_record(created_by, created_by_email));
create policy "owner delete restricted records" on restricted_banned_records for delete to authenticated using (app_is_admin() or app_owns_record(created_by, created_by_email));

create policy "approved read corrective actions" on corrective_actions for select to authenticated using (app_can_view());
create policy "approved insert shared corrective actions" on corrective_actions for insert to authenticated with check (app_can_write() and (app_is_admin() or app_owns_record(created_by, created_by_email)));
create policy "owner update corrective actions" on corrective_actions for update to authenticated using (app_is_admin() or app_owns_record(created_by, created_by_email)) with check (app_is_admin() or app_owns_record(created_by, created_by_email));
create policy "owner delete corrective actions" on corrective_actions for delete to authenticated using (app_is_admin() or app_owns_record(created_by, created_by_email));

create policy "approved read report records" on report_records for select to authenticated using (app_can_view());
create policy "approved insert shared report records" on report_records for insert to authenticated with check (app_can_write() and (app_is_admin() or app_owns_record(created_by, created_by_email)));
create policy "owner update report records" on report_records for update to authenticated using (app_is_admin() or app_owns_record(created_by, created_by_email)) with check (app_is_admin() or app_owns_record(created_by, created_by_email));
create policy "owner delete report records" on report_records for delete to authenticated using (app_is_admin() or app_owns_record(created_by, created_by_email));

create policy "admin read app roles" on app_roles for select to authenticated using (app_is_admin());
create policy "admin manage app roles" on app_roles for all to authenticated using (app_is_admin()) with check (app_is_admin());

create policy "admin read audit log" on audit_log for select to authenticated using (app_is_admin());
create policy "approved insert audit log" on audit_log for insert to authenticated with check (app_can_write() or app_is_admin());

-- First admin approval, run once after the first admin account exists:
-- update public.profiles set role = 'admin', approved = true where email = 'mhamilt890@gmail.com';
-- Approved roles are: admin, reviewer, viewer.
