'use client';

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { RainbowButton } from "@/components/ui/rainbow-button";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { useBooking } from "@/components/booking/BookingProvider";

import { LogoIcon } from "@/components/ui/logo-icon";
import { LogoText } from "@/components/ui/logo-text";

const navLinks = [
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Services", href: "/#services" },
  { name: "Philosophy", href: "/#about" },
  { name: "The Process", href: "/#process" },
  { name: "Reviews", href: "/#reviews" },
  { name: "Journal", href: "/blog" },
];

export function GlassHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openBooking, openWhatsApp, openEstimator } = useBooking();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile nav is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-4 left-0 right-0 z-50 mx-auto max-w-6xl transition-all duration-500 px-4",
          isScrolled ? "top-2 md:top-4" : "top-4 md:top-8"
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between rounded-full border shadow-sm transition-all duration-500",
            "bg-white/40 dark:bg-black/20 backdrop-blur-xl supports-[backdrop-filter]:bg-white/20",
            isScrolled 
              ? "py-2.5 px-4 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border-white/40 dark:border-white/10" 
              : "py-4 px-6 md:px-8 border-white/20 dark:border-white/5"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
          >
            <LogoIcon className="h-8 w-auto" />
            <LogoText className="h-5.5 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onMouseEnter={() => setHoveredLink(link.name)}
                onMouseLeave={() => setHoveredLink(null)}
                className="relative px-4 py-2 text-sm font-semibold text-foreground/80 hover:text-primary transition-colors duration-300"
              >
                {hoveredLink === link.name && (
                  <motion.span
                    layoutId="header-hover"
                    className="absolute inset-0 rounded-full bg-primary/5 -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Side: Cost Estimator + CTA + Mobile Toggle */}
          <div className="flex items-center gap-2.5">
            <button
              onClick={openEstimator}
              className={cn(
                "hidden lg:inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-surface-container-low/60 hover:bg-accent/15 px-3.5 text-xs font-semibold text-accent transition-all cursor-pointer",
                isScrolled ? "h-9" : "h-10"
              )}
            >
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Cost Estimator</span>
            </button>

            <RainbowButton 
              onClick={() => openBooking()}
              className={cn(
                 "shadow-lg transition-transform hover:scale-105 active:scale-95 group text-white font-bold tracking-wide hidden sm:flex cursor-pointer",
                 isScrolled ? "h-10 px-5 text-sm" : "h-11 px-6 text-sm"
              )}
            >
              Book Consultation
            </RainbowButton>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-white/10 border border-white/20 text-foreground hover:bg-white/50 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex flex-col items-center justify-center min-h-screen gap-6 px-8"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05 }}
                  className="text-2xl font-heading font-bold text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="w-full max-w-xs mt-4 flex flex-col gap-3"
              >
                <button
                  onClick={() => { setMobileOpen(false); openEstimator(); }}
                  className="w-full flex items-center justify-center gap-2 h-12 rounded-full border border-accent/50 bg-accent/10 hover:bg-accent/20 text-accent font-bold text-sm tracking-wide transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-accent" />
                  <span>Free Cost Estimator</span>
                </button>

                <RainbowButton
                  onClick={() => { setMobileOpen(false); openBooking(); }}
                  className="h-12 px-8 text-base shadow-lg text-white font-bold tracking-wide cursor-pointer"
                >
                  Book Consultation
                </RainbowButton>
              </motion.div>

              {/* Contact shortcuts */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex gap-6 mt-8 text-sm font-medium text-muted-foreground items-center"
              >
                <a href="tel:+919830000000" className="hover:text-primary transition-colors">Call Us</a>
                <span className="text-border">|</span>
                <button
                  onClick={() => { setMobileOpen(false); openWhatsApp(); }}
                  className="hover:text-[#25D366] transition-colors cursor-pointer bg-transparent border-none p-0 font-medium text-sm text-muted-foreground"
                >
                  WhatsApp
                </button>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
