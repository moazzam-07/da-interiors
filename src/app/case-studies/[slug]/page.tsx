import { Metadata } from "next";
import { notFound } from "next/navigation";
import { GlassHeader } from "@/components/layout/GlassHeader";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { GlobalCta } from "@/components/sections/GlobalCta";
import { CaseStudyClientDetail } from "./CaseStudyClientDetail";
import {
  getCaseStudyBySlug,
  getAllCaseStudySlugs,
} from "@/lib/case-studies-data";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllCaseStudySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | DA Interiors Portfolio",
    };
  }

  return {
    title: project.seo.metaTitle,
    description: project.seo.metaDescription,
    keywords: project.seo.keywords,
    openGraph: {
      title: project.seo.metaTitle,
      description: project.seo.metaDescription,
      type: "article",
      images: [
        {
          url: project.heroImage,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: project.seo.metaTitle,
      description: project.seo.metaDescription,
      images: [project.heroImage],
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getCaseStudyBySlug(slug);

  if (!project) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CreativeWork",
        "@id": `https://dainteriors.in/case-studies/${project.slug}#project`,
        "name": project.title,
        "headline": project.subtitle,
        "description": project.summary,
        "image": `https://dainteriors.in${project.heroImage}`,
        "dateCreated": `${project.yearCompleted}-01-15`,
        "creator": {
          "@type": "Organization",
          "name": "DA Interiors (DSID)",
          "url": "https://dainteriors.in",
          "telephone": "+91 79036 24701",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "93/2, Topsia Rd",
            "addressLocality": "Kolkata",
            "postalCode": "700039",
            "addressRegion": "West Bengal",
            "addressCountry": "IN"
          }
        },
        "locationCreated": {
          "@type": "Place",
          "name": project.location,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Kolkata",
            "addressRegion": "West Bengal",
            "addressCountry": "IN"
          }
        }
      },
      {
        "@type": "HomeAndConstructionBusiness",
        "@id": "https://dainteriors.in/#business",
        "name": "D A interior Design DSID",
        "url": "https://dainteriors.in",
        "telephone": "+91 79036 24701",
        "priceRange": "$$$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "93/2, Topsia Rd",
          "addressLocality": "Kolkata",
          "postalCode": "700039",
          "addressRegion": "West Bengal",
          "addressCountry": "IN"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9"
        }
      }
    ]
  };

  return (
    <main className="flex min-h-screen flex-col selection:bg-accent/20 selection:text-accent">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <GlassHeader />
      <CaseStudyClientDetail project={project} />
      <GlobalCta />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
