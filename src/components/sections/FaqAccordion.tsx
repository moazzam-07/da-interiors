'use client';

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { Backlight } from "@/components/ui/backlight";
import { useBooking } from "@/components/booking/BookingProvider";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "What is DA Interiors' typical timeline for a complete residential project?",
    answer: "Full-residence architectural projects typically span 6 to 16 weeks for spatial planning, 3D photoreal visualization, and technical specifications, followed by 3 to 6 months for construction and bespoke millwork fabrication depending on square footage.",
  },
  {
    question: "How does your turnkey procurement and white-glove installation work?",
    answer: "We oversee the entire ecosystem: directly sourcing stone from Italian quarries, directing master joiners, managing international freight logistics, and completing white-glove art hanging and champagne handover with zero stress for you.",
  },
  {
    question: "Do you accept commissions for residences internationally?",
    answer: "Yes. DA Interiors designs private penthouses, coastal villas, and boutique retreats worldwide. Our hyper-accurate 3D digital twins and trusted global contractor network ensure seamless execution anywhere in the world.",
  },
  {
    question: "How do you handle budget transparency and contractor oversight?",
    answer: "We prepare exhaustive technical tender dossiers with exact material schedules. This locks in transparent, competitive bids from vetted luxury builders, eliminating unexpected scope creep or financial surprises.",
  },
  {
    question: "Can we incorporate our existing fine art and heirloom furnishings?",
    answer: "Absolutely. Cherished heirlooms and curated art add profound soul to architectural spaces. We engineer custom lighting, floating plinths, and wall niches specifically tailored to honor your collection.",
  },
  {
    question: "What happens during our initial Discovery Consultation?",
    answer: "During our 60-minute private session, we review your floor plans, lifestyle rituals, aesthetic preferences, and budget goals, mapping out a preliminary roadmap and material direction for your residence.",
  },
];

const FAQItem = ({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group relative"
    >
      <div
        className="relative cursor-pointer overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-background via-background to-muted/20 p-6 transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
        onClick={onToggle}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="relative flex items-start justify-between gap-4">
          <div className="flex-1 text-left">
            <h3 className="text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-accent font-heading">
              {faq.question}
            </h3>
          </div>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-low border border-border transition-colors duration-300 group-hover:bg-accent/20"
          >
            <ChevronDown className="h-4 w-4 text-accent" />
          </motion.div>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground font-normal">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { openBooking, openWhatsApp } = useBooking();

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-br from-surface-container-lowest via-background to-muted/10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent pointer-events-none" />
      
      <SectionFrame className="relative py-20 sm:py-28 z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center px-4"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-surface-container-low px-4 py-1.5 text-xs sm:text-sm font-semibold text-accent tracking-widest uppercase">
            <Sparkles className="h-4 w-4 text-accent" />
            Clarity & Governance
          </div>
          
          <h2 className="mb-4 text-4xl font-heading font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Frequently Asked Questions
          </h2>
          
          <p className="mx-auto mt-4 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed font-normal">
            Everything you need to know about our architectural commission process, fees, and turnkey white-glove execution.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl px-4">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => handleToggle(index)}
              />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="mt-16 text-center"
          >
            <Backlight className="w-full inline-flex justify-center relative py-6" blur={60}>
              <div className="relative w-full max-w-lg mx-auto group">
                <div className="absolute inset-0 bg-gradient-to-r from-accent/60 via-primary/40 to-accent/60 rounded-[2rem] opacity-70" />
                
                <div className="relative z-10 inline-flex flex-col items-center gap-4 rounded-[2rem] border border-border bg-card p-8 lg:p-10 shadow-xl w-full mx-auto">
                  <h3 className="text-2xl font-bold text-foreground font-heading">
                    Have a bespoke inquiry?
                  </h3>
                  <p className="text-base text-muted-foreground max-w-[42ch] font-normal leading-relaxed">
                    Our lead architectural directors are available to discuss unique residential commissions and international briefs.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full sm:w-auto">
                    <button
                      onClick={() => openBooking()}
                      className="rounded-full bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all duration-300 hover:bg-primary/90 hover:shadow-lg cursor-pointer"
                    >
                      Book Consultation
                    </button>
                    <button
                      onClick={openWhatsApp}
                      className="rounded-full border border-border bg-surface-container-low px-6 py-3 font-semibold text-foreground transition-all duration-300 hover:text-accent hover:border-accent/40 cursor-pointer"
                    >
                      Direct Concierge
                    </button>
                  </div>
                </div>
              </div>
            </Backlight>
          </motion.div>
        </div>
      </SectionFrame>
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
    </div>
  );
}
