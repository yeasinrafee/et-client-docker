"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPhoneAlt } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import Container from "../layout/Container";

import Image from "next/image";
import Logo from "@/assets/logo/logo4.png";

const Header = () => {
  const pathname = usePathname();

  const navLinks = [
    { name: "HOME", href: "/" },
    { name: "SERVICES", href: "/#services" },
    { name: "INDUSTRIES", href: "/#industries" },
    { name: "PRODUCTS", href: "/products" },
    { name: "DEMOS", href: "/demos" },
    { name: "CONTACTS", href: "/#contact" },
  ];

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
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
  };

  return (
    <header className="absolute top-0 left-0 w-full z-50 py-8">
      <Container className="flex items-center justify-between !py-0">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={Logo}
            alt="ORIZON Logo"
            width={250}
            height={50}
            priority
            className="w-auto h-10 md:h-14"
          />
        </Link>

        {/* Navigation */}
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

        {/* Contact Info & Button */}
        <div className="flex items-center gap-8">
          <div className="hidden md:flex items-center gap-2 text-white">
            <span className="text-xs font-medium tracking-widest">
              +021-5557-874
            </span>
          </div>
          <button className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-opacity-90 transition-all">
            Contact us <MdArrowOutward className="text-sm" />
          </button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
