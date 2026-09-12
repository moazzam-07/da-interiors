'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from './BookingProvider';
import { X, MapPin, Wrench, ShieldCheck, Heart, Mail } from 'lucide-react';
import React, { useEffect } from 'react';

const WhatsAppIcon = (props: React.HTMLAttributes<SVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 175.216 175.552" {...props}>
    <defs>
      <linearGradient id="wa_grad_modal" x1="85.915" x2="86.535" y1="32.567" y2="137.092" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#57d163" />
        <stop offset="1" stopColor="#23b33a" />
      </linearGradient>
      <filter id="wa_blur_modal" width="1.115" height="1.114" x="-.057" y="-.057" colorInterpolationFilters="sRGB">
        <feGaussianBlur stdDeviation="3.531" />
      </filter>
    </defs>
    <path fill="currentColor" d="m54.532 138.45 2.235 1.324c9.387 5.571 20.15 8.518 31.126 8.523h.023c33.707 0 61.139-27.426 61.153-61.135.006-16.335-6.349-31.696-17.895-43.251A60.75 60.75 0 0 0 87.94 25.983c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.312-6.179 22.558zm-40.811 23.544L24.16 123.88c-6.438-11.154-9.825-23.808-9.821-36.772.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954zm0 0" filter="url(#wa_blur_modal)"/>
    <path fill="var(--background, #fff)" d="m12.966 161.238 10.439-38.114a73.42 73.42 0 0 1-9.821-36.772c.017-40.556 33.021-73.55 73.578-73.55 19.681.01 38.154 7.669 52.047 21.572s21.537 32.383 21.53 52.037c-.018 40.553-33.027 73.553-73.578 73.553h-.032c-12.313-.005-24.412-3.094-35.159-8.954z"/>
    <path fill="url(#wa_grad_modal)" d="M87.184 25.227c-33.733 0-61.166 27.423-61.178 61.13a60.98 60.98 0 0 0 9.349 32.535l1.455 2.313-6.179 22.558 23.146-6.069 2.235 1.324c9.387 5.571 20.15 8.517 31.126 8.523h.023c33.707 0 61.14-27.426 61.153-61.135a60.75 60.75 0 0 0-17.895-43.251 60.75 60.75 0 0 0-43.235-17.928z"/>
    <path fill="var(--background, #fff)" fillRule="evenodd" d="M68.772 55.603c-1.378-3.061-2.828-3.123-4.137-3.176l-3.524-.043c-1.226 0-3.218.46-4.902 2.3s-6.435 6.287-6.435 15.332 6.588 17.785 7.506 19.013 12.718 20.381 31.405 27.75c15.529 6.124 18.689 4.906 22.061 4.6s10.877-4.447 12.408-8.74 1.532-7.971 1.073-8.74-1.685-1.226-3.525-2.146-10.877-5.367-12.562-5.981-2.91-.919-4.137.921-4.746 5.979-5.819 7.206-2.144 1.381-3.984.462-7.76-2.861-14.784-9.124c-5.465-4.873-9.154-10.891-10.228-12.73s-.114-2.835.808-3.751c.825-.824 1.838-2.147 2.759-3.22s1.224-1.84 1.836-3.065.307-2.301-.153-3.22-4.032-10.011-5.666-13.647"/>
  </svg>
);

const channels = [
  {
    name: 'Private Client Concierge',
    number: '919830000000',
    subtitle: 'Residential commissions & private design consultations',
    icon: ShieldCheck,
    badge: 'VIP Concierge',
    color: 'from-accent/20 to-primary/10',
    hoverGlow: 'hover:shadow-accent/15',
  },
  {
    name: 'Lead Architect & Studio Director',
    number: '919830000001',
    subtitle: 'Major architectural renovations & commercial briefs',
    icon: MapPin,
    badge: 'Studio Director',
    color: 'from-primary/20 to-accent/10',
    hoverGlow: 'hover:shadow-primary/15',
    isManager: true,
  },
  {
    name: 'Studio Email Inquiries',
    email: 'concierge@dainteriors.com',
    subtitle: 'Press, architectural portfolios & official requests',
    icon: Mail,
    badge: 'Direct Email',
    color: 'from-accent/15 to-primary/10',
    hoverGlow: 'hover:shadow-accent/15',
    isEmail: true,
  },
];

