"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ProjectsPage() {
  const [open, setOpen] = useState("personal");

  useEffect(() => {
    setOpen("personal");
  }, []);

  const categories = [
    {
      id: "personal",
      title: "Personal Projects",
      color: "green",
      icons: [
        { src: "/icons/icons8-react-native-24.png", label: "React" },
        { src: "/icons/icons8-tailwind-css-50.png", label: "Tailwind" },
        { src: "/icons/icons8-java-script-64.png", label: "JavaScript" },
        { src: "/icons/icons8-node-js-50.png", label: "Node.js" },
        { src: "/icons/icons8-github-50.png", label: "GitHub" },
        { src: "/icons/icons8-visual-studio-code-2019-50.png", label: "VS Code" },
      ],
      projects: [
        {
          name: "💹 Mutual Fund Dashboard",
          description:
            "Built a dashboard to track investments and NAV trends using React, Tailwind, and APIs.",
        },
        {
          name: "🌐 Portfolio Website",
          description:
            "This website itself — showcasing my work, hobbies, and projects, designed with Next.js and Tailwind.",
        },
      ],
    },
    {
      id: "dynamics",
      title: "Dynamics 365 CRM & Power Platform",
      color: "orange",
      icons: [
        { src: "/icons/icons8-dynamics-365-48.png", label: "Dynamics 365" },
        { src: "/icons/icons8-microsoft-power-automate-2020-50.png", label: "Power Automate" },
        { src: "/icons/icons8-power-apps-80.png", label: "Power Apps" },
        { src: "/icons/xrm toolbox.png", label: "XRM Toolbox" },
        { src: "/icons/icons8-java-script-64.png", label: "JavaScript" },
      ],
      projects: [
        {
          name: "📊 Dashboards Project",
          description:
            "Built dashboards and views for teams to replace personal dashboards, enabling centralized insights.",
        },
        {
          name: "🔍 CSW Application Master Search",
          description:
            "Developed a master search system to allow Ford Customer Service agents to search across multiple entities.",
        },
        {
          name: "⚙️ Morley Integration Project",
          description:
            "Created Morley entity with forms and views for capturing vehicle payment details and approvals.",
        },
        {
          name: "🌍 Ford of Mexico Localization",
          description:
            "Implemented Spanish translations for CSW components, making it fully usable in Spanish.",
        },
        {
          name: "🔄 Power Automate Flows",
          description:
            "Created automated flows to reduce agent workload, like deleting records matching criteria.",
        },
      ],
    },
    {
      id: "azure",
      title: "Azure Projects",
      color: "blue",
      icons: [
        { src: "/icons/AzureDataLake.png", label: "Data Lake" },
        { src: "/icons/project_2133005.png", label: "Synapse" },
        { src: "/icons/icons8-azuresql.png", label: "SQL" },
        { src: "/icons/icons8-python-50.png", label: "Python" },
        { src: "/icons/Configuration Migration tool.png", label: "Config Tool" },
      ],
      projects: [
        {
          name: "⚡ Azure Synapse Integration & ETL",
          description:
            "Built ETL pipelines using Synapse, Data Factory, Data Lake, and SQL for large-scale data processing.",
        },
        {
          name: "📈 Azure Dashboards",
          description: "Developed dashboards for metrics monitoring and insights.",
        },
      ],
    },
  ];

  // Variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <main className="bg-neutral-900 text-white min-h-screen pt-28 px-6">
      {/* HEADING */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl font-bold text-orange-500 flex items-center justify-center gap-2">
          🚀 My Work
        </h1>

        <p className="text-gray-400 max-w-2xl mx-auto mt-3 text-sm md:text-base">
          A showcase of projects I’ve built and contributed to — spanning Dynamics 365, Azure,
          and personal explorations.
        </p>

        <div className="flex justify-center mt-5">
          <span className="h-1 w-24 bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 rounded-full animate-pulse"></span>
        </div>

        <div className="flex justify-center flex-wrap gap-3 mt-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setOpen(cat.id)}
              className={`px-4 py-1 text-sm font-medium rounded-full border transition ${
                cat.id === "dynamics"
                  ? "bg-orange-500/20 text-orange-400 border-orange-500/40"
                  : cat.id === "azure"
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/40"
                  : "bg-green-500/20 text-green-400 border-green-500/40"
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </motion.div>

      {/* CATEGORY CARDS */}
      <div className="max-w-4xl mx-auto space-y-6">
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            className={`rounded-2xl overflow-hidden shadow-md bg-neutral-800 transition hover:shadow-${cat.color}-500/30`}
            whileHover={{ scale: 1.01 }}
            layout
          >
            {/* Header */}
            <div
              className="grid grid-cols-12 items-center px-6 py-5 cursor-pointer"
              onClick={() => setOpen(open === cat.id ? null : cat.id)} // ensures only one open
            >
              <h2 className={`col-span-3 text-lg font-semibold text-${cat.color}-400`}>
                {cat.title}
              </h2>

              <div className="col-span-8 flex justify-center gap-8">
                {cat.icons.map((icon, i) => (
                  <div key={i} className="flex flex-col items-center group">
                    <Image
                      src={icon.src}
                      alt={icon.label}
                      width={44}
                      height={44}
                      className="transition-transform group-hover:scale-110"
                    />
                    <span className="text-xs text-gray-400 mt-1">{icon.label}</span>
                  </div>
                ))}
              </div>

              <div className="col-span-1 flex justify-end">
                <button className="bg-neutral-700 hover:bg-neutral-600 text-white w-9 h-9 rounded-full flex items-center justify-center text-lg transition">
                  {open === cat.id ? "−" : "+"}
                </button>
              </div>
            </div>

            {/* Expandable Projects */}
            <AnimatePresence>
              {open === cat.id && (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="px-6 overflow-hidden"
                >
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="pb-6 space-y-4"
                  >
                    {cat.projects.map((proj, i) => (
                      <motion.div
                        key={i}
                        variants={itemVariants}
                        className="border-l-4 border-orange-500 pl-4 hover:bg-neutral-700/40 rounded-md transition"
                      >
                        <h3 className="font-bold text-lg mb-1">{proj.name}</h3>
                        <p className="text-gray-300 text-sm">{proj.description}</p>
                        {i < cat.projects.length - 1 && (
                          <hr className="border-neutral-700/40 my-3" />
                        )}
                      </motion.div>
                    ))}
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
