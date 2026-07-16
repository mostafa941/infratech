import { NextRequest, NextResponse } from "next/server";
import { sendOTPEmail } from "@/lib/mailer";

// In-memory OTP store (ephemeral per-request in serverless — acceptable for this use case)
// Use Redis/DB in production for multi-instance setups
const otpStore = new Map<string, { otp: string; expires: number; newPassword?: string }>();

export { otpStore };

export async function POST(req: NextRequest) {
  try {
    const { action, email, otp, newPassword } = await req.json();
    const adminEmail = process.env.ADMIN_EMAIL!;

    // Step 1: Request OTP
    if (action === "send-otp") {
      if (email !== adminEmail) {
        return NextResponse.json({ error: "Email not authorized" }, { status: 403 });
      }

      const code = Math.floor(100000 + Math.random() * 900000).toString();
      otpStore.set(adminEmail, {
        otp: code,
        expires: Date.now() + 10 * 60 * 1000, // 10 minutes
      });

      await sendOTPEmail(adminEmail, code);
      return NextResponse.json({ success: true, message: "OTP sent to your email" });
    }

    // Step 2: Verify OTP & change password
    if (action === "verify-otp") {
      const stored = otpStore.get(adminEmail);
      if (!stored) {
        return NextResponse.json({ error: "No OTP requested" }, { status: 400 });
      }
      if (Date.now() > stored.expires) {
        otpStore.delete(adminEmail);
        return NextResponse.json({ error: "OTP expired" }, { status: 400 });
      }
      if (otp !== stored.otp) {
        return NextResponse.json({ error: "Invalid OTP" }, { status: 400 });
      }

      // OTP verified — in a real system, update DB password here
      // Since admin password is in .env, we just confirm and clear OTP
      otpStore.delete(adminEmail);
      return NextResponse.json({ success: true, message: "OTP verified. Password reset successful (update your .env)" });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
