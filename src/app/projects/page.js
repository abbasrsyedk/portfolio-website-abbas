"use client";

import { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import Header from "@/components/Header"; 
import { 
  Code2, Database, Layout, Server, Zap, Globe, 
  BarChart3, Search, Settings, ChevronRight 
} from "lucide-react";

// ==============================================================
// DATA
// ==============================================================
const ALL_PROJECTS = [
  // --- PERSONAL ---
  {
    id: 1,
    category: "personal",
    title: "Mutual Fund Dashboard",
    desc: "Track investments and NAV trends using React, Tailwind, and financial APIs.",
    tech: ["React", "Tailwind", "API"],
    icon: <BarChart3 size={22} />,
    color: "green"
  },
  {
    id: 2,
    category: "personal",
    title: "Portfolio Website",
    desc: "The site you are looking at. Built with Next.js 14, Framer Motion, and Tailwind CSS.",
    tech: ["Next.js", "Framer Motion"],
    icon: <Globe size={22} />,
    color: "green"
  },
  // --- DYNAMICS 365 ---
  {
    id: 3,
    category: "dynamics",
    title: "Dashboards Project",
    desc: "Centralized insights for teams to replace personal dashboards, improving data visibility.",
    tech: ["Dynamics 365", "XML", "Views"],
    icon: <Layout size={22} />,
    color: "orange"
  },
  {
    id: 4,
    category: "dynamics",
    title: "CSW Master Search",
    desc: "Unified search system allowing Ford Agents to query across multiple entities instantly.",
    tech: ["JavaScript", "C#", "CRM"],
    icon: <Search size={22} />,
    color: "orange"
  },
  {
    id: 5,
    category: "dynamics",
    title: "Morley Integration",
    desc: "Entity management for capturing vehicle payment details and approval workflows.",
    tech: ["Dataverse", "Forms"],
    icon: <Settings size={22} />,
    color: "orange"
  },
  {
    id: 6,
    category: "dynamics",
    title: "Ford Mexico Localization",
    desc: "Full Spanish translation implementation for Customer Service Workspace components.",
    tech: ["Localization", "Resx"],
    icon: <Globe size={22} />,
    color: "orange"
  },
  {
    id: 7,
    category: "dynamics",
    title: "Auto-Cleanup Flows",
    desc: "Automated Power Automate flows to delete obsolete records and reduce storage costs.",
    tech: ["Power Automate", "Flows"],
    icon: <Zap size={22} />,
    color: "orange"
  },
  // --- AZURE ---
  {
    id: 8,
    category: "azure",
    title: "Synapse ETL Pipelines",
    desc: "Large-scale data processing using Synapse, Data Factory, and Data Lake Gen2.",
    tech: ["Synapse", "ADF", "SQL"],
    icon: <Database size={22} />,
    color: "blue"
  },
  {
    id: 9,
    category: "azure",
    title: "Azure Metrics Dashboard",
    desc: "Monitoring dashboard for tracking pipeline health and system performance.",
    tech: ["Azure Monitor", "Dashboards"],
    icon: <Server size={22} />,
    color: "blue"
  },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "dynamics", label: "Dynamics 365" },
  { id: "azure", label: "Azure" },
  { id: "personal", label: "Personal" },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const filteredProjects = activeFilter === "all" 
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter(p => p.category === activeFilter);

  // Mouse Tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 1000, damping: 50 });
  const mouseYSpring = useSpring(y, { stiffness: 1000, damping: 50 });

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
      className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white relative overflow-x-hidden cursor-none pt-28 pb-20"
    >
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
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

      <Header textEnter={textEnter} textLeave={textLeave} />

      {/* HEADLINE */}
      <div className="text-center px-6 mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="px-4 py-1.5 border border-blue-500/30 bg-blue-500/10 rounded-full text-blue-400 text-[10px] md:text-xs font-mono tracking-widest uppercase">
                Technical Portfolio
            </span>
        </motion.div>
        
        <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            // FIX: Added Gradient Text to make it stand out
            className="text-5xl md:text-7xl font-bold mt-6 mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-500"
        >
            Key Initiatives
        </motion.h1>
        
        <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-400 max-w-lg mx-auto text-sm md:text-lg"
        >
            Enterprise solutions & personal projects.
        </motion.p>
      </div>

      {/* FILTER BAR */}
      <div className="sticky top-24 z-40 px-4 mb-10">
        <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex overflow-x-auto pb-2 md:pb-0 md:flex-wrap justify-start md:justify-center gap-2 scrollbar-hide"
        >
            {FILTERS.map((filter) => (
                <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    onMouseEnter={textEnter} 
                    onMouseLeave={textLeave}
                    className={`px-5 py-2 rounded-full text-xs md:text-sm font-bold transition-all duration-300 border whitespace-nowrap backdrop-blur-md ${
                        activeFilter === filter.id 
                        ? "bg-white text-black border-white shadow-[0_0_20px_-5px_rgba(255,255,255,0.5)]" 
                        : "bg-white/5 text-neutral-400 border-white/10 hover:bg-white/10 hover:text-white"
                    }`}
                >
                    {filter.label}
                </button>
            ))}
        </motion.div>
      </div>

      {/* UNIFIED GRID */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 px-4 md:px-20 max-w-7xl mx-auto"
      >
        <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </AnimatePresence>
      </motion.div>

    </main>
  );
}

// IMPROVED COMPONENT: Color-Coded Project Card
function ProjectCard({ project }) {
    // Define distinct themes for each category
    const colors = {
        orange: {
            text: "text-orange-400",
            bg: "from-orange-500/10 to-transparent",
            border: "border-orange-500/20",
            iconBg: "bg-orange-500/20",
            glow: "group-hover:shadow-orange-500/10"
        },
        blue: {
            text: "text-blue-400",
            bg: "from-blue-500/10 to-transparent",
            border: "border-blue-500/20",
            iconBg: "bg-blue-500/20",
            glow: "group-hover:shadow-blue-500/10"
        },
        green: {
            text: "text-emerald-400",
            bg: "from-emerald-500/10 to-transparent",
            border: "border-emerald-500/20",
            iconBg: "bg-emerald-500/20",
            glow: "group-hover:shadow-emerald-500/10"
        },
    };

    const theme = colors[project.color];

    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            // FIX: Added bg-gradient-to-br to give the whole card a subtle tint based on category
            className={`group relative p-6 md:p-8 rounded-3xl border bg-[#0a0a0a] bg-gradient-to-br ${theme.bg} hover:bg-[#111] transition-all duration-300 flex flex-col gap-4 ${theme.border} ${theme.glow} hover:shadow-2xl`}
        >
            {/* Header: Icon + Title */}
            <div className="flex items-start justify-between mb-1">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5 ${theme.iconBg} ${theme.text} group-hover:scale-110 transition-transform duration-300`}>
                    {project.icon}
                </div>
                <div className={`px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono uppercase tracking-wider ${theme.text}`}>
                    {project.category}
                </div>
            </div>

            {/* Content */}
            <div>
                <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neutral-400 transition-all">
                    {project.title}
                </h3>
                <p className="text-sm text-neutral-400 leading-relaxed line-clamp-3">
                    {project.desc}
                </p>
            </div>

            {/* Tech Stack Pills */}
            <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                {project.tech.map((t, i) => (
                    <span key={i} className="text-[10px] font-mono font-medium px-2.5 py-1 rounded-md bg-black/40 text-white/60 border border-white/10">
                        {t}
                    </span>
                ))}
            </div>
        </motion.div>
    )
}