import React from "react";
import PageHero from "@/components/ui/PageHero";
import About from "@/components/about/About";
import bg2 from "@/assets/images/banner/bg2.gif";

export const metadata = {
  title: "About Us | Emperal Tech",
  description: "Learn more about Emperal Tech, our mission, vision, and reliable custom software solutions.",
};

const AboutPage = () => {
  return (
    <main>
      <PageHero
        title="About Us"
        subtitle="We are Emperal Tech, a team of passionate engineers and designers dedicated to building robust, custom software solutions that drive business success."
        bgImage={bg2}
        buttonText="WORK WITH US"
        buttonHref="/#contact"
      />
      <About />
    </main>
  );
};

export default AboutPage;
