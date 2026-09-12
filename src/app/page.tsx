import { GlassHeader } from "@/components/layout/GlassHeader";
import { HeroSection } from "@/components/sections/HeroSection";
import { MetricsStrip } from "@/components/sections/MetricsStrip";
import { WorkShowcase } from "@/components/sections/WorkShowcase";
import { ServiceGrid } from "@/components/sections/ServiceGrid";
import { WhyDAInteriors } from "@/components/sections/WhyKydmah";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ReviewCarousel } from "@/components/sections/ReviewCarousel";
import { AboutSection } from "@/components/sections/AboutSection";
import { InsightsSection } from "@/components/sections/InsightsSection";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { GlobalCta } from "@/components/sections/GlobalCta";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col selection:bg-accent/20 selection:text-accent bg-background">
      {/* Editorial Glass Header */}
      <GlassHeader />

      {/* Hero Showcase */}
      <HeroSection />

      {/* Validation & Accolades Strip */}
      <MetricsStrip />

      {/* Selected Portfolio / Interactive Accordion */}
      <WorkShowcase />

      {/* Core Studio Disciplines & Services */}
      <ServiceGrid />

      {/* Studio Philosophy & Pillars */}
      <WhyDAInteriors />

      {/* The 4-Stage Architectural Journey */}
      <HowItWorks />

      {/* Client Stories & Reviews */}
      <section id="reviews">
        <ReviewCarousel />
      </section>

      {/* Studio Heritage & Values */}
      <AboutSection />

      {/* The Design Journal & Editorial Insights */}
      <section id="insights">
        <InsightsSection />
      </section>

      {/* Governance & FAQs */}
      <FaqAccordion />

      {/* Climax Private Consultation CTA */}
      <GlobalCta />

      {/* Brand Footer */}
      <Footer />

      {/* Persistent Direct Concierge Action */}
      <FloatingWhatsApp />
    </main>
  );
}
