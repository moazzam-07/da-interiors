'use client';

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MapPin, Clock, Ruler, Sparkles, Building2 } from "lucide-react";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { TextAnimate } from "@/components/ui/text-animate";
import { getAllCaseStudies, getAllCategories, type CaseStudy } from "@/lib/case-studies-data";

export function CaseStudiesSection() {
  const caseStudies = getAllCaseStudies();
  const categories = getAllCategories();
  const [selectedCategory, setSelectedCategory] = useState<string>("All Projects");

  const filteredProjects = selectedCategory === "All Projects"
    ? caseStudies
    : caseStudies.filter((p) => p.category === selectedCategory);

  return (
    <section id="case-studies" className="relative py-20 md:py-28 overflow-hidden bg-background">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-[35%] h-[35%] rounded-full bg-accent/5 blur-[150px]" />
        <div className="absolute bottom-[20%] right-[10%] w-[35%] h-[35%] rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <SectionFrame className="relative z-10" hasPadding={false}>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 px-4 max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low border border-border text-xs sm:text-sm font-semibold text-accent mb-4 tracking-wide uppercase"
            >
              <Building2 className="w-4 h-4 text-accent" />
              Real Kolkata Commissions
            </motion.div>

            <TextAnimate
              as="h2"
              animation="blurInUp"
              by="word"
              once
              className="text-3xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight text-foreground leading-[1.1] mb-4"
            >
              Architectural Case Studies
            </TextAnimate>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-base sm:text-lg text-muted-foreground leading-relaxed font-normal"
            >
              From 38th-floor Urbana penthouses to 1920s Ballygunge heritage villas. Explore how we solve complex spatial briefs with turnkey precision.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Link
              href="/case-studies"
              className="group inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-foreground transition-colors cursor-pointer"
            >
              View All 5 Kolkata Dossiers
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-12 px-4 max-w-6xl mx-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-accent text-primary-foreground shadow-md shadow-accent/20 scale-105"
                  : "bg-surface-container-low text-muted-foreground hover:text-foreground border border-border/70 hover:border-accent/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Cards Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          <AnimatePresence>
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project.slug}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group h-full flex flex-col"
              >
                <Link
                  href={`/case-studies/${project.slug}`}
                  className="flex flex-col h-full rounded-[2rem] bg-card border border-border/70 overflow-hidden hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/5 transition-all duration-500"
                >
                  {/* Card Hero Image */}
                  <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-muted">
                    <Image
                      src={project.heroImage}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-background/90 backdrop-blur-md text-foreground border border-white/20">
                        {project.category}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-accent/90 backdrop-blur-md text-primary-foreground flex items-center gap-1 shadow-sm">
                        <MapPin className="w-3 h-3" />
                        {project.neighborhood}
                      </span>
                    </div>

                    {/* Bottom Floating Stats */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90 z-10">
                      <div className="flex items-center gap-1.5 font-medium">
                        <Ruler className="w-3.5 h-3.5 text-accent" />
                        <span>{project.areaSqFt.toLocaleString()} sq.ft</span>
                      </div>
                      <div className="flex items-center gap-1.5 font-medium">
                        <Clock className="w-3.5 h-3.5 text-accent" />
                        <span>{project.timelineWeeks} Wks Handover</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-heading font-extrabold text-foreground mb-2 leading-snug group-hover:text-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed mb-4">
                        {project.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-border/50 flex items-center justify-between text-xs font-bold text-accent">
                      <span className="flex items-center gap-1 uppercase tracking-wider">
                        Read Full Case Study
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </SectionFrame>
    </section>
  );
}
