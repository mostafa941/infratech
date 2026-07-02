import Image from 'next/image'

function TopNavBar() {
  return (
    // Hidden on mobile/tablet — this whole bar's content (address, email,
    // help/support, language) is duplicated inside the mobile drawer that
    // opens from the hamburger icon in BottomNavBar. Social icons are
    // dropped from the mobile drawer entirely, per the design brief.
    <nav
      dir="ltr"
      className="hidden lg:flex flex-wrap gap-3 justify-between items-center bg-slate-900 px-4 md:px-6 py-2"
    >
      <div className="flex flex-wrap items-center gap-4 md:gap-8">
        <div className="flex items-center gap-2">
          <Image src="/icons/location.svg" width={14} height={14} alt="Location" />
          <span className="text-white text-xs">Cairo, Egypt</span>
        </div>
        <div className="hidden sm:flex items-center gap-2">
          <Image src="/icons/time.svg" width={14} height={14} alt="Time" />
          <span className="text-white text-xs">Delivery & Support 24/7</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/icons/email.svg" width={14} height={14} alt="Email" />
          <a
            href="mailto:info@infratech-co.com"
            className="text-white text-xs hover:text-amber-400 transition-colors"
          >
            info@infratech-co.com
          </a>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <a href="" title="Facebook" className="hover:scale-110 transition-transform">
            <Image src="/icons/facebook.svg" width={18} height={18} alt="Facebook" />
          </a>
          <a href="" title="Instagram" className="hover:scale-110 transition-transform">
            <Image src="/icons/instagram.svg" width={14} height={14} alt="Instagram" />
          </a>
          <a href="" title="Linkedin" className="hover:scale-110 transition-transform">
            <Image src="/icons/linkedin.svg" width={14} height={14} alt="Linkedin" />
          </a>
          <a href="" title="Tiktok" className="hover:scale-110 transition-transform">
            <Image src="/icons/tiktok.svg" width={14} height={14} alt="Tiktok" />
          </a>
        </div>

        <div className="flex items-center gap-2 border-l border-slate-700 pl-4">
          <Image src="/icons/support.svg" width={14} height={14} alt="Support" />
          <a href="tel:01278167506" className="text-white text-xs hover:text-amber-400 transition-colors">
            Support
          </a>
        </div>

        <div
          title="Change Language"
          className="inline-flex items-center justify-center gap-1 bg-amber-400 px-2.5 py-1 rounded-xl h-fit hover:bg-amber-500 transition-colors cursor-pointer"
        >
          <Image src="/icons/lang.svg" width={14} height={14} alt="Language" />
          <a href="" className="text-black font-bold text-xs leading-none select-none">
            ar
          </a>
        </div>
      </div>
    </nav>
  )
}

export default TopNavBar