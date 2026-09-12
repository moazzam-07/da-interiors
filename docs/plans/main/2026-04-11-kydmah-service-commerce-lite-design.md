# 2026-04-11 Kydmah Service-Commerce Lite Design

## Objective
Build a premium digital platform for Kydmah that combines:

- a high-trust public landing website
- a customer booking and service-ordering system
- an internal admin panel for operations, offers, content, reporting, and review growth

The platform should feel professional and premium, but remain practical and lightweight. It is not intended to be a full ERP in phase 1.

## Selected Product Direction
Kydmah will follow the `service-commerce lite` model.

Customers will browse services online, submit service orders like an Urban Company-lite flow, and receive email updates throughout the order lifecycle. Admins will manually manage approvals and operational progress. Staff assignment is included as a required operational feature.

## Current Implementation Baseline
As of 2026-04-15, the project has moved beyond planning into an implemented phase-1 foundation.

Already completed:
- premium public landing page
- service detail pages
- modal-based booking intake flow
- server-side booking submission route
- Supabase database setup for bookings and email event logs
- Resend integration for initial booking receipt emails
- Vercel deployment preparation

Not yet implemented:
- admin panel
- staff assignment flows
- admin auth and role system
- manual approval dashboard
- lifecycle status emails after booking receipt
- reporting layer

## Product Vision
The system should help Kydmah:

- present itself as a premium and trustworthy maintenance brand
- convert website visitors into qualified service bookings
- manage service orders in an organized and trackable way
- assign staff to jobs with clarity
- improve follow-up, completion, and customer satisfaction
- increase Google reviews and repeat business

## Core Product Modules

### 1. Public Website
The public website is the brand and conversion engine. It should communicate trust, service depth, branch coverage, professionalism, and proof of quality.

Key goals:

- showcase Kydmah services clearly
- highlight trust signals like experience, coverage, and testimonials
- publish seasonal offers and promotions
- support blog and SEO content
- drive visitors into the booking flow
- display Google review and reputation signals

Suggested pages:

- Home
- Services
- Service detail pages
- About
- Branches / coverage areas
- Offers
- Blog / insights
- Contact
- Booking / request flow

### 2. Customer Booking System
This is the customer-facing service-commerce layer.

Customers should be able to:

- choose a service
- choose sub-service or add-ons where needed
- enter name, phone number, email, and address
- select branch, city, or location
- choose preferred date and time
- add notes about the issue
- upload optional photos if needed in later phases
- submit the order for review and confirmation

This flow should behave like an e-commerce checkout for services, not for physical products.

### 3. Admin Operations Panel
The admin panel is the operational control center.

Admins should be able to:

- review incoming orders
- approve or reject bookings
- assign staff to jobs
- update order status
- mark orders as scheduled, in progress, completed, or cancelled
- manage offers and promotional banners
- publish and remove website content
- manage blogs and announcements
- review reports, revenue, and service trends
- monitor review-generation performance

## Operational Scope
This system is intentionally below ERP complexity, but it should still cover the most useful business workflows.

Included:

- service ordering
- customer communication by email
- admin approval flow
- staff assignment
- order lifecycle tracking
- lightweight content management
- promotions and offers
- basic reporting and earnings visibility
- review request flow

Not included in phase 1:

- full inventory management
- payroll and HR
- complex accounting
- technician payroll or attendance systems
- advanced procurement
- deep branch-level ERP controls

## Service Order Lifecycle
The order lifecycle should be simple, visible, and trackable.

Recommended statuses:

1. `new`
2. `needs_review`
3. `confirmed`
4. `assigned`
5. `in_progress`
6. `completed`
7. `cancelled`

Each status change should be recorded so the admin has a timeline of what happened.

Current schema note:
- the live Supabase schema currently uses the status values above
- if `rejected` or `scheduled` are needed later, they can be added in the next migration together with the admin workflow

## Staff Assignment Model
Staff assignment is a required part of the first practical version.

Admins should be able to:

- assign one or more staff members to an order
- define the assigned role if needed, such as technician, helper, cleaner, or supervisor
- add assignment notes
- reassign staff if needed
- see which staff are currently handling which jobs

This does not need to become a full workforce management tool in phase 1, but it should provide operational clarity and support manual dispatching.

