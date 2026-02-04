"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Gamepad2, Headphones, Mic2, Monitor, Laptop, Keyboard, Mouse,
  Gauge, Target, Percent, ChevronDown, ExternalLink, Dices, UserPlus
} from "lucide-react";
import Header from "@/components/Header";

/* --- Data --- */
const GEAR_ITEMS = [
    { label: 'LG Ultragear 27" 144Hz', icon: Monitor, x: 40, y: 22, side: "left", href: "https://amzn.in/d/c7aZY2a" },
    { label: "HP Victus (Ryzen 5)", icon: Laptop, x: 70, y: 30, side: "right", href: "https://amzn.in/d/0TDF5nq" },
    { label: "Aula F75", icon: Keyboard, x: 46, y: 73, side: "right", href: "https://amzn.in/d/4ufDvsY" },
    { label: "Logitech G304", icon: Mouse, x: 66, y: 54, side: "right", href: "https://amzn.in/d/4ufDvsY" },
    { label: "Fifine AM8T", icon: Mic2, x: 32, y: 42, side: "left", href: "https://amzn.in/d/6rVoVXV" },
    { label: "Sony WH-CH720N", icon: Headphones, x: 22, y: 67, side: "left", href: "https://amzn.in/d/iAfDEGM" },
    { label: "Kreo Mirage", icon: Gamepad2, x: 78, y: 42, side: "right", href: "https://amzn.in/d/hTFkq6r" },
];

// HARDCODED STATS
const STATS = {
  rank: "Platinum 3",
  rankImg: "/images/games/platinum.png", 
  kd: "1.06",
  hs: "21.5",
  wr: "49.7",
  hours: "1,650"
};

const otherGames = [
  { name: "R6 Siege", hours: 1350 },
  { name: "Overwatch 2", hours: 65 },
  { name: "Witcher 3", hours: 77 },
  { name: "Schedule 1", hours: 90 },
];

