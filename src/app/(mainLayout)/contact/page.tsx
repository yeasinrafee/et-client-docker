import React from "react";
import PageHero from "@/components/ui/PageHero";
import ContactUs from "@/components/ContactUs/ContactUs";
import bg1 from "@/assets/images/banner/bg1.gif";

export const metadata = {
  title: "Contact Us | Emperal Tech",
  description: "Get in touch with Emperal Tech. We're here to help you with your next custom software and digital transformation project.",
};

const ContactPage = () => {
  return (
    <main>
      <PageHero
        title="Contact Us"
        subtitle="We'd love to hear from you. Whether you have a question about services, pricing, or anything else, our team is ready to answer all your questions."
        bgImage={bg1}
        buttonText="OUR SERVICES"
        buttonHref="/services"
      />
      <ContactUs />
    </main>
  );
};

export default ContactPage;
