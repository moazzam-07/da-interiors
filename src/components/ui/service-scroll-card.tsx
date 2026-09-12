"use client";

import React, { useRef } from "react";
import Link from "next/link";
import {
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
  motion,
} from "framer-motion";
import Image from "next/image";
import { LucideIcon, ArrowRight, ChevronRight } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";
import { useBooking } from "@/components/booking/BookingProvider";

interface ServiceScrollCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
  imageSrc: string;
  index: number;
  slug: string;
  stats?: { label: string; value: string }[];
  customLink?: string;
  isCustomCard?: boolean;
}

export function ServiceScrollCard({
  title,
  description,
  Icon,
  imageSrc,
  index,
  slug,
  stats,
  customLink,
  isCustomCard = false,
}: ServiceScrollCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "center center"],
  });

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // --- 3D Fold Animation ---
  const rotate = useTransform(scrollYProgress, [0, 1], [isMobile ? 10 : 16, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [isMobile ? 0.88 : 0.92, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 0.6, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [60, 0]);

  // --- Velocity Motion Blur ---
  const scrollVelocity = useVelocity(scrollYProgress);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 40, stiffness: 300 });
  const velocityBlur = useTransform(
    smoothVelocity,
    [-1, -0.5, 0, 0.5, 1],
    [6, 2, 0, 2, 6]
  );
  const progressBlur = useTransform(scrollYProgress, [0, 0.6, 1], [4, 0.5, 0]);

  // Determine layout direction
  const isReversed = index % 2 === 1;

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center py-6 md:py-12"
    >
      <div style={{ perspective: "1200px" }} className="w-full max-w-6xl mx-auto">
        <motion.div
          style={{
            rotateX: rotate,
            scale,
            opacity,
            y: translateY,
          }}
          className="w-full origin-top will-change-transform"
        >
          {/* Edge Vignette Mask */}
          <motion.div
            style={{
              filter: useTransform(
                [progressBlur, velocityBlur],
                ([pBlur, vBlur]) =>
                  `blur(${Math.max(Number(pBlur), Math.abs(Number(vBlur))).toFixed(1)}px)`
              ),
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 3%, black 97%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 3%, black 97%, transparent 100%)",
            }}
            className="will-change-[filter]"
          >
            {/* Card Container with Border Beam */}
            <div className="relative w-full overflow-hidden rounded-[2rem] bg-card border border-background shadow-2xl">
              {/* Border Beam — the animated shine border from Magic UI */}
              <BorderBeam
                size={250}
                duration={8 + index * 2}
                delay={index * 1.5}
                colorFrom="#00ced1"
                colorTo="#00696b"
                borderWidth={2}
              />

              <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} w-full`}>

                {/* ─── IMAGE PANEL (60%) ─── */}
                <div className="relative w-full md:w-[58%] h-72 md:h-auto md:min-h-[500px] self-stretch overflow-hidden">
                  <Image
                    src={imageSrc}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 60vw"
                    className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                  />
                  {/* Gradient fade into content side */}
                  <div
                    className={`absolute inset-0 ${
                      isReversed
                        ? "bg-gradient-to-l from-card via-card/20 to-transparent"
                        : "bg-gradient-to-r from-card via-card/20 to-transparent"
                    }`}
                  />
                  {/* Bottom fade for mobile */}
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent md:hidden" />

                  {/* Large decorative index number floating over image */}
                  <div className={`absolute bottom-4 ${isReversed ? 'right-6' : 'left-6'} z-10 hidden md:block`}>
                    <span className="text-[8rem] font-heading font-black leading-none text-white/[0.06] select-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                {/* ─── CONTENT PANEL (40%) ─── */}
                <div className="relative w-full md:w-[42%] flex flex-col justify-center p-8 md:p-12 lg:p-16">

                  {/* Service Badge */}
                  <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center justify-center w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 text-primary">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                        Service {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h4 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-[2.75rem] text-foreground leading-[1.1] tracking-tight mb-5">
                    {title}
                  </h4>

                  {/* Description */}
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8 max-w-[45ch]">
                    {description}
                  </p>

                  {/* Stats Row */}
                  {stats && stats.length > 0 && (
                    <div className="flex items-center gap-6 mb-8 pb-8 border-b border-border/50">
                      {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col">
                          <span className="text-2xl font-heading font-bold text-foreground">{stat.value}</span>
                          <span className="text-xs text-muted-foreground uppercase tracking-wider mt-0.5">{stat.label}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Dual CTA Buttons */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <Link href={customLink || `/services/${slug}`} className="group/learn flex h-12 w-max cursor-pointer select-none items-center gap-2 rounded-full border border-border/60 bg-transparent pl-6 pr-5 text-sm font-semibold text-foreground hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 active:scale-[0.98]">
                      {isCustomCard ? 'View All Services' : 'Learn More'}
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover/learn:text-primary transition-colors" />
                    </Link>
                    <BookButton slug={slug} label={isCustomCard ? 'Book a Service' : 'Book Now'} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function BookButton({ slug, label = 'Book Now' }: { slug: string; label?: string }) {
  const { openBooking } = useBooking();
  return (
    <button
      onClick={() => openBooking(slug || undefined)}
      className="group/book flex h-12 w-max cursor-pointer select-none items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent pl-7 pr-5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:shadow-primary/35 hover:scale-[1.02] transition-all duration-300 active:scale-[0.98]"
    >
      {label}
      <ArrowRight className="w-4 h-4 transition-transform group-hover/book:translate-x-1" />
    </button>
  );
}
