import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  PlusCircle,
  FolderPlus,
  MessageSquare,
  TrendingUp,
  Settings,
  LogOut,
  Globe,
} from "lucide-react";

interface AdminSidebarProps {
  lang: "en" | "ar";
  setLang: (lang: "en" | "ar") => void;
  adminName: string;
  adminAvatar: string;
  onLogout: () => void;
}

export default function AdminSidebar({
  lang,
  setLang,
  adminName,
  adminAvatar,
  onLogout,
}: AdminSidebarProps) {
  const pathname = usePathname();
  const isAr = lang === "ar";

  const menuItems = [
    {
      href: "/admin",
      labelEn: "Dashboard Overview",
      labelAr: "نظرة عامة",
      icon: LayoutDashboard,
    },
    {
      href: "/admin/orders",
      labelEn: "Manage Orders",
      labelAr: "إدارة الطلبات",
      icon: ShoppingBag,
    },
    {
      href: "/admin/products",
      labelEn: "All Products",
      labelAr: "كل المنتجات",
      icon: TrendingUp,
    },
    {
      href: "/admin/add-product",
      labelEn: "Add New Product",
      labelAr: "إضافة منتج",
      icon: PlusCircle,
    },
    {
      href: "/admin/categories",
      labelEn: "Categories",
      labelAr: "الكاتيجوريس",
      icon: FolderPlus,
    },
    {
      href: "/admin/messages",
      labelEn: "Customer Messages",
      labelAr: "الرسائل الواردة",
      icon: MessageSquare,
    },
    {
      href: "/admin/analytics",
      labelEn: "Sales Analytics",
      labelAr: "تقارير المبيعات",
      icon: TrendingUp,
    },
    {
      href: "/admin/settings",
      labelEn: "Settings",
      labelAr: "الإعدادات",
      icon: Settings,
    },
  ];

  return (
    <aside
      className="w-64 bg-slate-900 text-slate-100 flex flex-col justify-between border-r border-slate-800 shrink-0 h-screen sticky top-0"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div>
        {/* Header Logo */}
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="text-amber-400 text-xl font-black tracking-wider">InfraTech</span>
            <span className="text-slate-400 text-xs font-bold px-1.5 py-0.5 bg-slate-800 rounded">
              ADMIN
            </span>
          </Link>
        </div>

        {/* Admin Profile Minimal Card */}
        <div className="p-4 border-b border-slate-800/60 bg-slate-950/40 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
            {adminAvatar ? (
              <img src={adminAvatar} alt={adminName} className="w-full h-full object-cover" />
            ) : (
              <span className="text-amber-500 font-bold text-sm">A</span>
            )}
          </div>
          <div className="min-w-0">
            <p className="text-xs text-slate-500 font-semibold">{isAr ? "مرحباً بالأدمن" : "Welcome Admin"}</p>
            <p className="text-sm font-bold text-slate-200 truncate">{adminName}</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                  active
                    ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10"
                    : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-200"
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{isAr ? item.labelAr : item.labelEn}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer actions */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        {/* Language switcher */}
        <button
          onClick={() => setLang(lang === "en" ? "ar" : "en")}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-amber-500" />
            <span>{isAr ? "اللغة الحالية: العربية" : "Current: English"}</span>
          </div>
          <span className="text-amber-500 font-extrabold">{isAr ? "EN" : "عربي"}</span>
        </button>

        {/* Logout */}
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-950/20 hover:text-rose-300 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>{isAr ? "تسجيل الخروج" : "Log Out"}</span>
        </button>
      </div>
    </aside>
  );
}
