import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import Container from "@/components/shared/layout/Container";
import { productsData } from "@/data/productsData";

const OurProducts = () => {
  const displayedProducts = productsData.slice(0, 6);

  return (
    <section
      id="products"
      className="pt-10! pb-12! md:py-16! bg-white border-b border-accent"
    >
      <Container>
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-secondary tracking-tighter">
            OUR PRODUCTS
          </h2>
          <Link
            href="/products"
            className="flex items-center max-w-fit gap-3 bg-primary text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-full text-[10px] sm:text-xs font-bold tracking-widest hover:bg-opacity-90 transition-all group shadow-lg shadow-primary/20"
          >
            ALL PRODUCTS
            <MdArrowOutward className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {displayedProducts.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group cursor-pointer"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/3] rounded-[32px] overflow-hidden mb-8 transition-transform duration-500 ease-out group-hover:-translate-y-2 border border-accent">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                {/* Tag Overlay */}
                <div className="absolute bottom-6 left-6">
                  <span className="px-4 py-2 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold tracking-widest rounded-full border border-white/20 uppercase">
                    {product.tags[0]}
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="space-y-3 px-2">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-secondary/40 tracking-widest uppercase">
                      {product.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-secondary transition-all duration-300 group-hover:text-primary group-hover:-translate-y-1">
                      {product.title}
                    </h3>
                  </div>
                  <div className="pt-2">
                    <MdArrowOutward className="text-3xl text-secondary/20 transition-all duration-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default OurProducts;
