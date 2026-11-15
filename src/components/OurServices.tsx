"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { servicesData } from "@/lib/servicesData";

function OurServices() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { lang } = useAppContext();
  const isAr = lang === "ar";

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      const multiplier = isAr ? -1 : 1;

      scrollRef.current.scrollTo({
        left: scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount) * multiplier,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="services" className="w-full mt-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative group" dir={isAr ? "rtl" : "ltr"}>
      
      {/* Section Header Matching the Design */}
      <div className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight inline-block">
          {isAr ? (
            <>
              <span className="text-[#003847]">خدماتنا </span>
              <span className="text-[#ff6a00]">المتميزة</span>
            </>
          ) : (
            <>
              <span className="text-[#003847]">Our </span>
              <span className="text-[#ff6a00]">Services</span>
            </>
          )}
        </h2>
        {/* Orange Accent Bar Under "Services" */}
        <div className="w-14 h-1 bg-[#ff6a00] mx-auto rounded-full mt-2.5"></div>
      </div>

      {/* Slider Carousel with Side Arrows */}
      <div className="relative w-full flex items-center">
        
        {/* Left Arrow Button */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute -left-2 md:-left-5 z-30 bg-white border border-slate-200 text-slate-700 p-2.5 rounded-full shadow-md cursor-pointer hover:bg-[#ff6a00] hover:text-white hover:border-[#ff6a00] transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Scroll Left"
        >
          {isAr ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>

        {/* Cards Row Container */}
        <div
          ref={scrollRef}
          className="w-full flex gap-5 md:gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {servicesData.map((service) => {
            const title = isAr ? service.titleAr : service.titleEn;
            const waMessage = isAr
              ? `السلام عليكم، أود الاستفسار عن خدمة: (${service.titleAr}) من شركة إنفراتيك.`
              : `Hello, I would like to inquire about the service: (${service.titleEn}) from InfraTech.`;
            const waUrl = `https://wa.me/201278167506?text=${encodeURIComponent(waMessage)}`;

            return (
              <div
                key={service.id}
                className="w-[230px] sm:w-[250px] md:w-[270px] lg:w-[calc(20%-16px)] flex-shrink-0 bg-white border border-slate-100 rounded-3xl p-6 flex flex-col items-center justify-between text-center snap-start transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/60 hover:-translate-y-1.5 relative group/card"
              >
                {/* Top Link Wrapper */}
                <Link
                  href={`/services/${service.slug}`}
                  className="w-full flex flex-col items-center flex-1 cursor-pointer"
                  title={title}
                >
                  {/* Service Image */}
                  <div className="relative w-36 h-32 sm:w-40 sm:h-36 mb-4 flex items-center justify-center">
                    <Image
                      src={service.image}
                      alt={title}
                      fill
                      className="object-contain p-1 transition-transform duration-300 group-hover/card:scale-105"
                      sizes="(max-width: 768px) 160px, 180px"
                    />
                  </div>

                  {/* Service Title */}
                  <h3 className="text-slate-900 font-extrabold text-base sm:text-[17px] tracking-tight leading-snug min-h-[48px] flex items-center justify-center mb-4 group-hover/card:text-[#ff6a00] transition-colors">
                    {title}
                  </h3>
                </Link>

                {/* Bottom Circular Action Buttons */}
                <div className="flex items-center gap-2 mt-auto pt-2">
                  {/* Details Arrow Button */}
                  <Link
                    href={`/services/${service.slug}`}
                    className="w-10 h-10 rounded-full bg-[#fff2e8] text-[#ff6a00] flex items-center justify-center transition-all duration-300 hover:bg-[#ff6a00] hover:text-white hover:scale-110 shadow-xs cursor-pointer"
                    title={isAr ? "اقرأ المزيد عن الخدمة" : "Read more about this service"}
                  >
                    {isAr ? (
                      <ArrowLeft className="w-4 h-4 transition-transform group-hover/card:-translate-x-0.5" />
                    ) : (
                      <ArrowRight className="w-4 h-4 transition-transform group-hover/card:translate-x-0.5" />
                    )}
                  </Link>

                  {/* Direct WhatsApp Quick Chat Button */}
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center transition-all duration-300 hover:bg-emerald-600 hover:text-white hover:scale-110 shadow-xs cursor-pointer"
                    title={isAr ? "تواصل مباشرة عبر واتساب" : "Chat directly on WhatsApp"}
                  >
                    <Image
                      src="/icons/whatsapp.svg"
                      alt="WhatsApp"
                      width={18}
                      height={18}
                      className="transition-transform group-hover/card:scale-110"
                      onError={(e) => {
                        // Fallback if svg not available
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right Arrow Button */}
        <button
          onClick={() => handleScroll("right")}
          className="absolute -right-2 md:-right-5 z-30 bg-white border border-slate-200 text-slate-700 p-2.5 rounded-full shadow-md cursor-pointer hover:bg-[#ff6a00] hover:text-white hover:border-[#ff6a00] transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Scroll Right"
        >
          {isAr ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>

      </div>
    </section>
  );
}

export default OurServices;
