import AllServices from "@/components/AllServices/AllServices";
import PageHero from "@/components/ui/PageHero";
import React from "react";
import bg1 from "@/assets/images/banner/bg1.gif";
import { fetchAPI } from "@/lib/api";
import { servicesData as fallbackServices } from "@/data/servicesData";

export const metadata = {
  title: "Our Services | Emperal Tech",
  description:
    "Explore our comprehensive range of digital services, from design to development and maintenance.",
};

const ServicesPage = async () => {
  const services = await fetchAPI("/services");

  return (
    <main>
      <PageHero
        title="Our Services"
        subtitle="Empowering your business with cutting-edge technology and innovative design solutions tailored to your unique needs."
        bgImage={bg1}
        buttonText="GET IN TOUCH"
        buttonHref="/#contact"
      />
      <AllServices data={services || fallbackServices} />
    </main>
  );
};

export default ServicesPage;
