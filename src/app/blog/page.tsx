import { Metadata } from "next";
import { GlassHeader } from "@/components/layout/GlassHeader";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { BlogClientIndex } from "./BlogClientIndex";
import { getAllBlogPosts, getAllCategories } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: "The Design Journal | Architectural Essays & Living Notes — DA Interiors",
  description:
    "Architectural essays, material studies, European millwork tolerances, and Kolkata heritage restoration insights from the principals of DA Interiors.",
  openGraph: {
    title: "The Design Journal | DA Interiors",
    description: "Architectural essays, noble material studies, and contemplative living notes.",
    images: ["/images/da/user_uploads/upload_15.jpeg"],
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();
  const categories = getAllCategories();

  return (
    <main className="flex min-h-screen flex-col selection:bg-accent/20 selection:text-accent">
      <GlassHeader />
      <BlogClientIndex posts={posts} categories={categories} />
      <Footer />
      <FloatingWhatsApp />
    </main>
  );
}
