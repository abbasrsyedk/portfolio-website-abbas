"use client";

import { useState, useRef } from "react"; // <-- IMPORT useRef
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, Linkedin, Github, FileText, User, Code2, Heart, Download } from "lucide-react";
import Header from "@/components/Header"; 

// --- Configuration Data (No change needed here) ---
const AUDIENCE_OPTIONS = [
  { id: "recruiter", label: "I'm a Recruiter", Icon: FileText, color: "text-blue-400", accent: "ring-blue-500", border: "border-blue-500" },
  { id: "developer", label: "I'm a Fellow Developer", Icon: Code2, color: "text-emerald-400", accent: "ring-emerald-500", border: "border-emerald-500" },
  { id: "friend", label: "I Want to be Friends", Icon: Heart, color: "text-amber-400", accent: "ring-amber-500", border: "border-amber-500" },
];

const CONTACT_CONTENT = {
  recruiter: [
    { title: "Download Resume", detail: "PDF format, comprehensive history.", Icon: Download, href: "/resume.pdf", download: true, color: "text-blue-500", accent: "hover:bg-blue-600" },
    { title: "LinkedIn Profile", detail: "Professional background and endorsements.", Icon: Linkedin, href: "https://www.linkedin.com/in/rskabbas/", isExternal: true, color: "text-blue-400", accent: "hover:bg-blue-500" },
  ],
  developer: [
    { title: "GitHub Profile", detail: "See latest code, projects, and contributions.", Icon: Github, href: "https://github.com/abbasrsyedk", isExternal: true, color: "text-gray-400", accent: "hover:bg-gray-700" },
    { title: "Direct Email", detail: "For technical questions and collaboration.", Icon: Mail, href: "mailto:rskabbas@outlook.com", color: "text-orange-500", accent: "hover:bg-orange-600" },
  ],
  friend: [
    { title: "Discord Username", detail: ".abbooo (For chat and gaming)", Icon: User, href: "https://discordapp.com/users/.abbooo", isExternal: true, color: "text-violet-500", accent: "hover:bg-violet-600" },
    { title: "Instagram Profile", detail: "abs.rsk (For photography and hobbies)", Icon: User, href: "https://www.instagram.com/abs.rsk", isExternal: true, color: "text-pink-500", accent: "hover:bg-pink-600" },
  ],
};

// --- Reusable Content Link Card Component ---
const ContentLinkCard = ({ title, detail, Icon, href, isExternal, download, color, accent }) => {
    const linkProps = {
        href: href,
        ...(isExternal || download ? { target: "_blank", rel: "noopener noreferrer" } : {}),
        ...(download ? { download: "Abbas_RSK_Resume.pdf" } : {}),
    };

    return (
        <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.03 }}
            className={`group relative flex items-center p-4 md:p-5 rounded-lg border border-white/10 bg-white/5 transition-all duration-300 transform cursor-pointer overflow-hidden shadow-xl
                        hover:bg-white/10`}
            {...linkProps}
        >
            {/* Icon */}
            <div className={`p-2 rounded-full bg-black/30 mr-4 relative z-10 ${color} transition-transform group-hover:scale-[1.05]`}>
                <Icon className={`w-5 h-5 transition-colors`} aria-hidden="true" />
            </div>
            
            {/* Content */}
            <div className="relative z-10">
                <h3 className="text-md font-semibold text-white">{title}</h3>
                <p className="text-gray-400 text-xs font-mono break-all">{detail}</p>
            </div>
        </motion.a>
    );
};


