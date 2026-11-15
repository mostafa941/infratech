"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import BottomNavBar from "@/components/BottomNavBar";
import HomeHeroSection from "@/components/HomeHeroSection";
import FeaturesBar from "@/components/FeaturesBar";

import OurServices from "@/components/OurServices";
import AllProduct from "@/components/AllProduct";
import WhyChooseUs from "@/components/WhyChooseUs";
import Footer from "@/components/Footer";
import ExploreStoreBanner from "@/components/ExploreStoreBanner";

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

      <OurServices />
      <ExploreStoreBanner />

      <AllProduct selectedCategory={selectedCategory} />
      <WhyChooseUs />
     
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
