"use client";

import { LayoutGrid, LucideIcon } from "lucide-react";

export interface Category {
  slug: string;
  name: string;
  // Path to a representative image in /public/images/categories/. Omit and use `icon` instead for a Lucide icon tile (used for "All Categories").
  image?: string;
  icon?: LucideIcon;
}

// Local categories list mapped from dummyjson API products.
// Images live in public/images/categories/ — file names must match exactly.
export const categories: Category[] = [
  { slug: "all", name: "All Categories", icon: LayoutGrid },
  { slug: "furniture", name: "Computers & Workstations", image: "/images/categories/Computer&Workstation_cat.avif" },
  { slug: "laptops", name: "Laptops", image: "/images/categories/Laptop.webp" },
  { slug: "home-decoration", name: "Printers & Scanners", image: "/images/categories/Printer.jpg" },
  { slug: "mobile-accessories", name: "Networking & Accessories", image: "/images/categories/NetWorking&Accessories.jpg" },
  { slug: "smartphones", name: "CCTV & Devices", image: "/images/categories/CCTV_cat.jpg" },
  { slug: "tablets", name: "Servers & Storage", image: "/images/categories/Server.jpg" },
];

interface CategoryGridProps {
  selectedCategory: string;
  onSelect: (slug: string) => void;
}

function CategoryGrid({ selectedCategory, onSelect }: CategoryGridProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">Shop By Category</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {categories.map((cat) => {
          const Icon = cat.icon;
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
                {Icon ? (
                  <Icon
                    className={`w-9 h-9 ${selectedCategory === cat.slug ? "text-amber-500" : "text-slate-500"}`}
                    strokeWidth={1.75}
                  />
                ) : (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain p-1.5"
                  />
                )}
              </div>
              <span className="text-xs font-semibold">{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryGrid;