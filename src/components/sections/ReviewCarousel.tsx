'use client';

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Marquee } from '@/components/ui/3d-testimonails';
import { SectionFrame } from "@/components/layout/SectionFrame";
import { TextAnimate } from "@/components/ui/text-animate";

const testimonials = [
  {
    name: 'Victoria & Marc Sterling',
    username: 'The Bellevue Penthouse',
    body: 'DA Interiors transformed our blank penthouse into a breathtaking sanctuary. The bookmatched Calacatta stone and fluted oak joinery are museum grade.',
    img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=250&auto=format&fit=crop',
    country: 'Penthouse Residence',
  },
  {
    name: 'Tariq Al-Mansoor',
    username: 'Private Villa Estate',
    body: 'Zero friction, zero delays. Their lead architect held every contractor to the highest European standards. Handover was truly a white-glove experience.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=250&auto=format&fit=crop',
    country: 'Heritage Villa',
  },
  {
    name: 'Elena Rostova',
    username: 'Mayfair Residence',
    body: 'The tactile materiality—from the Belgian linen drapery to the bespoke travertine fireplace—radiates quiet, effortless luxury. Unmatched taste.',
    img: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=250&auto=format&fit=crop',
    country: 'Full Home Curation',
  },
  {
    name: 'Julian Vance',
    username: 'Boutique Hospitality Founder',
    body: 'They conceptualized our dining lounge with poetic clarity. Our guests constantly photograph and compliment every sculptural architectural curve.',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=250&auto=format&fit=crop',
    country: 'Hospitality Project',
  },
  {
    name: 'Sophia Chen',
    username: 'Full Architectural Remodel',
    body: 'Their 3D photoreal renders were so accurate that the completed residence looked identical to the screen. Perfectionists in the best sense.',
    img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=250&auto=format&fit=crop',
    country: 'Architectural Renovation',
  },
  {
    name: 'Dr. Hamad Al-Sayed',
    username: 'Master Spa Suite',
    body: 'The acoustic warmth, the concealed circadian lighting, and the artisan craftsmanship have redefined how our family unwinds every single day.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=250&auto=format&fit=crop',
    country: 'Master Suite Sanctuary',
  },
];

function TestimonialCard({ img, name, username, body, country }: (typeof testimonials)[number]) {
  return (
    <Card className="w-68 shrink-0 bg-surface-container-lowest border-border/60 shadow-sm hover:shadow-md transition-shadow rounded-2xl">
      <CardContent className="p-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border border-border">
            <AvatarImage src={img} alt={name} />
            <AvatarFallback className="bg-accent/10 text-accent font-bold">{name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <figcaption className="text-sm font-bold text-foreground flex items-center gap-1.5">
              {name}
            </figcaption>
            <p className="text-xs font-semibold text-accent">{username}</p>
            <span className="text-[11px] text-muted-foreground">{country}</span>
          </div>
        </div>
        <blockquote className="mt-4 text-sm text-muted-foreground leading-relaxed">&ldquo;{body}&rdquo;</blockquote>
      </CardContent>
    </Card>
  );
}

export function ReviewCarousel() {
  return (
    <SectionFrame className="bg-surface-container-low/30 relative py-16 md:py-24 overflow-hidden" hasPadding={false}>
      <div className="absolute left-0 top-0 w-1/2 h-full bg-gradient-to-r from-accent/5 to-transparent pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 relative z-20 px-4 max-w-6xl mx-auto">
        <div className="max-w-2xl">
          <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-accent uppercase mb-3 inline-block">
            Client Words
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-foreground tracking-tight text-left">
            Trusted by discerning homeowners
          </h2>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="w-full flex items-center justify-center -mx-4 md:mx-0"
      >
        <div className="relative flex h-[500px] md:h-[600px] w-full max-w-[1000px] flex-row items-center justify-center overflow-hidden gap-4 [perspective:800px] [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)]">
          <div
            className="flex flex-row items-center gap-4 w-full justify-center"
            style={{
              transform:
                'translateX(0px) translateY(0px) translateZ(-50px) rotateX(15deg) rotateY(-10deg) rotateZ(5deg)',
            }}
          >
            {/* Vertical Marquee (downwards) */}
            <Marquee vertical pauseOnHover repeat={4} className="[--duration:50s]">
              {testimonials.slice(0, 3).map((review) => (
                <TestimonialCard key={review.name} {...review} />
              ))}
            </Marquee>
            {/* Vertical Marquee (upwards) */}
            <Marquee vertical pauseOnHover reverse repeat={4} className="[--duration:40s]">
              {testimonials.slice(3, 6).map((review) => (
                <TestimonialCard key={review.name} {...review} />
              ))}
            </Marquee>
            {/* Vertical Marquee (downwards) */}
            <Marquee vertical pauseOnHover repeat={4} className="[--duration:60s] hidden md:flex">
              {testimonials.map((review) => (
                <TestimonialCard key={review.name + "3"} {...review} />
              ))}
            </Marquee>
          </div>
        </div>
      </motion.div>
    </SectionFrame>
  );
}
