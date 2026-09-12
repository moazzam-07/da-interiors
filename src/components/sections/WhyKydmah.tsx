'use client';

import { motion, type Variants } from "framer-motion";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { Compass, Sparkles, ShieldCheck, Award, Layers, Clock } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";

const reasons = [
  {
    icon: Layers,
    title: "Tactile Material Purity",
    description: "Hand-selected travertine, French smoked oak, Belgian linen, and raw bronze. We source noble materials that patinate beautifully over decades.",
    gradient: "from-accent/15 to-primary/10",
  },
  {
    icon: Compass,
    title: "In-House Master Millwork",
    description: "Every built-in, dressing room, and hidden architectural door is drafted with 0.5mm tolerance and installed by dedicated master joiners.",
    gradient: "from-primary/15 to-accent/10",
  },
  {
    icon: ShieldCheck,
    title: "Turnkey White-Glove Stewardship",
    description: "We oversee general contractors, MEP engineers, and import logistics so your design journey is completely seamless and stress-free.",
    gradient: "from-accent/15 to-primary/10",
  },
  {
    icon: Clock,
    title: "Milestone Timelines & Fixed Scope",
    description: "Transparent financial schedules, weekly photoreal progress dossiers, and a firm commitment to agreed delivery dates.",
    gradient: "from-primary/15 to-accent/10",
  },
  {
    icon: Sparkles,
    title: "Bespoke Art & Lighting Advisory",
    description: "Direct access to European lighting ateliers, fine art galleries, and custom artisan furniture makers unavailable on the retail market.",
    gradient: "from-accent/15 to-primary/10",
  },
  {
    icon: Award,
    title: "Lifetime Craftsmanship Warranty",
    description: "Our relationship doesn't end at champagne handover. We provide comprehensive warranties on all custom joinery and architectural installations.",
    gradient: "from-primary/15 to-accent/10",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export function WhyDAInteriors() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden bg-background">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[40%] h-[40%] rounded-full bg-accent/4 blur-[130px]" />
        <div className="absolute bottom-[10%] right-[5%] w-[35%] h-[35%] rounded-full bg-primary/4 blur-[110px]" />
      </div>

      <SectionFrame className="relative z-10" hasPadding={false}>
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 px-4">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low border border-border text-xs sm:text-sm font-semibold text-accent mb-4 tracking-wide uppercase"
          >
            <ShieldCheck className="w-4 h-4 text-accent" />
            The Studio Difference
          </motion.div>

          <TextAnimate
            as="h2"
            animation="blurInUp"
            by="word"
            once
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-foreground leading-[1.1] mb-5"
          >
            Where architectural rigor meets living art.
          </TextAnimate>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            DA Interiors was founded to eliminate the friction of luxury residential remodeling. We merge pure aesthetic vision with master craftsmanship and white-glove accountability.
          </motion.p>
        </div>

        {/* Reasons Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4"
        >
          {reasons.map((reason, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="group relative rounded-3xl border border-border/70 bg-card/80 backdrop-blur-sm p-8 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500"
            >
              {/* Subtle hover gradient */}
              <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${reason.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-12 h-12 rounded-2xl bg-surface-container-low border border-border flex items-center justify-center mb-6 group-hover:bg-accent/15 group-hover:border-accent/30 group-hover:scale-105 transition-all duration-500">
                  <reason.icon className="w-5.5 h-5.5 text-accent" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-heading font-bold text-foreground mb-3 tracking-tight">
                  {reason.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </SectionFrame>
    </section>
  );
}

// Backward compatibility export
export const WhyKydmah = WhyDAInteriors;
