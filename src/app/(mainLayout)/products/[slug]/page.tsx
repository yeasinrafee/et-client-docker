import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProductDetailsContent from "@/components/productsDetails/ProductDetailsContent";
import { fetchAPI } from "@/lib/api";
import { productsData } from "@/data/productsData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await fetchAPI(`/products/${slug}`);

  if (!product) {
    const fallback = productsData.find((p) => p.slug === slug);
    if (!fallback) return { title: "Product Not Found" };
    return {
      title: `${fallback.title} | Emperal Tech`,
      description: fallback.description,
    };
  }

  return {
    title: `${product.title} | Emperal Tech`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;

  // Fetch product from API
  let product = await fetchAPI(`/products/${slug}`);

  // Fallback to static data
  if (!product) {
    product = productsData.find((p) => p.slug === slug);
  }

  if (!product) {
    notFound();
  }

  // Fetch related products from API
  let relatedProducts = await fetchAPI(`/products/${slug}/related`);
  if (!relatedProducts) {
    relatedProducts = [];
  }

  return (
    <ProductDetailsContent product={product} relatedProducts={relatedProducts} />
  );
}
