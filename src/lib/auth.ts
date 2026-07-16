import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET,
  trustHost: true,
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          // محاولة الاتصال بقاعدة البيانات
          await connectDB();
          
          const user = await User.findOne({ email: credentials.email, provider: "local" });
          if (!user || !user.password) {
            console.log(`[Auth Directory] User not found or not registered locally for email: ${credentials.email}`);
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password as string, user.password);
          if (!isValid) {
            console.log(`[Auth Directory] Password mismatch for email: ${credentials.email}`);
            return null;
          }

          return {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            image: user.avatar || null,
          };
        } catch (error) {
          // السطر ده هيطبع لك المشكلة الحقيقية (مثلاً لو الداتابيز مقفولة أو الـ URI غلط)
          console.error("❌ Error in authorize function:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          await connectDB();
          const existingUser = await User.findOne({ email: user.email });
          
          if (!existingUser) {
            // محاولة إنشاء مستخدم جوجل جديد
            await User.create({
              name: user.name || "Google User",
              email: user.email || "",
              avatar: user.image || "",
              provider: "google",
              googleId: account.providerAccountId,
            });
          } else if (existingUser.provider === "local") {
            // تحديث الأفتار لو الحساب محلي وسجل بجوجل
            await User.findByIdAndUpdate(existingUser._id, {
              avatar: user.image || existingUser.avatar,
            });
          }
        } catch (err) {
          // السطر ده هيطبع لك بالتفصيل لو الـ Database رفضت تحفظ يوزر جوجل (مثلاً حقل required ناقص)
          console.error("❌ Google signIn error inside callback:", err);
          return false; // يمنع الدخول مع إظهار الخطأ في الـ Console عندك
        }
      }
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        if (account?.provider === "google") {
          token.avatar = user.image;
          token.provider = "google";
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
        (session.user as any).avatar = token.avatar as string;
        (session.user as any).provider = token.provider as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
});