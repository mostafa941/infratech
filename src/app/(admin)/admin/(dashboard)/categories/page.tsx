"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { UploadCloud, FolderPlus, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";
import { FormSkeleton } from "@/components/Skeletons";

export default function AdminCategories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states
  const [name, setName] = useState("");
  const [nameAr, setNameAr] = useState("");
  const [slug, setSlug] = useState("");
  const [image, setImage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/categories");
      setCategories(res.data.categories || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load categories database");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("folder", "categories");

      const res = await axios.post("/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setImage(res.data.url);
      toast.success("Category icon/image uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to upload image");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !nameAr || !slug) {
      toast.warning("Please fill in English name, Arabic name, and slug.");
      return;
    }

    setSubmitting(true);
    try {
      await axios.post("/api/categories", {
        name,
        nameAr,
        slug: slug.toLowerCase().replace(/\s+/g, "-"),
        image,
      });

      toast.success("New Category added successfully!");
      setName("");
      setNameAr("");
      setSlug("");
      setImage("");
      fetchCategories();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Failed to create category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete("/api/categories", { data: { id } });
      toast.success("Category deleted successfully!");
      fetchCategories();
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="space-y-8" dir="ltr">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Categories Management</h1>
        <p className="text-slate-500 text-sm mt-1">Add, review and manage categories displayed in navigation grids.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Form (1/3 columns) */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs h-fit space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-slate-50">
            <FolderPlus className="w-5 h-5 text-amber-500" />
            <h3 className="text-base font-extrabold text-slate-900">Add New Category</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* English Title */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Category English Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setSlug(e.target.value.toLowerCase().replace(/\s+/g, "-"));
                }}
                placeholder="e.g. Laptops"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Arabic Title */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Category Arabic Name</label>
              <input
                type="text"
                required
                value={nameAr}
                onChange={(e) => setNameAr(e.target.value)}
                placeholder="أجهزة لابتوب"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50 focus:bg-white text-right"
              />
            </div>

            {/* Slug URL */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Category URL Slug</label>
              <input
                type="text"
                required
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="laptops"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50 focus:bg-white"
              />
            </div>

            {/* Category image upload box */}
            <div>
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Category Image / Icon</label>
              
              {image ? (
                <div className="relative w-full h-32 bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden flex items-center justify-center p-2 group">
                  <img src={image} alt="" className="max-h-full max-w-full object-contain" />
                  <button
                    type="button"
                    onClick={() => setImage("")}
                    className="absolute top-1.5 right-1.5 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <label className="w-full h-32 border-2 border-dashed border-slate-200 hover:border-amber-400 rounded-2xl flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-slate-50 hover:bg-amber-50/10 transition-all">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="sr-only"
                    disabled={uploading}
                  />
                  <UploadCloud className="w-7 h-7 text-slate-400" />
                  <span className="text-xs font-bold text-slate-500">
                    {uploading ? "Uploading file..." : "Upload Category Icon"}
                  </span>
                </label>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md cursor-pointer disabled:opacity-50"
            >
              {submitting ? "Creating category..." : "Create Category"}
            </button>
          </form>
        </div>

        {/* Categories Directory View (2/3 columns) */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-xs h-fit space-y-6">
          <h3 className="text-base font-extrabold text-slate-900 pb-4 border-b border-slate-50">Active Categories List</h3>

          {loading ? (
            <FormSkeleton fields={3} />
          ) : categories.length === 0 ? (
            <div className="text-center py-12 text-slate-400 font-medium text-sm">
              No categories exist in database directory. Create one on the left panel.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <div key={cat._id} className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-1 shrink-0">
                      {cat.image ? (
                        <img src={cat.image} alt={cat.name} className="max-h-full max-w-full object-contain" />
                      ) : (
                        <span className="text-slate-300">N/A</span>
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{cat.name}</h4>
                      <p className="text-xs text-slate-400">{cat.nameAr}</p>
                      <span className="text-[10px] text-slate-400 font-mono block">slug: {cat.slug}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-500 rounded-xl transition-colors cursor-pointer shrink-0"
                    title="Delete category"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
