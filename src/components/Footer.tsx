"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { toast } from "react-toastify";

function Footer() {
  const { t, lang } = useAppContext();
  const isAr = lang === "ar";
  const [subEmail, setSubEmail] = useState("");
  const [subLoading, setSubLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subEmail || !subEmail.includes("@")) {
      toast.error(isAr ? "برجاء إدخال بريد إلكتروني صحيح" : "Please enter a valid email address");
      return;
    }
    setSubLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: subEmail }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(isAr ? "تم الاشتراك بنجاح! ستصلك عروضنا الحصرية" : "Subscribed! Check your email for exclusive offers 🎉");
        setSubEmail("");
      } else {
        toast.error(data.error || (isAr ? "حدث خطأ ما" : "Subscription failed"));
      }
    } catch {
      toast.error(isAr ? "تعذر الاتصال بالخادم" : "Network error. Please try again.");
    } finally {
      setSubLoading(false);
    }
  };

  const handleScrollToServices = (e: React.MouseEvent) => {
    // If on homepage, smooth scroll
    if (window.location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("services");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand Information */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="inline-block">
            <div className="bg-white p-2 rounded-xl inline-block">
              <Image src="/images/logoInfra.jpg" alt="InfraTech Logo" width={140} height={40} className="h-auto w-auto" />
            </div>
          </Link>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-2">
            {t("footerDesc")}
          </p>
          <div className="flex gap-3 mt-4">
            <a 
              href="https://www.facebook.com/profile.php?id=61576591353849" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full bg-slate-900 hover:bg-amber-500 flex items-center justify-center transition-colors"
            >
              <Image src="/icons/facebook.svg" width={16} height={16} alt="Facebook" />
            </a>
            <a 
              href="https://www.instagram.com/infra_tech70/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full bg-slate-900 hover:bg-amber-500 flex items-center justify-center transition-colors"
            >
              <Image src="/icons/instagram.svg" width={14} height={14} alt="Instagram" />
            </a>
            <a 
              href="https://www.linkedin.com/company/108195104/admin/dashboard/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="w-8 h-8 rounded-full bg-slate-900 hover:bg-amber-500 flex items-center justify-center transition-colors"
            >
              <Image src="/icons/linkedin.svg" width={14} height={14} alt="Linkedin" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-amber-500 border-l-4 border-amber-500 pl-3">
            {t("quickLinks")}
          </h4>
          <ul className="space-y-3 text-xs md:text-sm text-slate-400">
            <li>
              <Link href="/" className="hover:text-amber-500 transition-colors">{t("home")}</Link>
            </li>
            <li>
              <Link href="/about-us" className="hover:text-amber-500 transition-colors">{t("aboutUs")}</Link>
            </li>
            <li>
              <Link href="/storePage" className="hover:text-amber-500 transition-colors">{t("store")}</Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-amber-500 transition-colors">{t("contactUs")}</Link>
            </li>
            <li>
              <Link href="/complains" className="hover:text-amber-500 transition-colors">{t("complains")}</Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-amber-500 transition-colors">{t("faqs")}</Link>
            </li>
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-amber-500 border-l-4 border-amber-500 pl-3">
            {t("ourServices")}
          </h4>
          <ul className="space-y-3 text-xs md:text-sm text-slate-400">
            <li>
              <Link href="/#services" onClick={handleScrollToServices} className="hover:text-amber-500 transition-colors">{t("serv2_title")}</Link>
            </li>
            <li>
              <Link href="/#services" onClick={handleScrollToServices} className="hover:text-amber-500 transition-colors">{t("serv3_title")}</Link>
            </li>
            <li>
              <Link href="/#services" onClick={handleScrollToServices} className="hover:text-amber-500 transition-colors">{t("serv4_title")}</Link>
            </li>
            <li>
              <Link href="/#services" onClick={handleScrollToServices} className="hover:text-amber-500 transition-colors">{t("serv5_title")}</Link>
            </li>
            <li>
              <Link href="/#services" onClick={handleScrollToServices} className="hover:text-amber-500 transition-colors">{t("serv6_title")}</Link>
            </li>
            <li>
              <Link href="/#services" onClick={handleScrollToServices} className="hover:text-amber-500 transition-colors">{t("serv7_title")}</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info & Newsletter */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-amber-500 border-l-4 border-amber-500 pl-3">
            {t("contactUs")}
          </h4>
          <ul className="space-y-3 text-xs md:text-sm text-slate-400 mb-6">
            <li className="flex items-center gap-2">
              <span className="text-amber-500">📞</span>
              <a href="tel:01024291886" className="hover:text-amber-500">+20 102 429 1886</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-500">📧</span>
              <a href="mailto:info@infratech-co.com" className="hover:text-amber-500">info@infratech-co.com</a>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">📍</span>
              <span>{isAr ? "الإسكندرية، مصر" : "Alexandria, Egypt"}</span>
            </li>
          </ul>

          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">{t("newsletter")}</h5>
          <form className="flex rounded-lg overflow-hidden border border-slate-800" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder={t("yourEmail")}
              value={subEmail}
              onChange={(e) => setSubEmail(e.target.value)}
              className="bg-slate-900 border-0 outline-none px-3 py-2 text-xs flex-grow text-white" 
            />
            <button
              type="submit"
              disabled={subLoading}
              className="bg-amber-500 hover:bg-amber-600 px-4 py-2 text-xs font-bold text-white transition-colors cursor-pointer disabled:opacity-60 whitespace-nowrap"
            >
              {subLoading ? "..." : t("subscribe")}
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} InfraTech. {t("rightsReserved")}</p>
        <div className="flex gap-4">
          <Link href="/privacy-policy" className="hover:text-amber-500">{t("privacyPolicy")}</Link>
          <Link href="/terms-of-service" className="hover:text-amber-500">{t("termsOfService")}</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;