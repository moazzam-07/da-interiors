'use client';

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Clock,
  Ruler,
  Calendar,
  Share2,
  Check,
  ChevronRight,
  Sparkles,
  Phone,
  MessageSquare,
  ShieldCheck,
  Star,
  Layers,
  Award,
  ExternalLink,
  X,
  Maximize2
} from "lucide-react";
import { type CaseStudy, getCaseStudyBySlug } from "@/lib/case-studies-data";
import { useBooking } from "@/components/booking/BookingProvider";
import { ShimmerButton } from "@/components/ui/shimmer-button";

interface CaseStudyClientDetailProps {
  project: CaseStudy;
}

export function CaseStudyClientDetail({ project }: CaseStudyClientDetailProps) {
  const { openBooking } = useBooking();
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeLightboxImg, setActiveLightboxImg] = useState<{ src: string; alt: string; caption: string; room: string } | null>(null);

  const prevProject = project.prevSlug ? getCaseStudyBySlug(project.prevSlug) : null;
  const nextProject = project.nextSlug ? getCaseStudyBySlug(project.nextSlug) : null;

  // Scroll reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, progress)));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const whatsappMessage = encodeURIComponent(
    `Hello DA Interiors! I was studying your project dossier for "${project.title}" in ${project.neighborhood}, Kolkata. I have a property and would love to discuss a similar turnkey interior execution.`
  );

  return (
    <div className="relative w-full bg-background pt-28 sm:pt-36 pb-24 selection:bg-accent/20 selection:text-accent">
      {/* Top Scroll Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-border/30 z-50 pointer-events-none">
        <div
          className="h-full bg-accent transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
        {/* Navigation Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap py-1">
          <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-border shrink-0" />
          <Link href="/case-studies" className="hover:text-foreground transition-colors">
            Case Studies
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-border shrink-0" />
          <span className="text-foreground/80 font-semibold">{project.neighborhood}</span>
          <ChevronRight className="w-3.5 h-3.5 text-border shrink-0" />
          <span className="text-accent truncate max-w-[200px] sm:max-w-none">{project.title}</span>
        </nav>

        {/* Header Ribbon */}
        <header className="mb-10 sm:mb-14">
          <div className="flex flex-wrap items-center gap-2.5 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-xs font-bold uppercase tracking-widest text-accent">
              <Sparkles className="w-3.5 h-3.5" />
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low border border-border/80 text-xs font-medium text-muted-foreground">
              <MapPin className="w-3.5 h-3.5 text-accent" />
              {project.neighborhood}, Kolkata
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-low border border-border/80 text-xs font-medium text-muted-foreground">
              <Calendar className="w-3.5 h-3.5 text-accent" />
              Completed {project.yearCompleted}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-heading text-foreground tracking-tight leading-[1.15] mb-6">
            {project.title}
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground font-normal leading-relaxed max-w-4xl mb-8">
            {project.subtitle}
          </p>

          {/* Quick Specs Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-card border border-border/80 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                <Ruler className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Built-Up Area</p>
                <p className="text-sm sm:text-base font-bold text-foreground font-heading">{project.areaSqFt.toLocaleString()} sq.ft</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Turnkey Timeline</p>
                <p className="text-sm sm:text-base font-bold text-foreground font-heading">{project.timelineWeeks} Weeks</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Neighborhood</p>
                <p className="text-sm sm:text-base font-bold text-foreground font-heading truncate">{project.neighborhood}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 text-accent">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[11px] uppercase tracking-wider text-muted-foreground font-medium">Scope of Work</p>
                <p className="text-sm sm:text-base font-bold text-foreground font-heading">Full Architecture & Decor</p>
              </div>
            </div>
          </div>
        </header>

        {/* Hero Image Showcase */}
        <div className="relative w-full h-[400px] sm:h-[540px] md:h-[640px] rounded-3xl overflow-hidden mb-12 sm:mb-16 border border-border/80 shadow-2xl group">
          <Image
            src={project.heroImage}
            alt={project.title}
            fill
            priority
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="(max-width: 1280px) 100vw, 1280px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent pointer-events-none" />

          {/* Floating Hero Badges */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="bg-background/85 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/10 max-w-lg shadow-lg">
              <span className="text-[10px] font-mono tracking-widest text-accent uppercase block mb-1">
                Kolkata Flagship Residence
              </span>
              <p className="text-sm sm:text-base font-medium text-foreground">
                {project.location}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-background/85 backdrop-blur-md border border-white/10 text-xs font-semibold text-foreground hover:text-accent hover:border-accent/40 transition-all shadow-md"
                title="Share this project"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-accent" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4" />
                    <span>Share Dossier</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Key Engineering & Design Metrics */}
        <section className="mb-16 sm:mb-20">
          <div className="text-center mb-8">
            <span className="text-xs font-mono tracking-[0.2em] text-accent uppercase">Project Milestones</span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mt-1">Measured Precision</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                className="bg-card/70 backdrop-blur-sm border border-border/80 rounded-2xl p-5 text-center shadow-sm hover:border-accent/50 transition-all group"
              >
                <p className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-accent mb-1.5 group-hover:scale-105 transition-transform">
                  {metric.value}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wider">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Main Content Grid: Dossier Narrative (Left) + Consultation Sidebar (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 mb-20 items-start">
          {/* Main Narrative Column */}
          <div className="lg:col-span-8 space-y-14">
            {/* Section: Client Brief */}
            <section className="bg-card/40 border border-border/70 rounded-3xl p-6 sm:p-9 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                  <span className="text-xs font-bold font-mono">01</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
                  The Client Brief & Spatial Intent
                </h3>
              </div>
              <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-normal">
                {project.clientBrief}
              </p>
            </section>

            {/* Section: Structural & Architectural Challenge */}
            <section className="bg-card/40 border border-border/70 rounded-3xl p-6 sm:p-9 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <span className="text-xs font-bold font-mono">02</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
                  Structural & Engineering Constraints
                </h3>
              </div>
              <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-normal">
                {project.architecturalChallenge}
              </p>
            </section>

            {/* Section: DA Interiors Design Intervention */}
            <section className="bg-card/40 border border-accent/20 rounded-3xl p-6 sm:p-9 shadow-md relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                  <span className="text-xs font-bold font-mono">03</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground">
                  The DA Interiors Intervention
                </h3>
              </div>
              <p className="text-base sm:text-lg text-foreground/90 leading-relaxed font-normal">
                {project.designIntervention}
              </p>
            </section>

            {/* Section: Materials & Provenance */}
            <section>
              <div className="mb-6">
                <span className="text-xs font-mono tracking-[0.2em] text-accent uppercase">Material Palette</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mt-1">
                  Provenance & Sourced Finishes
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Hand-selected natural stones, imported European veneers, and custom metallurgical joinery.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.materials.map((mat, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm hover:border-accent/40 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold">
                        {mat.category}
                      </span>
                      <span className="text-[11px] text-muted-foreground bg-surface-container-low px-2 py-0.5 rounded-md border border-border/50">
                        {mat.origin}
                      </span>
                    </div>
                    <h4 className="text-base font-bold font-heading text-foreground mb-1.5">
                      {mat.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {mat.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Room-by-Room Photographic Gallery */}
            <section>
              <div className="mb-6">
                <span className="text-xs font-mono tracking-[0.2em] text-accent uppercase">Visual Records</span>
                <h3 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mt-1">
                  Room-by-Room Photographic Dossier
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Detailed site captures documenting joinery alignment, lighting integrations, and spatial transitions.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {project.gallery.map((img, i) => (
                  <div
                    key={i}
                    className="group relative rounded-2xl overflow-hidden border border-border/80 bg-card shadow-md flex flex-col"
                  >
                    <div
                      className="relative w-full h-64 sm:h-72 cursor-pointer overflow-hidden"
                      onClick={() => setActiveLightboxImg(img)}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 400px"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors" />
                      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-1 rounded-full border border-white/10">
                        {img.room}
                      </div>
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 backdrop-blur-md p-1.5 rounded-full text-white">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <div className="p-4 bg-card flex-1">
                      <p className="text-xs sm:text-sm text-foreground/90 font-medium">
                        {img.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section: Verified Client Testimonial */}
            <section className="bg-gradient-to-br from-card to-surface-container-low border border-accent/30 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-1.5 text-accent mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>

              <blockquote className="text-lg sm:text-xl text-foreground font-heading italic leading-relaxed mb-6">
                &ldquo;{project.clientTestimonial.quote}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-border/60">
                <div>
                  <p className="text-sm sm:text-base font-bold text-foreground font-heading">
                    {project.clientTestimonial.clientName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {project.clientTestimonial.role}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Kolkata Client</span>
                </div>
              </div>
            </section>
          </div>

          {/* Sticky Sidebar Column */}
          <aside className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
            {/* Consultation Card */}
            <div className="rounded-3xl bg-card border border-border/90 p-6 sm:p-7 shadow-xl">
              <span className="text-[10px] font-mono tracking-widest text-accent uppercase font-bold block mb-2">
                Private Commission
              </span>
              <h4 className="text-xl font-bold font-heading text-foreground mb-3">
                Commission a Home in {project.neighborhood}?
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
                Connect directly with our Kolkata studio directors to discuss architectural drawings, turnkey budgets, and custom joinery timelines.
              </p>

              <div className="space-y-3 mb-6">
                <ShimmerButton
                  onClick={() => openBooking()}
                  className="w-full py-3.5 text-xs uppercase tracking-wider font-bold shadow-lg"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Book Design Consultation
                </ShimmerButton>

                <a
                  href={`https://wa.me/917903624701?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#25D366]/10 hover:bg-[#25D366] text-[#25D366] hover:text-white border border-[#25D366]/30 text-xs font-bold tracking-wide uppercase transition-all duration-300"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>

                <a
                  href="tel:07903624701"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-surface-container-low hover:bg-surface-container text-foreground border border-border text-xs font-medium tracking-wide transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-accent" />
                  <span>Call 079036 24701</span>
                </a>
              </div>

              {/* Project Quick Specs Summary */}
              <div className="pt-5 border-t border-border/60 space-y-2.5 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Location</span>
                  <span className="font-medium text-foreground">{project.neighborhood}, Kolkata</span>
                </div>
                <div className="flex justify-between">
                  <span>Floor Plate</span>
                  <span className="font-medium text-foreground">{project.areaSqFt.toLocaleString()} sq.ft</span>
                </div>
                <div className="flex justify-between">
                  <span>Execution Period</span>
                  <span className="font-medium text-foreground">{project.timelineWeeks} Weeks</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">Handed Over</span>
                </div>
              </div>

              {/* Verified Office & Studio Tag */}
              <div className="mt-6 pt-5 border-t border-border/60 bg-surface-container-low/50 rounded-2xl p-3.5 text-[11px] text-muted-foreground flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">DA Interiors Kolkata Studio</p>
                  <p>93/2, Topsia Rd, Kolkata 700039</p>
                  <p className="text-[10px] text-accent mt-0.5">⭐ 4.9 Google Rating • 275+ Delivered</p>
                </div>
              </div>
            </div>

            {/* Back to All Projects */}
            <Link
              href="/case-studies"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-card hover:bg-surface-container border border-border text-xs font-semibold text-foreground transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to All Case Studies</span>
            </Link>
          </aside>
        </div>

        {/* Project Pagination (Prev / Next Case Studies) */}
        <section className="pt-12 border-t border-border/80">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {prevProject && (
              <Link
                href={`/case-studies/${prevProject.slug}`}
                className="group p-6 rounded-2xl bg-card border border-border/80 hover:border-accent/50 transition-all flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-muted-foreground group-hover:text-accent group-hover:bg-accent/10 transition-colors shrink-0">
                  <ArrowLeft className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground block mb-1">
                    Previous Project
                  </span>
                  <h4 className="text-sm sm:text-base font-bold font-heading text-foreground group-hover:text-accent transition-colors line-clamp-1">
                    {prevProject.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{prevProject.neighborhood}, Kolkata</p>
                </div>
              </Link>
            )}

            {nextProject && (
              <Link
                href={`/case-studies/${nextProject.slug}`}
                className="group p-6 rounded-2xl bg-card border border-border/80 hover:border-accent/50 transition-all flex items-center justify-between gap-4 text-right sm:ml-auto w-full"
              >
                <div className="text-left sm:text-right">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-muted-foreground block mb-1">
                    Next Project
                  </span>
                  <h4 className="text-sm sm:text-base font-bold font-heading text-foreground group-hover:text-accent transition-colors line-clamp-1">
                    {nextProject.title}
                  </h4>
                  <p className="text-xs text-muted-foreground">{nextProject.neighborhood}, Kolkata</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-muted-foreground group-hover:text-accent group-hover:bg-accent/10 transition-colors shrink-0">
                  <ArrowRight className="w-5 h-5" />
                </div>
              </Link>
            )}
          </div>
        </section>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={() => setActiveLightboxImg(null)}
          >
            <div
              className="relative max-w-5xl w-full bg-card rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveLightboxImg(null)}
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full h-[60vh] sm:h-[70vh]">
                <Image
                  src={activeLightboxImg.src}
                  alt={activeLightboxImg.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>

              <div className="p-5 bg-card border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono uppercase text-accent font-semibold block mb-0.5">
                    {activeLightboxImg.room}
                  </span>
                  <p className="text-sm text-foreground font-medium">
                    {activeLightboxImg.caption}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
