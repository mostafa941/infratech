"use client";

import React from "react";
import Image from "next/image";
import { Gem, Zap, Award, Users } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

function WhyChooseUs() {
  const { lang } = useAppContext();
  const isAr = lang === "ar";

  const features = [
    {
      icon: Gem,
      title: isAr ? "فريق من الخبراء" : "Expert Team",
      subtitle: isAr ? "معتمد وذو كفاءة وخبرة" : "Certified & Experienced",
    },
    {
      icon: Zap,
      title: isAr ? "حلول شاملة متكاملة" : "End-to-End Solutions",
      subtitle: isAr ? "من التصميم حتى الدعم الفني" : "From Design to Support",
    },
    {
      icon: Award,
      title: isAr ? "شريك تقني موثوق" : "Trusted Partner",
      subtitle: isAr ? "اعتمادية وشراكة طويلة الأمد" : "Reliable & Long-Term",
    },
    {
      icon: Users,
      title: isAr ? "تركيز على نمو الأعمال" : "Business Focused",
      subtitle: isAr ? "مخصصة لتناسب احتياجاتك" : "Tailored to Your Needs",
    },
  ];

  return (
    <section
      id="why-choose-us"
      className="w-full relative overflow-hidden mt-0 mb-[10px] bg-transparent"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="relative w-full flex flex-col md:flex-row items-center min-h-[220px] md:min-h-[240px] bg-transparent">
        
        {/* High-Definition Building Graphic with original designer teal & orange swoosh */}
        <div
          className={`relative md:absolute inset-y-0 h-52 sm:h-60 md:h-full z-0 ${
            isAr
              ? "right-0 w-full md:w-[48%] lg:w-[44%] xl:w-[42%]"
              : "left-0 w-full md:w-[48%] lg:w-[44%] xl:w-[42%]"
          }`}
        >
          <Image
            src={isAr ? "/images/company_banner_hd_ar.webp" : "/images/company_banner_hd_en.webp"}
            alt={isAr ? "شركة إنفراتيك" : "InfraTech Headquarters"}
            fill
            priority
            quality={100}
            className={`object-contain ${isAr ? "object-right" : "object-left"} pointer-events-none select-none`}
            sizes="(max-width: 768px) 100vw, 650px"
          />
        </div>

        {/* Foreground Content Container aligned cleanly within max-w-7xl grid */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between pointer-events-auto">
          
          {/* Spacer on Desktop to leave room for the full-bleed building image */}
          <div className="hidden md:block w-[42%] lg:w-[40%] xl:w-[38%] shrink-0 pointer-events-none" />

          {/* Text and Cards Content */}
          <div
            className={`w-full md:w-[58%] lg:w-[60%] xl:w-[62%] py-3 sm:py-4 md:py-6 ${
              isAr
                ? "md:pr-8 lg:pr-12 xl:pr-16 text-right"
                : "md:pl-8 lg:pl-12 xl:pl-16 text-left"
            }`}
          >
            {/* Section Header */}
            <div className="mb-4 sm:mb-5">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
                {isAr ? (
                  <>
                    <span className="text-[#003847]">لماذا تختار </span>
                    <span className="text-[#ff6a00]">إنفراتيك؟</span>
                  </>
                ) : (
                  <>
                    <span className="text-[#003847]">Why Choose </span>
                    <span className="text-[#ff6a00]">InfraTech?</span>
                  </>
                )}
              </h2>
              {/* Orange Accent Line */}
              <div
                className={`w-12 h-1 bg-[#ff6a00] rounded-full mt-2 ${
                  isAr ? "mr-0" : "ml-0"
                }`}
              ></div>
            </div>

            {/* 2x2 Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              {features.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-white border border-slate-100 rounded-2xl p-3 sm:p-3.5 flex items-center gap-3.5 shadow-xs hover:shadow-md hover:border-slate-200 transition-all duration-200 group"
                  >
                    <IconComponent className="w-6 h-6 text-[#007a8c] shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <div>
                      <h3 className="text-slate-900 font-extrabold text-[13px] sm:text-sm tracking-tight leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-slate-500 text-[11px] sm:text-xs font-medium leading-snug mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;
