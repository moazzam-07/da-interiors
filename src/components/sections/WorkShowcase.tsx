'use client';

import { motion } from "framer-motion";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { InteractiveImageAccordion } from "@/components/ui/interactive-image-accordion";
import { TextAnimate } from "@/components/ui/text-animate";
import { Highlighter } from "@/components/ui/highlighter";
import { Sparkles, CheckCircle2 } from "lucide-react";

const showcaseItems = [
  {
    id: 1,
    title: "The Bellevue Penthouse",
    imageUrl: "/images/da/hero1.jpg",
  },
  {
    id: 2,
    title: "Minimalist Stone Villa",
    imageUrl: "/images/da/hero2.jpg",
  },
  {
    id: 3,
    title: "The Atelier Living Lounge",
    imageUrl: "/images/da/hero3.jpg",
  },
  {
    id: 4,
    title: "Japandi Master Sanctuary",
    imageUrl: "/images/da/bedroom1.jpg",
  },
];

export function WorkShowcase() {
  return (
    <section id="portfolio" className="scroll-mt-20">
      <SectionFrame className="bg-surface-container-lowest py-20 lg:py-28 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 items-center">
          {/* Left Side: Text & Highlights */}
          <div className="w-full lg:w-5/12 flex flex-col justify-center">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-accent uppercase mb-4 inline-block">
              Selected Works
            </span>
            
            <TextAnimate 
              animation="slideUp" 
              by="word" 
              className="text-4xl md:text-5xl font-heading font-black text-foreground mb-6 leading-[1.12] tracking-tight"
            >
              Architectural purity in every detail.
            </TextAnimate>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-[45ch]"
            >
              Explore our recent residential and commercial commissions. Each project reflects our commitment to{" "}
              <Highlighter action="highlight" color="#c29d6d" strokeWidth={2}>
                tactile materiality
              </Highlighter>{" "}
              and seamless architectural harmony.
            </motion.div>

            <ul className="space-y-4">
              {[
                "Direct Italian Stone Quarry Sourcing",
                "Millimeter-Tolerance Custom Millwork",
                "Turnkey White-Glove Installation & Reveal"
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                  className="flex items-center gap-3.5 text-foreground font-semibold text-base"
                >
                  <div className="flex items-center justify-center w-7 h-7 rounded-full bg-accent/20 text-accent shrink-0">
                    <CheckCircle2 strokeWidth={2} className="w-4 h-4" />
                  </div>
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Right Side: Interactive Image Accordion */}
          <motion.div 
            className="w-full lg:w-7/12 mt-10 lg:mt-0"
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <InteractiveImageAccordion items={showcaseItems} defaultActiveIndex={0} />
          </motion.div>
        </div>
      </SectionFrame>
    </section>
  );
}
