import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
import { auth } from "@/lib/auth";
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

// GET /api/orders — admin or authenticated user
export async function GET(req: NextRequest) {
  const isAdmin = isAdminRequest(req);
  if (isAdmin) {
    try {
      await connectDB();
      const orders = await Order.find().sort({ createdAt: -1 });
      return NextResponse.json({ orders });
    } catch {
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
    }
  }

  // Check if it's a logged in client/user
  const session = await auth();
  if (!session || !session.user || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const orders = await Order.find({ "customer.email": session.user.email }).sort({ createdAt: -1 });
    return NextResponse.json({ orders });
  } catch (err) {
    console.error("Failed to fetch user orders:", err);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

// POST /api/orders — client places order (authenticated via NextAuth session cookie)
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const order = new Order(body);
    await order.save();
    return NextResponse.json({ order }, { status: 201 });
  } catch (err: any) {
    console.error("Order creation error:", err);
    return NextResponse.json({ error: "Failed to create order", details: err.message || err, stack: err.stack }, { status: 500 });
  }
}

// PATCH /api/orders — update status (admin only)
export async function PATCH(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const { id, status } = await req.json();
    const order = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!order) return NextResponse.json({ error: "Order not found" }, { status: 404 });
    return NextResponse.json({ order });
  } catch {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
