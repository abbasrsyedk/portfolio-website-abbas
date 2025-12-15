// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Cursor from "@/components/Cursor"; 

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
      {/* 1. 'cursor-none' hides the default white arrow.
         2. <Cursor /> renders your custom circle globally.
      */}
      <body className="bg-neutral-900 text-white flex flex-col min-h-screen overflow-x-hidden cursor-none">
        <Cursor />
        {children}
      </body>
    </html>
  );
}