// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Cursor from "@/components/Cursor";
import MotionProvider from "@/components/MotionProvider";

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
      {/* 1. 'lg:cursor-none' hides the default white arrow on large screens.
         2. <Cursor /> renders your custom circle globally.
      */}
      <body className="bg-neutral-900 text-white flex flex-col min-h-screen overflow-x-hidden lg:cursor-none">
        <MotionProvider>
          <Cursor />
          <div className="pb-24 md:pb-0">
            {children}
          </div>
        </MotionProvider>
      </body>
    </html>
  );
}
