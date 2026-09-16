'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Clock, Ruler, Sparkles, Building2, Search, CheckCircle2, ChevronRight } from "lucide-react";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { TextAnimate } from "@/components/ui/text-animate";
import { getAllCaseStudies, getAllCategories, getAllNeighborhoods, type CaseStudy } from "@/lib/case-studies-data";

const LOCAL_FAQS = [
  {
    q: "How long does a luxury 3 BHK or 4 BHK interior project typically take in Kolkata?",
    a: "Full architectural turnkey renovations typically range between 10 to 16 weeks depending on custom joinery and stone import requirements. Our fast-track projects (such as our Silver Spring commission on EM Bypass) leverage off-site pre-engineering to achieve complete on-site assembly within 21 to 30 days.",
  },
  {
    q: "Do you handle building approvals and municipal compliance in Kolkata complexes?",
    a: "Yes. Our team manages all structural coordination with resident welfare associations (RWAs), developer facility managers (such as Urbana, South City, Silver Spring), and local municipal guidelines, ensuring soundproofing, work hours, and debris disposal strictly adhere to society bylaws.",
  },
  {
    q: "Can clients inspect stone and marble slabs before cutting?",
    a: "Absolutely. Sourcing transparency is central to our philosophy. We conduct full-scale horizontal dry-lays at our Kolkata studio warehouse, allowing clients to examine vein matching and approved stone blocks (from Italian Navona travertine to Makrana white) before on-site installation.",
  },
  {
    q: "Which neighborhoods in Kolkata do you serve?",
    a: "We accept private residential and commercial commissions across all prime Kolkata localities, including Alipore, Ballygunge, Queens Park, Anandapur (Urbana), EM Bypass, New Town Action Areas, Salt Lake, and Southern Avenue.",
  },
];

