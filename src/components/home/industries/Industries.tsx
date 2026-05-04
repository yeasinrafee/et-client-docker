"use client";

import React from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { MdArrowOutward } from "react-icons/md";
import Container from "@/components/shared/layout/Container";
import { industriesData } from "@/data/industriesData";

const Industries = () => {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  return (
    <section
      id="industries"
      className="py-12 sm:py-16 md:py-20 lg:py-24 bg-secondary text-white overflow-hidden"
    >
      <Container>
        {/* Header Section */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter mb-6 sm:mb-8">
            INDUSTRIES
          </h2>
          <div className="w-full h-px bg-white/10 mb-6 sm:mb-8"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 md:gap-10 lg:gap-12 items-start">
          {/* Left Column: Description & CTA */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-8 lg:pr-8 lg:border-r lg:border-white/10">
            <p className="text-accent/70 text-xs sm:text-sm leading-relaxed max-w-sm">
              We serve a diverse range of industries with cutting-edge software
              development solutions tailored to their unique needs, helping
              businesses transform and thrive in the digital age.
            </p>
            <button className="flex items-center gap-3 bg-primary text-white px-6 sm:px-8 py-3 rounded-full text-[10px] font-bold tracking-widest hover:bg-opacity-90 transition-all group">
              DISCOVER NOW
              <MdArrowOutward className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Right Column: Carousel */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden px-2" ref={emblaRef}>
              <div className="flex -ml-5 md:-ml-6">
                {industriesData.map((industry) => (
                  <div
                    key={industry.id}
                    className="flex-[0_0_54%] sm:flex-[0_0_70%] md:flex-[0_0_45%] lg:flex-[0_0_38%] min-w-0 pl-4 md:pl-6"
                  >
                    <div className="bg-white rounded-3xl overflow-hidden group h-full flex flex-col">
                      {/* Image container with overlay */}
                      <div className="relative h-40 sm:h-48 md:h-52 w-full overflow-hidden">
                        <Image
                          src={industry.image}
                          alt={industry.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500"></div>
                        <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6">
                          <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                            {industry.title}
                          </h3>
                        </div>
                      </div>

                      {/* Content Section */}
                      <div className="p-5 sm:p-6 md:p-8 flex-grow">
                        <p className="text-secondary/70 text-xs sm:text-sm leading-relaxed">
                          {industry.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Industries;
