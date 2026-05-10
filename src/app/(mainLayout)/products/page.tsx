import Products from "@/components/products/Products";
import { fetchAPI } from "@/lib/api";
import { productsData as fallbackProducts } from "@/data/productsData";

export default async function ProductsPage() {
  const products = await fetchAPI("/products");

  return <Products data={products || fallbackProducts} />;
}
