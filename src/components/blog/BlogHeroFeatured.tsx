'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Clock, Calendar } from "lucide-react";
import { type BlogPost } from "@/lib/blog-data";

interface BlogHeroFeaturedProps {
  post: BlogPost;
}

export function BlogHeroFeatured({ post }: BlogHeroFeaturedProps) {
  return (
    <section className="relative w-full rounded-3xl overflow-hidden border border-border/80 bg-card shadow-2xl shadow-accent/5 mb-16 lg:mb-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch min-h-[480px]">
        {/* Left Visual Column */}
        <div className="relative lg:col-span-7 min-h-[320px] sm:min-h-[400px] lg:min-h-full overflow-hidden bg-muted">
          <Image
            src={post.heroImage}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover object-center transition-transform duration-1000 ease-out hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:hidden" />

          {/* Featured Ribbon */}
          <div className="absolute top-5 left-5 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background/90 text-accent border border-accent/40 backdrop-blur-md text-xs font-semibold uppercase tracking-widest shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-accent animate-pulse" />
            <span>Lead Editorial Story</span>
          </div>
        </div>

        {/* Right Editorial Info */}
        <div className="lg:col-span-5 p-8 sm:p-10 lg:p-12 flex flex-col justify-between bg-surface-container-lowest/90 backdrop-blur-sm">
          <div>
            {/* Top metadata */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4 font-medium">
              <span className="px-2.5 py-0.5 rounded-full bg-surface-container-low border border-border text-accent uppercase tracking-wider font-semibold">
                {post.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-accent" />
                {post.formattedDate}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-accent" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-heading text-foreground tracking-tight leading-[1.18] mb-4 hover:text-accent transition-colors">
                {post.title}
              </h2>
            </Link>

            {/* Excerpt */}
            <p className="text-base text-muted-foreground leading-relaxed font-normal mb-8 line-clamp-4">
              {post.excerpt}
            </p>
          </div>

          {/* Author info & Read button */}
          <div className="pt-6 border-t border-border/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-accent/40 shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground font-heading">{post.author.name}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{post.author.role}</p>
              </div>
            </div>

            <Link
              href={`/blog/${post.slug}`}
              className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-xs sm:text-sm font-semibold uppercase tracking-widest bg-primary text-primary-foreground hover:bg-primary/90 shadow-md transition-all hover:scale-[1.02] cursor-pointer"
            >
              <span>Read Essay</span>
              <ArrowRight className="w-4 h-4 text-accent" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
