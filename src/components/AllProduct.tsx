"use client";

import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShoppingCart, ChevronLeft, ChevronRight, ArrowRight, ArrowLeft } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import { toast } from "react-toastify";

interface AllProductProps {
  selectedCategory?: string;
}

function AllProduct({ selectedCategory = "all" }: AllProductProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, addToCart, lang } = useAppContext();
  const isAr = lang === "ar";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = "/api/products?limit=100";
        if (selectedCategory && selectedCategory !== "all") {
          url = `/api/products?category=${selectedCategory}`;
        }
        const response = await axios.get(url);
        const data = response.data?.products || [];
        const sorted = [...data].sort((a: any, b: any) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return 0;
        });
        setProducts(sorted);
      } catch (error) {
        console.error("Failed to load products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      const multiplier = isAr ? -1 : 1;

      scrollRef.current.scrollTo({
        left: scrollLeft + (direction === "left" ? -scrollAmount : scrollAmount) * multiplier,
        behavior: "smooth",
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.warning(
        isAr
          ? "يرجى تسجيل الدخول أولاً لإضافة المنتج إلى السلة"
          : "Please log in first to add products to your cart"
      );
      router.push(`/login?redirect=${encodeURIComponent(typeof window !== "undefined" ? window.location.pathname : "/")}`);
      return;
    }

    addToCart(product);
  };

  if (loading) {
    return (
      <section className="w-full mt-12 mb-[10px] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" dir={isAr ? "rtl" : "ltr"}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="h-8 w-48 bg-slate-100 rounded-lg animate-pulse mb-2"></div>
            <div className="w-12 h-1 bg-slate-200 rounded-full animate-pulse"></div>
          </div>
          <div className="h-5 w-28 bg-slate-100 rounded-lg animate-pulse"></div>
        </div>
        <div className="flex gap-5 overflow-hidden py-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="w-[220px] sm:w-[240px] md:w-[260px] lg:w-[calc(20%-16px)] flex-shrink-0 bg-white border border-slate-100 rounded-3xl p-5 flex flex-col items-center justify-between animate-pulse"
            >
              <div className="w-32 h-32 bg-slate-100 rounded-2xl mb-4"></div>
              <div className="w-3/4 h-4 bg-slate-100 rounded mb-2"></div>
              <div className="w-1/2 h-4 bg-slate-100 rounded mb-6"></div>
              <div className="w-32 h-8 bg-slate-100 rounded-full"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="store-products" className="w-full mt-12 mb-[10px] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative group" dir={isAr ? "rtl" : "ltr"}>
      
      {/* Section Header Matching Design */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight flex items-center gap-2">
            {isAr ? (
              <>
                <span className="text-[#003847]">المنتجات</span>
                <span className="text-[#ff6a00]">المميزة</span>
              </>
            ) : (
              <>
                <span className="text-[#003847]">Featured</span>
                <span className="text-[#ff6a00]">Products</span>
              </>
            )}
          </h2>
          {/* Orange Accent Bar Under First Word */}
          <div className="w-12 md:w-14 h-1 bg-[#ff6a00] rounded-full mt-2"></div>
        </div>

        {/* View All Products Link */}
        <Link
          href="/storePage"
          className="text-[#ff6a00] hover:text-[#e05d00] font-semibold text-xs sm:text-sm md:text-base flex items-center gap-1.5 transition-colors group/link pb-1"
        >
          <span>{isAr ? "عرض جميع المنتجات" : "View All Products"}</span>
          {isAr ? (
            <ArrowLeft className="w-4 h-4 transition-transform group-hover/link:-translate-x-1" />
          ) : (
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          )}
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-16 text-slate-400 font-medium">
          {isAr ? "لا توجد منتجات متاحة حالياً" : "No products available at the moment"}
        </div>
      ) : (
        <div className="relative w-full flex items-center">
          
          {/* Left Arrow Button */}
          <button
            onClick={() => handleScroll("left")}
            className="absolute -left-2 md:-left-5 z-30 bg-white border border-slate-200 text-slate-700 p-2.5 rounded-full shadow-md cursor-pointer hover:bg-[#ff6a00] hover:text-white hover:border-[#ff6a00] transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Scroll Left"
          >
            {isAr ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>

          {/* Cards Row Container */}
          <div
            ref={scrollRef}
            className="w-full flex gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory py-4 px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product: any) => {
              const prodId = product._id || product.id;
              const title = isAr && product.nameAr ? product.nameAr : (product.name || product.title);
              const imageSrc =
                (product.images && product.images[0]) ||
                product.thumbnail ||
                "";

              return (
                <div
                  key={prodId}
                  className="w-[220px] sm:w-[240px] md:w-[260px] lg:w-[calc(20%-16px)] flex-shrink-0 bg-white border border-slate-100 rounded-3xl p-5 flex flex-col items-center justify-between text-center snap-start transition-all duration-300 hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1.5 relative group/card"
                >
                  {/* Top Portion Wrapped in Link to Product Details */}
                  <Link
                    href={`/products/${prodId}`}
                    className="w-full flex flex-col items-center flex-1 cursor-pointer"
                    title={title}
                  >
                    {/* Product Image */}
                    <div className="relative w-36 h-32 sm:w-40 sm:h-36 mb-3 flex items-center justify-center p-2">
                      <img
                        src={imageSrc}
                        alt={title}
                        className="max-h-full max-w-full object-contain p-1 transition-transform duration-300 group-hover/card:scale-105"
                      />
                    </div>

                    {/* Product Title (2 lines centered) */}
                    <h3 className="text-slate-900 font-extrabold text-sm sm:text-base tracking-tight leading-snug min-h-[44px] flex items-center justify-center mb-4 group-hover/card:text-[#ff6a00] transition-colors whitespace-pre-line line-clamp-2 px-1">
                      {title}
                    </h3>
                  </Link>

                  {/* Add to Cart Orange Pill Button */}
                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className="w-full max-w-[155px] bg-[#ff6a00] hover:bg-[#e65c00] active:scale-95 text-white font-bold text-xs sm:text-sm py-2 px-4 rounded-full shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ShoppingCart className="w-4 h-4 text-white" />
                    <span>{isAr ? "أضف للسلة" : "Add to Cart"}</span>
                  </button>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => handleScroll("right")}
            className="absolute -right-2 md:-right-5 z-30 bg-white border border-slate-200 text-slate-700 p-2.5 rounded-full shadow-md cursor-pointer hover:bg-[#ff6a00] hover:text-white hover:border-[#ff6a00] transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Scroll Right"
          >
            {isAr ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
          </button>

        </div>
      )}
    </section>
  );
}

export default AllProduct;
