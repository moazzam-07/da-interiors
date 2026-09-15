'use client';

import { motion } from "framer-motion";
import { SectionFrame } from "@/components/layout/SectionFrame";
import { ArrowRight, BookOpen } from "lucide-react";
import { TextAnimate } from "@/components/ui/text-animate";
import Image from "next/image";
import Link from "next/link";

const insights = [
  {
    slug: "the-enduring-poetry-of-roman-travertine",
    category: "Materiality",
    title: "The Enduring Poetry of Roman Travertine in Contemporary Living",
    excerpt: "Why unpolished, porous natural stones bring timeless tactile grounding into modern residences.",
    readTime: "7 min read",
    image: "/images/da/user_uploads/upload_15.jpeg",
  },
  {
    slug: "sculpting-space-with-light-2400k-ambient-philosophy",
    category: "Lighting Design",
    title: "Sculpting Space with Light: The 2400K Ambient Philosophy",
    excerpt: "How indirect architectural illumination, warm cove details, and shadow play cultivate nocturnal calm.",
    readTime: "6 min read",
    image: "/images/da/user_uploads/upload_21.jpeg",
  },
  {
    slug: "architectural-restraint-the-power-of-negative-space",
    category: "Spatial Harmony",
    title: "Architectural Restraint: The Power of Negative Space",
    excerpt: "Why quiet luxury isn't about more furniture, but giving extraordinary materials room to breathe.",
    readTime: "8 min read",
    image: "/images/da/user_uploads/upload_06.jpeg",
  },
];

export function InsightsSection() {
  return (
    <section id="insights" className="relative py-16 md:py-24 overflow-hidden bg-surface-container-lowest">
      {/* Top gradient divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />

      <SectionFrame className="relative z-10" hasPadding={false}>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14 md:mb-16 px-4 max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low border border-border text-xs sm:text-sm font-semibold text-accent mb-4 tracking-wide uppercase"
            >
              <BookOpen className="w-4 h-4 text-accent" />
              The Design Journal
            </motion.div>

            <TextAnimate
              as="h2"
              animation="blurInUp"
              by="word"
              once
              className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-foreground leading-[1.1] mb-4"
            >
              Architectural essays & living notes.
            </TextAnimate>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-muted-foreground leading-relaxed font-normal"
            >
              Explorations of noble materials, artisanal craft, and spatial rituals from our principal architects.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/blog" className="group flex items-center gap-2 text-sm font-bold text-accent hover:text-foreground transition-colors cursor-pointer">
              Explore All Journal Essays
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {insights.map((article, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                href={`/blog/${article.slug}`}
                className="group block h-full rounded-3xl border border-border/70 bg-card overflow-hidden hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-500"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden bg-muted">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-background/90 backdrop-blur-md text-foreground border border-white/20">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-7">
                  <p className="text-xs text-accent font-semibold mb-2">{article.readTime}</p>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-3 leading-snug group-hover:text-accent transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </SectionFrame>
    </section>
  );
}
