"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

function LoginContent() {
  const { login, user, lang } = useAppContext();
  const isAr = lang === "ar";
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8" dir={isAr ? "rtl" : "ltr"}>
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-block bg-white p-2 rounded-2xl shadow-xs">
          <Image src="/images/logoInfra.jpg" alt="InfraTech logo" width={160} height={45} />
        </Link>
        <h2 className="mt-6 text-center text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
          {isRegister
            ? (isAr ? "إنشاء حساب جديد" : "Create a new account")
            : (isAr ? "تسجيل الدخول لحسابك" : "Sign in to your account")}
        </h2>
        <p className="mt-2 text-center text-xs md:text-sm text-slate-500">
          {isAr ? "أو تصفح تشكيلة المتجر مباشرةً" : "Or explore the store collections directly"}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-md rounded-3xl sm:px-10 border border-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {isRegister && (
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  {isAr ? "الاسم الكامل" : "Full Name"}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isAr ? "أحمد علي" : "Ahmed Ali"}
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50"
                />
              </div>
            )}
            
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                {isAr ? "البريد الإلكتروني" : "Email Address"}
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
                {isAr ? "كلمة المرور" : "Password"}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 transition-all bg-slate-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                  tabIndex={-1}
                  aria-label={showPassword ? (isAr ? "إخفاء كلمة المرور" : "Hide password") : (isAr ? "إظهار كلمة المرور" : "Show password")}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3.5 px-4 border border-transparent rounded-xl shadow-xs text-sm font-bold text-white bg-cyan-700 hover:bg-cyan-800 transition-colors cursor-pointer disabled:opacity-50"
              >
                {loading
                  ? (isAr ? "جارٍ المعالجة..." : "Processing...")
                  : isRegister
                    ? (isAr ? "إنشاء حساب" : "Sign up")
                    : (isAr ? "تسجيل الدخول" : "Sign in")}
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-cyan-700 font-bold hover:underline cursor-pointer"
            >
              {isRegister
                ? (isAr ? "لديك حساب بالفعل؟ سجل دخولك" : "Already have an account? Sign In")
                : (isAr ? "ليس لديك حساب؟ سجل الآن" : "Don't have an account? Register Now")}
            </button>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-white text-slate-400 font-bold">{isAr ? "أو تابع بـ" : "Or continue with"}</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-slate-200 rounded-xl shadow-xs bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>{isAr ? "تسجيل الدخول بـ Google" : "Sign in with Google"}</span>
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
