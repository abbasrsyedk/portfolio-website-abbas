"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaInstagram } from "react-icons/fa";

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

/* ===== Full page component (desktop exactly as your stable version, improved mobile behaviour) ===== */
export default function TravelPage() {
  const sectionRefs = {
    gear: useRef(null), // desktop hero ref
    gearMobile: useRef(null), // mobile hero ref
    bike: useRef(null),
    map: useRef(null),
  };

  const [active, setActive] = useState("gear");
  const [headerOffset, setHeaderOffset] = useState(64);

  // Robust header measurement + set scrollPaddingTop for anchors
  useEffect(() => {
    function measureHeader() {
      const headerEl =
        document.querySelector("header") ||
        document.querySelector("nav") ||
        document.querySelector(".top-nav") ||
        document.querySelector(".navbar") ||
        document.querySelector(".site-header");

      const safetyGap = 12; // tweak up to 20-28 for big notches / browser chrome if needed
      const raw = headerEl ? Math.ceil(headerEl.getBoundingClientRect().height) : 64;
      const h = raw + safetyGap;
      setHeaderOffset(h);

      document.documentElement.style.scrollPaddingTop = `${h}px`;
      document.documentElement.style.setProperty("--header-height", `${h}px`);
    }

    measureHeader();
    window.addEventListener("resize", measureHeader);
    window.addEventListener("orientationchange", measureHeader);
    return () => {
      window.removeEventListener("resize", measureHeader);
      window.removeEventListener("orientationchange", measureHeader);
    };
  }, []);

  // Intersection observer to update `active` for nav highlight
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

  // scrollTo helper: centers target and accounts for header height (header-safe)
  const scrollTo = (refName) => {
    setActive(refName);

    let el;
    if (refName === "gear") {
      el = sectionRefs.gear.current || sectionRefs.gearMobile.current;
    } else {
      el = sectionRefs[refName]?.current;
    }
    if (!el) return;

    // compute a target that centers element while factoring a portion of header offset
    const headerPad = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-height")) || headerOffset || 64;

    // center the element but shift it up by half the header so the header doesn't cover it
    const elRect = el.getBoundingClientRect();
    const elCenterY = elRect.top + window.scrollY + elRect.height / 2;
    const targetY = elCenterY - window.innerHeight / 2 - headerPad / 4; // small offset so header doesn't block center

    window.scrollTo({ top: Math.max(0, Math.round(targetY)), behavior: "smooth" });
  };

  const hoverGlow = "hover:[text-shadow:0_0_10px_currentColor]";

  return (
    <div className="w-full relative overflow-x-hidden bg-neutral-900 min-h-screen">
      {/* ===== Left floating sidebar (desktop only) ===== */}
      <div className="hidden md:flex fixed left-6 top-1/2 -translate-y-1/2 flex flex-col gap-8 z-50">
        <button onClick={() => scrollTo("gear")} className={`p-3 rounded-full transition-all ${active === "gear" ? "bg-blue-500 shadow-lg shadow-blue-400/70" : "bg-neutral-800 hover:bg-neutral-700"}`}>
          <Image src="/icons/helmet.png" alt="helmet" width={52} height={52} />
        </button>

        <button onClick={() => scrollTo("bike")} className={`p-3 rounded-full transition-all ${active === "bike" ? "bg-blue-500 shadow-lg shadow-blue-400/70" : "bg-neutral-800 hover:bg-neutral-700"}`}>
          <Image src="/icons/motorcycle.png" alt="bike" width={52} height={52} />
        </button>

        <button onClick={() => scrollTo("map")} className={`p-3 rounded-full transition-all ${active === "map" ? "bg-blue-500 shadow-lg shadow-blue-400/70" : "bg-neutral-800 hover:bg-neutral-700"}`}>
          <Image src="/icons/maps.png" alt="map" width={52} height={52} />
        </button>
      </div>

      {/* ===================== DESKTOP HERO (unchanged stable layout) ===================== */}
      <div className="hidden md:block">
        <section id="gear" ref={sectionRefs.gear} className="h-screen flex items-center justify-center px-6 relative">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center max-w-6xl w-full relative">
            {/* Left gear */}
            <div className="flex flex-col gap-16 text-right md:pr-6 text-lg md:text-xl relative z-10">
              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                <p className="text-gray-400 text-sm md:text-base">Helmet</p>
                <h3 className="font-semibold text-blue-400">
                  <a href="https://nhkhelmet.com/k5r/" target="_blank" rel="noopener noreferrer" className={hoverGlow}>NHK K5R</a> &nbsp;|&nbsp;
                  <a href="https://smkhelmets.com/helmet/full-face-helmets/typhoon/typhoon-solid/" target="_blank" rel="noopener noreferrer" className={hoverGlow}>SMK Typhoon</a>
                </h3>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }}>
                <p className="text-gray-400 text-sm md:text-base">Shoes</p>
                <h3 className="font-semibold text-green-400">
                  <a href="https://clanshoes.com/products/snkr-se" target="_blank" rel="noopener noreferrer" className={hoverGlow}>Clan SNKR-SE</a>
                </h3>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.6 }}>
                <p className="text-gray-400 text-sm md:text-base">Luggage</p>
                <h3 className="font-semibold text-yellow-400">
                  <a href="https://amzn.in/d/btvrmHW" target="_blank" rel="noopener noreferrer" className={hoverGlow}>ViaTerra Claw</a> &nbsp;|&nbsp;
                  <a href="https://amzn.in/d/5yNP9Ux" target="_blank" rel="noopener noreferrer" className={hoverGlow}>Guardian Gears</a>
                </h3>
              </motion.div>
            </div>

            {/* Center column (heading, image, instagram) */}
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="relative flex flex-col items-center col-span-1">
              <h1 className="text-center text-4xl md:text-5xl font-bold text-white mb-6 -mt-6" style={{ textShadow: "0 0 20px rgba(255,255,255,0.6)" }}>
                Life in motion
              </h1>

              <div className="w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg shadow-blue-500/30">
                <Image src="/images/others/RiderImage.jpeg" alt="Rider" width={800} height={800} quality={100} className="object-cover w-full h-full" />
              </div>

              <a href="https://www.instagram.com/abbasolutelynot/" target="_blank" rel="noopener noreferrer" className="mt-12 flex items-center gap-2 text-lg font-medium text-pink-400 hover:[text-shadow:0_0_12px_rgba(236,72,153,0.9)]">
                <FaInstagram className="text-lg" />
                <span>@abbasolutelynot</span>
              </a>
            </motion.div>

            {/* Right gear */}
            <div className="flex flex-col gap-16 md:pl-6 text-lg md:text-xl relative z-10">
              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
                <p className="text-gray-400 text-sm md:text-base">Jacket</p>
                <h3 className="font-semibold text-purple-400">
                  <a href="https://amzn.in/d/4cpvC62" target="_blank" rel="noopener noreferrer" className={hoverGlow}>Riding Jacket</a>
                </h3>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.3 }}>
                <p className="text-gray-400 text-sm md:text-base">Riding Pants</p>
                <h3 className="font-semibold text-orange-400">
                  <a href="https://rynoxgear.com/collections/air-gt-collection-2/products/rynox-air-gt-riding-pant" target="_blank" rel="noopener noreferrer" className={hoverGlow}>Rynox Air GT</a> &nbsp;|&nbsp;
                  <a href="https://rynoxgear.com/products/h2go-pro-rain-pants-black-hiviz-green" target="_blank" rel="noopener noreferrer" className={hoverGlow}>H2GO Pro</a>
                </h3>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.6 }}>
                <p className="text-gray-400 text-sm md:text-base">Gloves</p>
                <h3 className="font-semibold text-pink-400">
                  <a href="https://amzn.in/d/gnNX03w" target="_blank" rel="noopener noreferrer" className={hoverGlow}>Riding Gloves</a>
                </h3>
              </motion.div>
            </div>
          </div>
        </section>
      </div>

      {/* ===================== MOBILE HERO (fits viewport, colored edge, no overlap) ===================== */}
      <div className="block md:hidden">
        <section
          id="gear-mobile"
          ref={sectionRefs.gearMobile}
          style={{
            minHeight: `calc(100vh - ${headerOffset}px)`,
            paddingTop: `${Math.max(headerOffset, 56)}px`,
          }}
          className="flex flex-col justify-between items-center px-6 py-4"
        >
          {/* Top: heading */}
          <div className="w-full flex justify-center">
            <h1 className="text-2xl font-semibold text-white">Life in motion</h1>
          </div>

          {/* Middle: image + instagram */}
          <div className="flex flex-col items-center gap-3">
            <div
              className="rounded-full overflow-hidden"
              style={{
                width: "46vw",
                height: "46vw",
                maxWidth: 240,
                maxHeight: 240,
                minWidth: 160,
                minHeight: 160,
                borderRadius: "9999px",
                border: "4px solid rgba(59,130,246,1)",
                boxShadow: "0 6px 22px rgba(59,130,246,0.18), 0 0 12px rgba(59,130,246,0.22)",
                overflow: "hidden",
              }}
            >
              <Image src="/images/others/RiderImage.jpeg" alt="Rider" width={800} height={800} quality={90} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
            </div>

            <a href="https://www.instagram.com/abbasolutelynot/" target="_blank" rel="noopener noreferrer" className="mt-1 inline-flex items-center gap-2 text-base font-medium text-pink-400" style={{ transition: "text-shadow 160ms ease" }} onMouseEnter={(e) => (e.currentTarget.style.textShadow = "0 0 12px rgba(236,72,153,0.85)")} onMouseLeave={(e) => (e.currentTarget.style.textShadow = "0 0 0 rgba(0,0,0,0)")}>
              <FaInstagram className="text-base text-pink-400" />
              <span>@abbasolutelynot</span>
            </a>
          </div>

          {/* Bottom: two-column gear list (left / right aligned) */}
          <div className="w-full max-w-md mx-auto">
            <div className="grid grid-cols-2 gap-x-6 gap-y-3">
              {/* Column 1 */}
              <div className="text-left space-y-2">
                <p className="text-gray-400 text-xs">Helmet</p>
                <a href="https://nhkhelmet.com/k5r/" target="_blank" rel="noopener noreferrer" className="block text-blue-400 font-semibold text-lg">NHK K5R</a>
                <a href="https://smkhelmets.com/helmet/full-face-helmets/typhoon/typhoon-solid/" target="_blank" rel="noopener noreferrer" className="block text-blue-400 font-semibold text-lg">SMK Typhoon</a>

                <p className="mt-2 text-gray-400 text-xs">Shoes</p>
                <a href="https://clanshoes.com/products/snkr-se" target="_blank" rel="noopener noreferrer" className="block text-green-400 font-semibold text-lg">Clan SNKR-SE</a>

                <p className="mt-2 text-gray-400 text-xs">Luggage</p>
                <a href="https://amzn.in/d/btvrmHW" target="_blank" rel="noopener noreferrer" className="block text-yellow-400 font-semibold text-lg">ViaTerra Claw</a>
              </div>

              {/* Column 2 */}
              <div className="text-right space-y-2">
                <p className="text-gray-400 text-xs">Jacket</p>
                <a href="https://amzn.in/d/4cpvC62" target="_blank" rel="noopener noreferrer" className="block text-purple-400 font-semibold text-lg">Riding Jacket</a>

                <p className="mt-2 text-gray-400 text-xs">Riding Pants</p>
                <a href="https://rynoxgear.com/collections/air-gt-collection-2/products/rynox-air-gt-riding-pant" target="_blank" rel="noopener noreferrer" className="block text-orange-400 font-semibold text-lg">Rynox Air GT</a>
                <a href="https://rynoxgear.com/products/h2go-pro-rain-pants-black-hiviz-green" target="_blank" rel="noopener noreferrer" className="block text-orange-400 font-semibold text-lg">H2GO Pro</a>

                <p className="mt-2 text-gray-400 text-xs">Gloves</p>
                <a href="https://amzn.in/d/gnNX03w" target="_blank" rel="noopener noreferrer" className="block text-pink-400 font-semibold text-lg">Riding Gloves</a>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ===================== BIKE SECTION (auto height on mobile; constrained image height) ===================== */}
      {/* ===================== BIKE SECTION (auto height on mobile; centered on desktop) ===================== */}
