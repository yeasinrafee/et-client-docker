"use client";

import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MdArrowBack,
  MdClose,
  MdCheck,
  MdArrowOutward,
  MdChevronLeft,
  MdChevronRight,
} from "react-icons/md";
import useEmblaCarousel from "embla-carousel-react";
import Container from "@/components/shared/layout/Container";
import PageHero from "../ui/PageHero";
import { demosData } from "@/data/demosData";

type Demo = (typeof demosData)[number];

interface Props {
  demo: Demo;
}

const DemoDetailsContent = ({ demo }: Props) => {
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
        title={demo.title}
        subtitle={demo.description}
        buttonText="START A SIMILAR PROJECT"
        buttonHref="/#contact"
        bgImage={demo.featureImage}
      />

      {/* Breadcrumb & Navigation */}
      <section className="bg-white border-b border-accent">
        <Container>
          <div className="flex items-center justify-between py-4">
            <Link
              href="/demos"
              className="flex items-center gap-2 text-secondary/50 hover:text-primary transition-colors text-sm font-medium"
            >
              <MdArrowBack className="text-lg" />
              Back to Demos
            </Link>
            <div className="flex items-center gap-2 text-secondary/40 text-sm">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/demos"
                className="hover:text-primary transition-colors"
              >
                Demos
              </Link>
              <span>/</span>
              <span className="text-secondary font-medium">{demo.title}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Overview & Tech Stack */}
      <section className="py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-secondary tracking-tighter">
                Project Overview
              </h2>
              <p className="text-secondary/60 text-lg leading-relaxed">
                {demo.description}
              </p>

              <div className="pt-8">
                <h3 className="text-2xl font-bold text-secondary mb-6">
                  Key Features
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {demo.features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <MdCheck className="text-primary text-sm" />
                      </div>
                      <span className="text-secondary/80 font-medium">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 p-8 rounded-[32px] bg-[#F8F8F8] border border-accent space-y-8">
              <div>
                <h3 className="text-sm font-bold text-secondary/40 tracking-widest uppercase mb-4">
                  Technologies
                </h3>
                <div className="flex flex-wrap gap-2">
                  {demo.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-white text-secondary border border-accent text-xs font-bold tracking-wider rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-secondary/40 tracking-widest uppercase mb-4">
                  Category
                </h3>
                <span className="text-secondary font-bold text-lg">
                  {demo.category}
                </span>
              </div>

              <Link
                href={demo.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full gap-2 bg-primary text-white px-6 py-4 rounded-full text-sm font-bold tracking-widest hover:bg-opacity-90 transition-all group"
              >
                LIVE PREVIEW
                <MdArrowOutward className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Demo Screenshots Gallery */}
      <section className="py-24 bg-[#F8F8F8]">
        <Container>
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-secondary tracking-tighter">
                Demo Screenshots
              </h2>
              <p className="text-secondary/60 text-lg max-w-2xl">
                Click on any image to view it in full screen. You can scroll to
                explore long pages in detail.
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
              {demo.images.map((img, index) => (
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
                      alt={`${demo.title} Screenshot ${index + 1}`}
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
              alt="Full Screen Screenshot"
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

export default DemoDetailsContent;
