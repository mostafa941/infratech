"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface CartItem {
  id: string; // Changed to string for MongoDB compatibility
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  quantity: number;
}

export interface FavoriteItem {
  id: string;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  shippingDetails: {
    name: string;
    phone: string;
    address: string;
  };
  paymentMethod: string;
  status: string;
}

export interface User {
  id?: string;
  name: string;
  email: string;
  avatar: string;
}

// Translations type
export type Language = "en" | "ar";

interface AppContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (item: any) => boolean;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  favorites: FavoriteItem[];
  addToFavorites: (item: any) => boolean;
  removeFromFavorites: (itemId: string) => void;
  isFavorite: (itemId: string) => boolean;
  orders: Order[];
  addOrder: (order: Omit<Order, "id" | "date" | "status">) => Promise<Order | null>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Nav Bar
    home: "Home",
    aboutUs: "About Us",
    services: "Services",
    store: "Store",
    contactUs: "Contact Us",
    searchPlaceholder: "Search products...",
    loginBtn: "Log In",
    logoutBtn: "Sign Out",
    myOrders: "My Orders",
    signedInAs: "Signed in as",
    support: "Support",
    langCode: "ar",

    // Hero Section
    heroBadge: "Discover the latest hardware offers",
    heroTitle: "IT Equipments & Software Store",
    heroDesc: "Premium hardware, networking equipments, surveillance systems and software licences for businesses.",
    shopNow: "Shop Now",

    // Services
    ourServices: "Our Services",
    servSub: "Comprehensive IT Solutions For Your Business",
    learnMore: "Learn More",
    mostPopular: "🔥 Most Popular",

    // Services Titles & Features
    serv1_title: "Software Development",
    serv1_f1: "Web Applications",
    serv1_f2: "Mobile Apps (iOS & Android)",
    serv1_f3: "Desktop Applications",
    serv1_f4: "Custom Business Software",

    serv2_title: "Network Infrastructure",
    serv2_f1: "LAN / WAN Design",
    serv2_f2: "Structured Cabling",
    serv2_f3: "Switches & Routers",
    serv2_f4: "Wireless Networks",

    serv3_title: "Cyber Security",
    serv3_f1: "Firewall Solutions",
    serv3_f2: "Endpoint Protection",
    serv3_f3: "Security Assessment",
    serv3_f4: "Monitoring",

    serv4_title: "Software Licensing",
    serv4_f1: "Microsoft Licenses",
    serv4_f2: "Antivirus Solutions",
    serv4_f3: "Business Applications",
    serv4_f4: "Renewal Management",

    serv5_title: "IT Support & Maintenance",
    serv5_f1: "Remote Support",
    serv5_f2: "On-site Support",
    serv5_f3: "Preventive Maintenance",
    serv5_f4: "Help Desk",

    serv6_title: "Hardware Supply",
    serv6_f1: "PCs & Workstations",
    serv6_f2: "Laptops",
    serv6_f3: "Servers",
    serv6_f4: "Network Equipment",

    serv7_title: "CCTV & Surveillance",
    serv7_f1: "IP Cameras",
    serv7_f2: "NVR Systems",
    serv7_f3: "Installation",
    serv7_f4: "Monitoring Solutions",

    serv8_title: "Cloud Solutions",
    serv8_f1: "Cloud Migration",
    serv8_f2: "AWS & Azure Management",
    serv8_f3: "Cloud Backup",
    serv8_f4: "SaaS Solutions",

    // Category Selector
    shopByCategory: "Shop By Category",
    allCategories: "All Categories",
    cat1: "Computers & Workstations",
    cat2: "Laptops",
    cat3: "Printers & Scanners",
    cat4: "Networking & Accessories",
    cat5: "CCTV & Devices",
    cat6: "Servers & Storage",

    // Shop
    ourShop: "Our Shop",
    featuredProducts: "Featured Products",
    viewAllProducts: "View All Products",
    noProducts: "No products found in this category.",
    loadingProducts: "Loading Products...",

    // Footer
    footerDesc: "Connecting today, building tomorrow. Providing high-quality IT infrastructure & networking solutions.",
    quickLinks: "Quick Links",
    newsletter: "Newsletter",
    yourEmail: "Your email...",
    subscribe: "Subscribe",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    complains: "Complains",
    faqs: "FAQs",
    rightsReserved: "All rights reserved."
  },
  ar: {
    // Nav Bar
    home: "الرئيسية",
    aboutUs: "عن الشركة",
    services: "خدماتنا",
    store: "المتجر",
    contactUs: "اتصل بنا",
    searchPlaceholder: "ابحث عن المنتجات...",
    loginBtn: "تسجيل الدخول",
    logoutBtn: "تسجيل الخروج",
    myOrders: "طلباتي",
    signedInAs: "تم الدخول باسم",
    support: "الدعم الفني",
    langCode: "en",

    // Hero Section
    heroBadge: "اكتشف أحدث عروض الأجهزة",
    heroTitle: "متجر معدات تكنولوجيا المعلومات والبرمجيات",
    heroDesc: "أجهزة متميزة، معدات شبكات، أنظمة مراقبة وتراخيص برمجيات للشركات والمؤسسات.",
    shopNow: "تسوق الآن",

    // Services
    ourServices: "خدماتنا",
    servSub: "حلول تكنولوجيا معلومات شاملة لأعمالك",
    learnMore: "معرفة المزيد",
    mostPopular: "🔥 الأكثر طلباً",

    // Services Titles & Features
    serv1_title: "تطوير البرمجيات",
    serv1_f1: "تطبيقات الويب والمواقع",
    serv1_f2: "تطبيقات الموبايل (iOS و Android)",
    serv1_f3: "تطبيقات الديسكتوب",
    serv1_f4: "حلول برمجية مخصصة للشركات",

    serv2_title: "البنية التحتية للشبكات",
    serv2_f1: "تصميم شبكات LAN / WAN",
    serv2_f2: "الكابلات الهيكلية المنظمة",
    serv2_f3: "الموزعات والموجهات (Switches & Routers)",
    serv2_f4: "الشبكات اللاسلكية",

    serv3_title: "الأمن السيبراني",
    serv3_f1: "حلول جدار الحماية (Firewall)",
    serv3_f2: "حماية الأجهزة الطرفية",
    serv3_f3: "تقييم واختبار الأمن الرقمي",
    serv3_f4: "المراقبة والاستجابة للتهديدات",

    serv4_title: "تراخيص البرمجيات",
    serv4_f1: "تراخيص مايكروسوفت الرسمية",
    serv4_f2: "حلول مكافحة الفيروسات",
    serv4_f3: "تطبيقات الأعمال وإدارة الرخص",
    serv4_f4: "إدارة وتجديد التراخيص",

    serv5_title: "الدعم الفني والصيانة",
    serv5_f1: "الدعم الفني عن بعد",
    serv5_f2: "الدعم الفني والصيانة في الموقع",
    serv5_f3: "الصيانة الوقائية الدورية",
    serv5_f4: "مكتب المساعدة وحل المشكلات",

    serv6_title: "توريد الأجهزة والمعدات",
    serv6_f1: "أجهزة الكمبيوتر ومحطات العمل",
    serv6_f2: "أجهزة اللابتوب الشخصية والمكتبية",
    serv6_f3: "الخوادم (Servers)",
    serv6_f4: "معدات وملحقات الشبكات",

    serv7_title: "أنظمة المراقبة والكاميرات",
    serv7_f1: "كاميرات المراقبة الشبكية IP",
    serv7_f2: "أنظمة التسجيل الرقمي NVR",
    serv7_f3: "التركيب والتهيئة الاحترافية",
    serv7_f4: "حلول المراقبة والتحكم عن بعد",

    serv8_title: "الحلول السحابية",
    serv8_f1: "ترحيل البيانات ونقلها للسحابة",
    serv8_f2: "إدارة بيئات AWS و Azure",
    serv8_f3: "النسخ الاحتياطي السحابي الآمن",
    serv8_f4: "حلول البرمجيات كخدمة SaaS",

    // Category Selector
    shopByCategory: "تسوق حسب الفئة",
    allCategories: "كل الفئات",
    cat1: "أجهزة الكمبيوتر ومحطات العمل",
    cat2: "أجهزة اللابتوب",
    cat3: "الطابعات والماسحات الضوئية",
    cat4: "الشبكات والملحقات",
    cat5: "أنظمة CCTV وأجهزة المراقبة",
    cat6: "الخوادم ووحدات التخزين",

    // Shop
    ourShop: "متجرنا",
    featuredProducts: "المنتجات المميزة",
    viewAllProducts: "عرض جميع المنتجات",
    noProducts: "لا توجد منتجات متوفرة في هذه الفئة حالياً.",
    loadingProducts: "جاري تحميل المنتجات...",

    // Footer
    footerDesc: "تواصل اليوم، بناء الغد. نوفر بنية تحتية وحلول شبكات وتكنولوجيا معلومات ذات جودة عالية.",
    quickLinks: "روابط سريعة",
    newsletter: "النشرة الإخبارية",
    yourEmail: "بريدك الإلكتروني...",
    subscribe: "اشتراك",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    complains: "الشكاوى والاقتراحات",
    faqs: "الأسئلة الشائعة",
    rightsReserved: "جميع الحقوق محفوظة."
  }
};

