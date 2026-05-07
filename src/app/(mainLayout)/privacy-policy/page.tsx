import React from "react";
import PageHero from "@/components/ui/PageHero";
import Container from "@/components/shared/layout/Container";
import bg1 from "@/assets/images/banner/bg1.gif";

export const metadata = {
  title: "Privacy Policy | Emperal Tech",
  description: "Privacy Policy and Terms of Service for Emperal Tech.",
};

const PrivacyPolicy = () => {
  return (
    <main className="bg-white">
      <PageHero
        title="Privacy Policy"
        subtitle="Learn how Emperal Tech collects, uses, and protects your personal data and information when you use our services."
        bgImage={bg1}
        buttonText="CONTACT US"
        buttonHref="/contact"
      />
      
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Introduction */}
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-secondary">1. Introduction</h2>
              <div className="w-16 h-1 bg-primary rounded-full"></div>
              <p className="text-secondary/70 leading-relaxed">
                Welcome to Emperal Tech. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
              </p>
            </div>

            {/* Information We Collect */}
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-secondary">2. Information We Collect</h2>
              <div className="w-16 h-1 bg-primary rounded-full"></div>
              <p className="text-secondary/70 leading-relaxed">
                We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
              </p>
              <ul className="list-disc list-inside text-secondary/70 space-y-3 ml-4">
                <li><strong>Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong>Contact Data:</strong> includes email address and telephone numbers.</li>
                <li><strong>Technical Data:</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform.</li>
                <li><strong>Usage Data:</strong> includes information about how you use our website, products and services.</li>
              </ul>
            </div>

            {/* How We Use Your Information */}
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-secondary">3. How We Use Your Information</h2>
              <div className="w-16 h-1 bg-primary rounded-full"></div>
              <p className="text-secondary/70 leading-relaxed">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-secondary/70 space-y-3 ml-4">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you.</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal or regulatory obligation.</li>
              </ul>
            </div>

            {/* Data Security */}
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-secondary">4. Data Security</h2>
              <div className="w-16 h-1 bg-primary rounded-full"></div>
              <p className="text-secondary/70 leading-relaxed">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorised way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </div>

            {/* Your Legal Rights */}
            <div className="space-y-6">
              <h2 className="text-3xl font-extrabold text-secondary">5. Your Legal Rights</h2>
              <div className="w-16 h-1 bg-primary rounded-full"></div>
              <p className="text-secondary/70 leading-relaxed">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data. You have the right to request access, correction, erasure, restriction, transfer, to object to processing, to portability of data and (where the lawful ground of processing is consent) to withdraw consent.
              </p>
              <p className="text-secondary/70 leading-relaxed mt-4">
                If you wish to exercise any of the rights set out above, please contact us at <strong>info@emperaltech.com</strong>.
              </p>
            </div>

          </div>
        </Container>
      </section>
    </main>
  );
};

export default PrivacyPolicy;
