create table if not exists public.password_reset_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  requested_at timestamptz not null default timezone('utc', now())
);

create index if not exists password_reset_requests_email_requested_at_idx
  on public.password_reset_requests (email, requested_at desc);