export default function GamingPage() {
  // REMOVED: All local cursor code (useMotionValue, onMouseMove, springs, etc.)
  // The Global Cursor in layout.js handles everything now.

  return (
    <main 
      // Removed onMouseMove
      className="bg-[#050505] text-white selection:bg-rose-500 selection:text-white relative lg:cursor-none"
    >
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
      </div>
      
      {/* REMOVED: Local <motion.div> Cursor */}

      <Header />

      {/* ==========================================
          PAGE 1: HERO
          ========================================== */}
      <section className="min-h-screen w-full relative flex flex-col items-center pt-24 md:pt-32 pb-10 md:pb-20">
        
        <div className="w-full max-w-5xl px-4 md:px-6 flex flex-col h-full gap-6 md:gap-8">
          
          {/* Title Area */}
          <header className="text-center shrink-0">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-6xl font-bold tracking-tight mb-2">
              Gaming <span className="text-rose-500">Setup</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-neutral-400 text-sm md:text-lg max-w-lg mx-auto leading-relaxed">
              My daily driver for work and play.
            </motion.p>
          </header>

          {/* Image Area */}
          <div className="w-full flex-1 flex items-start justify-center">
             <HeroImageWithCallouts />
          </div>

          {/* Scroll Hint */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} 
            className="shrink-0 hidden md:flex justify-center text-neutral-600 mt-auto"
          >
            <ChevronDown className="animate-bounce w-6 h-6 text-rose-500/50" />
          </motion.div>

        </div>
      </section>

      {/* ==========================================
          PAGE 2: STATS & GAMES
          ========================================== */}
      {/* FIX: Reduced bottom padding to pb-5 (Mobile) and md:pb-10 (Desktop) */}
      <section className="pt-10 pb-5 md:pt-20 md:pb-10 px-4 md:px-6 relative z-10 flex flex-col items-center">
        <div className="w-full max-w-5xl flex flex-col gap-6">
            
            {/* VALORANT CARD */}
            <div className="rounded-[2rem] border border-white/10 bg-[#0a0a0a] overflow-hidden relative group shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-900/20 to-transparent opacity-50" />
                
                {/* Header */}
                <div className="relative p-6 md:p-8 border-b border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-rose-500/20 flex items-center justify-center shadow-[0_0_20px_rgba(244,63,94,0.3)] border border-rose-500/30">
                            <Image src="/images/games/valorant-icon.png" alt="Val" width={24} height={24} className="md:w-8 md:h-8" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Valorant</h2>
                            <p className="text-xs md:text-sm text-neutral-400 font-mono">MasalaSoda#DHFC</p>
                        </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 w-full md:w-auto">
                        <div className="px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-mono flex items-center gap-2 whitespace-nowrap">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                            {"online"}
                        </div>
                        <a 
                            href="https://tracker.gg/valorant/profile/riot/MasalaSoda%23DHFC/overview" 
                            target="_blank" rel="noopener noreferrer" 
                            className="px-4 py-1.5 rounded-full bg-rose-600 hover:bg-rose-500 text-xs font-bold transition-all shadow-[0_0_20px_rgba(244,63,94,0.4)] hover:scale-105"
                        >
                            Tracker.gg
                        </a>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="relative p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Rank Visual */}
                    <div className="flex flex-row items-center gap-4 md:gap-6 bg-white/5 rounded-2xl p-4 md:p-6 border border-white/5 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-20" />
                        <div className="relative w-16 h-16 md:w-20 md:h-20 shrink-0">
                            <Image src={STATS.rankImg} alt="Rank" fill className="object-contain drop-shadow-[0_0_25px_rgba(6,182,212,0.6)]" />
                        </div>
                        <div className="relative z-10">
                            <p className="text-[10px] md:text-xs text-neutral-500 uppercase tracking-widest mb-1 font-bold">Current Rank</p>
                            <p className="text-2xl md:text-3xl font-bold text-white mb-0.5">{STATS.rank}</p>
                            <p className="text-[10px] md:text-xs text-cyan-400">Top 12% (Region)</p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <StatBox label="K/D Ratio" value={STATS.kd} icon={<Gauge size={16}/>} color="text-rose-400" />
                        <StatBox label="Headshot %" value={`${STATS.hs}%`} icon={<Percent size={16}/>} color="text-rose-400" />
                        <StatBox label="Win Rate" value={`${STATS.wr}%`} icon={<Target size={16}/>} color="text-rose-400" />
                        <StatBox label="Playtime" value={`${STATS.hours}h`} icon={<Monitor size={16}/>} color="text-rose-400" />
                    </div>
                </div>
            </div>

            {/* GAME LIBRARY */}
            <div className="rounded-[2rem] border border-white/10 bg-[#0a0a0a] p-6 md:p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />
                
                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h3 className="text-xl md:text-2xl font-bold flex items-center gap-3">
                        <Dices className="text-purple-400 w-6 h-6" /> Game Library
                    </h3>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] md:text-xs text-neutral-400">
                        <UserPlus size={12} />
                        <span>Steam ID: 1030597024</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {otherGames.map((g) => (
                        <div key={g.name} className="group relative flex flex-col justify-between p-4 rounded-2xl border border-white/10 bg-white/5 overflow-hidden hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300">
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="relative z-10">
                                <h4 className="text-xs md:text-sm font-bold text-white mb-1 group-hover:text-purple-300 transition-colors truncate">{g.name}</h4>
                            </div>
                            <div className="relative z-10 flex items-center justify-between mt-3 md:mt-4">
                                <span className="text-[10px] font-mono text-neutral-400 bg-black/30 px-1.5 py-0.5 rounded">{g.hours}h</span>
                                <Gamepad2 size={14} className="text-purple-500/50 group-hover:text-purple-400 transition-colors" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
      </section>
    </main>
  );
}

/* ---------- HERO COMPONENT ---------- */
function HeroImageWithCallouts() {
  return (
    <div className="relative w-full h-full flex items-start justify-center">
      
      {/* MOBILE LIST */}
      <div className="block md:hidden w-full">
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-white/10 mb-4 shrink-0 shadow-2xl">
            <Image src="/images/games/gamingsetupnobackground.jpg" alt="Setup" fill className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]"></div>
        </div>
        <div className="grid grid-cols-1 gap-2">
            {GEAR_ITEMS.map((item, i) => (
                <a key={i} href={item.href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-2.5 rounded-lg bg-white/5 border border-white/10 active:bg-white/10">
                    <item.icon size={14} className="text-rose-400 shrink-0" />
                    <span className="text-xs font-bold text-white flex-1 truncate">{item.label}</span>
                    <ExternalLink size={12} className="text-neutral-600" />
                </a>
            ))}
        </div>
      </div>

      {/* DESKTOP IMAGE */}
      <motion.div
        initial="hidden" animate="show"
        className="hidden md:block relative w-full max-w-4xl aspect-[16/9] max-h-[60vh] [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]"
      >
        <Image
          src="/images/games/gamingsetupnobackground.jpg"
          alt="Gaming setup"
          fill
          className="object-contain drop-shadow-2xl"
          priority
        />
        {GEAR_ITEMS.map((it, i) => (
          <Callout key={i} {...it} i={i} />
        ))}
      </motion.div>
    </div>
  );
}

function Callout({ label, href, icon: Icon, x, y, side = "right", i }) {
  const reach = 100; 
  const pad = 10; const nub = 6; const gap = 8;
  const lineLen = reach - pad - nub - gap;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 + (i * 0.1), duration: 0.4 }}
      className="absolute z-20"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <span className="absolute -translate-x-1/2 -translate-y-1/2 block h-2.5 w-2.5 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.8)] animate-pulse" />
      <span className="absolute top-1/2 h-px bg-white/40" style={{ width: `${lineLen}px`, transform: "translateY(-50%)", left: side === "right" ? `${pad}px` : undefined, right: side === "left" ? `${pad}px` : undefined }} />

      <a
        href={href} target="_blank" rel="noopener noreferrer"
        className="absolute -translate-y-1/2 whitespace-nowrap rounded-full border border-white/10 bg-black/90 px-3 py-1.5 text-[10px] font-medium shadow-xl backdrop-blur-md flex items-center gap-2 hover:border-rose-500 hover:text-rose-400 hover:scale-105 transition-all duration-200"
        style={{ left: side === "right" ? `${pad + lineLen + nub}px` : undefined, right: side === "left" ? `${pad + lineLen + nub}px` : undefined, top: "50%", transform: "translateY(-50%)" }}
      >
        <Icon size={12} />
        <span>{label}</span>
      </a>
    </motion.div>
  );
}

function StatBox({ label, value, icon, color }) {
    return (
        <div className="bg-white/5 rounded-xl p-3 border border-white/5 flex flex-col justify-between group hover:border-white/20 hover:bg-white/10 transition-all duration-300">
            <div className={`mb-2 ${color} opacity-80 group-hover:opacity-100 transition-opacity`}>{icon}</div>
            <div>
                <p className="text-lg md:text-xl font-bold text-white tracking-tight">{value}</p>
                <p className="text-[9px] md:text-[10px] text-neutral-400 uppercase tracking-widest font-semibold mt-0.5">{label}</p>
            </div>
        </div>
    )
}
