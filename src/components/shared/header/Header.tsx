"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPhoneAlt } from "react-icons/fa";
import { MdArrowOutward, MdMenu, MdClose } from "react-icons/md";
import Container from "../layout/Container";

import Image from "next/image";
import Logo from "@/assets/logo/logo4.png";

const Header = () => {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SERVICES", href: "/services" },
    { name: "INDUSTRIES", href: "/#industries" },
    { name: "PRODUCTS", href: "/products" },
    { name: "DEMOS", href: "/demos" },
    { name: "ABOUT US", href: "/about" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    // If we're on the homepage and clicking an anchor link
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      const id = href.replace("/#", "");
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }

    // If we're on the homepage and clicking the Home link
    if (href === "/" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Close mobile menu if open
    setIsMenuOpen(false);
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 py-8">
      <Container className="flex items-center justify-between !py-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 relative z-10">
          <Image
            src={Logo}
            alt="Emperal Tech Logo"
            width={250}
            height={50}
            priority
            className="w-auto h-11 md:h-15"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-bold text-white hover:text-primary transition-colors tracking-widest"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Contact Info & Button (Desktop) & Hamburger (Mobile) */}
        <div className="flex items-center gap-4 lg:gap-8">
          <div className="hidden md:flex lg:flex items-center gap-2 text-white">
            <span className="text-xs font-medium tracking-widest">
              +021-5557-874
            </span>
          </div>
          <Link
            href="/contact"
            className="hidden uppercase lg:flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-opacity-90 transition-all"
          >
            Contact us <MdArrowOutward className="text-sm" />
          </Link>

          {/* Hamburger Icon */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative z-[110] text-white text-3xl"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <MdClose /> : <MdMenu />}
          </button>
        </div>
      </Container>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 bg-secondary/80 backdrop-blur-md z-[90] transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsMenuOpen(false)}
      />

      {/* Mobile Drawer Content */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] max-w-sm bg-secondary z-[100] transition-transform duration-500 ease-in-out lg:hidden transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } border-l border-white/10`}
      >
        <div className="flex flex-col h-full pt-32 pb-12 px-8">
          <nav className="flex flex-col gap-6 flex-grow">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-xl font-bold text-white hover:text-primary transition-colors tracking-widest border-b border-white/5 pb-4"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Contact Button in Drawer */}
          <Link
            href="/contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-auto uppercase flex items-center justify-center gap-2 bg-primary text-white w-full py-4 rounded-full text-sm font-bold tracking-widest hover:bg-opacity-90 transition-all"
          >
            Contact us <MdArrowOutward className="text-sm" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
