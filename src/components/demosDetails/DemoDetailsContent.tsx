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

type Demo = (typeof demosData)[number] & {
  contentHtml?: string;
  categories?: any[];
  seo?: any;
};

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
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
            <Link
              href="/demos"
              className="flex items-center gap-2 text-secondary/50 hover:text-primary transition-colors text-sm font-medium"
            >
              <MdArrowBack className="text-lg" />
              Back to Demos
            </Link>
            <div className="hidden sm:flex items-center gap-2 text-secondary/40 text-sm">
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
      <section className="py-6 md:py-10 lg:py-16 xl:py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-12 gap-12 md:gap-16 lg:gap-24 items-start">
            <div className="lg:col-span-7 space-y-4 md:space-y-8">
              <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-secondary tracking-tighter">
                  Project Overview
                </h2>
                <p className="text-secondary/60 text-base md:text-lg leading-relaxed whitespace-pre-line">
                  {demo.description}
                </p>
              </div>

              {demo.contentHtml && (
                <div className="pt-8 border-t border-accent">
                  <div
                    className="demo-rich-content"
                    dangerouslySetInnerHTML={{ __html: demo.contentHtml }}
                  />
                  <style>{`
                    .demo-rich-content { font-size: 1rem; line-height: 1.8; color: #4b5563; word-break: break-word; }
                    .demo-rich-content h1 { font-size: 2rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e5e7eb; }
                    .demo-rich-content h2 { font-size: 1.5rem; font-weight: 600; color: #1f2937; margin-top: 1.75rem; margin-bottom: 0.75rem; }
                    .demo-rich-content h3 { font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-top: 1.5rem; margin-bottom: 0.75rem; }
                    .demo-rich-content p { margin-bottom: 1rem; }
                    .demo-rich-content p:last-child { margin-bottom: 0; }
                    .demo-rich-content strong { font-weight: 700; color: #111827; }
                    .demo-rich-content em { font-style: italic; }
                    .demo-rich-content u { text-decoration: underline; text-underline-offset: 3px; }
                    .demo-rich-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; }
                    .demo-rich-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.25rem; }
                    .demo-rich-content li { margin-bottom: 0.35rem; }
                    .demo-rich-content blockquote { border-left: 4px solid #1677ff; padding: 0.75rem 1rem; margin: 1.5rem 0; background-color: #f0f6ff; border-radius: 0 8px 8px 0; color: #374151; font-style: italic; }
                    .demo-rich-content code { background-color: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 4px; padding: 2px 6px; font-size: 0.9em; color: #dc2626; }
                    .demo-rich-content pre { background-color: #1e293b; color: #e2e8f0; border-radius: 8px; padding: 1.25rem; overflow-x: auto; margin: 1.5rem 0; }
                    .demo-rich-content pre code { background: none; border: none; padding: 0; color: inherit; }
                    .demo-rich-content a { color: #1677ff; text-decoration: underline; }
                    .demo-rich-content img { max-width: 100%; height: auto; border-radius: 12px; margin: 1.5rem 0; border: 1px solid #e5e7eb; }
                    .demo-rich-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.95em; }
                    .demo-rich-content th, .demo-rich-content td { border: 1px solid #d1d5db; padding: 0.75rem 1rem; text-align: left; }
                    .demo-rich-content th { background-color: #f3f4f6; font-weight: 600; color: #111827; }
                    .demo-rich-content tr:nth-child(even) td { background-color: #f9fafb; }
                  `}</style>
                </div>
              )}

              {demo.features && demo.features.length > 0 && (
                <div className="pt-8 border-t border-accent">
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
              )}
            </div>

            <div className="lg:col-span-5 p-6 md:p-8 rounded-[32px] bg-[#F8F8F8] border border-accent space-y-8 lg:sticky lg:top-28 self-start">
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
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-white text-secondary border border-accent text-xs font-bold tracking-wider rounded-full uppercase">
                    {demo.category || (demo.categories && demo.categories[0] && (typeof demo.categories[0] === 'object' ? demo.categories[0].name : demo.categories[0])) || "N/A"}
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-bold text-secondary/40 tracking-widest uppercase mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {demo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-primary/5 text-primary border border-primary/10 text-xs font-bold tracking-wider rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href={demo.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full gap-2 bg-primary text-white px-6 md:px-8 py-3.5 md:py-5 rounded-full text-xs md:text-sm font-bold tracking-widest hover:bg-opacity-90 transition-all group shadow-lg shadow-primary/20"
              >
                LIVE PREVIEW
                <MdArrowOutward className="text-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Demo Screenshots Gallery */}
      <section className="py-6 md:py-10 lg:py-16 xl:py-20 bg-[#F8F8F8] border-t border-accent">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12 md:mb-16">
            <div className="space-y-2 md:space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold text-secondary tracking-tighter">
                Demo Screenshots
              </h2>
              <p className="text-secondary/60 text-base md:text-lg max-w-2xl">
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
            <div className="flex -ml-4 md:-ml-6">
              {demo.images.map((img, index) => (
                <div
                  key={index}
                  className="pl-4 md:pl-6 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.3333%]"
                >
                  <div
                    onClick={() => setSelectedImage(img as unknown as string)}
                    className="group cursor-pointer relative aspect-[4/3] w-full bg-white rounded-[32px] overflow-hidden border border-accent transition-all duration-500"
                  >
                    <div className="absolute inset-0 transition-transform duration-[4000ms] ease-in-out group-hover:-translate-y-[50%]">
                      <img
                        src={img as unknown as string}
                        alt={`${demo.title} Screenshot ${index + 1}`}
                        className="w-full h-auto object-cover object-top"
                      />
                    </div>
                    <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 flex items-center justify-center z-10">
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
