"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import playlists from "@/data/music.js";

/**
 * Spotlight Grid + Bottom Dock (single iframe)
 * - Top area: responsive grid of playlist cards (thumbnail + name)
 * - Clicking a card moves it into a spotlight row above the grid
 * - The rest reorder smoothly using Framer Motion layout animations
 * - Bottom dock is fixed and shows a single-track embed when available (p.track),
 *   otherwise falls back to the playlist embed
 * - All JS (no TS). Works with optional p.cover (Spotify i.scdn.co allowed in next.config.js)
 */

const DOCK_HEIGHT = 160; // compact height for track embed

function toPublicUrl(embedUrl) {
  try { return new URL(embedUrl.replace("/embed/", "/")).toString(); } catch { return embedUrl; }
}

export default function MusicSpotlightDock() {
  const [active, setActive] = useState(playlists[0] ?? null);

  // Persist selection
  useEffect(() => {
    try {
      const saved = localStorage.getItem("music-spotlight-active");
      if (saved) {
        const found = playlists.find((p) => p.name === saved);
        if (found) setActive(found);
      }
    } catch {}
  }, []);
  useEffect(() => {
    if (active?.name) {
      try { localStorage.setItem("music-spotlight-active", active.name); } catch {}
    }
  }, [active]);

  // Derive two lists: the active item (if any) and the rest for the grid
  const rest = useMemo(() => playlists.filter((p) => p.name !== active?.name), [active]);

  return (
    <section className="mx-auto max-w-6xl px-6 pt-10" style={{ paddingBottom: DOCK_HEIGHT + 28 }}>
      <header className="mb-6">
        <h1 className="text-4xl font-bold">
          <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">Music</span>
        </h1>
        <p className="mt-2 text-white/70">Click a card to put it in the spotlight. The dock below plays a single track.</p>
      </header>

      {/* Spotlight row */}
      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.name}
            layout
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="mb-6 rounded-2xl border border-white/10 bg-white/[0.04] p-4 md:p-5"
          >
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-xl ring-1 ring-white/10">
                {active.cover ? (
                  <Image src={active.cover} alt={active.name} fill className="object-cover" />
                ) : (
                  <div className="h-full w-full bg-gradient-to-br from-white/10 to-white/0" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="truncate text-xl font-semibold">{active.name}</div>
                {active.blurb && (
                  <div className="truncate text-sm text-white/70">{active.blurb}</div>
                )}
              </div>
              <a
                className="hidden shrink-0 rounded-full border border-white/20 px-3 py-1 text-sm hover:bg-white/10 md:inline-block"
                href={toPublicUrl(active.embed)} target="_blank" rel="noopener noreferrer"
              >Open</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid of playlist cards (others) */}
      <motion.div layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {[active, ...rest].filter(Boolean).map((p) => (
          <motion.button
            key={p.name}
            layout
            onClick={() => setActive(p)}
            className={`group relative overflow-hidden rounded-2xl border text-left transition-shadow ${
              active?.name === p.name ? "border-white/25 shadow-[0_0_0_1px_rgba(255,255,255,0.15)]" : "border-white/10 hover:shadow-lg"
            }`}
            aria-pressed={active?.name === p.name}
            title={p.name}
          >
            <div className="relative h-28 w-full">
              {p.cover ? (
                <Image src={p.cover} alt={`${p.name} cover`} fill className="object-cover" />
              ) : (
                <div className="h-full w-full bg-gradient-to-br from-white/10 to-white/0" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            </div>
            <div className="flex items-center justify-between gap-2 p-3">
              <div className="truncate font-medium">{p.name}</div>
              {active?.name === p.name && (
                <span className="rounded-full border border-white/30 px-2 py-0.5 text-xs text-white/80">Spotlight</span>
              )}
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Fixed bottom dock — shows a single track if provided */}
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-neutral-950/90 backdrop-blur"
        style={{ height: DOCK_HEIGHT }}
        role="region"
        aria-label="Now Playing"
      >
        <div className="mx-auto flex h-full max-w-6xl flex-col justify-center px-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="min-w-0 pr-4">
              <div className="truncate text-sm text-white/60">Now playing</div>
              <div className="truncate text-lg font-semibold">{active?.name ?? "—"}</div>
            </div>
            <div className="hidden gap-2 sm:flex"><div className="rounded-md border border-white/10 px-2 py-1 text-xs text-white/70">Switch above</div></div>
          </div>

          <div className="w-full">
            {active ? (
              <iframe
                key={(active.track ?? active.embed) + "-dock"}
                src={active.track ?? active.embed}
                title={`${active.name} player`}
                width="100%"
                height={active.track ? DOCK_HEIGHT - 70 : 360}
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="rounded-lg"
              />
            ) : (
              <div className="grid h-[120px] place-items-center rounded-lg border border-white/10 text-white/60">Pick something to play.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
