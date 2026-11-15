"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

function ExploreStoreBanner() {
  const { lang } = useAppContext();
  const isAr = lang === "ar";

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-2 " dir={isAr ? "rtl" : "ltr"}>
      <div className="relative w-full overflow-hidden rounded-2xl md:rounded-3xl border border-slate-200/80 shadow-md shadow-slate-200/50 h-[190px] sm:h-[210px] md:h-[230px] flex items-center bg-white">
        
        {/* Hardware Image: 100% height of parent, stretches across the available space without empty gaps */}
        <div
          className={`absolute inset-y-0 z-0 ${
            isAr ? "left-0 w-full sm:w-[68%] md:w-[70%]" : "right-0 w-full sm:w-[68%] md:w-[70%]"
          }`}
        >
          <div className="relative w-full h-full">
            <Image
              src={isAr ? "/images/banner/explore_fitted_ar.webp" : "/images/banner/explore_fitted.webp"}
              alt={isAr ? "استكشف متجر إنفراتيك" : "Explore InfraTech Store"}
              fill
              priority
              className={`object-cover ${isAr ? "object-left" : "object-right"} pointer-events-none select-none`}
              sizes="(max-width: 768px) 100vw, 850px"
            />
          </div>
        </div>

        {/* Diagonal Teal Cutout & Orange Accent Line */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <svg
            className="w-full h-full"
            viewBox="0 0 1000 230"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isAr ? (
              <>
                {/* RTL / Arabic: Shape on the right */}
                {/* Orange Diagonal Accent Stripe */}
                <polygon
                  points="1000,0 535,0 625,230 1000,230"
                  fill="#ff6a00"
                />
                {/* Deep Teal Background Shape */}
                <polygon
                  points="1000,0 547,0 637,230 1000,230"
                  fill="url(#tealGradientAr)"
                />
                <defs>
                  <linearGradient id="tealGradientAr" x1="1000" y1="0" x2="547" y2="230" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#085261" />
                    <stop offset="1" stopColor="#0b6375" />
                  </linearGradient>
                </defs>
              </>
            ) : (
              <>
                {/* LTR / English: Shape on the left */}
                {/* Orange Diagonal Accent Stripe */}
                <polygon
                  points="0,0 465,0 375,230 0,230"
                  fill="#ff6a00"
                />
                {/* Deep Teal Background Shape */}
                <polygon
                  points="0,0 453,0 363,230 0,230"
                  fill="url(#tealGradientEn)"
                />
                <defs>
                  <linearGradient id="tealGradientEn" x1="0" y1="0" x2="453" y2="230" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#085261" />
                    <stop offset="1" stopColor="#0b6375" />
                  </linearGradient>
                </defs>
              </>
            )}
          </svg>
        </div>

        {/* Responsive Mobile Overlay for Small Screens */}
        <div
          className={`absolute inset-0 z-10 md:hidden pointer-events-none ${
            isAr
              ? "bg-gradient-to-l from-[#085261] via-[#085261]/90 to-transparent"
              : "bg-gradient-to-r from-[#085261] via-[#085261]/90 to-transparent"
          }`}
        />

        {/* Text & Button Content (z-20) */}
        <div
          className={`relative z-20 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg py-4 sm:py-5 md:py-6 ${
            isAr ? "pr-5 sm:pr-8 md:pr-10 lg:pr-12 text-right" : "pl-5 sm:pl-8 md:pl-10 lg:pl-12 text-left"
          }`}
        >
          {/* Main Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-[32px] font-black text-white tracking-tight leading-tight">
            {isAr ? "استكشف متجرنا" : "Explore Our Store"}
          </h2>

          {/* Subtitle */}
          <p className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs md:text-sm text-cyan-50 font-medium leading-snug max-w-xs sm:max-w-sm md:max-w-md">
            {isAr ? (
              <>
                <span className="block">مجموعة واسعة من منتجات الشبكات</span>
                <span className="block">وتكنولوجيا المعلومات لتلبية احتياجات أعمالك</span>
              </>
            ) : (
              <>
                <span className="block">A wide range of IT & Network products</span>
                <span className="block">for your business needs</span>
              </>
            )}
          </p>

          {/* CTA Button */}
          <div className="mt-3 sm:mt-3.5">
            <Link
              href="/storePage"
              className="group inline-flex items-center gap-2 bg-[#ff6a00] hover:bg-[#e85d00] text-white font-bold text-xs sm:text-sm py-2 sm:py-2.5 px-5 sm:px-6 rounded-full shadow-md shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
            >
              <span>{isAr ? "زيارة المتجر" : "Visit Store"}</span>
              {isAr ? (
                <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1" />
              ) : (
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
              )}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ExploreStoreBanner;
