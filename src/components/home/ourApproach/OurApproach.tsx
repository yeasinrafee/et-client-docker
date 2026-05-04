"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MdArrowOutward, MdCheckCircle } from "react-icons/md";
import Container from "@/components/shared/layout/Container";
import { approachData } from "@/data/approachData";

const OurApproach = () => {
  const [activeStep, setActiveStep] = useState(approachData[0]);

  return (
    <section className="py-10 sm:py-12 md:py-24 bg-secondary text-white overflow-hidden border-b border-white/10">
      <Container>
        {/* Top Header Section */}
        <div className="flex flex-col md:grid md:grid-cols-12 gap-6 sm:gap-8 md:items-end mb-8 sm:mb-12 md:mb-20">
          <div className="md:col-span-8 space-y-6 sm:space-y-8">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tighter uppercase">
              Our Approach
            </h2>
            <button className="flex items-center gap-3 bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full text-[10px] sm:text-xs font-bold tracking-widest hover:bg-opacity-90 transition-all group shadow-lg shadow-primary/20">
              DISCOVER NOW
              <MdArrowOutward className="text-lg sm:text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>
          <div className="md:col-span-4">
            <p className="text-accent/50 text-xs sm:text-sm leading-relaxed max-w-sm md:ml-auto">
              We follow a disciplined process to ensure every project is
              delivered with the highest quality and meets your specific
              business objectives.
            </p>
          </div>
        </div>

        <div className="w-full h-px bg-white/10 mb-8 sm:mb-10 md:mb-20"></div>

        {/* Content Section */}
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 xl:gap-20">
          {/* Left: Navigation Toggle */}
          <div className="lg:col-span-3 flex lg:flex-col gap-3 sm:gap-4 lg:gap-6 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 lg:border-r lg:border-white/10 lg:pr-8 xl:pr-12 -mx-4 px-4 lg:mx-0 lg:px-0">
            {approachData.map((step) => (
              <div
                key={step.id}
                onClick={() => setActiveStep(step)}
                className={`group cursor-pointer py-2 flex items-center gap-3 sm:gap-4 transition-all duration-300 flex-shrink-0 ${
                  activeStep.id === step.id ? "lg:translate-x-2" : ""
                }`}
              >
                <div
                  className={`hidden lg:block w-1 h-6 rounded-full transition-all duration-300 ${
                    activeStep.id === step.id
                      ? "bg-primary scale-y-100"
                      : "bg-transparent scale-y-0"
                  }`}
                ></div>
                <h3
                  className={`text-sm sm:text-base font-bold transition-colors duration-300 whitespace-nowrap lg:whitespace-normal ${
                    activeStep.id === step.id
                      ? "text-primary"
                      : "text-white/40 hover:text-white/70"
                  }`}
                >
                  {step.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Middle: Illustration */}
          <div className="lg:col-span-4 flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[250px] sm:max-w-[300px] md:max-w-[350px] animate-in fade-in zoom-in duration-700">
              <Image
                src={activeStep.image}
                alt={activeStep.title}
                fill
                className="object-contain drop-shadow-[0_0_30px_rgba(0,188,212,0.2)]"
              />
            </div>
          </div>

          {/* Right: Detailed Content */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-8 duration-700">
            <div>
              <span className="text-xs sm:text-sm font-medium text-primary/60 mb-2 block">
                {activeStep.id}/
              </span>
              <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
                {activeStep.title}
              </h4>
              <p className="text-accent/60 text-base sm:text-lg leading-relaxed max-w-md">
                {activeStep.description}
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {activeStep.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2 sm:gap-3">
                  <MdCheckCircle className="text-primary text-lg sm:text-xl flex-shrink-0" />
                  <span className="text-accent/80 text-sm sm:text-base font-medium tracking-tight">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default OurApproach;
