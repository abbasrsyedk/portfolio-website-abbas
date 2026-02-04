"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Code2, Aperture, Mail, Home } from "lucide-react";

// INCREASED ICON SIZE: size={22}
const NAV_ITEMS = [
  { path: "/work", label: "Work", icon: <Briefcase size={22} />, color: "text-blue-400", border: "border-blue-500/30", shadow: "shadow-blue-500/20" },
  { path: "/projects", label: "Projects", icon: <Code2 size={22} />, color: "text-violet-400", border: "border-violet-500/30", shadow: "shadow-violet-500/20" },
  { path: "/hobbies", label: "Hobbies", icon: <Aperture size={22} />, color: "text-amber-400", border: "border-amber-500/30", shadow: "shadow-amber-500/20" },
  { path: "/contact", label: "Contact", icon: <Mail size={22} />, color: "text-emerald-400", border: "border-emerald-500/30", shadow: "shadow-emerald-500/20" },
];

const MOBILE_PAGE_TITLES = [
  { match: (path) => path === "/", label: "Home" },
  { match: (path) => path.startsWith("/work"), label: "Work" },
  { match: (path) => path.startsWith("/projects"), label: "Projects" },
  { match: (path) => path.startsWith("/contact"), label: "Contact" },
  { match: (path) => path.startsWith("/hobbies/travel"), label: "Travel" },
  { match: (path) => path.startsWith("/hobbies/gaming"), label: "Gaming" },
  { match: (path) => path.startsWith("/hobbies/reading"), label: "Reading" },
  { match: (path) => path.startsWith("/hobbies"), label: "Hobbies" },
];

export default function Header({ hoveredSection, textEnter, textLeave, hideOnMobile = false }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const activePage = NAV_ITEMS.find((item) => pathname.startsWith(item.path));
  const mobileTitle = MOBILE_PAGE_TITLES.find((entry) => entry.match(pathname))?.label || "Portfolio";
  
  const borderColor = isHome ? hoveredSection?.borderColor : activePage?.border || "border-white/10";
  const shadowColor = isHome ? hoveredSection?.shadowColor : activePage?.shadow || "shadow-white/5";

  return (
    <>
      {/* DESKTOP HEADER (Hidden on Mobile) */}
      <header className="hidden md:block fixed top-8 left-1/2 -translate-x-1/2 z-50">
        <motion.div
          layout
          className={`relative flex items-center gap-6 px-6 py-3 bg-[#0a0a0a]/80 backdrop-blur-xl border-2 rounded-full shadow-2xl transition-all duration-500 ${borderColor} ${shadowColor}`}
        >
          <Link href="/" className="relative z-10 group" onMouseEnter={textEnter} onMouseLeave={textLeave}>
            <span className="font-extrabold text-xs tracking-widest text-white group-hover:opacity-70 transition-opacity">
              ABBAS R S K
            </span>
          </Link>

          {isHome && (
              <>
                  <span className="text-lg font-mono font-light text-white/50">//</span>
                  <div className="overflow-hidden h-5 flex items-center min-w-[80px]">
                      <AnimatePresence mode="wait">
                          <motion.span
                              key={hoveredSection?.label}
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: -20, opacity: 0 }}
                              className={`font-bold text-sm tracking-widest uppercase ${hoveredSection?.headerColor}`}
                          >
                              {hoveredSection?.label || "PORTFOLIO"}
                          </motion.span>
                      </AnimatePresence>
                  </div>
              </>
          )}

          {!isHome && (
              <nav className="flex items-center gap-6 pl-4 border-l border-white/10">
                  {NAV_ITEMS.map((item) => (
                      <Link key={item.path} href={item.path} aria-current={pathname === item.path ? "page" : undefined} className="relative group" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                          <span className={`text-xs font-bold tracking-wider transition-colors ${pathname === item.path ? item.color : "text-white/50 hover:text-white"}`}>
                              {item.label}
                          </span>
                          {pathname === item.path && (
                              <motion.div layoutId="desktop-nav-dot" className={`absolute -bottom-3 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-current ${item.color}`} />
                          )}
                      </Link>
                  ))}
              </nav>
          )}
          
          <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
             <div className="absolute top-0 -left-[100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shine" />
          </div>
        </motion.div>
      </header>


      {/* MOBILE HEADER (Top Bar + Bottom Nav) */}
      {!hideOnMobile && (
        <>
          <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 block md:hidden w-[95vw] max-w-md">
            <div className="flex items-center justify-between px-4 py-2 rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 shadow-2xl">
              <Link href="/" className="text-[10px] font-extrabold tracking-[0.3em] text-white/80 hover:text-white transition-colors">
                ABBAS R S K
              </Link>
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/60">
                {mobileTitle}
              </span>
            </div>
          </header>

          <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 block md:hidden w-[95vw] max-w-md">
              <nav className="flex items-center justify-between gap-1 px-3 pt-3 rounded-2xl bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 shadow-2xl" style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}>
                <Link href="/" aria-label="Home" aria-current={pathname === "/" ? "page" : undefined} className="flex flex-col items-center gap-1 text-[10px] text-white/70">
                  <div className={`p-2 rounded-full transition-colors ${pathname === "/" ? "bg-white/10 text-white" : "text-white/50"}`}>
                    <Home size={20} />
                  </div>
                  <span>Home</span>
                </Link>

                {NAV_ITEMS.map((item) => {
                  const isActive = pathname.startsWith(item.path);
                  return (
                    <Link
                      key={item.path}
                      href={item.path}
                      aria-label={item.label}
                      aria-current={isActive ? "page" : undefined}
                      className="flex flex-col items-center gap-1 text-[10px] text-white/70"
                    >
                      <div className={`p-2 rounded-full transition-all duration-300 ${isActive ? "bg-white/10 text-white" : "text-white/50"}`}>
                        {item.icon}
                      </div>
                      <span className={isActive ? "text-white" : "text-white/50"}>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
          </div>
        </>
      )}
    </>
  );
}
