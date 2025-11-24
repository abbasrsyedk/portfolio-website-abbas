"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Header from "@/components/Header"; 
import { ArrowDownToLine, Layout, Zap, Globe, Cpu, Code2, Database, Server } from "lucide-react";

export default function WorkPage() {
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
      // FIX: Changed pb-40 to pb-12. This removes the huge gap at the bottom.
      className="min-h-screen bg-[#050505] text-white selection:bg-blue-500 selection:text-white relative overflow-x-hidden cursor-none pt-20 pb-12 md:pt-0 md:pb-0"
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
                Building enterprise-grade solutions with clarity. <br className="hidden md:block"/>
                <span className="text-white">3+ Years</span> of experience in Dynamics 365, Azure, and Full Stack.
            </motion.p>
            
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}
                className="pt-2"
            >
                {/* FIX: Replaced button with <a> tag and added href and download attributes */}
                <a 
                  href="/resume.pdf"
                  download="Abbas_RSK_Resume.pdf" // This suggests the file name to the user
                  onMouseEnter={textEnter} 
                  onMouseLeave={textLeave}
                  className="group flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-white/5 border border-white/20 text-white font-bold rounded-full text-sm md:text-base hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_-5px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_-5px_rgba(255,255,255,0.4)]"
                >
                    <ArrowDownToLine size={18} className="group-hover:-translate-y-1 transition-transform" />
                    Download Resume
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

      {/* EXPERIENCE SECTION */}
      <section className="py-8 md:py-20 px-6 md:px-20 max-w-6xl mx-auto relative z-10">
        <div className="flex items-end gap-4 mb-8 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold">Experience</h2>
            <div className="h-px bg-white/20 flex-1 mb-4"></div>
        </div>

        <div className="space-y-6 md:space-y-12">
            <ExperienceCard 
                role="Software Analyst"
                company="Ford Motor Company"
                date="Jul 2022 – Present"
                desc={[
                    "Automated workflows with Power Automate Cloud Flows.",
                    "Built Customer Service Workspace App for Ford of Mexico.",
                    "Designed 95+ dashboards/views in Dynamics 365.",
                    "Developed ETL pipelines with Azure Data Factory (50% faster)."
                ]}
            />
             <ExperienceCard 
                role="Intern (Junior Engineer)"
                company="Ford Motor Company"
                date="Feb 2022 – Jun 2022"
                desc={[
                    "Reduced export costs by 50% via Azure Synapse optimization.",
                    "Migrated schema & data using Config Migration Tool.",
                    "Contributed to CRM solution deployments."
                ]}
            />
        </div>
      </section>

      {/* SKILLS SECTION */}
      {/* FIX: Removed mb-20. Now it sits flush with the bottom of the page. */}
      <section className="py-8 md:py-20 px-6 md:px-20 max-w-6xl mx-auto relative z-10">
         <h2 className="text-3xl md:text-4xl font-bold mb-8 md:mb-12 text-center md:text-left">Technical Arsenal</h2>
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            <SkillCard icon={<Layout />} name="Dynamics 365" color="text-blue-400" border="group-hover:border-blue-500/50" shadow="group-hover:shadow-blue-500/20" />
            <SkillCard icon={<Zap />} name="Power Automate" color="text-yellow-400" border="group-hover:border-yellow-500/50" shadow="group-hover:shadow-yellow-500/20" />
            <SkillCard icon={<Code2 />} name="JavaScript" color="text-violet-400" border="group-hover:border-violet-500/50" shadow="group-hover:shadow-violet-500/20" />
            <SkillCard icon={<Database />} name="Azure DF" color="text-cyan-400" border="group-hover:border-cyan-500/50" shadow="group-hover:shadow-cyan-500/20" />
            <SkillCard icon={<Cpu />} name="Power Apps" color="text-pink-400" border="group-hover:border-pink-500/50" shadow="group-hover:shadow-pink-500/20" />
            <SkillCard icon={<Server />} name="SQL / Python" color="text-emerald-400" border="group-hover:border-emerald-500/50" shadow="group-hover:shadow-emerald-500/20" />
         </div>
      </section>

    </main>
  );
}

// Components (ExperienceCard and SkillCard) remain exactly the same as before
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
                        <span className="text-blue-500 mt-1">▹</span>
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