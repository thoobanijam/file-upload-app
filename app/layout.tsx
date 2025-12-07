"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Navbar } from "./Components/layout/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="pt-16"> 
        {/* 👆 Adds space so navbar never hides content */}

        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
