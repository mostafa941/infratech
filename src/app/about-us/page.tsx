"use client";

import React from "react";
import TopNavBar from "@/components/TopNavBar";
import BottomNavBar from "@/components/BottomNavBar";
import Footer from "@/components/Footer";

export default function AboutUs() {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50" dir="ltr">
      <TopNavBar />
      <BottomNavBar />

      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block mb-1">
            Who we are
          </span>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">About InfraTech</h1>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-xs space-y-8">
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 border-l-4 border-amber-500 pl-3">Our Mission</h2>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed">
              At InfraTech, we aim to bridge technical gaps for enterprise markets by supplying robust IT network infrastructure products, surveillance systems, switches, routers, and high-performance server hardware. We make buying hardware reliable and transparent.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-lg font-bold text-slate-800 border-l-4 border-amber-500 pl-3">Why Choose Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <span className="text-2xl block mb-2">🏅</span>
                <h4 className="font-bold text-xs text-slate-800 mb-1">Certified Experts</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">Certified consulting and delivery engineers mapping optimal network topologies.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <span className="text-2xl block mb-2">🛡️</span>
                <h4 className="font-bold text-xs text-slate-800 mb-1">Official Partners</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">Authorized items and original devices direct from Cisco, Dell, HP, Lenovo, and Sophos.</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100">
                <span className="text-2xl block mb-2">⚡</span>
                <h4 className="font-bold text-xs text-slate-800 mb-1">Fast Logistics</h4>
                <p className="text-[11px] text-slate-500 leading-relaxed">Swift shipping logistics ensuring minimal downtime during installation phases.</p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
