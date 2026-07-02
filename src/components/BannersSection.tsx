import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

// مصفوفة البيانات عشان الكود يكون نظيف ومنظم
const bannersData = [
  { id: 1, src: '/images/banner/banner-1.jpg', alt: 'Banner 1', href: '#' },
  { id: 2, src: '/images/banner/banner-2.jpg', alt: 'Banner 2', href: '#' },
  { id: 3, src: '/images/banner/banner-8.jpg', alt: 'Banner 3', href: '#' },
];

function BannersSection() {
  return (
    <section className="w-full my-12 px-4 max-w-7xl mx-auto">
      {/* الحاوية الأساسية: بديل الـ Flex القديم، واير واخدة Grid عشان تكون Responsive تلقائياً */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {bannersData.map((banner) => (
          <div 
            key={banner.id} 
            className="group relative w-full overflow-hidden rounded-xl bg-transparent"
          >
            {/* طبقة تأثير الزجاج المربوطة بكلاس الـ CSS */}
            <div className="glass-effect absolute inset-0 pointer-events-none z-20" />
            
            {/* اللينك مغطي الكارد بالكامل زي كودك القديم */}
            <Link href={banner.href} className="absolute inset-0 z-30" aria-label={banner.alt} />
            
            {/* الصورة ومحطوطة جوه div بأبعاد مرنة h-auto */}
            <div className="relative w-full h-auto aspect-[4/3] md:aspect-auto">
              <Image 
                src={banner.src} 
                alt={banner.alt}
                width={400} // العرض التقريبي لكل بنر
                height={250} // الارتفاع التقريبي
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" 
              />
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}

export default BannersSection;