"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";

function LoginContent() {
  const { login, user, lang } = useAppContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      router.push(redirectUrl);
    }
  }, [user, router, redirectUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (isRegister && !name)) {
      toast.error(lang === "ar" ? "برجاء ملء كافة الحقول" : "Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      if (isRegister) {
        // Register API call
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (!res.ok) {
          toast.error(data.error || "Registration failed");
          setLoading(false);
          return;
        }

        toast.success(lang === "ar" ? "تم تسجيل الحساب بنجاح! برجاء تسجيل الدخول الآن." : "Account created successfully! Please log in.");
        setIsRegister(false);
      } else {
        // NextAuth Credentials Login
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        if (res?.error) {
          toast.error(lang === "ar" ? "بيانات الدخول غير صحيحة" : "Invalid email or password");
        } else {
          // Fetch the updated session
          const sessionRes = await fetch("/api/auth/session");
          const session = await sessionRes.json();
          if (session && session.user) {
            login({
              id: session.user.id || "",
              name: session.user.name || "",
              email: session.user.email || "",
              avatar: session.user.image || session.user.avatar || "",
            });
            router.push(redirectUrl);
          }
        }
      }
    } catch (err) {
      console.error(err);
      toast.error(lang === "ar" ? "حدث خطأ ما" : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signIn("google", { callbackUrl: redirectUrl });
    } catch (err) {
      console.error(err);
      toast.error("Google authentication failed.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" dir="ltr">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block bg-white p-2 rounded-2xl shadow-xs">
          <Image src="/images/logoInfra.jpg" alt="InfraTech logo" width={160} height={45} />
        </Link>
        <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isRegister ? "Create a new account" : "Sign in to your account"}
        </h2>
        <p className="mt-2 text-center text-xs md:text-sm text-slate-500">
          Or explore the store collections directly
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-md rounded-3xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ahmed Ali"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50"
                />
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-xs text-sm font-bold text-white bg-cyan-700 hover:bg-cyan-800 transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading ? "Processing..." : isRegister ? "Sign up" : "Sign in"}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-cyan-700 font-bold hover:underline cursor-pointer"
            >
              {isRegister ? "Already have an account? Sign In" : "Don't have an account? Register Now"}
            </button>
          </div>

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
