"use client";

import { motion } from "framer-motion";

export default function Template({ children }) {
  return (
    <motion.div
      // Start: Invisible, Blurry, slightly zoomed out
      initial={{ opacity: 0, filter: "blur(12px)", scale: 0.98 }}
      
      // End: Visible, Clear, normal size
      animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
      
      // Physics: Smooth and floaty (no bounce)
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      
      className="w-full"
    >
      {children}
    </motion.div>
  );
}