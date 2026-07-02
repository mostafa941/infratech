"use client";

import React, { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import TopNavBar from "@/components/TopNavBar";
import BottomNavBar from "@/components/BottomNavBar";
import HomeHeroSection from "@/components/HomeHeroSection";
import FeaturesBar from "@/components/FeaturesBar";
import BannersSection from "@/components/BannersSection";
import OurServices from "@/components/OurServices";
import AllProduct from "@/components/AllProduct";
import SubscribeSection from "@/components/SubscribeSection";
import Footer from "@/components/Footer";

function HomeContent() {
  const searchParams = useSearchParams();

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
      <TopNavBar />
      <BottomNavBar />
      <HomeHeroSection />
      <FeaturesBar />
      <BannersSection />
      <OurServices />
      <AllProduct />
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
