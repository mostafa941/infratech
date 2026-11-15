"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

function LinkedinIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function WhatsappIcon({ className = "w-3.5 h-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
    </svg>
  );
}

function Footer() {
  const { lang } = useAppContext();
  const isAr = lang === "ar";

  const quickLinks = [
    { label: isAr ? "الرئيسية" : "Home", href: "/" },
    { label: isAr ? "من نحن" : "About Us", href: "/about-us" },
    { label: isAr ? "خدماتنا" : "Services", href: "/#services" },
    { label: isAr ? "المتجر" : "Store", href: "/storePage" },
    { label: isAr ? "المشاريع" : "Projects", href: "/#services" },
    { label: isAr ? "تواصل معنا" : "Contact", href: "/contact-us" },
  ];

  const servicesList = [
    { label: isAr ? "حلول الشبكات" : "Networking Solutions", href: "/services/networking-solutions" },
    { label: isAr ? "أنظمة المراقبة CCTV" : "CCTV Systems", href: "/services/cctv-systems" },
    { label: isAr ? "البنية التحتية والخوادم" : "IT Infrastructure & Servers", href: "/services/it-infrastructure-servers" },
    { label: isAr ? "الدعم الفني والصيانة" : "IT Support & Maintenance", href: "/services/it-support-maintenance" },
    { label: isAr ? "توريد الأجهزة والمعدات" : "Hardware Supply", href: "/services/hardware-supply" },
  ];

  return (
    <footer
      className="relative w-full bg-[#003847] text-white pt-8 sm:pt-10 md:pt-12 pb-6 overflow-hidden select-none"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Decorative Bottom Corner Curved Swoosh (Right in LTR, Left in RTL) */}
      <div
        className={`absolute bottom-0 pointer-events-none w-36 sm:w-48 md:w-60 h-28 sm:h-36 md:h-44 z-0 ${
          isAr ? "left-0" : "right-0"
        }`}
      >
        <svg
          viewBox="0 0 200 150"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {isAr ? (
            <>
              {/* Cyan outer corner */}
              <path d="M 150,150 C 90,140 30,90 0,30 L 0,150 Z" fill="#00828a" />
              {/* Orange curved band */}
              <path d="M 170,150 C 105,140 40,85 10,20 L 0,30 C 30,90 90,140 150,150 Z" fill="#ff6a00" />
            </>
          ) : (
            <>
              {/* Cyan outer corner */}
              <path d="M 50,150 C 110,140 170,90 200,30 L 200,150 Z" fill="#00828a" />
              {/* Orange curved band */}
              <path d="M 30,150 C 95,140 160,85 200,20 L 200,30 C 170,90 110,140 50,150 Z" fill="#ff6a00" />
            </>
          )}
        </svg>
      </div>

      {/* Main Footer Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* DESKTOP LAYOUT (md & above): 4 Clean Columns with Vertical Dividers */}
        <div className="hidden md:flex items-start justify-between gap-6 lg:gap-8 pb-8">
          
          {/* Column 1: Brand Logo & About */}
          <div className="w-[30%] lg:w-[28%] flex flex-col items-start">
            <Link href="/" className="inline-block mb-3">
              <Image
                src="/images/logoInfra_footer.png"
                alt="InfraTech Logo"
                width={240}
                height={56}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
            <p className="text-xs text-[#b0d2d9] leading-relaxed max-w-xs mb-4">
              {isAr
                ? "الشركة الرائدة في تقديم حلول تكنولوجيا المعلومات والشبكات وكاميرات المراقبة والبنية التحتية للشركات في مصر."
                : "A leading provider of IT, networking, CCTV, and infrastructure solutions for businesses in Egypt."}
            </p>

            {/* Social Icons (White circular badges with dark teal icons) */}
            <div className="flex items-center gap-2.5">
              <a
                href="https://www.linkedin.com/company/108195104/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white text-[#003847] flex items-center justify-center hover:bg-[#ff6a00] hover:text-white transition-all shadow-xs"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61576591353849"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white text-[#003847] flex items-center justify-center hover:bg-[#ff6a00] hover:text-white transition-all shadow-xs"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white text-[#003847] flex items-center justify-center hover:bg-[#ff6a00] hover:text-white transition-all shadow-xs"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/201278167506"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white text-[#003847] flex items-center justify-center hover:bg-[#ff6a00] hover:text-white transition-all shadow-xs"
                aria-label="WhatsApp"
              >
                <WhatsappIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Vertical Divider 1 */}
          <div className="w-[1px] h-28 bg-white/20 self-center hidden lg:block" />

          {/* Column 2: Quick Links */}
          <div className="w-[18%] lg:w-[17%]">
            <h4 className="text-white font-bold text-sm lg:text-[15px] mb-3.5 tracking-wide">
              {isAr ? "روابط سريعة" : "Quick Links"}
            </h4>
            <ul className="space-y-2 text-xs text-[#b0d2d9]">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200"
                  >
                    <span className="text-[#ff6a00] text-[10px] leading-none">•</span>
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="w-[24%] lg:w-[23%]">
            <h4 className="text-white font-bold text-sm lg:text-[15px] mb-3.5 tracking-wide">
              {isAr ? "خدماتنا" : "Our Services"}
            </h4>
            <ul className="space-y-2 text-xs text-[#b0d2d9]">
              {servicesList.map((service, idx) => (
                <li key={idx}>
                  <Link
                    href={service.href}
                    className="hover:text-white hover:translate-x-1 inline-flex items-center gap-1.5 transition-all duration-200"
                  >
                    <span className="text-[#ff6a00] text-[10px] leading-none">•</span>
                    <span>{service.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Vertical Divider 2 */}
          <div className="w-[1px] h-28 bg-white/20 self-center hidden lg:block" />

          {/* Column 4: Contact Us */}
          <div className="w-[24%] lg:w-[23%]">
            <h4 className="text-white font-bold text-sm lg:text-[15px] mb-3.5 tracking-wide">
              {isAr ? "اتصل بنا" : "Contact Us"}
            </h4>
            <ul className="space-y-3 text-xs text-[#b0d2d9]">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-white shrink-0" />
                <a
                  href="tel:+201024291886"
                  className="hover:text-white transition-colors dir-ltr font-medium"
                >
                  +20 10 1234 5678
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-white shrink-0" />
                <a
                  href="mailto:info@infratech-co.com"
                  className="hover:text-white transition-colors font-medium break-all"
                >
                  info@infratech-co.com
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-white shrink-0" />
                <span>{isAr ? "الإسكندرية، مصر" : "Alexandria, Egypt"}</span>
              </li>
            </ul>
          </div>

        </div>

        {/* MOBILE APP-STYLE LAYOUT (< md): 2 Columns Side by Side */}
        <div className="md:hidden flex flex-col gap-6 pb-6">
          
          {/* Mobile Top Brand Card */}
          <div className="flex flex-col items-center text-center pb-4 border-b border-white/10">
            <Link href="/" className="inline-block mb-2.5">
              <Image
                src="/images/logoInfra_footer.png"
                alt="InfraTech Logo"
                width={200}
                height={50}
                className="h-9 w-auto object-contain"
                priority
              />
            </Link>
            <p className="text-[11px] text-[#b0d2d9] leading-relaxed max-w-xs mb-3.5">
              {isAr
                ? "حلول تكنولوجيا المعلومات، الشبكات، المراقبة، وتجهيز البنية التحتية للشركات."
                : "A leading provider of IT, networking, CCTV, and infrastructure solutions in Egypt."}
            </p>

            {/* Social Icons row */}
            <div className="flex items-center justify-center gap-3">
              <a
                href="https://www.linkedin.com/company/108195104/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white text-[#003847] flex items-center justify-center hover:bg-[#ff6a00] hover:text-white transition-all shadow-xs"
                aria-label="LinkedIn"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61576591353849"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white text-[#003847] flex items-center justify-center hover:bg-[#ff6a00] hover:text-white transition-all shadow-xs"
                aria-label="Facebook"
              >
                <FacebookIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white text-[#003847] flex items-center justify-center hover:bg-[#ff6a00] hover:text-white transition-all shadow-xs"
                aria-label="YouTube"
              >
                <YoutubeIcon className="w-3.5 h-3.5" />
              </a>
              <a
                href="https://wa.me/201278167506"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded-full bg-white text-[#003847] flex items-center justify-center hover:bg-[#ff6a00] hover:text-white transition-all shadow-xs"
                aria-label="WhatsApp"
              >
                <WhatsappIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* 2 COLUMNS SIDE BY SIDE (App-Like Layout) */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 px-1">
            
            {/* Column 1: Quick Links */}
            <div className="bg-white/5 rounded-2xl p-3.5 sm:p-4 border border-white/10">
              <h4 className="text-white font-bold text-xs sm:text-sm mb-2.5 pb-1 border-b border-white/10 tracking-wide">
                {isAr ? "روابط سريعة" : "Quick Links"}
              </h4>
              <ul className="space-y-1.5 text-[11px] sm:text-xs text-[#b0d2d9]">
                {quickLinks.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="hover:text-white inline-flex items-center gap-1 transition-colors"
                    >
                      <span className="text-[#ff6a00] text-[9px] leading-none">•</span>
                      <span>{link.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 2: Our Services */}
            <div className="bg-white/5 rounded-2xl p-3.5 sm:p-4 border border-white/10">
              <h4 className="text-white font-bold text-xs sm:text-sm mb-2.5 pb-1 border-b border-white/10 tracking-wide">
                {isAr ? "خدماتنا" : "Our Services"}
              </h4>
              <ul className="space-y-1.5 text-[11px] sm:text-xs text-[#b0d2d9]">
                {servicesList.map((service, idx) => (
                  <li key={idx}>
                    <Link
                      href={service.href}
                      className="hover:text-white inline-flex items-center gap-1 transition-colors"
                    >
                      <span className="text-[#ff6a00] text-[9px] leading-none">•</span>
                      <span>{service.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Mobile Contact Us Bar */}
          <div className="bg-white/5 rounded-2xl p-3.5 border border-white/10 mx-1 flex flex-col gap-2 text-xs text-[#b0d2d9]">
            <h4 className="text-white font-bold text-xs mb-1 text-center sm:text-start">
              {isAr ? "اتصل بنا" : "Contact Us"}
            </h4>
            <div className="flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <a
                href="tel:+201024291886"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-white" />
                <span className="dir-ltr">+20 10 1234 5678</span>
              </a>
              <a
                href="mailto:info@infratech-co.com"
                className="flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-white" />
                <span>info@infratech-co.com</span>
              </a>
              <div className="flex items-center gap-1.5 w-full sm:w-auto">
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span>{isAr ? "الإسكندرية، مصر" : "Alexandria, Egypt"}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-[#8fb8c2]">
          <p>© {new Date().getFullYear()} InfraTech. {isAr ? "جميع الحقوق محفوظة." : "All rights reserved."}</p>
          <div className="flex gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">
              {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
            </Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">
              {isAr ? "الشروط والأحكام" : "Terms of Service"}
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
