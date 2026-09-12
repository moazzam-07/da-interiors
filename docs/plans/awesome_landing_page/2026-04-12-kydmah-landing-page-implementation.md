# 2026-04-12 Kydmah Landing Page Implementation Plan

## Current Status
As of 2026-04-15, the landing page is implemented and production-buildable.

Completed foundation:
- premium homepage and storytelling sections
- service detail pages
- global booking modal flow
- booking API route
- Supabase booking schema
- Resend email integration for booking-received events
- Vercel deployment scaffolding

Still pending:
- replace placeholder metrics, ratings, and copy with validated business data
- replace remaining placeholder imagery with curated Kydmah assets
- admin panel implementation
- staff assignment backend
- lifecycle emails beyond booking received
- full backend operations planning and execution

## Goal
Implement a premium, glassmorphic, storytelling-led landing page for Kydmah that preserves the brand's teal-blue identity while driving service-specific bookings, calls, and WhatsApp conversions.

## Delivery Scope
The landing-page implementation should include:

- homepage
- reusable section system
- service listing block
- service-specific navigation entry points
- premium header and footer
- promotional section
- trust and testimonial sections
- content teaser section
- responsive behavior

This document started as a landing-page implementation plan, but the actual build has now expanded into the phase-1 booking intake foundation as well.

Implemented backend-adjacent additions:
- modal-based booking intake flow
- server-side booking submission route
- Supabase persistence for bookings and email events
- Resend-powered confirmation emails
- deployment readiness for Vercel

## Build Priorities

### Priority 1: Brand and Visual Foundation
Establish the visual system before building sections.

Tasks:
- [x] define CSS variables for the Kydmah color palette
- [x] define glassmorphism surface tokens
- [x] define glow/blur background utilities
- [x] define spacing scale
- [x] define type scale
- [x] define button styles
- [x] define card styles
- [x] define shadow and border treatment
- [x] define motion timing tokens

Deliverable:
- reusable landing page design system inside the frontend codebase

### Priority 2: Hero and Navigation
Build the most important first-impression layer.

Tasks:
- [x] create premium sticky/floating glass header
- [x] implement mobile navigation behavior
- [x] build hero section with premium headline, supporting text, CTAs, and service entry points
- [x] integrate real visual asset or premium placeholder composition
- [x] add subtle blended gradient/glow background

Deliverable:
- fully responsive first fold

### Priority 3: Service Discovery Layer
Build the main conversion bridge from browsing to booking.

Tasks:
- [x] create featured services section
- [x] create service card component
- [x] support all key service categories
- [x] visually emphasize high-demand services
- [x] attach `Book Now`, `Call`, and `WhatsApp` actions
- [x] ensure cards can later link into service detail or booking flows

Deliverable:
- reusable service grid / service teaser system

### Priority 4: Trust and Storytelling Sections
Build the persuasion layer.

Tasks:
- [x] implement trust metrics strip
- [x] build `Why Kydmah` section
- [x] build `How It Works` section
- [x] build story/about section
- [x] build real-work showcase with photos
- [x] build review/testimonial presentation

Deliverable:
- trust-building middle of page with strong storytelling flow

### Priority 5: Growth and Campaign Sections
Build sections that help marketing and future admin-managed updates.

Tasks:
- [x] implement promotional offers section with reusable card/banner layouts
- [x] implement insights/content teaser section
- [x] implement FAQ section
- [x] implement final CTA band
- [x] implement premium footer

Deliverable:
- full long-form homepage structure

### Priority 6: Responsive and Motion Polish
Refine the premium feel.

Tasks:
- [x] optimize layout for desktop, tablet, and mobile
- [x] tune spacing and type rhythm
- [x] add smooth reveal animations
- [x] add premium hover states
- [x] refine section transitions
- [x] ensure glass and glow effects remain performant and readable

Deliverable:
- polished premium landing page behavior across breakpoints

## Suggested Component Breakdown

### Layout Components
- `LandingShell`
- `GlassHeader`
- `Footer`
- `SectionFrame`
- `SectionHeading`

### Hero Components
- `HeroSection`
- `HeroVisual`
- `HeroServiceChips`
- `HeroTrustBadges`

### Service Components
- `ServiceGrid`
- `ServiceCard`
- `FeaturedServiceCard`
- `ServiceTag`

### Trust Components
- `MetricsStrip`
- `WhyChooseGrid`
- `HowItWorksTimeline`
- `TrustQuote`

### Proof Components
- `WorkShowcase`
- `ReviewCarousel`
- `TestimonialCard`

### Marketing Components
- `OffersSection`
- `InsightCards`
- `FaqAccordion`
- `CtaBand`

## Content Model Requirements
Even if content is hardcoded initially, structure it as if it will later come from admin.

Required content buckets:
- hero copy
- trust metrics
- service categories
- featured services
- offer banners
- testimonials
- content teasers
- FAQs
- footer links and company details

