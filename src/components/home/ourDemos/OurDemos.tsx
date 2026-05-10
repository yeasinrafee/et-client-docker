import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import Container from "@/components/shared/layout/Container";

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

interface OurDemosProps {
  data: DemoItem[];
}

const OurDemos = ({ data }: OurDemosProps) => {
  const displayedDemos = data.slice(0, 3);

  if (!data || data.length === 0) return null;

  return (
    <section
      id="demos"
      className="pt-10! pb-12! md:py-16! bg-[#F8F8F8] border-b border-accent"
    >
      <Container>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <div className="space-y-4">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-secondary tracking-tighter uppercase">
              OUR DEMOS
            </h2>
            <p className="text-secondary/50 text-lg max-w-xl">
              Explore our ready-to-deploy project demonstrations.
            </p>
          </div>
          <Link
            href="/demos"
            className="flex items-center max-w-fit gap-3 bg-primary text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest hover:bg-opacity-90 transition-all group shadow-lg shadow-primary/20"
          >
            VIEW ALL DEMOS
            <MdArrowOutward className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Demos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {displayedDemos.map((demo) => {
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
                <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-8 transition-transform duration-500 ease-out group-hover:-translate-y-2 border border-accent bg-white">
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
  );
};

export default OurDemos;
