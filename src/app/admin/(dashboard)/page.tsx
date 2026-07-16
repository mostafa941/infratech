"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import {
  TrendingUp,
  ShoppingBag,
  Users,
  MessageSquare,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function AdminDashboardOverview() {
  const [stats, setStats] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [analyticsRes, ordersRes] = await Promise.all([
          axios.get("/api/analytics"),
          axios.get("/api/orders"),
        ]);
        setStats(analyticsRes.data);
        setOrders((ordersRes.data.orders || []).slice(0, 5)); // Take latest 5 orders
      } catch (err) {
        console.error("Dashboard overview fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-500">Loading overview analytics...</p>
        </div>
      </div>
    );
  }

  const cards = [
    {
      title: "Today's Sales",
      value: `$${stats?.today?.total || 0}`,
      desc: `${stats?.today?.count || 0} Orders placed today`,
      icon: TrendingUp,
      color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    },
    {
      title: "Weekly Revenue",
      value: `$${stats?.week?.total || 0}`,
      desc: `${stats?.week?.count || 0} Orders this week`,
      icon: ShoppingBag,
      color: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
    },
    {
      title: "Monthly Volume",
      value: `$${stats?.month?.total || 0}`,
      desc: `${stats?.month?.count || 0} Orders this month`,
      icon: TrendingUp,
      color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    },
    {
      title: "Total Transactions",
      value: `$${stats?.all?.total || 0}`,
      desc: `${stats?.all?.count || 0} Lifetime orders`,
      icon: Users,
      color: "bg-violet-500/10 text-violet-600 border-violet-500/20",
    },
  ];

  return (
    <div className="space-y-8" dir="ltr">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Overview Dashboard</h1>
        <p className="text-slate-500 text-sm mt-1">Real-time updates of store revenue, purchases and messages.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <div key={i} className={`bg-white border rounded-3xl p-6 shadow-xs flex items-center justify-between`}>
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">{c.title}</p>
                <h3 className="text-2xl font-black text-slate-900">{c.value}</h3>
                <p className="text-xs text-slate-500">{c.desc}</p>
              </div>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border ${c.color}`}>
                <Icon className="w-6 h-6" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Latest Orders & Direct Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Latest Orders List */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-3xl p-6 shadow-xs">
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-50">
            <h3 className="text-base font-extrabold text-slate-900">Recent Transactions</h3>
            <Link href="/admin/orders" className="text-xs font-bold text-amber-500 hover:underline">
              View all orders
            </Link>
          </div>

          {orders.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm font-medium">
              No orders registered in the system yet.
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o._id} className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                      <ShoppingBag className="w-5 h-5 text-amber-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-slate-900">{o.customer.name}</h4>
                      <p className="text-xs text-slate-400">{new Date(o.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-sm text-slate-900">${o.total}</p>
                    <span className={`inline-block text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      o.status === "delivered" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : "bg-amber-50 text-amber-600 border border-amber-100"
                    }`}>
                      {o.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Shortcuts / Quick Actions */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs space-y-6">
          <h3 className="text-base font-extrabold text-slate-900 pb-4 border-b border-slate-50">Quick Tools</h3>
          <div className="grid grid-cols-1 gap-3">
            <Link href="/admin/add-product" className="w-full text-center block bg-slate-900 hover:bg-slate-900/90 text-amber-400 font-bold py-3.5 px-4 rounded-xl text-sm transition-all shadow-md">
              Create New Product
            </Link>
            <Link href="/admin/categories" className="w-full text-center block border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold py-3.5 px-4 rounded-xl text-sm transition-all">
              Manage Categories
            </Link>
            <Link href="/admin/messages" className="w-full text-center block border border-slate-200 hover:bg-slate-50 text-slate-800 font-bold py-3.5 px-4 rounded-xl text-sm transition-all">
              Read Customer Mailbox
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
