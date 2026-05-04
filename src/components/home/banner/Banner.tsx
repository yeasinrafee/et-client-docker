import React from "react";
import Image from "next/image";
import { MdArrowOutward } from "react-icons/md";
import Container from "../../shared/layout/Container";
import bg2 from "@/assets/images/banner/bg3.gif";

const Banner = () => {
  return (
    <section className="relative h-[500px] sm:h-[550px] md:h-[650px] lg:h-[750px] xl:h-[820px] w-full overflow-hidden flex items-end">
      {/* Background Image with Enhanced Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bg2}
          alt="Banner Background"
          fill
          className="object-cover"
          priority
        />
        {/* Proper gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-black/70 z-10"></div>
      </div>

      <Container className="relative z-20 pb-12 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
        <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-end">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] tracking-tight">
              CUSTOMIZED SOFTWARE <br />
              SOLUTIONS FOR BUSINESS
            </h1>

            <p className="text-accent max-w-xl text-xs sm:text-sm md:text-base font-light leading-relaxed">
              We worked with Orizon in a startup project. They are a
              professional and flexible team with different experience in many
              frameworks.
            </p>
          </div>

          {/* Circular CTA */}
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <button className="group relative w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 xl:w-56 xl:h-56 rounded-full bg-primary text-white flex flex-col items-center justify-center p-6 sm:p-8 text-center transition-transform hover:scale-105 duration-500 shadow-2xl shadow-primary/20">
              <MdArrowOutward className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              <span className="text-[9px] sm:text-[10px] md:text-xs font-bold tracking-widest leading-tight">
                LET&apos;S DISCUSS <br /> YOUR PROJECT
              </span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
