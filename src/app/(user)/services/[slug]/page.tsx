"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, MessageCircle, Phone, ArrowUpRight } from "lucide-react";
import { servicesData } from "@/lib/servicesData";
import { useAppContext } from "@/context/AppContext";

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { lang } = useAppContext();
  const isAr = lang === "ar";

  const service = servicesData.find((s) => s.slug === slug || s.id === slug);

  if (!service) {
    notFound();
  }

  const title = isAr ? service.titleAr : service.titleEn;
  const description = isAr ? service.descriptionAr : service.descriptionEn;
  const features = isAr ? service.featuresAr : service.featuresEn;

  const waMessage = isAr
    ? `السلام عليكم، أود الاستفسار وطلب تفاصيل خدمة: (${service.titleAr}) من شركة إنفراتيك.`
    : `Hello, I would like to inquire about the service: (${service.titleEn}) from InfraTech.`;

  const waUrl = `https://wa.me/201278167506?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-5xl mx-auto">
        
        {/* Breadcrumb & Back */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/#services"
            className="inline-flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#ff6a00] transition-colors bg-white px-4 py-2 rounded-xl shadow-xs border border-slate-200"
          >
            {isAr ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{isAr ? "العودة للخدمات" : "Back to Services"}</span>
          </Link>

          <span className="text-xs text-slate-400 font-medium hidden sm:inline-block">
            {isAr ? "إنفراتيك للحلول التقنية المتكاملة" : "InfraTech Integrated IT Solutions"}
          </span>
        </div>

        {/* Main Service Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden mb-12">
          
          {/* Top Banner with Image and Heading */}
          <div className="p-8 sm:p-12 border-b border-slate-100 flex flex-col md:flex-row items-center gap-8 md:gap-12 bg-gradient-to-b from-slate-50/50 to-white">
            <div className="relative w-48 h-44 sm:w-56 sm:h-52 shrink-0 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center justify-center">
              <Image
                src={service.image}
                alt={title}
                fill
                className="object-contain p-2"
                priority
              />
            </div>

            <div className="flex-1 text-center md:text-start">
              <span className="inline-block px-3 py-1 bg-orange-50 text-[#ff6a00] text-xs font-bold rounded-full mb-3 border border-orange-100">
                {isAr ? "خدمة احترافية معتمدة" : "Enterprise Certified Service"}
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-4">
                {title}
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
                {isAr ? service.shortDescAr : service.shortDescEn}
              </p>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-8 sm:p-12">
            
            {/* Detailed Description */}
            <div className="mb-10">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff6a00]"></span>
                {isAr ? "عن الخدمة ونطاق العمل" : "About the Service & Scope of Work"}
              </h2>
              <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
                {description}
              </p>
            </div>

            {/* Key Capabilities & Deliverables */}
            <div className="mb-12">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#006579]"></span>
                {isAr ? "ما نقدمه لك في هذه الخدمة" : "Key Capabilities & What We Deliver"}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#006579] shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA Banner */}
            <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-900/10 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold mb-2">
                  {isAr ? "هل أنت مستعد لبدء تنفيذ هذه الخدمة؟" : "Ready to implement this service?"}
                </h3>
                <p className="text-emerald-100 text-sm max-w-xl">
                  {isAr
                    ? "تواصل معنا مباشرة عبر واتساب للحصول على استشارة فنية مجانية وعرض أسعار مخصص لمؤسستك."
                    : "Contact our certified team directly on WhatsApp for a free technical consultation and tailored quotation."}
                </p>
              </div>

              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 inline-flex items-center gap-2.5 bg-white text-emerald-800 hover:bg-emerald-50 px-6 py-3.5 rounded-xl font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 fill-emerald-600" />
                <span>{isAr ? "تواصل عبر واتساب الآن" : "Chat on WhatsApp Now"}</span>
              </a>
            </div>

          </div>
        </div>

        {/* Other Services Navigation */}
        <div className="mb-12">
          <h3 className="text-lg font-bold text-slate-900 mb-6 text-center">
            {isAr ? "خدمات أخرى قد تهمك" : "Other Services You Might Need"}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {servicesData
              .filter((s) => s.slug !== slug && s.id !== slug)
              .slice(0, 5)
              .map((other) => (
                <Link
                  key={other.id}
                  href={`/services/${other.slug}`}
                  className="bg-white rounded-2xl p-4 border border-slate-200/80 hover:border-amber-400 hover:shadow-md transition-all text-center flex flex-col items-center group"
                >
                  <div className="relative w-16 h-16 mb-2">
                    <Image
                      src={other.image}
                      alt={isAr ? other.titleAr : other.titleEn}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <span className="text-xs font-bold text-slate-800 group-hover:text-[#ff6a00] transition-colors line-clamp-2">
                    {isAr ? other.titleAr : other.titleEn}
                  </span>
                </Link>
              ))}
          </div>
        </div>

      </div>
    </div>
  );
}

