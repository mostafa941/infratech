"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Phone, MessageCircle, FileText, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import { TableSkeleton } from "@/components/Skeletons";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/orders");
        setOrders(res.data.orders || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load customer orders");
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await axios.patch("/api/orders", { id, status: newStatus });
      setOrders((prev) =>
        prev.map((o) => (o._id === id ? { ...o, status: res.data.order.status } : o))
      );
      toast.success(`Order status updated to ${newStatus}!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  if (loading) {
    return <TableSkeleton rows={5} columns={7} />;
  }

  return (
    <div className="space-y-8" dir="ltr">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Client Orders Directory</h1>
        <p className="text-slate-500 text-sm mt-1">Track and manage customer shopping purchases, invoices and status updates.</p>
      </div>

      {/* Orders Table Layout */}
      <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold text-xs uppercase tracking-wider">
                <th className="p-5">Order ID</th>
                <th className="p-5">Recipient Name</th>
                <th className="p-5">Phone & Chat</th>
                <th className="p-5">Delivery Details</th>
                <th className="p-5">Total Paid</th>
                <th className="p-5">Status Option</th>
                <th className="p-5 text-center">Invoice bill</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700 text-sm">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 font-medium">
                    No transactions registered in database directory.
                  </td>
                </tr>
              ) : (
                orders.map((o) => (
                  <tr key={o._id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Order ID */}
                    <td className="p-5 font-bold text-slate-900">
                      {o.orderId || o._id.substring(0, 8).toUpperCase()}
                    </td>
                    
                    {/* Name link -> goes to Invoice page */}
                    <td className="p-5">
                      <Link
                        href={`/admin/orders/${o._id}/invoice`}
                        className="font-extrabold text-cyan-800 hover:text-amber-500 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        {o.customer.name}
                      </Link>
                    </td>

                    {/* WhatsApp & Dial Link */}
                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${o.customer.phone}`}
                          className="flex items-center gap-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-2.5 py-1 rounded-xl text-xs transition-colors"
                          title="Call client"
                        >
                          <Phone className="w-3 h-3" />
                          <span>{o.customer.phone}</span>
                        </a>
                        <a
                          href={`https://wa.me/${o.customer.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center p-1 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors"
                          title="Open WhatsApp Chat"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </div>
                    </td>

                    {/* Address details */}
                    <td className="p-5 max-w-xs truncate" title={o.customer.address}>
                      {o.customer.address}
                    </td>

                    {/* Total & Payment Method */}
                    <td className="p-5 font-black text-slate-900">
                      <p>${o.total}</p>
                      <span className="text-[10px] text-slate-400 block font-normal">{o.paymentMethod}</span>
                    </td>

                    {/* Dropdown status update */}
                    <td className="p-5">
                      <select
                        value={o.status}
                        onChange={(e) => handleStatusChange(o._id, e.target.value)}
                        className="bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-bold text-slate-700 outline-none focus:border-amber-500 cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="processing">Processing</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Invoice detail page */}
                    <td className="p-5 text-center">
                      <Link
                        href={`/admin/orders/${o._id}/invoice`}
                        className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>Receipt</span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
