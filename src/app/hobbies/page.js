"use client";

import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import CountUp from "react-countup";
import { Globe, Gamepad2, Book } from "lucide-react";
import Header from "@/components/Header"; 

export default function HobbiesPage() {
  // Mouse tracking is kept ONLY for the Spotlight effect on cards
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <main 
      className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white relative flex flex-col pt-24 pb-4 md:pt-40 md:pb-12 cursor-none"
      onMouseMove={handleMouseMove}
    >
      
      {/* BACKGROUND NOISE */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>
      
      {/* REMOVED: Local Cursor Component */}

      <Header />

      {/* CONTENT CONTAINER */}
      <section className="w-full max-w-6xl mx-auto px-4 md:px-10 flex flex-col gap-4 md:gap-10">
        
        {/* 1. HEADER TEXT */}
        <div className="text-center shrink-0">
            <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2 leading-tight">
                Beyond Work: <br className="md:hidden" /> My Passions
            </h1>
            <p className="text-neutral-400 text-sm md:text-base max-w-lg mx-auto leading-relaxed">
                A peek into the things that keep me inspired, curious, and full of life.
            </p>
        </div>

        {/* 2. GRID LAYOUT */}
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-3 md:gap-4 group">
            
            {/* TRAVEL CARD (HERO) */}
            <Link 
                href="/hobbies/travel"
                className="relative group/card lg:col-span-2 lg:row-span-2 flex flex-col items-center justify-center text-center p-6 md:p-8 rounded-3xl border border-white/10 bg-gradient-to-br from-blue-900/20 to-transparent hover:border-blue-500/30 transition-all duration-500 overflow-hidden"
            >
                <Spotlight mouseX={mouseX} mouseY={mouseY} />
                
                <div className="relative z-10 flex flex-col items-center justify-center h-full w-full">
                    <div className="flex items-center gap-2 text-blue-400 mb-4">
                        <Globe size={24} />
                        <span className="font-bold tracking-wide">Travel</span>
                    </div>

                    {/* STATS ROW */}
                    <div className="mb-3 flex flex-nowrap items-baseline justify-center gap-2 md:gap-3">
                        <span className="text-3xl md:text-7xl font-bold text-white tracking-tighter w-[110px] md:w-auto text-right tabular-nums">
                            <CountUp end={36000} duration={2.5} separator="," />
                        </span>
                        <span className="text-base md:text-4xl font-bold text-blue-400 text-left whitespace-nowrap">kms ridden 🏍️</span>
                    </div>

                    {/* DESCRIPTION */}
                    <p className="text-neutral-400 text-sm md:text-base italic mb-6 md:mb-10 leading-relaxed">
                        on a Royal Enfield Hunter 350 — <br className="md:hidden" /> a love-hate relationship
                    </p>

                    <div className="w-full border-t border-white/10 pt-4 md:pt-6">
                        <p className="text-neutral-500 text-xs md:text-sm font-serif italic">
                            &quot;No matter how slow you ride, you&apos;re still ahead of those who never left home.&quot;
                        </p>
                    </div>
                </div>
            </Link>

            {/* MOBILE: WRAPPER FOR GAMING & READING (Side-by-Side) */}
            <div className="grid grid-cols-2 lg:grid-cols-1 lg:grid-rows-2 gap-3 md:gap-4 lg:col-span-1 lg:row-span-2 h-36 md:h-auto">
                
                {/* GAMING CARD */}
                <Link 
                    href="/hobbies/gaming"
                    className="relative group/card flex flex-col items-center justify-center p-4 rounded-3xl border border-white/10 bg-gradient-to-br from-orange-900/20 to-transparent hover:border-orange-500/30 transition-all duration-500 overflow-hidden"
                >
                    <Spotlight mouseX={mouseX} mouseY={mouseY} />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-2 md:gap-3 text-orange-400 text-center">
                        <Gamepad2 size={24} className="md:w-7 md:h-7" />
                        <span className="text-sm md:text-2xl font-bold">Gaming</span>
                    </div>
                </Link>

                {/* READING CARD */}
                <Link 
                    href="/hobbies/reading"
                    className="relative group/card flex flex-col items-center justify-center p-4 rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-900/20 to-transparent hover:border-emerald-500/30 transition-all duration-500 overflow-hidden"
                >
                    <Spotlight mouseX={mouseX} mouseY={mouseY} />
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-2 md:gap-3 text-emerald-400 text-center">
                        <Book size={24} className="md:w-7 md:h-7" />
                        <span className="text-sm md:text-2xl font-bold">Reading</span>
                    </div>
                </Link>

            </div>
        </div>
      </section>
    </main>
  );
}

function Spotlight({ mouseX, mouseY }) {
    return (
        <motion.div
            className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover/card:opacity-100"
            style={{
                background: useMotionTemplate`
                    radial-gradient(
                    500px circle at ${mouseX}px ${mouseY}px,
                    rgba(255,255,255,0.06),
                    transparent 80%
                    )
                `,
            }}
        />
    )
}