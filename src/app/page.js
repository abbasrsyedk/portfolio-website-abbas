"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ArrowUpRight, 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  Briefcase, 
  Aperture, 
  AlertTriangle, 
  X 
} from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

// ==============================================
// DATA CONFIGURATION
// ==============================================
const SECTIONS = [
  {
    id: "work",
    label: "WORK",
    title: "Experience",
    subtitle: "What I Do",
    description: "I turn complex enterprise requirements into clean, scalable systems. Currently streamlining data & architecture at Ford.",
    tags: ["Ford Motor Co.", "Azure", "Data Pipelines"],
    link: "/work",
    blobColor: "bg-blue-600", 
    headerColor: "text-blue-400",
    icon: <Briefcase className="w-5 h-5" />
  },
  {
    id: "projects",
    label: "PROJECTS",
    title: "Creations",
    subtitle: "Code & Ship",
    description: "Things I've built that I'm proud of. A collection of production-ready apps, experiments, and open-source contributions.",
    tags: ["React", "Next.js", "Python"],
    link: "/projects",
    blobColor: "bg-violet-600",
    headerColor: "text-violet-400",
    icon: <Code2 className="w-5 h-5" />
  },
  {
    id: "hobbies",
    label: "HOBBIES",
    title: "Passions",
    subtitle: "The Analog World",
    description: "Fuel for the creative engine. When I'm not coding, I'm chasing horizons on my bike or capturing moments on camera.",
    tags: ["Photography", "Riding", "Gaming", "Reading"],
    link: "/hobbies",
    blobColor: "bg-amber-500",
    headerColor: "text-amber-400",
    icon: <Aperture className="w-5 h-5" />
  },
  {
    id: "contact",
    label: "CONTACT",
    title: "Connect",
    subtitle: "Say Hello",
    description: "Have an idea or just want to chat tech? I'm always open to interesting collaborations and good conversation.",
    tags: ["Email", "LinkedIn", "GitHub", "Instagram"],
    link: "/contact",
    blobColor: "bg-emerald-600",
    headerColor: "text-emerald-400",
    icon: <Mail className="w-5 h-5" />
  },
];

