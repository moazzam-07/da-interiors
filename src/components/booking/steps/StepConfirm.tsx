'use client';

import { motion } from 'framer-motion';
import { useBooking } from '../BookingProvider';
import { CheckCircle, Calendar, Clock, MapPin, MessageCircle, ArrowRight } from 'lucide-react';

const serviceNames: Record<string, string> = {
  'residential-architecture': 'Residential Architecture',
  'bespoke-styling': 'Bespoke Interior Styling',
  'kitchen-bath': 'Kitchen & Master Bath',
  'hospitality-commercial': 'Hospitality & Commercial',
  'custom-millwork': 'Custom Millwork & Joinery',
  '3d-visualization': '3D Photoreal Renders & VR',
  'lighting-acoustics': 'Architectural Lighting',
  'turnkey-stewardship': 'Turnkey Project Stewardship',
};

export function StepConfirm() {
  const { state, closeBooking } = useBooking();

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return '';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className="flex flex-col items-center text-center h-full"
    >
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 shadow-xl shadow-primary/30"
      >
        <motion.div
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.3 }}
        >
          <CheckCircle className="w-10 h-10 text-white" strokeWidth={2.5} />
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight text-foreground mb-2"
      >
        Booking Confirmed!
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-muted-foreground text-sm mb-8 max-w-sm"
      >
        We&apos;ll reach out shortly to confirm your appointment. A confirmation email has been queued for your request.
      </motion.p>

      {state.bookingReference && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52 }}
          className="mb-5 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary"
        >
          Reference {state.bookingReference}
        </motion.div>
      )}

      {state.emailWarning && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.54 }}
          className="mb-5 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-xs font-medium text-amber-700"
        >
          Booking saved. Email notification needs attention: {state.emailWarning}
        </motion.div>
      )}

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        className="w-full bg-card border border-border/40 rounded-2xl p-6 text-left mb-6 space-y-4"
      >
        <div>
          <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Services</div>
          <div className="flex flex-wrap gap-2">
            {state.selectedServices.map(svc => (
              <span key={svc} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold">
                <CheckCircle className="w-3 h-3" />
                {serviceNames[svc] || svc}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <Calendar className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Date</div>
              <div className="text-sm font-semibold text-foreground">{formatDate(state.date)}</div>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Time</div>
              <div className="text-sm font-semibold text-foreground">{state.time}</div>
            </div>
          </div>
        </div>

        {state.address && (
          <div className="flex items-start gap-2">
            <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
            <div>
              <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Location</div>
              <div className="text-sm font-semibold text-foreground">{state.address}</div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65 }}
        className="w-full space-y-3"
      >
        <a
          href={`https://wa.me/917903624701?text=${encodeURIComponent(
            `Hi DA Interiors! I have requested a design consultation for: ${state.selectedServices.map(s => serviceNames[s] || s).join(', ')} on ${formatDate(state.date)} at ${state.time}. Reference: ${state.bookingReference ?? 'pending'}, Name: ${state.name}, Phone: ${state.phone}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="group w-full bg-[#25D366] text-white py-4 rounded-full font-bold text-sm shadow-lg hover:shadow-[#25D366]/30 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Share on WhatsApp
        </a>

        <button
          onClick={closeBooking}
          className="group w-full py-4 rounded-full font-bold text-sm border border-border/50 text-foreground hover:border-primary/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          Done
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </motion.div>
    </motion.div>
  );
}
