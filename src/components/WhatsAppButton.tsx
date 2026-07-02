"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="https://wa.me/201278167506?text=السلام%20عليكم،%20أود%20الاستفسار%20عن%20خدمات%20InfraTech"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-600 text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 group cursor-pointer"
      title="Chat on WhatsApp"
    >
      <Image 
        src="/icons/whatsapp.svg" 
        width={30} 
        height={30} 
        alt="WhatsApp"
        className="w-7 h-7"
      />
      {/* Tooltip hint */}
      <span className="absolute right-14 bg-slate-900 text-white text-xs py-1 px-3.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-md pointer-events-none">
        تواصل معنا
      </span>
    </a>
  );
}

export default WhatsAppButton;
