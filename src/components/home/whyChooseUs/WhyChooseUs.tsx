import React from "react";
import Image from "next/image";
import { MdArrowOutward } from "react-icons/md";
import Container from "@/components/shared/layout/Container";

const WhyChooseUs = () => {
  const stats = [
    {
      number: "15+",
      label: "With 15 years of experience, we have earned numerous awards",
    },
    {
      number: "23+",
      label: "We have offices in four countries worldwide",
    },
    {
      number: "150+",
      label: "We have a team of over 150 certified full-time professionals",
    },
    {
      number: "2540+",
      label: "We have successfully implemented over 2,540 projects",
    },
  ];

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white border-b border-accent">
      <Container>
        {/* Top Header */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-secondary mb-4 sm:mb-6 tracking-tighter">
            WHY CHOOSE US?
          </h2>
          <p className="text-secondary/60 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
            Tailored to you, we create custom software specifically designed to
            meet your unique business needs.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 items-start pt-8 sm:pt-12 border-t border-accent gap-8 lg:gap-0">
          {/* Left Column: Description & CTA */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-8 lg:pr-12 pb-8 lg:pb-12">
            <p className="text-secondary/70 text-sm sm:text-base leading-relaxed">
              We pride ourselves on delivering high-quality custom software
              solutions that drive business growth and success. You gain a
              trusted partner who is dedicated to understanding your unique
              requirements and delivering innovative, and secure software
              tailored to your needs.
            </p>
            <button className="flex items-center gap-3 bg-primary text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest hover:bg-opacity-90 transition-all group shadow-lg shadow-primary/20">
              ABOUT US
              <MdArrowOutward className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Middle Column: Image */}
          <div className="lg:col-span-3 min-h-[280px] sm:min-h-[350px] md:min-h-[400px] lg:border-l lg:border-accent lg:pl-12 pb-8 lg:pb-12">
            <div className="relative h-full w-full min-h-[280px] sm:min-h-[350px] md:min-h-[400px] rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-2xl shadow-black/10">
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                alt="Our Team"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Right Column: Stats Grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-8 sm:gap-y-12 lg:pl-12 pb-8 lg:pb-12">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="relative pt-4 sm:pt-6 border-t border-primary/30"
              >
                {/* Accent Line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary"></div>

                <div className="flex justify-between items-start mb-3 sm:mb-4">
                  <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary tracking-tighter">
                    {stat.number}
                  </span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-secondary/10 flex items-center justify-center text-secondary/40 hover:text-primary hover:border-primary transition-all cursor-pointer">
                    <MdArrowOutward className="text-lg sm:text-xl" />
                  </div>
                </div>
                <p className="text-secondary/50 text-xs sm:text-sm leading-relaxed pr-2 sm:pr-4">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default WhyChooseUs;
