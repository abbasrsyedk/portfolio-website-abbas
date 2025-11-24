// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Abbas Portfolio",
  description: "Showcase of my projects, work and interests",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-900 text-white flex flex-col min-h-screen overflow-x-hidden">
        {/* 🚀 Navbar completely removed */}
        {children}
      </body>
    </html>
  );
}
