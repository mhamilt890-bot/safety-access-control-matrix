create extension if not exists "pgcrypto";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text,
  approved boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists access_records (
  id text primary key,
  name text,
  source text,
  contractor text,
  prior_contractor text,
  project text,
  prior_project text,
  event_date date,
  event_type text,
  severity text,
  sif text,
  investigation text,
  evidence text,
  access_status text,
  restriction_scope text,
  corrective_action text,
  review_date date,
  authority text,
  updated_label text,
  repeat_event boolean not null default false,
  utility text,
  job_class text,
  banned text,
  disposition text,
  notes text,
  stop_work text,
  removed_from_site text,
  utility_restriction text,
  rca text,
  corrective_status text,
  redispatch_concern text,
  management_review text,
  created_by uuid references auth.users(id),
  created_by_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  data jsonb not null default '{}'::jsonb
);

create table if not exists incidents (
  id text primary key,
  access_record_id text references access_records(id) on delete cascade,
  event_date date,
  event_type text,
  severity text,
  sif text,
  investigation text,
  notes text,
  created_by uuid references auth.users(id),
  created_by_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  data jsonb not null default '{}'::jsonb
);

create table if not exists restricted_banned_records (
  id text primary key,
  access_record_id text references access_records(id) on delete cascade,
  worker_name text,
  contractor text,
  access_status text,
  banned text,
  restriction_scope text,
  disposition text,
  review_date date,
  created_by uuid references auth.users(id),
  created_by_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  data jsonb not null default '{}'::jsonb
);

create table if not exists corrective_actions (
  id text primary key,
  access_record_id text references access_records(id) on delete cascade,
  action text,
  owner text,
  status text,
  review_date date,
  evidence text,
  created_by uuid references auth.users(id),
  created_by_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  data jsonb not null default '{}'::jsonb
);

create table if not exists report_records (
  id text primary key,
  title text,
  report_date date,
  owner text,
  notes text,
  created_by uuid references auth.users(id),
  created_by_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  data jsonb not null default '{}'::jsonb
);

create table if not exists app_roles (
  id text primary key,
  role text not null,
  permissions text,
  audit text not null default 'Yes',
  created_by uuid references auth.users(id),
  created_by_email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  data jsonb not null default '{}'::jsonb
);

create table if not exists audit_log (
  id uuid primary key default gen_random_uuid(),
  action text not null,
  table_name text not null,
  record_id text,
  user_id uuid references auth.users(id),
  user_email text,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

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

alter table profiles enable row level security;
alter table access_records enable row level security;
alter table incidents enable row level security;
alter table restricted_banned_records enable row level security;
alter table corrective_actions enable row level security;
alter table report_records enable row level security;
alter table app_roles enable row level security;
alter table audit_log enable row level security;

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
  where id = auth.uid()
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
    where id = auth.uid()
      and approved = true
      and lower(coalesce(email, '')) = 'mhamilt890@gmail.com'
      and lower(coalesce(role, '')) = 'admin'
  );
$$ language sql stable security definer set search_path = public;

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

create policy "approved read profiles" on profiles for select to authenticated using (auth.uid() = id or app_is_admin());
create policy "admin manage profiles" on profiles for all to authenticated using (app_is_admin()) with check (app_is_admin());

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

drop trigger if exists set_report_records_updated_at on report_records;
create trigger set_report_records_updated_at before update on report_records
for each row execute function set_updated_at();

drop trigger if exists set_app_roles_updated_at on app_roles;
create trigger set_app_roles_updated_at before update on app_roles
for each row execute function set_updated_at();