export default function Home() {
  const [hoveredSection, setHoveredSection] = useState(SECTIONS[0]);
  const [showBanner, setShowBanner] = useState(true); // NEW: Banner State
  
  // --- MOUSE TRACKING ---
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 1000, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 1000, damping: 50 });

  const rotateX = useTransform(mouseYSpring, [0, typeof window !== 'undefined' ? window.innerHeight : 900], [5, -5]);
  const rotateY = useTransform(mouseXSpring, [0, typeof window !== 'undefined' ? window.innerWidth : 1400], [-5, 5]);

  function handleMouseMove({ clientX, clientY }) {
    x.set(clientX);
    y.set(clientY);
  }

  const [cursorVariant, setCursorVariant] = useState("default");
  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  return (
    <main 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black font-sans relative overflow-x-hidden cursor-none"
    >
      
      {/* ========================================
          NEW: DEVELOPMENT BANNER
          ======================================== */}
      <AnimatePresence>
        {showBanner && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ duration: 0.5, ease: "circOut" }}
            className="fixed top-0 left-0 right-0 z-[200] flex justify-center items-center px-4 py-3 bg-amber-500/10 backdrop-blur-xl border-b border-amber-500/10"
          >
            <div className="flex items-center gap-3 text-amber-400/90 text-[10px] md:text-xs font-mono uppercase tracking-widest">
              <AlertTriangle size={14} className="animate-pulse" />
              <span>Website still under Development. in the meantime feel free to explore!</span>
            </div>
            <button 
              onClick={() => setShowBanner(false)}
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className="absolute right-4 md:right-8 text-amber-400/40 hover:text-amber-400 transition-colors p-1"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BACKGROUND LAYERS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <motion.div 
            className="absolute inset-0 z-0 opacity-20"
            style={{
                background: useTransform(
                    [mouseXSpring, mouseYSpring],
                    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 80%)`
                )
            }}
         />
      </div>

      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay"
           style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}>
      </div>

      {/* CUSTOM CURSOR */}
      <motion.div 
        className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference hidden lg:block"
        style={{ x: mouseXSpring, y: mouseYSpring, translateX: "-50%", translateY: "-50%" }}
        variants={{ default: { scale: 1 }, text: { scale: 3.5 } }}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* ========================================
          DESKTOP LAYOUT
          ======================================== */}
      <div className="hidden lg:flex min-h-screen relative z-10 pt-10"> {/* Added pt-10 to account for banner */}
        
        {/* HEADER */}
        <header className="fixed top-12 left-1/2 -translate-x-1/2 z-50">
           <div className="flex items-center gap-4 px-6 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-2xl group">
              <Link href="/" onMouseEnter={textEnter} onMouseLeave={textLeave}>
                 <span className="font-extrabold text-xs tracking-widest text-white hover:text-white/80 transition-colors">
                    ABBAS R S K
                 </span>
              </Link>
              
              <div className="w-px h-3 bg-white/20"></div> 
              
              <div className="overflow-hidden h-4 flex items-center">
                <AnimatePresence mode="wait">
                    <motion.span 
                        key={hoveredSection.label}
                        initial={{ y: 15, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -15, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-mono text-[10px] tracking-widest text-white/60 uppercase"
                    >
                        {hoveredSection.label}
                    </motion.span>
                </AnimatePresence>
              </div>
           </div>
        </header>

        {/* LEFT SIDE: 3D TILT CARD */}
        <section className="w-1/2 flex items-center justify-center p-16 perspective-1000">
          <motion.div 
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full max-w-lg aspect-square"
          >
             <div className="h-full w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10 flex flex-col justify-between overflow-hidden relative shadow-2xl">
                
                {/* Stacked Blobs */}
                {SECTIONS.map((section) => (
                    <div 
                        key={section.id}
                        className={`absolute -top-20 -right-20 w-80 h-80 rounded-full blur-[80px] transition-opacity duration-700 transform-gpu ${section.blobColor} 
                        ${hoveredSection.id === section.id ? 'opacity-80 z-10' : 'opacity-0 z-0'}`}
                    ></div>
                ))}
                
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6 text-white/70">
                      {hoveredSection.icon}
                      <span className="text-sm font-mono tracking-widest uppercase">{hoveredSection.subtitle}</span>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                        key={hoveredSection.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <h1 className="text-5xl font-bold leading-tight mb-6">{hoveredSection.title}</h1>
                        <p className="text-lg text-neutral-300 leading-relaxed mb-8">
                        {hoveredSection.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                            {hoveredSection.tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1 rounded-full border border-white/10 text-xs text-white/70 bg-black/30 font-mono">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="relative z-10 mt-8">
                  <Link 
                      href={hoveredSection.link}
                      onMouseEnter={textEnter}
                      onMouseLeave={textLeave}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
                  >
                      Explore {hoveredSection.label} <ArrowUpRight size={18} />
                  </Link>
                </div>
             </div>
          </motion.div>
        </section>

        {/* RIGHT SIDE: Navigation List */}
        <section className="w-1/2 flex flex-col justify-center relative pl-10">
          <ul className="flex flex-col w-full max-w-xl">
            {SECTIONS.map((section, index) => (
              <li 
                key={section.id} 
                className="group relative border-b border-white/10 last:border-none"
              >
                <div className="flex items-center justify-between py-10 relative z-10 group-hover:pl-4 transition-all duration-300">
                    
                    {/* Text Area */}
                    <div 
                        className="flex items-baseline gap-6 cursor-pointer flex-1"
                        onClick={() => setHoveredSection(section)}
                        onMouseEnter={() => setHoveredSection(section)}
                        onMouseLeave={textLeave}
                    >
                        <span className="font-mono text-sm text-neutral-600">0{index + 1}</span>
                        <span className={`text-6xl font-bold tracking-tighter transition-all duration-300 ${
                            hoveredSection.id === section.id 
                            ? "text-white" 
                            : "text-neutral-800 group-hover:text-neutral-500"
                        }`}>
                            {section.label}
                        </span>
                    </div>
                    
                    {/* Arrow Area */}
                    <Link 
                        href={section.link}
                        onMouseEnter={textEnter}
                        onMouseLeave={textLeave}
                        className="p-4"
                    >
                        <div className={`p-3 rounded-full transition-all duration-300 ${
                           hoveredSection.id === section.id ? "bg-white text-black scale-110" : "text-neutral-800"
                        }`}>
                           <ArrowUpRight size={32} />
                        </div>
                    </Link>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* SOCIAL LINKS */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
           <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">
              <a href="https://github.com/abbasrsyedk" target="_blank" onMouseEnter={textEnter} onMouseLeave={textLeave} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"><Github size={18}/></a>
              <a href="https://www.linkedin.com/in/rskabbas/" target="_blank" onMouseEnter={textEnter} onMouseLeave={textLeave} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"><Linkedin size={18}/></a>
              <a href="mailto:rskabbas@outlook.com" onMouseEnter={textEnter} onMouseLeave={textLeave} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"><Mail size={18}/></a>
           </div>
        </div>
      </div>


      {/* ========================================
          MOBILE LAYOUT
          ======================================== */}
      <div className="lg:hidden min-h-screen p-6 pb-12 flex flex-col relative z-10 pt-20"> {/* Added pt-20 to clear banner */}
         
         <header className="flex justify-between items-start mb-8 pt-4">
            <div>
               <h1 className="text-xl font-bold tracking-wider text-white">ABBAS R S K</h1>
            </div>
            
            <div className="flex items-center gap-3">
               <a href="https://github.com/abbasrsyedk" target="_blank" className="p-2 bg-white/5 rounded-full text-white/70 border border-white/5"><Github size={18}/></a>
               <a href="mailto:rskabbas@outlook.com" className="p-2 bg-white/5 rounded-full text-white/70 border border-white/5"><Mail size={18}/></a>
            </div>
         </header>

         <div className="mb-8">
            <p className="text-neutral-300 text-lg leading-relaxed">
              Software Analyst & <br />Full Stack Developer.
            </p>
         </div>

         <div className="flex flex-col gap-6 flex-1">
            {SECTIONS.map((section, index) => (
                <Link 
                   key={section.id} 
                   href={section.link}
                   className="relative w-full group"
                >
                   <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md min-h-[220px] transition-transform duration-200 active:scale-95 shadow-xl">
                      
                      {/* TEXTURE & BLOB */}
                      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                      <div className={`absolute -top-10 -right-10 w-40 h-40 rounded-full blur-[60px] opacity-60 ${section.blobColor}`}></div>
                      
                      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                         <div className="flex justify-between items-start">
                             <div className="flex items-center gap-2 text-white/50">
                                {section.icon}
                                <span className="text-[10px] font-mono tracking-widest uppercase">{section.subtitle}</span>
                             </div>
                            <div className="p-2 bg-white/10 rounded-full text-white">
                               <ArrowUpRight size={18} />
                            </div>
                         </div>
                         
                         <div className="flex-1 flex items-center">
                            <p className="text-sm text-neutral-400 leading-relaxed line-clamp-2">
                              {section.description}
                            </p>
                         </div>
                         
                         <div>
                            <h3 className="text-3xl font-bold text-white mb-3">{section.label}</h3> 
                            <div className="flex flex-wrap gap-2">
                               {section.tags.slice(0, 3).map((tag, i) => (
                                  <span key={i} className="text-[10px] font-medium text-white/70 bg-black/20 px-2 py-1 rounded border border-white/5">
                                     {tag}
                                  </span>
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>
                </Link>
            ))}
         </div>

         <div className="mt-10 flex justify-center text-xs text-neutral-600">
            © {new Date().getFullYear()} Abbas. Based in India.
         </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </main>
  );
}