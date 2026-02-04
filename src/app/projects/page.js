"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header"; 
import { 
  Bell, Code2, Database, Layout, Server, Zap, Globe, 
  BarChart3, Search, Settings, Sparkles, Briefcase, ShieldCheck
} from "lucide-react";

// ==============================================================
// DATA
// ==============================================================
const ALL_PROJECTS = [
  // --- PERSONAL ---
  {
    id: 1,
    categoryId: "personal",
    categoryLabel: "Personal",
    title: "Mutual Fund Dashboard",
    desc: "Track investments and NAV trends with a clean analytics UI.",
    impact: ["Clear KPI tiles for quick decisions", "Responsive views for desktop and mobile"],
    scope: "Personal project",
    tech: ["React", "Tailwind", "Financial APIs"],
    icon: <BarChart3 size={22} />,
    color: "green"
  },
  {
    id: 2,
    categoryId: "personal",
    categoryLabel: "Personal",
    title: "Portfolio Website",
    desc: "Interactive portfolio with custom motion design and UX polish.",
    impact: ["Optimized performance and accessibility", "Distinct sections for work, projects, and hobbies"],
    scope: "Personal project",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
    icon: <Globe size={22} />,
    color: "green"
  },
  // --- DYNAMICS 365 ---
  {
    id: 3,
    categoryId: "dynamics365",
    categoryLabel: "Dynamics 365",
    title: "Dashboards Project",
    desc: "Centralized insights to replace personal dashboards and improve visibility.",
    impact: ["95+ dashboards and views", "Standardized reporting for CSW teams"],
    scope: "Enterprise delivery",
    tech: ["Dynamics 365", "Views", "XML"],
    icon: <Layout size={22} />,
    color: "blue"
  },
  {
    id: 4,
    categoryId: "dynamics365",
    categoryLabel: "Dynamics 365",
    title: "CSW Master Search",
    desc: "Unified search experience across entities for CSW agents.",
    impact: ["Primary CSW entry point", "Integrated custom connectors and flows"],
    scope: "Enterprise delivery",
    tech: ["JavaScript", "C#", "Dynamics 365"],
    icon: <Search size={22} />,
    color: "blue"
  },
  {
    id: 5,
    categoryId: "powerapps",
    categoryLabel: "Power Apps",
    title: "Morley Integration",
    desc: "Entity and workflow integration for payment capture and approvals.",
    impact: ["Reduced manual handling", "Improved data consistency"],
    scope: "Enterprise delivery",
    tech: ["Dataverse", "Power Automate"],
    icon: <Settings size={22} />,
    color: "purple"
  },
  {
    id: 6,
    categoryId: "dynamics365",
    categoryLabel: "Dynamics 365",
    title: "Ford Mexico Localization",
    desc: "Spanish localization for CSW components and labels.",
    impact: ["Production-ready for Mexico rollout", "RESX workflow expertise"],
    scope: "Enterprise delivery",
    tech: ["Localization", "RESX"],
    icon: <Globe size={22} />,
    color: "blue"
  },
  {
    id: 7,
    categoryId: "powerapps",
    categoryLabel: "Power Apps",
    title: "Auto-Cleanup Flows",
    desc: "Automated cleanup flows to remove obsolete records.",
    impact: ["Reduced storage costs", "Lowered manual upkeep"],
    scope: "Enterprise delivery",
    tech: ["Power Automate", "Dataverse"],
    icon: <Zap size={22} />,
    color: "purple"
  },
  {
    id: 10,
    categoryId: "dynamics365",
    categoryLabel: "Dynamics 365",
    title: "Agent Announcements",
    desc: "Targeted announcements with acknowledgment tracking for CSW agents and supervisors.",
    impact: [
      "Targeting by team, manager, and site code for relevant delivery",
      "Read acknowledgments with supervisor dashboards and subgrids",
      "Security roles and visibility rules for controlled publishing"
    ],
    scope: "Enterprise delivery",
    tech: ["Dynamics 365", "Dataverse", "Power Automate", "Security Roles"],
    icon: <Bell size={22} />,
    color: "blue"
  },
  // --- AZURE ---
  {
    id: 8,
    categoryId: "azure",
    categoryLabel: "Azure",
    title: "Synapse ETL Pipelines",
    desc: "Large-scale data processing across ADF, Synapse, and Data Lake.",
    impact: ["50% faster processing", "100K+ records with 100% accuracy"],
    scope: "Enterprise delivery",
    tech: ["Azure Synapse", "ADF", "SQL"],
    icon: <Database size={22} />,
    color: "cyan"
  },
  {
    id: 9,
    categoryId: "azure",
    categoryLabel: "Azure",
    title: "Azure Metrics Dashboard",
    desc: "Monitoring dashboards for pipeline health and system performance.",
    impact: ["Visibility into failures and SLAs", "Faster incident response"],
    scope: "Enterprise delivery",
    tech: ["Azure Monitor", "Dashboards"],
    icon: <Server size={22} />,
    color: "cyan"
  },
];

