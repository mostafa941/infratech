"use client";

import React, { useState } from "react";
import BottomNavBar from "@/components/BottomNavBar";
import Footer from "@/components/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
  ChevronRight,
  Headphones,
} from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { toast } from "react-toastify";

const contactChannels = [
  {
    icon: Mail,
    labelKey: "Email Address",
    value: "info@infratech-co.com",
    subKey: "We reply within 24 hours",
    href: "mailto:info@infratech-co.com",
    color: "text-violet-600",
    bg: "bg-violet-50",
    border: "hover:border-violet-400",
  },
  {
    icon: Phone,
    labelKey: "Phone & WhatsApp",
    value: "+20 127 816 7506",
    subKey: "Available 9 AM – 6 PM EGT",
    href: "tel:+201278167506",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "hover:border-emerald-400",
  },
  {
    icon: MapPin,
    labelKey: "Office Location",
    value: "Cairo, Egypt",
    subKey: "Nasr City, 1st District",
    href: "https://maps.google.com",
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "hover:border-amber-400",
  },
  {
    icon: Clock,
    labelKey: "Business Hours",
    value: "Sun – Thu, 9AM – 6PM",
    subKey: "Emergency support 24/7",
    href: null,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    border: "hover:border-cyan-400",
  },
];

const subjects = [
  "Network Infrastructure",
  "Software Development",
  "Cyber Security",
  "Hardware Supply",
  "CCTV & Surveillance",
  "IT Support & Maintenance",
  "Cloud Solutions",
  "Other",
];

const subjectsAr = [
  "البنية التحتية للشبكات",
  "تطوير البرمجيات والمواقع",
  "الأمن السيبراني وحماية البيانات",
  "توريد أجهزة ومعدات تكنولوجيا المعلومات",
  "أنظمة المراقبة والكاميرات",
  "الدعم الفني والصيانة",
  "الحلول والنسخ السحابي",
  "أخرى",
];

