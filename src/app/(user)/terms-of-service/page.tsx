"use client";

import React from "react";
import BottomNavBar from "@/components/BottomNavBar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

export default function TermsOfService() {
  const { lang } = useAppContext();
  const isAr = lang === "ar";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50" dir={isAr ? "rtl" : "ltr"}>
      <BottomNavBar />
      
      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
            {isAr ? "شروط الخدمة" : "Terms of Service"}
          </h1>
          <p className="text-xs text-slate-400 mb-8">
            {isAr ? "آخر تحديث: 9 يوليو 2026" : "Last updated: July 9, 2026"}
          </p>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                {isAr ? "1. قبول الشروط" : "1. Acceptance of Terms"}
              </h2>
              <p>
                {isAr 
                  ? "باستخدامك لموقع إنفراتيك أو متجرنا، فإنك توافق على الالتزام بشروط الخدمة هذه وجميع القوانين واللوائح المعمول بها."
                  : "By accessing and using InfraTech's website or store, you agree to be bound by these Terms of Service and all applicable laws and regulations."}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                {isAr ? "2. المنتجات والأسعار" : "2. Products & Pricing"}
              </h2>
              <p>
                {isAr
                  ? "نحتفظ بالحق في تعديل أسعار المنتجات أو إيقاف توفير أي خدمة في أي وقت دون إشعار مسبق. نسعى دائماً لتوفير معلومات دقيقة حول التوافر والمواصفات."
                  : "We reserve the right to modify product prices or discontinue any service at any time without prior notice. We make every effort to display accurate availability and specifications."}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                {isAr ? "3. حدود المسؤولية" : "3. Limitation of Liability"}
              </h2>
              <p>
                {isAr
                  ? "لا تتحمل شركة إنفراتيك المسؤولية عن أي أضرار غير مباشرة أو تبعية ناتجة عن استخدام أو عدم القدرة على استخدام المنتجات أو الخدمات المشتراة."
                  : "InfraTech shall not be liable for any indirect or consequential damages arising out of the use or inability to use the products or services purchased."}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
