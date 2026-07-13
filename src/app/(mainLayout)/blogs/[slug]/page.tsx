import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchAPI } from "@/lib/api";
import BlogDetailsContent from "@/components/blogDetails/BlogDetailsContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchAPI(`/blogs/by-slug/${slug}`);

  if (!blog) return { title: "Blog Not Found | Emperal Tech" };

  return {
    title: `${blog.title} | Emperal Tech Blog`,
    description: blog.shortDescription,
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

