"use client";

import Image from 'next/image'
import React from 'react'
import { useAppContext } from "@/context/AppContext";

function StoreHeroSection() {
  const { t, lang } = useAppContext();
  const isAr = lang === "ar";

  return (
    <div style={{background:"#E9E9E9"}} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pl-4 md:pl-12 pr-4">
      <div className="w-full mt-5">
        <span className="py-1.5 px-3 bg-blue-50 text-blue-600 rounded-2xl text-xs font-bold inline-block">
          {t("heroBadge")}
        </span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 mt-4 leading-tight">
          {t("heroTitle")}
        </h1>
        <p className="text-sm md:text-base text-slate-700 mt-4 leading-relaxed max-w-lg font-medium">
          {t("heroDesc")}
        </p>
        <a 
          href="#store-products" 
          className="bg-amber-500 py-3.5 px-8 rounded-xl text-white mt-4 inline-block font-bold hover:bg-amber-600 transition-all text-xs md:text-sm shadow-md shadow-amber-500/10 w-fit sm:w-auto text-center"
        >
          {t("shopNow")}
        </a>
      </div>

      {/* Align right for normal direction, left for RTL */}
      <div className={`w-full flex ${isAr ? "justify-start" : "justify-end"} max-[1026px]:hidden`}>
        <Image 
          src="/images/hero.png" 
          width={550} 
          height={380} 
          alt="Store Hero"
          className="object-contain"
          priority
        />
      </div>
    </div>
  )
}

export default StoreHeroSection;