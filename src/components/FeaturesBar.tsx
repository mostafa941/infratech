"use client";

import Image from 'next/image'
import React from 'react'
import { useAppContext } from '@/context/AppContext'

function FeaturesBar() {
  const { t, lang } = useAppContext();
  const isAr = lang === "ar";

  const features = [
    {
      img: '/images/feat_1.png',
      alt: 'IT Experts',
      titleKey: 'feat1Title',
      subKey: 'feat1Sub',
    },
    {
      img: '/images/feat_2.png',
      alt: 'Response Time',
      titleKey: 'feat2Title',
      subKey: 'feat2Sub',
    },
    {
      img: '/images/feat_3.png',
      alt: 'Solutions',
      titleKey: 'feat3Title',
      subKey: 'feat3Sub',
    },
    {
      img: '/images/feat_4.png',
      alt: 'Support Available',
      titleKey: 'feat4Title',
      subKey: 'feat4Sub',
    },
  ];

  return (
    <div className="py-6 md:py-10 px-4 md:px-12 lg:px-20" style={{background:"#E9E9E9"}} dir={isAr ? "rtl" : "ltr"}>
      <div className="bg-white shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 px-6 md:px-10 rounded-2xl">
        {features.map((f, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 ${
              i < features.length - 1
                ? 'border-b sm:border-b-0 sm:border-r border-slate-100 pb-4 sm:pb-0 pr-4'
                : ''
            }`}
          >
            <Image src={f.img} width={44} height={20} alt={f.alt} className="w-11 h-auto" />
            <div>
              <h3 className="font-bold text-xs md:text-sm text-slate-800">{t(f.titleKey)}</h3>
              <span className="text-[10px] text-slate-400 font-medium">{t(f.subKey)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FeaturesBar