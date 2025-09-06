"use client"
import React, { useState } from "react";
import Image from "next/image";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

const SmartWatchBanner: React.FC = () => {
  // State to manage active slide
  const [activeSlide, setActiveSlide] = useState(0);

  // Mock data for slides (you can replace this with dynamic data)
  const slides = [
    {
      subtitle: "Best Deal Online on smart watches",
      mainTitle: "SMART WEARABLE.",
      discount: "UP to 80% OFF",
      watchImageSrc: "/api/placeholder/256/256",
      altText: "Smart Watch with colorful display",
    },
    {
      subtitle: "Best Deal Online on smart watches",
      mainTitle: "SMART WEARABLE.",
      discount: "UP to 80% OFF",
      watchImageSrc: "/api/placeholder/256/256",
      altText: "Smart Watch with colorful display",
    },
    // Add more slides as needed
  ];

  // Function to handle navigation
  const navigate = (direction: "left" | "right") => {
    let newIndex = activeSlide;
    if (direction === "left") {
      newIndex = (activeSlide - 1 + slides.length) % slides.length;
    } else {
      newIndex = (activeSlide + 1) % slides.length;
    }
    setActiveSlide(newIndex);
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto rounded-2xl overflow-hidden bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900" >
            {/* Navigation Buttons */}
            <button onClick={() => navigate("left")}
                className="absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-13 h-13 rounded-full bg-white backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-200" >
                <MdChevronLeft className="w-5 h-5 text-blue-500"/>
            </button>

            <button onClick={() => navigate("right")}
                className="absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-13 h-13 rounded-full bg-white backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all duration-200">
                <MdChevronRight className="w-5 h-5 text-blue-500"/>
            </button>

            {/* Content Container */}
            <div className="flex items-center justify-between h-[35dvh] px-8 py-12 lg:px-12  transition-transform duration-300"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }} >
                {/* Text Content */}
                <div className="flex-1 pr-8">
                    <p className="text-cyan-400 text-sm font-medium mb-2 tracking-wide uppercase">{slides[activeSlide].subtitle}</p>
                    <h1 className="text-white text-5xl lg:text-6xl font-bold mb-4 leading-tight"> {slides[activeSlide].mainTitle}</h1>
                    <p className="text-white text-xl font-semibold"> {slides[activeSlide].discount}</p>
                </div>

                {/* Product Showcase */}
                <div className="flex-shrink-0 relative">
                    <Image src={slides[activeSlide].watchImageSrc} alt={slides[activeSlide].altText} width={256} height={256} className="w-64 h-64 object-contain filter drop-shadow-2xl" style={{ boxShadow: "0 20px 35px rgba(0, 255, 255, 0.3)", }} />
                    <div className="absolute inset-0 bg-gradient-radial from-cyan-500/20 via-transparent to-transparent rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* Pagination Dots */}
            <div className="absolute bottom-6 left-8 flex space-x-1 items-center justify-center">
                {slides.map((_, index) => (
                <div key={index} className={`w-2 h-2 rounded-full ${ index === activeSlide ? "bg-white w-7 h-[4px] transition-all duration-500 ease-in-out" : "bg-white/30" }`}></div>
                ))}
            </div>

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10"> {/* Add pattern here if needed */}</div>
    </div>
  );
};

export default SmartWatchBanner;