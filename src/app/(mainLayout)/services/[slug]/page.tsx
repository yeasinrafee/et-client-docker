import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ServiceDetailsContent from "@/components/servicesDetails/ServiceDetailsContent";
import { fetchAPI } from "@/lib/api";
import { servicesData } from "@/data/servicesData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await fetchAPI(`/services/${slug}`);

  if (!service) {
    const fallback = servicesData.find((s) => s.slug === slug);
    if (!fallback) return { title: "Service Not Found" };
    return {
      title: `${fallback.title} | Emperal Tech Services`,
      description: fallback.description,
    };
  }

  return {
    title: `${service.title} | Emperal Tech Services`,
    description: service.description,
  };
}

export default async function ServicePage({ params }: PageProps) {
  const { slug } = await params;

  let service = await fetchAPI(`/services/${slug}`);

  if (!service) {
    service = servicesData.find((s) => s.slug === slug);
  }

  if (!service) {
    notFound();
  }

  // Fetch all services for sidebar navigation (fallback to local data)
  const apiAllServices = await fetchAPI(`/services`);
  const allServices: { slug: string; title: string }[] =
    Array.isArray(apiAllServices) && apiAllServices.length > 0
      ? apiAllServices
      : servicesData;

  return <ServiceDetailsContent service={service} allServices={allServices} />;
}
