"use client";

import Image from "next/image";
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

function HomeHeroSection() {
  const { lang } = useAppContext();
  const isAr = lang === "ar";

  return (
    <section className="w-full relative overflow-hidden m-0 p-0">
      <div
        dir={isAr ? "rtl" : "ltr"}
        className="relative w-full min-h-[440px] sm:min-h-[480px] lg:min-h-[520px] xl:min-h-[560px] flex items-start"
      >
        {/* Background Image: edge-to-edge full screen width */}
        <Image
          src={isAr ? "/images/new_hero_ar.png" : "/images/new_hero.png"}
          alt={
            isAr
              ? "إنفراتيك - حلول شاملة لتكنولوجيا المعلومات والشبكات"
              : "InfraTech - Comprehensive IT & Network Solutions"
          }
          fill
          priority
          className="object-cover object-center pointer-events-none select-none"
          sizes="100vw"
        />

        {/* Content Container aligned within max-w-7xl for clean readability */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-16 pt-8 sm:pt-10 md:pt-12 lg:pt-14 pb-10 sm:pb-12 flex">
          <div
            className={`w-full max-w-xl lg:max-w-2xl ${
              isAr ? "text-right mr-0 ml-auto" : "text-left ml-0 mr-auto"
            }`}
          >
            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-black tracking-tight text-[#003847] leading-[1.12]">
              {isAr ? (
                <>
                  <span className="block">حلول متكاملة</span>
                  <span className="block">لتكنولوجيا المعلومات</span>
                  <span className="block text-[#ff6a00]">والشبكات</span>
                </>
              ) : (
                <>
                  <span className="block">Comprehensive</span>
                  <span className="block">IT & Network</span>
                  <span className="block text-[#ff6a00]">Solutions</span>
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-sm sm:text-base md:text-lg font-medium text-slate-700 leading-relaxed">
              {isAr ? (
                <>
                  <span className="block">تصميم وتنفيذ ودعم بنية تحتية موثوقة</span>
                  <span className="block">لتكنولوجيا المعلومات لتمكين أعمالك</span>
                </>
              ) : (
                <>
                  <span className="block">Design, Implement and Support Reliable</span>
                  <span className="block">IT Infrastructure for Your Business</span>
                </>
              )}
            </p>

            {/* CTA Button */}
            <div className="mt-7 sm:mt-8 flex items-center">
              <a
                href={
                  isAr
                    ? "https://wa.me/201278167506?text=مرحبا%20إنفراتيك،%20أود%20طلب%20عرض%20أسعار%20لحلول%20تكنولوجيا%20المعلومات."
                    : "https://wa.me/201278167506?text=Hi%20InfraTech,%20I'm%20interested%20in%20a%20quote%20for%20IT%20solutions."
                }
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 bg-[#ff6a00] hover:bg-[#e85d00] text-white font-bold text-sm sm:text-base py-3 sm:py-3.5 px-7 sm:px-8 rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
              >
                <span>{isAr ? "طلب عرض أسعار" : "Get a Quote"}</span>
                {isAr ? (
                  <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
                ) : (
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                )}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeHeroSection;
