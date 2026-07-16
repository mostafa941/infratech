"use client";

import React, { useEffect, useState } from "react";
import { LayoutGrid } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";

export interface Category {
  slug: string;
  name: string;
  nameAr: string;
  image?: string;
}

interface CategoryGridProps {
  selectedCategory: string;
  onSelect: (slug: string) => void;
}

function CategoryGrid({ selectedCategory, onSelect }: CategoryGridProps) {
  const { t, lang } = useAppContext();
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data.categories || []);
      } catch (err) {
        console.error("Categories fetch failed:", err);
      }
    };
    fetchCats();
  }, []);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">{t("shopByCategory")}</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {/* All Categories Button */}
        <button
          onClick={() => onSelect("all")}
          className={`p-6 rounded-2xl border text-center transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col items-center justify-center gap-3 ${
            selectedCategory === "all"
              ? "border-amber-500 bg-amber-50/55 text-amber-600 font-bold"
              : "border-slate-200 bg-white text-slate-700 hover:border-amber-400"
          }`}
        >
          <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden">
            <LayoutGrid
              className={`w-9 h-9 ${selectedCategory === "all" ? "text-amber-500" : "text-slate-500"}`}
              strokeWidth={1.75}
            />
          </div>
          <span className="text-xs font-semibold">{t("allCategories")}</span>
        </button>

        {/* Dynamic Categories */}
        {categories.map((cat) => {
          const name = lang === "ar" ? cat.nameAr : cat.name;
          return (
            <button
              key={cat.slug}
              onClick={() => onSelect(cat.slug)}
              className={`p-6 rounded-2xl border text-center transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col items-center justify-center gap-3 ${
                selectedCategory === cat.slug
                  ? "border-amber-500 bg-amber-50/55 text-amber-600 font-bold"
                  : "border-slate-200 bg-white text-slate-700 hover:border-amber-400"
              }`}
            >
              <div className="w-16 h-16 rounded-xl bg-slate-50 flex items-center justify-center overflow-hidden">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={name}
                    className="w-full h-full object-contain p-1.5"
                  />
                ) : (
                  <LayoutGrid className="w-9 h-9 text-slate-400" />
                )}
              </div>
              <span className="text-xs font-semibold">{name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryGrid;