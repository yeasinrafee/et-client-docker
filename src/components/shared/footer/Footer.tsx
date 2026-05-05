import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaTwitter,
  FaBehance,
  FaInstagram,
} from "react-icons/fa";
import { MdPhone, MdLocationOn, MdEmail } from "react-icons/md";
import Container from "@/components/shared/layout/Container";
import footerBg from "@/assets/images/footer/footer_bg.webp";
import Logo from "@/assets/logo/logo4.png";

const Footer = () => {
  const socialLinks = [
    { icon: <FaLinkedinIn />, href: "#" },
    { icon: <FaFacebookF />, href: "#" },
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaBehance />, href: "#" },
    { icon: <FaInstagram />, href: "#" },
  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Contact Us", href: "/contact" },
    { name: "Privacy Policy", href: "/privacy-policy" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/about" },
    { name: "Our Products", href: "/products" },
    { name: "Live Demos", href: "/demos" },
  ];

  const servicesLinks = [
    { name: "Evaluation & Design", href: "/services/evaluation-and-design" },
    { name: "Custom Software", href: "/services/custom-software" },
    { name: "Web Development", href: "/services/web-development" },
    { name: "Mobile Development", href: "/services/mobile-development" },
    {
      name: "Maintenance & Support",
      href: "/services/maintenance-and-support",
    },
  ];

  const contactInfo = [
    { icon: <MdPhone className="text-primary" />, text: "+021-5557-874" },
    {
      icon: <MdLocationOn className="text-primary" />,
      text: "Uttara Sector 9, Dhaka",
    },
    {
      icon: <MdEmail className="text-primary" />,
      text: "info@emperaltech.com",
    },
  ];

  return (
    <footer className="relative bg-black text-white pt-12 sm:pt-16 lg:pt-20 xl:pt-24 pb-8 sm:pb-10 lg:pb-12 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={footerBg}
          alt="Footer Background"
          fill
          className="object-cover object-left opacity-60 scale-x-[-1]"
        />
        {/* Dark Overlay for Readability */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-60 h-18">
                <Image
                  src={Logo}
                  alt="Emperal Tech Logo"
                  fill
                  className="object-contain object-left transition-transform group-hover:scale-105"
                />
              </div>
            </Link>
            <p className="text-accent/60 text-sm max-w-xs">
              Emperal Tech — software product development services.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center text-lg hover:bg-primary hover:text-white transition-all transform hover:-translate-y-1"
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Company & Quick Links Column */}
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-4">
              <h4 className="text-lg font-bold uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-accent/50 text-sm hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-bold uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="text-accent/50 text-sm hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Services Column */}
          <div className="lg:col-span-1 space-y-4">
            <h4 className="text-lg font-bold uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-3">
              {servicesLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-accent/50 text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-4">
              <h4 className="text-lg font-bold uppercase tracking-wider">
                Contact us
              </h4>
              <ul className="space-y-3">
                {contactInfo.map((info, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-accent/50 text-sm"
                  >
                    <span className="text-xl mt-0.5">{info.icon}</span>
                    <span className="leading-relaxed">{info.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-8">
            <Link
              href="#"
              className="text-[10px] font-bold tracking-widest uppercase text-accent/40 hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-[10px] font-bold tracking-widest uppercase text-accent/40 hover:text-primary transition-colors"
            >
              Sitemap
            </Link>
          </div>
          <p className="text-[10px] font-bold tracking-widest uppercase text-accent/40 text-center md:text-right">
            COPYRIGHT © 2024 EMPERAL TECH | POWERED BY ONECONTRIBUTOR
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
