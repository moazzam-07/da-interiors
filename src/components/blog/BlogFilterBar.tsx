'use client';

import { Search, X, SlidersHorizontal } from "lucide-react";

interface BlogFilterBarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalResults: number;
}

export function BlogFilterBar({
  categories,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalResults,
}: BlogFilterBarProps) {
  return (
    <div className="w-full mb-10 sm:mb-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-border/70">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <SlidersHorizontal className="w-4 h-4 text-accent mr-1 shrink-0 hidden sm:block" />
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/10 border border-primary scale-[1.02]"
                    : "bg-surface-container-low text-muted-foreground hover:text-foreground border border-border/70 hover:border-accent/40"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input Box */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search essays, stones, lighting..."
            className="w-full pl-10 pr-9 py-2.5 rounded-full text-xs sm:text-sm bg-surface-container-low border border-border/80 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent text-foreground placeholder:text-muted-foreground/60 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground p-0.5 rounded-full cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Results Status Subline */}
      <div className="flex items-center justify-between pt-4 text-xs text-muted-foreground">
        <span>
          Showing <strong className="text-foreground">{totalResults}</strong>{" "}
          {totalResults === 1 ? "architectural essay" : "architectural essays"}
          {selectedCategory !== "All" && (
            <span> in <span className="text-accent font-semibold">{selectedCategory}</span></span>
          )}
          {searchQuery && (
            <span> matching &ldquo;<span className="text-foreground font-semibold">{searchQuery}</span>&rdquo;</span>
          )}
        </span>

        {(selectedCategory !== "All" || searchQuery) && (
          <button
            onClick={() => {
              onSelectCategory("All");
              onSearchChange("");
            }}
            className="text-accent hover:underline font-semibold cursor-pointer"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
}
