"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Globe, Gamepad2, Book } from "lucide-react";

/**
 * Slower, smoother entry + neon-outline hover.
 */

const cards = [
  {
    title: "Travel",
    href: "/hobbies/travel",
    icon: <Globe className="w-7 h-7" />,
    // Accent classes (explicit for Tailwind)
    ring: "hover:ring-blue-500/40 focus-visible:ring-blue-500/40",
    shadow: "hover:shadow-[0_0_36px_rgba(59,130,246,0.12)]",
    gradient: "from-blue-900/30 via-blue-800/20",
    border: "border-blue-500",
    accentText: "text-blue-400",
  },
  {
    title: "Gaming",
    href: "/hobbies/gaming",
    icon: <Gamepad2 className="w-7 h-7" />,
    ring: "hover:ring-orange-500/35 focus-visible:ring-orange-500/35",
    shadow: "hover:shadow-[0_0_36px_rgba(249,115,22,0.12)]",
    gradient: "from-orange-900/30 via-orange-700/20",
    border: "border-neutral-700",
    accentText: "text-orange-400",
  },
  {
    title: "Reading",
    href: "/hobbies/reading",
    icon: <Book className="w-7 h-7" />,
    ring: "hover:ring-green-500/35 focus-visible:ring-green-500/35",
    shadow: "hover:shadow-[0_0_36px_rgba(34,197,94,0.12)]",
    gradient: "from-green-900/30 via-green-700/20",
    border: "border-neutral-700",
    accentText: "text-green-400",
  },
];

// slowed entry + stagger
const ENTRY_DURATION = 1.3; // slower entrance
const ENTRY_EASE = [0.22, 0.61, 0.36, 1];
const STAGGER = 0.22;

// CountUp timing: start after part of entry so it doesn't race
const COUNTUP_DELAY = ENTRY_DURATION * 0.2;
const COUNTUP_DURATION = 2;

export default function Hobbies() {
  return (
    <main className="relative px-4 min-h-[100svh] flex flex-col">
      {/* top spacer to breathe under navbar */}
      <div className="grow basis-[8vh]" />

      <section className="w-full max-w-7xl mx-auto">
        {/* header */}
        <header className="text-center mb-10 lg:mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent">
            Beyond Work: My Passions
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            A peek into the things that keep me inspired, curious, and full of life.
          </p>
        </header>

        {/* grid: travel hero (left 2/3) and right stack */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Travel hero — full card is a link */}
          <Link href={cards[0].href} aria-label="Open Travel" className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: ENTRY_DURATION, ease: ENTRY_EASE }}
              className={`h-96 relative rounded-2xl ${cards[0].border} bg-neutral-900 shadow-md overflow-hidden transform-gpu will-change-transform
                ${cards[0].ring} ${cards[0].shadow} transition-colors duration-300 focus-visible:outline-none focus-visible:ring-4`}
            >
              {/* explicit glow gradient (Tailwind classes kept literal) */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cards[0].gradient} to-transparent blur-3xl transition-opacity duration-350 ease-[cubic-bezier(0.22,0.61,0.36,1)]`}
                aria-hidden
              />

              {/* centered content */}
              <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
                <div className={`flex items-center gap-2 ${cards[0].accentText} mb-4`}>
                  {cards[0].icon}
                  <h2 className="text-2xl font-semibold tracking-wide">{cards[0].title}</h2>
                </div>

                <h3 className="text-5xl font-extrabold mb-3 flex items-center gap-2 justify-center">
                  <span className="text-white">
                    <CountUp
                      end={36000}
                      duration={COUNTUP_DURATION}
                      delay={COUNTUP_DELAY}
                      separator=","
                    />
                  </span>
                  <span className={`${cards[0].accentText}`}>kms ridden 🏍️</span>
                </h3>
                <p className="text-gray-300 text-base italic mb-6">
                  on a Royal Enfield Hunter 350 — a love-hate relationship
                </p>

                <p className="text-gray-400 text-base italic border-t border-gray-700 pt-4 max-w-xl">
                  "No matter how slow you ride, you're still ahead of those who never left home."
                </p>
              </div>
            </motion.div>
          </Link>

          {/* Right column stack */}
          <div className="flex flex-col gap-8">
            {cards.slice(1).map((c, idx) => (
              <Link key={c.title} href={c.href} aria-label={`Open ${c.title}`} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: ENTRY_DURATION,
                    ease: ENTRY_EASE,
                    delay: STAGGER * (idx + 1),
                  }}
                  // No scale on hover — neon outline + soft shadow only
                  className={`h-44 relative flex items-center justify-center rounded-2xl ${c.border} bg-neutral-900 shadow-md overflow-hidden transform-gpu will-change-transform
                    ${c.ring} ${c.shadow} transition-colors duration-300 focus-visible:outline-none focus-visible:ring-4`}
                >
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${c.gradient} to-transparent blur-2xl transition-opacity duration-350 ease-[cubic-bezier(0.22,0.61,0.36,1)]`}
                    aria-hidden
                  />
                  <div className={`relative z-10 flex items-center gap-2 ${c.accentText}`}>
                    {c.icon}
                    <h2 className="text-xl font-semibold tracking-wide">{c.title}</h2>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* bottom spacer to balance vertical centering */}
      <div className="grow basis-[10vh]" />
    </main>
  );
}
