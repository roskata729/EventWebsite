create table if not exists public.app_settings (
  key text primary key,
  value text not null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.app_settings enable row level security;

drop trigger if exists set_app_settings_updated_at on public.app_settings;

create trigger set_app_settings_updated_at
before update on public.app_settings
for each row
execute function public.set_updated_at_timestamp();

drop policy if exists "App settings are readable by anyone" on public.app_settings;
create policy "App settings are readable by anyone"
  on public.app_settings for select
  using (true);

drop policy if exists "Admins can manage app settings" on public.app_settings;
create policy "Admins can manage app settings"
  on public.app_settings for all
  using (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    or (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  )
  with check (
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    or (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

insert into public.app_settings (key, value)
values ('brand_name', 'Събития Колеви')
on conflict (key) do nothing;
