"use client";

import { motion } from "framer-motion";

export default function Layout({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto px-6 py-12"
    >
      {children}
    </motion.main>
  );
}
