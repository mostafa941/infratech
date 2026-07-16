"use client";

import { SlidersHorizontal } from "lucide-react";
import { Category } from "./CategoryGrid";
import { useAppContext } from "@/context/AppContext";

interface FiltersSidebarProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (slug: string) => void;
  priceRange: number;
  setPriceRange: (value: number) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

function FiltersSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
}: FiltersSidebarProps) {
  const { lang } = useAppContext();

  return (
    <aside className="w-full lg:w-64 flex-shrink-0 bg-white border border-slate-100 rounded-2xl p-6 shadow-xs h-fit sticky top-20">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
        <SlidersHorizontal className="w-4 h-4 text-slate-700" />
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wider">Filters</h3>
      </div>

      {/* Categories Selector */}
      <div className="mb-6">
        <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Categories</h4>
        <div className="space-y-2">
          {categories.map((cat) => (
            <label key={cat.slug} className="flex items-center gap-2 text-xs font-medium text-slate-600 cursor-pointer hover:text-amber-500 transition-colors">
              <input
                type="radio"
                name="sidebar-cat"
                checked={selectedCategory === cat.slug}
                onChange={() => setSelectedCategory(cat.slug)}
                className="accent-amber-500"
              />
              <span>{lang === "ar" ? cat.nameAr : cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price range Selector */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-3">
          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">Max Price</h4>
          <span className="text-xs font-bold text-amber-500">${priceRange}</span>
        </div>
        <input
          type="range"
          min="10"
          max="150000"
          step="1000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer h-1 bg-slate-100 rounded-lg appearance-none"
        />
        <div className="flex justify-between text-[10px] text-slate-400 mt-2">
          <span>$10</span>
          <span>$150,000</span>
        </div>
      </div>

      {/* Sort selection */}
      <div>
        <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-3">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="w-full border border-slate-200 rounded-lg p-2 text-xs outline-none focus:border-amber-500 bg-white"
        >
          <option value="default">Featured</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>
    </aside>
  );
}

export default FiltersSidebar;