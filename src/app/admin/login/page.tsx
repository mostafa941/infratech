"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.warning("Please fill in email and password credentials");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("/api/admin/login", { email, password });
      if (res.data.success) {
        toast.success("Successfully logged in to dashboard!");
        router.push("/admin");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Access Denied: Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8" dir="ltr">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="inline-block bg-white p-2 rounded-2xl shadow-xs">
          <Image src="/images/logoInfra.jpg" alt="InfraTech logo" width={160} height={45} />
        </div>
        <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-slate-100 tracking-tight">
          Admin Dashboard Login
        </h2>
        <p className="mt-2 text-center text-xs md:text-sm text-slate-400">
          Authorized personnel only — techinfra70@gmail.com
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 py-8 px-4 shadow-xl rounded-3xl sm:px-10 border border-slate-800">
          <form className="space-y-6" onSubmit={handleFormSubmit}>
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Admin Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="techinfra70@gmail.com"
                className="w-full border border-slate-700 bg-slate-850 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Secret Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-slate-700 bg-slate-850 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-xs text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-600 transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading ? "Authorizing access..." : "Enter Admin Portal"}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/admin/reset-password")}
              className="text-xs text-amber-500 font-bold hover:underline cursor-pointer bg-transparent border-0"
            >
              Forgot password? Request Reset OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
