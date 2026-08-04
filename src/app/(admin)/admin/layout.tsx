import "../../globals.css";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { ToastContainer } from "react-toastify";

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
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        {children}
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} theme="dark" />
      </body>
    </html>
  );
}
