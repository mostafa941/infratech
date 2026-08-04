"use client";

import ProductCard from "./Productcard";
import { useAppContext } from "@/context/AppContext";
import { ProductGridSkeleton } from "./Skeletons";

interface ProductsGridProps {
  products: any[];
  loading: boolean;
  onAddToCart: (e: React.MouseEvent, product: any) => void;
  onClearFilters: () => void;
}

function ProductsGrid({ products, loading, onAddToCart, onClearFilters }: ProductsGridProps) {
  const { t } = useAppContext();

  return (
    <main className="flex-grow">
      <div className="flex justify-between items-center mb-6">
        <p className="text-xs text-slate-400 font-semibold">
          {t("showing")} <span className="text-slate-800 font-bold">{products.length}</span> {t("products")}
        </p>
      </div>

      {loading ? (
        <ProductGridSkeleton count={6} />
      ) : products.length === 0 ? (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <span className="text-3xl block mb-2">🔍</span>
          <p className="text-sm font-bold text-slate-500">{t("noProductsMatch")}</p>
          <button
            onClick={onClearFilters}
            className="mt-4 text-xs font-bold text-amber-500 underline hover:text-amber-600 cursor-pointer"
          >
            {t("clearFilters")}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product, idx) => (
            <ProductCard key={product._id || product.id || idx} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </main>
  );
}

export default ProductsGrid;