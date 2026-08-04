"use client";

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { ProductSkeleton } from './Skeletons';

interface AllProductProps {
  selectedCategory?: string;
}

function AllProduct({ selectedCategory = "all" }: AllProductProps) {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, addToCart, addToFavorites, isFavorite, cart, t, lang } = useAppContext();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = "/api/products?limit=100";
        if (selectedCategory && selectedCategory !== "all") {
          url = `/api/products?category=${selectedCategory}`;
        }
        const response = await axios.get(url);
        setProducts(response.data.products || []);
      } catch (error) {
        console.error(error);
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
      const multiplier = lang === "ar" ? -1 : 1;
      
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
      router.push(`/login?redirect=/`);
      return;
    }
    addToCart(product);
  };

  const handleAddToFavorites = (e: React.MouseEvent, product: any) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      router.push(`/login?redirect=/`);
      return;
    }
    addToFavorites(product);
  };

  const isInCart = (productId: string) => {
    return cart.some((item) => String(item.id) === String(productId));
  };

  if (loading) return (
    <div className="flex gap-5 overflow-x-auto p-4 max-w-7xl mx-auto my-16">
      {Array.from({ length: 4 }).map((_, i) => (
        <ProductSkeleton key={i} />
      ))}
    </div>
  );

  return (
    <section id="store-products" className="w-full my-16 px-4 max-w-7xl mx-auto relative group">
      
      <div className="mb-8">
        <span className="text-amber-500 font-bold text-sm uppercase tracking-widest block mb-1">
          {t("ourShop")}
        </span>
        <div className="flex justify-between items-end">
          <h2 className="text-slate-900 text-2xl md:text-3xl font-bold tracking-tight">
            {t("featuredProducts")}
          </h2>
          <Link href="/storePage">
            <button className='p-3 font-semibold border-2 border-cyan-700 text-cyan-800 rounded-xl cursor-pointer hover:bg-cyan-700 hover:text-white transition-all duration-200'>
              {t("viewAllProducts")}
            </button>
          </Link>
        </div>
      </div>

      {products.length === 0 && !loading ? (
        <div className="text-center py-16 text-slate-400 font-medium">
          {t("noProducts")}
        </div>
      ) : (
        <div className="relative w-full flex items-center">
          
          <button
            onClick={() => handleScroll("left")}
            className="absolute -left-2 md:-left-5 z-40 bg-white border border-slate-200 text-slate-700 p-2.5 rounded-full shadow-md cursor-pointer hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            ref={scrollRef}
            className="w-full flex gap-5 overflow-x-auto scrollbar-none snap-x snap-mandatory pb-4 px-1"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {products.map((product: any) => (
              <Link 
                href={`/products/${product._id || product.id}`} 
                key={product._id || product.id}
                className="group/card w-[250px] lg:w-[calc(25%-15px)] flex-shrink-0 bg-white border border-slate-100 shadow-xs rounded-2xl p-4 flex flex-col justify-between snap-start transition-all duration-300 hover:border-amber-500 hover:shadow-md hover:translate-y-1 relative overflow-hidden cursor-pointer"
              >
                <div>
                  <div className="relative w-full h-44 bg-slate-50/50 rounded-xl overflow-hidden mb-4 flex items-center justify-center border border-slate-50">
                    <img
                      src={(product.images && product.images[0]) || product.thumbnail}
                      alt={product.name || product.title}
                      className="max-h-36 max-w-full object-contain transition-transform duration-500 group-hover/card:scale-105"
                    />

                    <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-xs opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
                      {/* Cart Button */}
                      <button 
                        onClick={(e) => handleAddToCart(e, product)} 
                        className={`p-2.5 rounded-full shadow-md cursor-pointer transition-all duration-200 transform scale-90 group-hover/card:scale-100 ${
                          isInCart(product._id || product.id)
                            ? "bg-amber-500 text-white"
                            : "bg-white text-slate-800 hover:bg-amber-500 hover:text-white"
                        }`}
                        title={user ? (isInCart(product._id || product.id) ? "Already in Cart" : "Add to Cart") : "Login to add to cart"}
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                      
                      {/* Favorites Button */}
                      <button 
                        onClick={(e) => handleAddToFavorites(e, product)} 
                        className={`p-2.5 rounded-full shadow-md cursor-pointer transition-all duration-200 transform scale-90 group-hover/card:scale-100 ${
                          isFavorite(product._id || product.id)
                            ? "bg-rose-500 text-white"
                            : "bg-white text-slate-800 hover:bg-rose-500 hover:text-white"
                        }`}
                        title={user ? (isFavorite(product._id || product.id) ? "Remove from Favorites" : "Add to Favorites") : "Login to add to favorites"}
                      >
                        <Heart className={`w-4 h-4 ${isFavorite(product._id || product.id) ? "fill-current" : ""}`} />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-sm text-slate-900 mb-1 line-clamp-1 group-hover/card:text-amber-500 transition-colors">
                    {lang === "ar" && product.nameAr ? product.nameAr : (product.name || product.title)}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 min-h-[32px] leading-relaxed">
                    {lang === "ar" && product.descriptionAr ? product.descriptionAr : product.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <p className="text-amber-500 font-extrabold text-base">
                      ${product.price}
                    </p>
                    {product.discount > 0 && (
                      <span className="text-xs text-slate-400 line-through">
                        ${Math.round(product.price / (1 - product.discount / 100))}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] bg-amber-50 text-amber-600 font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                    {product.category || "Hardware"}
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <button
            onClick={() => handleScroll("right")}
            className="absolute -right-2 md:-right-5 z-40 bg-white border border-slate-200 text-slate-700 p-2.5 rounded-full shadow-md cursor-pointer hover:bg-amber-500 hover:text-white hover:border-amber-500 transition-all duration-300 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>
      )}
    </section>
  );
}

export default AllProduct;