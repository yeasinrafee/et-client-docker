import { servicesData } from "@/data/servicesData";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServiceDetailsContent from "@/components/servicesDetails/ServiceDetailsContent";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) return { title: "Service Not Found" };

  return {
    title: `${service.title} | Emperal Tech Services`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailsContent service={service} />;
}
