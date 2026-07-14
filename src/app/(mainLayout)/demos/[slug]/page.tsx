import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DemoDetailsContent from "@/components/demosDetails/DemoDetailsContent";
import { fetchAPI } from "@/lib/api";
import { demosData } from "@/data/demosData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://emperaltech.com";

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const demo = await fetchAPI(`/demos/${slug}`);

  if (!demo) {
    const fallback = demosData.find((d) => d.slug === slug);
    if (!fallback) return { title: "Demo Not Found | Emperal Tech" };
    return {
      title: `${fallback.title} | Emperal Tech Demos`,
      description: fallback.description,
    };
  }

  const seo = demo.seo ?? {};
  const canonical = `${SITE_URL}/demos/${slug}`;
  const title = seo.metaTitle || `${demo.title} | Emperal Tech Demos`;
  const description = seo.metaDescription || demo.description;

  return {
    title,
    description,
    keywords: seo.seoKeywords || undefined,
    alternates: { canonical },
    openGraph: {
      title: seo.metaTitle || demo.title,
      description,
      url: canonical,
      images: demo.images?.[0] ? [{ url: demo.images[0] }] : undefined,
      type: "website",
    },
  };
}

export default async function DemoPage({ params }: PageProps) {
  const { slug } = await params;

  let demo = await fetchAPI(`/demos/${slug}`);

  if (!demo) {
    demo = demosData.find((d) => d.slug === slug);
  }

  if (!demo) {
    notFound();
  }

  return <DemoDetailsContent demo={demo} />;
}
