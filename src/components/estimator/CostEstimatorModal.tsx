'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, ArrowLeft, ArrowRight, Check, Sparkles, Building2,
  Home, Castle, ShieldCheck,
  CheckCircle2, MapPin, Phone, User, Calendar,
  Briefcase, Maximize2
} from 'lucide-react';
import { useBooking } from '@/components/booking/BookingProvider';
import {
  HOME_CONFIGURATIONS,
  getScopesForConfig,
  MATERIAL_TIERS,
  KOLKATA_LOCALITIES,
  TIMELINE_OPTIONS,
  calculateEstimate,
  buildWhatsAppEstimateUrl,
  type LeadSubmissionData
} from '@/lib/estimator-data';

export function CostEstimatorModal() {
  const { isEstimatorOpen, closeEstimator } = useBooking();

  // Wizard state: Step 1 (Space Type) -> Step 2 (Area) -> Step 3 (Work Scope) -> Step 4 (Quality) -> Step 5 (WhatsApp)
  const [step, setStep] = useState<number>(1);
  const [selectedConfigId, setSelectedConfigId] = useState<string>('3bhk');
  const [selectedScopeId, setSelectedScopeId] = useState<string>('mid-turnkey');
  const [selectedTierId, setSelectedTierId] = useState<string>('signature');
  const [sqft, setSqft] = useState<number>(1650);

  // Form state
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [locality, setLocality] = useState<string>(KOLKATA_LOCALITIES[0]);
  const [timeline, setTimeline] = useState<string>(TIMELINE_OPTIONS[1]);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formError, setFormError] = useState<string>('');

  const selectedConfig = useMemo(() => {
    return HOME_CONFIGURATIONS.find((c) => c.id === selectedConfigId) || HOME_CONFIGURATIONS[3];
  }, [selectedConfigId]);

  const availableScopes = useMemo(() => {
    return getScopesForConfig(selectedConfigId);
  }, [selectedConfigId]);

  const selectedScope = useMemo(() => {
    return availableScopes.find((s) => s.id === selectedScopeId) || availableScopes[0];
  }, [availableScopes, selectedScopeId]);

  const selectedTier = useMemo(() => {
    return MATERIAL_TIERS.find((t) => t.id === selectedTierId) || MATERIAL_TIERS[1];
  }, [selectedTierId]);

  // Handle Space Type Selection
  const handleSelectConfig = (configId: string) => {
    setSelectedConfigId(configId);
    const cfg = HOME_CONFIGURATIONS.find((c) => c.id === configId);
    if (cfg) {
      setSqft(cfg.defaultSqft);
      const newScopes = getScopesForConfig(cfg.id);
      if (!newScopes.some((s) => s.id === selectedScopeId)) {
        setSelectedScopeId(newScopes[0].id);
      }
    }
  };

  // Real-time calculation for WhatsApp output
  const estimate = useMemo(() => {
    return calculateEstimate(sqft, selectedScope.id, selectedTier.id);
  }, [sqft, selectedScope.id, selectedTier.id]);

  // Reset body overflow on open/close
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
      setFormError('Please enter your full name.');
      return;
    }

    const cleanPhone = phone.replace(/[^0-9]/g, '');
    if (cleanPhone.length < 10) {
      setFormError('Please enter a valid 10-digit mobile number.');
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

  const getTypologyIcon = (id: string) => {
    switch (id) {
      case 'commercial':
        return Briefcase;
      case 'villa':
        return Castle;
      case 'penthouse':
      case '4bhk':
        return Building2;
      case 'studio':
        return Sparkles;
      default:
        return Home;
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-2.5 sm:p-6 overflow-y-auto">
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
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative w-full max-w-3xl rounded-2xl sm:rounded-[2rem] border border-border/80 bg-surface-container-lowest/98 backdrop-blur-xl shadow-2xl shadow-accent/10 overflow-hidden z-10 flex flex-col max-h-[92dvh] sm:max-h-[88vh]"
        >
          {/* Top Decorative Bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-accent via-primary to-accent shrink-0" />

          {/* Modal Header */}
          <div className="flex items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4 border-b border-border/70 bg-surface-container-low/60 shrink-0">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 pr-2">
              {step > 1 && !formSubmitted && (
                <button
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  className="p-1.5 rounded-full hover:bg-surface-container text-muted-foreground hover:text-foreground transition-colors cursor-pointer shrink-0"
                  title="Previous Step"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
              <div className="min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container border border-accent/30 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-accent mb-0.5">
                  <Sparkles className="w-3 h-3 text-accent shrink-0" />
                  <span className="truncate">Free Cost Estimator</span>
                </div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold font-heading text-foreground truncate">
                  {step === 1 && 'Step 1: Choose Your Space Type'}
                  {step === 2 && 'Step 2: Approximate Area (sq.ft)'}
                  {step === 3 && 'Step 3: What Do You Want Designed?'}
                  {step === 4 && 'Step 4: Choose Quality Level'}
                  {step === 5 && 'Final Step: Get Your Free Estimate'}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
              {/* Step indicator */}
              <div className="flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-muted-foreground bg-surface-container px-2 py-1 rounded-full border border-border/60">
                <span className="text-accent font-bold">0{step}</span>
                <span>/</span>
                <span>05</span>
              </div>

              {/* Close Button */}
              <button
                onClick={closeEstimator}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-surface-container hover:bg-surface-container-high border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Configuration Status Tracker */}
          {step < 5 && (
            <div className="px-4 py-2 sm:px-6 sm:py-2.5 bg-gradient-to-r from-accent/10 via-surface-container-low to-primary/10 border-b border-border/60 flex items-center justify-between text-[11px] sm:text-xs shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2 truncate">
                <span className="text-muted-foreground font-medium shrink-0">Selected:</span>
                <span className="font-bold text-foreground font-heading tracking-tight truncate">
                  {step === 1 ? selectedConfig.name : `${selectedConfig.name} • ~${sqft.toLocaleString('en-IN')} sq.ft`}
                </span>
              </div>
              <span className="text-[10px] sm:text-[11px] text-accent font-semibold hidden xs:inline-block shrink-0 ml-2 truncate">
                {step === 1 && selectedConfig.label}
                {step === 2 && 'Approximate Size'}
                {step === 3 && selectedScope.name}
                {step === 4 && `${selectedScope.name} • ${selectedTier.name}`}
              </span>
            </div>
          )}

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6 overscroll-contain">
            {/* ─── STEP 1: CHOOSE SPACE TYPE ─── */}
            {step === 1 && (
              <div className="space-y-3.5">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Select your home or commercial property. In the next step, you can enter your approximate size.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 pt-1">
                  {HOME_CONFIGURATIONS.map((cfg) => {
                    const isSelected = selectedConfigId === cfg.id;
                    const Icon = getTypologyIcon(cfg.id);

                    return (
                      <button
                        key={cfg.id}
                        type="button"
                        onClick={() => handleSelectConfig(cfg.id)}
                        className={`p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-accent/10 border-accent shadow-md shadow-accent/5 ring-1 ring-accent'
                            : 'bg-card border-border/70 hover:border-accent/40 hover:bg-surface-container-low active:bg-surface-container'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center ${
                              isSelected
                                ? 'bg-accent text-white'
                                : 'bg-surface-container text-muted-foreground'
                            }`}
                          >
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                          </div>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <div>
                          <div className="flex items-baseline justify-between gap-2">
                            <h4 className="text-sm sm:text-base font-bold font-heading text-foreground">
                              {cfg.name}
                            </h4>
                            <span className="text-[9px] sm:text-[10px] uppercase font-bold text-accent tracking-wider">
                              {cfg.category === 'commercial' ? 'Commercial' : cfg.category === 'villa' ? 'Bungalow' : 'Home'}
                            </span>
                          </div>
                          <p className="text-[11px] sm:text-xs text-muted-foreground/80 mt-1 line-clamp-2 leading-relaxed font-normal">
                            {cfg.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─── STEP 2: APPROXIMATE AREA ─── */}
            {step === 2 && (
              <div className="space-y-4 sm:space-y-6">
                <div>
                  <div className="flex flex-col xs:flex-row xs:items-baseline justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-sm sm:text-base md:text-lg font-bold font-heading text-foreground">
                        Roughly how big is your space?
                      </h4>
                      <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                        Give an approximate size in square feet (starts from 200 sq.ft).
                      </p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl sm:rounded-2xl bg-surface-container border border-accent/30 shrink-0 self-start xs:self-auto">
                      <span className="text-xl sm:text-2xl md:text-3xl font-black font-heading text-accent">
                        {sqft.toLocaleString('en-IN')}
                      </span>
                      <span className="text-xs text-muted-foreground font-bold uppercase">sq.ft</span>
                    </div>
                  </div>

                  {/* Responsive Slider */}
                  <div className="py-3 sm:py-4">
                    <input
                      type="range"
                      min={Math.max(200, selectedConfig.minSqft)}
                      max={selectedConfig.maxSqft}
                      step={selectedConfig.sqftStep}
                      value={sqft}
                      onChange={(e) => setSqft(Number(e.target.value))}
                      className="w-full h-3 bg-surface-container rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                    <div className="flex justify-between text-[11px] text-muted-foreground font-medium mt-1.5">
                      <span>Min: {Math.max(200, selectedConfig.minSqft).toLocaleString('en-IN')} sq.ft</span>
                      <span>Max: {selectedConfig.maxSqft.toLocaleString('en-IN')}+ sq.ft</span>
                    </div>
                  </div>

                  {/* Quick Preset Buttons */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] sm:text-xs font-semibold text-muted-foreground block">
                      Common Sizes:
                    </span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {selectedConfig.sqftPresets.map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setSqft(preset)}
                          className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                            sqft === preset
                              ? 'bg-accent text-white shadow-md shadow-accent/20 scale-105 ring-2 ring-accent/30'
                              : 'bg-surface-container hover:bg-surface-container-high text-muted-foreground border border-border/70 hover:text-foreground'
                          }`}
                        >
                          ~{preset.toLocaleString('en-IN')} sq.ft
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Manual Exact Input */}
                  <div className="mt-5 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-surface-container-low border border-border/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Maximize2 className="w-4 h-4 text-accent shrink-0" />
                      <span className="text-xs text-muted-foreground">Know your exact floor size?</span>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <input
                        type="number"
                        min={200}
                        max={50000}
                        value={sqft}
                        onChange={(e) => {
                          const val = Number(e.target.value);
                          if (val >= 0) setSqft(val);
                        }}
                        className="w-28 px-3 py-1.5 rounded-xl bg-background border border-border text-foreground text-xs sm:text-sm font-bold text-center focus:outline-none focus:border-accent"
                      />
                      <span className="text-xs font-bold text-muted-foreground">sq.ft</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 3: WHAT DO YOU WANT DESIGNED? ─── */}
            {step === 3 && (
              <div className="space-y-3.5 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Which parts of your space do you want us to design?
                  </p>
                  <span className="text-[10px] sm:text-[11px] font-bold text-accent uppercase tracking-wider hidden sm:inline-block shrink-0 ml-2">
                    {selectedConfig.name}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5 pt-1">
                  {availableScopes.map((scope) => {
                    const isSelected = selectedScope.id === scope.id;

                    return (
                      <button
                        key={scope.id}
                        type="button"
                        onClick={() => setSelectedScopeId(scope.id)}
                        className={`p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-accent/10 border-accent shadow-md shadow-accent/5 ring-1 ring-accent'
                            : 'bg-card border-border/70 hover:border-accent/40 hover:bg-surface-container-low active:bg-surface-container'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2 sm:mb-3">
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm sm:text-base font-bold font-heading text-foreground">{scope.name}</h4>
                            {scope.popular && (
                              <span className="px-2 py-0.5 rounded-full bg-accent text-[8px] sm:text-[9px] font-extrabold uppercase tracking-widest text-white">
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
                        <p className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed font-normal">
                          {scope.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─── STEP 4: CHOOSE QUALITY LEVEL ─── */}
            {step === 4 && (
              <div className="space-y-4 sm:space-y-5">
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  Select the quality level that fits your budget and design taste.
                </p>

                <div className="space-y-3 pt-1">
                  {MATERIAL_TIERS.map((tier) => {
                    const isSelected = selectedTier.id === tier.id;

                    return (
                      <button
                        key={tier.id}
                        type="button"
                        onClick={() => setSelectedTierId(tier.id)}
                        className={`w-full p-4 sm:p-5 rounded-xl sm:rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                          isSelected
                            ? 'bg-accent/10 border-accent shadow-md shadow-accent/5 ring-1 ring-accent'
                            : 'bg-card border-border/70 hover:border-accent/40 hover:bg-surface-container-low'
                        }`}
                      >
                        <div className="flex flex-col xs:flex-row xs:items-center justify-between gap-1.5 sm:gap-2 mb-2 sm:mb-2.5">
                          <div className="flex items-center gap-2">
                            <h4 className="text-base sm:text-lg font-extrabold font-heading text-foreground">{tier.name}</h4>
                            {tier.badge && (
                              <span className="px-2.5 py-0.5 rounded-full bg-accent text-[9px] sm:text-[10px] font-extrabold uppercase tracking-widest text-white">
                                {tier.badge}
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] font-semibold text-accent self-start xs:self-auto">
                            {tier.subtitle}
                          </span>
                        </div>

                        <p className="text-xs text-muted-foreground mb-3">{tier.tagline}</p>

                        <div className="flex flex-wrap gap-2 pt-2 border-t border-border/50">
                          {tier.highlights.map((h, i) => (
                            <span key={i} className="inline-flex items-center gap-1.5 text-[11px] text-foreground/80 bg-surface-container px-2.5 py-1 rounded-md">
                              <CheckCircle2 className="w-3.5 h-3.5 text-accent shrink-0" />
                              <span>{h}</span>
                            </span>
                          ))}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Specification Summary Card */}
                <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl border border-accent/40 bg-gradient-to-br from-surface-container-low via-background to-surface-container-low shadow-xl shadow-accent/5 space-y-3 mt-3">
                  <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                    <div>
                      <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-accent block mb-0.5">
                        Your Custom Plan Is Ready!
                      </span>
                      <div className="text-lg sm:text-xl font-extrabold font-heading text-foreground tracking-tight">
                        {selectedConfig.name} • ~{sqft.toLocaleString('en-IN')} sq.ft
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {selectedScope.name} • {selectedTier.name}
                      </p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-bold border border-emerald-500/30 shrink-0 self-start sm:self-auto">
                      ✓ Ready for WhatsApp
                    </span>
                  </div>

                  {/* Component Breakdown Bars */}
                  <div className="pt-3 border-t border-border/70 space-y-2">
                    <span className="text-[11px] sm:text-xs font-bold text-foreground block">
                      General Budget Breakdown:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div className="p-2 sm:p-2.5 rounded-xl bg-surface-container border border-border/60">
                        <span className="text-muted-foreground block text-[9px] sm:text-[10px] uppercase font-bold truncate">
                          Woodwork &amp; Cabinets
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-foreground font-heading">42%</span>
                      </div>
                      <div className="p-2 sm:p-2.5 rounded-xl bg-surface-container border border-border/60">
                        <span className="text-muted-foreground block text-[9px] sm:text-[10px] uppercase font-bold truncate">
                          Flooring &amp; Walls
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-foreground font-heading">28%</span>
                      </div>
                      <div className="p-2 sm:p-2.5 rounded-xl bg-surface-container border border-border/60">
                        <span className="text-muted-foreground block text-[9px] sm:text-[10px] uppercase font-bold truncate">
                          Ceiling &amp; Lights
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-foreground font-heading">15%</span>
                      </div>
                      <div className="p-2 sm:p-2.5 rounded-xl bg-surface-container border border-border/60">
                        <span className="text-muted-foreground block text-[9px] sm:text-[10px] uppercase font-bold truncate">
                          Painting &amp; Fitting
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-foreground font-heading">15%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── STEP 5: WHERE SHOULD WE SEND YOUR ESTIMATE? ─── */}
            {step === 5 && (
              <div className="space-y-4 sm:space-y-6">
                {!formSubmitted ? (
                  <form onSubmit={handleWhatsAppSubmit} className="space-y-4 sm:space-y-5">
                    {/* Summary Header Card */}
                    <div className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-accent/10 border border-accent/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-accent block mb-0.5">
                          Selected Summary
                        </span>
                        <h4 className="text-lg sm:text-2xl font-extrabold font-heading text-foreground">
                          {selectedConfig.name} • ~{sqft.toLocaleString('en-IN')} sq.ft
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {selectedScope.name} • {selectedTier.name}
                        </p>
                      </div>
                      <div className="hidden sm:block text-right">
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">Protection</span>
                        <p className="text-xs font-semibold text-foreground">10-Year Warranty &amp; On-Site Work</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h4 className="text-xs sm:text-sm font-bold font-heading text-foreground">
                        Where should we send your free estimate?
                      </h4>
                      <p className="text-[11px] sm:text-xs text-muted-foreground">
                        Your budget will be sent directly to your WhatsApp. You can also talk to our Lead Designer.
                      </p>
                    </div>

                    {formError && (
                      <div className="p-2.5 sm:p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-xs font-medium">
                        {formError}
                      </div>
                    )}

                    {/* Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {/* Name */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-accent" />
                          <span>Your Name</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Rahul Sharma"
                          className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-surface-container border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        />
                      </div>

                      {/* WhatsApp Phone */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-accent" />
                          <span>WhatsApp Mobile Number</span>
                        </label>
                        <div className="relative">
                          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-muted-foreground">
                            +91
                          </span>
                          <input
                            type="tel"
                            required
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="98300 XXXXX"
                            className="w-full pl-12 pr-3.5 py-2.5 sm:py-3 rounded-xl bg-surface-container border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                          />
                        </div>
                      </div>

                      {/* Locality */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-accent" />
                          <span>Area in Kolkata</span>
                        </label>
                        <select
                          value={locality}
                          onChange={(e) => setLocality(e.target.value)}
                          className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-surface-container border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:border-accent transition-all"
                        >
                          {KOLKATA_LOCALITIES.map((loc) => (
                            <option key={loc} value={loc} className="bg-background text-foreground">
                              {loc}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Timeline */}
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-accent" />
                          <span>When Do You Plan to Start?</span>
                        </label>
                        <select
                          value={timeline}
                          onChange={(e) => setTimeline(e.target.value)}
                          className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl bg-surface-container border border-border text-foreground text-xs sm:text-sm focus:outline-none focus:border-accent transition-all"
                        >
                          {TIMELINE_OPTIONS.map((time) => (
                            <option key={time} value={time} className="bg-background text-foreground">
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Trust badges */}
                    <div className="p-3 sm:p-4 rounded-xl bg-surface-container border border-border/60 flex flex-wrap items-center justify-between gap-2 text-[11px] sm:text-xs text-muted-foreground">
                      <div className="flex items-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-accent" />
                        <span>100% Free • No Obligation</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Free Home / Site Visit in Kolkata</span>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-3.5 sm:py-4 px-4 sm:px-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-accent via-primary to-accent text-white font-extrabold text-xs sm:text-base tracking-wide uppercase hover:opacity-95 transition-all shadow-xl shadow-accent/20 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <span>Get Free Estimate on WhatsApp</span>
                      <ArrowRight className="w-4 h-4 shrink-0" />
                    </button>
                  </form>
                ) : (
                  /* Post Submission State */
                  <div className="py-6 sm:py-8 text-center space-y-3.5 sm:space-y-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-2">
                      <Check className="w-7 h-7 sm:w-8 sm:h-8" />
                    </div>
                    <h4 className="text-xl sm:text-2xl font-extrabold font-heading text-foreground">
                      Estimate Sent!
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                      We have opened your WhatsApp chat with our Lead Designer. You can also re-open the message below anytime.
                    </p>

                    <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
                      <button
                        onClick={() => {
                          const submission: LeadSubmissionData = {
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
                          };
                          const ownerPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919830000000';
                          const waUrl = buildWhatsAppEstimateUrl(submission, ownerPhone);
                          window.open(waUrl, '_blank');
                        }}
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-primary text-primary-foreground font-bold text-xs uppercase tracking-wider hover:bg-primary/90 transition-all cursor-pointer shadow-lg"
                      >
                        Open WhatsApp Chat
                      </button>

                      <button
                        onClick={closeEstimator}
                        className="w-full sm:w-auto px-6 py-3 rounded-full bg-surface-container text-muted-foreground hover:text-foreground font-semibold text-xs transition-colors cursor-pointer"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sticky Modal Footer Controls */}
          <div className="px-4 py-3 sm:px-6 sm:py-4 border-t border-border/70 bg-surface-container-low/95 backdrop-blur-md flex items-center justify-between shrink-0 sticky bottom-0 z-20">
            <button
              type="button"
              onClick={closeEstimator}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer px-2 py-1.5"
            >
              Cancel
            </button>

            {step < 5 && (
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(5, s + 1))}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-2.5 rounded-full bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider hover:bg-primary/90 transition-all cursor-pointer shadow-md min-h-[40px]"
              >
                <span>Next Step</span>
                <ArrowRight className="w-3.5 h-3.5 text-accent" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