export function AppContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [lang, setLang] = useState<Language>("en");

  // Fetch session on mount (NextAuth compatibility)
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session");
        const session = await res.json();
        if (session && session.user) {
          setUser({
            id: session.user.id || "",
            name: session.user.name || "",
            email: session.user.email || "",
            avatar: session.user.image || session.user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80",
          });
        } else {
          const storedUser = localStorage.getItem("inf_user");
          if (storedUser) setUser(JSON.parse(storedUser));
        }
      } catch (e) {
        console.error("Session fetch error:", e);
      }
    };
    
    fetchSession();

    // Stored cart, favorites, lang, orders
    const storedCart = localStorage.getItem("inf_cart");
    if (storedCart) {
      try { setCart(JSON.parse(storedCart)); } catch (e) { console.error(e); }
    }

    const storedFavorites = localStorage.getItem("inf_favorites");
    if (storedFavorites) {
      try { setFavorites(JSON.parse(storedFavorites)); } catch (e) { console.error(e); }
    }

    const storedLang = localStorage.getItem("inf_lang") as Language;
    if (storedLang === "en" || storedLang === "ar") {
      setLang(storedLang);
    }
  }, []);

  const changeLanguage = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem("inf_lang", newLang);
  };

  const t = (key: string): string => {
    return translations[lang][key] || key;
  };

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("inf_user", JSON.stringify(userData));
    toast.success(lang === "ar" ? "تم تسجيل الدخول بنجاح!" : "Logged in successfully!");
  };

  const logout = async () => {
    try {
      await fetch("/api/auth/signout", { method: "POST" });
    } catch (e) {
      console.error(e);
    }
    setUser(null);
    localStorage.removeItem("inf_user");
    toast.info(lang === "ar" ? "تم تسجيل الخروج" : "Signed out");
  };

  const addToCart = (product: any): boolean => {
    if (!user) {
      toast.warning(lang === "ar" ? "برجاء تسجيل الدخول أولاً" : "Please log in first");
      return false;
    }
    setCart((prevCart) => {
      const prodId = String(product._id || product.id);
      const existing = prevCart.find((item) => String(item.id) === prodId);
      let updated;
      if (existing) {
        updated = prevCart.map((item) =>
          String(item.id) === prodId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        updated = [
          ...prevCart,
          {
            id: prodId,
            title: product.title || product.name,
            price: product.price,
            thumbnail: product.thumbnail || (product.images && product.images[0]) || "",
            category: product.category,
            quantity: 1,
          },
        ];
      }
      localStorage.setItem("inf_cart", JSON.stringify(updated));
      toast.success(lang === "ar" ? "تم إضافة المنتج للعربة!" : "Added product to cart!");
      return updated;
    });
    return true;
  };

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const updated = prevCart.filter((item) => String(item.id) !== String(itemId));
      localStorage.setItem("inf_cart", JSON.stringify(updated));
      toast.info(lang === "ar" ? "تم حذف المنتج من العربة" : "Product removed from cart");
      return updated;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) => {
      const updated = prevCart.map((item) =>
        String(item.id) === String(itemId) ? { ...item, quantity } : item
      );
      localStorage.setItem("inf_cart", JSON.stringify(updated));
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("inf_cart");
  };

  const addToFavorites = (product: any): boolean => {
    if (!user) {
      toast.warning(lang === "ar" ? "برجاء تسجيل الدخول أولاً" : "Please log in first");
      return false;
    }
    setFavorites((prevFavorites) => {
      const prodId = String(product._id || product.id);
      const existing = prevFavorites.find((item) => String(item.id) === prodId);
      if (existing) {
        const updated = prevFavorites.filter((item) => String(item.id) !== prodId);
        localStorage.setItem("inf_favorites", JSON.stringify(updated));
        toast.info(lang === "ar" ? "تم الإزالة من المفضلة" : "Removed from favorites");
        return updated;
      } else {
        const updated = [
          ...prevFavorites,
          {
            id: prodId,
            title: product.title || product.name,
            price: product.price,
            thumbnail: product.thumbnail || (product.images && product.images[0]) || "",
            category: product.category,
          },
        ];
        localStorage.setItem("inf_favorites", JSON.stringify(updated));
        toast.success(lang === "ar" ? "تم الإضافة للمفضلة!" : "Added to favorites!");
        return updated;
      }
    });
    return true;
  };

  const removeFromFavorites = (itemId: string) => {
    setFavorites((prevFavorites) => {
      const updated = prevFavorites.filter((item) => String(item.id) !== String(itemId));
      localStorage.setItem("inf_favorites", JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (itemId: string): boolean => {
    return favorites.some((item) => String(item.id) === String(itemId));
  };

  const addOrder = async (orderData: Omit<Order, "id" | "date" | "status">) => {
    try {
      const formattedItems = orderData.items.map(item => ({
        productId: item.id,
        name: item.title,
        price: item.price,
        quantity: item.quantity,
        image: item.thumbnail,
        category: item.category
      }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: formattedItems,
          total: orderData.total,
          customer: {
            name: orderData.shippingDetails.name,
            phone: orderData.shippingDetails.phone,
            address: orderData.shippingDetails.address,
            email: user?.email || ""
          },
          paymentMethod: orderData.paymentMethod
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to submit order");
      }

      const newOrder: Order = {
        id: data.order.orderId || data.order._id,
        items: orderData.items,
        total: orderData.total,
        date: new Date(data.order.createdAt).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
        shippingDetails: orderData.shippingDetails,
        paymentMethod: orderData.paymentMethod,
        status: data.order.status
      };

      setOrders((prevOrders) => [newOrder, ...prevOrders]);
      clearCart();
      toast.success(lang === "ar" ? "تم تسجيل الطلب بنجاح!" : "Order placed successfully!");
      return newOrder;
    } catch (err: any) {
      toast.error(err.message || "Something went wrong saving the order");
      return null;
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        orders,
        addOrder,
        searchQuery,
        setSearchQuery,
        lang,
        setLang: changeLanguage,
        t,
      }}
    >
      <div dir={lang === "ar" ? "rtl" : "ltr"} className={lang === "ar" ? "rtl" : "ltr"}>
        {children}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </div>
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
}
