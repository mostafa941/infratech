import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { AppContextProvider } from "@/context/AppContext";
import WhatsAppButton from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
