'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useBooking } from './BookingProvider';
import { StepServices } from './steps/StepServices';
import { StepSchedule } from './steps/StepSchedule';
import { StepDetails } from './steps/StepDetails';
import { StepConfirm } from './steps/StepConfirm';
import { X } from 'lucide-react';
import { LogoIcon } from '@/components/ui/logo-icon';

const stepLabels = ['Services', 'Schedule', 'Details', 'Confirm'];

export function BookingModal() {
  const { state, closeBooking } = useBooking();
  const { isOpen, step } = state;

  // Body scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) closeBooking();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeBooking]);

  const renderStep = () => {
    switch (step) {
      case 1: return <StepServices key="services" />;
      case 2: return <StepSchedule key="schedule" />;
      case 3: return <StepDetails key="details" />;
      case 4: return <StepConfirm key="confirm" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeBooking}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-2 sm:p-4 pointer-events-none"
          >
            <div
              className="bg-background/95 backdrop-blur-xl border border-border/30 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl w-full max-w-lg max-h-[92vh] sm:max-h-[90vh] flex flex-col pointer-events-auto overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 sm:px-6 pt-4 sm:pt-5 pb-4 border-b border-border/20">
                <div className="flex items-center gap-3">
                  <LogoIcon className="w-7 h-7" />
                  <span className="font-heading font-bold text-sm text-foreground tracking-tight">Book a Service</span>
                </div>
                <button
                  onClick={closeBooking}
                  className="w-9 h-9 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              {/* Progress Indicator */}
              {step < 4 && (
                <div className="px-4 sm:px-6 pt-4 pb-2">
                  {/* Step dots */}
                  <div className="flex items-center gap-1 mb-2">
                    {stepLabels.map((label, i) => (
                      <div key={label} className="flex items-center gap-1 flex-1">
                        <div className={`h-1.5 rounded-full flex-1 transition-all duration-500 ${
                          i + 1 <= step ? 'bg-primary' : 'bg-border/50'
                        }`} />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between">
                    {stepLabels.map((label, i) => (
                      <span
                        key={label}
                        className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${
                          i + 1 === step ? 'text-primary' : i + 1 < step ? 'text-primary/50' : 'text-muted-foreground/40'
                        }`}
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Step Content */}
              <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 min-h-0">
                <AnimatePresence mode="wait">
                  {renderStep()}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
