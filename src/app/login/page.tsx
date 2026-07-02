"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";

function LoginContent() {
  const { login, user } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // If already logged in, send them on their way
    if (user) {
      router.push(redirectUrl);
    }
  }, [user, router, redirectUrl]);

  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    // Simulate standard registration/login
    login({
      name: email.split("@")[0].toUpperCase(),
      email: email,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"
    });
  };

  const handleGoogleLogin = () => {
    login({
      name: "Ahmed Ali (Google)",
      email: "ahmed.ali@gmail.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80"
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" dir="ltr">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block bg-white p-2 rounded-2xl shadow-xs">
          <Image src="/images/logoInfra.jpg" alt="InfraTech logo" width={160} height={45} />
        </Link>
        <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          Sign in to your account
        </h2>
        <p className="mt-2 text-center text-xs md:text-sm text-slate-500">
          Or explore the store collections directly
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-md rounded-3xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleFormLogin}>
            {error && (
              <div className="bg-rose-50 text-rose-600 text-xs font-semibold p-3.5 rounded-xl border border-rose-100">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                placeholder="you@example.com"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-xs text-sm font-bold text-white bg-cyan-700 hover:bg-cyan-800 transition-colors cursor-pointer"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-white text-slate-400 font-bold">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-slate-200 rounded-xl shadow-xs bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {/* Google Icon SVG */}
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12.24 10.285V14.4h6.887c-.648 2.41-2.519 4.114-5.136 4.114A5.99 5.99 0 0 1 8 12.5a5.99 5.99 0 0 1 5.99-6.012c1.49 0 2.845.545 3.9 1.442l3.136-3.136C19.146 3.097 16.74 2 13.99 2 8.47 2 4 6.47 4 12s4.47 10 9.99 10c5.78 0 9.68-4.06 9.68-9.85 0-.663-.06-1.3-.17-1.865H12.24Z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Login() {
  return (
    <Suspense fallback={<div className="text-center p-20 text-slate-400 font-semibold">Loading authentication modules...</div>}>
      <LoginContent />
    </Suspense>
  );
}
