"use client";

import React from "react";
import { ShieldCheck, Cog, Headphones, Layers } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

function FeaturesBar() {
  const { lang } = useAppContext();
  const isAr = lang === "ar";

  const features = isAr
    ? [
        {
          icon: ShieldCheck,
          title: "حلول موثوقة",
        },
        {
          icon: Cog,
          title: "تنفيذ احترافي",
        },
        {
          icon: Headphones,
          title: "دعم مستمر",
        },
        {
          icon: Layers,
          title: "خدمات شاملة ومتكاملة",
        },
      ]
    : [
        {
          icon: ShieldCheck,
          title: "Reliable Solutions",
        },
        {
          icon: Cog,
          title: "Professional Implementation",
        },
        {
          icon: Headphones,
          title: "Ongoing Support",
        },
        {
          icon: Layers,
          title: "End-to-End Services",
        },
      ];

  return (
    <section className="w-full relative top-[-10px] px-4 sm:px-6 lg:px-8 pb-6 md:pb-8" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200/80 shadow-md shadow-slate-200/40 py-4 sm:py-5 px-4 sm:px-6 md:px-8 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 items-center">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className={`flex items-center gap-3 sm:gap-3.5 justify-center py-2 px-2 sm:px-4 ${
                  isAr
                    ? index < features.length - 1
                      ? "lg:border-l border-slate-200"
                      : ""
                    : index < features.length - 1
                    ? "lg:border-r border-slate-200"
                    : ""
                }`}
              >
                <div className="p-1 rounded-lg text-[#006579] shrink-0">
                  <Icon className="w-6 h-6 md:w-7 md:h-7" strokeWidth={2.2} />
                </div>
                <span className="font-bold text-slate-800 text-xs sm:text-sm md:text-[15px] tracking-tight">
                  {item.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeaturesBar;
