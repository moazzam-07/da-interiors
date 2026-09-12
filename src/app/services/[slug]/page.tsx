import { GlassHeader } from "@/components/layout/GlassHeader";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { ServiceDetailPage } from "./ServiceDetailPage";
import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services-data";
import { notFound } from "next/navigation";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.title} | DA Interiors — Bespoke Architecture & Living`,
    description: service.heroDescription,
  };
}

export default async function ServicePage({ params }: { params: Params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <main className="flex min-h-screen flex-col selection:bg-primary/20 selection:text-primary">
      <GlassHeader />
      <ServiceDetailPage slug={slug} />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
