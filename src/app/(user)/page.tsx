"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BottomNavBar from "@/components/BottomNavBar";
import HomeHeroSection from "@/components/HomeHeroSection";
import FeaturesBar from "@/components/FeaturesBar";
import BannersSection from "@/components/BannersSection";
import OurServices from "@/components/OurServices";
import AllProduct from "@/components/AllProduct";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";
import StoreHeroSection from "@/components/StoreHeroSection";
import CategoryGrid from "@/components/CategoryGrid";

function HomeContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    const scroll = searchParams.get("scroll");
    if (scroll === "services") {
      setTimeout(() => {
        const el = document.getElementById("services");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col min-h-screen">
      <BottomNavBar />
      <HomeHeroSection />
      <FeaturesBar />
      <BannersSection />
      <OurServices />
      <StoreHeroSection/>
      
      {/* Category picker — sits between the store hero and the product grid */}
      <div className="w-full max-w-7xl mx-auto px-4 mt-10">
        <CategoryGrid
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </div>

      <AllProduct selectedCategory={selectedCategory} />
      <SubscribeSection />
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="text-center p-20 text-slate-400 font-semibold">Loading InfraTech Core Modules...</div>}>
      <HomeContent />
    </Suspense>
  );
}
