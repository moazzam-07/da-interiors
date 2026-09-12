import { Metadata } from "next";
import { notFound } from "next/navigation";
import { GlassHeader } from "@/components/layout/GlassHeader";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { BlogDetailView } from "@/components/blog/BlogDetailView";
import {
  getBlogPostBySlug,
  getAllBlogSlugs,
  getRelatedPosts,
} from "@/lib/blog-data";

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Essay Not Found | The Design Journal",
    };
  }

  return {
    title: `${post.title} | The Design Journal — DA Interiors`,
    description: post.excerpt,
    openGraph: {
      title: `${post.title} | DA Interiors`,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [post.heroImage],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, post.category);

  return (
    <main className="flex min-h-screen flex-col selection:bg-accent/20 selection:text-accent">
      <GlassHeader />
      <BlogDetailView post={post} relatedPosts={relatedPosts} />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
