do $$
begin
  if not exists (select 1 from pg_type where typname = 'app_role') then
    create type public.app_role as enum ('user', 'admin');
  end if;
end
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  full_name text,
  role public.app_role not null default 'user',
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.profiles enable row level security;

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data ->> 'full_name', null)
  )
  on conflict (id) do update set
    email = excluded.email,
    full_name = coalesce(excluded.full_name, public.profiles.full_name),
    updated_at = timezone('utc', now());

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
after insert on auth.users
for each row
execute procedure public.handle_new_user_profile();

insert into public.profiles (id, email, full_name, role)
select
  u.id,
  coalesce(u.email, ''),
  coalesce(u.raw_user_meta_data ->> 'full_name', null),
  case
    when (u.raw_app_meta_data ->> 'role') = 'admin' or (u.raw_user_meta_data ->> 'role') = 'admin' then 'admin'::public.app_role
    else 'user'::public.app_role
  end
from auth.users u
on conflict (id) do update
set
  email = excluded.email,
  full_name = coalesce(excluded.full_name, public.profiles.full_name),
  role = case
    when (public.profiles.role = 'admin') then 'admin'::public.app_role
    else excluded.role
  end,
  updated_at = timezone('utc', now());

create or replace function public.set_profiles_updated_at_timestamp()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_profiles_updated_at on public.profiles;

create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_profiles_updated_at_timestamp();

create or replace function public.prevent_profile_role_escalation()
returns trigger as $$
begin
  if old.role is distinct from new.role then
    if auth.role() <> 'service_role'
      and (auth.jwt() -> 'app_metadata' ->> 'role') <> 'admin'
      and (auth.jwt() -> 'user_metadata' ->> 'role') <> 'admin' then
      raise exception 'Only admins can change profile role.';
    end if;
  end if;

  return new;
end;
$$ language plpgsql;

drop trigger if exists prevent_profile_role_escalation on public.profiles;

create trigger prevent_profile_role_escalation
before update on public.profiles
for each row
execute function public.prevent_profile_role_escalation();

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

drop policy if exists "Admins can view all profiles" on public.profiles;
create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    or (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

alter table public.contact_requests
  add column if not exists user_id uuid references auth.users(id) on delete set null;

alter table public.quote_requests
  add column if not exists user_id uuid references auth.users(id) on delete set null;

drop policy if exists "Users can view own contact requests" on public.contact_requests;
create policy "Users can view own contact requests"
  on public.contact_requests for select
  using (auth.uid() = user_id);

drop policy if exists "Users can view own quote requests" on public.quote_requests;
create policy "Users can view own quote requests"
  on public.quote_requests for select
  using (auth.uid() = user_id);

drop policy if exists "Admins can view all contact requests" on public.contact_requests;
create policy "Admins can view all contact requests"
  on public.contact_requests for select
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    or (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

drop policy if exists "Admins can view all quote requests" on public.quote_requests;
create policy "Admins can view all quote requests"
  on public.quote_requests for select
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    or (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );
