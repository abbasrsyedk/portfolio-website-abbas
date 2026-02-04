"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Header from "@/components/Header"; 
import { ArrowDownToLine, Award, Briefcase, Code2, Cpu, Database, GraduationCap, Layout, Server, Wrench, Zap } from "lucide-react";

const HIGHLIGHTS = [
  {
    value: "95+",
    label: "Dashboards and Views",
    detail: "Built in Dynamics 365 for CSW agents to improve data visibility.",
    accent: "text-blue-400",
  },
  {
    value: "5+",
    label: "ETL Pipelines",
    detail: "ADF pipelines cut processing time by 50% across 100K+ records.",
    accent: "text-cyan-400",
  },
  {
    value: "95%",
    label: "Issues Resolved",
    detail: "Led Microsoft Wave UI testing (2023-2024) before rollout.",
    accent: "text-emerald-400",
  },
  {
    value: "Global",
    label: "CSW Entry Point",
    detail: "Master Search with Power Automate and custom connectors.",
    accent: "text-violet-400",
  },
];

const EXPERIENCE = [
  {
    role: "Software Analyst",
    company: "Ford Motor Company",
    date: "Jul 2022 - Present",
    bullets: [
      "Led design and delivery of Master Search, the core entry point for Customer Service Workspace (CSW) globally, integrated with Power Automate flows and custom connectors.",
      "Automated agent workflows for Europe and North America using Power Automate Cloud Flows, reducing manual effort for Customer Care teams.",
      "Built 95+ custom dashboards and views in Dynamics 365 to improve CSW data visibility and decision speed.",
      "Launched the CSW app for Ford Mexico in Spanish, working with RESX translations and Easy Translator tooling.",
      "Developed 5+ ETL pipelines in Azure Data Factory, cutting processing time by 50% and maintaining 100% accuracy across 100K+ records.",
      "Owned Microsoft Wave UI and functionality testing (2023-2024), resolving 95% of issues pre-deployment with cross-functional teams.",
      "Delivered biweekly releases with PMs, QA, and engineering to meet evolving business needs.",
    ],
  },
  {
    role: "Intern (Junior Engineer)",
    company: "Ford Motor Company",
    date: "Feb 2022 - Jun 2022",
    bullets: [
      "Implemented Azure Synapse Link with ADF pipelines for real-time analytics integration.",
      "Reduced data export costs by 50% through Azure Synapse optimization.",
      "Migrated schema and data using Configuration Migration Tool to improve deployment efficiency.",
      "Supported Microsoft 365 CRM solution deployments, including workflows, plugins, and web applications.",
    ],
  },
];

const SKILL_GROUPS = [
  {
    title: "Platforms",
    icon: <Layout size={16} />,
    items: ["Dynamics 365 CE/CRM", "Power Apps (Canvas)", "Power Automate", "Power Pages", "Dataverse"],
  },
  {
    title: "Data and Integration",
    icon: <Database size={16} />,
    items: ["Azure Data Factory", "Azure Synapse", "SQL", "Python", "Power BI"],
  },
  {
    title: "Development",
    icon: <Code2 size={16} />,
    items: ["C#", "JavaScript", "Custom API", "Custom Workflows", "Plugin Development"],
  },
  {
    title: "Tools",
    icon: <Wrench size={16} />,
    items: ["XRM Toolbox", "Ribbon Workbench", "Plugin Registration Tool", "SSMS", "Postman", "Jira", "GitHub", "Configuration Migration Tool", "Copilot Studio"],
  },
];

const CERTIFICATIONS = [
  { name: "AZ-900: Microsoft Azure Fundamentals", icon: <Award size={16} /> },
  { name: "MB-910: Dynamics 365 Fundamentals (CRM)", icon: <Award size={16} /> },
  { name: "PL-900T00: Power Platform Fundamentals", icon: <Award size={16} /> },
];

