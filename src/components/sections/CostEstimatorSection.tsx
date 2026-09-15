'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { useBooking } from '@/components/booking/BookingProvider';
import {
  Sparkles,
  Calculator,
  ArrowRight,
  ShieldCheck,
  Building2,
  Layers,
  Ruler,
  CheckCircle2,
} from 'lucide-react';

export function CostEstimatorSection() {
  const { openEstimator } = useBooking();

  return (
    <section id="cost-estimator" className="relative py-16 md:py-24 bg-surface-container-lowest overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <SectionFrame className="relative z-10" hasPadding={false}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="relative rounded-[2rem] sm:rounded-[2.5rem] border border-accent/30 bg-gradient-to-br from-surface-container-low via-background to-surface-container-low p-6 sm:p-10 md:p-14 shadow-2xl shadow-accent/5 overflow-hidden">
            {/* Top decorative gradient bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent via-primary to-accent" />

            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Column: Copy & Value Proposition */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-xs font-bold uppercase tracking-widest text-accent">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>Free Turnkey Cost Estimator</span>
                </div>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-heading text-foreground tracking-tight leading-[1.2]">
                  Know Your Interior Budget in 60 Seconds
                </h2>

                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-normal">
                  Planning a flat, bungalow, or office space in Kolkata? Calculate your estimated cost from <strong>200 sq.ft upwards</strong> with clear pricing and zero obligation.
                </p>

                {/* 4 Feature Highlights */}
                <div className="grid grid-cols-2 gap-3.5 pt-2 text-xs">
                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container/60 border border-border/60">
                    <Building2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-foreground block">Any Space Type</span>
                      <span className="text-[11px] text-muted-foreground">Flats, Bungalows, Offices &amp; Shops</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container/60 border border-border/60">
                    <Ruler className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-foreground block">Custom Size</span>
                      <span className="text-[11px] text-muted-foreground">Starting from 200 sq.ft</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container/60 border border-border/60">
                    <Layers className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-foreground block">Quality Options</span>
                      <span className="text-[11px] text-muted-foreground">Standard, Premium &amp; Luxury Packages</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 p-3 rounded-xl bg-surface-container/60 border border-border/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-foreground block">Direct on WhatsApp</span>
                      <span className="text-[11px] text-muted-foreground">Instant budget sent to your phone</span>
                    </div>
                  </div>
                </div>

                {/* CTAs */}
                <div className="pt-3 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <button
                    type="button"
                    onClick={openEstimator}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-all cursor-pointer shadow-xl hover:scale-[1.02]"
                  >
                    <Calculator className="w-4 h-4 text-accent" />
                    <span>Launch Free Cost Estimator</span>
                    <ArrowRight className="w-4 h-4 text-accent" />
                  </button>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium py-1">
                    <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
                    <span>100% Free &bull; No Obligation</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Visual Preview Card */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-sm rounded-2xl bg-surface-container border border-border/80 p-5 shadow-xl space-y-4 text-left">
                  <div className="flex items-center justify-between pb-3 border-b border-border/60">
                    <span className="text-xs font-bold text-foreground uppercase tracking-wider">
                      Interactive Calculator
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-accent/15 text-[10px] font-bold text-accent">
                      Instant Delivery
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-background border border-border/60 space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Typology Calibrated</span>
                      <p className="font-bold text-foreground">Commercial, Villa &amp; Residential</p>
                    </div>

                    <div className="p-3 rounded-xl bg-background border border-border/60 space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Carpet Area Selection</span>
                      <p className="font-bold text-foreground">Minimum 200 sq.ft to 15,000+ sq.ft</p>
                    </div>

                    <div className="p-3 rounded-xl bg-background border border-border/60 space-y-1">
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">Dynamic Scope Engine</span>
                      <p className="font-bold text-foreground">Tailored rooms &amp; commercial zones</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={openEstimator}
                    className="w-full py-3 rounded-xl bg-surface-container-high hover:bg-accent/20 border border-accent/40 text-accent font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>Calculate Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionFrame>
    </section>
  );
}
