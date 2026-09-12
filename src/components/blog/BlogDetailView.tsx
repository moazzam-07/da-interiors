'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, Clock, Calendar, Share2, Check,
  ChevronRight, Bookmark, ArrowRight,
  Sparkles, CheckCircle2
} from "lucide-react";
import { type BlogPost } from "@/lib/blog-data";
import { BlogCard } from "./BlogCard";
import { useBooking } from "@/components/booking/BookingProvider";
import { ShimmerButton } from "@/components/ui/shimmer-button";

interface BlogDetailViewProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

export function BlogDetailView({ post, relatedPosts }: BlogDetailViewProps) {
  const { openBooking } = useBooking();
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Calculate reading scroll progress
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

  return (
    <div className="relative w-full bg-background pt-28 sm:pt-36 pb-20">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-border/40 z-50">
        <div
          className="h-full bg-accent transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-5xl">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs font-medium text-muted-foreground mb-8 overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-border shrink-0" />
          <Link href="/blog" className="hover:text-foreground transition-colors">The Design Journal</Link>
          <ChevronRight className="w-3.5 h-3.5 text-border shrink-0" />
          <span className="text-accent font-semibold">{post.category}</span>
        </nav>

        {/* Article Header */}
        <header className="mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container-low border border-accent/30 text-xs font-semibold uppercase tracking-widest text-accent mb-6 shadow-sm">
            <span>{post.category}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold font-heading text-foreground tracking-tight leading-[1.12] mb-6 text-balance">
            {post.title}
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed font-normal mb-8 max-w-3xl text-balance">
            {post.subtitle}
          </p>

          {/* Author & Share Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 py-6 border-y border-border/80">
            <div className="flex items-center gap-3.5">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-accent/50 shadow-sm shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground font-heading">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                <span>{post.formattedDate}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-accent" />
                <span>{post.readTime}</span>
              </div>
              <span>•</span>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border bg-surface-container-low hover:bg-surface-container-lowest text-foreground transition-all cursor-pointer"
                title="Copy Article Link"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-500 font-semibold">Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5 text-accent" />
                    <span>Share</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="relative w-full h-[320px] sm:h-[480px] md:h-[560px] rounded-3xl overflow-hidden mb-12 sm:mb-16 border border-border/80 shadow-xl bg-muted">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1200px) 100vw, 1100px"
            className="object-cover object-center"
          />
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Sticky Table of Contents (Desktop) */}
          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-28 p-6 rounded-3xl border border-border/80 bg-surface-container-low/60 backdrop-blur-sm shadow-sm">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent mb-4">
                <Bookmark className="w-3.5 h-3.5 text-accent" />
                <span>Table of Contents</span>
              </div>
              <ul className="space-y-3 text-xs sm:text-sm">
                {post.tableOfContents.map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="block text-muted-foreground hover:text-foreground hover:translate-x-1 transition-all leading-snug"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Consultation Quick Card */}
              <div className="mt-8 pt-6 border-t border-border/70">
                <p className="text-xs text-muted-foreground mb-3 font-normal">
                  Planning a private residence or heritage restoration?
                </p>
                <button
                  onClick={() => openBooking()}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full py-2.5 px-4 text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer shadow-sm"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5 text-accent" />
                </button>
              </div>
            </div>
          </aside>

          {/* Right Column: Editorial Body */}
          <article className="lg:col-span-8">
            <div className="space-y-12 sm:space-y-14 text-base sm:text-lg leading-relaxed text-foreground/90 font-normal">
              {post.sections.map((section, idx) => (
                <section key={idx} id={section.id} className="scroll-mt-32 space-y-6">
                  {section.heading && (
                    <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground tracking-tight leading-snug pt-2">
                      {section.heading}
                    </h2>
                  )}

                  {section.paragraphs.map((p, pIdx) => (
                    <p key={pIdx} className="text-muted-foreground leading-relaxed">
                      {p}
                    </p>
                  ))}

                  {/* Pull Quote */}
                  {section.quote && (
                    <blockquote className="my-8 p-6 sm:p-8 rounded-2xl bg-surface-container-low border-l-4 border-accent shadow-sm">
                      <p className="text-lg sm:text-xl font-heading font-medium italic text-foreground leading-relaxed mb-3">
                        &ldquo;{section.quote.text}&rdquo;
                      </p>
                      {section.quote.citation && (
                        <cite className="block text-xs font-semibold uppercase tracking-widest text-accent not-italic">
                          — {section.quote.citation}
                        </cite>
                      )}
                    </blockquote>
                  )}

                  {/* Inline Image */}
                  {section.image && (
                    <figure className="my-8 space-y-3">
                      <div className="relative w-full h-[280px] sm:h-[400px] rounded-2xl overflow-hidden border border-border/80 bg-muted">
                        <Image
                          src={section.image.src}
                          alt={section.image.alt}
                          fill
                          sizes="(max-width: 1024px) 100vw, 750px"
                          className="object-cover"
                        />
                      </div>
                      {section.image.caption && (
                        <figcaption className="text-xs text-muted-foreground text-center italic">
                          {section.image.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}

                  {/* Key Takeaways Callout */}
                  {section.keyTakeaways && (
                    <div className="my-8 p-6 sm:p-8 rounded-3xl border border-accent/30 bg-surface-container-low/70 space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-accent mb-2">
                        <Sparkles className="w-4 h-4 text-accent" />
                        <span>Key Architectural Principles</span>
                      </div>
                      <ul className="space-y-2.5">
                        {section.keyTakeaways.map((point, kIdx) => (
                          <li key={kIdx} className="flex items-start gap-3 text-sm text-foreground/90">
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              ))}

              {/* Conclusion Section */}
              <section className="pt-8 border-t border-border/80">
                <h3 className="text-2xl font-bold font-heading text-foreground mb-4">
                  {post.conclusion.heading}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {post.conclusion.text}
                </p>
              </section>

              {/* Article Tags */}
              <div className="pt-6 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mr-2">
                  Keywords:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-surface-container-low text-muted-foreground border border-border"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Author Profile Bio Box */}
            <div className="mt-14 p-6 sm:p-8 rounded-3xl border border-border/80 bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center gap-6 shadow-sm">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-accent/40 shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div>
                    <h4 className="text-lg font-bold font-heading text-foreground">{post.author.name}</h4>
                    <p className="text-xs text-accent font-semibold">{post.author.role}</p>
                  </div>
                  <ShimmerButton
                    onClick={() => openBooking()}
                    shimmerColor="#c29d6d"
                    shimmerDuration="3s"
                    shimmerSize="0.08em"
                    borderRadius="9999px"
                    background="#24211d"
                    className="px-5 py-2 text-xs font-semibold tracking-wider uppercase text-white shadow-md cursor-pointer"
                  >
                    <span>Consult Architect</span>
                  </ShimmerButton>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-normal">
                  {post.author.bio}
                </p>
              </div>
            </div>

            {/* Return to Journal Link */}
            <div className="mt-10 pt-6 border-t border-border/70 flex justify-between items-center">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Return to Design Journal</span>
              </Link>
            </div>
          </article>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-20 sm:mt-28 pt-12 sm:pt-16 border-t border-border/80">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-accent mb-2 block">
                Related Reading
              </span>
              <h3 className="text-2xl sm:text-4xl font-bold font-heading text-foreground tracking-tight">
                Further Architectural Studies
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {relatedPosts.map((related) => (
                <BlogCard key={related.slug} post={related} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
