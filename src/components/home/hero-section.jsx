"use client";

import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Hero slides data with full images
  const slides = [
    {
      cta1: "Shop Now",
      cta2: "View Deals",
      link1: "/categories/smartwatches",
      link2: "/deals",
      image: "/images/banners/banner_2.jpg" // Full hero image
    },
    {
      cta1: "Shop Now",
      cta2: "View Deals",
      link1: "/categories/headphones",
      link2: "/deals",
      image: "/images/banners/banner_4.jpg" // Full hero image
    },
    {
      cta1: "Shop Now",
      cta2: "View Deals",
      link1: "/categories/smartphones",
      link2: "/deals",
      image: "/images/banners/banner_6.jpg" // Full hero image
    }
  ];

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <section className="relative overflow-hidden h-[70vh]"> {/* Set a fixed height */}
      {/* Slides container */}
      <div 
        className="flex h-full transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div 
            key={index} 
            className="w-full flex-shrink-0 relative"
          >
            {/* Full background image */}
            <div className="absolute inset-0 z-0">
              <Image src={slide.image} alt={`Hero slide ${index + 1}`} fill className="object-cover h-60" priority={index === 0} />
              {/* Dark overlay for better text visibility */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            
            {/* Content - Only buttons */}
            <div className="container mx-auto px-4 h-full flex flex-col justify-end pb-16 relative z-10">
              <div className="flex space-x-4">
                <Link 
                  href={slide.link1}
                  className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center space-x-2"
                >
                  <span>{slide.cta1}</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <Link 
                  href={slide.link2}
                  className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors"
                >
                  {slide.cta2}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button 
        onClick={goToPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors z-20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button 
        onClick={goToNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors z-20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-6 left-6 flex space-x-2 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? "bg-white" 
                : "bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}