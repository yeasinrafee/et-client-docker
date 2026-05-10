"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { MdArrowBack, MdArrowForward, MdStar } from "react-icons/md";
import Image from "next/image";
import Container from "@/components/shared/layout/Container";

interface ReviewItem {
  _id?: string;
  id?: number;
  name: string;
  company: string;
  review: string;
  rating: number;
  avatar: string;
}

interface ReviewsProps {
  data: ReviewItem[];
}

const Reviews = ({ data }: ReviewsProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi],
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  if (!data || data.length === 0) return null;

  return (
    <section className="py-10 sm:py-12 md:py-20 bg-[#F8F8F8] border-b border-accent">
      <Container>
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 sm:gap-8 lg:gap-10 mb-12 sm:mb-16 md:mb-20">
          <div className="max-w-2xl space-y-4 sm:space-y-6 md:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-secondary tracking-tighter leading-tight">
                What Our <br className="hidden sm:block" /> Clients Say
              </h2>
              <p className="text-secondary/50 text-base sm:text-lg md:text-xl font-medium">
                Highest rated with an average 4.95 out of 5.00 from 2,290
                reviews
              </p>
            </div>
          </div>

          <div className="hidden lg:block lg:max-w-xs pb-4">
            <p className="text-secondary/40 text-sm leading-relaxed border-l-2 border-primary/20 pl-6">
              Our clients&apos; success is our ultimate goal. We take pride in
              delivering solutions that exceed expectations and drive real
              business value.
            </p>
          </div>
        </div>

        {/* Carousel Section */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {data.map((review, index) => (
                <div
                  key={review._id || review.id}
                  className={`flex-[0_0_100%] sm:flex-[0_0_80%] md:flex-[0_0_45%] lg:flex-[0_0_33.33%] pl-0 sm:pl-6 transition-opacity duration-500 ease-out ${
                    selectedIndex === index ? "opacity-100" : "opacity-30"
                  }`}
                >
                  <div className="bg-white p-6 sm:p-8 md:p-10 rounded-[24px] sm:rounded-[32px] flex flex-col justify-between space-y-6 sm:space-y-8 min-h-[280px] sm:min-h-[320px] md:min-h-[350px]">
                    <p className="text-secondary/80 text-base sm:text-lg md:text-xl font-medium leading-relaxed italic">
                      &ldquo;{review.review}&rdquo;
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-secondary/5">
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0">
                          <Image
                            src={review.avatar}
                            alt={review.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-sm sm:text-base font-bold text-secondary">
                            {review.name}
                          </h4>
                          <p className="text-[10px] sm:text-xs text-secondary/40">
                            {review.company}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-0.5">
                        {[...Array(review.rating)].map((_, i) => (
                          <MdStar
                            key={i}
                            className="text-primary text-base sm:text-lg"
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center md:justify-start items-center gap-3 sm:gap-4 mt-8 sm:mt-10 md:mt-12">
            <button
              onClick={scrollPrev}
              className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all group"
            >
              <MdArrowBack className="text-xl sm:text-2xl group-active:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollNext}
              className="w-11 h-11 sm:w-14 sm:h-14 rounded-full border border-secondary/10 flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-all group"
            >
              <MdArrowForward className="text-xl sm:text-2xl group-active:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Reviews;
