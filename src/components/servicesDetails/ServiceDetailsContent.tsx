"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MdArrowBack,
  MdClose,
  MdCheck,
  MdChevronLeft,
  MdChevronRight,
  MdArrowOutward,
} from "react-icons/md";
import useEmblaCarousel from "embla-carousel-react";
import Container from "@/components/shared/layout/Container";
import PageHero from "../ui/PageHero";
import { servicesData } from "@/data/servicesData";

type Service = (typeof servicesData)[number];

interface Props {
  service: Service;
}

const ServiceDetailsContent = ({ service }: Props) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start" });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Close modal when clicking outside
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setSelectedImage(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <PageHero
        title={service.title}
        subtitle={service.description}
        buttonText="CONSULT WITH US"
        buttonHref="/#contact"
        bgImage={service.images[0]}
      />

      {/* Breadcrumb & Navigation */}
      <section className="bg-white border-b border-accent">
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-center md:justify-between gap-4 py-4">
            <Link
              href="/#services"
              className="flex items-center gap-2 text-secondary/50 hover:text-primary transition-colors text-sm font-medium"
            >
              <MdArrowBack className="text-lg" />
              Back to Services
            </Link>
            <div className="hidden sm:flex items-center gap-2 text-secondary/40 text-sm">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/#services"
                className="hover:text-primary transition-colors"
              >
                Services
              </Link>
              <span>/</span>
              <span className="text-secondary font-medium">
                {service.title}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Overview & Tags */}
      <section className="py-6 sm:py-8 md:py-10 lg:py-16 bg-white relative">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-start">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-12">
              <div className="space-y-6">
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondary tracking-tighter">
                  Service Overview
                </h2>
                <div className="w-20 h-1.5 bg-primary rounded-full"></div>
                <p className="text-secondary/70 text-lg md:text-xl leading-relaxed font-medium">
                  {service.longDescription}
                </p>
              </div>

              <div className="pt-8 border-t border-accent">
                <h3 className="text-3xl font-bold text-secondary mb-8">
                  What You Get
                </h3>
                <div className="grid sm:grid-cols-2 gap-y-6 gap-x-8">
                  {service.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-4 group">
                      <div className="w-8 h-8 rounded-full bg-[#F8F8F8] border border-accent flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:border-primary transition-colors duration-300 mt-0.5">
                        <MdCheck className="text-primary text-sm group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-secondary/80 font-bold text-lg group-hover:text-secondary transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 sticky top-32">
              <div className="p-8 md:p-10 rounded-[32px] bg-secondary text-white shadow-2xl space-y-10 relative overflow-hidden">
                {/* Background Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -ml-10 -mb-10"></div>

                <div className="relative z-10">
                  <h3 className="text-sm font-bold text-white/50 tracking-widest uppercase mb-6 flex items-center gap-2">
                    <span className="w-8 h-px bg-white/20"></span>
                    Core Competencies
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-white/5 border border-white/10 hover:border-primary/50 text-white/90 text-xs font-bold tracking-wider rounded-full transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 pt-8 border-t border-white/10">
                  <h3 className="text-sm font-bold text-white/50 tracking-widest uppercase mb-3">
                    Service Identifier
                  </h3>
                  <div className="text-5xl font-bold text-white tracking-tighter">
                    #{service.id}
                  </div>
                </div>

                <div className="relative z-10 pt-4">
                  <Link
                    href="/#contact"
                    className="flex items-center justify-center w-full gap-3 bg-primary text-white px-6 md:px-8 py-3.5 md:py-5 rounded-full text-xs md:text-sm font-bold tracking-widest hover:bg-white hover:text-secondary transition-all duration-300 group shadow-lg shadow-primary/20"
                  >
                    REQUEST PROPOSAL
                    <MdArrowOutward className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Process */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-secondary text-white">
        <Container>
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
              Our Process
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto">
              A structured and transparent approach to ensure successful
              delivery.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {service.process.map((step, index) => (
              <div
                key={index}
                className="relative p-8 rounded-[32px] bg-white/5 border border-white/10 hover:border-primary/50 transition-colors"
              >
                <div className="text-5xl font-bold text-white/10 absolute top-6 right-8">
                  {step.step}
                </div>
                <h3 className="text-xl font-bold text-white mb-4 mt-8">
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Key Benefits */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-white">
        <Container>
          <div className="text-center space-y-4 mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-secondary tracking-tighter">
              Key Benefits
            </h2>
            <p className="text-secondary/60 text-lg max-w-2xl mx-auto">
              How this service adds tangible value to your organization.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {service.benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-8 rounded-[32px] border border-accent bg-[#F8F8F8] hover:shadow-xl hover:shadow-primary/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                  <MdCheck className="text-primary text-2xl group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-4">
                  {benefit.title}
                </h3>
                <p className="text-secondary/60 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Visual Showcase Gallery */}
      <section className="py-8 sm:py-10 md:py-12 lg:py-16 bg-[#F8F8F8] border-t border-accent">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-secondary tracking-tighter">
                Visual Showcase
              </h2>
              <p className="text-secondary/60 text-lg max-w-2xl">
                A glimpse into our methodology and past work for this service.
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={scrollPrev}
                className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center bg-white hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 group"
              >
                <MdChevronLeft className="text-2xl" />
              </button>
              <button
                onClick={scrollNext}
                className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center bg-white hover:bg-primary hover:border-primary hover:text-white transition-all duration-300 group"
              >
                <MdChevronRight className="text-2xl" />
              </button>
            </div>
          </div>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-4">
              {service.images.map((img, index) => (
                <div
                  key={index}
                  className="pl-4 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.3333%]"
                >
                  <div
                    onClick={() => setSelectedImage(img as unknown as string)}
                    className="group cursor-pointer relative aspect-[4/3] w-full bg-white rounded-[32px] overflow-hidden border border-accent transition-all duration-500"
                  >
                    <Image
                      src={img}
                      alt={`${service.title} Showcase ${index + 1}`}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 flex items-center justify-center">
                      <div className="bg-white text-secondary px-6 py-3 rounded-full font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        View Full Screen
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Full Screen Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex justify-center overflow-y-auto cursor-zoom-out p-4 md:p-8"
          onClick={handleModalClick}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="fixed top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md flex items-center justify-center text-white transition-colors z-[60]"
          >
            <MdClose className="text-2xl" />
          </button>

          <div className="relative w-full max-w-6xl h-max min-h-screen my-auto rounded-xl overflow-hidden cursor-auto shadow-2xl">
            <Image
              src={selectedImage}
              alt="Full Screen Showcase"
              width={1920}
              height={1080}
              className="w-full h-auto rounded-xl"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetailsContent;
