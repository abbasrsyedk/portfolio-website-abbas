"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa";
import Header from "@/components/Header"; 

/* ===== CountUp helper ===== */
function CountUp({ end, duration = 2, delay = 0 }) {
  const ref = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const increment = end / (duration * 60);
          const startTimeout = setTimeout(() => {
            const handle = setInterval(() => {
              start += increment;
              if (start >= end) {
                start = end;
                clearInterval(handle);
              }
              setCount(Math.floor(start));
            }, 16);
          }, delay * 1000);

          return () => clearTimeout(startTimeout);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, delay]);

  return <span ref={ref}>{count.toLocaleString()}</span>;
}

export default function TravelPage() {
  // REMOVED: All local cursor code (useMotionValue, onMouseMove, etc.) 
  // to fix the "odd behavior". The Global Cursor now handles everything perfectly.

  // --- SCROLL LOGIC ---
  const sectionRefs = {
    gear: useRef(null), 
    gearMobile: useRef(null), 
    bike: useRef(null),
    map: useRef(null),
  };

  const [active, setActive] = useState("gear");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Lower threshold (0.3) helps detect sections earlier
          if (entry.isIntersecting && entry.intersectionRatio >= 0.3) {
            const id = entry.target.id === "gear-mobile" ? "gear" : entry.target.id;
            setActive(id);
          }
        });
      },
      // Lower threshold helps catch tall sections earlier
      { threshold: [0.3, 0.6] }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (refName) => {
    setActive(refName);
    let el;
    if (refName === "gear") {
      el = sectionRefs.gear.current || sectionRefs.gearMobile.current;
    } else {
      el = sectionRefs[refName]?.current;
    }
    if (!el) return;

    const headerPad = 100; 
    const elRect = el.getBoundingClientRect();
    const elCenterY = elRect.top + window.scrollY + elRect.height / 2;
    const targetY = elCenterY - window.innerHeight / 2 - headerPad / 4;

    window.scrollTo({ top: Math.max(0, Math.round(targetY)), behavior: "smooth" });
  };

  const hoverGlow = "hover:[text-shadow:0_0_10px_currentColor] transition-all duration-300";

  return (
    <main 
      // Removed onMouseMove & 'relative' class
      className="w-full overflow-x-hidden bg-[#050505] min-h-screen text-white cursor-none"
    >
      
      {/* 1. GLOBAL BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>

      {/* 3. HEADER */}
      <Header />

      {/* ===== LEFT FLOATING SIDEBAR (FIXED VISIBILITY) ===== */}
      <div className="hidden md:flex fixed left-10 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-[100]">
        <button 
            onClick={() => scrollTo("gear")} 
            className={`p-3 rounded-full transition-all border ${active === "gear" ? "bg-blue-600 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-110" : "bg-white/5 border-white/10 hover:bg-white/20"}`}
        >
          <Image src="/icons/helmet.png" alt="helmet" width={42} height={42} />
        </button>

        <button 
            onClick={() => scrollTo("bike")} 
            className={`p-3 rounded-full transition-all border ${active === "bike" ? "bg-blue-600 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-110" : "bg-white/5 border-white/10 hover:bg-white/20"}`}
        >
          <Image src="/icons/motorcycle.png" alt="bike" width={42} height={42} />
        </button>

        <button 
            onClick={() => scrollTo("map")} 
            className={`p-3 rounded-full transition-all border ${active === "map" ? "bg-blue-600 border-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-110" : "bg-white/5 border-white/10 hover:bg-white/20"}`}
        >
          <Image src="/icons/maps.png" alt="map" width={42} height={42} />
        </button>
      </div>

      {/* ===================== DESKTOP HERO ===================== */}
      <div className="hidden md:block">
        <section id="gear" ref={sectionRefs.gear} className="min-h-screen flex items-center justify-center px-6 relative pt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center max-w-6xl w-full relative z-10">
            
            {/* Left gear */}
            <div className="flex flex-col gap-16 text-right md:pr-6 text-lg md:text-xl">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-1">Helmet</p>
                <h3 className="font-bold text-blue-400 text-2xl flex justify-end gap-2">
                  <a href="https://nhkhelmet.com/k5r/" target="_blank" className={hoverGlow}>NHK K5R</a> 
                  <span className="text-white/20">|</span>
                  <a href="https://smkhelmets.com/helmet/full-face-helmets/typhoon/typhoon-solid/" target="_blank" className={hoverGlow}>SMK Typhoon</a>
                </h3>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }}>
                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-1">Shoes</p>
                <h3 className="font-bold text-green-400 text-2xl">
                  <a href="https://clanshoes.com/" target="_blank" className={hoverGlow}>Clan Stealth</a>
                </h3>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.6 }}>
                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-1">Luggage</p>
                <div className="flex flex-col items-end">
                   <h3 className="font-bold text-yellow-400 text-xl flex items-center gap-2 justify-end">
                     <a href="https://viaterragear.com/products/claw-tailbag" target="_blank" className={hoverGlow}>ViaTerra Claw</a>
                     <span className="text-white/20">|</span>
                     <a href="https://guardiangears.in/products/jaws-magnetic-28l-tank-bag-with-rain-cover" target="_blank" className={hoverGlow}>Jaws Tank Bag</a>
                   </h3>
                </div>
              </motion.div>
            </div>

            {/* Center column */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="relative flex flex-col items-center col-span-1">
              <h1 className="text-center text-5xl font-bold text-white mb-10 tracking-tighter" style={{ textShadow: "0 0 20px rgba(255,255,255,0.3)" }}>
                Life in motion
              </h1>

              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-blue-500 shadow-[0_0_60px_rgba(59,130,246,0.2)] relative z-20">
                <Image src="/images/others/RiderImage.jpeg" alt="Rider" width={800} height={800} quality={100} className="object-cover w-full h-full" />
              </div>

              <a href="https://www.instagram.com/abs.rsk/" target="_blank" rel="noopener noreferrer" 
                 className="mt-12 flex items-center gap-2 text-lg font-medium text-pink-400 hover:text-pink-300 transition-colors"
              >
                <FaInstagram className="text-xl" />
                <span>@abs.rsk</span>
              </a>
            </motion.div>

            {/* Right gear */}
            <div className="flex flex-col gap-16 md:pl-6 text-lg md:text-xl">
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-1">Jacket</p>
                <h3 className="font-bold text-purple-400 text-2xl">
                  <a href="https://store.royalenfield.com/en/streetwind-v2-jacket-black" target="_blank" className={hoverGlow}>STREETWIND V2</a>
                </h3>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }}>
                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-1">Riding Pants</p>
                <h3 className="font-bold text-orange-400 text-2xl">
                  <a href="https://rynoxgear.com/products/rynox-air-gt-riding-pant" target="_blank" className={hoverGlow}>Rynox Air GT</a>
                </h3>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.6 }}>
                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-1">Gloves</p>
                <h3 className="font-bold text-pink-400 text-2xl">
                  <a href="https://store.royalenfield.com/en/touring-collection/gloves" target="_blank" className={hoverGlow}>Windstorm</a>
                </h3>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* ===================== MOBILE HERO (RESTORED) ===================== */}
      <div className="block md:hidden pt-24">
        <section
          id="gear-mobile"
          ref={sectionRefs.gearMobile}
          className="flex flex-col justify-between items-center px-6 py-4 gap-8"
        >
          <div className="w-full flex justify-center">
            <h1 className="text-2xl font-semibold text-white">Life in motion</h1>
          </div>

          <div className="flex flex-col items-center gap-3">
            <div
              className="rounded-full overflow-hidden"
              style={{
                width: "60vw",
                height: "60vw",
                maxWidth: 240,
                maxHeight: 240,
                border: "4px solid rgba(59,130,246,1)",
                boxShadow: "0 0 30px rgba(59,130,246,0.3)",
              }}
            >
              <Image src="/images/others/RiderImage.jpeg" alt="Rider" width={800} height={800} quality={90} className="object-cover w-full h-full" />
            </div>

            <a href="https://www.instagram.com/abs.rsk/" target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-2 text-base font-medium text-pink-400">
              <FaInstagram className="text-base text-pink-400" />
              <span>@abs.rsk</span>
            </a>
          </div>

          <div className="w-full max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <div className="text-left space-y-2">
                {/* HELMET */}
                <p className="text-gray-400 text-xs">Helmet</p>
                <a href="https://nhkhelmet.com/k5r/" target="_blank" className="block text-blue-400 font-semibold text-lg hover:underline">NHK K5R</a>
                
                {/* SHOES */}
                <p className="mt-2 text-gray-400 text-xs">Shoes</p>
                <a href="https://clanshoes.com/" target="_blank" className="block text-green-400 font-semibold text-lg hover:underline">Clan Stealth</a>

                {/* LUGGAGE */}
                <p className="mt-2 text-gray-400 text-xs">Luggage</p>
                <a href="https://viaterragear.com/products/claw-tailbag" target="_blank" className="block text-yellow-400 font-semibold text-lg hover:underline">ViaTerra Claw</a>
              </div>

              <div className="text-right space-y-2">
                <p className="text-gray-400 text-xs">Jacket</p>
                <a href="https://store.royalenfield.com/en/streetwind-v2-jacket-black" target="_blank" className="block text-purple-400 font-semibold text-lg hover:underline">STREETWIND V2</a>

                <p className="mt-2 text-gray-400 text-xs">Riding Pants</p>
                <a href="https://rynoxgear.com/products/rynox-air-gt-riding-pant" target="_blank" className="block text-orange-400 font-semibold text-lg hover:underline">Rynox Air GT</a>

                <p className="mt-2 text-gray-400 text-xs">Gloves</p>
                <a href="https://store.royalenfield.com/en/touring-collection/gloves" target="_blank" className="block text-pink-400 font-semibold text-lg hover:underline">Windstorm</a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ===================== BIKE SECTION ===================== */}
      <section id="bike" ref={sectionRefs.bike} className="py-20 md:min-h-screen flex flex-col items-center justify-center px-6 md:py-12">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="w-full max-w-4xl relative z-10">
            <div className="w-full overflow-hidden rounded-xl shadow-lg mb-8 h-[300px] md:h-[450px] relative border border-white/10">
                <Image src="/images/others/bikegood.jpg" alt="Royal Enfield Hunter 350" fill className="object-cover" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Royal Enfield Hunter 350</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-blue-400"><CountUp end={40000} /> km</h3>
                    <p className="text-gray-400 text-sm">Odometer</p>
                </div>
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-green-400"><CountUp end={10} /></h3>
                    <p className="text-gray-400 text-sm">Bike Road Trips</p>
                </div>
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-orange-400"><CountUp end={2613} /> km</h3>
                    <p className="text-gray-400 text-sm">Longest Ride</p>
                </div>
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-pink-400"><CountUp end={2} /></h3>
                    <p className="text-gray-400 text-sm">Years of Riding</p>
                </div>
            </div>
        </motion.div>
      </section>

      {/* ===================== MAP SECTION ===================== */}
      <section id="map" ref={sectionRefs.map} className="py-20 md:min-h-screen flex flex-col items-center justify-center px-6 md:py-12 relative z-10">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-3xl md:text-4xl font-bold text-white mb-10 text-center">
          Places I’ve Been
        </motion.h2>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative w-full max-w-xl rounded-2xl overflow-hidden shadow-2xl mb-12 border border-white/10">
          <Image src="/images/others/indiamap.png" alt="India Travel Map" width={1200} height={900} quality={100} className="object-contain w-full h-auto" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center">
                <h3 className="text-xl font-semibold text-green-400 mb-2">Mysore → Ooty</h3>
                <p className="text-gray-300 text-sm">via Bandipur Tiger Reserve</p>
            </div>
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl text-center">
                <h3 className="text-xl font-semibold text-emerald-400 mb-2">Ooty → Wayanad</h3>
                <p className="text-gray-300 text-sm">The Ghat Sections</p>
            </div>
        </div>
      </section>
    </main>
  );
}