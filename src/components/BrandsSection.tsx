"use client";

import { useRouter } from "next/navigation";

const brands = [
  { name: "HP", logo: "/images/Brands/hp.png" },
  { name: "Dell", logo: "/images/Brands/dell.png" },
  { name: "Lenovo", logo: "/images/Brands/lenovo.png" },
  { name: "Cisco", logo: "/images/Brands/cisco.png" },
  { name: "Microsoft", logo: "/images/Brands/microsoft.png" },
  { name: "Sophos", logo: "/images/Brands/sophos.png" },
];

function BrandsSection() {
  const router = useRouter();

  const handleBrandClick = (brandName: string) => {
    router.push(`/storePage?brand=${encodeURIComponent(brandName)}`);
  };

  return (
    <div className="mt-20 pt-12 border-t border-slate-100">
      <div className="text-center mb-8">
        <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block mb-1">
          Partners
        </span>
        <h2 className="text-slate-900 text-xl md:text-2xl font-bold tracking-tight">Our Trusted Brands</h2>
        <p className="text-slate-400 text-xs mt-2">Click a brand to browse products</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center justify-items-center">
        {brands.map((b, idx) => (
          <button
            key={idx}
            onClick={() => handleBrandClick(b.name)}
            title={`Browse ${b.name} products`}
            className="bg-white border border-slate-100 hover:border-amber-400 px-6 py-5 rounded-xl shadow-xs transition-all duration-300 w-full h-20 flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100 cursor-pointer hover:scale-105 hover:shadow-md"
          >
            <img
              src={b.logo}
              alt={b.name}
              className="max-h-9 max-w-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default BrandsSection;