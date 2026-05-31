import React from "react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import Container from "@/components/shared/layout/Container";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  bgImage: StaticImageData | string;
  children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  subtitle,
  buttonText,
  buttonHref = "#",
  bgImage,
  children,
}) => {
  return (
    <section className="relative w-full h-[50vh] sm:h-[55vh] md:h-[65vh] lg:h-[85vh] 2xl:h-[70vh] flex items-end overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={bgImage}
          alt={title}
          fill
          className="object-cover"
          priority
        />
        {/* Overlay - solid dark layer */}
        <div className={`absolute inset-0 bg-black/70`}></div>
        {/* Bottom Gradient for smooth transition */}
        <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-black/70 to-transparent"></div>
      </div>

      {/* Content - positioned at the bottom */}
      <Container className="relative z-10 !py-0 pb-8! sm:pb-10! md:pb-16! 2xl:pb-24!">
        <div className="max-w-3xl space-y-2 sm:space-y-3 md:space-y-4 2xl:space-y-5">
          <h1 className="text-4xl md:text-5xl 2xl:text-7xl font-bold text-white tracking-tighter line-clamp-2">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm sm:text-base md:text-lg 2xl:text-xl text-white/70 max-w-2xl md:leading-relaxed font-medium line-clamp-2">
              {subtitle}
            </p>
          )}
          {buttonText && (
            <Link
              href={buttonHref}
              className="inline-flex items-center gap-3 bg-primary text-white px-6 py-3 2xl:px-8 2xl:py-4 rounded-full text-[10px] 2xl:text-xs font-bold tracking-widest hover:bg-opacity-90 transition-all group shadow-lg shadow-primary/20 mt-2 sm:mt-4"
            >
              {buttonText}
              <MdArrowOutward className="text-lg sm:text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </Link>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
};

export default PageHero;