<section
  id="bike"
  ref={sectionRefs.bike}
  className="h-auto md:h-screen flex flex-col items-center md:justify-center justify-start px-6 py-8"
>
  <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }} className="w-full max-w-4xl">
    <div className="w-full overflow-hidden rounded-xl shadow-lg mb-6" style={{ height: "min(40vh, 380px)" }}>
      <Image src="/images/others/bikegood.jpg" alt="Royal Enfield Hunter 350" width={1600} height={900} quality={90} className="object-cover w-full h-full" />
    </div>

    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">Royal Enfield Hunter 350</h2>

    <div className="grid grid-cols-2 gap-6">
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


      {/* ===================== MAP SECTION (responsive height) ===================== */}
      <section id="map" ref={sectionRefs.map} className="h-auto md:h-screen flex flex-col items-center justify-center px-6 py-8">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-3xl md:text-4xl font-bold text-white mb-10">
          Places I’ve Been
        </motion.h2>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="relative w-full max-w-3xl rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,255,100,0.4)] mb-12">
          <Image src="/images/others/indiamap.png" alt="India Travel Map" width={1200} height={900} quality={100} className="object-contain w-full h-auto" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} className="bg-neutral-900 rounded-xl p-6 shadow-md border border-neutral-800 max-w-lg w-full text-center">
          <h3 className="text-xl font-semibold text-green-400 mb-4">Most Scenic Routes</h3>
          <ul className="text-gray-300 space-y-2">
            <li>Mysore → Ooty (via Bandipur Tiger Reserve & Masinagudi)</li>
            <li>Ooty → Wayanad</li>
          </ul>
        </motion.div>
      </section>
    </div>
  );
}
