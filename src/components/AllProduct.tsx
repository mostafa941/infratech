"use client";

import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart } from 'lucide-react';
import Link from 'next/link';

function AllProduct() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleProduct = async () => {
      try {
        const response = await axios.get("https://dummyjson.com/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    handleProduct();
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75; 
      
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <div className="text-center p-10 font-medium text-slate-500">Loading Products...</div>;

  return (
    <section className="w-full my-16 px-4 max-w-7xl mx-auto relative group">
      
      <div className="mb-8">
        <span className="text-amber-500 font-bold text-sm uppercase tracking-widest block mb-1">
          Our Shop
        </span>
        <div className="flex justify-between items-end">
          <h2 className="text-slate-900 text-2xl md:text-3xl font-bold tracking-tight">
            Featured Products
          </h2>
          {/* تم إضافة الـ Link هنا ليقوم بتوجيه المستخدم لصفحة المتجر بالكامل */}
          <Link href="/storePage">
            <button className='p-3 font-semibold border-2 border-cyan-700 text-cyan-800 rounded-xl cursor-pointer hover:bg-cyan-700 hover:text-white transition-all duration-200'>
              View All Products
            </button>
          </Link>
        </div>
      </div>

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
              href={`/products/${product.id}`} 
              key={product.id}
              className="group/card w-[250px] lg:w-[calc(25%-15px)] flex-shrink-0 bg-white border border-slate-100 shadow-xs rounded-2xl p-4 flex flex-col justify-between snap-start transition-all duration-300 hover:border-amber-500 hover:shadow-md hover:translate-y-1 relative overflow-hidden cursor-pointer"
            >
              <div>
                <div className="relative w-full h-44 bg-slate-50/50 rounded-xl overflow-hidden mb-4 flex items-center justify-center border border-slate-50">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="max-h-36 max-w-full object-contain transition-transform duration-500 group-hover/card:scale-105"
                  />

                  <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-xs opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-10">
                    <button 
                      onClick={(e) => e.preventDefault()} 
                      className="bg-white text-slate-800 p-2.5 rounded-full shadow-md cursor-pointer hover:bg-amber-500 hover:text-white transition-all duration-200 transform scale-90 group-hover/card:scale-100 duration-300"
                      title="Add to Cart"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                    
                    <button 
                      onClick={(e) => e.preventDefault()} 
                      className="bg-white text-slate-800 p-2.5 rounded-full shadow-md cursor-pointer hover:bg-amber-500 hover:text-white transition-all duration-200 transform scale-90 group-hover/card:scale-100 duration-300"
                      title="Add to Favorites"
                    >
                      <Heart className="w-4 h-4 hover:text-white" />
                    </button>
                  </div>
                </div>

                <h3 className="font-bold text-sm text-slate-900 mb-1 line-clamp-1 group-hover/card:text-amber-500 transition-colors">
                  {product.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-2 min-h-[32px] leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-50 flex items-center justify-between">
                <p className="text-amber-500 font-extrabold text-base">
                  ${product.price}
                </p>
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
    </section>
  );
}

export default AllProduct;