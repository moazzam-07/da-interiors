-- ============================================================
-- Phase 3: Admin Panel Tables
-- ============================================================
-- All Supabase tables created for the Kydmah admin operations
-- panel: admin profiles, staff, assignments, offers, blog,
-- review requests, and audit log.
-- ============================================================

-- ── Helper ───────────────────────────────────────────────────
create extension if not exists pgcrypto;

-- ============================================================
-- TABLE: admin_profiles
-- Links Supabase Auth users to admin display names and roles.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text NOT NULL,
  role text NOT NULL DEFAULT 'admin'
    CHECK (role IN ('super_admin', 'admin', 'operator')),
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can read own profile"
  ON admin_profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Admins can update own profile"
  ON admin_profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS set_admin_profiles_updated_at ON public.admin_profiles;
CREATE TRIGGER set_admin_profiles_updated_at
BEFORE UPDATE ON public.admin_profiles
FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============================================================
-- TABLE: staff
-- Field technicians, helpers, cleaners, supervisors.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.staff (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text,
  email text,
  role text NOT NULL DEFAULT 'technician'
    CHECK (role IN ('technician', 'helper', 'cleaner', 'supervisor', 'electrician', 'plumber')),
  avatar_url text,
  status text NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'inactive', 'on_leave')),
  skills text[] DEFAULT '{}',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE staff ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read staff"
  ON staff FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can manage staff"
  ON staff FOR ALL TO authenticated USING (true);

CREATE OR REPLACE FUNCTION public.set_staff_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS set_staff_updated_at ON public.staff;
CREATE TRIGGER set_staff_updated_at
BEFORE UPDATE ON public.staff
FOR EACH ROW EXECUTE FUNCTION public.set_staff_updated_at();

-- ============================================================
-- TABLE: booking_assignments
-- Links staff members to bookings with assigned role.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.booking_assignments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES public.service_bookings(id) ON DELETE CASCADE,
  staff_id uuid NOT NULL REFERENCES public.staff(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'technician',
  notes text,
  assigned_by uuid REFERENCES auth.users(id),
  assigned_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(booking_id, staff_id)
);

ALTER TABLE booking_assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage assignments"
  ON booking_assignments FOR ALL TO authenticated USING (true);

-- ============================================================
-- TABLE: booking_status_history
-- Audit trail of every status change on a booking.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.booking_status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES public.service_bookings(id) ON DELETE CASCADE,
  from_status text,
  to_status text NOT NULL,
  changed_by uuid REFERENCES auth.users(id),
  notes text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE booking_status_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage history"
  ON booking_status_history FOR ALL TO authenticated USING (true);

-- ============================================================
-- TABLE: offers
-- Promotional offers with discount logic.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.offers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  discount_type text CHECK (discount_type IN ('percentage', 'fixed', 'custom')),
  discount_value numeric,
  valid_from date,
  valid_until date,
  applicable_services text[] DEFAULT '{}',
  banner_image_url text,
  is_active boolean NOT NULL DEFAULT true,
  is_featured boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE offers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read active offers"
  ON offers FOR SELECT USING (is_active = true);

CREATE POLICY "Authenticated users can manage offers"
  ON offers FOR ALL TO authenticated USING (true);

CREATE OR REPLACE FUNCTION public.set_offers_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS set_offers_updated_at ON public.offers;
CREATE TRIGGER set_offers_updated_at
BEFORE UPDATE ON public.offers
FOR EACH ROW EXECUTE FUNCTION public.set_offers_updated_at();

-- ============================================================
-- TABLE: blog_posts
-- CMS content with slug, tags, and publish status.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL,
  cover_image_url text,
  author_id uuid REFERENCES auth.users(id),
  status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published', 'archived')),
  published_at timestamptz,
  tags text[] DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users can manage posts"
  ON blog_posts FOR ALL TO authenticated USING (true);

CREATE OR REPLACE FUNCTION public.set_blog_posts_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  new.updated_at = now();
  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS set_blog_posts_updated_at ON public.blog_posts;
CREATE TRIGGER set_blog_posts_updated_at
BEFORE UPDATE ON public.blog_posts
FOR EACH ROW EXECUTE FUNCTION public.set_blog_posts_updated_at();

-- ============================================================
-- TABLE: review_requests
-- Tracks Google review campaign email requests.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.review_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id uuid NOT NULL REFERENCES public.service_bookings(id) ON DELETE CASCADE,
  customer_email text NOT NULL,
  customer_name text NOT NULL,
  sent_at timestamptz,
  clicked_at timestamptz,
  review_url text,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'sent', 'clicked', 'reviewed', 'failed')),
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE review_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can manage review requests"
  ON review_requests FOR ALL TO authenticated USING (true);

-- ============================================================
-- TABLE: admin_audit_log
-- Logs all admin actions for accountability.
-- ============================================================
CREATE TABLE IF NOT EXISTS public.admin_audit_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid REFERENCES auth.users(id),
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read audit log"
  ON admin_audit_log FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can insert audit log"
  ON admin_audit_log FOR INSERT TO authenticated WITH CHECK (true);

-- ============================================================
-- SERVICE_BOOKINGS EXTENSIONS
-- Additional columns for admin operations (Phase 3).
-- Applied to the existing service_bookings table created
-- in the Phase 1 booking migration.
-- ============================================================
ALTER TABLE public.service_bookings
  ADD COLUMN IF NOT EXISTS admin_notes text,
  ADD COLUMN IF NOT EXISTS quoted_amount numeric,
  ADD COLUMN IF NOT EXISTS final_amount numeric,
  ADD COLUMN IF NOT EXISTS assigned_at timestamptz,
  ADD COLUMN IF NOT EXISTS completed_at timestamptz,
  ADD COLUMN IF NOT EXISTS cancelled_at timestamptz,
  ADD COLUMN IF NOT EXISTS cancelled_reason text,
  ADD COLUMN IF NOT EXISTS lead_source text DEFAULT 'website';
