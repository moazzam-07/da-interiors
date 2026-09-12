create extension if not exists pgcrypto;

create table if not exists public.service_bookings (
  id uuid primary key default gen_random_uuid(),
  booking_reference text not null unique,
  status text not null default 'new',
  selected_services text[] not null,
  preferred_date date not null,
  preferred_time text not null,
  customer_name text not null,
  customer_phone text not null,
  customer_email text not null,
  service_address text,
  customer_notes text,
  source text not null default 'website_booking_modal',
  email_status text not null default 'pending',
  email_failure_reason text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint service_bookings_status_check check (
    status in ('new', 'needs_review', 'confirmed', 'assigned', 'in_progress', 'completed', 'cancelled')
  ),
  constraint service_bookings_email_status_check check (
    email_status in ('pending', 'sent', 'partial', 'failed', 'skipped')
  ),
  constraint service_bookings_selected_services_check check (array_length(selected_services, 1) > 0),
  constraint service_bookings_customer_email_check check (position('@' in customer_email) > 1)
);

create table if not exists public.booking_email_events (
  id uuid primary key default gen_random_uuid(),
  booking_id uuid not null references public.service_bookings(id) on delete cascade,
  event_type text not null,
  recipient_email text not null,
  provider text not null default 'resend',
  provider_message_id text,
  status text not null default 'queued',
  error_message text,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint booking_email_events_status_check check (
    status in ('queued', 'sent', 'failed', 'skipped')
  )
);

create index if not exists service_bookings_status_created_at_idx
  on public.service_bookings (status, created_at desc);

create index if not exists service_bookings_email_status_created_at_idx
  on public.service_bookings (email_status, created_at desc);

create index if not exists service_bookings_customer_email_idx
  on public.service_bookings (customer_email);

create index if not exists booking_email_events_booking_id_created_at_idx
  on public.booking_email_events (booking_id, created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_service_bookings_updated_at on public.service_bookings;
create trigger set_service_bookings_updated_at
before update on public.service_bookings
for each row
execute function public.set_updated_at();

alter table public.service_bookings enable row level security;
alter table public.booking_email_events enable row level security;