export function CaseStudiesClientIndex() {
  const allProjects = getAllCaseStudies();
  const categories = getAllCategories();
  const neighborhoods = getAllNeighborhoods();

  const [selectedCategory, setSelectedCategory] = useState<string>("All Projects");
  const [selectedNeighborhood, setSelectedNeighborhood] = useState<string>("All Kolkata");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = allProjects.filter((p) => {
    const matchesCategory = selectedCategory === "All Projects" || p.category === selectedCategory;
    const matchesNeighborhood = selectedNeighborhood === "All Kolkata" || p.neighborhood === selectedNeighborhood;
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesNeighborhood && matchesSearch;
  });

  return (
    <div className="w-full bg-background">
      {/* Hero Header */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-surface-container-lowest via-background to-background">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-[45%] h-[35%] rounded-full bg-accent/5 blur-[150px]" />
          <div className="absolute top-[30%] right-[10%] w-[40%] h-[30%] rounded-full bg-primary/5 blur-[150px]" />
        </div>

        <SectionFrame className="relative z-10 text-center">
          <div className="max-w-4xl mx-auto px-4">
            {/* Breadcrumb */}
            <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-6">
              <Link href="/" className="hover:text-accent transition-colors">Home</Link>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-foreground">Case Studies</span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low border border-border text-xs sm:text-sm font-semibold text-accent mb-6 tracking-wide uppercase">
              <Building2 className="w-4 h-4 text-accent" />
              Flagship Kolkata Portfolio
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight text-foreground leading-[1.08] mb-6">
              Architectural <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">Case Studies</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-normal">
              In-depth architectural dossiers of our completed residential transformations across Kolkata. Real briefs, structural challenges, and turnkey deliverables.
            </p>

            {/* Quick Metrics Bar */}
            <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-border/50 text-left sm:text-center">
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">275+</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-0.5">Projects Delivered</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-extrabold text-accent">★ 4.6</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-0.5">56 Google Reviews</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">0.5mm</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-0.5">Joinery Precision</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground">100%</div>
                <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider mt-0.5">Turnkey Execution</div>
              </div>
            </div>
          </div>
        </SectionFrame>
      </section>

      {/* Filter & Search Bar */}
      <section className="relative py-8 bg-surface-container-low/30 border-y border-border/50 sticky top-20 z-30 backdrop-blur-xl">
        <SectionFrame>
          <div className="max-w-6xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Search Input */}
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search neighborhood or property..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full bg-surface-container-low border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-accent"
              />
            </div>

            {/* Neighborhood Pill Filter */}
            <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto justify-start lg:justify-end overflow-x-auto pb-1 lg:pb-0">
              <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mr-2 hidden sm:inline">
                Locality:
              </span>
              {neighborhoods.map((nh) => (
                <button
                  key={nh}
                  onClick={() => setSelectedNeighborhood(nh)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    selectedNeighborhood === nh
                      ? "bg-accent text-primary-foreground shadow-sm shadow-accent/20"
                      : "bg-surface-container-low text-muted-foreground hover:text-foreground border border-border/60"
                  }`}
                >
                  {nh}
                </button>
              ))}
            </div>
          </div>
        </SectionFrame>
      </section>

      {/* Case Studies Gallery Grid */}
      <section className="relative py-16 md:py-24 bg-background">
        <SectionFrame>
          <div className="max-w-6xl mx-auto px-4">
            {filteredProjects.length === 0 ? (
              <div className="text-center py-20 bg-surface-container-low/30 rounded-3xl border border-dashed border-border p-8">
                <p className="text-base text-muted-foreground mb-4">No case studies match your search criteria.</p>
                <button
                  onClick={() => {
                    setSelectedCategory("All Projects");
                    setSelectedNeighborhood("All Kolkata");
                    setSearchQuery("");
                  }}
                  className="px-6 py-2.5 rounded-full bg-accent text-primary-foreground font-bold text-xs uppercase tracking-wider"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {filteredProjects.map((project, i) => (
                  <motion.article
                    key={project.slug}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group flex flex-col rounded-[2.5rem] bg-card border border-border/70 overflow-hidden hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500"
                  >
                    {/* Project Hero Image */}
                    <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-muted">
                      <Image
                        src={project.heroImage}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                      {/* Floating Badges */}
                      <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-2 z-10">
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-background/90 backdrop-blur-md text-foreground border border-white/20">
                          {project.category}
                        </span>
                        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-accent text-primary-foreground flex items-center gap-1.5 shadow-md">
                          <MapPin className="w-3.5 h-3.5" />
                          {project.neighborhood}
                        </span>
                      </div>

                      {/* Bottom Key Specs */}
                      <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs text-white/95 z-10">
                        <div className="flex items-center gap-2 font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                          <Ruler className="w-3.5 h-3.5 text-accent" />
                          <span>{project.areaSqFt.toLocaleString()} sq.ft</span>
                        </div>
                        <div className="flex items-center gap-2 font-medium bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                          <Clock className="w-3.5 h-3.5 text-accent" />
                          <span>{project.timelineWeeks} Weeks Handover</span>
                        </div>
                      </div>
                    </div>

                    {/* Content Body */}
                    <div className="p-8 flex-1 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <span className="text-xs font-bold text-accent uppercase tracking-widest block">
                          {project.tagline}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-foreground leading-tight group-hover:text-accent transition-colors">
                          {project.title}
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {project.summary}
                        </p>
                      </div>

                      {/* Material Highlight Tags */}
                      <div className="pt-2 border-t border-border/40">
                        <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-2">Key Materials:</div>
                        <div className="flex flex-wrap gap-1.5">
                          {project.materials.slice(0, 3).map((mat, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 rounded-full bg-surface-container-low text-[11px] font-medium text-foreground/80 border border-border"
                            >
                              {mat.name}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-4 flex items-center justify-between">
                        <Link
                          href={`/case-studies/${project.slug}`}
                          className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-full bg-surface-container-low hover:bg-accent hover:text-primary-foreground text-foreground text-xs font-bold uppercase tracking-wider transition-all duration-300 border border-border/80 group-hover:border-accent"
                        >
                          <span>Read Full Project Dossier</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        </SectionFrame>
      </section>

      {/* Local Kolkata Interior FAQs (SEO Authority) */}
      <section className="relative py-16 md:py-24 bg-surface-container-low/30 border-t border-border/40">
        <SectionFrame>
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-14">
              <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-accent uppercase mb-3 inline-block">
                Kolkata Real Estate & Design
              </span>
              <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-foreground tracking-tight mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Everything you need to know about commissioning luxury turnkey interiors in Kolkata.
              </p>
            </div>

            <div className="space-y-4">
              {LOCAL_FAQS.map((faq, i) => (
                <div
                  key={i}
                  className="bg-card border border-border/70 rounded-2xl p-6 shadow-sm hover:border-accent/40 transition-colors"
                >
                  <h3 className="text-base sm:text-lg font-heading font-bold text-foreground mb-2 flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed pl-7">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </SectionFrame>
      </section>
    </div>
  );
}
