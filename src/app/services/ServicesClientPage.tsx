'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { GlassHeader } from '@/components/layout/GlassHeader';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { GlobalCta } from '@/components/sections/GlobalCta';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { useBooking } from '@/components/booking/BookingProvider';
import {
  House, Sparkles, Droplet, Hammer, Camera,
  Lightbulb, Compass, Award,
  Clock, ArrowRight, LucideIcon
} from 'lucide-react';

interface ServiceItem {
  slug: string;
  name: string;
  desc: string;
  duration: string;
  icon: LucideIcon;
  image: string;
}

interface CategoryGroup {
  title: string;
  desc: string;
  color: string;
  services: ServiceItem[];
}

const categories: CategoryGroup[] = [
  {
    title: 'Architectural & Structural Planning',
    desc: 'Comprehensive architectural layout redesign, gut renovations, and stone sanctuaries.',
    color: 'from-accent/20 to-primary/10',
    services: [
      {
        slug: 'residential-architecture',
        name: 'Full-Residence Architecture & Renovation',
        desc: 'Complete architectural layout planning, structural gut renovations, and spatial transformations for luxury residences.',
        duration: 'Full Project',
        icon: House,
        image: '/images/da/hero1.jpg',
      },
      {
        slug: 'kitchen-bath',
        name: 'Luxury Kitchen & Master Bath Sanctuaries',
        desc: 'Bookmatched Italian Calacatta marble, fluted custom cabinetry, concealed appliances, and spa-grade wet zones.',
        duration: 'Suite Scope',
        icon: Droplet,
        image: '/images/da/kitchen1.jpg',
      },
      {
        slug: 'custom-millwork',
        name: 'Custom Millwork & Architectural Joinery',
        desc: 'Bespoke walk-in dressing suites, floating stone hearths, fluted wall paneling, and concealed pivot doors.',
        duration: 'Bespoke Scope',
        icon: Hammer,
        image: '/images/da/millwork1.jpg',
      },
    ],
  },
  {
    title: 'Interior Styling & Curation',
    desc: 'Tactile natural textiles, fine art acquisitions, and experiential hospitality atmospheres.',
    color: 'from-primary/20 to-accent/10',
    services: [
      {
        slug: 'bespoke-styling',
        name: 'Bespoke Interior Styling & Curation',
        desc: 'Custom furniture commissions, tactile bouclé & cashmere textiles, fine art curation, and white-glove finishing.',
        duration: 'Turnkey Styling',
        icon: Sparkles,
        image: '/images/da/hero3.jpg',
      },
      {
        slug: 'lighting-acoustics',
        name: 'Architectural Lighting & Ambient Design',
        desc: 'Circadian lighting schemes, recessed cove details, sculptural artisan chandeliers, and architectural acoustics.',
        duration: 'Lighting Plan',
        icon: Lightbulb,
        image: '/images/da/project3.jpg',
      },
      {
        slug: 'hospitality-commercial',
        name: 'Boutique Hospitality & Commercial Spaces',
        desc: 'Atmospheric interior architecture and branding for luxury boutique hotels, fine dining destinations, and founder suites.',
        duration: 'Commercial Scope',
        icon: Award,
        image: '/images/da/hospitality1.jpg',
      },
    ],
  },
  {
    title: 'Visualization & Project Governance',
    desc: 'Digital twin pre-visualization, laser site scanning, and complete turnkey white-glove delivery.',
    color: 'from-accent/20 to-primary/10',
    services: [
      {
        slug: '3d-visualization',
        name: '3D Photorealistic Pre-Visualization & VR',
        desc: 'Hyper-accurate 8K digital twins, daylight simulation studies, and interactive VR walkthroughs before breaking ground.',
        duration: 'Digital Twin',
        icon: Camera,
        image: '/images/da/project1.jpg',
      },
      {
        slug: 'turnkey-stewardship',
        name: 'Turnkey Project Stewardship & Handover',
        desc: 'From structural blueprint and marble procurement to contractor oversight, white-glove installation, and champagne reveal.',
        duration: 'Turnkey Handover',
        icon: Compass,
        image: '/images/da/project7.jpg',
      },
    ],
  },
];