export default function WorkPage() {
  // REMOVED: All local cursor state and tracking logic (x, y, springs, handleMouseMove)
  // The Global Cursor in layout.js now handles everything automatically.

  return (
    <main 
      // REMOVED: onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white relative overflow-x-hidden lg:cursor-none pt-20 pb-12 md:pt-0 md:pb-0"
    >
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
      </div>
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("/images/noise.svg")` }}></div>

      {/* REMOVED: The local <motion.div> cursor element */}

      {/* REMOVED: textEnter/textLeave props (Global cursor handles hover auto-detection) */}
      <Header />

      {/* HERO SECTION */}
      <section className="relative flex flex-col-reverse md:flex-row items-center justify-center gap-6 md:gap-16 px-6 md:px-20 max-w-7xl mx-auto pb-8 md:pb-20 pt-8 md:pt-40">
        
        {/* Left: Typography */}
        <div className="w-full md:w-1/2 space-y-4 md:space-y-8 z-10 text-center md:text-left flex flex-col items-center md:items-start">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="px-3 py-1 border border-blue-500/30 bg-blue-500/10 rounded-full text-blue-400 text-[10px] md:text-xs font-mono tracking-widest uppercase">
                    Software Developer
                </span>
            </motion.div>
            
            <motion.h1 
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
                className="text-5xl md:text-8xl font-bold tracking-tighter leading-none"
            >
                Abbas <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">R S K</span>
            </motion.h1>

            <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
                className="text-base md:text-xl text-neutral-400 max-w-md leading-relaxed"
            >
                Software Analyst focused on Dynamics 365, Power Platform, and Azure data integration. <br className="hidden md:block"/>
                <span className="text-white">3+ Years</span> delivering enterprise CSW solutions, automation, and analytics at Ford.
            </motion.p>
            
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start"
            >
                <a 
                  href="/resume.pdf"
                  download="Abbas_RSK_Resume.pdf"
                  // REMOVED: onMouseEnter/Leave (Global cursor handles <a> tags automatically)
                  className="group flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white/5 border border-white/20 text-white font-bold rounded-full text-sm md:text-base hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)]"
                >
                    <ArrowDownToLine size={18} className="group-hover:-translate-y-1 transition-transform" />
                    Download Resume
                </a>
                <a
                  href="https://www.linkedin.com/in/rskabbas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white/5 border border-white/10 text-white/90 font-semibold rounded-full text-sm md:text-base hover:bg-white/10 transition-all duration-300"
                >
                  <Briefcase size={18} className="text-blue-400" />
                  View LinkedIn
                </a>
            </motion.div>
        </div>

        {/* Right: Image */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7 }}
            className="w-full md:w-1/2 flex justify-center z-10 relative mt-2 md:mt-0"
        >
            <div className="relative w-56 h-56 md:w-96 md:h-96 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-transparent z-0"></div>
                <Image
                    src="/images/others/FormalPictureofMyself.jpeg"
                    alt="Abbas Profile"
                    fill
                    className="object-cover opacity-90 hover:scale-105 transition-transform duration-700"
                />
            </div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600 blur-[80px] opacity-40"></div>
        </motion.div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="px-6 md:px-20 max-w-7xl mx-auto pb-10 md:pb-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {HIGHLIGHTS.map((item) => (
            <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-colors">
              <div className={`text-2xl font-bold ${item.accent}`}>{item.value}</div>
              <div className="text-sm font-semibold text-white mt-1">{item.label}</div>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="py-8 md:py-20 px-6 md:px-20 max-w-6xl mx-auto relative z-10">
        <div className="flex items-end gap-4 mb-8 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">Experience</h2>
            <div className="h-px bg-white/20 flex-1 mb-4"></div>
        </div>

        <div className="space-y-6 md:space-y-12">
            {EXPERIENCE.map((item) => (
              <ExperienceCard
                key={`${item.role}-${item.date}`}
                role={item.role}
                company={item.company}
                date={item.date}
                desc={item.bullets}
              />
            ))}
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className="py-8 md:py-20 px-6 md:px-20 max-w-6xl mx-auto relative z-10">
         <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-10 text-center md:text-left">Core Skills</h2>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mb-8">
            <SkillCard icon={<Layout />} name="Dynamics 365" color="text-blue-400" border="group-hover:border-blue-500/50" shadow="group-hover:shadow-blue-500/20" />
            <SkillCard icon={<Zap />} name="Power Automate" color="text-yellow-400" border="group-hover:border-yellow-500/50" shadow="group-hover:shadow-yellow-500/20" />
            <SkillCard icon={<Cpu />} name="Power Apps" color="text-pink-400" border="group-hover:border-pink-500/50" shadow="group-hover:shadow-pink-500/20" />
            <SkillCard icon={<Database />} name="Azure Data Factory" color="text-cyan-400" border="group-hover:border-cyan-500/50" shadow="group-hover:shadow-cyan-500/20" />
            <SkillCard icon={<Server />} name="Azure Synapse" color="text-emerald-400" border="group-hover:border-emerald-500/50" shadow="group-hover:shadow-emerald-500/20" />
            <SkillCard icon={<Code2 />} name="C# / JavaScript" color="text-violet-400" border="group-hover:border-violet-500/50" shadow="group-hover:shadow-violet-500/20" />
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {SKILL_GROUPS.map((group) => (
             <div key={group.title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
               <div className="flex items-center gap-2 text-white mb-4">
                 <span className="text-blue-400">{group.icon}</span>
                 <h3 className="text-sm font-bold tracking-wider uppercase">{group.title}</h3>
               </div>
               <div className="flex flex-wrap gap-2">
                 {group.items.map((item) => (
                   <span key={item} className="text-xs text-neutral-200 bg-black/30 border border-white/10 px-2.5 py-1 rounded-full">
                     {item}
                   </span>
                 ))}
               </div>
             </div>
           ))}
         </div>
      </section>

      {/* CERTIFICATIONS AND EDUCATION */}
      <section className="py-8 md:py-16 px-6 md:px-20 max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Award size={18} className="text-amber-400" />
              <h3 className="text-sm font-bold tracking-wider uppercase">Certifications</h3>
            </div>
            <ul className="space-y-3">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.name} className="flex items-start gap-2 text-sm text-neutral-200">
                  <span className="text-amber-400">{cert.icon}</span>
                  <span>{cert.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap size={18} className="text-emerald-400" />
              <h3 className="text-sm font-bold tracking-wider uppercase">Education</h3>
            </div>
            <div className="text-sm text-neutral-200">
              <div className="font-semibold text-white">Bachelor of Technology in Electronics and Communication Engineering</div>
              <div className="text-neutral-400 mt-1">Vellore Institute of Technology, Amaravati - GPA 8.5</div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

// Components
function ExperienceCard({ role, company, date, desc }) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative p-6 md:p-10 rounded-[2rem] border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
        >
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">{role}</h3>
                    <p className="text-neutral-400 text-sm md:text-base">{company}</p>
                </div>
                <span className="mt-3 md:mt-0 px-3 md:px-4 py-1 self-start md:self-auto rounded-full border border-white/10 bg-black/30 text-[10px] md:text-xs font-mono text-neutral-400">
                    {date}
                </span>
            </div>
            <ul className="space-y-3">
                {desc.map((item, i) => (
                    <li key={i} className="flex gap-3 text-neutral-300 text-sm md:text-base leading-relaxed">
                        <span className="text-blue-500 mt-1">-</span>
                        {item}
                    </li>
                ))}
            </ul>
        </motion.div>
    )
}

function SkillCard({ icon, name, color, border, shadow }) {
    return (
        <div className={`group relative p-5 rounded-3xl border border-white/5 bg-white/5 ${border} hover:bg-white/10 ${shadow} transition-all duration-300 flex flex-col items-center gap-4 text-center overflow-hidden`}>
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-b from-current to-transparent ${color} transition-opacity duration-500`} />
            <div className={`p-3 rounded-full bg-white/5 group-hover:scale-110 transition-transform duration-300 ${color}`}>
                {icon}
            </div>
            <span className="font-medium text-xs text-neutral-300 group-hover:text-white relative z-10">{name}</span>
        </div>
    )
}
