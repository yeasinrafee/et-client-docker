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
import Container from "@/components/shared/layout/Container";
import PageHero from "../ui/PageHero";

interface CategoryData {
  _id?: string;
  name: string;
  slug?: string;
}

interface ProductData {
  _id?: string;
  id?: string;
  title: string;
  category?: string;
  categories?: CategoryData[];
  tags: string[];
  images: string[];
  description: string;
  fullDescription: string;
  challenge?: string;
  solution?: string;
  features?: string[];
  featureImage?: string;
  contentHtml?: string;
  technologies: string[];
  client: string;
  launchDate?: string;
  duration?: string;
  teamSize?: number;
  results?: string;
  keyMetrics?: Array<{ label: string; value: string }>;
  testimonial?: { quote: string; author: string; role: string };
  slug: string;
}

interface Props {
  product: ProductData;
  relatedProducts?: ProductData[];
}

const ProductDetailsContent = ({ product, relatedProducts = [] }: Props) => {
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
                        className={`relative w-full aspect-[4/3] rounded-2xl overflow-hidden border-2 transition-all duration-300 ${activeImage === index
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
            <div className="space-y-5 lg:space-y-6">
              {/* Category */}
              {((product.categories && product.categories.length > 0) ||
                product.category) && (
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-secondary/40 tracking-widest uppercase">
                      Category
                    </span>
                    <div className="flex flex-wrap gap-2 sm:gap-3">
                      {product.categories && product.categories.length > 0
                        ? product.categories.map((cat) => (
                          <span
                            key={cat._id || cat.slug || cat.name}
                            className="px-4 py-2 bg-primary/5 text-primary text-xs font-bold tracking-widest rounded-full border border-primary/10 uppercase"
                          >
                            {cat.name}
                          </span>
                        ))
                        : product.category && (
                          <span className="px-4 py-2 bg-primary/5 text-primary text-xs font-bold tracking-widest rounded-full border border-primary/10 uppercase">
                            {product.category}
                          </span>
                        )}
                    </div>
                  </div>
                )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="space-y-2">
                  <span className="text-xs font-bold text-secondary/40 tracking-widest uppercase">
                    Tags
                  </span>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-secondary/5 text-secondary/70 text-xs font-bold tracking-widest rounded-full border border-secondary/10 uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Title */}
              <h2 className="text-4xl md:text-5xl font-bold text-secondary tracking-tighter leading-tight">
                {product.title}
              </h2>

              {/* Description */}
              <p className="text-secondary/60 text-lg leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Project Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 py-5 sm:py-6 border-y border-accent">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-secondary/40 text-sm">
                    <MdGroup className="text-primary text-lg" />
                    Client
                  </div>
                  <p className="text-secondary font-bold">{product.client}</p>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-secondary/40 text-sm">
                    <MdCalendarToday className="text-primary text-lg" />
                    Launch Date
                  </div>
                  <p className="text-secondary font-bold">
                    {product.launchDate
                      ? new Date(product.launchDate).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          year: "numeric",
                        },
                      )
                      : "N/A"}
                  </p>
                </div>
                <div className="space-y-1.5 col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2 text-secondary/40 text-sm">
                    <MdAccessTime className="text-primary text-lg" />
                    Duration
                  </div>
                  <p className="text-secondary font-bold">{product.duration}</p>
                </div>
              </div>

              {/* Technologies */}
              {product.technologies && product.technologies.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-secondary/40 tracking-widest uppercase">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {product.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3.5 py-2 bg-secondary text-white text-xs font-bold tracking-wider rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Rich Text Editor Content */}
      {product.contentHtml && (
        <section className=" bg-white border-t border-accent">
          <Container>
            <div className="container mx-auto">
              <div
                className="rich-text-content prose prose-lg max-w-none text-secondary/80"
                dangerouslySetInnerHTML={{ __html: product.contentHtml }}
              />
            </div>
          </Container>
          <style jsx global>{`
            .rich-text-content {
              font-size: 1.125rem;
              line-height: 1.8;
              color: #2d3748;
            }
            .rich-text-content h1,
            .rich-text-content h2,
            .rich-text-content h3 {
              color: #1a202c;
              font-weight: 800;
              letter-spacing: -0.025em;
              margin-top: 3.5rem;
              margin-bottom: 1.25rem;
              position: relative;
            }
            .rich-text-content h1 {
              font-size: 2.25rem;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 0.5rem;
            }
            .rich-text-content h2 {
              font-size: 2rem;
              border-bottom: 2px solid #e2e8f0;
              padding-bottom: 0.75rem;
              margin-top: 4rem;
              color: #1a202c;
            }
            .rich-text-content h2::after {
              content: "";
              position: absolute;
              bottom: -2px;
              left: 0;
              width: 80px;
              height: 2px;
              background-color: #1677ff;
            }
            .rich-text-content h3 {
              font-size: 1.5rem;
              color: #2d3748;
              padding-left: 0.75rem;
              border-left: 4px solid #1677ff;
            }
            .rich-text-content p {
              margin-bottom: 1.75rem;
              color: #4a5568;
            }
            .rich-text-content strong {
              font-weight: 700;
              color: #1a202c;
            }
            .rich-text-content ul {
              list-style-type: none;
              padding-left: 0;
              margin-bottom: 1.75rem;
              display: grid;
              gap: 0.6rem;
            }
            .rich-text-content ul li {
              position: relative;
              padding-left: 1.75rem;
              color: #4a5568;
            }
            .rich-text-content ul li p {
              margin-bottom: 0;
            }
            .rich-text-content ul li::before {
              content: "✓";
              position: absolute;
              left: 0;
              top: 0;
              color: #1677ff;
              font-weight: bold;
            }
            .rich-text-content ol {
              list-style-type: decimal;
              padding-left: 1.75rem;
              margin-bottom: 1.75rem;
              color: #4a5568;
            }
            .rich-text-content ol li {
              margin-bottom: 0.5rem;
            }
            .rich-text-content ol li p {
              margin-bottom: 0;
            }
            .rich-text-content blockquote {
              border-left: 4px solid #1677ff;
              padding: 1.25rem 1.75rem;
              margin: 2.5rem 0;
              background-color: #f7fafc;
              border-radius: 0 12px 12px 0;
              color: #4a5568;
              font-style: italic;
              font-size: 1.25rem;
              line-height: 1.6;
              box-shadow: inset 0 2px 4px 0 rgba(0, 0, 0, 0.02);
            }
            .rich-text-content pre {
              background-color: #1a202c;
              color: #edf2f7;
              border-radius: 12px;
              padding: 1.5rem;
              overflow-x: auto;
              margin: 2rem 0;
              font-size: 0.95rem;
              border: 1px solid #e2e8f0;
            }
            .rich-text-content code {
              background-color: #edf2f7;
              padding: 0.2rem 0.4rem;
              border-radius: 4px;
              font-size: 0.9em;
              color: #e53e3e;
              font-family: monospace;
            }
            .rich-text-content pre code {
              background-color: transparent;
              color: inherit;
              padding: 0;
              font-size: inherit;
            }
            .rich-text-content a {
              color: #1677ff;
              text-decoration: underline;
              font-weight: 500;
            }
            .rich-text-content a:hover {
              color: #0f62d9;
            }
            .rich-text-content img {
              max-width: 100%;
              height: auto;
              border-radius: 16px;
              margin: 3rem auto;
              display: block;
              box-shadow:
                0 20px 25px -5px rgba(0, 0, 0, 0.1),
                0 10px 10px -5px rgba(0, 0, 0, 0.04);
            }
            .rich-text-content sub,
            .rich-text-content sup {
              font-size: 0.7em;
            }
            .rich-text-content ul[data-type="taskList"] {
              list-style: none;
              padding-left: 0;
              display: block;
            }
            .rich-text-content ul[data-type="taskList"] li {
              display: flex;
              align-items: flex-start;
              gap: 0.6rem;
              padding-left: 0;
              margin-bottom: 0.5rem;
            }
            .rich-text-content ul[data-type="taskList"] li::before {
              content: none;
            }
            .rich-text-content ul[data-type="taskList"] li > div p {
              margin-bottom: 0;
            }
            .rich-text-content ul[data-type="taskList"] li > label {
              margin-top: 0.3rem;
              user-select: none;
            }
            .rich-text-content ul[data-type="taskList"] input[type="checkbox"] {
              width: 16px;
              height: 16px;
              cursor: default;
              accent-color: #1677ff;
            }
            .rich-text-content table {
              width: 100%;
              border-collapse: collapse;
              table-layout: fixed;
              margin: 2.5rem 0;
              overflow: hidden;
              border-radius: 12px;
              border: 1px solid #e2e8f0;
              display: block;
              overflow-x: auto;
              white-space: normal;
            }
            .rich-text-content table tbody,
            .rich-text-content table thead {
              display: table;
              width: 100%;
              table-layout: fixed;
            }
            .rich-text-content table td,
            .rich-text-content table th {
              border: 1px solid #e2e8f0;
              padding: 0.75rem 1rem;
              vertical-align: top;
              text-align: left;
              color: #4a5568;
            }
            .rich-text-content table th {
              background-color: #f7fafc;
              color: #1a202c;
              font-weight: 700;
            }
            .rich-text-content table tr:nth-child(even) td {
              background-color: #fafbfc;
            }
          `}</style>
        </section>
      )}

      {/* Testimonial */}
      {product.testimonial && (
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
      )}

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
                  More work in{" "}
                  {product.tags && product.tags.length > 0
                    ? product.tags[0].toLowerCase()
                    : product.categories && product.categories.length > 0
                      ? product.categories[0].name.toLowerCase()
                      : "this category"}
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
                  key={related._id || related.id || related.slug}
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
                    {related.tags && related.tags.length > 0 && (
                      <div className="absolute bottom-6 left-6">
                        <span className="px-4 py-2 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold tracking-widest rounded-full border border-white/20 uppercase">
                          {related.tags[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="space-y-1 px-2">
                    <span className="text-[10px] font-bold text-secondary/40 tracking-widest uppercase">
                      {related.categories && related.categories.length > 0
                        ? related.categories.map((c) => c.name).join(", ")
                        : related.category}
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
