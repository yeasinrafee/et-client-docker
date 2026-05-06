"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import Container from "@/components/shared/layout/Container";
import { servicesData } from "@/data/servicesData";

const AllServices = () => {
  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-primary font-bold tracking-[0.2em] text-xs sm:text-sm uppercase bg-primary/5 px-4 py-2 rounded-full">
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-secondary leading-tight">
            Comprehensive Solutions for Your Digital Growth
          </h2>
          <p className="text-secondary/60 text-base sm:text-lg">
            We offer a wide range of services to help you build, grow, and maintain your digital products with cutting-edge technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              className="group bg-[#fcfcfc] border border-accent rounded-[32px] overflow-hidden hover:shadow-2xl hover:shadow-primary/5 transition-all duration-500 flex flex-col h-full animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image Header */}
              <div className="relative h-64 bg-primary p-8 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
                <div className="relative w-full h-full transform group-hover:scale-110 transition-transform duration-700 ease-out">
                  <Image
                    src={service.images[0]}
                    alt={service.title}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow space-y-6">
                <div className="space-y-4 flex-grow">
                  <div className="flex items-center justify-between">
                    <span className="text-primary font-bold text-sm tracking-widest">
                      {service.id}/
                    </span>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {service.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full border border-accent text-[9px] font-bold tracking-widest text-secondary/60 uppercase bg-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-secondary group-hover:text-primary transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-secondary/70 text-base leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                </div>

                <Link
                  href={`/services/${service.slug}`}
                  className="flex items-center gap-3 text-secondary font-bold text-sm group/btn w-max"
                >
                  <span className="tracking-widest uppercase text-xs sm:text-sm group-hover/btn:text-primary transition-colors">
                    LEARN MORE
                  </span>
                  <div className="w-10 h-10 rounded-full border border-primary flex items-center justify-center text-primary group-hover/btn:bg-primary group-hover/btn:text-white transition-all duration-300">
                    <MdArrowOutward className="text-xl" />
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default AllServices;
