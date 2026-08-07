"use client";

import Link from "next/link";
import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  product: any;
  onAddToCart: (e: React.MouseEvent, product: any) => void;
}

function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const id = product._id || product.id;
  const title = product.name || product.title;
  const thumbnail = (product.images && product.images[0]) || product.thumbnail || "";

  return (
    <Link
      href={`/products/${id}`}
      className="group/card bg-white border border-slate-100 shadow-xs rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:border-amber-500 hover:shadow-md hover:translate-y-0.5 relative cursor-pointer"
    >
      <div>
        {/* Thumbnail wrapper */}
        <div className="relative w-full h-44 bg-slate-50/50 rounded-xl overflow-hidden mb-4 flex items-center justify-center border border-slate-50">
          <img
            src={thumbnail}
            alt={title}
            className="max-h-36 max-w-full object-contain transition-transform duration-500 group-hover/card:scale-105"
          />

          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-xs opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
            <button
              onClick={(e) => onAddToCart(e, product)}
              className="bg-white text-slate-800 p-2.5 rounded-full shadow-md cursor-pointer hover:bg-amber-500 hover:text-white transition-all duration-200 transform scale-90 group-hover/card:scale-100"
              title="Add to Cart"
            >
              <ShoppingCart className="w-4 h-4" />
            </button>
          </div>
        </div>

        <h3 className="font-bold text-sm text-slate-900 mb-1 line-clamp-1 group-hover/card:text-amber-500 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-400 line-clamp-2 min-h-[32px] leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center gap-0.5 mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < Math.floor(product.rating || 4)
                  ? "text-amber-400 fill-amber-400"
                  : "text-slate-200"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
        {/* تم التعديل هنا */}
        <p className="text-amber-500 font-extrabold text-base">E£{product.price} </p>
        <span className="text-[10px] bg-amber-50 text-amber-600 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
          {product.category}
        </span>
      </div>
    </Link>
  );
}

export default ProductCard;