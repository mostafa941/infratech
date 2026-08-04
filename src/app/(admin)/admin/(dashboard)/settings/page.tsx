"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { UploadCloud, Settings, Image as ImageIcon } from "lucide-react";
import { toast } from "react-toastify";
import { FormSkeleton } from "@/components/Skeletons";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({
    name: "Admin Manager",
    avatar: "",
    lang: "ar",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await axios.get("/api/admin/settings");
        if (res.data.settings) {
          setSettings(res.data.settings);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load admin settings config");
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("folder", "admin");

      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSettings((prev: any) => ({ ...prev, avatar: res.data.url }));
      toast.success("Profile avatar uploaded successfully to Cloudinary!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image avatar");
    } finally {
      setUploading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put("/api/admin/settings", settings);
      toast.success("Admin settings updated and synced successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <FormSkeleton fields={4} />;
  }

  return (
    <div className="space-y-8 max-w-2xl" dir="ltr">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin System Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage profile information, avatar picture and preferred dashboard language settings.</p>
      </div>

      <form onSubmit={handleFormSubmit} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-4 border-b border-slate-50">
          <Settings className="w-5 h-5 text-amber-500" />
          <h3 className="text-base font-extrabold text-slate-900">Personal Information</h3>
        </div>

        {/* Profile Avatar Selection Box */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="w-20 h-20 bg-white border border-slate-200 rounded-full overflow-hidden flex items-center justify-center relative shrink-0">
            {settings.avatar ? (
              <img src={settings.avatar} alt="Admin avatar" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon className="w-8 h-8 text-slate-300" />
            )}
          </div>
          <div className="space-y-2">
            <label className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer shadow-sm shadow-amber-500/10">
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="sr-only"
                disabled={uploading}
              />
              <UploadCloud className="w-4 h-4" />
              <span>{uploading ? "Uploading file..." : "Change Avatar Picture"}</span>
            </label>
            <p className="text-[10px] text-slate-400">Supported formats: JPG, PNG. Image sizes up to 2MB.</p>
          </div>
        </div>

        {/* Admin Name */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Display Name</label>
          <input
            type="text"
            required
            value={settings.name}
            onChange={(e) => setSettings((prev: any) => ({ ...prev, name: e.target.value }))}
            placeholder="e.g. Mostafa Ali"
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50 focus:bg-white"
          />
        </div>

        {/* Language Selection */}
        <div>
          <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Default Dashboard Language</label>
          <select
            value={settings.lang}
            onChange={(e) => setSettings((prev: any) => ({ ...prev, lang: e.target.value }))}
            className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50 cursor-pointer"
          >
            <option value="en">English (US)</option>
            <option value="ar">العربية (Arabic)</option>
          </select>
        </div>

        {/* Save button */}
        <button
          type="submit"
          disabled={saving}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
        >
          {saving ? "Saving settings changes..." : "Save Settings Changes"}
        </button>
      </form>
    </div>
  );
}
