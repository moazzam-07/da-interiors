'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { GlassHeader } from '@/components/layout/GlassHeader';
import { Footer } from '@/components/layout/Footer';
import { FloatingWhatsApp } from '@/components/ui/FloatingWhatsApp';
import { GlobalCta } from '@/components/sections/GlobalCta';
import { SectionFrame } from '@/components/layout/SectionFrame';
import { Layers, ShieldCheck, Sparkles, Compass, Award, CheckCircle2 } from 'lucide-react';

const coreValues = [
  {
    icon: Layers,
    title: 'Noble Materiality',
    titleAr: 'أصالة المواد الطبيعية',
    desc: 'Sourcing authentic Italian travertine, French smoked oak, Belgian linen, and raw bronze that age gracefully over generations.',
    descAr: 'نختار أجود أنواع الترافرتين الإيطالي، وخشب البلوط الفرنسي، والكتان البلجيكي، لتدوم أصالتها عبر الأجيال.',
    color: 'from-accent/20 to-primary/10',
    glow: 'hover:shadow-accent/10',
  },
  {
    icon: Compass,
    title: 'Architectural Restraint',
    titleAr: 'النقاء والتوازن المعماري',
    desc: 'Quiet luxury is about subtraction. We optimize negative space, natural sightlines, and acoustic calm.',
    descAr: 'الفخامة الهادئة تعتمد على البساطة النقية، وتوظيف الإضاءة الطبيعية والهدوء الصوتي.',
    color: 'from-primary/20 to-accent/10',
    glow: 'hover:shadow-primary/10',
  },
  {
    icon: ShieldCheck,
    title: 'Turnkey Stewardship',
    titleAr: 'إشراف وتسليم متكامل',
    desc: 'Zero client friction. We manage every structural engineer, custom artisan joiner, and stone shipment from blueprint to handover.',
    descAr: 'إدارة متكاملة لكل مرحلة من مراحل البناء والتشطيب دون أي أعباء على العميل.',
    color: 'from-accent/20 to-primary/10',
    glow: 'hover:shadow-accent/10',
  },
];

export function AboutClientPage() {
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
              <span>Studio Heritage / قصة الاستوديو</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold tracking-tight text-foreground leading-[1.1] mb-6">
              Curating Timeless Sanctuaries with{' '}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Quiet Luxury
              </span>
            </h1>
            
            <h2 className="text-xl sm:text-2xl font-heading font-semibold text-muted-foreground/80 leading-relaxed mb-6 max-w-[28ch] mx-auto" dir="rtl">
              صياغة مساحات معمارية تتجاوز الزمن بروح الفخامة الهادئة
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto font-normal">
              DA Interiors was founded to create private residences and boutique hospitality spaces that celebrate tactile natural materials and effortless spatial harmony.
            </p>
          </motion.div>
        </SectionFrame>
      </section>

      {/* Main Story & Studio Photo */}
      <section className="relative py-12 md:py-20 overflow-hidden bg-background">
        <SectionFrame>
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto px-4">
            {/* Left: Studio Photo */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative"
            >
              <div className="relative h-[400px] sm:h-[500px] rounded-[2rem] overflow-hidden shadow-2xl shadow-primary/10 border border-white/20">
                <Image
                  src="/images/da/living1.jpg"
                  alt="DA Interiors Living Studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Floating Metrics */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                  <div className="bg-background/90 backdrop-blur-md rounded-2xl p-5 border border-white/10 shadow-xl">
                    <div className="flex items-center gap-4 justify-between sm:justify-start">
                      <div>
                        <div className="text-2xl sm:text-3xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                          Est. 2018
                        </div>
                        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mt-0.5">
                          Studio Established / سنة التأسيس
                        </div>
                      </div>
                      <div className="h-10 w-px bg-border/60 hidden sm:block" />
                      <div className="hidden sm:block">
                        <div className="text-base font-bold text-foreground leading-snug">
                          180+ Bespoke Residences
                        </div>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Turnkey Private Commissions / مشاريع سكنية خاصة
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-3xl bg-gradient-to-br from-accent to-primary opacity-20 -z-10 blur-sm" />
            </motion.div>

            {/* Right: Bilingual Narrative */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low border border-border text-xs font-semibold text-accent uppercase tracking-wide">
                <Compass className="w-3.5 h-3.5" />
                <span>Our Philosophy / فلسفتنا</span>
              </div>

              {/* English Narrative */}
              <div className="space-y-4 text-muted-foreground leading-relaxed font-normal">
                <h3 className="text-2xl font-bold text-foreground font-heading">Form Follows Soul</h3>
                <p>
                  Luxury residential design often suffers from excess—layers of transient trends that quickly feel dated. We founded DA Interiors to restore architectural integrity: celebrating organic limestone, bookmatched marbles, raw linens, and bespoke millwork designed to the millimeter.
                </p>
                <p>
                  Every commission is handled with white-glove stewardship. We take on a limited number of residences each year to ensure principal-led design, flawless construction quality, and absolute peace of mind for our clients.
                </p>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-border/60" />

              {/* Arabic Narrative */}
              <div className="space-y-4 text-muted-foreground/90 leading-loose text-right" dir="rtl">
                <h3 className="text-xl font-bold text-foreground font-heading">فلسفة التصميم المعماري</h3>
                <p className="font-heading">
                  نؤمن في استوديو دي إيه إنتيريرز بأن الفخامة الحقيقية لا تكمن في الزخارف الزائدة، بل في التناغم العميق بين المواد النبيلة كالحجر الطبيعي والخشب المعتق، ودقة التفاصيل المصنوعة خصيصاً لكل عميل.
                </p>
              </div>
            </motion.div>
          </div>
        </SectionFrame>
      </section>

      {/* Core Values Section */}
      <section className="relative py-16 md:py-24 bg-surface-container-low/40">
        <SectionFrame>
          <div className="text-center max-w-2xl mx-auto mb-16 px-4">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight mb-4">
              Our Core Pillars
            </h2>
            <p className="text-muted-foreground text-base">
              The fundamental standards that govern every architectural commission we accept.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {coreValues.map((val, i) => (
              <div
                key={i}
                className="bg-card border border-border/70 rounded-3xl p-8 hover:border-accent/40 transition-all shadow-sm hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-2xl bg-surface-container-low border border-border flex items-center justify-center mb-6">
                  <val.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-heading font-bold text-foreground mb-3">{val.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{val.desc}</p>
                <p className="text-xs text-muted-foreground/80 leading-relaxed text-right font-heading" dir="rtl">
                  {val.descAr}
                </p>
              </div>
            ))}
          </div>
        </SectionFrame>
      </section>

      {/* Global CTA */}
      <GlobalCta />

      {/* Footer */}
      <Footer />

      {/* WhatsApp FAB */}
      <FloatingWhatsApp />
    </main>
  );
}
