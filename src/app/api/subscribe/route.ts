import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Subscriber from "@/models/Subscriber";
import Product from "@/models/Product";
import nodemailer from "nodemailer";

// Create reusable transporter using Gmail SMTP
function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

// Build a nice HTML email with featured products
function buildWelcomeEmail(email: string, products: any[]): string {
  const productCards = products
    .slice(0, 6)
    .map(
      (p) => `
      <div style="display:inline-block;width:160px;vertical-align:top;margin:8px;background:#fff;border:1px solid #f1f5f9;border-radius:16px;padding:12px;text-align:center;">
        <div style="width:100%;height:100px;display:flex;align-items:center;justify-content:center;background:#f8fafc;border-radius:10px;margin-bottom:10px;overflow:hidden;">
          <img src="${(p.images && p.images[0]) || ""}" alt="${p.name}" style="max-height:80px;max-width:100%;object-fit:contain;" />
        </div>
        <p style="font-size:12px;font-weight:700;color:#1e293b;margin:0 0 4px;line-height:1.3;">${p.name}</p>
        <p style="font-size:14px;font-weight:900;color:#f59e0b;margin:0 0 8px;">$${p.price}</p>
        <a href="${process.env.NEXTAUTH_URL}/products/${p._id}" style="font-size:10px;background:#0e7490;color:#fff;padding:5px 10px;border-radius:8px;text-decoration:none;font-weight:700;display:inline-block;">View Product</a>
      </div>
    `
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Welcome to InfraTech Newsletter</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#0f2c3d 0%,#153c52 100%);border-radius:20px 20px 0 0;padding:32px 32px 24px;text-align:center;">
              <div style="background:#fff;display:inline-block;padding:10px 16px;border-radius:12px;margin-bottom:16px;">
                <span style="font-size:22px;font-weight:900;color:#0e7490;letter-spacing:-1px;">Infra<span style="color:#f59e0b;">Tech</span></span>
              </div>
              <h1 style="color:#fff;font-size:24px;font-weight:800;margin:0 0 8px;letter-spacing:-0.5px;">Welcome to Our Newsletter! 🎉</h1>
              <p style="color:#94a3b8;font-size:14px;margin:0;">You're now subscribed to exclusive IT deals & product alerts.</p>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="background:#fff;padding:28px 32px;">
              <p style="color:#475569;font-size:14px;line-height:1.6;margin:0 0 12px;">Hi there 👋,</p>
              <p style="color:#475569;font-size:14px;line-height:1.6;margin:0 0 20px;">
                Thank you for subscribing to <strong style="color:#0e7490;">InfraTech Newsletter</strong>! 
                You'll receive the latest IT hardware deals, new arrivals, and exclusive promotions directly in your inbox.
              </p>
              <p style="color:#475569;font-size:14px;line-height:1.6;margin:0 0 24px;">
                Here are some of our <strong style="color:#f59e0b;">featured products</strong> you might love:
              </p>

              <!-- Products Grid -->
              <div style="text-align:center;margin:0 -8px;">
                ${productCards}
              </div>

              <!-- CTA Button -->
              <div style="text-align:center;margin-top:28px;">
                <a href="${process.env.NEXTAUTH_URL}/storePage" style="background:#f59e0b;color:#1e293b;font-weight:800;font-size:14px;padding:14px 32px;border-radius:12px;text-decoration:none;display:inline-block;letter-spacing:0.3px;">
                  🛒 Shop All Products
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-radius:0 0 20px 20px;padding:20px 32px;text-align:center;border-top:1px solid #e2e8f0;">
              <p style="color:#94a3b8;font-size:11px;margin:0 0 4px;">You received this because you subscribed at infratech-co.com</p>
              <p style="color:#cbd5e1;font-size:10px;margin:0;">© ${new Date().getFullYear()} InfraTech. Cairo, Egypt · +20 127 816 7506</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Check if already subscribed
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      if (existing.active) {
        return NextResponse.json({ message: "Already subscribed!" }, { status: 200 });
      } else {
        // Re-activate subscription
        existing.active = true;
        await existing.save();
      }
    } else {
      // Save new subscriber
      await Subscriber.create({ email });
    }

    // Fetch featured products for email
    let featuredProducts: any[] = [];
    try {
      featuredProducts = await Product.find({ featured: true }).limit(6).sort({ createdAt: -1 });
      if (featuredProducts.length < 3) {
        // fallback to latest products
        featuredProducts = await Product.find().limit(6).sort({ createdAt: -1 });
      }
    } catch (err) {
      console.error("Failed to fetch products for email:", err);
    }

    // Send welcome email (non-blocking — don't fail if email fails)
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD && process.env.GMAIL_APP_PASSWORD !== "your_gmail_app_password_here") {
      try {
        const transporter = createTransporter();
        await transporter.sendMail({
          from: `"InfraTech Store" <${process.env.GMAIL_USER}>`,
          to: email,
          subject: "Welcome to InfraTech Newsletter 🎉 — Exclusive IT Deals Inside!",
          html: buildWelcomeEmail(email, featuredProducts),
        });
      } catch (emailErr) {
        // Log but don't fail the subscription
        console.error("Email send failed (subscription still saved):", emailErr);
      }
    }

    return NextResponse.json({ success: true, message: "Subscribed successfully!" });
  } catch (err: any) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: err.message || "Subscription failed" }, { status: 500 });
  }
}

// GET — Admin: list subscribers
export async function GET(req: NextRequest) {
  const token = req.cookies.get("admin_token")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    await connectDB();
    const subscribers = await Subscriber.find({ active: true }).sort({ createdAt: -1 });
    return NextResponse.json({ subscribers, total: subscribers.length });
  } catch {
    return NextResponse.json({ error: "Failed to fetch subscribers" }, { status: 500 });
  }
}
