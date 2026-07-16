import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// POST /api/auth/register
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      if (existing.provider === "google") {
        return NextResponse.json(
          { error: "This email is registered with Google. Please sign in with Google." },
          { status: 409 }
        );
      }
      return NextResponse.json({ error: "Email already exists. Please log in." }, { status: 409 });
    }

    const user = await User.create({
      name,
      email,
      password,
      provider: "local",
      avatar: "",
    });

    return NextResponse.json(
      { success: true, user: { name: user.name, email: user.email, avatar: user.avatar } },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("Registration error:", err);
    return NextResponse.json({ error: err.message || "Server error" }, { status: 500 });
  }
}
