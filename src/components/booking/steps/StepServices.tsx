'use client';

import { motion } from 'framer-motion';
import { useBooking } from '../BookingProvider';
import { CheckCircle } from 'lucide-react';
import {
  House, Sparkles, Droplet, Hammer, Camera,
  Lightbulb, Compass, Award,
} from 'lucide-react';

const services = [
  { id: 'residential-architecture', name: 'Residential Architecture', icon: House, duration: 'Full Residence' },
  { id: 'bespoke-styling', name: 'Bespoke Interior Styling', icon: Sparkles, duration: 'Curation' },
  { id: 'kitchen-bath', name: 'Kitchen & Master Bath', icon: Droplet, duration: 'Sanctuary' },
  { id: 'hospitality-commercial', name: 'Hospitality & Commercial', icon: Award, duration: 'Boutique' },
  { id: 'custom-millwork', name: 'Custom Millwork & Joinery', icon: Hammer, duration: 'Bespoke' },
  { id: '3d-visualization', name: '3D Photoreal Renders & VR', icon: Camera, duration: 'Digital Twin' },
  { id: 'lighting-acoustics', name: 'Architectural Lighting', icon: Lightbulb, duration: 'Atmospheric' },
  { id: 'turnkey-stewardship', name: 'Turnkey Project Stewardship', icon: Compass, duration: 'White-Glove' },
];

export function StepServices() {
  const { state, dispatch, nextStep } = useBooking();
  const selected = state.selectedServices;

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      className="flex flex-col h-full"
    >
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-heading font-extrabold tracking-tight text-foreground">
          What is your project scope?
        </h2>
        <p className="text-muted-foreground mt-2 text-sm font-normal">
          Select one or more disciplines you wish to explore during your consultation.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
        {services.map((svc, i) => {
          const isSelected = selected.includes(svc.id);
          return (
            <motion.button
              key={svc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, type: 'spring', stiffness: 200, damping: 25 }}
              onClick={() => dispatch({ type: 'TOGGLE_SERVICE', payload: svc.id })}
              className={`relative flex flex-col items-center justify-between p-4 rounded-2xl border text-center transition-all duration-300 cursor-pointer select-none active:scale-[0.97] ${
                isSelected
                  ? 'border-accent bg-accent/10 shadow-md shadow-accent/5 ring-1 ring-accent'
                  : 'border-border/60 bg-surface-container-low hover:border-accent/40'
              }`}
            >
              {isSelected && (
                <CheckCircle className="absolute top-2.5 right-2.5 w-4 h-4 text-accent fill-accent/20" />
              )}
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center mb-2 transition-colors ${
                  isSelected ? 'bg-accent/20 text-accent' : 'bg-background text-foreground/80'
                }`}
              >
                <svc.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-foreground leading-snug">{svc.name}</p>
                <p className="text-[11px] text-muted-foreground mt-1">{svc.duration}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <div className="pt-6 mt-4 border-t border-border/50 flex justify-end">
        <button
          disabled={selected.length === 0}
          onClick={nextStep}
          className={`px-8 py-3 rounded-full font-bold text-sm transition-all duration-300 cursor-pointer ${
            selected.length > 0
              ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-accent/10'
              : 'bg-muted text-muted-foreground cursor-not-allowed opacity-50'
          }`}
        >
          Continue to Consultation Date
        </button>
      </div>
    </motion.div>
  );
}
