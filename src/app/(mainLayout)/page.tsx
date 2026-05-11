import Banner from "@/components/home/banner/Banner";
import Brand from "@/components/home/brand/Brand";
import Contact from "@/components/home/contact/Contact";
import Industries from "@/components/home/industries/Industries";
import OurApproach from "@/components/home/ourApproach/OurApproach";
import OurProducts from "@/components/home/ourProducts/OurProducts";
import OurDemos from "@/components/home/ourDemos/OurDemos";
import Reviews from "@/components/home/reviews/Reviews";
import Services from "@/components/home/services/Services";
import Stack from "@/components/home/stack/Stack";
import WhyChooseUs from "@/components/home/whyChooseUs/WhyChooseUs";
import BlogsPreview from "@/components/home/blogs/BlogsPreview";
import { fetchAPI } from "@/lib/api";

// Fallback imports for when API is unavailable
import { servicesData as fallbackServices } from "@/data/servicesData";
import { industriesData as fallbackIndustries } from "@/data/industriesData";
import { productsData as fallbackProducts } from "@/data/productsData";
import { demosData as fallbackDemos } from "@/data/demosData";
import { reviewsData as fallbackReviews } from "@/data/reviewsData";

export default async function Home() {
  // Fetch all data server-side in parallel
  const [services, industries, products, demos, reviews, blogs] =
    await Promise.all([
      fetchAPI("/services").catch(() => null),
      fetchAPI("/industries").catch(() => null),
      fetchAPI("/products").catch(() => null),
      fetchAPI("/demos").catch(() => null),
      fetchAPI("/reviews").catch(() => null),
      fetchAPI("/blogs").catch(() => null),
    ]);

  return (
    <div className="min-h-screen">
      <Banner />
      <Brand />
      <Services data={services || fallbackServices} />
      <Industries data={industries || fallbackIndustries} />
      <WhyChooseUs />
      <OurProducts data={products || fallbackProducts} />
      <OurDemos data={demos || fallbackDemos} />
      <Stack />
      <OurApproach />
      <Reviews data={reviews || fallbackReviews} />
      <BlogsPreview data={blogs || []} />
      <Contact />
    </div>
  );
}
