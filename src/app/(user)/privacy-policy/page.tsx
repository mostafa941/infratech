"use client";

import React from "react";
import BottomNavBar from "@/components/BottomNavBar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

export default function PrivacyPolicy() {
  const { lang } = useAppContext();
  const isAr = lang === "ar";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50" dir={isAr ? "rtl" : "ltr"}>
      <BottomNavBar />
      
      <main className="flex-grow w-full max-w-4xl mx-auto px-6 py-16">
        <div className="bg-white border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm">
          <h1 className="text-3xl font-extrabold text-slate-900 mb-6">
            {isAr ? "سياسة الخصوصية" : "Privacy Policy"}
          </h1>
          <p className="text-xs text-slate-400 mb-8">
            {isAr ? "آخر تحديث: 9 يوليو 2026" : "Last updated: July 9, 2026"}
          </p>

          <div className="space-y-6 text-sm text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                {isAr ? "1. المعلومات التي نجمعها" : "1. Information We Collect"}
              </h2>
              <p>
                {isAr 
                  ? "نحن نجمع المعلومات التي تقدمها لنا مباشرة عند إنشاء حساب، أو تقديم طلب، أو التواصل معنا. قد يشمل ذلك اسمك وبريدك الإلكتروني ورقم هاتفك وعنوان الشحن الخاص بك."
                  : "We collect information you provide directly to us when creating an account, making a purchase, or contacting us. This may include your name, email address, phone number, and shipping address."}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                {isAr ? "2. كيف نستخدم معلوماتك" : "2. How We Use Your Information"}
              </h2>
              <p>
                {isAr
                  ? "نستخدم المعلومات التي نجمعها لمعالجة طلباتك وتوصيل المنتجات، وتقديم الدعم الفني، وإرسال تحديثات بخصوص حسابك أو المنتجات والخدمات التي تهمك."
                  : "We use the information we collect to process your orders, deliver products, provide technical support, and send updates regarding your account or products and services of interest."}
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                {isAr ? "3. حماية وتأمين البيانات" : "3. Data Protection & Security"}
              </h2>
              <p>
                {isAr
                  ? "نحن نطبق مجموعة متنوعة من الإجراءات الأمنية لضمان سلامة معلوماتك الشخصية وحمايتها من الوصول غير المصرح به أو التغيير أو الإفصاح."
                  : "We implement a variety of security measures to maintain the safety of your personal information and protect it against unauthorized access, alteration, or disclosure."}
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
