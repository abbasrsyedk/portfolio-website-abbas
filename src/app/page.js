"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Linkedin, Mail, Code2, Briefcase, Aperture } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Header from "@/components/Header"; 

const SECTIONS = [
  {
    id: "work",
    label: "WORK",
    title: "Experience",
    subtitle: "Professional History",
    description: "Software Analyst at Ford. Dynamics 365, Azure Architecture, and Data Engineering.",
    tags: ["Ford Motor Co.", "Azure", "Data Pipelines"],
    link: "/work",
    color: "from-blue-600",
    headerColor: "text-blue-400",
    borderColor: "border-blue-500/30",
    shadowColor: "shadow-blue-500/20",
    icon: <Briefcase className="w-5 h-5" />
  },
  {
    id: "projects",
    label: "PROJECTS",
    title: "Creations",
    subtitle: "Selected Code",
    description: "Full-stack applications built with React, Next.js, and Python. Clean code & architecture.",
    tags: ["React", "Next.js", "Python"],
    link: "/projects",
    color: "from-violet-600",
    headerColor: "text-violet-400",
    borderColor: "border-violet-500/30",
    shadowColor: "shadow-violet-500/20",
    icon: <Code2 className="w-5 h-5" />
  },
  {
    id: "hobbies",
    label: "HOBBIES",
    title: "Passions",
    subtitle: "Beyond Code",
    description: "Photography, Motorcycle Riding, and UI Design. Exploring the analog world.",
    tags: ["Photography", "Riding", "Design"],
    link: "/hobbies",
    color: "from-amber-600",
    headerColor: "text-amber-400",
    borderColor: "border-amber-500/30",
    shadowColor: "shadow-amber-500/20",
    icon: <Aperture className="w-5 h-5" />
  },
  {
    id: "contact",
    label: "CONTACT",
    title: "Connect",
    subtitle: "Let's Talk",
    description: "Available for freelance opportunities and technical consulting.",
    tags: ["Email", "LinkedIn", "GitHub"],
    link: "/contact",
    color: "from-emerald-600",
    headerColor: "text-emerald-400",
    borderColor: "border-emerald-500/30",
    shadowColor: "shadow-emerald-500/20",
    icon: <Mail className="w-5 h-5" />
  },
];

