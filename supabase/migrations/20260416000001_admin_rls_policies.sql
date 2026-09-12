-- ============================================================
-- RLS Policies for Admin Panel Access
-- Phase 4: Admin Panel Security Hardening
-- ============================================================
-- Grants authenticated Supabase users read/write access to
-- service_bookings and booking_email_events tables.
-- Applied AFTER phase 3 admin tables migration.
-- ============================================================

-- ── service_bookings ─────────────────────────────────────────
-- Allow authenticated users to SELECT (list orders, dashboard)
CREATE POLICY "Authenticated users can read service_bookings"
  ON public.service_bookings
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to INSERT (booking creation is handled
-- via anon key + service role for the public API, but admin
-- operations need this too)
CREATE POLICY "Authenticated users can insert service_bookings"
  ON public.service_bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to UPDATE (status changes, admin notes)
CREATE POLICY "Authenticated users can update service_bookings"
  ON public.service_bookings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- ── booking_email_events ─────────────────────────────────────
-- Allow authenticated users to SELECT (view email log in admin)
CREATE POLICY "Authenticated users can read booking_email_events"
  ON public.booking_email_events
  FOR SELECT
  TO authenticated
  USING (true);

-- Allow authenticated users to INSERT (record email events)
CREATE POLICY "Authenticated users can insert booking_email_events"
  ON public.booking_email_events
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
