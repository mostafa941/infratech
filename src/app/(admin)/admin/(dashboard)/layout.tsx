"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [lang, setLang] = useState<"en" | "ar">("ar");
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Sync language selection
    const savedLang = localStorage.getItem("inf_admin_lang") as "en" | "ar";
    if (savedLang) setLang(savedLang);

    const fetchAdminSettings = async () => {
      try {
        const res = await axios.get("/api/admin/settings");
        setSettings(res.data.settings);
        if (res.data.settings.lang) {
          setLang(res.data.settings.lang);
        }
      } catch (err) {
        console.error("Failed to load admin settings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAdminSettings();
  }, []);

  const handleLangChange = async (newLang: "en" | "ar") => {
    setLang(newLang);
    localStorage.setItem("inf_admin_lang", newLang);
    try {
      await axios.put("/api/admin/settings", { lang: newLang });
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.post("/api/admin/logout");
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <div className="w-64 bg-slate-900 shrink-0 p-6 flex flex-col gap-6 animate-pulse">
          <div className="w-32 h-8 bg-slate-800 rounded-xl mb-6"></div>
          <div className="flex-1 space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="w-full h-10 bg-slate-800 rounded-xl"></div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-8 max-w-7xl mx-auto w-full">
          <div className="h-8 w-64 bg-slate-200 rounded-xl animate-pulse mb-8"></div>
          <div className="w-full h-[500px] bg-slate-200 rounded-3xl animate-pulse"></div>
        </div>
      </div>
    );
  }

  const isAr = lang === "ar";

  return (
    <div
      className="flex min-h-screen bg-slate-50 text-slate-800"
      dir={isAr ? "rtl" : "ltr"}
    >
      <AdminSidebar
        lang={lang}
        setLang={handleLangChange}
        adminName={settings?.name || "Admin Manager"}
        adminAvatar={settings?.avatar || ""}
        onLogout={handleLogout}
      />
      <main className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full print:p-0 print:max-w-none">
        {children}
      </main>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}
