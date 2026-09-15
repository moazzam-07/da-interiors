'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ArrowLeft, ArrowRight, Check, Sparkles, Building2,
  Home, Castle, Compass, Layers, ShieldCheck,
  CheckCircle2, Sliders, MapPin, Phone, User, Calendar
} from 'lucide-react';
import { useBooking } from '@/components/booking/BookingProvider';
import {
  HOME_CONFIGURATIONS,
  SCOPES_OF_WORK,
  MATERIAL_TIERS,
  KOLKATA_LOCALITIES,
  TIMELINE_OPTIONS,
  calculateEstimate,
  formatINR,
  buildWhatsAppEstimateUrl,
  type LeadSubmissionData
} from '@/lib/estimator-data';

export function CostEstimatorModal() {
  const { isEstimatorOpen, closeEstimator } = useBooking();

  // Wizard state
  const [step, setStep] = useState<number>(1);
  const [selectedConfigId, setSelectedConfigId] = useState<string>('3bhk');
  const [selectedScopeId, setSelectedScopeId] = useState<string>('full-home');
  const [selectedTierId, setSelectedTierId] = useState<string>('signature');
  const [sqft, setSqft] = useState<number>(1650);

  // Form state
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [locality, setLocality] = useState<string>(KOLKATA_LOCALITIES[0]);
  const [timeline, setTimeline] = useState<string>(TIMELINE_OPTIONS[1]);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  // Update default sqft when config changes if user hasn't heavily customized
  const handleSelectConfig = (configId: string) => {
    setSelectedConfigId(configId);
    const cfg = HOME_CONFIGURATIONS.find((c) => c.id === configId);
    if (cfg) {
      setSqft(cfg.defaultSqft);
    }
  };

  // Real-time calculation
  const estimate = useMemo(() => {
    return calculateEstimate(sqft, selectedScopeId, selectedTierId);
  }, [sqft, selectedScopeId, selectedTierId]);

  const selectedConfig = HOME_CONFIGURATIONS.find((c) => c.id === selectedConfigId)!;
  const selectedScope = SCOPES_OF_WORK.find((s) => s.id === selectedScopeId)!;
  const selectedTier = MATERIAL_TIERS.find((t) => t.id === selectedTierId)!;

  // Reset or initialize on open
  useEffect(() => {
    if (isEstimatorOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isEstimatorOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isEstimatorOpen) {
        closeEstimator();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEstimatorOpen, closeEstimator]);

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!name.trim()) {
      setFormError('Please provide your name.');
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit WhatsApp number.');
      return;
    }

    const submission: LeadSubmissionData = {
      name,
      phone: cleanPhone,
      locality,
      timeline,
      config: selectedConfig.name,
      scope: selectedScope.name,
      tier: selectedTier.name,
      sqft,
      minLakhs: estimate.minCostLakhs,
      maxLakhs: estimate.maxCostLakhs,
    };

    const ownerPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919830000000';
    const waUrl = buildWhatsAppEstimateUrl(submission, ownerPhone);

    setFormSubmitted(true);

    // Redirect to WhatsApp
    if (typeof window !== 'undefined') {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  };

  if (!isEstimatorOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeEstimator}
          className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-3xl rounded-[2rem] border border-border/80 bg-surface-container-lowest/95 backdrop-blur-xl shadow-2xl shadow-accent/10 overflow-hidden z-10 flex flex-col max-h-[92vh]"
        >
          {/* Top Decorative Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-accent via-primary to-accent" />

          {/* Modal Header */}
          <div className="flex items-center justify-between px-6 py-5 border-b border-border/70 bg-surface-container-low/50">
            <div className="flex items-center gap-3">
              {step > 1 && !formSubmitted && (
                <button
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  className="p-1.5 rounded-full hover:bg-surface-container text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title="Previous Step"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container border border-accent/30 text-[10px] font-bold uppercase tracking-widest text-accent mb-0.5">
                  <Sparkles className="w-3 h-3 text-accent" />
                  <span>Interactive Interior Estimator</span>
                </div>
                <h3 className="text-base sm:text-lg font-bold font-heading text-foreground">
                  {step === 1 && 'Step 1: Choose Home Typology'}
                  {step === 2 && 'Step 2: Define Project Scope'}
                  {step === 3 && 'Step 3: Select Material & Finish Tier'}
                  {step === 4 && 'Step 4: Fine-tune Carpet Area & Live Estimate'}
                  {step === 5 && 'Final Step: Unlock Full Itemized Estimate'}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Step indicator */}
              <div className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                <span className="text-accent font-bold">0{step}</span>
                <span>/</span>
                <span>05</span>
              </div>

              {/* Close Button */}
              <button
                onClick={closeEstimator}
                className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Configuration Status Bar (No premature amounts) */}
          {step < 5 && (
            <div className="px-6 py-2.5 bg-gradient-to-r from-accent/10 via-surface-container-low to-primary/10 border-b border-border/60 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground font-medium">Selected Parameters:</span>
                <span className="font-bold text-foreground text-xs sm:text-sm font-heading tracking-tight">
                  {selectedConfig.name} • {sqft.toLocaleString('en-IN')} sq.ft
                </span>
              </div>
              <span className="text-[11px] text-accent font-semibold hidden md:inline-block">
                {selectedScope.name} • {selectedTier.name}
              </span>
            </div>
          )}

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {/* ─── STEP 1: HOME CONFIGURATION ─── */}
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Select your property layout to calibrate base dimensions and architectural floor allowances.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {HOME_CONFIGURATIONS.map((cfg) => {
                    const isSelected = selectedConfigId === cfg.id;
                    const Icon = cfg.id === 'villa' ? Castle : cfg.id === 'penthouse' ? Building2 : Home;

                    return (
                      <button
                        key={cfg.id}
                        type="button"
                        onClick={() => handleSelectConfig(cfg.id)}
                        className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-accent/10 border-accent shadow-md shadow-accent/5 ring-1 ring-accent'
                            : 'bg-card border-border/70 hover:border-accent/40 hover:bg-surface-container-low'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isSelected ? 'bg-accent text-white' : 'bg-surface-container text-muted-foreground'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-baseline justify-between gap-2">
                            <h4 className="text-base font-bold font-heading text-foreground">{cfg.name}</h4>
                            <span className="text-[11px] font-semibold text-accent">~{cfg.defaultSqft} sq.ft</span>
                          </div>
                          <p className="text-xs text-muted-foreground/80 mt-1 line-clamp-2 leading-relaxed font-normal">
                            {cfg.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─── STEP 2: SCOPE OF WORK ─── */}
            {step === 2 && (
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Which areas of your residence are included in this commission brief?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                  {SCOPES_OF_WORK.map((scope) => {
                    const isSelected = selectedScopeId === scope.id;

                    return (
                      <button
                        key={scope.id}
                        type="button"
                        onClick={() => setSelectedScopeId(scope.id)}
                        className={`p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-accent/10 border-accent shadow-md shadow-accent/5 ring-1 ring-accent'
                            : 'bg-card border-border/70 hover:border-accent/40 hover:bg-surface-container-low'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <h4 className="text-base font-bold font-heading text-foreground">{scope.name}</h4>
                            {scope.popular && (
                              <span className="px-2 py-0.5 rounded-full bg-accent text-[9px] font-extrabold uppercase tracking-widest text-white">
                                Recommended
                              </span>
                            )}
                          </div>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center shrink-0">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed font-normal">
                          {scope.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─── STEP 3: MATERIAL & QUALITY TIER ─── */}
            {step === 3 && (
              <div className="space-y-4">
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Compare core raw materials, surface finishes, and European mechanism grades.
                </p>

                <div className="space-y-3.5 pt-2">
                  {MATERIAL_TIERS.map((tier) => {
                    const isSelected = selectedTierId === tier.id;

                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedTierId(tier.id)}
                        className={`w-full p-5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? 'bg-accent/10 border-accent shadow-md shadow-accent/5 ring-1 ring-accent'
                            : 'bg-card border-border/70 hover:border-accent/40 hover:bg-surface-container-low'
                        }`}
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2.5">
                            <h4 className="text-lg font-extrabold font-heading text-foreground">{tier.name}</h4>
                            {tier.badge && (
                              <span className="px-2.5 py-0.5 rounded-full bg-accent text-[10px] font-extrabold uppercase tracking-widest text-white">
                                {tier.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-xs font-semibold text-accent uppercase tracking-wider bg-surface-container px-3 py-1 rounded-full border border-accent/30">
                            {tier.id === 'essential' && 'Standard Specification'}
                            {tier.id === 'signature' && 'Architectural Grade'}
                            {tier.id === 'ultra-luxe' && 'Artisan Bespoke'}
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground mb-4">{tier.tagline}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs mb-3 text-muted-foreground">
                          <div><strong>Core:</strong> {tier.coreMaterial}</div>
                          <div><strong>Surfaces:</strong> {tier.surfaceFinish}</div>
                          <div><strong>Hardware:</strong> {tier.hardware}</div>
                          <div><strong>Lighting:</strong> {tier.lighting}</div>
                        </div>

                        <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                          {tier.highlights.map((h, i) => (
                            <span key={i} className="inline-flex items-center gap-1 text-[11px] text-foreground/80 bg-surface-container px-2.5 py-1 rounded-md">
                              <CheckCircle2 className="w-3 h-3 text-accent shrink-0" />
                              <span>{h}</span>
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─── STEP 4: CARPET AREA & ESTIMATE CALIBRATION ─── */}
            {step === 4 && (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-bold font-heading text-foreground">
                      Carpet Area (Square Feet)
                    </label>
                    <div className="flex items-center gap-2">
                      <span className="text-xl sm:text-2xl font-black font-heading text-accent">
                        {sqft.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-muted-foreground uppercase font-bold">sq.ft</span>
                    </div>
                  </div>

                  {/* Slider */}
                  <input
                    type="range"
                    min="600"
                    max="6000"
                    step="50"
                    value={sqft}
                    onChange={(e) => setSqft(Number(e.target.value))}
                    className="w-full h-2.5 bg-surface-container rounded-lg appearance-none cursor-pointer accent-accent"
                  />

                  {/* Quick Preset Buttons */}
                  <div className="flex flex-wrap gap-2 mt-3.5">
                    {[1000, 1400, 1850, 2400, 3200, 4500].map((preset) => (
                      <button
                        key={preset}
                        type="button"
                        onClick={() => setSqft(preset)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                          sqft === preset
                            ? 'bg-accent text-white'
                            : 'bg-surface-container hover:bg-surface-container-high text-muted-foreground border border-border/60'
                        }`}
                      >
                        {preset} sq.ft
                      </button>
                    ))}
                  </div>
                </div>

                {/* Specification Summary Card (No premature price numbers) */}
                <div className="p-6 rounded-2xl border border-accent/40 bg-gradient-to-br from-surface-container-low via-background to-surface-container-low shadow-xl shadow-accent/5 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-accent block mb-1">
                        Custom Project Specification Configured
                      </span>
                      <div className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground tracking-tight">
                        Estimate Ready for {selectedConfig.name}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {sqft.toLocaleString('en-IN')} sq.ft • {selectedTier.name} • {selectedScope.name}
                      </p>
                    </div>
                    <span className="px-3 py-1.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/30">
                      ✓ Calculation Complete
                    </span>
                  </div>

                  {/* Component Breakdown Bars */}
                  <div className="pt-4 border-t border-border/70 space-y-2.5">
                    <span className="text-xs font-bold text-foreground block">
                      Architectural Allocation Weightage:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div className="p-3 rounded-xl bg-surface-container border border-border/60">
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Joinery & Modular</span>
                        <span className="text-sm font-bold text-foreground font-heading">42%</span>
                      </div>
                      <div className="p-3 rounded-xl bg-surface-container border border-border/60">
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Stone & Surfaces</span>
                        <span className="text-sm font-bold text-foreground font-heading">28%</span>
                      </div>
                      <div className="p-3 rounded-xl bg-surface-container border border-border/60">
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Lighting & Electrics</span>
                        <span className="text-sm font-bold text-foreground font-heading">15%</span>
                      </div>
                      <div className="p-3 rounded-xl bg-surface-container border border-border/60">
                        <span className="text-muted-foreground block text-[10px] uppercase font-bold">Hardware & Oversight</span>
                        <span className="text-sm font-bold text-foreground font-heading">15%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 5: GATED REVEAL & WHATSAPP REDIRECT ─── */}
            {step === 5 && (
              <div className="space-y-6">
                {!formSubmitted ? (
                  <form onSubmit={handleWhatsAppSubmit} className="space-y-5">
                    {/* Summary Header Card */}
                    <div className="p-5 rounded-2xl bg-accent/10 border border-accent/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-widest text-accent block mb-0.5">
                          Personalized Blueprint &amp; Quotation
                        </span>
                        <h4 className="text-xl sm:text-2xl font-extrabold font-heading text-foreground">
                          {selectedConfig.name} • {sqft.toLocaleString('en-IN')} sq.ft
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {selectedTier.name} • {selectedScope.name}
                        </p>
                      </div>
                      <div className="hidden sm:block text-right">
                        <span className="text-[11px] font-bold text-muted-foreground uppercase">Protection</span>
                        <p className="text-xs font-semibold text-foreground">10-Year Warranty &amp; Site Stewardship</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-sm font-bold font-heading text-foreground">
                        Where should we send your itemized room-by-room quotation?
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        Instant calculation delivered straight to your WhatsApp. Connect directly with our Lead Architect.
                      </p>
                    </div>

                    {formError && (
                      <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-medium">
                        {formError}
                      </div>
                    )}

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                          Your Full Name *
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            required
                            placeholder="e.g. S. Banerjee"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container border border-border/80 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent text-sm text-foreground placeholder:text-muted-foreground/60 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                          WhatsApp Number *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            placeholder="+91 98300 XXXXX"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface-container border border-border/80 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent text-sm text-foreground placeholder:text-muted-foreground/60 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                          Kolkata Project Locality *
                        </label>
                        <div className="relative">
                          <MapPin className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <select
                            value={locality}
                            onChange={(e) => setLocality(e.target.value)}
                            className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-surface-container border border-border/80 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent text-sm text-foreground cursor-pointer transition-all"
                          >
                            {KOLKATA_LOCALITIES.map((loc) => (
                              <option key={loc} value={loc}>
                                {loc}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1.5">
                          Expected Timeline
                        </label>
                        <div className="relative">
                          <Calendar className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <select
                            value={timeline}
                            onChange={(e) => setTimeline(e.target.value)}
                            className="w-full pl-10 pr-8 py-2.5 rounded-xl bg-surface-container border border-border/80 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent text-sm text-foreground cursor-pointer transition-all"
                          >
                            {TIMELINE_OPTIONS.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2.5 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-sm tracking-wide uppercase shadow-xl hover:bg-primary/90 transition-all cursor-pointer"
                    >
                      <span>Unlock Itemized Breakdown & Send to WhatsApp</span>
                      <ArrowRight className="w-4 h-4 text-accent" />
                    </button>
                  </form>
                ) : (
                  /* Post-Submission Screen */
                  <div className="text-center py-8 space-y-5">
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto">
                      <Check className="w-8 h-8" />
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-2xl font-extrabold font-heading text-foreground">
                        Estimate Ready &amp; Sent!
                      </h4>
                      <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed font-normal">
                        Your custom interior specification for your <strong className="text-foreground">{selectedConfig.name} ({sqft.toLocaleString('en-IN')} sq.ft)</strong> has been prepared. If WhatsApp didn&apos;t open automatically, click the button below to connect directly with our Lead Architect.
                      </p>
                    </div>

                    <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          const ownerPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919830000000';
                          const waUrl = buildWhatsAppEstimateUrl(
                            {
                              name,
                              phone,
                              locality,
                              timeline,
                              config: selectedConfig.name,
                              scope: selectedScope.name,
                              tier: selectedTier.name,
                              sqft,
                              minLakhs: estimate.minCostLakhs,
                              maxLakhs: estimate.maxCostLakhs,
                            },
                            ownerPhone
                          );
                          window.open(waUrl, '_blank', 'noopener,noreferrer');
                        }}
                        className="px-6 py-3 rounded-full bg-[#25D366] text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#20ba59] transition-all cursor-pointer shadow-lg"
                      >
                        <span>Open in WhatsApp</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={closeEstimator}
                        className="px-6 py-3 rounded-full bg-surface-container text-foreground font-semibold text-xs uppercase tracking-wider hover:bg-surface-container-high transition-all cursor-pointer"
                      >
                        Close Window
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Modal Footer (Controls for Steps 1-4) */}
          {step < 5 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-border/70 bg-surface-container-low/40">
              <button
                type="button"
                onClick={closeEstimator}
                className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => setStep((s) => Math.min(5, s + 1))}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-all cursor-pointer shadow-md"
              >
                <span>{step === 4 ? 'View Detailed Estimate' : 'Next Step'}</span>
                <ArrowRight className="w-3.5 h-3.5 text-accent" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
