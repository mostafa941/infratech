"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Printer, ArrowLeft } from "lucide-react";
import { toast } from "react-toastify";

export default function OrderInvoice() {
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchOrder = async () => {
      try {
        const res = await axios.get("/api/orders");
        const found = (res.data.orders || []).find((o: any) => o._id === id);
        if (found) {
          setOrder(found);
        } else {
          toast.error("Order not found");
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load invoice");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-500">Generating invoice sheet...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="text-center p-20 font-bold text-rose-500">
        No transaction detail matches this reference token.
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-3xl mx-auto" dir="ltr">
      {/* Back & Print actions (hidden in print) */}
      <div className="flex justify-between items-center print:hidden">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to directory</span>
        </button>

        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all cursor-pointer shadow-sm"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Invoice Sheet */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-md print:border-0 print:shadow-none print:p-0">
        {/* Invoice Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <img src="/images/logoInfra.jpg" alt="InfraTech Logo" className="h-10 w-auto object-contain" />
            </div>
            <p className="text-xs text-slate-400">Premium Network Infrastructures & Software Solutions</p>
            <p className="text-xs text-slate-400">Cairo, Egypt — info@infratech-co.com</p>
          </div>
          <div className="text-left sm:text-right">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Invoice Receipt</h2>
            <p className="text-xs font-bold text-slate-500 mt-1">Ref ID: {order.orderId || order._id.toUpperCase()}</p>
            <p className="text-xs text-slate-400">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            <p className="text-xs text-slate-400">Status: <span className="font-extrabold uppercase text-amber-500">{order.status}</span></p>
          </div>
        </div>

        {/* Client details billing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-slate-200">
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Billed To</h4>
            <p className="font-black text-slate-800">{order.customer.name}</p>
            <p className="text-xs text-slate-500 mt-1">{order.customer.address}</p>
            <p className="text-xs text-slate-500 mt-0.5">Phone: {order.customer.phone}</p>
            {order.customer.email && <p className="text-xs text-slate-500 mt-0.5">Email: {order.customer.email}</p>}
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Payment Details</h4>
            <p className="text-sm font-bold text-slate-700">Option: {order.paymentMethod}</p>
            <p className="text-xs text-slate-500 mt-1">Transaction type: Cash/Bank Transfer settlement</p>
          </div>
        </div>

        {/* Items Listing */}
        <div className="py-6">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Purchased Items</h4>
          <div className="space-y-4">
            {order.items.map((item: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 print:bg-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-1 shrink-0">
                    <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div>
                    <h5 className="font-bold text-sm text-slate-900">{item.name}</h5>
                    <p className="text-xs text-slate-400 uppercase font-semibold">{item.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-sm text-slate-900">${item.price}</p>
                  <p className="text-xs text-slate-400">Qty: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Total Summary */}
        <div className="pt-6 border-t border-slate-200 flex justify-end">
          <div className="w-full sm:w-64 space-y-2.5 text-sm">
            <div className="flex justify-between text-slate-500">
              <span>Subtotal</span>
              <span>${order.total}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Shipping Fee</span>
              <span className="text-emerald-600 font-bold">FREE</span>
            </div>
            <div className="flex justify-between text-slate-950 font-black text-base border-t border-slate-200 pt-2.5">
              <span>Total Paid</span>
              <span className="text-amber-500">${order.total}</span>
            </div>
          </div>
        </div>

        {/* Footer info message */}
        <div className="text-center pt-10 mt-10 border-t border-slate-100 text-xs text-slate-400">
          <p>Thank you for doing business with InfraTech!</p>
          <p className="mt-1">For any queries regarding this transaction, contact support: +201278167506</p>
        </div>
      </div>
    </div>
  );
}
