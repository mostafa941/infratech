"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const servicesData = [
  {
    id: 1,
    icon: "/images/serv_1.png",
    titleKey: "serv1_title",
    badgeKey: "mostPopular",
    badgeColor: "bg-rose-50 text-rose-600",
    featuresKeys: ["serv1_f1", "serv1_f2", "serv1_f3", "serv1_f4"],
  },
  {
    id: 2,
    icon: "/images/serv_1.png", // matches original Network Infrastructure icon
    titleKey: "serv2_title",
    badgeKey: null,
    badgeColor: "",
    featuresKeys: ["serv2_f1", "serv2_f2", "serv2_f3", "serv2_f4"],
  },
  {
    id: 3,
    icon: "/images/serv_2.png",
    titleKey: "serv3_title",
    badgeKey: null,
    badgeColor: "",
    featuresKeys: ["serv3_f1", "serv3_f2", "serv3_f3", "serv3_f4"],
  },
  {
    id: 4,
    icon: "/images/serv_3.png",
    titleKey: "serv4_title",
    badgeKey: null,
    badgeColor: "",
    featuresKeys: ["serv4_f1", "serv4_f2", "serv4_f3", "serv4_f4"],
  },
  {
    id: 5,
    icon: "/images/serv_4.png",
    titleKey: "serv5_title",
    badgeKey: null,
    badgeColor: "",
    featuresKeys: ["serv5_f1", "serv5_f2", "serv5_f3", "serv5_f4"],
  },
  {
    id: 6,
    icon: "/images/serv_5.png",
    titleKey: "serv6_title",
    badgeKey: null,
    badgeColor: "",
    featuresKeys: ["serv6_f1", "serv6_f2", "serv6_f3", "serv6_f4"],
  },
  {
    id: 7,
    icon: "/images/serv_6.png",
    titleKey: "serv7_title",
    badgeKey: null,
    badgeColor: "",
    featuresKeys: ["serv7_f1", "serv7_f2", "serv7_f3", "serv7_f4"],
  },
  {
    id: 8,
    icon: "/images/serv_1.png", // cloud solutions using network/cloud image
    titleKey: "serv8_title",
    badgeKey: null,
    badgeColor: "",
    featuresKeys: ["serv8_f1", "serv8_f2", "serv8_f3", "serv8_f4"],
  },
];

function OurServices() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t, lang } = useAppContext();

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      
      // Handle RTL scroll direction
      const multiplier = lang === "ar" ? -1 : 1;

      scrollRef.current.scrollTo({
        left: scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount) * multiplier,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="services" className="w-full my-16 px-4 max-w-7xl mx-auto relative group">
      
      {/* Header */}
      <div className="text-center mb-10">
        <span className="text-amber-500 font-bold text-sm uppercase tracking-widest">
          {t("ourServices")}
        </span>
        <h2 className="text-cyan-700 text-2xl md:text-3xl font-medium mt-2 tracking-tight">
          {t("servSub")}
        </h2>
      </div>

      {/* Slider + arrows */}
      <div className="relative w-full flex items-center">
        
        {/* Left arrow */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute -left-2 md:-left-5 z-40 bg-white border border-slate-200 text-slate-700 p-2.5 rounded-full shadow-md cursor-pointer hover:bg-amber-400 hover:text-white hover:border-amber-400 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Cards */}
        <div
          ref={scrollRef}
          className="w-full flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {servicesData.map((service) => {
            return (
              <div
                key={service.id}
                className="w-[260px] lg:w-[calc(25%-18px)] flex-shrink-0 bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between snap-start transition-all duration-300 hover:border-amber-400 hover:-translate-y-1 hover:shadow-md relative"
              >
                {service.badgeKey && (
                  <span className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded-full ${service.badgeColor}`}>
                    {t(service.badgeKey)}
                  </span>
                )}
                <div>
                  {/* Image Icon restored exactly as before */}
                  <div className="relative w-24 h-24 mb-5 mx-auto">
                    <Image
                      src={service.icon}
                      alt={t(service.titleKey)}
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-slate-900 font-bold text-base mb-4 tracking-tight min-h-[48px] flex items-center">
                    {t(service.titleKey)}
                  </h3>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6">
                    {service.featuresKeys.map((featKey, idx) => (
                      <li key={idx} className="flex items-start text-xs text-slate-500 gap-2">
                        <span className="text-amber-500 font-bold mt-0.5">▪</span>
                        <span>{t(featKey)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={`https://wa.me/201278167506?text=${encodeURIComponent(
                    lang === "ar"
                      ? `السلام عليكم، كنت حابب أستفسر أكتر عن خدمة: (${t(service.titleKey)}) في شركة InfraTech.`
                      : `Hello, I would like to inquire about the service: (${t(service.titleKey)}) from InfraTech.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-amber-500 transition-colors group/link w-fit mt-auto cursor-pointer"
                >
                  {t("learnMore")}
                  <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
                    →
                  </span>
                </a>
              </div>
            );
          })}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => handleScroll("right")}
          className="absolute -right-2 md:-right-5 z-40 bg-white border border-slate-200 text-slate-700 p-2.5 rounded-full shadow-md cursor-pointer hover:bg-amber-400 hover:text-white hover:border-amber-400 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>
    </section>
  );
}

export default OurServices;