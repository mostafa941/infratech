"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminAnalytics() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get("/api/analytics");
        setData(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load sales analytics");
      } finally {
        setLoading(false);
      }
    };
    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-slate-500">Loading metrics and statistics reports...</p>
        </div>
      </div>
    );
  }

  const reports = [
    { label: "Daily Revenue (Today)", count: data?.today?.count || 0, sum: data?.today?.total || 0, bg: "bg-emerald-50 border-emerald-100 text-emerald-700" },
    { label: "Weekly Revenue (This Week)", count: data?.week?.count || 0, sum: data?.week?.total || 0, bg: "bg-cyan-50 border-cyan-100 text-cyan-700" },
    { label: "Monthly Revenue (This Month)", count: data?.month?.count || 0, sum: data?.month?.total || 0, bg: "bg-amber-50 border-amber-100 text-amber-700" },
  ];

  return (
    <div className="space-y-8" dir="ltr">
      {/* Title */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Sales Analytics Reports</h1>
        <p className="text-slate-500 text-sm mt-1">Review revenue summaries, total orders volume, and daily breakdowns.</p>
      </div>

      {/* Revenue Grid Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reports.map((r, idx) => (
          <div key={idx} className={`border rounded-3xl p-6 shadow-xs flex flex-col justify-between gap-4 bg-white`}>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{r.label}</p>
              <h3 className="text-3xl font-black text-slate-900">${r.sum}</h3>
            </div>
            <div className={`p-3 rounded-2xl border text-xs font-bold ${r.bg}`}>
              Total Transactions: {r.count} purchases
            </div>
          </div>
        ))}
      </div>

      {/* Daily Breakdown list sheet */}
      <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-xs">
        <h3 className="text-base font-extrabold text-slate-900 pb-4 border-b border-slate-50 mb-6">Last 30 Days Daily Breakdown</h3>

        {(!data?.chartData || data.chartData.length === 0) ? (
          <div className="text-center py-12 text-slate-400 text-sm font-medium">
            No sales data collected over the last 30 days.
          </div>
        ) : (
          <div className="space-y-3">
            {data.chartData.map((day: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 text-sm">
                <span className="font-bold text-slate-600">{day.date}</span>
                <span className="font-black text-amber-500">${day.total}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
