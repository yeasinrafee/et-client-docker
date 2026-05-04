import { demosData } from "@/data/demosData";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import DemoDetailsContent from "@/components/demosDetails/DemoDetailsContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return demosData.map((demo) => ({
    slug: demo.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const demo = demosData.find((d) => d.slug === slug);
  
  if (!demo) return { title: "Demo Not Found" };

  return {
    title: `${demo.title} | Emperal Tech Demos`,
    description: demo.description,
  };
}

export default async function DemoPage({ params }: PageProps) {
  const { slug } = await params;
  const demo = demosData.find((d) => d.slug === slug);

  if (!demo) {
    notFound();
  }

  return <DemoDetailsContent demo={demo} />;
}
