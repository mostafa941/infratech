"use client";

import { Search, ShoppingCart, User, LogOut, Package, Menu, X, Globe } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { useAppContext } from '@/context/AppContext'
import { useState, useRef, useEffect } from 'react'

const NAV_LINKS = [
  { href: '/', labelKey: 'home' },
  { href: '/about-us', labelKey: 'aboutUs' },
  { href: '/#services', labelKey: 'services' },
  { href: '/storePage', labelKey: 'store' },
  { href: '/contact-us', labelKey: 'contactUs' },
]

function BottomNavBar() {
  const { user, logout, cart, searchQuery, setSearchQuery, lang, setLang, t } = useAppContext();
  const [dropdownOpen, setDropdownOpen] = useState(false); // desktop profile dropdown
  const [drawerOpen, setDrawerOpen] = useState(false);      // mobile hamburger drawer/modal
  const [searchOpen, setSearchOpen] = useState(false);      // mobile inline search row
  const [activeSection, setActiveSection] = useState("");   // active section for nav links
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const isAr = lang === "ar";

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      if (searchParams.get("scroll") === "services") {
        setActiveSection("services");
      } else {
        setActiveSection("");
      }
    }
  }, [pathname]);

  // Close desktop dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  // Autofocus the mobile search input when it drops down
  useEffect(() => {
    if (searchOpen) searchInputRef.current?.focus();
  }, [searchOpen]);

  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (window.location.pathname !== "/storePage") {
      router.push("/storePage");
    }
  };

  const toggleLanguage = () => {
    setLang(lang === "en" ? "ar" : "en");
  };

  const closeDrawer = () => setDrawerOpen(false);

  const handleServicesClick = (e: React.MouseEvent) => {
    closeDrawer();
    if (window.location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("services");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveSection("services");
      }
    } else {
      router.push("/?scroll=services");
    }
  };

  const checkIsActive = (link: { href: string; labelKey: string }) => {
    if (link.labelKey === 'services') {
      return pathname === '/' && activeSection === 'services';
    } else if (link.labelKey === 'home') {
      return pathname === '/' && activeSection !== 'services';
    }
    return pathname === link.href;
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    closeDrawer();
    router.push("/");
  };

  return (
    <>
      <nav className="bg-white sticky top-0 z-40 shadow-xs border-b border-slate-100">
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          {/* Left: logo */}
          <div className="flex items-center gap-3">
            <Link href={"/"} className="block">
              <Image src="/images/logoInfra.jpg" alt="InfraTech Logo" width={130} height={36} priority className="h-auto w-auto object-contain" />
            </Link>
          </div>

          {/* Center: nav links (desktop only) */}
          <ul className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link) => {
              const isActive = checkIsActive(link);
              return (
                <li key={link.href} className="relative py-1">
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      if (link.labelKey === 'services') {
                        handleServicesClick(e);
                      } else {
                        setActiveSection("");
                      }
                    }}
                    className={`block text-sm font-bold transition-colors ${
                      isActive 
                        ? "text-[#3b1702] border-b-2 border-orange-500 pb-1" 
                        : "text-blue-950 hover:text-amber-500"
                    }`}
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop search bar */}
          <div className="hidden lg:block w-60">
            <div className="h-[38px] flex items-center border border-slate-200 rounded-xl pr-3 pl-2 bg-slate-50 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/10 transition-all">
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={handleSearchChange}
                className="border-0 outline-none w-full h-full text-xs text-slate-800 bg-transparent"
              />
              <Search className="text-gray-400 w-4 h-4" />
            </div>
          </div>

          {/* Right: search toggle (mobile), cart, profile/login, language switch, hamburger */}
          <div className="flex items-center gap-1 sm:gap-2 lg:gap-4">
            
            {/* Desktop & Mobile Language Switch Button */}
            <button
              onClick={toggleLanguage}
              className="inline-flex items-center justify-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer mr-1"
              title={isAr ? "Switch to English" : "تغيير للغة العربية"}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{isAr ? "EN" : "العربية"}</span>
            </button>

            {/* Mobile search toggle */}
            <button
              onClick={() => setSearchOpen((v) => !v)}
              aria-label="Toggle search"
              className={`lg:hidden p-2 rounded-full transition-colors ${searchOpen ? "text-amber-500 bg-amber-50" : "text-slate-700 hover:text-amber-500"}`}
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart (all breakpoints) */}
            {user && (
              <Link href="/cart" className="relative p-2 text-slate-700 hover:text-amber-500 transition-colors">
                <ShoppingCart className="w-5 h-5" />
                {totalCartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[9px] font-black rounded-full h-4 w-4 flex items-center justify-center border border-white">
                    {totalCartCount}
                  </span>
                )}
              </Link>
            )}

            {/* Desktop profile dropdown / login */}
            <div className="hidden lg:flex items-center">
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2 focus:outline-none cursor-pointer p-1 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    {user.name.includes("Google") ? (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-amber-500">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center border-2 border-amber-500 text-amber-600">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </button>

                  {dropdownOpen && (
                    <div className={`absolute ${isAr ? "left-0" : "right-0"} mt-2.5 w-52 bg-white border border-slate-100 rounded-xl shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200`}>
                      <div className="px-4 py-2 border-b border-slate-50 mb-1">
                        <p className="text-xs text-slate-400">{t("signedInAs")}</p>
                        <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                      </div>
                      <Link
                        href="/my-orders"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-amber-500 transition-colors"
                      >
                        <Package className="w-4 h-4" />
                        {t("myOrders")}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className={`w-full ${isAr ? "text-right" : "text-left"} flex items-center gap-2 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer`}
                      >
                        <LogOut className="w-4 h-4" />
                        {t("logoutBtn")}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href="/login"
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-2 px-4 rounded-xl transition-all text-xs flex items-center gap-2 shadow-sm border border-amber-500/20"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>{t("loginBtn")}</span>
                </Link>
              )}
            </div>

            {/* Hamburger (mobile only) — placed at the far right */}
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-1 -mr-1 text-slate-700 hover:text-amber-500 transition-colors focus:outline-none"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile inline search row */}
        {searchOpen && (
          <div className="lg:hidden px-4 pb-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="h-[38px] flex items-center border border-slate-200 rounded-xl pr-3 pl-2 bg-slate-50 focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/10 transition-all">
              <input
                ref={searchInputRef}
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={handleSearchChange}
                className="border-0 outline-none w-full h-full text-xs text-slate-800 bg-transparent"
              />
              <Search className="text-gray-400 w-4 h-4" />
            </div>
          </div>
        )}
      </nav>

      {/* Mobile drawer / modal — opens from the hamburger icon */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/50 animate-in fade-in duration-200"
            onClick={closeDrawer}
          />

          {/* Panel — slides in from the right */}
          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 overflow-y-auto">
            {/* Panel header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 sticky top-0 bg-white z-10">
              <Image src="/images/logoInfra.jpg" alt="InfraTech Logo" width={110} height={30} className="h-auto w-auto object-contain" />
              <button
                onClick={closeDrawer}
                aria-label="Close menu"
                className="p-1 text-slate-700 hover:text-amber-500 transition-colors focus:outline-none"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* User section: avatar + dropdown data, or login CTA */}
            <div className="px-4 py-4 border-b border-slate-100">
              {user ? (
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    {user.name.includes("Google") ? (
                      <div className="relative w-11 h-11 rounded-full overflow-hidden border-2 border-amber-500 shrink-0">
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-amber-100 flex items-center justify-center border-2 border-amber-500 text-amber-600 shrink-0">
                        <User className="w-5 h-5" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-xs text-slate-400">{t("signedInAs")}</p>
                      <p className="text-sm font-bold text-slate-900 truncate">{user.name}</p>
                    </div>
                  </div>
                  <Link
                    href="/my-orders"
                    onClick={closeDrawer}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-slate-700 hover:bg-slate-50 hover:text-amber-500 transition-colors"
                  >
                    <Package className="w-4 h-4" />
                    {t("myOrders")}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    {t("logoutBtn")}
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  onClick={closeDrawer}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold py-2.5 px-6 flex items-center justify-center gap-2 rounded-xl transition-all text-xs w-full"
                >
                  <User className="w-4 h-4" />
                  <span>{t("loginBtn")}</span>
                </Link>
              )}
            </div>

            {/* Nav links */}
            <ul className="px-2 py-3 border-b border-slate-100">
            {NAV_LINKS.map((link) => {
              const isActive = checkIsActive(link);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      if (link.labelKey === 'services') {
                        handleServicesClick(e);
                      } else {
                        setActiveSection("");
                        closeDrawer();
                      }
                    }}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-bold transition-colors ${
                      isActive 
                        ? "text-[#3b1702] bg-orange-50/55 border-l-4 border-orange-500" 
                        : "text-blue-950 hover:bg-slate-50 hover:text-amber-500"
                    }`}
                  >
                    {t(link.labelKey)}
                  </Link>
                </li>
              );
            })}
            </ul>

            {/* Top-bar info */}
            <div className="px-4 py-4 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Image src="/icons/location.svg" width={14} height={14} alt="Location" />
                <span className="text-xs text-slate-600">{isAr ? "القاهرة، مصر" : "Cairo, Egypt"}</span>
              </div>
              <a
                href="mailto:info@infratech-co.com"
                className="flex items-center gap-2 text-xs text-slate-600 hover:text-amber-500 transition-colors"
              >
                <Image src="/icons/email.svg" width={14} height={14} alt="Email" />
                info@infratech-co.com
              </a>
              <a
                href="tel:01278167506"
                className="flex items-center gap-2 text-xs text-slate-600 hover:text-amber-500 transition-colors"
              >
                <Image src="/icons/support.svg" width={14} height={14} alt="Support" />
                {t("support")}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default BottomNavBar;