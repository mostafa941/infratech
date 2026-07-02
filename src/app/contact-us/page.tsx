"use client";

import React, { useState } from "react";
import Image from "next/image";
import TopNavBar from "@/components/TopNavBar";
import BottomNavBar from "@/components/BottomNavBar";
import Footer from "@/components/Footer";

export default function ContactUs() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleWhatsAppDirect = () => {
    const text = encodeURIComponent(`السلام عليكم، أنا ${name || "عميل"}. أود التواصل معكم بخصوص استفسار.`);
    window.open(`https://wa.me/201278167506?text=${text}`, "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50" dir="ltr">
      <TopNavBar />
      <BottomNavBar />

      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block mb-1">
            Get in touch
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">Contact Our Experts</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Quick Contacts details */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-slate-800">Quick Contact</h2>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              Have a project query, technical issue, or pricing quote question? Choose a channel below.
            </p>

            <div className="space-y-4">
              <a 
                href="mailto:info@infratech-co.com"
                className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-amber-400 hover:bg-white transition-all cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-lg text-amber-500">
                  📧
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800">Email Address</h4>
                  <p className="text-[11px] text-slate-500">info@infratech-co.com</p>
                </div>
              </a>

              <button 
                onClick={handleWhatsAppDirect}
                className="w-full flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-emerald-400 hover:bg-white transition-all text-left cursor-pointer"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-lg text-emerald-600">
                  💬
                </div>
                <div>
                  <h4 className="font-bold text-xs text-slate-800">Chat on WhatsApp</h4>
                  <p className="text-[11px] text-slate-500">+20 127 816 7506</p>
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xs">
            <h2 className="text-lg font-bold text-slate-800 mb-6">Send an Email Form</h2>
            {submitted ? (
              <div className="bg-emerald-50 text-emerald-600 text-xs font-semibold p-4 rounded-xl border border-emerald-100">
                ✅ Your message has been received! Our sales support team will contact you back.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ahmed Ali"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-amber-500 bg-slate-50 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ahmed@example.com"
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-amber-500 bg-slate-50 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Message Description</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter details..."
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-amber-500 bg-slate-50 focus:bg-white transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
