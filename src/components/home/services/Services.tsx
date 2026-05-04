"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MdArrowOutward } from "react-icons/md";
import Container from "@/components/shared/layout/Container";
import { servicesData } from "@/data/servicesData";

const Services = () => {
  const [activeService, setActiveService] = useState(servicesData[0]);

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-white overflow-hidden">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 sm:gap-12 lg:gap-16 items-start">
          {/* Left Side: Service List */}
          <div className="lg:col-span-5 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 -mx-4 px-4 lg:mx-0 lg:px-0">
            {servicesData.map((service) => (
              <div
                key={service.id}
                onClick={() => setActiveService(service)}
                className={`group cursor-pointer py-4 sm:py-6 border-b border-accent transition-all duration-500 flex items-center gap-3 sm:gap-4 flex-shrink-0 ${
                  activeService.id === service.id ? "border-primary" : ""
                }`}
              >
                <span
                  className={`text-xs sm:text-sm font-medium transition-colors duration-500 ${
                    activeService.id === service.id
                      ? "text-primary"
                      : "text-secondary/40"
                  }`}
                >
                  {service.id}/
                </span>
                <h3
                  className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold transition-all duration-500 whitespace-nowrap lg:whitespace-normal ${
                    activeService.id === service.id
                      ? "text-primary lg:translate-x-2"
                      : "text-secondary hover:translate-x-1"
                  }`}
                >
                  {service.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Right Side: Service Details Card */}
          <div className="lg:col-span-7">
            <div className="bg-[#fcfcfc] border border-accent rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-sm flex flex-col h-full transition-all duration-500 animate-in fade-in slide-in-from-right-4">
              {/* Card Content Top */}
              <div className="p-6 sm:p-8 md:p-10 lg:p-12 space-y-6 sm:space-y-8 flex-grow">
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {activeService.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 sm:px-4 py-1 sm:py-1.5 rounded-full border border-accent text-[9px] sm:text-[10px] font-bold tracking-widest text-secondary/60 uppercase bg-white"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-secondary/70 text-base sm:text-lg leading-relaxed max-w-2xl">
                  {activeService.description}
                </p>

                {/* Learn More Button */}
                <button className="flex items-center gap-3 text-secondary font-bold text-sm group">
                  <span className="tracking-widest uppercase text-xs sm:text-sm">LEARN MORE</span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-primary flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <MdArrowOutward className="text-lg sm:text-xl" />
                  </div>
                </button>
              </div>

              {/* Card Image Bottom with Primary Background */}
              <div className="relative bg-primary h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] flex items-center justify-center p-6 sm:p-8 pt-0">
                <div className="relative w-full h-[120%] -mt-12 sm:-mt-16 md:-mt-20 lg:-mt-24 transform transition-transform duration-700 hover:scale-105">
                  <Image
                    src={activeService.image}
                    alt={activeService.title}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Services;
