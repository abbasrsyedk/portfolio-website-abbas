"use client";

import { motion } from "framer-motion";

export default function Template({ children }) {
  return (
    <motion.div
      // Start: Invisible (no transform to preserve fixed positioning)
      initial={{ opacity: 0 }}
      
      // End: Visible
      animate={{ opacity: 1 }}
      
      // Physics: Smooth and floaty (no bounce)
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
