"use client";

import { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { Briefcase, Code, Heart, Bike, Mail } from "lucide-react";
import Hero from "../components/hero"; // ✅ Hero component

export default function Home() {
  const bikeContainer = useRef(null);
  const bikeInstance = useRef(null);
  const iframeRef = useRef(null);
  const [bikeAnimation, setBikeAnimation] = useState(null);
  const [closestIdx, setClosestIdx] = useState(0);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  // Load bike.json dynamically
  useEffect(() => {
    fetch("/lottie/Bike.json")
      .then((res) => res.json())
      .then((data) => setBikeAnimation(data))
      .catch((err) => console.error("Failed to load Bike.json:", err));
  }, []);

  const { scrollYProgress } = useScroll();

  // ✅ Hero fades out exactly as bike fades in
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -100]);

  // Bike transforms
  const bikeOpacity = useTransform(scrollYProgress, [0.1, 0.2, 1], [0, 1, 1]);
  const bikeX = useTransform(scrollYProgress, [0.15, 1], ["0vw", "72vw"]);

  // Bike animation control
  useEffect(() => {
    if (!bikeAnimation || !bikeContainer.current) return;

    if (bikeInstance.current) bikeInstance.current.destroy();

    bikeInstance.current = lottie.loadAnimation({
      container: bikeContainer.current,
      animationData: bikeAnimation,
      renderer: "svg",
      loop: false,
      autoplay: false,
    });

    const anim = bikeInstance.current;

    const unsubscribe = scrollYProgress.on("change", (progress) => {
      const bikeJourney = Math.max(0, Math.min((progress - 0.15) / 0.85, 1));
      const frame = Math.floor(bikeJourney * anim.totalFrames);
      anim.goToAndStop(frame, true);
    });

    return () => {
      unsubscribe();
      anim.destroy();
    };
  }, [bikeAnimation, scrollYProgress]);

  // Background iframe sync
  useEffect(() => {
    function handleScroll() {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        const totalScrollable = document.body.scrollHeight - window.innerHeight;
        let normalized = window.scrollY / totalScrollable;
        normalized = Math.min(Math.max(normalized, 0), 1);

        iframeRef.current.contentWindow.postMessage(
          { type: "PARENT_SCROLL", scrollProgress: normalized },
          "*"
        );
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Checkpoints
  const checkpointData = [
    { name: "Work", icon: <Briefcase />, link: "/work" },
    { name: "Projects", icon: <Code />, link: "/projects" },
    // { name: "Life", icon: <Bike />, link: "/life" },
    { name: "Hobbies", icon: <Heart />, link: "/hobbies" },
    { name: "Contact", icon: <Mail />, link: "/contact" },
  ];

  const checkpoints = checkpointData.map((cp, idx) => {
    const pos = 0.15 + (idx * (0.75 / (checkpointData.length - 1)));
    return { ...cp, pos };
  });

  // Update closest checkpoint (with finish-line logic for Contact)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const bikeXvw = 72 * Math.max(0, Math.min((latest - 0.15) / 0.85, 1));

    if (latest >= 0.98 || bikeXvw >= 68) {
      setClosestIdx(checkpoints.length - 1); // Contact
      return;
    }

    const nearest = checkpoints.reduce((closest, cp2, i) => {
      const cpXvw = cp2.pos * 100;
      return Math.abs(bikeXvw - cpXvw) <
        Math.abs(bikeXvw - checkpoints[closest].pos * 100)
        ? i
        : closest;
    }, 0);

    setClosestIdx(nearest);
  });

  return (
    <main className="relative w-full overflow-x-hidden bg-transparent text-white">
      {/* Background iframe */}
      <div className="fixed inset-0 -z-10">
        <iframe
          ref={iframeRef}
          src="/canvabackground.html"
          className="w-full h-full border-none"
          style={{ pointerEvents: "none" }}
        />
      </div>

      {/* ✅ Hero component */}
      <Hero heroOpacity={heroOpacity} heroY={heroY} />

      {/* Journey */}
      <motion.section className="relative w-full h-[500vh]">
        {/* Bike */}
        {bikeAnimation && (
          <motion.div
            style={{ x: bikeX, opacity: bikeOpacity }}
            className="fixed bottom-[-20px] left-0 z-20"
          >
            <div ref={bikeContainer} style={{ width: 360, height: 360 }} />
          </motion.div>
        )}

        {/* Checkpoints */}
        {checkpoints.map((cp, idx) => {
          const cpOpacity = useTransform(
            scrollYProgress,
            [cp.pos - 0.1, cp.pos],
            [0, 1]
          );
          const cpScale = useTransform(
            scrollYProgress,
            [cp.pos, cp.pos + 0.05],
            [1, 1.2]
          );

          const isActive = idx === closestIdx;
          const isHovered = idx === hoveredIdx;

          return (
            <motion.div
              key={idx}
              id={cp.name.toLowerCase()}
              className="fixed flex flex-col items-center z-30"
              style={{
                left: `calc(${cp.pos * 99.7}vw)`,
                bottom: "262px",
                opacity: cpOpacity,
                scale: cpScale,
                pointerEvents: cpOpacity.get() < 0.1 ? "none" : "auto",
              }}
            >
              <Link
                href={cp.link}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center border-4 shadow-lg transition-all cursor-pointer ${
                    isActive || isHovered
                      ? "bg-green-500 border-green-400 text-white shadow-green-400/70"
                      : "bg-black border-blue-400 text-blue-400"
                  }`}
                >
                  {cp.icon}
                </div>
              </Link>
              <span className="mt-2 text-sm">{cp.name}</span>
            </motion.div>
          );
        })}
      </motion.section>
    </main>
  );
}
