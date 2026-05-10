import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DemoDetailsContent from "@/components/demosDetails/DemoDetailsContent";
import { fetchAPI } from "@/lib/api";
import { demosData } from "@/data/demosData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const demo = await fetchAPI(`/demos/${slug}`);

  if (!demo) {
    const fallback = demosData.find((d) => d.slug === slug);
    if (!fallback) return { title: "Demo Not Found" };
    return {
      title: `${fallback.title} | Emperal Tech Demos`,
      description: fallback.description,
    };
  }

  return {
    title: `${demo.title} | Emperal Tech Demos`,
    description: demo.description,
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
