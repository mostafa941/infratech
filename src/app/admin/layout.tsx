import "../globals.css";
import React from "react";

export const metadata = {
  title: "Admin Dashboard - InfraTech",
  description: "Admin panel for InfraTech",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
