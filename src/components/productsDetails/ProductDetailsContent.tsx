"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MdArrowOutward,
  MdArrowBack,
  MdCalendarToday,
  MdGroup,
  MdAccessTime,
  MdStar,
  MdChevronLeft,
  MdChevronRight,
  MdCheck,
} from "react-icons/md";
import useEmblaCarousel from "embla-carousel-react";
import { productsData } from "@/data/productsData";
import Container from "@/components/shared/layout/Container";
import PageHero from "../ui/PageHero";

type Product = (typeof productsData)[number];

interface Props {
  product: Product;
}

const ProductDetailsContent = ({ product }: Props) => {
  const [activeImage, setActiveImage] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    duration: 35,
  });

  // Scroll to active thumbnail when activeImage changes
  useEffect(() => {
    if (emblaApi) {
      emblaApi.scrollTo(activeImage);
    }
  }, [emblaApi, activeImage]);

  // Get related products (same tag, exclude current)
  const relatedProducts = productsData
    .filter((p) => p.tag === product.tag && p.id !== product.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner */}
      <PageHero
        title={product.title}
        subtitle={product.description}
        buttonText="LET'S DISCUSS YOUR PROJECT"
        buttonHref="/#contact"
        bgImage={product.images[0]}
      />

      {/* Breadcrumb & Navigation */}
      <section className="bg-white border-b border-accent">
        <Container>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-4">
            <Link
              href="/products"
              className="flex items-center gap-2 text-secondary/50 hover:text-primary transition-colors text-sm font-medium"
            >
              <MdArrowBack className="text-lg" />
              Back to Products
            </Link>
            <div className="hidden sm:flex items-center gap-2 text-secondary/40 text-sm">
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
              <span>/</span>
              <Link
                href="/products"
                className="hover:text-primary transition-colors"
              >
                Products
              </Link>
              <span>/</span>
              <span className="text-secondary font-medium">
                {product.title}
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* Project Overview */}
      <section className="py-6 md:py-10 lg:py-16 xl:py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Image Gallery */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden border border-accent bg-[#F8F8F8]">
                <Image
                  src={product.images[activeImage]}
                  alt={`${product.title} - Screenshot ${activeImage + 1}`}
                  fill
                  className="object-cover object-top transition-opacity duration-500"
                />
                {/* Image Navigation */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActiveImage((prev) =>
                          prev === 0 ? product.images.length - 1 : prev - 1,
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-all"
                    >
                      <MdChevronLeft className="text-2xl" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImage((prev) =>
                          prev === product.images.length - 1 ? 0 : prev + 1,
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm text-white flex items-center justify-center hover:bg-black/50 transition-all"
                    >
                      <MdChevronRight className="text-2xl" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex -ml-4">
                  {product.images.map((img, index) => (
                    <div
                      key={index}
                      className="pl-4 flex-[0_0_40%] md:flex-[0_0_35%] lg:flex-[0_0_33.3333%]"
                    >
                      <button
                        onClick={() => setActiveImage(index)}
                        className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all duration-300 ${
                          activeImage === index
                            ? "border-primary shadow-lg shadow-primary/10"
                            : "border-accent hover:border-primary/30"
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover object-top"
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Project Info */}
            <div className="space-y-6 lg:space-y-10">
              {/* Tags */}
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-primary/5 text-primary text-xs font-bold tracking-widest rounded-full border border-primary/10 uppercase">
                  {product.category}
                </span>
                <span className="px-4 py-2 bg-secondary/5 text-secondary/70 text-xs font-bold tracking-widest rounded-full border border-secondary/10 uppercase">
                  {product.tag}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl font-bold text-secondary tracking-tighter leading-tight">
                {product.title}
              </h2>

              {/* Description */}
              <p className="text-secondary/60 text-lg leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Project Meta */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 py-8 border-y border-accent">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-secondary/40 text-sm">
                    <MdGroup className="text-primary text-lg" />
                    Client
                  </div>
                  <p className="text-secondary font-bold">{product.client}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-secondary/40 text-sm">
                    <MdCalendarToday className="text-primary text-lg" />
                    Launch Date
                  </div>
                  <p className="text-secondary font-bold">
                    {new Date(product.launchDate).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-secondary/40 text-sm">
                    <MdAccessTime className="text-primary text-lg" />
                    Duration
                  </div>
                  <p className="text-secondary font-bold">{product.duration}</p>
                </div>
              </div>

              {/* Technologies */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-secondary/40 tracking-widest uppercase">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {product.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2.5 bg-secondary text-white text-xs font-bold tracking-wider rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Key Metrics */}
      <section className="py-6 md:py-10 lg:py-16 xl:py-20 bg-secondary">
        <Container>
          <div className="text-center space-y-4 mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
              Key Results
            </h2>
            <p className="text-white/40 text-lg">{product.results}</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {product.keyMetrics.map((metric, index) => (
              <div
                key={index}
                className="text-center space-y-4 p-8 rounded-[28px] bg-white/5 border border-white/5 hover:border-primary/30 transition-all duration-300"
              >
                <p className="text-4xl md:text-5xl font-bold text-primary tracking-tighter">
                  {metric.value}
                </p>
                <p className="text-white/50 text-sm font-bold tracking-widest uppercase">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Challenge & Solution */}
      <section className="py-6 md:py-10 lg:py-16 xl:py-20 bg-white">
        <Container>
          <div className="grid lg:grid-cols-2 gap-12 md:gap-16 lg:gap-24">
            {/* Challenge */}
            <div className="space-y-4 md:space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-orange/10 flex items-center justify-center">
                  <span className="text-orange text-xl font-bold">!</span>
                </div>
                <h3 className="text-3xl font-bold text-secondary tracking-tighter">
                  The Challenge
                </h3>
              </div>
              <p className="text-secondary/60 text-base md:text-lg leading-relaxed">
                {product.challenge}
              </p>
            </div>

            {/* Solution */}
            <div className="space-y-4 md:space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <span className="text-primary text-xl font-bold">✓</span>
                </div>
                <h3 className="text-3xl font-bold text-secondary tracking-tighter">
                  Our Solution
                </h3>
              </div>
              <p className="text-secondary/60 text-base md:text-lg leading-relaxed">
                {product.solution}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Features */}
      <section className="py-6 md:py-10 lg:py-16 xl:py-20 bg-[#F8F8F8]">
        <Container>
          <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-center">
            {/* Left Side: Feature Image */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] rounded-[40px] overflow-hidden border border-accent shadow-2xl shadow-black/5 group">
                <Image
                  src={product.featureImage || product.images[0]}
                  alt="Feature Highlight"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>

            {/* Right Side: Features List */}
            <div className="lg:col-span-6 space-y-10">
              <div className="space-y-4 md:space-y-6">
                <h2 className="text-4xl md:text-5xl font-bold text-secondary tracking-tighter">
                  Key Features
                </h2>
                <p className="text-secondary/60 text-base md:text-lg leading-relaxed">
                  We&apos;ve engineered this solution with a focus on
                  performance, scalability, and user-centric design.
                </p>
              </div>

              <div className="grid gap-6">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                      <MdCheck className="text-primary text-xl group-hover:text-white transition-colors duration-300" />
                    </div>
                    <span className="text-lg font-bold text-secondary/80 group-hover:text-secondary transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Testimonial */}
      <section className="py-6 md:py-10 lg:py-16 xl:py-20 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-10">
            <div className="flex justify-center gap-1">
              {[...Array(5)].map((_, i) => (
                <MdStar key={i} className="text-primary text-3xl" />
              ))}
            </div>
            <blockquote className="text-2xl md:text-4xl font-bold text-secondary tracking-tight leading-snug italic">
              &ldquo;{product.testimonial.quote}&rdquo;
            </blockquote>
            <div className="space-y-2">
              <p className="text-secondary font-bold text-lg">
                {product.testimonial.author}
              </p>
              <p className="text-secondary/40 text-sm font-medium">
                {product.testimonial.role}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-6 md:py-10 lg:py-16 xl:py-20 bg-[#F8F8F8] border-t border-accent">
          <Container>
            <div className="flex justify-between items-end mb-12 md:mb-16">
              <div className="space-y-2 md:space-y-4">
                <h2 className="text-4xl md:text-5xl font-bold text-secondary tracking-tighter">
                  Related Projects
                </h2>
                <p className="text-secondary/40 text-lg">
                  More work in {product.tag.toLowerCase()}
                </p>
              </div>
              <Link
                href="/#our-products"
                className="hidden md:flex items-center gap-2 text-primary text-sm font-bold tracking-widest uppercase hover:gap-3 transition-all"
              >
                VIEW ALL
                <MdArrowOutward className="text-lg" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.slug}`}
                  className="group cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] bg-white rounded-[32px] overflow-hidden mb-8 transition-transform duration-500 ease-out group-hover:-translate-y-2 border border-accent">
                    <Image
                      src={related.images[0]}
                      alt={related.title}
                      fill
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute bottom-6 left-6">
                      <span className="px-4 py-2 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold tracking-widest rounded-full border border-white/20 uppercase">
                        {related.tag}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-1 px-2">
                    <span className="text-[10px] font-bold text-secondary/40 tracking-widest uppercase">
                      {related.category}
                    </span>
                    <h3 className="text-2xl font-bold text-secondary group-hover:text-primary transition-colors">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-6 md:py-10 lg:py-16 xl:py-20 bg-secondary">
        <Container>
          <div className="text-center space-y-8 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
              Have a similar project in mind?
            </h2>
            <p className="text-white/40 text-lg">
              Let&apos;s discuss how we can bring your vision to life with the
              same dedication and expertise.
            </p>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-3 bg-primary text-white px-6 md:px-10 py-3 md:py-5 rounded-full text-sm font-bold tracking-widest hover:bg-opacity-90 transition-all group shadow-lg shadow-primary/20"
            >
              LET&apos;S TALK
              <MdArrowOutward className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default ProductDetailsContent;
