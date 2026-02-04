

import { motion } from "framer-motion";
import { Wrench, Zap } from "lucide-react";

export default function DevelopmentBanner() {
  return (
    <motion.div
      // Animation: Slide down from the top slightly after load
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
      
      // Styling: Fixed at top, dark theme, slightly transparent
      className="fixed top-0 left-0 right-0 z-[100] p-2 md:p-1.5 bg-black/80 border-b-2 border-emerald-500/50 backdrop-blur-sm shadow-xl text-white pointer-events-none"
    >
      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <Wrench className="w-4 h-4 mr-2 text-yellow-400 animate-spin-slow hidden sm:block" />
        <p className="text-xs md:text-sm font-semibold text-center tracking-wide text-neutral-200">
          **Code in Progress!** We're still hammering out the final features. Expect minor bugs or fresh paint.
        </p>
        <Zap className="w-4 h-4 ml-2 text-emerald-400 hidden sm:block" />
      </div>
    </motion.div>
  );
}