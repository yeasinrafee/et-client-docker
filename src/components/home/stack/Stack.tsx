"use client";

import React, { useState } from "react";
import Image from "next/image";
import Container from "@/components/shared/layout/Container";
import { stackData } from "@/data/stackData";

const Stack = () => {
  const [activeTab, setActiveTab] = useState(stackData[0]);

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white border-b border-accent">
      <Container>
        {/* Main Heading */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-secondary tracking-tighter uppercase">
            Technology Stack
          </h2>
          <div className="w-full h-px bg-accent mt-8 sm:mt-10 md:mt-12"></div>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-20">
          {/* Left Sidebar: Navigation Toggle */}
          <div className="lg:col-span-4 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-4 lg:pb-0 lg:border-r lg:border-accent lg:pr-8 xl:pr-12 -mx-4 px-4 lg:mx-0 lg:px-0">
            {stackData.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab)}
                className={`group cursor-pointer py-2 sm:py-3 flex items-center gap-3 sm:gap-4 transition-all duration-300 flex-shrink-0 ${
                  activeTab.id === tab.id ? "lg:translate-x-2" : ""
                }`}
              >
                {/* Active Indicator Line */}
                <div
                  className={`hidden lg:block w-1 h-8 rounded-full transition-all duration-300 ${
                    activeTab.id === tab.id
                      ? "bg-primary scale-y-100"
                      : "bg-transparent scale-y-0"
                  }`}
                ></div>

                <span
                  className={`text-xs sm:text-sm font-medium transition-colors duration-300 ${
                    activeTab.id === tab.id
                      ? "text-primary"
                      : "text-secondary/40"
                  }`}
                >
                  {tab.id}/
                </span>
                <h3
                  className={`text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-300 whitespace-nowrap lg:whitespace-normal ${
                    activeTab.id === tab.id
                      ? "text-primary"
                      : "text-secondary hover:text-secondary/70"
                  }`}
                >
                  {tab.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Right Content: Technology Grid */}
          <div className="lg:col-span-8">
            <div className="space-y-10 sm:space-y-12 md:space-y-16 animate-in fade-in slide-in-from-right-4 duration-500">
              {activeTab.subSections.map((section, sIdx) => (
                <div key={sIdx} className="space-y-6 sm:space-y-8 md:space-y-10">
                  {/* Sub-section Title */}
                  {(activeTab.id === "01" ||
                    !section.title.includes("Stack")) && (
                    <h4 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary">
                      {section.title}
                    </h4>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                    {section.items.map((item, iIdx) => (
                      <div
                        key={iIdx}
                        className="bg-black rounded-xl p-3 sm:p-4 flex items-center justify-evenly group hover:bg-primary transition-all duration-300 cursor-default h-16 sm:h-20"
                      >
                        <div className="w-8 h-8 sm:w-10 sm:h-10 relative flex-shrink-0 bg-white/10 rounded-lg p-1.5 sm:p-2 transition-colors duration-300 group-hover:bg-white/20">
                          <Image
                            src={item.icon}
                            alt={item.name}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <span className="text-white text-[10px] sm:text-xs font-bold tracking-widest uppercase text-right">
                          {item.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Stack;
