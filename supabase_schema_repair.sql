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
alter table profiles add column if not exists role text not null default 'Safety Reviewer';
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
alter table corrective_actions add column if not exists created_at timestamptz not null default now();
alter table corrective_actions add column if not exists updated_at timestamptz not null default now();
alter table corrective_actions add column if not exists data jsonb not null default '{}'::jsonb;

alter table report_records add column if not exists title text;
alter table report_records add column if not exists report_date date;
alter table report_records add column if not exists owner text;
alter table report_records add column if not exists notes text;
alter table report_records add column if not exists created_by uuid references auth.users(id);
alter table report_records add column if not exists created_at timestamptz not null default now();
alter table report_records add column if not exists updated_at timestamptz not null default now();
alter table report_records add column if not exists data jsonb not null default '{}'::jsonb;

alter table app_roles add column if not exists role text not null default 'Safety Reviewer';
alter table app_roles add column if not exists permissions text;
alter table app_roles add column if not exists audit text not null default 'Yes';
alter table app_roles add column if not exists created_by uuid references auth.users(id);
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
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'Safety Reviewer')
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists create_profile_for_auth_user on auth.users;
create trigger create_profile_for_auth_user
after insert on auth.users
for each row execute function create_profile_for_auth_user();

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

create policy "authenticated read profiles" on profiles for select to authenticated using (true);
create policy "authenticated manage profiles" on profiles for all to authenticated using (auth.uid() = id) with check (auth.uid() = id);

create policy "authenticated read access records" on access_records for select to authenticated using (true);
create policy "authenticated insert access records" on access_records for insert to authenticated with check (true);
create policy "authenticated update access records" on access_records for update to authenticated using (true) with check (true);
create policy "authenticated delete access records" on access_records for delete to authenticated using (true);

create policy "authenticated read incidents" on incidents for select to authenticated using (true);
create policy "authenticated manage incidents" on incidents for all to authenticated using (true) with check (true);

create policy "authenticated read restricted records" on restricted_banned_records for select to authenticated using (true);
create policy "authenticated manage restricted records" on restricted_banned_records for all to authenticated using (true) with check (true);

create policy "authenticated read corrective actions" on corrective_actions for select to authenticated using (true);
create policy "authenticated manage corrective actions" on corrective_actions for all to authenticated using (true) with check (true);

create policy "authenticated read report records" on report_records for select to authenticated using (true);
create policy "authenticated manage report records" on report_records for all to authenticated using (true) with check (true);

create policy "authenticated read app roles" on app_roles for select to authenticated using (true);
create policy "authenticated manage app roles" on app_roles for all to authenticated using (true) with check (true);

create policy "authenticated read audit log" on audit_log for select to authenticated using (true);
create policy "authenticated insert audit log" on audit_log for insert to authenticated with check (true);
