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

export default function Home() {
  return (
    <div className="min-h-screen">
      <Banner />
      <Brand />
      <Services />
      <Industries />
      <WhyChooseUs />
      <OurProducts />
      <OurDemos />
      <Stack />
      <OurApproach />
      <Reviews />
      <Contact />
    </div>
  );
}
