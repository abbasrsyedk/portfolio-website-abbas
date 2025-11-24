"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "@/lib/fm-client";
import {
  Gamepad2, Headphones, Mic2, Monitor, Laptop, Keyboard, Mouse,
  Gauge, Target, Percent, ChevronDown,
} from "lucide-react";

/* --- Brand tokens --- */
const ACCENT = {
  coral:  "#ff4655",
  cyan:   "#43f1ff",
  violet: "#9a6bff",
};

/* --- External links & data --- */
const VALORANT_PROFILE_URL =
  "https://tracker.gg/valorant/profile/riot/ShutTFU%23pleas/overview?platform=pc&playlist=competitive";

const VAL_STATS = {
  rank: { current: { tier: "Platinum 3", rr: null }, peak: "Diamond 2" },
  overall: { kd: 1.06, hs: 21.5, wr: 49.7 },
  meta: {
    level: 406,
    wins: 1049,
    totalKills: 33737,
    playtimeHours: 1650,
    mostPlayedAgent: "Sova",
    topWeapon: "Vandal",
  },
  settings: {
    dpi: 800,
    sens: 0.35,
    crosshair: "0;P;h;0;f;0;0l;4;0o;2;0a;1;0f;0;1b;0",
  },
};

const steamGames = [
  { name: "Schedule 1", hours: 90 },
  { name: "The Witcher 3: Wild Hunt", hours: 77 },
  { name: "Tom Clancy's Rainbow Six Siege", hours: 1350 },
];

/* --- Framer helpers --- */
const fadeUp = (d = 0) => ({
  initial: { opacity: 0, y: 12 },
  animate : { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: d } },
});
const pop = (d = 0) => ({
  initial: { opacity: 0, scale: 0.96 },
  animate : { opacity: 1, scale: 1, transition: { duration: 0.45, ease: "easeOut", delay: d } },
});
const sectionStagger = {
  hidden: { opacity: 0, y: 12 },
  show  : { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut", staggerChildren: 0.08 } },
};
const child = { hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } };

