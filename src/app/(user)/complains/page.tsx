"use client";

import React, { useState } from "react";
import BottomNavBar from "@/components/BottomNavBar";
import Footer from "@/components/Footer";

export default function Complains() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [complainText, setComplainText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitComplain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !complainText) return;
    
    // Simulate sending email log
    console.log("Complain submitted by:", name, phone, complainText);
    setSubmitted(true);
    setName("");
    setPhone("");
    setComplainText("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50" dir="ltr">
      <BottomNavBar />

      <main className="flex-grow w-full max-w-xl mx-auto px-4 py-12">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-md">
          <div className="text-center mb-6">
            <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block mb-1">
              Feedback & support
            </span>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Submit a Complaint</h1>
            <p className="text-slate-400 text-xs mt-1">We take customer satisfaction seriously. Let us know how we can improve.</p>
          </div>

          {submitted ? (
            <div className="bg-emerald-50 text-emerald-600 text-xs font-semibold p-4 rounded-xl border border-emerald-100 text-center">
              ✅ Thank you for your feedback. Your complaint has been submitted and redirected to management email for inspection.
            </div>
          ) : (
            <form onSubmit={handleSubmitComplain} className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Your Name <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., Ahmed Ali"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-amber-500 bg-slate-50 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g., 01278167506"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-amber-500 bg-slate-50 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">Complaint Details <span className="text-rose-500">*</span></label>
                <textarea
                  required
                  rows={5}
                  value={complainText}
                  onChange={(e) => setComplainText(e.target.value)}
                  placeholder="Please describe the issue or problem you faced..."
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-xs outline-none focus:border-amber-500 bg-slate-50 focus:bg-white transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-4 rounded-xl text-xs transition-colors cursor-pointer shadow-sm shadow-rose-600/10"
              >
                Submit Complaint
              </button>
            </form>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
