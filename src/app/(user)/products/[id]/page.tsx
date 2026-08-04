"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import { useAppContext } from '@/context/AppContext';
import BottomNavBar from '@/components/BottomNavBar';
import Footer from '@/components/Footer';
import { FormSkeleton } from '@/components/Skeletons';

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart, t, lang, user } = useAppContext();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProductData = async () => {
      try {
        setLoading(true);
        // 1. Fetch current product details from local API
        const res = await axios.get(`/api/products/${id}`);
        const prod = res.data.product;
        setProduct(prod);
        setActiveImage((prod.images && prod.images[0]) || prod.thumbnail || "");

        // 2. Fetch related products from local API
        if (prod.category) {
          const relatedRes = await axios.get(`/api/products?category=${prod.category}`);
          const filtered = (relatedRes.data.products || []).filter((p: any) => p._id !== prod._id);
          setRelatedProducts(filtered.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;
    if (!user) {
      router.push(`/login?redirect=/products/${product._id || product.id}`);
      return;
    }
    addToCart(product);
  };

  if (loading) return (
    <div className="flex flex-col min-h-screen bg-white">
      <BottomNavBar />
      <div className="w-full max-w-7xl mx-auto py-12 px-4 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-24">
          <div className="w-full h-[400px] bg-slate-200 rounded-3xl animate-pulse"></div>
          <div className="pt-8">
            <FormSkeleton fields={4} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
  if (!product) return <div className="text-center p-20 font-medium text-rose-500">Product not found.</div>;

  const title = lang === "ar" && product.nameAr ? product.nameAr : (product.name || product.title);
  const desc = lang === "ar" && product.descriptionAr ? product.descriptionAr : product.description;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <BottomNavBar />

      <div className="w-full max-w-7xl mx-auto py-12 px-4 flex-grow">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-24">
          
          {/* Left Side: Images Gallery */}
          <div className="flex flex-col gap-4">
            <div className="w-full h-[400px] bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center p-6 overflow-hidden">
              {activeImage ? (
                <img src={activeImage} alt={title} className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="text-slate-300">No Image Available</span>
              )}
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {product.images.map((img: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 bg-slate-50 border rounded-xl flex items-center justify-center p-2 flex-shrink-0 cursor-pointer transition-all ${
                      activeImage === img ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <img src={img} alt="" className="max-h-full max-w-full object-contain" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Side: Product Info */}
          <div className="flex flex-col">
            <span className="text-amber-600 bg-amber-50 font-bold text-xs px-3 py-1 rounded-md uppercase tracking-wider w-fit mb-3">
              {product.category}
            </span>
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-3 tracking-tight leading-tight">
              {title}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating || 5) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                  }`}
                />
              ))}
              <span className="text-xs text-slate-400 font-semibold ml-2">({product.rating || 5.0})</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-black text-amber-500">
                ${product.price}
              </span>
              {product.discount > 0 && (
                <span className="text-lg text-slate-400 line-through">
                  ${Math.round(product.price / (1 - product.discount / 100))}
                </span>
              )}
            </div>

            {/* Availability Status */}
            <div className="flex items-center gap-2 mb-4 text-sm">
              <span className="text-slate-500">Availability:</span>
              <span className={`font-bold ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-4 text-sm">
              <span className="text-slate-500">{t("brandLabel") || "Brand:"}</span>
              <button
                onClick={() => router.push(`/storePage?brand=${encodeURIComponent(product.brand || "IT Hardware")}`)}
                className="font-bold text-amber-500 hover:text-amber-600 hover:underline cursor-pointer bg-transparent border-0 p-0 text-sm"
              >
                {product.brand || (lang === "ar" ? "إنفراتيك هاردوير" : "IT Hardware")}
              </button>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-6 mb-6">
              {desc}
            </p>

            <div className="text-sm font-bold text-amber-600 mb-6">
              Hurry Up! Only {product.stock || 10} Products left in Stock.
            </div>

            {/* Amazon-like trust badges */}
            <div className="grid grid-cols-3 gap-3 border-y border-slate-100 py-4 mb-6 text-center text-[10px] md:text-xs text-slate-600">
              <div className="flex flex-col items-center gap-1 border-r border-slate-100">
                <span className="text-xl">⚡</span>
                <span className="font-bold text-slate-800">Fast Delivery</span>
                <span className="text-[9px] text-slate-400">Within 24-48 Hours</span>
              </div>
              <div className="flex flex-col items-center gap-1 border-r border-slate-100">
                <span className="text-xl">🛡️</span>
                <span className="font-bold text-slate-800">Official Warranty</span>
                <span className="text-[9px] text-slate-400">100% Genuine Products</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl">🤝</span>
                <span className="font-bold text-slate-800">Expert Support</span>
                <span className="text-[9px] text-slate-400">24/7 Support Hotline</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm shadow-amber-500/20 transition-all cursor-pointer"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to cart
              </button>
            </div>

          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-slate-100 pt-16 mb-12">
            <div className="mb-8 border-b border-slate-100 pb-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-900 tracking-tight">
                Related Products
              </h2>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((p: any) => {
                const relTitle = lang === "ar" && p.nameAr ? p.nameAr : (p.name || p.title);
                return (
                  <div 
                    key={p._id || p.id}
                    className="group/rel border border-slate-100 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500 hover:shadow-md transition-all duration-300 bg-white"
                  >
                    <div>
                      <div className="w-full h-36 bg-slate-50/50 rounded-xl flex items-center justify-center p-2 mb-4 overflow-hidden">
                        <img src={(p.images && p.images[0]) || p.thumbnail} alt={relTitle} className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover/rel:scale-105" />
                      </div>
                      <Link href={`/products/${p._id || p.id}`}>
                        <h3 className="font-bold text-xs md:text-sm text-slate-800 line-clamp-1 mb-2 hover:text-amber-500 cursor-pointer transition-colors">
                          {relTitle}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-0.5 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <div className="text-amber-500 font-extrabold text-sm md:text-base mt-2">
                      ${p.price}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}