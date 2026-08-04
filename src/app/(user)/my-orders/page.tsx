"use client";

import React from "react";
import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import BottomNavBar from "@/components/BottomNavBar";
import Footer from "@/components/Footer";

export default function MyOrders() {
  const { orders, t, lang } = useAppContext();
  const isAr = lang === "ar";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50" dir={isAr ? "rtl" : "ltr"}>
      <BottomNavBar />

      <main className="flex-grow w-full max-w-4xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">{t("myOrdersTitle")}</h1>
            <p className="text-slate-400 text-xs md:text-sm mt-1">{t("myOrdersDesc")}</p>
          </div>
          <Link href="/storePage" className="inline-flex items-center gap-2 text-xs font-bold text-amber-500 hover:text-amber-600 transition-colors w-fit">
            <ArrowLeft className={`w-4 h-4 ${isAr ? "rotate-180" : ""}`} />
            {t("shopNowBtn")}
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-xs">
            <ShoppingBag className="w-16 h-16 text-slate-200 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-slate-800 mb-2">{t("noOrdersYet")}</h2>
            <p className="text-slate-500 text-sm mb-6">{t("noOrdersDesc")}</p>
            <Link href="/storePage" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-xl transition-all text-xs">
              {t("store")}
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs">
                {/* Order header information */}
                <div className="flex flex-wrap items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-4">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      {isAr ? "رقم الطلب" : "Order ID"}
                    </span>
                    <span className="font-extrabold text-sm text-slate-800">{order.id}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{t("orderDate")}</span>
                    <span className="font-bold text-xs text-slate-700">{order.date}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{t("estimatedDelivery")}</span>
                    <span className="font-bold text-xs text-emerald-600">{t("deliveryTime")}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">{t("orderStatus")}</span>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 uppercase tracking-wider">
                      ● {order.status}
                    </span>
                  </div>
                </div>

                {/* Items in order list */}
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center">
                      <div className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-2 flex-shrink-0">
                        <img src={item.thumbnail} alt={item.title} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-xs text-slate-800 line-clamp-1">{item.title}</h4>
                        <span className="text-[9px] text-slate-400">{isAr ? "الكمية:" : "Qty:"} {item.quantity}</span>
                      </div>
                      <div className={isAr ? "text-left" : "text-right"}>
                        <span className="font-extrabold text-xs text-slate-800">${item.price * item.quantity}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total and Shipping Info */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row justify-between md:items-center gap-4 text-xs">
                  <div className="text-slate-500">
                    <p>
                      <span className="font-bold text-slate-700">{isAr ? "يُسلَّم إلى:" : "Deliver To:"}</span>{" "}
                      {order.shippingDetails.name} ({order.shippingDetails.phone})
                    </p>
                    <p className="mt-0.5">
                      <span className="font-bold text-slate-700">{isAr ? "العنوان:" : "Address:"}</span>{" "}
                      {order.shippingDetails.address}
                    </p>
                    <p className="mt-0.5">
                      <span className="font-bold text-slate-700">{t("orderPayment")}:</span>{" "}
                      {order.paymentMethod}
                    </p>
                  </div>
                  <div className={`${isAr ? "text-left" : "text-right"} flex-shrink-0`}>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                      {t("totalPricePaid")}
                    </span>
                    <span className="font-black text-amber-500 text-base">${order.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
