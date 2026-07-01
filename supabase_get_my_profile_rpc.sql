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
