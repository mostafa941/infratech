"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

function Footer() {
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
    <footer className="bg-slate-950 text-white pt-16 pb-8 border-t border-slate-900" dir="ltr">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        {/* Brand Information */}
        <div className="flex flex-col gap-4">
          <Link href="/" className="inline-block">
            <div className="bg-white p-2 rounded-xl inline-block">
              <Image src="/images/logoInfra.jpg" alt="InfraTech Logo" width={140} height={40} className="h-auto w-auto" />
            </div>
          </Link>
          <p className="text-slate-400 text-xs md:text-sm leading-relaxed mt-2">
            Connecting today, building tomorrow. Providing high-quality IT infrastructure & networking solutions.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="w-8 h-8 rounded-full bg-slate-900 hover:bg-amber-500 flex items-center justify-center transition-colors">
              <Image src="/icons/facebook.svg" width={16} height={16} alt="Facebook" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-900 hover:bg-amber-500 flex items-center justify-center transition-colors">
              <Image src="/icons/instagram.svg" width={14} height={14} alt="Instagram" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-900 hover:bg-amber-500 flex items-center justify-center transition-colors">
              <Image src="/icons/linkedin.svg" width={14} height={14} alt="Linkedin" />
            </a>
            <a href="#" className="w-8 h-8 rounded-full bg-slate-900 hover:bg-amber-500 flex items-center justify-center transition-colors">
              <Image src="/icons/tiktok.svg" width={14} height={14} alt="Tiktok" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-amber-500 border-l-4 border-amber-500 pl-3">
            Quick Links
          </h4>
          <ul className="space-y-3 text-xs md:text-sm text-slate-400">
            <li>
              <Link href="/" className="hover:text-amber-500 transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/about-us" className="hover:text-amber-500 transition-colors">About Us</Link>
            </li>
            <li>
              <Link href="/storePage" className="hover:text-amber-500 transition-colors">Store</Link>
            </li>
            <li>
              <Link href="/contact-us" className="hover:text-amber-500 transition-colors">Contact Us</Link>
            </li>
            <li>
              <Link href="/complains" className="hover:text-amber-500 transition-colors">Complains</Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-amber-500 transition-colors">FAQs</Link>
            </li>
          </ul>
        </div>

        {/* Our Services */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-amber-500 border-l-4 border-amber-500 pl-3">
            Our Services
          </h4>
          <ul className="space-y-3 text-xs md:text-sm text-slate-400">
            <li>
              <Link href="/#services" onClick={handleScrollToServices} className="hover:text-amber-500 transition-colors">Network Infrastructure</Link>
            </li>
            <li>
              <Link href="/#services" onClick={handleScrollToServices} className="hover:text-amber-500 transition-colors">Cyber Security</Link>
            </li>
            <li>
              <Link href="/#services" onClick={handleScrollToServices} className="hover:text-amber-500 transition-colors">Software Licensing</Link>
            </li>
            <li>
              <Link href="/#services" onClick={handleScrollToServices} className="hover:text-amber-500 transition-colors">IT Support & Maintenance</Link>
            </li>
            <li>
              <Link href="/#services" onClick={handleScrollToServices} className="hover:text-amber-500 transition-colors">Hardware Supply</Link>
            </li>
            <li>
              <Link href="/#services" onClick={handleScrollToServices} className="hover:text-amber-500 transition-colors">CCTV & Surveillance</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info & Newsletter */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider mb-6 text-amber-500 border-l-4 border-amber-500 pl-3">
            Contact Us
          </h4>
          <ul className="space-y-3 text-xs md:text-sm text-slate-400 mb-6">
            <li className="flex items-center gap-2">
              <span className="text-amber-500">📞</span>
              <a href="tel:01278167506" className="hover:text-amber-500">+20 127 816 7506</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-amber-500">📧</span>
              <a href="mailto:info@infratech-co.com" className="hover:text-amber-500">info@infratech-co.com</a>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">📍</span>
              <span>Cairo, Egypt</span>
            </li>
          </ul>

          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-3">Newsletter</h5>
          <form className="flex rounded-lg overflow-hidden border border-slate-800" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email..." 
              className="bg-slate-900 border-0 outline-none px-3 py-2 text-xs flex-grow text-white" 
            />
            <button className="bg-amber-500 hover:bg-amber-600 px-4 py-2 text-xs font-bold text-white transition-colors cursor-pointer">
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-4 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© {new Date().getFullYear()} InfraTech. All rights reserved.</p>
        <div className="flex gap-4">
          <Link href="/about-us" className="hover:text-amber-500">Privacy Policy</Link>
          <Link href="/about-us" className="hover:text-amber-500">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