export function ServicesClientPage() {
  const { openBooking } = useBooking();

  return (
    <main className="flex min-h-screen flex-col selection:bg-accent/20 selection:text-accent overflow-hidden bg-background">
      {/* Navigation */}
      <GlassHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-surface-container-lowest via-background to-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[50%] h-[40%] rounded-full bg-accent/5 blur-[140px]" />
          <div className="absolute top-[30%] right-[10%] w-[40%] h-[30%] rounded-full bg-primary/5 blur-[150px]" />
        </div>

        <SectionFrame className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-3xl mx-auto px-4"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low border border-border text-xs sm:text-sm font-semibold text-accent mb-6 tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Studio Disciplines & Services</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
              Bespoke Interior &{' '}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Architectural Services
              </span>
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto font-normal">
              Explore our full suite of interior architecture and turnkey curation services designed to transform residential and commercial properties into sanctuaries of calm.
            </p>
          </motion.div>
        </SectionFrame>
      </section>

      {/* Categories Grid */}
      <section className="relative py-12 md:py-20 bg-background">
        <SectionFrame>
          <div className="space-y-20 max-w-6xl mx-auto px-4">
            {categories.map((cat, catIdx) => (
              <div key={cat.title} className="space-y-8">
                {/* Category Header */}
                <div className="border-b border-border/60 pb-6">
                  <h3 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 max-w-2xl">
                    {cat.desc}
                  </p>
                </div>

                {/* Services Grid inside Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {cat.services.map((svc, i) => {
                    const SvcIcon = svc.icon;
                    return (
                      <motion.div
                        key={svc.slug}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08 }}
                        className="group relative flex flex-col justify-between rounded-3xl border border-border/70 bg-card p-6 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
                      >
                        <div>
                          {/* Image */}
                          <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-5 border border-border/20 shadow-inner">
                            <Image
                              src={svc.image}
                              alt={svc.name}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-card/40 via-transparent to-transparent" />
                          </div>

                          {/* Card Header */}
                          <div className="flex items-center justify-between gap-4 mb-4">
                            <div className="w-10 h-10 rounded-2xl bg-surface-container-low border border-border flex items-center justify-center shrink-0 text-accent group-hover:scale-110 group-hover:bg-accent/15 transition-all duration-300">
                              <SvcIcon className="w-5 h-5" />
                            </div>
                            <span className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground uppercase tracking-wider bg-surface-container-low border border-border/50 px-3 py-1 rounded-full">
                              <Clock className="w-3.5 h-3.5 text-accent" />
                              {svc.duration}
                            </span>
                          </div>

                          {/* Titles */}
                          <h4 className="text-xl font-bold font-heading text-foreground mb-3 group-hover:text-accent transition-colors">
                            {svc.name}
                          </h4>

                          {/* Descriptions */}
                          <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-normal">
                            {svc.desc}
                          </p>
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border/40">
                          <button
                            onClick={() => openBooking(svc.slug)}
                            className="w-full flex h-11 cursor-pointer select-none items-center justify-center gap-2 rounded-xl bg-primary text-xs font-bold text-primary-foreground shadow-md hover:bg-primary/90 transition-all duration-300"
                          >
                            Schedule Consultation
                            <ArrowRight className="w-3.5 h-3.5 text-accent" />
                          </button>
                          <Link
                            href={`/services/${svc.slug}`}
                            className="text-xs text-center font-medium text-muted-foreground hover:text-accent py-1 transition-colors"
                          >
                            View Technical Specifications & Packages →
                          </Link>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </SectionFrame>
      </section>

      {/* Climax CTA */}
      <GlobalCta />

      {/* Footer */}
      <Footer />

      {/* WhatsApp FAB */}
      <FloatingWhatsApp />
    </main>
  );
}
