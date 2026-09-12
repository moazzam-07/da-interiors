'use client';

import { useState } from "react";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubscribed(true);
  };

  return (
    <section className="relative w-full rounded-3xl overflow-hidden border border-accent/30 bg-surface-container-low p-8 sm:p-12 lg:p-16 my-16 lg:my-20 text-center shadow-xl shadow-accent/5">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-background border border-accent/30 text-xs font-semibold uppercase tracking-widest text-accent mb-5 shadow-sm">
          <Mail className="w-3.5 h-3.5 text-accent" />
          <span>The Architectural Dispatch</span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-foreground tracking-tight leading-tight mb-4">
          Private essays & quarry sourcing notes.
        </h3>

        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-8 max-w-lg font-normal">
          Delivered quarterly. Unfiltered dispatches on noble material procurement, European lighting ateliers, and spatial philosophy from our principals.
        </p>

        {subscribed ? (
          <div className="inline-flex items-center gap-3 px-6 py-3.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <span>You have been added to the private dispatch registry. Welcome.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your personal email..."
              className="w-full px-5 py-3.5 rounded-full text-xs sm:text-sm bg-background border border-border/80 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent text-foreground placeholder:text-muted-foreground/60 transition-all shadow-sm"
            />
            <ShimmerButton
              type="submit"
              shimmerColor="#c29d6d"
              shimmerDuration="3s"
              shimmerSize="0.08em"
              borderRadius="9999px"
              background="#24211d"
              className="w-full sm:w-auto px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-wider uppercase text-white shadow-md cursor-pointer whitespace-nowrap"
            >
              <span className="flex items-center gap-2">
                Subscribe
                <ArrowRight className="w-4 h-4 text-accent" />
              </span>
            </ShimmerButton>
          </form>
        )}

        <p className="text-[11px] text-muted-foreground/60 tracking-wider uppercase mt-4">
          Strict confidentiality • Zero spam • Unsubscribe anytime
        </p>
      </div>
    </section>
  );
}
