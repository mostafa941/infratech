"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

export default function AdminResetPassword() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"request" | "verify">("request");
  const [loading, setLoading] = useState(false);

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.warning("Please enter your admin email");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/admin/reset-password", {
        action: "send-otp",
        email,
      });
      if (res.data.success) {
        toast.success("OTP has been sent to your admin email address!");
        setStep("verify");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) {
      toast.warning("Please enter the verification OTP code");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post("/api/admin/reset-password", {
        action: "verify-otp",
        email,
        otp,
      });
      if (res.data.success) {
        toast.success("OTP Code Verified! Admin credentials confirmed.");
        router.push("/admin/login");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Invalid OTP code");
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
          Reset Admin Password
        </h2>
        <p className="mt-2 text-center text-xs md:text-sm text-slate-400">
          Enter admin email to receive secure OTP verification code
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-slate-900 py-8 px-4 shadow-xl rounded-3xl sm:px-10 border border-slate-800">
          {step === "request" ? (
            <form className="space-y-6" onSubmit={handleRequestOTP}>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Admin Email Address
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
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-xs text-sm font-bold text-slate-950 bg-amber-500 hover:bg-amber-600 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Sending security OTP code..." : "Send Verification Code (OTP)"}
                </button>
              </div>
            </form>
          ) : (
            <form className="space-y-6" onSubmit={handleVerifyOTP}>
              <div>
                <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                  Verification OTP Code
                </label>
                <input
                  type="text"
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="e.g. 123456"
                  maxLength={6}
                  className="w-full border border-slate-700 bg-slate-850 rounded-xl px-4 py-3 text-sm text-slate-100 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all text-center tracking-widest text-lg font-black"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-xs text-sm font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-600 transition-colors cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Verifying OTP code..." : "Verify Code & Proceed"}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <button
              onClick={() => router.push("/admin/login")}
              className="text-xs text-slate-400 font-bold hover:underline cursor-pointer bg-transparent border-0"
            >
              Back to Login Page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