export function WhatsAppModal() {
  const { isWhatsAppOpen, closeWhatsApp } = useBooking();

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isWhatsAppOpen) {
        closeWhatsApp();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWhatsAppOpen, closeWhatsApp]);

  // Lock scroll
  useEffect(() => {
    if (isWhatsAppOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isWhatsAppOpen]);

  return (
    <AnimatePresence>
      {isWhatsAppOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWhatsApp}
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
          />

          {/* Dialog Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', stiffness: 280, damping: 25 }}
            className="relative w-full max-w-lg bg-card border border-border/40 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl overflow-hidden z-10"
          >
            {/* Background Gradients */}
            <div className="absolute -top-12 -right-12 w-40 h-40 bg-primary/10 rounded-full blur-[40px] pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-accent/8 rounded-full blur-[40px] pointer-events-none" />

            {/* Header */}
            <div className="flex items-start justify-between mb-6 relative z-10">
              <div className="flex-1 pr-6 text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/10 text-[#23b33a] text-[11px] font-bold uppercase tracking-wider mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
                  Live Concierge Chat
                </div>
                <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-foreground tracking-tight leading-snug">
                  DA Interiors Concierge
                </h3>
                <h4 className="text-sm font-medium text-muted-foreground mt-0.5 font-heading">
                  Bespoke Interior Consultations & Private Commissions
                </h4>
              </div>
              <button
                onClick={closeWhatsApp}
                className="w-10 h-10 rounded-full border border-border/50 bg-card hover:bg-muted text-muted-foreground hover:text-foreground flex items-center justify-center transition-all cursor-pointer shadow-sm hover:scale-105 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Options List */}
            <div className="space-y-3.5 relative z-10">
              {channels.map((chan) => (
                <a
                  key={chan.isEmail ? chan.email : chan.number}
                  href={chan.isEmail ? `mailto:${chan.email}` : `https://wa.me/${chan.number}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeWhatsApp}
                  className={`group relative flex items-start gap-4 p-4 rounded-2xl border border-border/40 bg-card transition-all duration-300 hover:border-primary/20 ${chan.hoverGlow} hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 text-left`}
                >
                  {/* Subtle Gradient Accent */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${chan.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`} />

                  {/* Icon */}
                  <div className={`w-11 h-11 rounded-xl bg-primary/10 border border-primary/15 flex items-center justify-center shrink-0 text-primary group-hover:scale-110 transition-all duration-300 ${
                    chan.isEmail
                      ? 'group-hover:bg-blue-500/10 group-hover:text-blue-500 group-hover:border-blue-500/20'
                      : 'group-hover:bg-[#25D366]/10 group-hover:text-[#23b33a] group-hover:border-[#25D366]/20'
                  }`}>
                    <chan.icon className="w-5 h-5" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 pr-2">
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-bold text-foreground text-sm group-hover:text-primary transition-colors block truncate">
                        {chan.name}
                      </span>
                      <span className="text-[10px] font-bold text-primary bg-primary/8 px-2 py-0.5 rounded-full shrink-0 uppercase tracking-wide">
                        {chan.badge}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground leading-relaxed block group-hover:text-foreground/80 transition-colors">
                      {chan.subtitle}
                    </span>
                  </div>

                  {/* Arrow Icon */}
                  <div className={`self-center text-muted-foreground group-hover:translate-x-1 transition-all duration-300 ${
                    chan.isEmail ? 'group-hover:text-blue-500' : 'group-hover:text-[#23b33a]'
                  }`}>
                    {chan.isEmail ? (
                      <Mail className="w-4.5 h-4.5 flex-shrink-0" />
                    ) : (
                      <WhatsAppIcon className="w-4.5 h-4.5 flex-shrink-0" />
                    )}
                  </div>
                </a>
              ))}
            </div>

            {/* Footer note */}
            <div className="mt-6 pt-4 border-t border-border/40 text-center relative z-10 flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium">
              <Heart className="w-3.5 h-3.5 text-primary fill-primary/20" />
              <span>DA Interiors • Bespoke Architectural Living</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
