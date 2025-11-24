"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function Hero() {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/lottie/developeroutline.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data))
      .catch((err) => console.error("Failed to load Lottie JSON:", err));
  }, []);

  const { scrollYProgress } = useScroll();

  // ✅ Fade out + move up as soon as scroll starts
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.25], [0, -100]);

  return (
    <motion.section
      style={{ opacity: heroOpacity, y: heroY }}
      className="w-full h-screen flex flex-col items-center justify-center text-center 
                 bg-gradient-to-b from-orange-200 via-yellow-100 to-pink-100 
                 dark:from-neutral-900 dark:to-neutral-800 relative z-20"
    >
      {/* Lottie animation */}
      <div className="w-72 h-72 mb-4">
        {animationData && (
          <Lottie animationData={animationData} loop={false} autoplay={true} />
        )}
      </div>

      {/* ✅ Name without Bike icon */}
      <h1 className="text-5xl md:text-7xl font-bold mb-4">Abbas R S K</h1>

      {/* Subtitle */}
      <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
        No Matter how slow you ride, you're still ahead of those who never left
        home.
      </p>

      {/* Scroll hint */}
      <p className="mt-6 text-sm md:text-base text-gray-600 dark:text-gray-400 animate-bounce">
        ↓ Scroll to explore my portfolio
      </p>
    </motion.section>
  );
}
