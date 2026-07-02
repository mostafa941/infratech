"use client";

import React, { useState } from "react";
import TopNavBar from "@/components/TopNavBar";
import BottomNavBar from "@/components/BottomNavBar";
import Footer from "@/components/Footer";

interface FAQItem {
  q: string;
  a: string;
}

const faqs: FAQItem[] = [
  {
    q: "What products are available in the InfraTech store?",
    a: "We provide high-quality networking hardware, computers and laptops, NVR and IP CCTV security cameras, enterprise routers, switches, and official software licensing options."
  },
  {
    q: "How can I request a customized quotation?",
    a: "You can click on the 'Request Quote Now' button in our subscription banners, or email us at info@infratech-co.com with your system specifications, and our sales team will draft a layout proposal."
  },
  {
    q: "Do you offer shipping outside Cairo?",
    a: "Yes, we ship to all governorates in Egypt with fast delivery times ranging between 3 to 5 business days."
  },
  {
    q: "Are the products covered by warranty?",
    a: "All equipment sold is 100% original and comes backed by standard manufacturers' official warranty cards."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50" dir="ltr">
      <TopNavBar />
      <BottomNavBar />

      <main className="flex-grow w-full max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block mb-1">
            Questions
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</h1>
          <p className="text-slate-400 text-xs mt-1">Get immediate answers to common customer inquiries.</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs space-y-4">
          {faqs.map((faq, idx) => (
            <div 
              key={idx} 
              className="border-b border-slate-100 last:border-0 pb-4 last:pb-0"
            >
              <button
                onClick={() => toggleFAQ(idx)}
                className="w-full flex items-center justify-between text-left font-bold text-slate-800 text-xs md:text-sm hover:text-amber-500 transition-colors py-2 cursor-pointer focus:outline-none"
              >
                <span>{faq.q}</span>
                <span className="text-lg font-black text-amber-500 ml-4">
                  {openIndex === idx ? "−" : "+"}
                </span>
              </button>
              
              {openIndex === idx && (
                <div className="mt-2 text-slate-500 text-xs leading-relaxed animate-in fade-in duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
