'use client';

import { useState, useMemo } from "react";
import { BookOpen, Sparkles, ArrowRight } from "lucide-react";
import { type BlogPost } from "@/lib/blog-data";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogHeroFeatured } from "@/components/blog/BlogHeroFeatured";
import { BlogFilterBar } from "@/components/blog/BlogFilterBar";
import { BlogNewsletter } from "@/components/blog/BlogNewsletter";
import { useBooking } from "@/components/booking/BookingProvider";
import { ShimmerButton } from "@/components/ui/shimmer-button";

interface BlogClientIndexProps {
  posts: BlogPost[];
  categories: string[];
}

export function BlogClientIndex({ posts, categories }: BlogClientIndexProps) {
  const { openBooking } = useBooking();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter posts based on category and search query
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.subtitle.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        post.author.name.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // Featured post logic: show on initial load when browsing All with no search
  const isDefaultView = selectedCategory === "All" && !searchQuery;
  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const displayPosts = isDefaultView
    ? filteredPosts.filter((p) => p.slug !== featuredPost.slug)
    : filteredPosts;

  return (
    <div className="relative w-full bg-background pt-28 sm:pt-36 pb-20">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        {/* Page Header */}
        <header className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low border border-accent/30 text-xs font-semibold uppercase tracking-widest text-accent mb-5 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-accent" />
            <span>The Design Journal</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold font-heading text-foreground tracking-tight leading-[1.1] mb-6 text-balance">
            Architectural Essays & Living Notes
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-normal text-balance">
            Monolithic stone studies, circadian lighting manifestos, European millwork tolerances, and historic Kolkata estate restorations from our studio principals.
          </p>
        </header>

        {/* Featured Lead Story (shown in default view) */}
        {isDefaultView && featuredPost && (
          <BlogHeroFeatured post={featuredPost} />
        )}

        {/* Filter Bar & Search */}
        <BlogFilterBar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          totalResults={filteredPosts.length}
        />

        {/* Articles Grid */}
        {displayPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post, idx) => (
              <BlogCard key={post.slug} post={post} priority={idx < 3} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="py-20 text-center rounded-3xl border border-border/80 bg-surface-container-low p-8 max-w-md mx-auto">
            <Sparkles className="w-8 h-8 text-accent mx-auto mb-4 opacity-70" />
            <h3 className="text-xl font-bold font-heading text-foreground mb-2">
              No essays match your inquiry
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
              We couldn&apos;t find any architectural essays matching &ldquo;{searchQuery}&rdquo;. Try adjusting your keywords or browse all categories.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-primary text-primary-foreground hover:bg-primary/90 transition-all cursor-pointer shadow-sm"
            >
              <span>View All Essays</span>
            </button>
          </div>
        )}

        {/* Newsletter Dispatch Component */}
        <BlogNewsletter />

        {/* Bottom Consultation Banner */}
        <section className="mt-16 p-8 sm:p-12 rounded-3xl border border-border/80 bg-gradient-to-r from-surface-container-low via-background to-surface-container-low flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="max-w-xl text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-accent mb-2 block">
              Private Commissions 2025/2026
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold font-heading text-foreground tracking-tight mb-2">
              Commission an architectural sanctuary.
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              From historic Bengal villa restorations to contemporary private penthouses, our principals are accepting limited new residential appointments.
            </p>
          </div>

          <ShimmerButton
            onClick={() => openBooking()}
            shimmerColor="#c29d6d"
            shimmerDuration="3.5s"
            shimmerSize="0.08em"
            borderRadius="9999px"
            background="#24211d"
            className="px-8 py-3.5 text-xs sm:text-sm font-semibold tracking-widest uppercase text-white shadow-xl shadow-accent/15 cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="flex items-center gap-2">
              Request Consultation
              <ArrowRight className="w-4 h-4 text-accent" />
            </span>
          </ShimmerButton>
        </section>
      </div>
    </div>
  );
}