const FEATURED_IDS = [4, 8, 10];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "dynamics365", label: "Dynamics 365" },
  { id: "powerapps", label: "Power Apps" },
  { id: "azure", label: "Azure" },
  { id: "personal", label: "Personal" },
];

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  
  const filteredProjects = activeFilter === "all" 
    ? ALL_PROJECTS 
    : ALL_PROJECTS.filter(p => p.categoryId === activeFilter);
  const featuredProjects = ALL_PROJECTS.filter((p) => FEATURED_IDS.includes(p.id));

  // REMOVED: All local cursor motion values (x, y, springs) and handlers

  return (
    <main 
      // REMOVED: onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white relative overflow-x-hidden lg:cursor-none pt-20 pb-20 md:pt-28"
    >
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
      </div>
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("/images/noise.svg")` }}></div>

      {/* REMOVED: Local <motion.div> Cursor */}

      {/* REMOVED: textEnter/Leave props passed to Header */}
      <Header />

      {/* HEADLINE */}
      <div className="text-center px-6 mb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 border border-blue-500/30 bg-blue-500/10 rounded-full text-blue-400 text-[10px] md:text-xs font-mono tracking-widest uppercase">
                <ShieldCheck size={12} />
                Recruiter Snapshot
            </span>
        </motion.div>
        
        <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold mt-6 mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-neutral-500"
        >
            Impactful Work
        </motion.h1>
        
        <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-400 max-w-lg mx-auto text-sm md:text-lg"
        >
            Enterprise systems, automation, and data platforms - with measurable outcomes.
        </motion.p>
      </div>

      {/* FEATURED */}
      <div className="max-w-6xl mx-auto px-4 md:px-20 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <Sparkles className="text-amber-400" size={18} />
          <h2 className="text-lg md:text-xl font-bold text-white">Featured Work</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} featured />
          ))}
        </div>
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
                    type="button"
                    // REMOVED: onMouseEnter/Leave (Global cursor handles buttons automatically)
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

// Color-Coded Project Card
function ProjectCard({ project, featured }) {
    // Define distinct themes for each category
    const colors = {
        blue: {
            text: "text-blue-400",
            bg: "from-blue-500/10 to-transparent",
            border: "border-blue-500/20",
            iconBg: "bg-blue-500/20",
            glow: "group-hover:shadow-blue-500/10"
        },
        cyan: {
            text: "text-cyan-400",
            bg: "from-cyan-500/10 to-transparent",
            border: "border-cyan-500/20",
            iconBg: "bg-cyan-500/20",
            glow: "group-hover:shadow-cyan-500/10"
        },
        green: {
            text: "text-emerald-400",
            bg: "from-emerald-500/10 to-transparent",
            border: "border-emerald-500/20",
            iconBg: "bg-emerald-500/20",
            glow: "group-hover:shadow-emerald-500/10"
        },
        purple: {
            text: "text-purple-400",
            bg: "from-purple-500/10 to-transparent",
            border: "border-purple-500/20",
            iconBg: "bg-purple-500/20",
            glow: "group-hover:shadow-purple-500/10"
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
            className={`group relative p-6 md:p-8 rounded-3xl border bg-[#0a0a0a] bg-gradient-to-br ${theme.bg} hover:bg-[#111] transition-all duration-300 flex flex-col gap-4 ${theme.border} ${theme.glow} hover:shadow-2xl`}
        >
            {/* Header: Icon + Title */}
            <div className="flex items-start justify-between mb-1">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border border-white/5 ${theme.iconBg} ${theme.text} group-hover:scale-110 transition-transform duration-300`}>
                    {project.icon}
                </div>
                <div className="flex items-center gap-2">
                  {featured && (
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[10px] font-mono uppercase tracking-wider text-amber-300">
                      Featured
                    </span>
                  )}
                  <span className={`px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-mono uppercase tracking-wider ${theme.text}`}>
                      {project.categoryLabel}
                  </span>
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
                <div className="mt-3 text-xs text-neutral-500 uppercase tracking-wider font-mono flex items-center gap-2">
                  <Briefcase size={12} />
                  {project.scope}
                </div>
            </div>

            {/* Impact */}
            <div className="text-xs text-neutral-300 space-y-2">
              {project.impact.map((item, i) => (
                <div key={i} className="flex gap-2">
                  <span className={`${theme.text} mt-0.5`}>-</span>
                  <span>{item}</span>
                </div>
              ))}
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
