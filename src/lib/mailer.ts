import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function sendOTPEmail(toEmail: string, otp: string) {
  const mailOptions = {
    from: `"InfraTech Admin" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: "🔐 InfraTech Admin — Password Reset OTP",
    html: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 480px; margin: 0 auto; background: #f8fafc; padding: 32px; border-radius: 16px;">
        <div style="background: linear-gradient(135deg, #0e7490, #164e63); padding: 24px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
          <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">InfraTech</h1>
          <p style="color: #a5f3fc; margin: 8px 0 0; font-size: 13px;">Admin Dashboard</p>
        </div>
        <h2 style="color: #0f172a; font-size: 18px; margin-bottom: 8px;">Reset Password Request</h2>
        <p style="color: #64748b; font-size: 14px; margin-bottom: 24px;">Use this OTP to reset your admin password. It expires in <strong>10 minutes</strong>.</p>
        <div style="background: white; border: 2px solid #e2e8f0; border-radius: 12px; padding: 24px; text-align: center; margin-bottom: 24px;">
          <p style="color: #64748b; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 2px; font-weight: 700;">Your OTP Code</p>
          <h1 style="color: #0e7490; font-size: 48px; font-weight: 900; letter-spacing: 8px; margin: 0;">${otp}</h1>
        </div>
        <p style="color: #94a3b8; font-size: 12px; text-align: center;">If you did not request this, please ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
