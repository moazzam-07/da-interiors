'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useBooking } from '../BookingProvider';
import { User, Phone, Mail, MapPin, MessageSquare, ArrowLeft, ShieldCheck, Building2 } from 'lucide-react';

export function StepDetails() {
  const { state, dispatch, nextStep, prevStep } = useBooking();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [landmark, setLandmark] = useState('');

  const isValid = state.name.trim().length > 1 && state.phone.trim().length > 6 && state.email.includes('@');

  const setField = (field: string, value: string) => {
    dispatch({ type: 'SET_FIELD', payload: { field: field as keyof typeof state, value } });
  };

  const submitBooking = async () => {
    if (!isValid || isSubmitting) return;

    setIsSubmitting(true);
    dispatch({ type: 'SET_SUBMISSION_ERROR', payload: null });

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          selectedServices: state.selectedServices,
          date: state.date,
          time: state.time,
          name: state.name,
          phone: state.phone,
          email: state.email,
          address: state.address.trim() + (landmark.trim() ? ` (Landmark: ${landmark.trim()})` : ''),
          notes: state.notes,
        }),
      });
      const data: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(readApiError(data));
      }

      const bookingReference = readBookingReference(data);
      const emailWarning = readEmailWarning(data);

      if (!bookingReference) {
        throw new Error('The booking was created, but the confirmation reference was missing.');
      }

      dispatch({ type: 'SET_BOOKING_RESULT', payload: { bookingReference, emailWarning } });
      nextStep();
    } catch (error) {
      dispatch({
        type: 'SET_SUBMISSION_ERROR',
        payload: error instanceof Error ? error.message : 'We could not submit the booking. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="flex flex-col h-full"
    >
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight text-foreground">
          Almost there
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          We need a few details to confirm your booking.
        </p>
      </div>

      <div className="space-y-4 flex-1">
        {/* Name */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Full Name</label>
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={state.name}
              onChange={e => setField('name', e.target.value)}
              placeholder="Ahmed Al-Balushi"
              className="w-full bg-card border border-border/40 rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all outline-none"
            />
          </div>
        </div>

        {/* Phone + Email Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Phone</label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="tel"
                value={state.phone}
                onChange={e => setField('phone', e.target.value)}
                placeholder="+968 9200 0000"
                className="w-full bg-card border border-border/40 rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="email"
                value={state.email}
                onChange={e => setField('email', e.target.value)}
                placeholder="ahmed@example.com"
                className="w-full bg-card border border-border/40 rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all outline-none"
              />
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Address / Area (Anywhere in Oman)</label>
            <span className="text-[10px] font-bold text-primary font-heading" dir="rtl">في جميع أنحاء عمان</span>
          </div>
          <div className="relative">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={state.address}
              onChange={e => setField('address', e.target.value)}
              placeholder="e.g. Al Khuwair, Muscat or North Awqad, Salalah"
              className="w-full bg-card border border-border/40 rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all outline-none"
            />
          </div>
        </div>

        {/* Landmark */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Nearby Landmark (Optional)</label>
            <span className="text-[10px] font-bold text-primary font-heading" dir="rtl">المعلم القريب (مبنى، مسجد أو مجمع)</span>
          </div>
          <div className="relative">
            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={landmark}
              onChange={e => setLandmark(e.target.value)}
              placeholder="e.g. Near Al Ameen Mosque, Grand Mall, or famous landmark"
              className="w-full bg-card border border-border/40 rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all outline-none"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Notes (optional)</label>
          <div className="relative">
            <MessageSquare className="absolute left-4 top-4 w-4 h-4 text-muted-foreground pointer-events-none" />
            <textarea
              rows={2}
              value={state.notes}
              onChange={e => setField('notes', e.target.value)}
              placeholder="Any special instructions..."
              className="w-full bg-card border border-border/40 rounded-xl pl-11 pr-4 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all outline-none resize-none"
            />
          </div>
        </div>

        {/* Trust strip */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
          <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
          <span>Your data is encrypted and never shared with third parties.</span>
        </div>

        {state.submissionError && (
          <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600">
            {state.submissionError}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="mt-8 pt-6 border-t border-border/30 flex gap-3">
        <button
          onClick={prevStep}
          className="flex items-center gap-2 px-6 py-4 rounded-full border border-border/50 text-muted-foreground font-semibold text-sm hover:border-primary/30 hover:text-foreground transition-all active:scale-[0.98]"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <button
          disabled={!isValid || isSubmitting}
          onClick={submitBooking}
          className="flex-1 bg-gradient-to-r from-primary to-accent text-white py-4 rounded-full font-bold text-base shadow-xl shadow-primary/20 hover:shadow-primary/35 hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isSubmitting ? 'Submitting...' : 'Confirm Booking'}
        </button>
      </div>
    </motion.div>
  );
}

function readApiError(data: unknown) {
  return isRecord(data) && typeof data.error === 'string'
    ? data.error
    : 'We could not submit the booking. Please try again.';
}

function readBookingReference(data: unknown) {
  if (!isRecord(data) || !isRecord(data.booking)) return null;
  return typeof data.booking.reference === 'string' ? data.booking.reference : null;
}

function readEmailWarning(data: unknown) {
  if (!isRecord(data) || !Array.isArray(data.warnings) || data.warnings.length === 0) {
    return null;
  }

  const warnings = data.warnings.filter((warning): warning is string => typeof warning === 'string');
  return warnings.length > 0 ? warnings.join(' ') : null;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
