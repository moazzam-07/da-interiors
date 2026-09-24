'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GlassHeader } from '@/components/layout/GlassHeader';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { SectionFrame } from '@/components/layout/SectionFrame';
import {
  ShieldCheck,
  Lock,
  EyeOff,
  FileText,
  Phone,
  MapPin,
  Clock,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Building2,
  Share2,
  Printer
} from 'lucide-react';

const SECTIONS = [
  { id: 'introduction', title: '1. Studio Information & Scope' },
  { id: 'data-collection', title: '2. Information We Collect' },
  { id: 'data-usage', title: '3. How We Use Your Information' },
  { id: 'confidentiality', title: '4. Floorplan & Property Discretion (NDA)' },
  { id: 'photography', title: '5. Photography & Case Study Publishing' },
  { id: 'sharing', title: '6. Third-Party Disclosures' },
  { id: 'security', title: '7. Data Security & Storage Safeguards' },
  { id: 'legal-rights', title: '8. Rights Under DPDP Act 2023 (India)' },
  { id: 'cookies', title: '9. Cookies & Digital Tracking' },
  { id: 'grievance', title: '10. Grievance Officer & Studio Contact' },
];

export function PrivacyPolicyClient() {
  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <main className="flex min-h-screen flex-col selection:bg-accent/20 selection:text-accent overflow-hidden bg-background">
      <GlassHeader />

      {/* Header Banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 overflow-hidden bg-gradient-to-b from-surface-container-low/40 via-background to-background border-b border-border/50">
        <SectionFrame>
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-6">
              <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5 text-border shrink-0" />
              <span className="text-muted-foreground">Legal &amp; Compliance</span>
              <ChevronRight className="w-3.5 h-3.5 text-border shrink-0" />
              <span className="text-accent font-semibold">Privacy Policy</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-xs font-bold text-accent uppercase tracking-wider mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Client Discretion &amp; Trust</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-foreground tracking-tight leading-[1.12] mb-6">
              Privacy Policy &amp; Client Data Protection
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal mb-8 max-w-3xl">
              At <strong>D A interior Design DSID</strong> (&quot;DA Interiors&quot;), we consider your privacy, proprietary blueprints, and personal residence security as sacred. This policy outlines our strict commitments under the Digital Personal Data Protection Act, 2023 (India) and international privacy best practices.
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-border/60 text-xs text-muted-foreground">
              <div className="flex items-center gap-4">
                <span><strong>Effective Date:</strong> January 1, 2024</span>
                <span>•</span>
                <span><strong>Last Reviewed:</strong> September 2026</span>
              </div>

              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-low hover:bg-surface-container border border-border text-foreground transition-colors"
                title="Print Policy"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Document</span>
              </button>
            </div>
          </div>
        </SectionFrame>
      </section>

      {/* Trust Highlights Cards */}
      <section className="py-10 bg-surface-container-lowest border-b border-border/40">
        <SectionFrame>
          <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">
                <Lock className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground font-heading">Zero Data Monetization</h4>
                <p className="text-xs text-muted-foreground mt-1">We never sell, rent, or lease your phone number, email, or floorplans to any marketing third parties.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">
                <EyeOff className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground font-heading">Complete Site Discretion</h4>
                <p className="text-xs text-muted-foreground mt-1">Custom Non-Disclosure Agreements (NDAs) are available upon request for all private villas and penthouses.</p>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-card border border-border/70 shadow-sm flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-xl bg-accent/10 flex items-center justify-center text-accent shrink-0 mt-0.5">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-foreground font-heading">Local Kolkata Studio</h4>
                <p className="text-xs text-muted-foreground mt-1">Principal-led studio accountability at 93/2, Topsia Rd, Kolkata with direct WhatsApp grievance resolution.</p>
              </div>
            </div>
          </div>
        </SectionFrame>
      </section>

      {/* Main Content Body */}
      <section className="py-16 md:py-24 bg-background">
        <SectionFrame>
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Quick Sticky Table of Contents */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-4">
              <div className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-3 font-mono">
                  Table of Contents
                </h3>
                <nav className="space-y-1.5 text-xs">
                  {SECTIONS.map((sec) => (
                    <a
                      key={sec.id}
                      href={`#${sec.id}`}
                      className="block py-1.5 px-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-container-low transition-colors truncate"
                    >
                      {sec.title}
                    </a>
                  ))}
                </nav>
              </div>

              {/* Direct Help Card */}
              <div className="p-5 rounded-2xl bg-accent/5 border border-accent/20 text-xs">
                <span className="font-bold text-foreground block mb-1">Questions regarding your data?</span>
                <p className="text-muted-foreground mb-3 leading-relaxed">
                  You can directly contact our studio director or request complete record deletion.
                </p>
                <a
                  href="tel:07903624701"
                  className="font-bold text-accent hover:underline flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>+91 79036 24701</span>
                </a>
              </div>
            </aside>

            {/* Editorial Articles */}
            <div className="lg:col-span-8 space-y-12 text-sm sm:text-base text-foreground/90 leading-relaxed">
              {/* Section 1 */}
              <article id="introduction" className="space-y-4 scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground flex items-center gap-2">
                  <span className="text-accent font-mono text-base font-bold">01.</span>
                  <span>Studio Information &amp; Scope</span>
                </h2>
                <p>
                  This Privacy Policy applies to all services, digital interfaces, consultation bookings, and on-site turnkey architectural executions operated by <strong>D A interior Design DSID</strong> (referred to herein as &quot;DA Interiors&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;the Studio&quot;), operating from our physical headquarters at:
                </p>
                <div className="p-4 rounded-xl bg-surface-container-low border border-border/70 text-xs sm:text-sm font-medium">
                  <strong>Studio Office:</strong> 93/2, Topsia Rd, near Kohinoor Market, near Sultan Sweet, Topsia, Kolkata, West Bengal 700039, India.
                </div>
                <p>
                  This policy governs personal data collected via our website (<a href="https://dainteriors.in" className="text-accent underline font-medium">dainteriors.in</a>), phone consultations, WhatsApp business communications, on-site surveys, and architectural service contracts.
                </p>
              </article>

              {/* Section 2 */}
              <article id="data-collection" className="space-y-4 scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground flex items-center gap-2">
                  <span className="text-accent font-mono text-base font-bold">02.</span>
                  <span>Information We Collect</span>
                </h2>
                <p>
                  Because we provide high-touch, customized architectural and interior design services, we only collect information essential for project evaluation, engineering calculations, and contractual fulfillment:
                </p>
                <ul className="space-y-2.5 list-disc pl-5 text-muted-foreground text-xs sm:text-sm">
                  <li><strong className="text-foreground">Contact Credentials:</strong> Full name, email address, WhatsApp/mobile telephone number.</li>
                  <li><strong className="text-foreground">Property Particulars:</strong> Site address, apartment/villa complex name (e.g. Urbana, South City, Silver Spring), approximate square footage, layout typology (e.g., 3 BHK, 4 BHK, Duplex, Commercial).</li>
                  <li><strong className="text-foreground">Architectural Assets:</strong> Developer CAD drawings, floor plans, raw site photographs, design aspiration boards, and structural constraints provided by you.</li>
                  <li><strong className="text-foreground">Consultation Notes:</strong> Notes recorded during in-person studio meetings or on-site inspections regarding material preferences, budget parameters, and handover timelines.</li>
                  <li><strong className="text-foreground">Technical Usage Data:</strong> Anonymized browser information, device typology, and approximate geographic locality (via server logs and analytics) to maintain site security and optimize mobile responsiveness.</li>
                </ul>
              </article>

              {/* Section 3 */}
              <article id="data-usage" className="space-y-4 scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground flex items-center gap-2">
                  <span className="text-accent font-mono text-base font-bold">03.</span>
                  <span>How We Use Your Information</span>
                </h2>
                <p>We process client information strictly for legitimate architectural purposes:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-card border border-border/80">
                    <p className="font-bold text-xs text-foreground mb-1">Turnkey Design &amp; Cost Estimation</p>
                    <p className="text-xs text-muted-foreground">Calculating material quantities, joinery dimensions, MEP layouts, and project schedules.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-card border border-border/80">
                    <p className="font-bold text-xs text-foreground mb-1">Principal-Led Communication</p>
                    <p className="text-xs text-muted-foreground">Direct coordination regarding 3D renders, stone selection dry-lays, and milestone handovers.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-card border border-border/80">
                    <p className="font-bold text-xs text-foreground mb-1">Society &amp; Municipal Compliance</p>
                    <p className="text-xs text-muted-foreground">Securing entry passes, noise permit timings, and debris disposal permissions with complex RWAs.</p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-card border border-border/80">
                    <p className="font-bold text-xs text-foreground mb-1">Billing &amp; Warranty Records</p>
                    <p className="text-xs text-muted-foreground">Maintaining tax invoices, GST filings, and lifetime artisan joinery warranties.</p>
                  </div>
                </div>
              </article>

              {/* Section 4 */}
              <article id="confidentiality" className="space-y-4 scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground flex items-center gap-2">
                  <span className="text-accent font-mono text-base font-bold">04.</span>
                  <span>Floorplan &amp; Property Discretion (NDA)</span>
                </h2>
                <p>
                  We understand that your home is your private haven. For high-profile individuals, corporate leaders, and families residing in elite Kolkata neighborhoods (including Alipore, Ballygunge, Queens Park, and Anandapur), we provide:
                </p>
                <div className="p-5 rounded-2xl bg-card border-l-4 border-accent border-y border-r border-border/70 space-y-2">
                  <p className="text-xs sm:text-sm font-semibold text-foreground">
                    Formal Non-Disclosure Agreements (NDAs)
                  </p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Prior to receiving detailed architectural blueprints or entering the premises, our studio leadership can execute a bilateral NDA guaranteeing that layout schemes, safe room locations, security infrastructure, and interior artwork remain entirely confidential.
                  </p>
                </div>
              </article>

              {/* Section 5 */}
              <article id="photography" className="space-y-4 scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground flex items-center gap-2">
                  <span className="text-accent font-mono text-base font-bold">05.</span>
                  <span>Photography &amp; Case Study Publishing</span>
                </h2>
                <p>
                  To document our craftsmanship, DA Interiors occasionally photographs completed spaces for our portfolio and architectural case studies. Our strict guidelines:
                </p>
                <ul className="space-y-2 list-disc pl-5 text-muted-foreground text-xs sm:text-sm">
                  <li><strong className="text-foreground">Explicit Consent:</strong> Photography is only taken with homeowner permission upon project completion.</li>
                  <li><strong className="text-foreground">Anonymity by Default:</strong> Specific apartment numbers, family portraits, personal documents, and street numbers are never included in published photos.</li>
                  <li><strong className="text-foreground">Right to Opt-Out:</strong> If you prefer that your residence remains completely unpublished, your decision is respected with zero exceptions.</li>
                </ul>
              </article>

              {/* Section 6 */}
              <article id="sharing" className="space-y-4 scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground flex items-center gap-2">
                  <span className="text-accent font-mono text-base font-bold">06.</span>
                  <span>Third-Party Disclosures</span>
                </h2>
                <p>
                  We do not sell, rent, or trade your personal information. We only share project details on a strict need-to-know basis with trusted partners:
                </p>
                <ul className="space-y-2 list-disc pl-5 text-muted-foreground text-xs sm:text-sm">
                  <li><strong className="text-foreground">Certified Subcontractors &amp; Artisans:</strong> Italian marble dry-lay supervisors, custom joinery carpenters, and HVAC engineers (provided only site dimensions and specifications).</li>
                  <li><strong className="text-foreground">Essential Infrastructure Providers:</strong> Secure hosting (Vercel), database infrastructure (Supabase), and official communication channels (WhatsApp Business API).</li>
                  <li><strong className="text-foreground">Statutory Authorities:</strong> Only when strictly required by applicable Indian laws, judicial orders, or municipal guidelines.</li>
                </ul>
              </article>

              {/* Section 7 */}
              <article id="security" className="space-y-4 scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground flex items-center gap-2">
                  <span className="text-accent font-mono text-base font-bold">07.</span>
                  <span>Data Security &amp; Storage Safeguards</span>
                </h2>
                <p>
                  We implement multi-layered physical and digital security standards:
                </p>
                <ul className="space-y-2 list-disc pl-5 text-muted-foreground text-xs sm:text-sm">
                  <li>SSL/TLS 256-bit encryption for all data transmitted across our web application.</li>
                  <li>Restricted internal access: only designated project architects have access to client contact information and drawings.</li>
                  <li>Periodic purging of obsolete CAD drafts and customer inquiries older than 36 months unless required for ongoing warranty support.</li>
                </ul>
              </article>

              {/* Section 8 */}
              <article id="legal-rights" className="space-y-4 scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground flex items-center gap-2">
                  <span className="text-accent font-mono text-base font-bold">08.</span>
                  <span>Rights Under DPDP Act 2023 (India)</span>
                </h2>
                <p>
                  In compliance with the <em>Digital Personal Data Protection Act, 2023</em> of India, you enjoy comprehensive rights as a Data Principal:
                </p>
                <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                  <p>• <strong>Right to Access:</strong> You may request a summary of the personal data we hold about you.</p>
                  <p>• <strong>Right to Correction &amp; Erasure:</strong> You can request corrections to inaccuracies or the deletion of your personal records once your project warranty cycle concludes.</p>
                  <p>• <strong>Right of Grievance Redressal:</strong> Direct escalation to our studio director for prompt resolution of privacy concerns.</p>
                </div>
              </article>

              {/* Section 9 */}
              <article id="cookies" className="space-y-4 scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground flex items-center gap-2">
                  <span className="text-accent font-mono text-base font-bold">09.</span>
                  <span>Cookies &amp; Digital Tracking</span>
                </h2>
                <p>
                  Our website uses only essential session cookies and privacy-respecting performance cookies to preserve your theme preference (dark/light mode) and verify appointment form submissions. We do not use intrusive third-party cross-site advertising trackers. You can disable cookies at any time via your browser settings.
                </p>
              </article>

              {/* Section 10 */}
              <article id="grievance" className="space-y-4 scroll-mt-32">
                <h2 className="text-xl sm:text-2xl font-bold font-heading text-foreground flex items-center gap-2">
                  <span className="text-accent font-mono text-base font-bold">10.</span>
                  <span>Grievance Officer &amp; Studio Contact</span>
                </h2>
                <p>
                  For any privacy inquiries, consent revocations, or data deletion requests, please contact our designated studio coordinator:
                </p>

                <div className="p-6 rounded-2xl bg-card border border-border/80 shadow-md space-y-3 mt-4">
                  <p className="font-heading font-bold text-base text-foreground">
                    D A interior Design DSID — Studio Compliance
                  </p>
                  <div className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent shrink-0" />
                      <span>93/2, Topsia Rd, near Kohinoor Market, Topsia, Kolkata, WB 700039</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-accent shrink-0" />
                      <span>Direct Phone / WhatsApp: +91 79036 24701</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-accent shrink-0" />
                      <span>Studio Hours: Monday – Sunday, 9:00 AM – 10:00 PM IST</span>
                    </p>
                  </div>
                  <div className="pt-3 border-t border-border/60">
                    <a
                      href="https://wa.me/917903624701?text=Hello%20DA%20Interiors,%20I%20have%20an%20inquiry%20regarding%20client%20privacy%20and%20data%20protection."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#25D366]/10 text-[#25D366] hover:bg-[#25D366] hover:text-white border border-[#25D366]/30 text-xs font-bold transition-all"
                    >
                      <span>Connect with Studio Coordinator on WhatsApp</span>
                    </a>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </SectionFrame>
      </section>

      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
