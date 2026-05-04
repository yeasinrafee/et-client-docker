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
import Logo from "@/assets/logo/logo3.png";

const Footer = () => {
  const socialLinks = [
    { icon: <FaLinkedinIn />, href: "#" },
    { icon: <FaFacebookF />, href: "#" },
    { icon: <FaTwitter />, href: "#" },
    { icon: <FaBehance />, href: "#" },
    { icon: <FaInstagram />, href: "#" },
  ];

  const consultingLinks = [
    { name: "Discovery Phase", href: "#" },
    { name: "Technology Consulting", href: "#" },
    { name: "IT Audit Services", href: "#" },
  ];

  const productDesignLinks = [
    { name: "Product Experience Design", href: "#" },
    { name: "Business Analysis", href: "#" },
  ];

  const servicesLinks = [
    { name: "Evaluation & Design", href: "#" },
    { name: "Custom Software", href: "#" },
    { name: "Web Development", href: "#" },
    { name: "Mobile Development", href: "#" },
    { name: "Maintenance & Support", href: "#" },
    { name: "Integration Services", href: "#" },
    { name: "Cloud Infrastructure", href: "#" },
  ];

  const aboutLinks = [
    { name: "About us", href: "#" },
    { name: "Case Studies", href: "#" },
  ];

  const contactInfo = [
    { icon: <MdPhone className="text-primary" />, text: "+021-5557-874" },
    {
      icon: <MdLocationOn className="text-primary" />,
      text: "Jl. Soekarno-hatta",
    },
    {
      icon: <MdEmail className="text-primary" />,
      text: "helloorizon@mail.com",
    },
  ];

  return (
    <footer className="relative bg-black text-white pt-28 pb-8 overflow-hidden">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-8">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative w-60 h-18">
                <Image
                  src={Logo}
                  alt="Orizon Logo"
                  fill
                  className="object-contain object-left transition-transform group-hover:scale-105"
                />
              </div>
            </Link>
            <p className="text-accent/60 text-sm max-w-xs">
              Orizon — software product development services.
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

          {/* Links Sections Wrapper */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row justify-between gap-12 md:gap-8">
            {/* Consulting & Product Design Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-lg font-bold uppercase tracking-wider">
                  Consulting
                </h4>
                <ul className="space-y-3">
                  {consultingLinks.map((link, index) => (
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
                  Product design
                </h4>
                <ul className="space-y-3">
                  {productDesignLinks.map((link, index) => (
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
            <div className="space-y-4">
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

            {/* About & Contact Column */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-lg font-bold uppercase tracking-wider">
                  About us
                </h4>
                <ul className="space-y-3">
                  {aboutLinks.map((link, index) => (
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
                  Contact us
                </h4>
                <ul className="space-y-3">
                  {contactInfo.map((info, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 text-accent/50 text-sm"
                    >
                      <span className="text-xl">{info.icon}</span>
                      {info.text}
                    </li>
                  ))}
                </ul>
              </div>
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
            COPYRIGHT © 2023 ORIZON | POWERED BY ONECONTRIBUTOR
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
