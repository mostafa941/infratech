"use client";

import React from "react";
import BottomNavBar from "@/components/BottomNavBar";
import Footer from "@/components/Footer";
import {
  Award,
  Users,
  Zap,
  Shield,
  Globe,
  HeartHandshake,
  CheckCircle2,
  TrendingUp,
  Building2,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

// Load brands exactly like in BrandsSection
const brands = [
  { name: "HP", logo: "/images/Brands/hp.png" },
  { name: "Dell", logo: "/images/Brands/dell.png" },
  { name: "Lenovo", logo: "/images/Brands/lenovo.png" },
  { name: "Cisco", logo: "/images/Brands/cisco.png" },
  { name: "Microsoft", logo: "/images/Brands/microsoft.png" },
  { name: "Sophos", logo: "/images/Brands/sophos.png" },
];

const stats = [
  { label: "Years of Experience", value: "10+", icon: TrendingUp, color: "text-amber-500" },
  { label: "Projects Delivered", value: "500+", icon: CheckCircle2, color: "text-emerald-500" },
  { label: "Enterprise Clients", value: "200+", icon: Building2, color: "text-cyan-600" },
  { label: "Countries Served", value: "15+", icon: Globe, color: "text-violet-500" },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Integrity",
    desc: "We operate with full transparency. Every solution we deliver is backed by genuine products and honest consulting.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Zap,
    title: "Speed & Efficiency",
    desc: "Swift project turnaround without compromising quality — because your business can't afford downtime.",
    color: "text-amber-500",
    bg: "bg-amber-50",
  },
  {
    icon: HeartHandshake,
    title: "Client Partnership",
    desc: "We don't just deliver products — we build long-term partnerships that grow alongside your business.",
    color: "text-rose-500",
    bg: "bg-rose-50",
  },
  {
    icon: Award,
    title: "Certified Excellence",
    desc: "Our engineers hold industry certifications from Cisco, Microsoft, and other leading technology vendors.",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
];

const timeline = [
  { year: "2014", title: "Founded in Cairo", desc: "InfraTech was established with a mission to modernize Egypt's IT infrastructure landscape." },
  { year: "2016", title: "First Enterprise Contract", desc: "Secured our first large-scale network deployment for a top-tier Egyptian bank." },
  { year: "2019", title: "Regional Expansion", desc: "Extended services across the MENA region, partnering with global hardware vendors." },
  { year: "2022", title: "Software Division Launch", desc: "Launched our software development arm delivering web, mobile, and desktop applications." },
  { year: "2024", title: "500+ Projects Milestone", desc: "Celebrated delivering over 500 successful IT projects across diverse industries." },
];

export default function AboutUs() {
  const { lang, t } = useAppContext();
  const isAr = lang === "ar";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50" dir={isAr ? "rtl" : "ltr"}>
      <BottomNavBar />

      {/* ─── Hero ─── */}
      <section className="relative bg-gradient-to-br from-slate-900 via-cyan-950 to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-cyan-400 blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block bg-amber-500/20 text-amber-400 text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-4">
              {isAr ? "من نحن" : "Who We Are"}
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              {isAr ? (
                <>تمكين الشركات بـ <span className="text-amber-400">حلول تقنية ذكية</span></>
              ) : (
                <>Powering Businesses with <span className="text-amber-400">Smart IT Solutions</span></>
              )}
            </h1>
            <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 max-w-lg">
              {isAr 
                ? "إنفراتيك هي الشركة الرائدة في مصر في مجال البنية التحتية لتكنولوجيا المعلومات - حيث تقدم أجهزة وشبكات وأمن سيبراني وتطوير برمجيات مخصصة منذ عام 2014."
                : "InfraTech is Egypt's leading IT infrastructure company — delivering enterprise-grade hardware, networking, cybersecurity, and custom software solutions since 2014."}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact-us"
                className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm shadow-lg shadow-amber-500/20"
              >
                {isAr ? "اتصل بنا" : "Get in Touch"}
              </Link>
              <Link
                href="/storePage"
                className="border border-white/20 hover:border-white/50 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm backdrop-blur-sm"
              >
                {isAr ? "تصفح المتجر" : "Browse Store"}
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-5 text-center">
                  <Icon className={`w-6 h-6 mx-auto mb-2 ${stat.color}`} />
                  <p className="text-3xl font-extrabold text-white">{stat.value}</p>
                  <p className="text-xs text-slate-400 mt-1 font-medium">
                    {isAr 
                      ? (stat.label === "Years of Experience" ? "سنوات الخبرة" : stat.label === "Projects Delivered" ? "مشاريع منجزة" : stat.label === "Enterprise Clients" ? "عملاء شركات" : "دول تم تقديم الخدمة لها")
                      : stat.label
                    }
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <main className="flex-grow w-full">

        {/* ─── Mission & Vision ─── */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-5">
                <TrendingUp className="w-6 h-6 text-amber-500" />
              </div>
              <h2 className="text-xl font-bold text-slate-900 mb-3">{isAr ? "رسالتنا" : "Our Mission"}</h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                {isAr 
                  ? "سد الفجوات التقنية لأسواق الشركات من خلال توفير منتجات البنية التحتية القوية للشبكات، وأنظمة المراقبة، وأجهزة الشبكات، وخوادم عالية الأداء - مع تقديم حلول موثوقة وشفافة ومبتكرة تمكن الشركات من الازدهار في عالم رقمي."
                  : "To bridge technical gaps for enterprise markets by supplying robust IT infrastructure products, surveillance systems, networking equipment, and high-performance server hardware — while delivering reliable, transparent, and innovative solutions that empower businesses to thrive in a digital-first world."}
              </p>
            </div>
            <div className="bg-gradient-to-br from-cyan-700 to-slate-900 rounded-3xl p-8 text-white shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-5">
                <Globe className="w-6 h-6 text-amber-400" />
              </div>
              <h2 className="text-xl font-bold text-white mb-3">{isAr ? "رؤيتنا" : "Our Vision"}</h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                {isAr 
                  ? "أن نكون شريك التكنولوجيا الأكثر موثوقية في منطقة الشرق الأوسط وشمال إفريقيا - والمعروف بالتميز الهندسي والجودة التي لا تقبل المساومة والالتزام الحقيقي بنمو عملائنا على المدى الطويل ومسيرة التحول الرقمي لديهم."
                  : "To be the most trusted technology partner in the MENA region — recognized for engineering excellence, uncompromising quality, and a genuine commitment to our clients' long-term growth and digital transformation journey."}
              </p>
            </div>
          </div>
        </section>

        {/* ─── Core Values ─── */}
        <section className="bg-slate-100/50 py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-amber-500 font-bold text-sm uppercase tracking-widest block mb-2">{isAr ? "قيمنا الأساسية" : "Our DNA"}</span>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{isAr ? "القيم التي توجه مسيرتنا" : "Core Values That Drive Us"}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((v, i) => {
                const Icon = v.icon;
                return (
                  <div key={i} className="bg-white border border-slate-100 rounded-3xl p-6 hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 shadow-sm">
                    <div className={`w-12 h-12 rounded-2xl ${v.bg} flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${v.color}`} strokeWidth={1.75} />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm mb-2">
                      {isAr
                        ? (v.title === "Trust & Integrity" ? "الثقة والنزاهة" : v.title === "Speed & Efficiency" ? "السرعة والكفاءة" : v.title === "Client Partnership" ? "شراكة العملاء" : "التميز المعتمد")
                        : v.title
                      }
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {isAr
                        ? (v.title === "Trust & Integrity" ? "نعمل بشفافية كاملة. كل حل نقدمه مدعوم بمنتجات أصلية واستشارات صادقة." : v.title === "Speed & Efficiency" ? "إنجاز سريع للمشاريع دون المساس بالجودة - لأن عملك لا يتحمل التوقف." : v.title === "Client Partnership" ? "لا نبيع منتجات فقط، بل نبني شراكات طويلة الأجل تنمو مع عملك." : "يحمل مهندسونا شهادات معتمدة من سيسكو ومايكروسوفت وموردي التكنولوجيا الآخرين.")
                        : v.desc
                      }
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Timeline ─── */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-12">
            <span className="text-amber-500 font-bold text-sm uppercase tracking-widest block mb-2">{isAr ? "رحلتنا" : "Our Journey"}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{isAr ? "عقد من النمو المستمر" : "A Decade of Growth"}</h2>
          </div>
          <div className="relative">
            {/* Vertical line */}
            <div className={`absolute ${isAr ? "right-6 md:right-1/2" : "left-6 md:left-1/2"} top-0 bottom-0 w-0.5 bg-slate-200 -translate-x-1/2`} />
            <div className="space-y-10">
              {timeline.map((item, i) => (
                <div key={i} className={`relative flex items-start gap-6 md:gap-0 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                  {/* Dot */}
                  <div className={`absolute ${isAr ? "right-6 md:right-1/2" : "left-6 md:left-1/2"} w-4 h-4 rounded-full bg-amber-500 border-4 border-white shadow -translate-x-1/2 mt-1.5 z-10`} />
                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-[46%] ${i % 2 === 0 ? "md:mr-auto md:pr-10" : "md:ml-auto md:pl-10"}`}>
                    <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
                      <span className="text-xs font-black text-amber-500 uppercase tracking-widest">{item.year}</span>
                      <h3 className="font-bold text-slate-900 text-sm mt-1 mb-2">
                        {isAr
                          ? (item.title === "Founded in Cairo" ? "تأسست في القاهرة" : item.title === "First Enterprise Contract" ? "أول عقد مؤسسة كبير" : item.title === "Regional Expansion" ? "التوسع الإقليمي" : item.title === "Software Division Launch" ? "إطلاق قسم البرمجيات" : "تجاوز 500 مشروع")
                          : item.title
                        }
                      </h3>
                      <p className="text-xs text-slate-500 leading-relaxed">
                        {isAr
                          ? (item.title === "Founded in Cairo" ? "تأسست إنفراتيك بهدف تحديث البنية التحتية لتكنولوجيا المعلومات في مصر." : item.title === "First Enterprise Contract" ? "حصلنا على أول عقد كبير لتثبيت وتجهيز شبكة لأحد البنوك الكبرى بمصر." : item.title === "Regional Expansion" ? "توسيع الخدمات إلى دول الشرق الأوسط والشركاء مع الموردين العالميين للأجهزة." : item.title === "Software Division Launch" ? "إطلاق قسم تطوير البرمجيات لتوفير تطبيقات الويب والهواتف والديسكتوب." : "الاحتفال بتقديم أكثر من 500 مشروع بنية تحتية ناجح في مختلف القطاعات.")
                          : item.desc
                        }
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Partners ─── */}
        <section className="bg-white border-t border-slate-100 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-10">
              <span className="text-amber-500 font-bold text-sm uppercase tracking-widest block mb-2">{isAr ? "شركاء النجاح" : "Trusted Partners"}</span>
              <h2 className="text-2xl font-bold text-slate-900">{isAr ? "شركاء التكنولوجيا المعتمدين" : "Official Technology Partners"}</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center justify-items-center">
              {brands.map((b, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-100 hover:border-amber-400 px-6 py-5 rounded-xl shadow-xs transition-all duration-300 w-full h-20 flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100"
                >
                  <img
                    src={b.logo}
                    alt={b.name}
                    className="max-h-9 max-w-full object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="bg-gradient-to-r from-amber-500 to-orange-500 py-16">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
              {isAr ? "هل أنت جاهز لتطوير بنية تكنولوجيا المعلومات لديك؟" : "Ready to Transform Your IT Infrastructure?"}
            </h2>
            <p className="text-white/80 text-sm mb-8 leading-relaxed">
              {isAr ? "دعنا نناقش احتياجاتك ونصمم حلولاً مرنة تتناسب مع طموح شركتك ونموها المستقبلي." : "Let's discuss your needs and design a solution that scales with your business."}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact-us"
                className="bg-white text-amber-600 font-bold px-8 py-3 rounded-xl hover:shadow-lg transition-all text-sm"
              >
                {isAr ? "تواصل مع خبرائنا" : "Contact Our Experts"}
              </Link>
              <a
                href="tel:01278167506"
                className="border-2 border-white text-white font-bold px-8 py-3 rounded-xl hover:bg-white/10 transition-all text-sm flex items-center gap-2"
              >
                <Phone className="w-4 h-4" />
                {isAr ? "اتصل بنا الآن" : "Call Now"}
              </a>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
