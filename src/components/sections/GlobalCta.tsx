'use client';

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Particles } from "@/components/ui/particles";
import { useBooking } from "@/components/booking/BookingProvider";

export function GlobalCta() {
  const { openBooking } = useBooking();
  
  return (
    <div className="bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent pointer-events-none z-0" />
      
      {/* Particles Background for Ultra Premium Feel */}
      <Particles
        className="absolute inset-0 pointer-events-none z-0"
        quantity={60}
        ease={80}
        color="#c29d6d"
        refresh
      />

      <SectionFrame className="py-20 md:py-28 relative z-10" containerClassName="relative z-10" hasPadding={false}>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-4 relative z-20">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-accent uppercase mb-4 inline-block">
            Private Commissions
          </span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-white mb-6 drop-shadow-md"
          >
            Ready to craft your <br className="hidden md:block" />
            <span className="italic text-accent bg-gradient-to-r from-accent via-white to-accent bg-clip-text text-transparent drop-shadow-sm pr-3">
              timeless sanctuary?
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/80 mb-10 font-normal max-w-2xl leading-relaxed"
          >
            Schedule a private discovery session with our principal design directors to discuss your residential or hospitality vision.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="z-30"
          >
            <ShimmerButton 
              onClick={() => openBooking()}
              background="#c29d6d" 
              shimmerColor="#ffffff"
              shimmerSize="0.1em"
              className="shadow-[0_0_40px_-10px_rgba(194,157,109,0.5)] hover:shadow-[0_0_60px_-15px_rgba(194,157,109,0.8)] transition-all group hover:scale-105"
            >
              <span className="flex items-center gap-2 whitespace-pre-wrap text-center text-sm md:text-base font-bold leading-none tracking-tight text-primary z-10 px-6 py-2.5 cursor-pointer">
                Request a Design Consultation <ArrowRight className="w-5 h-5 ml-1 transition-transform group-hover:translate-x-1" />
              </span>
            </ShimmerButton>
          </motion.div>
        </div>
      </SectionFrame>
    </div>
  );
}
