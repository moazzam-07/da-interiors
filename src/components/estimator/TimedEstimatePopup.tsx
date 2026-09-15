'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calculator, X, ArrowRight, ShieldCheck } from 'lucide-react';
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
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="fixed bottom-6 right-6 z-40 max-w-sm sm:max-w-md w-[calc(100vw-3rem)] pointer-events-auto"
        >
          <div className="relative rounded-3xl border border-accent/40 bg-surface-container-lowest/95 backdrop-blur-xl p-5 sm:p-6 shadow-2xl shadow-accent/15 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-10 -right-10 w-36 h-36 bg-accent/10 rounded-full blur-2xl pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-surface-container hover:bg-surface-container-high border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-accent/20 to-primary/20 border border-accent/40 flex items-center justify-center shrink-0 text-accent shadow-sm">
                <Calculator className="w-5 h-5" />
              </div>

              <div className="flex-1 pr-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/30 text-[10px] font-extrabold uppercase tracking-widest text-accent mb-1.5">
                  <Sparkles className="w-3 h-3" />
                  <span>Instant Cost Estimator</span>
                </div>

                <h4 className="text-sm sm:text-base font-bold font-heading text-foreground leading-snug mb-1">
                  Planning an Interior Project in Kolkata?
                </h4>

                <p className="text-xs text-muted-foreground leading-relaxed font-normal mb-3.5">
                  Calculate your turn-key budget in 60 seconds with transparent material rates (Marine Ply, Acrylic, Veneers &amp; Italian Marble).
                </p>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleOpenEstimator}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-all cursor-pointer shadow-md"
                  >
                    <span>Calculate Free Estimate</span>
                    <ArrowRight className="w-3.5 h-3.5 text-accent" />
                  </button>

                  <button
                    type="button"
                    onClick={handleDismiss}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer py-1 px-2 font-medium"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom trust note */}
            <div className="mt-4 pt-3 border-t border-border/60 flex items-center gap-2 text-[10px] text-muted-foreground/80 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
              <span>100% Free • Direct WhatsApp Lead Quotation • Zero Obligation</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
