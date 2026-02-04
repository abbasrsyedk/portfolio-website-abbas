"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function Cursor() {
  const [cursorVariant, setCursorVariant] = useState("default");
  const shouldReduceMotion = useReducedMotion();
  
  // 1. Mouse Values (Raw inputs)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Physics (Exact copy of your original smooth settings)
  const springConfig = shouldReduceMotion
    ? { damping: 1000, stiffness: 1000 }
    : { damping: 25, stiffness: 700 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  // 3. Track Mouse Position
  useEffect(() => {
    const moveCursor = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [mouseX, mouseY]);

  // 4. Handle Hovers (The "Smart" part)
  useEffect(() => {
    const handleMouseOver = (e) => {
      // Checks if the element (or its parent) is a link, button, or has 'data-hover' attribute
      const target = e.target;
      const isClickable = 
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") || 
        target.closest("button") ||
        target.closest("[data-hover]"); // Allows manual override

      setCursorVariant(isClickable ? "text" : "default");
    };
    
    window.addEventListener("mouseover", handleMouseOver);
    return () => window.removeEventListener("mouseover", handleMouseOver);
  }, []);

  // 5. Variants (Switched back to SCALE instead of width/height for performance)
  const variants = shouldReduceMotion
    ? {
        default: { scale: 1, backgroundColor: "#ffffff" },
        text: { scale: 1, backgroundColor: "#ffffff" },
      }
    : {
        default: {
          scale: 1,
          backgroundColor: "#ffffff",
        },
        text: {
          scale: 3.5, // Grow 3.5x size
          backgroundColor: "#ffffff",
        },
      };

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%", // Centers the cursor on the mouse
        translateY: "-50%"
      }}
      variants={variants}
      animate={cursorVariant}
      // Removing the transition prop here lets the spring values handle the movement, 
      // and default linear interpolation handle the scale. Snappier.
    />
  );
}
