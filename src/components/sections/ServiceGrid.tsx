"use client";

import { ServiceScrollCard } from "@/components/ui/service-scroll-card";
import { House, Sparkles, Droplet, Hammer, Camera, Award, Compass } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    slug: "residential-architecture",
    title: "Full-Residence Architecture & Renovation",
    description: "Complete architectural layout planning, structural gut renovations, and spatial transformations for luxury penthouses and private villas.",
    Icon: House,
    imageSrc: "/images/da/hero1.jpg",
    stats: [
      { label: "Residences Delivered", value: "180+" },
      { label: "Client Rating", value: "4.98★" },
    ],
  },
  {
    slug: "bespoke-styling",
    title: "Bespoke Interior Styling & Curation",
    description: "Custom furniture commissions, tactile bouclé & cashmere textiles, fine art curation, and white-glove finishing for timeless quiet luxury.",
    Icon: Sparkles,
    imageSrc: "/images/da/hero3.jpg",
    stats: [
      { label: "Bespoke Pieces", value: "400+" },
      { label: "Artisan Network", value: "50+ Mills" },
    ],
  },
  {
    slug: "kitchen-bath",
    title: "Luxury Kitchen & Master Bath Sanctuaries",
    description: "Bookmatched Italian Calacatta marble, fluted custom millwork, concealed chef appliances, and architectural wellness spa bathrooms.",
    Icon: Droplet,
    imageSrc: "/images/da/kitchen1.jpg",
    stats: [
      { label: "Sanctuaries Built", value: "120+" },
      { label: "Quarry Direct", value: "100%" },
    ],
  },
  {
    slug: "hospitality-commercial",
    title: "Boutique Hospitality & Commercial Spaces",
    description: "Atmospheric interior architecture and branding for luxury boutique hotels, fine dining destinations, and executive founder suites.",
    Icon: Award,
    imageSrc: "/images/da/hospitality1.jpg",
    stats: [
      { label: "Destinations", value: "45+" },
      { label: "Guest Dwell Lift", value: "+35%" },
    ],
  },
  {
    slug: "custom-millwork",
    title: "Custom Millwork & Architectural Joinery",
    description: "Bespoke walk-in dressing suites, floating stone hearths, fluted wall paneling, and concealed pivot doors crafted to the millimeter.",
    Icon: Hammer,
    imageSrc: "/images/da/millwork1.jpg",
    stats: [
      { label: "Precision Tolerance", value: "0.5mm" },
      { label: "Craft Warranty", value: "10 Years" },
    ],
  },
  {
    slug: "3d-visualization",
    title: "3D Photorealistic Pre-Visualization & VR",
    description: "Hyper-accurate 8K digital twins, daylight simulation studies, and interactive VR walkthroughs before breaking ground.",
    Icon: Camera,
    imageSrc: "/images/da/project1.jpg",
    stats: [
      { label: "Resolution", value: "8K Ultra" },
      { label: "Material Precision", value: "100%" },
    ],
  },
  {
    slug: "turnkey-stewardship",
    title: "Turnkey Project Stewardship & Handover",
    description: "From structural blueprint and marble procurement to contractor oversight, white-glove installation, and champagne reveal.",
    Icon: Compass,
    imageSrc: "/images/da/project7.jpg",
    customLink: "/services",
    isCustomCard: true,
    stats: [
      { label: "On-Time Track Record", value: "100%" },
      { label: "Client Stress", value: "Zero" },
    ],
  },
];

export function ServiceGrid() {
  return (
    <section id="services" className="relative w-full bg-background pt-20 pb-20 overflow-hidden">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-3xl mx-auto mb-16 px-6"
      >
        <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-accent uppercase mb-3 inline-block">
          Design Disciplines
        </span>
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-extrabold text-foreground mb-5 tracking-tight">
          Curated Studio Services
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          Architectural purity, tactile natural materiality, and turnkey white-glove execution engineered for discerning clients.
        </p>
      </motion.div>

      {/* Individual Scroll Cards */}
      <div className="w-full px-4 md:px-8">
        {services.map((service, i) => (
          <ServiceScrollCard
            key={i}
            index={i}
            slug={service.slug}
            title={service.title}
            description={service.description}
            Icon={service.Icon}
            imageSrc={service.imageSrc}
            stats={service.stats}
            customLink={'customLink' in service ? service.customLink : undefined}
            isCustomCard={'isCustomCard' in service ? service.isCustomCard : undefined}
          />
        ))}
      </div>
    </section>
  );
}