This avoids later refactoring when admin-managed content is added.

## Visual System Implementation Details

### Color Tokens
Create variables for:
- primary teal
- primary blue
- dark text
- white
- soft mist backgrounds
- tinted glass overlays

### Surface Tokens
Create reusable styles for:
- frosted white glass
- dark premium pill surfaces
- outlined glass pills
- glow-backed panels

### Background System
Implement reusable layered backgrounds using:
- radial gradients
- soft blurred glow orbs
- subtle grid/noise only if restrained
- section-level contrast alternation

The blending must feel smooth and premium, not loud.

## Motion System
Recommended motion language:
- fade-up reveal
- slow glow drift
- soft hover lift
- button press compression
- subtle card depth response

Avoid:
- aggressive springiness
- gimmicky parallax overload
- flashy neon motion

## Conversion Architecture
The page should support multiple conversion points:

- hero CTA cluster
- service cards
- promotional offers
- final CTA band
- floating WhatsApp

Primary flow:
1. user recognizes service
2. user selects service
3. user enters booking path

Secondary flow:
- call now
- WhatsApp

## SEO and Future Readiness
Landing page implementation should prepare for:

- future service-specific SEO pages
- future insights/articles content
- future Arabic support
- future admin-managed offers and homepage blocks

Implementation guidance:
- semantic sections
- descriptive headings
- crawlable text content
- reusable route-friendly section architecture

## Image Strategy
Tasks:
- [ ] audit available client photos
- [ ] classify by service type
- [ ] identify strongest hero-safe images
- [ ] create image treatment rules for crops, overlays, and framing
- [ ] ensure visual consistency across sections

Fallback:
- if some sections lack real photos, use gradients and branded illustration-style shapes rather than low-quality stock imagery

## Technical Notes
Recommended frontend expectations:
- componentized build
- centralized tokens
- responsive-first CSS architecture
- reusable section wrappers
- future CMS compatibility

The landing page should be built so the later booking system and admin-managed content can slot in without redesigning the page structure.

Actual implementation status:
- Next.js 16 app-router frontend is compiling successfully
- homepage and service pages are live in code
- booking modal is wired into the site shell
- `/api/bookings` exists as a dynamic route
- Supabase tables `service_bookings` and `booking_email_events` exist in the configured project
- the database trigger hardening migration has been applied
- Vercel deployment files have been added

Current technical caveats:
- placeholder business claims still need validation
- customer-facing emails currently cover booking receipt only
- admin notification email depends on setting `ADMIN_NOTIFICATION_EMAIL`
- RLS is enabled on booking tables but no policies are defined yet because phase-1 writes go through the server-side service role

## Suggested Execution Order
1. Build design tokens and background utilities
2. Build header, footer, and global shell
3. Build hero section
4. Build service grid and featured service sections
5. Build trust/story/proof sections
6. Build offers, insights, FAQ, and final CTA
7. Add motion and responsive polish
8. Connect real content and final assets

## QA Checklist
- premium first impression on desktop
- glass header reads clearly across backgrounds
- CTAs are visible and persuasive
- all key services are represented
- sections flow naturally in a long-page narrative
- WhatsApp remains accessible but not distracting
- page still feels premium on mobile
- visual blending supports the brand rather than overpowering it
- real images feel curated and consistent

Current verification status:
- `npm run lint` passes
- `npm run build` passes
- booking schema was applied to Supabase via MCP
- table existence and smoke-test insert/update/rollback were verified

## Shipped Deliverables

### Public Experience
- long-form premium homepage
- sticky glass header and premium footer
- service discovery grid
- offers, reviews, FAQ, about, and CTA sections
- service detail pages for key services
- floating WhatsApp access

### Booking Intake
- global booking modal available from homepage and service pages
- service selection, schedule selection, customer details, and confirmation steps
- direct submit to backend API before showing success state
- booking reference returned to the UI

### Backend Foundation
- Supabase `service_bookings` table
- Supabase `booking_email_events` table
- server-side booking persistence route
- booking-received customer email
- admin notification email hook

### Deployment Readiness
- `.env.example` added
- `vercel.json` added
- `.vercelignore` added
- GitHub push completed for the Vercel-ready build

## Remaining Work Before Client-Ready Launch
- replace placeholder metrics, prices, and testimonial claims with approved real data
- curate real Kydmah imagery by section
- confirm production sender domain in Resend
- set Vercel environment variables
- define admin authentication and operations backend
- build backend planning document for orders, statuses, assignment, and reporting

## Success Criteria
The landing page is successful when it:

- immediately feels premium and trustworthy
- clearly reflects Kydmah's teal-blue brand
- showcases all services without clutter
- makes booking paths obvious
- feels more elevated than the brochure while still belonging to the same brand
- supports future booking and admin system integration cleanly
