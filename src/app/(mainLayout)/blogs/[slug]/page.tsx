import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchAPI } from "@/lib/api";
import BlogDetailsContent from "@/components/blogDetails/BlogDetailsContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://emperaltech.com";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchAPI(`/blogs/by-slug/${slug}`);

  if (!blog) return { title: "Blog Not Found | Emperal Tech" };

  const seo = blog.seo ?? {};
  const canonical = `${SITE_URL}/blogs/${slug}`;
  const title = seo.metaTitle || `${blog.title} | Emperal Tech Blog`;
  const description = seo.metaDescription || blog.shortDescription;

  return {
    title,
    description,
    keywords: seo.seoKeywords || undefined,
    alternates: { canonical },
    openGraph: {
      title: seo.metaTitle || blog.title,
      description,
      url: canonical,
      images: blog.image ? [{ url: blog.image }] : undefined,
      type: "article",
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = await fetchAPI(`/blogs/by-slug/${slug}`);

  if (!blog) {
    notFound();
  }

  // Fetch recent blogs for sidebar
  const allBlogs = await fetchAPI(`/blogs`);
  const recentBlogs = Array.isArray(allBlogs)
    ? allBlogs.filter((b: { slug: string }) => b.slug !== slug).slice(0, 5)
    : [];

  return <BlogDetailsContent blog={blog} recentBlogs={recentBlogs} />;
}

