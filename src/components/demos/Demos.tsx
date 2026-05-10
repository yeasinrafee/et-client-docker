import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import Container from "@/components/shared/layout/Container";
import PageHero from "@/components/ui/PageHero";
import s2 from "@/assets/images/services/s2.png";

interface DemoItem {
  _id?: string;
  id?: number;
  slug: string;
  title: string;
  category?: string;
  categories?: any[];
  tags: string[];
  images?: any[];
  featureImage?: any;
  description: string;
}

interface DemosProps {
  data: DemoItem[];
}

const Demos = ({ data }: DemosProps) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <PageHero
        title="OUR PROJECT DEMOS"
        subtitle="Experience our capabilities firsthand with interactive demonstrations of our most successful and innovative digital solutions."
        buttonText="START A PROJECT"
        buttonHref="/#contact"
        bgImage={s2}
      />

      {/* Demos Grid Section */}
      <section
        id="all-demos"
        className="py-6 md:py-10 lg:py-16 xl:py-20 bg-white border-b border-accent"
      >
        <Container>
          {/* Demos Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {data.map((demo) => {
              const thumbImage = demo.featureImage || demo.images?.[0];
              const categoryName =
                demo.category || demo.categories?.[0]?.name || "";
              return (
                <Link
                  key={demo._id || demo.id}
                  href={`/demos/${demo.slug}`}
                  className="group cursor-pointer"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-8 transition-transform duration-500 ease-out group-hover:-translate-y-2 border border-accent">
                    {thumbImage && (
                      <Image
                        src={thumbImage}
                        alt={demo.title}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    {/* Tag Overlay */}
                    <div className="absolute bottom-6 left-6">
                      <span className="px-4 py-2 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold tracking-widest rounded-full border border-white/20 uppercase">
                        {demo.tags?.[0]}
                      </span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="space-y-3 px-2">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-secondary/40 tracking-widest uppercase">
                          {categoryName}
                        </span>
                        <h3 className="text-2xl md:text-3xl font-bold text-secondary transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1">
                          {demo.title}
                        </h3>
                      </div>
                      <div className="pt-2">
                        <MdArrowOutward className="text-3xl text-secondary/20 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                    <p className="text-secondary/60 text-sm line-clamp-2">
                      {demo.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Demos;