export default function Contact() {
  
  const [activeAudience, setActiveAudience] = useState(null); 
  const contentRef = useRef(null); // <-- 2. CREATE REF
  const shouldReduceMotion = useReducedMotion();
  
  // --- UI/CURSOR STATE ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 1000, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 1000, damping: 50 });
  const backgroundGlow = useTransform(
    [mouseXSpring, mouseYSpring],
    ([xValue, yValue]) => `radial-gradient(600px circle at ${xValue}px ${yValue}px, rgba(255,255,255,0.15), transparent 80%)`
  );

  function handleMouseMove({ clientX, clientY }) {
    if (shouldReduceMotion) return;
    x.set(clientX);
    y.set(clientY);
  }
  // -----------------------

  // Function to scroll the content box into view
  const scrollToContent = () => {
    if (contentRef.current) {
      // Check if we are on a small screen (md is Tailwind's default 768px breakpoint)
      if (window.innerWidth < 768) {
        contentRef.current.scrollIntoView({
          behavior: shouldReduceMotion ? 'auto' : 'smooth',
          block: 'start', // Scroll to the top edge of the element
        });
      }
    }
  };


  // Determine the active accent color for the content box border
  const activeOption = AUDIENCE_OPTIONS.find(opt => opt.id === activeAudience);
  const activeBorderClass = activeOption ? `${activeOption.border}` : 'border-white/20';

  return (
    <main
      onMouseMove={shouldReduceMotion ? undefined : handleMouseMove}
      className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black font-sans relative overflow-x-hidden lg:cursor-none"
    >
      
      {/* HEADER COMPONENT */}
      <Header />

      {/* BACKGROUNDS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         {!shouldReduceMotion && (
           <motion.div className="absolute inset-0 z-0 opacity-20" style={{ background: backgroundGlow }} />
         )}
      </div>
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("/images/noise.svg")` }}></div>
      
      {/* Local cursor removed in favor of the global cursor */}


      {/* CONTACT CONTENT SECTION - Central container */}
      <section className="max-w-4xl mx-auto px-6 py-24 md:py-40 relative z-10 text-white"> 
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold mb-4 text-white tracking-tight border-b-2 border-white/10 pb-4"
        >
          Let's Connect
        </motion.h1>
        <p className="text-gray-400 mb-10 text-lg">
          Select the option below that best describes you to find the most relevant contact method.
        </p>

        {/* --- 3-CARD AUDIENCE TOGGLE SYSTEM --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {AUDIENCE_OPTIONS.map((option, index) => (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              onClick={() => {
                setActiveAudience(option.id === activeAudience ? null : option.id);
                // 4. SCROLL TO CONTENT ON CLICK
                setTimeout(scrollToContent, 100); 
              }}
              // Active state styling: Dynamic border color and strong ring
              className={`flex flex-col items-center p-6 md:p-8 rounded-2xl border-2 transition-all duration-300 transform 
                          bg-white/5 shadow-xl hover:bg-white/10 ${option.color} 
                          ${activeAudience === option.id ? `border-current ring-4 ${option.accent}` : 'border-white/10'}`}
            >
              <option.Icon className={`w-8 h-8 mb-3 ${option.color}`} />
              <span className="text-center font-semibold text-white/90">{option.label}</span>
            </motion.button>
          ))}
        </div>
        {/* --- END AUDIENCE TOGGLE SYSTEM --- */}

        {/* --- DYNAMIC CONTENT DISPLAY AREA --- */}
        <motion.div
            ref={contentRef} // <-- 3. ADD REF HERE
            layout // Smooth height transition
            className={`min-h-[150px] relative mt-10 p-6 md:p-8 rounded-2xl border-2 transition-colors duration-500 bg-white/5 shadow-2xl ${activeBorderClass}`}
        >
            <AnimatePresence mode="wait">
                {activeAudience ? (
                    <motion.div
                        key={activeAudience}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                    >
                        {CONTACT_CONTENT[activeAudience].map((item, index) => (
                            <ContentLinkCard key={index} {...item} />
                        ))}
                    </motion.div>
                ) : (
                    <motion.p
                        key="placeholder"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center text-xl text-neutral-500 p-8"
                    >
                        Click one of the cards above to reveal the best way to contact me.
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
      </section>
      
      {/* Styles for animation (kept for completeness) */}
      <style jsx global>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
      `}</style>
      
    </main>
  );
}
