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
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center gap-3">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-slate-400 text-sm font-bold">Loading dashboard panels...</span>
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
      <main className="flex-1 overflow-y-auto p-8 max-w-7xl mx-auto w-full">
        {children}
      </main>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
}