export default function ContactUs() {
  const { lang } = useAppContext();
  const isAr = lang === "ar";

  const [form, setForm] = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setLoading(true);
    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        toast.success(isAr ? "تم إرسال رسالتك بنجاح!" : "Message sent successfully!");
        setForm({ name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        toast.error("Failed to send message");
      }
    } catch {
      toast.error("Network error");
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      isAr 
        ? `السلام عليكم، أنا ${form.name || "عميل"}${form.subject ? ` — أود الاستفسار عن: ${form.subject}` : ""}. أود التواصل معكم.`
        : `Hello, I'm ${form.name || "customer"}${form.subject ? ` — I want to inquire about: ${form.subject}` : ""}. I would like to contact you.`
    );
    window.open(`https://wa.me/201278167506?text=${text}`, "_blank");
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50" dir={isAr ? "rtl" : "ltr"}>
      <BottomNavBar />

      <section className="relative bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-72 h-72 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-cyan-400 blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
          <span className="inline-block bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
            {isAr ? "اتصل بنا" : "Get In Touch"}
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
            {isAr ? (
              <>تحدث إلى <span className="text-amber-400">خبرائنا</span></>
            ) : (
              <>Talk to Our <span className="text-amber-400">Experts</span></>
            )}
          </h1>
          <p className="text-slate-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            {isAr 
              ? "هل لديك فكرة مشروع، أو مشكلة تقنية، أو استفسار عن الأسعار؟ نحن هنا للمساعدة - اختر وسيلة التواصل الأنسب لك."
              : "Have a project in mind, a technical issue, or a pricing question? We're here to help — choose the channel that works best for you."}
          </p>
        </div>
      </section>

      <main className="flex-grow w-full max-w-6xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14">
          {contactChannels.map((ch, i) => {
            const Icon = ch.icon;
            let translatedLabel = ch.labelKey;
            let translatedSub = ch.subKey;
            let translatedVal = ch.value;

            if (isAr) {
              if (ch.labelKey === "Email Address") {
                translatedLabel = "عنوان البريد الإلكتروني";
                translatedSub = "نرد خلال 24 ساعة";
              } else if (ch.labelKey === "Phone & WhatsApp") {
                translatedLabel = "رقم الهاتف والواتساب";
                translatedSub = "متاح من 9 صباحاً – 6 مساءً";
              } else if (ch.labelKey === "Office Location") {
                translatedLabel = "مقر الشركة";
                translatedSub = "مدينة نصر، الحي الأول";
                translatedVal = "القاهرة، مصر";
              } else if (ch.labelKey === "Business Hours") {
                translatedLabel = "ساعات العمل الرسمية";
                translatedSub = "دعم فني طارئ 24/7";
                translatedVal = "الأحد – الخميس، 9ص – 6م";
              }
            }

            const inner = (
              <>
                <div className={`w-11 h-11 rounded-2xl ${ch.bg} flex items-center justify-center mb-4 flex-shrink-0`}>
                  <Icon className={`w-5 h-5 ${ch.color}`} strokeWidth={1.75} />
                </div>
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">{translatedLabel}</p>
                <p className="font-bold text-slate-900 text-sm mb-0.5">{translatedVal}</p>
                <p className="text-[11px] text-slate-400">{translatedSub}</p>
              </>
            );
            return ch.href ? (
              <a
                key={i}
                href={ch.href}
                target={ch.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className={`bg-white border border-slate-100 rounded-2xl p-5 transition-all hover:shadow-md ${ch.border} group`}
              >
                {inner}
              </a>
            ) : (
              <div key={i} className={`bg-white border border-slate-100 rounded-2xl p-5 transition-all hover:shadow-md ${ch.border}`}>
                {inner}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
                <Send className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h2 className="font-bold text-slate-900 text-base">{isAr ? "أرسل لنا رسالة" : "Send Us a Message"}</h2>
                <p className="text-xs text-slate-400">{isAr ? "سنتواصل معك مجدداً في غضون 24 ساعة" : "We'll get back to you within 24 hours"}</p>
              </div>
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="font-bold text-slate-900 text-lg">{isAr ? "تم إرسال الرسالة بنجاح!" : "Message Sent!"}</h3>
                <p className="text-sm text-slate-500 max-w-xs">
                  {isAr ? "شكراً لتواصلك معنا. سيقوم فريق المبيعات والخبرة بالاتصال بك قريباً جداً." : "Thank you for reaching out. Our team will contact you shortly."}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-2 text-xs text-amber-500 font-bold hover:underline cursor-pointer"
                >
                  {isAr ? "إرسال رسالة أخرى" : "Send another message"}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {isAr ? "الاسم الكامل" : "Full Name"} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder={isAr ? " علي محمد " : "Ali Mohamed"}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 bg-slate-50 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {isAr ? "عنوان البريد الإلكتروني" : "Email Address"} <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="infra@company.com"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 bg-slate-50 focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {isAr ? "رقم الهاتف" : "Phone Number"}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+20 1XX XXX XXXX"
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 bg-slate-50 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                      {isAr ? "موضوع الاستفسار / الخدمة" : "Service of Interest"}
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 bg-slate-50 focus:bg-white transition-all cursor-pointer"
                    >
                      <option value="">{isAr ? "اختر خدمة..." : "Select a service..."}</option>
                      {(isAr ? subjectsAr : subjects).map((s, idx) => (
                        <option key={idx} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2">
                    {isAr ? "تفاصيل الرسالة" : "Your Message"} <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    placeholder={isAr ? "تحدث إلينا عن مشروعك أو استفسارك بالتفصيل..." : "Tell us about your project or inquiry..."}
                    className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 bg-slate-50 focus:bg-white transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-cyan-700 to-cyan-800 hover:from-cyan-800 hover:to-cyan-900 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center gap-2 shadow-md shadow-cyan-700/20 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      {isAr ? "جاري الإرسال..." : "Sending..."}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      {isAr ? "إرسال الرسالة" : "Send Message"}
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="flex flex-col gap-5">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-6 text-white shadow-sm">
              <div className="w-11 h-11 rounded-2xl bg-white/20 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-base mb-2">{isAr ? "تواصل معنا عبر واتساب" : "Chat on WhatsApp"}</h3>
              <p className="text-emerald-100 text-xs leading-relaxed mb-4">
                {isAr ? "احصل على رد سريع ومباشر من فريق الدعم الفني والمبيعات. متاحون لمساعدتك." : "Get an instant reply from our technical team. Available for urgent queries."}
              </p>
              <button
                onClick={handleWhatsApp}
                className="w-full bg-white text-emerald-700 font-bold py-2.5 px-4 rounded-xl text-xs hover:bg-emerald-50 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                {isAr ? "ابدأ المحادثة الآن" : "Start Chat Now"}
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
