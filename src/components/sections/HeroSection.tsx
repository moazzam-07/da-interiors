'use client';

import * as React from "react";
import { useBooking } from "@/components/booking/BookingProvider";
import { motion } from "framer-motion";
import { ArrowRight, Compass, Sparkles } from "lucide-react";
import { ImageStreamHero, type StreamImage } from "@/components/ui/image-stream-hero";
import { ShimmerButton } from "@/components/ui/shimmer-button";

const LUXURY_PORTFOLIO_IMAGES: StreamImage[] = [
  {
    src: "/images/da/user_uploads/upload_15.jpeg",
    alt: "Modern luxury open-concept living lounge with warm architectural cove lighting",
  },
  {
    src: "/images/da/user_uploads/upload_04.jpg",
    alt: "Monolithic luxury modular kitchen with textured stone and dark glass cabinetry",
  },
  {
    src: "/images/da/user_uploads/upload_07.jpeg",
    alt: "Serene master suite sanctuary with curved bouclé headboard and wall panelling",
  },
  {
    src: "/images/da/user_uploads/upload_08.jpeg",
    alt: "Sculptural double-height entrance foyer with floating architectural staircase",
  },
  {
    src: "/images/da/user_uploads/upload_02.jpeg",
    alt: "Contemporary designer kitchen with fluted gold accents and quartz worktops",
  },
  {
    src: "/images/da/user_uploads/upload_12.jpeg",
    alt: "Bespoke media wall lounge with fluted acoustic paneling and recessed lighting",
  },
  {
    src: "/images/da/user_uploads/upload_27.jpg",
    alt: "Architectural master bedroom with integrated warm timber joinery",
  },
  {
    src: "/images/da/user_uploads/upload_22.jpeg",
    alt: "Curated formal dining salon with custom chandelier and marble flooring",
  },
  {
    src: "/images/da/user_uploads/upload_16.jpeg",
    alt: "Minimalist master bath sanctuary with sculptural freestanding soaking tub",
  },
  {
    src: "/images/da/user_uploads/upload_03.jpeg",
    alt: "U-shaped executive modular kitchen with dark smoked veneer and ambient coves",
  },
  {
    src: "/images/da/user_uploads/upload_26.jpeg",
    alt: "Modern luxury bedroom with geometric timber feature wall and ambient glow",
  },
  {
    src: "/images/da/user_uploads/upload_20.jpeg",
    alt: "Spacious private living salon with bespoke furnishings and floor-to-ceiling drapery",
  },
];

export function HeroSection() {
  const { openBooking, openEstimator } = useBooking();

  return (
    <section className="relative w-full overflow-hidden bg-background">
      {/* 1. Top Editorial Title — completely isolated ABOVE the animation */}
      <div className="relative z-10 w-full pt-28 sm:pt-36 pb-4 sm:pb-6 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.3em] text-accent mb-2.5 block">
            Architecture & Bespoke Living
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-normal font-heading tracking-tight text-foreground text-balance leading-tight">
            Best Luxury Interiors in Kolkata
          </h1>
        </motion.div>
      </div>

      {/* 2. 3D Perspective Image Corridor — Dedicated Stage with ZERO text overlap */}
      <div className="relative w-full overflow-hidden my-2 sm:my-4">
        {/* Subtle lateral gradient feathering so cards gracefully sweep out */}
        <div className="absolute inset-y-0 left-0 w-12 sm:w-24 pointer-events-none bg-gradient-to-r from-background to-transparent z-[2]" />
        <div className="absolute inset-y-0 right-0 w-12 sm:w-24 pointer-events-none bg-gradient-to-l from-background to-transparent z-[2]" />

        <ImageStreamHero
          images={LUXURY_PORTFOLIO_IMAGES}
          cards={10}
          speed={20}
          axis={50}
          path={{
            cardRadius: 0.8,
            perspective: 32,
          }}
          className="h-[320px] sm:h-[420px] md:h-[480px] lg:h-[520px] w-full"
        />
      </div>

      {/* 3. Bottom Minimalist CTAs — cleanly positioned BELOW the animation */}
      <div className="relative z-10 w-full pt-4 pb-12 sm:pb-16 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-xl mx-auto"
        >
          {/* Magic UI Shimmer Button — Warm Architectural Gold */}
          <ShimmerButton
            onClick={() => openBooking()}
            shimmerColor="#c29d6d"
            shimmerDuration="3.2s"
            shimmerSize="0.09em"
            borderRadius="9999px"
            background="#24211d"
            className="w-full sm:w-auto px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-widest uppercase shadow-xl shadow-accent/15 hover:shadow-accent/30 hover:scale-[1.02] transition-all cursor-pointer"
          >
            <span className="flex items-center text-white tracking-widest">
              Request Consultation
              <ArrowRight className="ml-2.5 w-4 h-4 text-accent transition-transform group-hover:translate-x-1" />
            </span>
          </ShimmerButton>

          {/* Cost Estimator Button */}
          <button
            type="button"
            onClick={openEstimator}
            className="group relative w-full sm:w-auto inline-flex items-center justify-center rounded-full px-6 py-3.5 text-xs sm:text-sm font-medium tracking-widest uppercase border border-accent/40 bg-surface-container-low/85 hover:bg-surface-container-low text-foreground hover:text-accent shadow-sm backdrop-blur-md hover:scale-[1.02] hover:border-accent/70 transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent mr-2" />
            <span>Estimate Cost</span>
          </button>

          {/* Luxury Companion Pill */}
          <a
            href="#portfolio"
            className="group relative w-full sm:w-auto inline-flex items-center justify-center rounded-full px-6 py-3.5 text-xs sm:text-sm font-medium tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>Selected Works</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}



