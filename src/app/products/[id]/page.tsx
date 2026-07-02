"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { ShoppingCart, Heart, Share2, Star } from 'lucide-react';
import Link from 'next/link';
import { useAppContext } from '@/context/AppContext';
import TopNavBar from '@/components/TopNavBar';
import BottomNavBar from '@/components/BottomNavBar';
import Footer from '@/components/Footer';

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useAppContext();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchProductData = async () => {
      try {
        setLoading(true);
        // 1. Fetch current product details
        const res = await axios.get(`https://dummyjson.com/products/${id}`);
        setProduct(res.data);
        setActiveImage(res.data.thumbnail);

        // 2. Fetch related products from the same category
        const relatedRes = await axios.get(`https://dummyjson.com/products/category/${res.data.category}`);
        // Filter out the current product so it doesn't show in related
        const filtered = relatedRes.data.products.filter((p: any) => p.id !== res.data.id);
        setRelatedProducts(filtered.slice(0, 4)); // Show top 4 related products
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
    const success = addToCart(product);
    if (!success) {
      // Force Login
      router.push(`/login?redirect=/products/${product.id}`);
    } else {
      alert(`Added "${product.title}" to cart!`);
    }
  };

  if (loading) return <div className="text-center p-20 font-medium text-slate-500">Loading Product Details...</div>;
  if (!product) return <div className="text-center p-20 font-medium text-rose-500">Product not found.</div>;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopNavBar />
      <BottomNavBar />

      <div className="w-full max-w-7xl mx-auto py-12 px-4 flex-grow">
        {/* Product Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-24">
          
          {/* Left Side: Images Gallery */}
          <div className="flex flex-col gap-4">
            <div className="w-full h-[400px] bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center p-6 overflow-hidden">
              <img src={activeImage} alt={product.title} className="max-h-full max-w-full object-contain" />
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
              {product.title}
            </h1>
            
            {/* Rating */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating || 4) ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                  }`}
                />
              ))}
              <span className="text-xs text-slate-400 font-semibold ml-2">({product.rating})</span>
            </div>

            {/* Price */}
            <div className="text-3xl font-black text-amber-500 mb-6">
              ${product.price}
            </div>

            {/* Availability Status */}
            <div className="flex items-center gap-2 mb-4 text-sm">
              <span className="text-slate-500">Availability:</span>
              <span className={`font-bold ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
              </span>
            </div>

            <div className="flex items-center gap-2 mb-6 text-sm">
              <span className="text-slate-500">Brand:</span>
              <span className="font-bold text-slate-800">{product.brand || "IT Hardware"}</span>
            </div>

            <p className="text-slate-500 text-sm leading-relaxed border-t border-slate-100 pt-6 mb-6">
              {product.description}
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
              <button className="bg-slate-50 hover:bg-slate-100 text-slate-700 p-3.5 rounded-xl border border-slate-200 cursor-pointer transition-colors">
                <Heart className="w-5 h-5" />
              </button>
              <button className="bg-slate-50 hover:bg-slate-100 text-slate-700 p-3.5 rounded-xl border border-slate-200 cursor-pointer transition-colors">
                <Share2 className="w-5 h-5" />
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
              {relatedProducts.map((p: any) => (
                <div 
                  key={p.id}
                  className="group/rel border border-slate-100 rounded-2xl p-4 flex flex-col justify-between hover:border-amber-500 hover:shadow-md transition-all duration-300 bg-white"
                >
                  <div>
                    <div className="w-full h-36 bg-slate-50/50 rounded-xl flex items-center justify-center p-2 mb-4 overflow-hidden">
                      <img src={p.thumbnail} alt={p.title} className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover/rel:scale-105" />
                    </div>
                    <Link href={`/products/${p.id}`}>
                      <h3 className="font-bold text-xs md:text-sm text-slate-800 line-clamp-1 mb-2 hover:text-amber-500 cursor-pointer transition-colors">
                        {p.title}
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
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}