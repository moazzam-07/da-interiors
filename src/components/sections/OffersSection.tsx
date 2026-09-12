'use client';

import { motion } from "framer-motion";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { ArrowRight, Percent, Clock, Zap } from "lucide-react";
import { useBooking } from "@/components/booking/BookingProvider";
import { TextAnimate } from "@/components/ui/text-animate";
import { BorderBeam } from "@/components/ui/border-beam";

const offers = [
  {
    badge: "Most Popular",
    title: "Annual AC Care Plan",
    description: "4 visits per year with priority scheduling, filter replacements, and full system diagnostics included.",
    discount: "Save 25%",
    originalPrice: "80 OMR",
    offerPrice: "60 OMR",
    perUnit: "/ year",
    icon: Zap,
    accent: "primary",
    featured: true,
  },
  {
    badge: "Limited Time",
    title: "First-Time Deep Clean",
    description: "Complete home deep cleaning with kitchen de-grease, bathroom sanitization, and floor polishing.",
    discount: "15% Off",
    originalPrice: "45 OMR",
    offerPrice: "38 OMR",
    perUnit: "/ session",
    icon: Percent,
    accent: "accent",
    featured: false,
  },
  {
    badge: "Bundle & Save",
    title: "Move-In Ready Package",
    description: "Full property prep: deep cleaning + AC service + minor electrical and plumbing checks.",
    discount: "Save 30%",
    originalPrice: "120 OMR",
    offerPrice: "84 OMR",
    perUnit: "/ package",
    icon: Clock,
    accent: "primary",
    featured: false,
  },
];

export function OffersSection() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] right-[5%] w-[30%] h-[30%] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[20%] left-[10%] w-[25%] h-[25%] rounded-full bg-primary/5 blur-[100px]" />
      </div>

      <SectionFrame className="relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-sm font-semibold text-primary mb-5"
          >
            <Percent className="w-4 h-4" />
            Special Offers
          </motion.div>

          <TextAnimate
            as="h2"
            animation="blurInUp"
            by="word"
            once
            className="text-4xl md:text-5xl lg:text-[3.25rem] font-heading font-extrabold tracking-tight text-foreground leading-[1.1] mb-5"
          >
            Smart plans, better value.
          </TextAnimate>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto"
          >
            Save on the services you need most with our curated packages and seasonal promotions.
          </motion.p>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {offers.map((offer, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`group relative rounded-3xl border bg-card p-8 flex flex-col transition-all duration-500 hover:shadow-xl ${
                offer.featured
                  ? "border-primary/30 shadow-lg shadow-primary/10 md:scale-[1.03]"
                  : "border-border/50 hover:border-primary/20 hover:shadow-primary/5"
              }`}
            >
              {/* Border Beam for featured */}
              {offer.featured && (
                <BorderBeam
                  size={150}
                  duration={10}
                  colorFrom="#00ced1"
                  colorTo="#00696b"
                  borderWidth={1.5}
                />
              )}

              {/* Badge */}
              <div className={`inline-flex self-start items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6 ${
                offer.featured
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent/15 text-primary"
              }`}>
                <offer.icon className="w-3.5 h-3.5" />
                {offer.badge}
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-heading font-bold text-foreground tracking-tight mb-3">
                {offer.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-8 flex-1">
                {offer.description}
              </p>

              {/* Pricing */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-heading font-extrabold text-foreground">{offer.offerPrice}</span>
                  <span className="text-sm text-muted-foreground">{offer.perUnit}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground line-through">{offer.originalPrice}</span>
                  <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{offer.discount}</span>
                </div>
              </div>

              {/* CTA */}
              <OfferBookButton featured={offer.featured} />
            </motion.div>
          ))}
        </div>
      </SectionFrame>
    </section>
  );
}

function OfferBookButton({ featured }: { featured: boolean }) {
  const { openBooking } = useBooking();
  return (
    <button
      onClick={() => openBooking()}
      className={`group/btn flex h-12 w-full cursor-pointer select-none items-center justify-center gap-2 rounded-full text-sm font-bold transition-all duration-300 active:scale-[0.98] ${
        featured
          ? "bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02]"
          : "bg-foreground text-background hover:bg-primary"
      }`}
    >
      Book This Offer
      <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
    </button>
  );
}
