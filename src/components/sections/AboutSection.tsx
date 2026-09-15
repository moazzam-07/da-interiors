'use client';

import { motion } from "framer-motion";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { TextAnimate } from "@/components/ui/text-animate";
import { Sparkles, Compass, ShieldCheck } from "lucide-react";
import Image from "next/image";

const values = [
  {
    icon: Sparkles,
    title: "Noble Materiality",
    text: "We source authentic Italian travertine, French smoked oak, Belgian linen, and raw brass that age gracefully over generations.",
  },
  {
    icon: Compass,
    title: "Architectural Restraint",
    text: "Quiet luxury is about subtraction. We optimize sightlines, natural daylight, and spatial proportion rather than superficial ornament.",
  },
  {
    icon: ShieldCheck,
    title: "Turnkey Accountability",
    text: "From structural engineering to the final bespoke cashmere throw, our team stewards every phase with millimeter precision.",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-16 md:py-24 overflow-hidden bg-background">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] left-[60%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[140px]" />
      </div>

      <SectionFrame className="relative z-10" hasPadding={false}>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto px-4">
          {/* Left: Image Composition */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative"
          >
            <div className="relative h-[440px] md:h-[540px] rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border border-white/20">
              <Image
                src="/images/da/user_uploads/upload_15.jpeg"
                alt="DA Interiors Studio & Architecture"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

              {/* Floating stat */}
              <div className="absolute bottom-6 left-6 right-6 z-10">
                <div className="bg-background/90 backdrop-blur-md rounded-2xl p-5 border border-white/20 shadow-xl">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl font-heading font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary">
                      Est. 2018
                    </div>
                    <div className="h-10 w-px bg-border/60" />
                    <p className="text-sm text-muted-foreground leading-snug">
                      Sculpting bespoke residential sanctuaries and architectural spaces.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative offset card */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 rounded-2xl bg-gradient-to-br from-accent to-primary opacity-20 -z-10 blur-sm" />
          </motion.div>

          {/* Right: Story Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low border border-border text-xs sm:text-sm font-semibold text-accent mb-4 tracking-wide uppercase">
              <Compass className="w-4 h-4 text-accent" />
              Studio Philosophy
            </div>

            <TextAnimate
              as="h2"
              animation="blurInUp"
              by="word"
              once
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-foreground leading-[1.12] mb-6"
            >
              Where architectural rigor meets living emotion.
            </TextAnimate>

            <div className="space-y-4 text-muted-foreground leading-relaxed mb-10 text-base md:text-lg font-normal">
              <p>
                DA Interiors was founded on a singular premise: true luxury is not about decorative excess—it is the deliberate harmony between tactile natural materials, spatial proportion, and acoustic calm.
              </p>
              <p>
                Every residence we design is an intimate portrait of its owners. We discard transient fads in favor of enduring noble materials that acquire richer character with every passing year.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-5">
              {values.map((val, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-2xl bg-surface-container-low border border-border flex items-center justify-center shrink-0 mt-0.5">
                    <val.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="text-base font-heading font-bold text-foreground mb-1">{val.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{val.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </SectionFrame>
    </section>
  );
}
