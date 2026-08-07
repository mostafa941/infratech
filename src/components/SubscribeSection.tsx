"use client";

import React from "react";
import { useAppContext } from "@/context/AppContext";
import Link from "next/link";

function SubscribeSection() {
  const { t, lang } = useAppContext();
  const isAr = lang === "ar";

  return (
    <section className="w-full my-12 px-4 max-w-7xl mx-auto" dir={isAr ? "rtl" : "ltr"}>
      <div
        className="rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f2c3d 0%, #153c52 100%)" }}
      >
        {/* Left Side: Text and Quote Sheet Design */}
        <div className="flex flex-col md:flex-row items-center gap-6 z-10 max-w-2xl">
          <div className="bg-white p-4 rounded-2xl shadow-lg flex-shrink-0 flex items-center justify-center">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <svg className="w-12 h-12 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
              </svg>
            </div>
          </div>
          <div className={`text-center ${isAr ? "md:text-right" : "md:text-left"}`}>
            <h2 className="text-white text-2xl md:text-3xl font-extrabold tracking-tight mb-2">
              {t("quotationTitle")}
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              {t("quotationDesc")}
            </p>
          </div>
        </div>

        {/* Right Side: Request Quote Button & Trust Factors */}
        <div className={`flex flex-col items-center ${isAr ? "md:items-start" : "md:items-end"} gap-4 z-10 w-full md:w-auto`}>
          <Link href={"/contact-us"}
       
            rel="noopener noreferrer"
            className="w-full md:w-auto bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 px-8 rounded-xl shadow-lg transition-all duration-300 text-center text-sm uppercase tracking-wider"
          >
            {t("requestQuote")}
          </Link>

          {/* Badges Info */}
          <div className="flex flex-wrap justify-center md:justify-end gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className="text-amber-500">💰</span>
              <span>{t("bestPrices")}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className="text-amber-500">🛡️</span>
              <span>{t("officialWarranty")}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className="text-amber-500">⚡</span>
              <span>{t("fastDelivery")}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className="text-amber-500">🤝</span>
              <span>{t("expertSupport")}</span>
            </div>
          </div>
        </div>

        {/* Decorative Circles */}
        <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-cyan-700/10 pointer-events-none" />
        <div className="absolute -left-10 -top-10 w-36 h-36 rounded-full bg-amber-500/5 pointer-events-none" />
      </div>
    </section>
  );
}

export default SubscribeSection;
