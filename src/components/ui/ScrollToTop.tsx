"use client";

import { useState, useEffect } from "react";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    const scrolled = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.clientHeight;
    const totalScroll = documentHeight - windowHeight;
    const progress = (scrolled / totalScroll) * 100;

    setScrollProgress(progress);

    if (scrolled > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed bottom-5 right-5 cursor-pointer z-999">
      <button
        onClick={scrollToTop}
        className={`bg-secondary text-lg rounded-full p-3 relative cursor-pointer ${
          showButton ? "block" : "hidden"
        }`}
        style={{
          boxShadow: "0px 0px 30px 0px rgba(0, 19, 54, 0.16)",
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 24L0 22.7368L12 0L24 22.7368L22.5 24L12 20.2105L1.5 24Z"
            fill="#00bcd4"
            fillOpacity="0.75"
          />
        </svg>
        <div className="absolute top-0 left-0 w-full h-full">
          <svg
            className="w-full h-full"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke="#00bcd4"
              strokeOpacity="0.75"
              strokeWidth="2"
              strokeDasharray={`${scrollProgress}, 100`}
              strokeLinecap="round"
              transform="rotate(-90 16 16)"
            />
          </svg>
        </div>
      </button>
    </div>
  );
};

export default ScrollToTop;
