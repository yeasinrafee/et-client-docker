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
type Service = {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  images: string[];
  longDescription?: string;
  tags?: string[];
  benefits?: { title: string; description: string }[];
  process?: { step: string; title: string; description: string }[];
  features?: string[];
  contentHtml?: string;
  seo?: any;
};

type ServiceNavItem = { slug: string; title: string };

interface Props {
  service: Service;
  allServices: ServiceNavItem[];
}

const ServiceDetailsContent = ({ service, allServices }: Props) => {
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
                <p className="text-secondary/70 text-lg md:text-xl leading-relaxed font-medium whitespace-pre-line">
                  {service.longDescription || service.description}
                </p>
              </div>

              {service.contentHtml && (
                <div className="pt-8 border-t border-accent">
                  <div
                    className="service-rich-content"
                    dangerouslySetInnerHTML={{ __html: service.contentHtml }}
                  />
                  <style>{`
                    .service-rich-content { font-size: 1rem; line-height: 1.8; color: #4b5563; word-break: break-word; }
                    .service-rich-content h1 { font-size: 2rem; font-weight: 700; color: #111827; margin-top: 2rem; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 2px solid #e5e7eb; }
                    .service-rich-content h2 { font-size: 1.5rem; font-weight: 600; color: #1f2937; margin-top: 1.75rem; margin-bottom: 0.75rem; }
                    .service-rich-content h3 { font-size: 1.25rem; font-weight: 600; color: #1f2937; margin-top: 1.5rem; margin-bottom: 0.75rem; }
                    .service-rich-content p { margin-bottom: 1rem; }
                    .service-rich-content p:last-child { margin-bottom: 0; }
                    .service-rich-content strong { font-weight: 700; color: #111827; }
                    .service-rich-content em { font-style: italic; }
                    .service-rich-content u { text-decoration: underline; text-underline-offset: 3px; }
                    .service-rich-content ul { list-style-type: disc; padding-left: 1.5rem; margin-bottom: 1.25rem; }
                    .service-rich-content ol { list-style-type: decimal; padding-left: 1.5rem; margin-bottom: 1.25rem; }
                    .service-rich-content li { margin-bottom: 0.35rem; }
                    .service-rich-content blockquote { border-left: 4px solid #1677ff; padding: 0.75rem 1rem; margin: 1.5rem 0; background-color: #f0f6ff; border-radius: 0 8px 8px 0; color: #374151; font-style: italic; }
                    .service-rich-content code { background-color: #f3f4f6; border: 1px solid #e5e7eb; border-radius: 4px; padding: 2px 6px; font-size: 0.9em; color: #dc2626; }
                    .service-rich-content pre { background-color: #1e293b; color: #e2e8f0; border-radius: 8px; padding: 1.25rem; overflow-x: auto; margin: 1.5rem 0; }
                    .service-rich-content pre code { background: none; border: none; padding: 0; color: inherit; }
                    .service-rich-content a { color: #1677ff; text-decoration: underline; }
                    .service-rich-content img { max-width: 100%; height: auto; border-radius: 12px; margin: 1.5rem 0; border: 1px solid #e5e7eb; }
                    .service-rich-content table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; font-size: 0.95em; }
                    .service-rich-content th, .service-rich-content td { border: 1px solid #d1d5db; padding: 0.75rem 1rem; text-align: left; }
                    .service-rich-content th { background-color: #f3f4f6; font-weight: 600; color: #111827; }
                    .service-rich-content tr:nth-child(even) td { background-color: #f9fafb; }
                  `}</style>
                </div>
              )}

              {service.features && service.features.length > 0 && (
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
              )}
            </div>

            {/* Right Sidebar */}
            <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6 self-start">

              {/* Tags Card — real data from service.tags */}
              {service.tags && service.tags.length > 0 && (
                <div className="p-6 md:p-8 rounded-[32px] bg-secondary text-white space-y-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-primary/20 rounded-full blur-3xl -mr-8 -mt-8 pointer-events-none"></div>
                  <h3 className="relative z-10 text-sm font-bold text-white/50 tracking-widest uppercase flex items-center gap-2">
                    <span className="w-6 h-px bg-white/20"></span>
                    Expertise Areas
                  </h3>
                  <div className="relative z-10 flex flex-wrap gap-2.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3.5 py-1.5 bg-white/5 border border-white/10 hover:border-primary/60 hover:bg-primary/10 text-white/80 hover:text-white text-[11px] font-bold tracking-wider rounded-full transition-all duration-200 cursor-default"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Our Services Navigation — from servicesData */}
              <div className="p-6 md:p-8 rounded-[32px] bg-[#F8F8F8] border border-accent space-y-5">
                <h3 className="text-sm font-bold text-secondary/50 tracking-widest uppercase flex items-center gap-2">
                  <span className="w-6 h-px bg-secondary/20"></span>
                  All Services
                </h3>
                <div className="space-y-2.5">
                  {allServices.map((s) => {
                    const isActive = s.slug === service.slug;
                    return (
                      <Link
                        key={s.slug}
                        href={`/services/${s.slug}`}
                        className={`flex items-center justify-between px-4 py-3.5 rounded-2xl border transition-all duration-300 group ${
                          isActive
                            ? "bg-primary border-primary text-white shadow-md shadow-primary/20"
                            : "bg-white border-accent hover:border-primary/40 text-secondary hover:bg-white"
                        }`}
                      >
                        <span className="font-bold text-sm leading-tight">{s.title}</span>
                        <MdArrowOutward
                          className={`text-base shrink-0 transition-all duration-300 ${
                            isActive
                              ? "text-white"
                              : "text-secondary/20 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          }`}
                        />
                      </Link>
                    );
                  })}
                </div>

                {/* CTA button inside the services card */}
                <div className="pt-2 border-t border-accent">
                  <Link
                    href="/#contact"
                    className="flex items-center justify-center w-full gap-2 bg-secondary text-white px-6 py-3.5 rounded-full text-xs font-bold tracking-widest hover:bg-primary transition-all duration-300 group"
                  >
                    REQUEST PROPOSAL
                    <MdArrowOutward className="text-base group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </Container>
      </section>

      {/* Our Process */}
      {service.process && service.process.length > 0 && (
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
      )}

      {/* Key Benefits */}
      {service.benefits && service.benefits.length > 0 && (
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
      )}

      {/* Visual Showcase Gallery */}
      {service.images && service.images.length > 0 && (
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
                      <div className="absolute inset-0 transition-transform duration-[4000ms] ease-in-out group-hover:-translate-y-[50%]">
                        <img
                          src={img as unknown as string}
                          alt={`${service.title} Showcase ${index + 1}`}
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
      )}

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
