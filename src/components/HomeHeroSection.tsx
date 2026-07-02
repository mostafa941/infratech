import Image from "next/image";
import React from "react";

function HomeHeroSection() {
  return (
    <div style={{ background: "#E9E9E9" }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pl-4 md:pl-18">
      <div className="w-full mt-5">
        <h3 className="font-bold text-slate-800 text-xs md:text-sm tracking-wider">
          CONNECTING <span className="text-amber-600">TODAY</span>,{" "}
          <span className="text-cyan-700">BUILDING TOMORROW</span>
        </h3>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-slate-900 mt-4 leading-tight">
          Empowering Businesses Through Smart{" "}
          <span className="text-cyan-700">IT Infrastructure</span> & {" "}
          <span className="text-amber-600">Digital Solutions</span>{" "}
        </h1>
        <p className="text-sm md:text-base text-gray-500 mt-4 leading-relaxed max-w-xl">
          We provide end-to-end IT solutions including network infrastructure,
          software licensing, hardware supply, CCTV systems, and expert technical support.
        </p>
        <div className="flex flex-wrap items-center gap-4 mt-6">
          <a
            href="https://wa.me/201278167506?text=Hi%20InfraTech,%20I'm%20interested%20in%20a%20consultation."
            target="_blank"
            className="flex items-center justify-center bg-amber-500 py-3 px-6 rounded-xl text-white gap-2.5 font-bold hover:bg-amber-600 transition-all text-xs md:text-sm shadow-md shadow-amber-500/10 w-[230px] sm:w-auto"
          >
            Get a Free Consultation <Image src="/icons/arrow_right.svg" width={18} height={10} alt="arrow"/>
          </a>
          <a
            href="#services"
            className="flex items-center justify-center bg-cyan-700 py-3 px-6 rounded-xl text-white gap-2.5 font-bold hover:bg-cyan-800 transition-all text-xs md:text-sm shadow-md shadow-cyan-700/10 w-[230px] sm:w-auto"
          >
            Explore Services <Image src="/icons/arrow_right.svg" width={18} height={10} alt="arrow"/>
          </a>
        </div>
      </div>

     <div className=" flex justify-center max-[1026px]:hidden">
  <Image
    src="/images/hero_2.png"
    width={580}
    height={400}
    alt="Hero Image"
    className="object-contain"
    priority
  />
</div>
    </div>
  );
}

export default HomeHeroSection;