## Customer Communication and Email Automation
For now, email is the only required communication channel.

Recommended email events:

- booking received
- booking approved
- booking rejected
- job scheduled
- work started
- work completed
- review request
- promotional follow-up for repeat services in later phases

Each email should be:

- branded
- clear and concise
- tied to the order timeline
- useful to the customer

Current implementation note:
- `booking received` is implemented
- admin new-booking notification is wired
- all later lifecycle emails remain part of the backend/admin phase

## Admin Feature Ideas
The admin panel should do more than simply view orders. It should help Kydmah operate and sell better.

Recommended admin capabilities:

- Dashboard with orders, pending approvals, revenue snapshot, and review performance
- Order management with filters by date, service, branch, and status
- Staff assignment board
- Offer manager for banners, homepage offers, and service-specific discounts
- Blog and website content publishing
- FAQ and testimonial management
- Customer records with booking history
- Notes and internal comments on customers or orders
- Manual quotation mode for jobs needing inspection
- Coupon or offer-code support in a later iteration
- Reports by service, branch, time period, and completion rate
- Review campaign tracking
- Lead-source tracking such as Google, Instagram, direct, and referral
- Audit log for important admin actions

## Google Review Growth System
Google reviews are a strategic sales feature, not just a minor add-on.

The system should support review generation by:

- automatically sending a review request email after job completion
- including a direct Google review link
- optionally using a branded review CTA page before sending users to Google
- recording when review requests were sent
- tracking campaign performance inside admin
- surfacing Google review trust elements on the public website

This should remain ethical and compliant. The goal is to encourage real satisfied customers to leave genuine reviews.

## Reporting and Business Visibility
The admin should be able to understand how the business is performing without needing a heavy ERP.

Recommended reporting areas:

- total orders
- orders by service
- orders by branch
- completion rate
- cancellation rate
- average order value if pricing is introduced
- total earnings or tracked revenue
- offers performance
- review request performance
- repeat-customer trends in later phases

## Suggested Information Architecture

### Public Side

- Home
- Services listing
- Service detail pages
- Offers
- Blog
- About Kydmah
- Contact / branches
- Booking flow

### Admin Side

- Dashboard
- Orders
- Staff
- Customers
- Offers
- Blog / CMS
- Reviews
- Reports
- Settings

## Suggested Technical Architecture
This section is a practical starting recommendation and can be adjusted before implementation.

- Frontend: Next.js
- Backend / database: Supabase
- Authentication: admin-only secure auth for operations panel
- Email delivery: transactional email provider such as Resend
- CMS capability: built-in admin-managed content tables instead of a heavy external CMS for phase 1

This stack supports rapid development, strong admin tooling, and manageable cost.

Current real stack:
- Next.js 16
- Supabase
- Resend
- Vercel-ready deployment configuration

## Phase Plan

### Phase 1: Foundation and Discovery

- finalize service categories
- define order fields
- define admin roles
- define booking statuses
- finalize branch and coverage logic
- finalize review workflow

### Phase 2: Public Website and Booking Engine

- build premium landing pages
- build services and service detail pages
- build booking checkout flow
- store orders and customer details
- send initial lifecycle emails

Status:
- largely completed for booking intake foundation
- still needs real content cleanup and wider lifecycle email coverage

### Phase 3: Admin Panel and Operations

- build admin dashboard
- build order management
- build staff assignment
- build offers manager
- build blog / CMS
- build reporting views

Status:
- not started yet
- this should be the next major planning and implementation block

### Phase 4: Growth and Optimization

- improve review workflows
- add repeat-service reminders
- add richer analytics
- add smarter customer segmentation
- evaluate WhatsApp or SMS later if needed

## Success Criteria
The first version should be considered successful if it allows Kydmah to:

- present a premium image online
- receive structured service bookings
- manage those bookings from one admin panel
- assign staff clearly
- keep customers informed by email
- promote offers and publish content
- generate more Google reviews
- gain better visibility into business performance

## Architectural Recommendation
Build the platform as a modular web system with three connected experiences:

- premium marketing website
- customer service booking flow
- admin operations panel

Keep workflows simple, premium, and operationally useful. Focus on conversion, order visibility, staff assignment, and follow-up quality rather than trying to solve every business process in version one.
