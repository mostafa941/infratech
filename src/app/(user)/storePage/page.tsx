"use client";

import React from 'react'
import BottomNavBar from '@/components/BottomNavBar'
import StoreHeroSection from '@/components/StoreHeroSection'
import StorePageContent from '@/components/StorePageContent'
import SubscribeSection from '@/components/SubscribeSection'
import Footer from '@/components/Footer'

function page() {
  return (
    <div className="flex flex-col min-h-screen">
      <BottomNavBar />
      <StoreHeroSection />
      <StorePageContent />
      <SubscribeSection />
      <Footer />
    </div>
  )
}

export default page