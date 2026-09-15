'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calculator, X, ArrowRight, ShieldCheck, Home, Layers, CheckCircle2 } from 'lucide-react';
import { useBooking } from '@/components/booking/BookingProvider';

export function TimedEstimatePopup() {
  const { openEstimator, isEstimatorOpen, isWhatsAppOpen } = useBooking();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed previously in this session
    const isDismissed = sessionStorage.getItem('da_estimator_popup_dismissed');
    if (isDismissed) return;

    // Trigger popup after 12 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 12000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    sessionStorage.setItem('da_estimator_popup_dismissed', 'true');
  };

  const handleOpenEstimator = () => {
    setIsVisible(false);
    sessionStorage.setItem('da_estimator_popup_dismissed', 'true');
    openEstimator();
  };

  // Hide if other major modals are already active
  if (isEstimatorOpen || isWhatsAppOpen) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Centered Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
          />

          {/* Centered & Enlarged Popup Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative w-full max-w-xl sm:max-w-2xl rounded-2xl sm:rounded-[2.5rem] border border-accent/40 bg-surface-container-lowest/98 backdrop-blur-2xl p-5 sm:p-10 md:p-12 shadow-2xl shadow-accent/20 overflow-hidden z-10 text-center max-h-[92dvh] overflow-y-auto"
          >
            {/* Top Accent Gradient Bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-accent via-primary to-accent" />

            {/* Ambient Background Glows */}
            <div className="absolute -top-16 -right-16 w-52 h-52 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-52 h-52 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container hover:bg-surface-container-high border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer shadow-sm"
              title="Close popup"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon & Badge */}
            <div className="flex flex-col items-center mb-4 sm:mb-6">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/40 flex items-center justify-center text-accent shadow-lg mb-3 sm:mb-4">
                <Calculator className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-accent/10 border border-accent/30 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-accent shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Turnkey Calculator</span>
              </div>
            </div>

            {/* Headline */}
            <h3 className="text-xl sm:text-3xl md:text-4xl font-extrabold font-heading text-foreground tracking-tight leading-[1.2] mb-2.5 sm:mb-3 text-balance">
              Calculate Your Turnkey Interior Investment in 60 Seconds
            </h3>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed max-w-lg mx-auto mb-6 sm:mb-8 font-normal text-balance">
              Planning a residential or commercial project in Kolkata? Discover your customized budget from 200 sq.ft upwards with 100% material clarity.
            </p>

            {/* 3 Key Feature Columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3.5 mb-6 sm:mb-8 text-left">
              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-surface-container-low border border-border/70 flex flex-col justify-between">
                <Home className="w-4 h-4 sm:w-5 sm:h-5 text-accent mb-1.5 sm:mb-2" />
                <div>
                  <h5 className="text-xs font-bold font-heading text-foreground mb-0.5">Custom Typology</h5>
                  <p className="text-[11px] text-muted-foreground leading-snug font-normal">
                    Studios, 1–4+ BHK, Villas &amp; Offices.
                  </p>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-surface-container-low border border-border/70 flex flex-col justify-between">
                <Layers className="w-4 h-4 sm:w-5 sm:h-5 text-accent mb-1.5 sm:mb-2" />
                <div>
                  <h5 className="text-xs font-bold font-heading text-foreground mb-0.5">Material Grades</h5>
                  <p className="text-[11px] text-muted-foreground leading-snug font-normal">
                    Marine BWR/BWP, HDHMR &amp; Italian Stone.
                  </p>
                </div>
              </div>

              <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-surface-container-low border border-border/70 flex flex-col justify-between">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-accent mb-1.5 sm:mb-2" />
                <div>
                  <h5 className="text-xs font-bold font-heading text-foreground mb-0.5">WhatsApp Delivery</h5>
                  <p className="text-[11px] text-muted-foreground leading-snug font-normal">
                    Itemized blueprint sent to your mobile.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3.5">
              <button
                type="button"
                onClick={handleOpenEstimator}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:px-8 sm:py-4 rounded-full bg-primary text-primary-foreground text-xs sm:text-sm font-bold uppercase tracking-wider hover:bg-primary/90 transition-all cursor-pointer shadow-xl hover:scale-[1.02]"
              >
                <span>Launch Free Cost Estimator</span>
                <ArrowRight className="w-4 h-4 text-accent" />
              </button>

              <button
                type="button"
                onClick={handleDismiss}
                className="w-full sm:w-auto px-5 py-2.5 sm:px-6 sm:py-3.5 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Maybe Later
              </button>
            </div>

            {/* Bottom Trust Tag */}
            <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-border/60 flex items-center justify-center gap-2 text-[11px] sm:text-xs text-muted-foreground font-medium">
              <ShieldCheck className="w-4 h-4 text-accent shrink-0" />
              <span>100% Free &bull; Direct WhatsApp Quotation &bull; Zero Obligation</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
