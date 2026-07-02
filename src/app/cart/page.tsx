"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, CheckCircle2, ArrowRight } from "lucide-react";
import { useAppContext } from "@/context/AppContext";
import TopNavBar from "@/components/TopNavBar";
import BottomNavBar from "@/components/BottomNavBar";
import Footer from "@/components/Footer";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, addOrder, user } = useAppContext();
  const [step, setStep] = useState<"cart" | "checkout" | "success">("cart");
  
  // Checkout fields
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("Vodafone Cash");
  const [error, setError] = useState("");
  const [placedOrder, setPlacedOrder] = useState<any>(null);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !address.trim()) {
      setError("Please fill in Name, Phone, and Address to proceed.");
      return;
    }

    const order = addOrder({
      items: cart,
      total: cartTotal,
      shippingDetails: { name, phone, address },
      paymentMethod,
    });

    setPlacedOrder(order);
    setStep("success");
  };

  const getDeliveryEstimation = () => {
    return "3-5 Business Days";
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50" dir="ltr">
      <TopNavBar />
      <BottomNavBar />

      <main className="flex-grow w-full max-w-5xl mx-auto px-4 py-12">
        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-4 md:gap-8 mb-10">
          <div className={`flex items-center gap-2 text-xs md:text-sm font-bold ${step === "cart" ? "text-amber-500" : "text-slate-400"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${step === "cart" ? "border-amber-500 text-amber-500 bg-amber-50" : "border-slate-300 text-slate-400"}`}>1</span>
            <span>Shopping Cart</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300" />
          <div className={`flex items-center gap-2 text-xs md:text-sm font-bold ${step === "checkout" ? "text-amber-500" : "text-slate-400"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${step === "checkout" ? "border-amber-500 text-amber-500 bg-amber-50" : "border-slate-300 text-slate-400"}`}>2</span>
            <span>Checkout Details</span>
          </div>
          <ArrowRight className="w-4 h-4 text-slate-300" />
          <div className={`flex items-center gap-2 text-xs md:text-sm font-bold ${step === "success" ? "text-emerald-500" : "text-slate-400"}`}>
            <span className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${step === "success" ? "border-emerald-500 text-emerald-500 bg-emerald-50" : "border-slate-300 text-slate-400"}`}>3</span>
            <span>Confirmation</span>
          </div>
        </div>

        {/* Step 1: Cart Listing */}
        {step === "cart" && (
          <div>
            {cart.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-xs">
                <ShoppingCart className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-slate-800 mb-2">Your Cart is Empty</h2>
                <p className="text-slate-500 text-sm mb-6">Browse the shop to add networking equipment or devices.</p>
                <Link href="/storePage" className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-xl transition-all text-sm shadow-md shadow-amber-500/20">
                  Shop Now
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items List */}
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-100 rounded-2xl p-4 flex gap-4 items-center shadow-xs">
                      <div className="w-20 h-20 bg-slate-50 border border-slate-100 rounded-xl overflow-hidden flex items-center justify-center p-2 flex-shrink-0">
                        <img src={item.thumbnail} alt={item.title} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-bold text-sm text-slate-800 line-clamp-1">{item.title}</h3>
                        <p className="text-[10px] bg-slate-100 text-slate-600 font-bold px-2 py-0.5 rounded w-fit uppercase tracking-wider mt-1">{item.category}</p>
                        <p className="text-amber-500 font-extrabold text-sm mt-1.5">${item.price}</p>
                      </div>
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-slate-50 transition-colors">
                          <Minus className="w-3.5 h-3.5 text-slate-500" />
                        </button>
                        <span className="px-3.5 text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-slate-50 transition-colors">
                          <Plus className="w-3.5 h-3.5 text-slate-500" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 hover:bg-rose-50 text-slate-400 hover:text-rose-500 rounded-lg transition-colors flex-shrink-0 cursor-pointer">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Cart Summary */}
                <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-md h-fit">
                  <h3 className="font-bold text-slate-900 border-b border-slate-50 pb-4 mb-4 uppercase tracking-wider text-xs">Order Summary</h3>
                  <div className="space-y-3 mb-6 text-sm">
                    <div className="flex justify-between text-slate-500">
                      <span>Subtotal</span>
                      <span>${cartTotal}</span>
                    </div>
                    <div className="flex justify-between text-slate-500">
                      <span>Shipping</span>
                      <span className="text-emerald-600 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between text-slate-900 font-bold border-t border-slate-50 pt-3 text-base">
                      <span>Total</span>
                      <span className="text-amber-500 font-black">${cartTotal}</span>
                    </div>
                  </div>
                  <button onClick={() => setStep("checkout")} className="w-full bg-cyan-700 hover:bg-cyan-800 text-white font-bold py-3.5 rounded-xl transition-all text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm shadow-cyan-700/20">
                    <CreditCard className="w-4 h-4" />
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Checkout Details */}
        {step === "checkout" && (
          <div className="max-w-2xl mx-auto bg-white border border-slate-100 rounded-3xl p-8 shadow-md">
            <h2 className="text-xl font-bold text-slate-900 mb-6 border-b border-slate-50 pb-4">Shipping & Payment Details</h2>
            <form onSubmit={handleCheckoutSubmit} className="space-y-6">
              {error && (
                <div className="bg-rose-50 border border-rose-100 text-rose-600 text-xs font-semibold p-4 rounded-xl">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Recipient Name <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => { setName(e.target.value); setError(""); }}
                  placeholder="Full Name"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Phone Number <span className="text-rose-500">*</span></label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value); setError(""); }}
                  placeholder="e.g., 01278167506"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Delivery Address <span className="text-rose-500">*</span></label>
                <textarea
                  required
                  rows={3}
                  value={address}
                  onChange={(e) => { setAddress(e.target.value); setError(""); }}
                  placeholder="Detailed street name, building number, city"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Payment Method <span className="text-rose-500">*</span></label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Vodafone Cash", "InstaPay", "Visa", "Cash on Delivery"].map((method) => (
                    <label
                      key={method}
                      className={`p-4 rounded-xl border text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 ${
                        paymentMethod === method
                          ? "border-amber-500 bg-amber-50/50 text-amber-600 font-bold"
                          : "border-slate-200 bg-white text-slate-600 hover:border-amber-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment-method"
                        value={method}
                        checked={paymentMethod === method}
                        onChange={() => setPaymentMethod(method)}
                        className="sr-only"
                      />
                      <span className="text-lg">
                        {method === "Visa" ? "💳" : method === "Vodafone Cash" ? "🔴" : method === "InstaPay" ? "⚡" : "💵"}
                      </span>
                      <span className="text-[10px] tracking-tight">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-4 pt-4 border-t border-slate-50">
                <button type="button" onClick={() => setStep("cart")} className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl transition-all text-sm text-center cursor-pointer">
                  Back to Cart
                </button>
                <button type="submit" className="flex-1 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-md shadow-amber-500/20 text-center cursor-pointer">
                  Confirm Purchase (${cartTotal})
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 3: Success Screen */}
        {step === "success" && placedOrder && (
          <div className="max-w-xl mx-auto bg-white border border-slate-100 rounded-3xl p-8 shadow-lg text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Purchase Successful!</h2>
            <p className="text-slate-500 text-sm mb-6">Thank you for your business. Your order details are registered under ID: <span className="font-bold text-slate-800">{placedOrder.id}</span>.</p>

            <div className="bg-slate-50 rounded-2xl p-6 text-left space-y-3 mb-8 border border-slate-100 text-sm">
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-400 font-medium">Estimated Delivery:</span>
                <span className="text-slate-800 font-bold">{getDeliveryEstimation()}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-400 font-medium">Shipping Address:</span>
                <span className="text-slate-800 font-bold text-right truncate max-w-[240px]">{placedOrder.shippingDetails.address}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200/60 pb-2">
                <span className="text-slate-400 font-medium">Total Price Paid:</span>
                <span className="text-amber-500 font-black">${placedOrder.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 font-medium">Payment Option:</span>
                <span className="text-slate-800 font-bold">{placedOrder.paymentMethod}</span>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/my-orders" className="flex-1 border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-3.5 rounded-xl transition-all text-sm block">
                View My Orders
              </Link>
              <Link href="/" className="flex-grow-2 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-xl transition-all text-sm block shadow-md shadow-amber-500/20">
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
