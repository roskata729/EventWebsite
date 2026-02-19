create extension if not exists pgcrypto;

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text,
  category text,
  event_date date,
  location text,
  cover_image_url text not null,
  is_published boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  company text,
  event_type text,
  quote text not null,
  rating smallint check (rating between 1 and 5),
  is_featured boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  company text,
  subject text,
  message text not null,
  event_date date,
  status text not null default 'new',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.quote_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  event_type text not null,
  event_date date,
  event_location text,
  guest_count integer,
  budget numeric(12,2),
  service_id uuid references public.services(id) on delete set null,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text not null,
  is_published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

alter table public.services enable row level security;
alter table public.events enable row level security;
alter table public.testimonials enable row level security;
alter table public.contact_requests enable row level security;
alter table public.quote_requests enable row level security;
alter table public.blog_posts enable row level security;

drop policy if exists "Published events are readable by anyone" on public.events;
create policy "Published events are readable by anyone"
  on public.events for select
  using (is_published = true);

drop policy if exists "Active services are readable by anyone" on public.services;
create policy "Active services are readable by anyone"
  on public.services for select
  using (is_active = true);

drop policy if exists "Published blog posts are readable by anyone" on public.blog_posts;
create policy "Published blog posts are readable by anyone"
  on public.blog_posts for select
  using (is_published = true);

drop policy if exists "Testimonials are readable by anyone" on public.testimonials;
create policy "Testimonials are readable by anyone"
  on public.testimonials for select
  using (true);

create or replace function public.set_updated_at_timestamp()
returns trigger as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_blog_posts_updated_at on public.blog_posts;

create trigger set_blog_posts_updated_at
before update on public.blog_posts
for each row
execute function public.set_updated_at_timestamp();
