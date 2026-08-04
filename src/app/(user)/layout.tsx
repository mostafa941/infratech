import type { Metadata } from "next";
import React from "react";
import "../globals.css";
import { AppContextProvider } from "@/context/AppContext";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = { variable: "font-sans" };
const geistMono = { variable: "font-mono" };

export const metadata: Metadata = {
  title: "InfraTech",
  description: "InfraTech For Network Accessories and Laptops, Computers, Camera",
  icons: {
    icon: "/images/logoInfra.jpg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-gray-50">
        <AppContextProvider>
          {children}
          <WhatsAppButton />
        </AppContextProvider>
      </body>
    </html>
  );
}