export default function GamingPage() {
  return (
    <main className="scroll-smooth">
      {/* PAGE 1 — HERO */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="mx-auto flex h-screen max-w-6xl flex-col px-6">
          <header className="pt-24 text-center">
            <motion.h1 {...fadeUp(0.05)} className="text-4xl font-bold tracking-tight">
              Gaming <span aria-hidden>🎮</span>
            </motion.h1>
            <motion.p {...fadeUp(0.15)} className="mt-3 text-lg text-zinc-400 leading-relaxed text-balance">
              My daily driver setup—tap labels to peek the specs.
            </motion.p>
            <motion.div
              {...pop(0.25)}
              className="mx-auto mt-4 h-1 w-16 rounded-full"
              style={{ background: `linear-gradient(90deg, ${ACCENT.coral}, rgba(255,70,85,.55))` }}
            />
          </header>

          <div className="flex flex-1 items-center justify-center pb-0">
            <HeroImageWithCallouts />
          </div>

          {/* Non-clickable animated scroll hint */}
          <motion.div {...fadeUp(0.2)} className="pb-6 text-center">
            <div className="flex flex-col items-center text-zinc-400 text-xs">
              <span className="mb-1">Scroll to see what I play & how</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </div>
          </motion.div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </section>

      {/* SHIMMER DIVIDER */}
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="relative my-2 h-[3px] w-full overflow-hidden rounded-full bg-zinc-800/60">
          <span
            className="absolute inset-y-0 left-0 w-1/3 animate-[slide_2.4s_linear_infinite]"
            style={{ background: `linear-gradient(90deg, ${ACCENT.coral}, transparent)` }}
          />
        </div>
      </div>

      {/* PAGE 2 — VALORANT + STEAM */}
      <section
        id="gaming-content"
        className="
          relative min-h-screen border-t border-white/5
          bg-[linear-gradient(180deg,#0d0e10,rgba(13,14,16,0.88))]
          pt-16 md:pt-20
          scroll-mt-24
        "
      >
        {/* subtle grid */}
        <div className="absolute inset-0 -z-10 opacity-[0.12] [background-image:radial-gradient(#ffffff_1px,transparent_1px)] [background-size:22px_22px]" />
        {/* ambient radial gradients */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-40 blur-3xl"
          style={{
            background:
              `radial-gradient(80% 60% at 20% 10%, rgba(67,241,255,.12), transparent 60%),
               radial-gradient(60% 50% at 85% 20%, rgba(154,107,255,.10), transparent 60%)`,
          }}
        />

        <motion.div
          variants={sectionStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-6 md:py-8"
        >
          <motion.div variants={child} className="mb-2 flex items-center gap-3">
            <Image src="/images/games/valorant-icon.png" alt="Valorant" width={42} height={42} />
            {/* animated gradient title */}
            <h2 className="text-2xl font-bold tracking-wide">
              <span
                className="bg-[linear-gradient(90deg,#fff,rgba(255,255,255,.7),#fff)] bg-[length:200%_100%] bg-clip-text text-transparent
                           animate-[sheen_4s_linear_infinite]"
              >
                Valorant
              </span>
              <span className="text-zinc-400 font-semibold"> — SHUT TFU#PLEAS</span>
            </h2>
          </motion.div>

          <motion.div variants={child} className="flex-1">
            <ValorantShowcase />
          </motion.div>

          <motion.div variants={child}>
            <SteamStrip />
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}

/* ---------- HERO WITH CALLOUTS ---------- */
function HeroImageWithCallouts() {
  const items = [
    { label: 'LG Ultragear 27" 144Hz', icon: Monitor, x: 40, y: 22, side: "left", href: "https://amzn.in/d/c7aZY2a" },
    { label: "HP Victus (Ryzen 5 5600H, 16GB 3200MT/s)", icon: Laptop, x: 70, y: 30, side: "right", href: "https://amzn.in/d/0TDF5nq" },
    { label: "Aula F75", icon: Keyboard, x: 46, y: 73, side: "right", href: "https://amzn.in/d/4ufDvsY" },
    { label: "Logitech G304", icon: Mouse, x: 66, y: 54, side: "right", href: "https://amzn.in/d/4ufDvsY" },
    { label: "Fifine AM8T Microphone", icon: Mic2, x: 32, y: 42, side: "left", href: "https://amzn.in/d/6rVoVXV" },
    { label: "Sony WH-CH720N", icon: Headphones, x: 22, y: 67, side: "left", href: "https://amzn.in/d/iAfDEGM" },
    { label: "Kreo Mirage", icon: Gamepad2, x: 78, y: 42, side: "right", href: "https://amzn.in/d/hTFkq6r" },
  ];

  return (
    <div className="relative w-full">
      <motion.div
        initial="hidden"
        animate="show"
        className="relative mx-auto aspect-[16/9] w-[min(92vw,1000px)]"
      >
        <Image
          src="/images/games/gamingsetupnobackground.jpg"
          alt="Gaming setup illustration"
          fill
          priority
          sizes="(max-width: 1024px) 92vw, 1000px"
          className="object-contain"
        />
        {items.map((it, i) => (
          <Callout key={i} {...it} i={i} />
        ))}
      </motion.div>
    </div>
  );
}

function Callout({ label, href, icon: Icon, x, y, side = "right", i }) {
  const reach = 160;   // how far horizontally the label sits
  const pad = 10;      // gap after dot before line starts
  const nub = 6;       // little red nub diameter
  const gap = 8;       // gap between nub and label

  // total line length before the nub
  const lineLen = reach - pad - nub - gap;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.15 + Math.min(i * 0.08, 0.4),
        duration: 0.35,
        ease: "easeOut",
      }}
      className="absolute"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      {/* main red dot */}
      <span className="absolute -translate-x-1/2 -translate-y-1/2 block h-2.5 w-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,.7)]" />

      {/* connector line */}
      <span
        className="absolute top-1/2 h-0.5 bg-white/40"
        style={{
          width: `${lineLen}px`,
          transform: "translateY(-50%)",
          left: side === "right" ? `${pad}px` : undefined,
          right: side === "left" ? `${pad}px` : undefined,
        }}
      />

      {/* tiny red nub at line end */}
      <span
        className="absolute top-1/2 block rounded-full bg-rose-500"
        style={{
          width: `${nub}px`,
          height: `${nub}px`,
          transform: "translateY(-50%)",
          left: side === "right" ? `${pad + lineLen}px` : undefined,
          right: side === "left" ? `${pad + lineLen}px` : undefined,
        }}
      />

      {/* label */}
      <a
  href={href}
  target="_blank"
  rel="noopener noreferrer"
  className="absolute -translate-y-1/2 whitespace-nowrap rounded-xl border border-zinc-800 
             bg-zinc-900/90 px-3 py-2 text-xs shadow-lg backdrop-blur 
             flex items-center gap-2 select-none 
             hover:border-orange-500 hover:text-orange-400 hover:shadow-[0_0_12px_rgba(249,115,22,0.6)] 
             transition-colors duration-200"
  style={{
    left: side === "right" ? `${pad + lineLen + nub + gap}px` : undefined,
    right: side === "left" ? `${pad + lineLen + nub + gap}px` : undefined,
    top: "50%",
    transform: "translateY(-50%)",
  }}
>
  <Icon className="h-3.5 w-3.5 opacity-80" />
  <span className="font-medium">{label}</span>
</a>


    </motion.div>
  );
}


/* ---------- VALORANT SHOWCASE ---------- */
function ValorantShowcase() {
  const { rank, overall, meta, settings } = VAL_STATS;

  /* Parallax offset */
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => setOffset(window.scrollY * 0.05);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const KPIs = [
    { icon: Gauge, label: "K/D", value: overall.kd },
    { icon: Percent, label: "Headshot %", value: `${overall.hs}%` },
    { icon: Target, label: "Win Rate", value: `${overall.wr}%` },
    { label: "Playtime", value: `${meta.playtimeHours.toLocaleString()}h` },
  ];

  return (
    <div className="relative h-[68vh] min-h-[520px] overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
      {/* artwork with parallax */}
      <Image
        src="/images/games/download (1).jfif"
        alt="Valorant artwork"
        fill
        priority
        className="object-cover will-change-transform"
        style={{ transform: `translateY(${offset}px)` }}
      />
      {/* glazing + accent line */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: `linear-gradient(90deg, ${ACCENT.coral}, transparent)` }} />

      {/* crosshair + tracker */}
      <div className="absolute right-4 top-4 flex flex-wrap items-center gap-3">
        <div className="rounded-full border border-zinc-700/70 bg-zinc-900/70 px-2.5 py-1 text-[11px] text-zinc-200">
          Crosshair: <code className="font-mono text-[11px]">{settings.crosshair}</code>
          <button
            onClick={() => navigator.clipboard?.writeText(settings.crosshair)}
            className="ml-2 rounded-md border border-zinc-700 px-2 py-0.5 text-[11px] hover:bg-zinc-800"
          >
            Copy
          </button>
        </div>
        <a
          href={VALORANT_PROFILE_URL}
          target="_blank"
          rel="noreferrer"
          className="rounded-md px-3 py-1.5 text-xs font-semibold text-white shadow"
          style={{ background: `linear-gradient(90deg, ${ACCENT.coral}, #ff6a75)` }}
        >
          View on Tracker
        </a>
      </div>

      {/* rank strip with conic rings */}
      <div className="absolute left-4 bottom-24 flex items-center gap-6 rounded-xl border border-white/10 bg-black/40 px-4 py-3 backdrop-blur">
        <BadgeWithRing img="/images/games/platinum.png" title={rank.current.tier} subtitle="Current" />
        <div className="h-8 w-px bg-white/10" />
        <BadgeWithRing img="/images/games/diamond.png" title={rank.peak} subtitle="Peak" />
      </div>

      {/* KPI row (hover glow) */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-4 mb-4 rounded-xl border border-white/10 bg-black/40 p-2 backdrop-blur">
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {KPIs.map((k, i) => (
              <div
                key={i}
                className="rounded-lg border border-white/10 bg-black/30 p-2 transition-shadow duration-300 hover:shadow-[0_0_18px_-8px_rgba(67,241,255,0.35)]"
              >
                <div className="flex items-center gap-1.5 text-[11px] text-zinc-300">
                  {k.icon ? <k.icon className="h-3.5 w-3.5 opacity-80" /> : null}
                  <span>{k.label}</span>
                </div>
                <div className="mt-0.5 text-sm font-semibold text-white">{k.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* rank badge with conic glow ring */
function BadgeWithRing({ img, title, subtitle }) {
  return (
    <div className="flex items-center gap-2">
      <div className="relative grid place-items-center">
        <span
          className="pointer-events-none absolute -inset-[3px] rounded-full opacity-70 blur-[2px]"
          style={{
            background: `conic-gradient(from 0deg, ${ACCENT.cyan}, ${ACCENT.violet}, transparent 72%)`,
          }}
          aria-hidden
        />
        <Image src={img} alt="" width={36} height={36} className="relative" />
      </div>
      <div className="leading-tight">
        <div className="text-sm font-semibold text-white">{title}</div>
        <div className="text-[11px] text-zinc-300">{subtitle}</div>
      </div>
    </div>
  );
}

/* ---------- STEAM STRIP ---------- */
function SteamStrip() {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-4">
      <h3 className="mb-3 text-sm font-semibold">Steam — most played</h3>
      <ul className="flex flex-wrap gap-3">
        {steamGames.map((g) => (
          <li
            key={g.name}
            className="flex items-center justify-between rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-2
                       transition-transform duration-200 hover:-translate-y-0.5 hover:border-zinc-700"
          >
            <span className="text-sm">{g.name}</span>
            <span className="ml-3 rounded-full bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-300">{g.hours}h</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
