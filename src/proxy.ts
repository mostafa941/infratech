import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Protect all /admin routes except /admin/login and /admin/reset-password
  if (
    pathname.startsWith("/admin") &&
    !pathname.startsWith("/admin/login") &&
    !pathname.startsWith("/admin/reset-password")
  ) {
    const adminToken = req.cookies.get("admin_token")?.value;

    if (!adminToken) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    // Basic token format check (full verify happens in API routes)
    // We can't use jsonwebtoken in Edge Runtime, so just check presence
    // The API routes themselves do full verification
    try {
      const parts = adminToken.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid token");
      }
      const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());
      if (!payload.email || !payload.role || payload.role !== "admin") {
        throw new Error("Invalid payload");
      }
    } catch {
      const response = NextResponse.redirect(new URL("/admin/login", req.url));
      response.cookies.delete("admin_token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
