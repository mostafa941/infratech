import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";
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

export async function GET(req: NextRequest) {
  if (!isAdminRequest(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const now = new Date();

    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [dailyOrders, weeklyOrders, monthlyOrders, allOrders] = await Promise.all([
      Order.find({ createdAt: { $gte: startOfDay } }),
      Order.find({ createdAt: { $gte: startOfWeek } }),
      Order.find({ createdAt: { $gte: startOfMonth } }),
      Order.find().sort({ createdAt: -1 }).limit(100),
    ]);

    const sum = (orders: any[]) =>
      orders.reduce((acc, o) => acc + (o.total || 0), 0);

    // Daily breakdown for chart (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const recentOrders = await Order.find({ createdAt: { $gte: thirtyDaysAgo } });

    const dailyMap: Record<string, number> = {};
    recentOrders.forEach((order) => {
      const date = new Date(order.createdAt).toLocaleDateString("en-CA");
      dailyMap[date] = (dailyMap[date] || 0) + order.total;
    });

    const chartData = Object.entries(dailyMap)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, total]) => ({ date, total }));

    return NextResponse.json({
      today: { count: dailyOrders.length, total: sum(dailyOrders) },
      week: { count: weeklyOrders.length, total: sum(weeklyOrders) },
      month: { count: monthlyOrders.length, total: sum(monthlyOrders) },
      all: { count: allOrders.length, total: sum(allOrders) },
      chartData,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