export default function Home() {
  const [hoveredSection, setHoveredSection] = useState(SECTIONS[0]);
  
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
      
      {/* IMPORTANT: hideOnMobile={true} 
          This tells the header component to NOT render the bottom dock on the home page.
      */}
      <Header 
        hoveredSection={hoveredSection} 
        textEnter={textEnter} 
        textLeave={textLeave} 
        hideOnMobile={true} 
      />

      {/* BACKGROUNDS */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <motion.div className="absolute inset-0 z-0 opacity-20" style={{ background: useTransform([mouseXSpring, mouseYSpring], ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(255,255,255,0.15), transparent 80%)`) }} />
      </div>
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("https://grainy-gradients.vercel.app/noise.svg")` }}></div>

      {/* CURSOR */}
      <motion.div 
        className="fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none z-[100] mix-blend-difference hidden md:block" 
        style={{ x: mouseXSpring, y: mouseYSpring, translateX: "-50%", translateY: "-50%" }}
        variants={{ default: { scale: 1 }, text: { scale: 3.5 } }}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      />

      {/* DESKTOP LAYOUT (Hidden on Mobile) */}
      <div className="hidden md:flex min-h-screen relative z-10">
        {/* Left Card */}
        <section className="w-1/2 flex items-center justify-center p-16 perspective-1000">
          <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative w-full max-w-lg aspect-square">
             <div className="h-full w-full rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl p-10 flex flex-col justify-between overflow-hidden relative shadow-2xl">
                <div className={`absolute -top-20 -right-20 w-80 h-80 bg-gradient-to-br ${hoveredSection.color} to-black rounded-full blur-[80px] opacity-60 transition-colors duration-700`}></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6 text-white/70">
                      {hoveredSection.icon}
                      <span className="text-sm font-mono tracking-widest uppercase">{hoveredSection.subtitle}</span>
                  </div>
                  <key key={hoveredSection.id}> 
                    <h1 className="text-5xl font-bold leading-tight mb-6 animate-fade-in">{hoveredSection.title}</h1>
                    <p className="text-lg text-neutral-300 leading-relaxed mb-8">{hoveredSection.description}</p>
                  </key>
                  <div className="flex flex-wrap gap-2">
                      {hoveredSection.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 rounded-full border border-white/10 text-xs text-white/70 bg-black/30 font-mono">{tag}</span>
                      ))}
                  </div>
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

        {/* Right Navigation */}
        <section className="w-1/2 flex flex-col justify-center relative pl-10">
          <ul className="flex flex-col w-full max-w-xl">
            {SECTIONS.map((section, index) => (
              <li key={section.id} className="group relative border-b border-white/10 last:border-none" onMouseEnter={() => setHoveredSection(section)}>
                <Link 
                    href={section.link} 
                    onMouseEnter={textEnter} 
                    onMouseLeave={textLeave}
                    className="flex items-center justify-between py-10 relative z-10 group-hover:pl-4 transition-all duration-300"
                >
                    <div className="flex items-baseline gap-6">
                        <span className="font-mono text-sm text-neutral-600">0{index + 1}</span>
                        <span className={`text-6xl font-bold tracking-tighter transition-all duration-300 ${hoveredSection.id === section.id ? "text-white" : "text-neutral-800 group-hover:text-neutral-500"}`}>{section.label}</span>
                    </div>
                    <ArrowUpRight className={`transition-all duration-300 ${hoveredSection.id === section.id ? "text-white opacity-100 rotate-45" : "text-neutral-800 opacity-0"}`} size={40} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
        
        {/* Social Dock */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
           <div className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full shadow-2xl">
              <a href="#" onMouseEnter={textEnter} onMouseLeave={textLeave} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"><Github size={18}/></a>
              <a href="#" onMouseEnter={textEnter} onMouseLeave={textLeave} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"><Linkedin size={18}/></a>
              <a href="#" onMouseEnter={textEnter} onMouseLeave={textLeave} className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white"><Mail size={18}/></a>
           </div>
        </div>
      </div>

      {/* MOBILE LAYOUT (Stacked Cards) */}
      <div className="md:hidden min-h-screen p-6 pb-12 flex flex-col relative z-10 pt-12">
         <header className="flex justify-between items-start mb-8">
            <h1 className="text-2xl font-bold tracking-wider text-white">ABBAS R S K</h1>
            <div className="flex items-center gap-3">
               <a href="#" className="p-2 bg-white/5 rounded-full text-white/70 border border-white/5"><Github size={18}/></a>
               <a href="#" className="p-2 bg-white/5 rounded-full text-white/70 border border-white/5"><Mail size={18}/></a>
            </div>
         </header>

         <div className="mb-8">
            <p className="text-neutral-300 text-lg leading-relaxed">Software Analyst & <br />Full Stack Developer.</p>
         </div>

         <div className="flex flex-col gap-6 flex-1">
            {SECTIONS.map((section) => (
                <Link key={section.id} href={section.link} className="relative w-full group">
                   <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md h-56 transition-transform duration-200 active:scale-95 shadow-xl">
                      <div className={`absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br ${section.color} to-transparent opacity-40 blur-[50px]`}></div>
                      <div className="absolute inset-0 p-6 flex flex-col justify-between z-10">
                         <div className="flex justify-between items-start">
                             <div className="flex items-center gap-2 text-white/50">
                                {section.icon}
                                <span className="text-[10px] font-mono tracking-widest uppercase">{section.subtitle}</span>
                             </div>
                            <div className="p-2 bg-white/10 rounded-full text-white"><ArrowUpRight size={18} /></div>
                         </div>
                         <div>
                            <h3 className="text-3xl font-bold text-white mb-3">{section.label}</h3> 
                            <div className="flex flex-wrap gap-2">
                               {section.tags.slice(0, 3).map((tag, i) => (<span key={i} className="text-[10px] font-medium text-white/70 bg-black/20 px-2 py-1 rounded border border-white/5">{tag}</span>))}
                            </div>
                         </div>
                      </div>
                   </div>
                </Link>
            ))}
         </div>
      </div>
      <style jsx global>{`
        @keyframes fade-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        @keyframes shine { 0% { left: -100%; } 20% { left: 100%; } 100% { left: 100%; } }
        .animate-shine { animation: shine 6s infinite ease-in-out; }
      `}</style>
    </main>
  );
}