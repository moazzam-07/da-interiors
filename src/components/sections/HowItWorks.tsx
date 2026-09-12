'use client';

import { motion } from "framer-motion";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { Compass, Palette, Hammer, Sparkles, CheckCircle2 } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";

const steps = [
  {
    icon: Compass,
    number: "01",
    title: "Spatial Audit & Discovery",
    description: "We begin with an in-depth private consultation, lifestyle audit, and spatial alignment to map your functional rituals and aesthetic aspirations.",
  },
  {
    icon: Palette,
    number: "02",
    title: "3D Conception & Material Palette",
    description: "Experience your future residence through 8K photorealistic visualizations and explore a curated physical box of travertine, smoked oak, and textiles.",
  },
  {
    icon: Hammer,
    number: "03",
    title: "Artisan Joinery & Global Procurement",
    description: "Our master cabinetmakers craft custom millwork while rare marbles and lighting fixtures are secured directly from Italian quarries and European ateliers.",
  },
  {
    icon: Sparkles,
    number: "04",
    title: "White-Glove Installation & Reveal",
    description: "Our dedicated site directors manage final installation, precision art placement, and turnkey styling for a flawless champagne home reveal.",
  },
];

export function HowItWorks() {
  return (
    <section id="process" className="relative py-16 md:py-24 overflow-hidden bg-surface-container-lowest">
      {/* Subtle divider gradient at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

      <SectionFrame className="relative z-10" hasPadding={false}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low border border-border text-xs sm:text-sm font-semibold text-accent mb-4 tracking-wide uppercase"
          >
            <CheckCircle2 className="w-4 h-4 text-accent" />
            The Design Journey
          </motion.div>

          <TextAnimate
            as="h2"
            animation="blurInUp"
            by="word"
            once
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-foreground leading-[1.1] mb-5"
          >
            From blueprint to timeless sanctuary.
          </TextAnimate>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            A disciplined four-phase roadmap that eliminates construction friction and brings extraordinary architectural visions into physical reality.
          </motion.p>
        </div>

        {/* Steps Timeline */}
        <div className="max-w-5xl mx-auto relative px-4">
          {/* Connecting line */}
          <div className="absolute top-0 bottom-0 left-8 md:left-1/2 w-px bg-gradient-to-b from-accent/30 via-accent/60 to-accent/20 hidden md:block" />

          <div className="flex flex-col gap-12 md:gap-0">
            {steps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content Card */}
                  <div className={`flex-1 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16 md:text-left"}`}>
                    <div className="group bg-card border border-border/70 rounded-3xl p-6 md:p-8 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500">
                      <div className={`flex items-center gap-4 mb-4 ${isLeft ? "md:flex-row-reverse" : ""}`}>
                        <div className="w-12 h-12 rounded-2xl bg-surface-container-low border border-border flex items-center justify-center shrink-0 group-hover:bg-accent/15 group-hover:scale-105 transition-all duration-500">
                          <step.icon className="w-5.5 h-5.5 text-accent" />
                        </div>
                        <h3 className="text-xl font-heading font-bold text-foreground tracking-tight">
                          {step.title}
                        </h3>
                      </div>
                      <p className={`text-sm text-muted-foreground leading-relaxed ${isLeft ? "md:text-right" : ""}`}>
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                    <div className="w-13 h-13 rounded-full bg-primary flex items-center justify-center text-accent font-heading font-extrabold text-base shadow-xl border-2 border-accent/40 ring-4 ring-background">
                      {step.number}
                    </div>
                  </div>

                  {/* Spacer for other side */}
                  <div className="hidden md:block flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </SectionFrame>
    </section>
  );
}
