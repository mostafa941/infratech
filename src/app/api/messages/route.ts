import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Message from "@/models/Message";
import jwt from "jsonwebtoken";

function isAdminRequest(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return false;
  try {
    jwt.verify(token, process.env.ADMIN_JWT_SECRET!);
    return true;
  } catch {
    return false;
  }
}

// GET /api/messages — admin only
export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const messages = await Message.find().sort({ createdAt: -1 });
    return NextResponse.json({ messages });
  } catch {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}

// POST /api/messages — public (contact form)
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const message = await Message.create(body);
    return NextResponse.json({ message }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }
}

// PATCH /api/messages — mark as read (admin only)
export async function PATCH(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const { id } = await req.json();
    await Message.findByIdAndUpdate(id, { read: true });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to mark message" }, { status: 500 });
  }
}
