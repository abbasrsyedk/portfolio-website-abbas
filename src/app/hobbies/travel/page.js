"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
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
  // --- CURSOR LOGIC ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 1000, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 1000, damping: 50 });

  function handleMouseMove({ clientX, clientY }) {
    x.set(clientX);
    y.set(clientY);
  }

  const [cursorVariant, setCursorVariant] = useState("default");
  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

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
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const id = entry.target.id === "gear-mobile" ? "gear" : entry.target.id;
            setActive(id);
          }
        });
      },
      { threshold: [0.5] }
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

  const hoverGlow = "hover:[text-shadow:0_0_10px_currentColor] transition-all";

  return (
    <main 
      onMouseMove={handleMouseMove}
      className="w-full relative overflow-x-hidden bg-[#050505] min-h-screen text-white cursor-none"
    >
      
      {/* 1. GLOBAL BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>

      {/* 2. CUSTOM CURSOR */}
      <motion.div 
        className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block"
        style={{ x: mouseXSpring, y: mouseYSpring, translateX: "-50%", translateY: "-50%" }}
        variants={{ default: { scale: 1 }, text: { scale: 3.5 } }}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* 3. HEADER */}
      <Header textEnter={textEnter} textLeave={textLeave} />

      {/* ===== LEFT FLOATING SIDEBAR ===== */}
      <div className="hidden md:flex fixed left-10 top-1/2 -translate-x-1/2 flex flex-col gap-8 z-40">
        <button 
            onClick={() => scrollTo("gear")} 
            onMouseEnter={textEnter} onMouseLeave={textLeave}
            className={`p-3 rounded-full transition-all border border-white/10 ${active === "gear" ? "bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-110" : "bg-neutral-900 hover:bg-neutral-800"}`}
        >
          <Image src="/icons/helmet.png" alt="helmet" width={42} height={42} />
        </button>

        <button 
            onClick={() => scrollTo("bike")} 
            onMouseEnter={textEnter} onMouseLeave={textLeave}
            className={`p-3 rounded-full transition-all border border-white/10 ${active === "bike" ? "bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-110" : "bg-neutral-900 hover:bg-neutral-800"}`}
        >
          <Image src="/icons/motorcycle.png" alt="bike" width={42} height={42} />
        </button>

        <button 
            onClick={() => scrollTo("map")} 
            onMouseEnter={textEnter} onMouseLeave={textLeave}
            className={`p-3 rounded-full transition-all border border-white/10 ${active === "map" ? "bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.5)] scale-110" : "bg-neutral-900 hover:bg-neutral-800"}`}
        >
          <Image src="/icons/maps.png" alt="map" width={42} height={42} />
        </button>
      </div>

      {/* ===================== DESKTOP HERO ===================== */}
      <div className="hidden md:block">
        <section id="gear" ref={sectionRefs.gear} className="h-screen flex items-center justify-center px-6 relative pt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center max-w-6xl w-full relative">
            
            {/* Left gear */}
            <div className="flex flex-col gap-16 text-right md:pr-6 text-lg md:text-xl relative z-10">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-1">Helmet</p>
                <h3 className="font-bold text-blue-400 text-2xl">
                  <a href="#" onMouseEnter={textEnter} onMouseLeave={textLeave} className={hoverGlow}>NHK K5R</a> <span className="text-white/20">|</span>
                  <a href="#" onMouseEnter={textEnter} onMouseLeave={textLeave} className={hoverGlow}> SMK Typhoon</a>
                </h3>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }}>
                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-1">Shoes</p>
                <h3 className="font-bold text-green-400 text-2xl">
                  <a href="#" onMouseEnter={textEnter} onMouseLeave={textLeave} className={hoverGlow}>Clan SNKR-SE</a>
                </h3>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.6 }}>
                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-1">Luggage</p>
                <h3 className="font-bold text-yellow-400 text-2xl">
                  <a href="#" onMouseEnter={textEnter} onMouseLeave={textLeave} className={hoverGlow}>ViaTerra Claw</a>
                </h3>
              </motion.div>
            </div>

            {/* Center column */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="relative flex flex-col items-center col-span-1">
              <h1 className="text-center text-5xl font-bold text-white mb-10 tracking-tighter" style={{ textShadow: "0 0 20px rgba(255,255,255,0.3)" }}>
                Life in motion
              </h1>

              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-white/10 shadow-[0_0_60px_rgba(59,130,246,0.2)] relative z-20">
                <Image src="/images/others/RiderImage.jpeg" alt="Rider" width={800} height={800} quality={100} className="object-cover w-full h-full" />
              </div>

              <a href="https://www.instagram.com/abbasolutelynot/" target="_blank" rel="noopener noreferrer" 
                 onMouseEnter={textEnter} onMouseLeave={textLeave}
                 className="mt-12 flex items-center gap-2 text-lg font-medium text-pink-400 hover:text-pink-300 transition-colors"
              >
                <FaInstagram className="text-xl" />
                <span>@abbasolutelynot</span>
              </a>
            </motion.div>

            {/* Right gear */}
            <div className="flex flex-col gap-16 md:pl-6 text-lg md:text-xl relative z-10">
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-1">Jacket</p>
                <h3 className="font-bold text-purple-400 text-2xl">
                  <a href="#" onMouseEnter={textEnter} onMouseLeave={textLeave} className={hoverGlow}>Riding Jacket</a>
                </h3>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }}>
                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-1">Riding Pants</p>
                <h3 className="font-bold text-orange-400 text-2xl">
                  <a href="#" onMouseEnter={textEnter} onMouseLeave={textLeave} className={hoverGlow}>Rynox Air GT</a>
                </h3>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.6 }}>
                <p className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-1">Gloves</p>
                <h3 className="font-bold text-pink-400 text-2xl">
                  <a href="#" onMouseEnter={textEnter} onMouseLeave={textLeave} className={hoverGlow}>Riding Gloves</a>
                </h3>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* ===================== MOBILE HERO ===================== */}
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
                border: "4px solid rgba(255,255,255,0.1)",
                boxShadow: "0 0 30px rgba(59,130,246,0.3)",
              }}
            >
              <Image src="/images/others/RiderImage.jpeg" alt="Rider" width={800} height={800} quality={90} className="object-cover w-full h-full" />
            </div>

            <a href="https://www.instagram.com/abbasolutelynot/" target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-2 text-base font-medium text-pink-400">
              <FaInstagram className="text-base text-pink-400" />
              <span>@abbasolutelynot</span>
            </a>
          </div>

          <div className="w-full max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              <div className="text-left space-y-2">
                <p className="text-gray-400 text-xs">Helmet</p>
                <div className="block text-blue-400 font-semibold text-lg">NHK K5R</div>
                <p className="mt-2 text-gray-400 text-xs">Shoes</p>
                <div className="block text-green-400 font-semibold text-lg">Clan SNKR-SE</div>
                <p className="mt-2 text-gray-400 text-xs">Luggage</p>
                <div className="block text-yellow-400 font-semibold text-lg">ViaTerra Claw</div>
              </div>

              <div className="text-right space-y-2">
                <p className="text-gray-400 text-xs">Jacket</p>
                <div className="block text-purple-400 font-semibold text-lg">Riding Jacket</div>
                <p className="mt-2 text-gray-400 text-xs">Riding Pants</p>
                <div className="block text-orange-400 font-semibold text-lg">Rynox Air GT</div>
                <p className="mt-2 text-gray-400 text-xs">Gloves</p>
                <div className="block text-pink-400 font-semibold text-lg">Riding Gloves</div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ===================== BIKE SECTION (Fixed Spacing) ===================== */}
      {/* FIX: Changed min-h-screen to py-20 on mobile to remove the huge gap */}
      <section id="bike" ref={sectionRefs.bike} className="py-20 md:min-h-screen flex flex-col items-center justify-center px-6 md:py-12">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="w-full max-w-4xl">
            <div className="w-full overflow-hidden rounded-xl shadow-lg mb-8 h-[300px] md:h-[450px] relative border border-white/10">
                <Image src="/images/others/bikegood.jpg" alt="Royal Enfield Hunter 350" fill className="object-cover" />
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">Royal Enfield Hunter 350</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-blue-400"><CountUp end={36000} /> km</h3>
                    <p className="text-gray-400 text-sm">Odometer</p>
                </div>
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-green-400"><CountUp end={9} /></h3>
                    <p className="text-gray-400 text-sm">Bike Road Trips</p>
                </div>
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-orange-400"><CountUp end={2613} /> km</h3>
                    <p className="text-gray-400 text-sm">Longest Ride</p>
                </div>
                <div className="text-center">
                    <h3 className="text-2xl font-bold text-pink-400"><CountUp end={1652} /></h3>
                    <p className="text-gray-400 text-sm">Since</p>
                </div>
            </div>
        </motion.div>
      </section>

      {/* ===================== MAP SECTION (Fixed Spacing) ===================== */}
      {/* FIX: Changed min-h-screen to py-20 on mobile */}
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