"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const servicesData = [
  {
    id: 1,
    icon: "/images/serv_1.png",
    title: "Network Infrastructure",
    features: ["LAN / WAN Design", "Structured Cabling", "Switches & Routers", "Wireless Networks"],
  },
  {
    id: 2,
    icon: "/images/serv_2.png",
    title: "Cyber Security",
    features: ["Firewall Solutions", "Endpoint Protection", "Security Assessment", "Monitoring"],
  },
  {
    id: 3,
    icon: "/images/serv_3.png",
    title: "Software Licensing",
    features: ["Microsoft Licenses", "Antivirus Solutions", "Business Applications", "Renewal Management"],
  },
  {
    id: 4,
    icon: "/images/serv_4.png",
    title: "IT Support & Maintenance",
    features: ["Remote Support", "On-site Support", "Preventive Maintenance", "Help Desk"],
  },
  {
    id: 5,
    icon: "/images/serv_5.png",
    title: "Hardware Supply",
    features: ["PCs & Workstations", "Laptops", "Servers", "Network Equipment"],
  },
  {
    id: 6,
    icon: "/images/serv_6.png",
    title: "CCTV & Surveillance",
    features: ["IP Cameras", "NVR Systems", "Installation", "Monitoring Solutions"],
  },
  {
    id: 7,
    icon: "/images/serv_1.png",
    title: "Cloud Solutions",
    features: ["Cloud Migration", "AWS & Azure Management", "Cloud Backup", "SaaS Solutions"],
  },
];

function OurServices() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75; 
      
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="services" className="w-full my-16 px-4 max-w-7xl mx-auto relative group">
      
      {/* الهيدر في المنتصف */}
      <div className="text-center mb-10">
        <span className="text-amber-500 font-bold text-sm uppercase tracking-widest">
          Our Services
        </span>
        <h2 className="text-cyan-700 text-2xl md:text-3xl font-medium mt-2 tracking-tight">
          Comprehensive IT Solutions <br className="hidden sm:inline" /> For Your Business
        </h2>
      </div>

      {/* حاوية السلايدر والأسهم */}
      <div className="relative w-full flex items-center">
        
        {/* سهم الشمال */}
        <button
          onClick={() => handleScroll("left")}
          className="absolute -left-2 md:-left-5 z-40 bg-white border border-slate-200 text-slate-700 p-2.5 rounded-full shadow-md cursor-pointer hover:bg-amber-400 hover:text-white hover:border-amber-400 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* الحاوية الأفقية للكاردات المظبوطة المقاس */}
        <div
          ref={scrollRef}
          className="w-full flex gap-6 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {servicesData.map((service) => (
            <div
              key={service.id}
              className="w-[260px] lg:w-[calc(25%-18px)] flex-shrink-0 bg-transparent border border-slate-200 rounded-2xl p-6 flex flex-col justify-between snap-start transition-all duration-300 hover:border-amber-400 hover:translate-y-1"
            >
              <div>
                {/* الأيقونة الشفافة المظبوطة بحجم أكبر متناسق (24x24) وفي المنتصف */}
                <div className="relative w-24 h-24 mb-5 mx-auto">
                  <Image
                    src={service.icon}
                    alt={service.title}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* عنوان الخدمة */}
                <h3 className="text-slate-900 font-bold text-base mb-4 tracking-tight min-h-[48px] flex items-center">
                  {service.title}
                </h3>

                {/* قائمة المميزات */}
                <ul className="space-y-2.5 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-xs text-slate-500 gap-2">
                      <span className="text-amber-500 font-bold mt-0.5">▪</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* تاغ الـ a المربوط مباشرة بالواتساب والداتا دينامك */}
              <a
                href={`https://wa.me/201278167506?text=${encodeURIComponent(
                  `السلام عليكم، كنت حابب أستفسر أكتر عن خدمة: (${service.title}) في شركة InfraTech.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-amber-500 transition-colors group/link w-fit mt-auto cursor-pointer"
              >
                Learn More
                <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">
                  →
                </span>
              </a>
            </div>
          ))}
        </div>

        {/* سهم اليمين */}
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