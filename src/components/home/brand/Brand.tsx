import React from "react";
import Image from "next/image";
import Marquee from "react-fast-marquee";
import Container from "@/components/shared/layout/Container";

// Import brand images
import brand1 from "@/assets/images/brand/brand1.png";
import brand2 from "@/assets/images/brand/brand2.png";
import brand3 from "@/assets/images/brand/brand3.png";
import brand4 from "@/assets/images/brand/brand4.png";
import brand5 from "@/assets/images/brand/brand5.png";
import brand6 from "@/assets/images/brand/brand6.png";
import brand7 from "@/assets/images/brand/brand7.png";
import brand8 from "@/assets/images/brand/brand8.png";
import brand9 from "@/assets/images/brand/brand9.png";

const Brand = () => {
  const brands = [
    brand1,
    brand2,
    brand3,
    brand4,
    brand5,
    brand6,
    brand7,
    brand8,
    brand9,
  ];

  return (
    <section className="py-6 md:py-8 bg-white border-y border-accent">
      <Marquee gradient={false} speed={60} pauseOnHover={true}>
        {brands.map((brand, index) => (
          <div
            key={index}
            className="mx-8 md:mx-12 flex items-center justify-center"
          >
            <Image
              src={brand}
              alt={`Brand ${index + 1}`}
              width={250}
              height={100}
              className="h-12 md:h-16 w-auto opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300 cursor-pointer"
            />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default Brand;
