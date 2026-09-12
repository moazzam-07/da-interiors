'use client';

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Clock, Calendar } from "lucide-react";
import { type BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
  post: BlogPost;
  priority?: boolean;
}

export function BlogCard({ post, priority = false }: BlogCardProps) {
  return (
    <article className="group flex flex-col h-full rounded-3xl border border-border/80 bg-card overflow-hidden transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/5">
      {/* Image Frame */}
      <Link href={`/blog/${post.slug}`} className="relative block h-64 sm:h-72 w-full overflow-hidden bg-muted">
        <Image
          src={post.heroImage}
          alt={post.title}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Category Pill on Image */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-background/90 text-accent border border-accent/30 backdrop-blur-md shadow-sm">
            {post.category}
          </span>
        </div>

        {/* Reading Time */}
        <div className="absolute bottom-4 right-4 z-10 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium text-white/90 bg-black/50 backdrop-blur-md">
          <Clock className="w-3 h-3 text-accent" />
          <span>{post.readTime}</span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6 sm:p-7 justify-between">
        <div>
          {/* Metadata Row */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3 font-medium">
            <span className="inline-flex items-center gap-1">
              <Calendar className="w-3 h-3 text-accent" />
              {post.formattedDate}
            </span>
            <span>•</span>
            <span>{post.author.name}</span>
          </div>

          {/* Title */}
          <Link href={`/blog/${post.slug}`} className="block group-hover:text-accent transition-colors">
            <h3 className="text-xl sm:text-2xl font-bold font-heading text-foreground tracking-tight leading-snug line-clamp-2 mb-3">
              {post.title}
            </h3>
          </Link>

          {/* Excerpt */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 font-normal mb-6">
            {post.excerpt}
          </p>
        </div>

        {/* Footer Link & Tags */}
        <div className="pt-4 border-t border-border/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-accent/40">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs font-medium text-foreground truncate max-w-[130px]">
              {post.author.name}
            </span>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-accent group-hover:translate-x-1 transition-all"
          >
            <span>Read Essay</span>
            <ArrowUpRight className="w-4 h-4 text-accent" />
          </Link>
        </div>
      </div>
    </article>
  );
}
