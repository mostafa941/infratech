"use client";

import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { useAppContext } from "@/context/AppContext";

// Define slides for English and Arabic versions
const slidesEn = [
  {
    src: "/images/slide_cameras.png",
    title1: "SECURITY",
    title2: "CAMERAS",
    discount: "SAVE UP TO 30%",
    btn: "DISCOVER OFFERS",
  },
  {
    src: "/images/slide_laptops.png",
    title1: "LAPTOPS",
    title2: "& DEVICES",
    discount: "UP TO 25% OFF",
    btn: "DISCOVER OFFERS",
  },
  {
    src: "/images/slide_printers.png",
    title1: "PRINTERS",
    title2: "& SCANNERS",
    discount: "DISCOUNT 25%",
    btn: "DISCOVER DEALS",
  },
  {
    src: "/images/slide_networking.png",
    title1: "NETWORKING",
    title2: "EQUIPMENT",
    discount: "SAVE UP TO 20%",
    btn: "SHOP NOW",
  },
];

const slidesAr = [
  {
    src: "/images/slide_cameras.png",
    title1: "كاميرات",
    title2: "المراقبة",
    discount: "خصم يصل إلى 30٪",
    btn: "اكتشف العروض",
  },
  {
    src: "/images/slide_laptops.png",
    title1: "لابتوبات",
    title2: "وأجهزة",
    discount: "خصم يصل إلى 25٪",
    btn: "اكتشف العروض",
  },
  {
    src: "/images/slide_printers.png",
    title1: "طابعات",
    title2: "وماكينات تصوير",
    discount: "خصم 25٪",
    btn: "اكتشف العروض",
  },
  {
    src: "/images/slide_networking.png",
    title1: "معدات",
    title2: "الشبكات",
    discount: "خصم يصل إلى 20٪",
    btn: "تسوق الآن",
  },
];

const AUTOPLAY_INTERVAL = 2000; // 2 seconds

function StoreHeroSection() {
  const { t, lang } = useAppContext();
  const isAr = lang === "ar";

  const slides = isAr ? slidesAr : slidesEn;
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (animating) return;
      setAnimating(true);
      setTimeout(() => {
        setCurrent(index);
        setAnimating(false);
      }, 400);
    },
    [animating]
  );

  const goNext = useCallback(() => {
    const next = (current + 1) % slides.length;
    goTo(next);
  }, [current, slides.length, goTo]);

  // Auto-play every 2 seconds
  useEffect(() => {
    const timer = setInterval(goNext, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [goNext]);

  // Reset to first slide when language changes
  useEffect(() => {
    setCurrent(0);
  }, [lang]);

  return (
    <div className="relative w-full h-[250px] md:h-[320px] lg:h-[380px] overflow-hidden bg-white mt-4 rounded-2xl shadow-sm border border-slate-100 max-w-[1400px] mx-auto">
      {slides.map((slide, idx) => (
        <div
          key={idx}
          className="absolute inset-0 flex items-center transition-all duration-700 overflow-hidden"
          style={{
            opacity: idx === current ? 1 : 0,
            transform: idx === current ? "scale(1)" : "scale(1.02)",
            pointerEvents: idx === current ? "auto" : "none",
            zIndex: idx === current ? 10 : 0,
          }}
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0 bg-white">
            <Image
              src={slide.src}
              fill
              alt={slide.title1}
              className={`object-contain ${isAr ? "object-left" : "object-right"}`}
              priority={idx === 0}
            />
          </div>

          {/* Gradient Overlay for Text Readability */}
          <div 
            className={`absolute inset-0 z-10 ${
              isAr 
                ? 'bg-gradient-to-l from-white via-white/90 to-transparent' 
                : 'bg-gradient-to-r from-white via-white/90 to-transparent'
            } w-[80%] md:w-[65%] lg:w-[55%]`}
          ></div>

          {/* Dynamic Text Content */}
          <div className="relative z-20 w-full h-full flex flex-col justify-center px-6 md:px-12 lg:px-20">
            <div className={`flex flex-col ${isAr ? "items-start text-right" : "items-start text-left"} max-w-lg`}>
              <h2 className={`font-black text-[#151D3B] leading-[1.15] ${isAr ? "text-2xl md:text-3xl lg:text-5xl" : "text-2xl md:text-3xl lg:text-5xl tracking-wide uppercase"}`}>
                {slide.title1} <br /> {slide.title2 && <span className="text-[#151D3B]">{slide.title2}</span>}
              </h2>
              
              <div className="mt-3 md:mt-5">
                <div className={`bg-gradient-to-r from-[#FF8C00] to-[#FF7000] text-white font-bold px-4 py-1.5 inline-block shadow-md ${isAr ? "rounded-l-2xl rounded-r-md text-sm md:text-base" : "rounded-r-2xl rounded-l-md text-sm md:text-base tracking-wide uppercase"}`}>
                  {slide.discount}
                </div>
              </div>
              
              <a href="#store-products" className="mt-5 md:mt-8 bg-gradient-to-r from-[#FF8C00] to-[#FF7000] text-white text-xs md:text-sm font-bold px-6 py-2.5 md:py-3 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all uppercase w-fit text-center block">
                {slide.btn}
              </a>
            </div>
          </div>
        </div>
      ))}

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex items-center justify-center gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Slide ${idx + 1}`}
            className="rounded-full transition-all duration-300 focus:outline-none shadow-sm"
            style={{
              width: idx === current ? "32px" : "8px",
              height: "8px",
              background: idx === current ? "#FF8C00" : "rgba(255, 255, 255, 0.8)",
              border: idx === current ? "none" : "1px solid #ddd"
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default StoreHeroSection;