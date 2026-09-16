import { Metadata } from "next";
import { GlassHeader } from "@/components/layout/GlassHeader";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { GlobalCta } from "@/components/sections/GlobalCta";
import { CaseStudiesClientIndex } from "./CaseStudiesClientIndex";

export const metadata: Metadata = {
  title: "Interior Design Case Studies Kolkata | Flagship Portfolio — DA Interiors",
  description:
    "Explore real completed interior transformations across Kolkata: Urbana Anandapur, Alipore, Ballygunge, EM Bypass, and New Town. 275+ projects delivered with bespoke European joinery and natural stone.",
  keywords: [
    "interior design case studies kolkata",
    "kolkata interior design portfolio",
    "urbana anandapur penthouse interior",
    "alipore duplex interior design",
    "ballygunge luxury villa renovation",
    "new town apartment interior designer",
    "best turnkey interior designer kolkata",
  ],
  openGraph: {
    title: "Kolkata Luxury Interior Design Case Studies | DA Interiors",
    description:
      "Photographic dossiers and architectural breakdowns of 275+ completed residences across Alipore, Ballygunge, Urbana, and New Town.",
    images: ["/images/da/user_uploads/upload_15.jpeg"],
  },
};

export default function CaseStudiesPage() {
  return (
    <main className="flex min-h-screen flex-col selection:bg-accent/20 selection:text-accent">
      <GlassHeader />
      <CaseStudiesClientIndex />
      <GlobalCta />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
