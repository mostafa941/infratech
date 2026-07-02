"use client";

const brands = [
  { name: "HP", logo: "/images/Brands/hp.png" },
  { name: "Dell", logo: "/images/Brands/dell.png" },
  { name: "Lenovo", logo: "/images/Brands/lenovo.png" },
  { name: "Cisco", logo: "/images/Brands/cisco.png" },
  { name: "Microsoft", logo: "/images/Brands/microsoft.png" },
  { name: "Sophos", logo: "/images/Brands/sophos.png" },
];

function BrandsSection() {
  return (
    <div className="mt-20 pt-12 border-t border-slate-100">
      <div className="text-center mb-8">
        <span className="text-amber-500 font-bold text-xs uppercase tracking-widest block mb-1">
          Partners
        </span>
        <h2 className="text-slate-900 text-xl md:text-2xl font-bold tracking-tight">Our Trusted Brands</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-6 gap-6 items-center justify-items-center">
        {brands.map((b, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-100 hover:border-amber-400 px-6 py-5 rounded-xl shadow-xs transition-colors duration-300 w-full h-20 flex items-center justify-center grayscale hover:grayscale-0 opacity-70 hover:opacity-100"
          >
            <img
              src={b.logo}
              alt={b.name}
              className="max-h-9 max-w-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandsSection;