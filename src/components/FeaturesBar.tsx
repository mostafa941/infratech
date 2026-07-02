import Image from 'next/image'
import React from 'react'

function FeaturesBar() {
  return (
    <div className="py-6 md:py-10 px-4 md:px-12 lg:px-20" style={{background:"#E9E9E9"}}>
      <div className="bg-white shadow-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 px-6 md:px-10 rounded-2xl">
        <div className="flex items-center gap-4 border-b sm:border-b-0 sm:border-r border-slate-100 pb-4 sm:pb-0 pr-4">
          <Image src="/images/feat_1.png" width={44} height={20} alt="IT Experts" className="w-11 h-auto" />
          <div>
            <h3 className="font-bold text-xs md:text-sm text-slate-800">Certified IT Experts</h3>
            <span className="text-[10px] text-slate-400 font-medium">Professional & Experienced</span>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:border-b-0 lg:border-r border-slate-100 pb-4 sm:pb-0 pr-4">
          <Image src="/images/feat_2.png" width={44} height={20} alt="Response Time" className="w-11 h-auto" />
          <div>
            <h3 className="font-bold text-xs md:text-sm text-slate-800">Fast Response Time</h3>
            <span className="text-[10px] text-slate-400 font-medium">Quick & Reliable support</span>
          </div>
        </div>
        <div className="flex items-center gap-4 border-b sm:border-b-0 sm:border-r border-slate-100 pb-4 sm:pb-0 pr-4">
          <Image src="/images/feat_3.png" width={44} height={20} alt="Solutions" className="w-11 h-auto" />
          <div>
            <h3 className="font-bold text-xs md:text-sm text-slate-800">Enterprise Solutions</h3>
            <span className="text-[10px] text-slate-400 font-medium">Scalable For Your Business</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Image src="/images/feat_4.png" width={44} height={20} alt="Support Available" className="w-11 h-auto" />
          <div>
            <h3 className="font-bold text-xs md:text-sm text-slate-800">24/7 Technical Support</h3>
            <span className="text-[10px] text-slate-400 font-medium">We are Always Available</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeaturesBar