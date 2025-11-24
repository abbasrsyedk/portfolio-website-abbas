"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function WorkPage() {
  return (
    <main className="bg-neutral-900 text-white">
      {/* HERO SECTION */}
      <section className="h-screen flex items-center justify-center px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl">
          {/* Left: Text */}
          <div className="space-y-8 text-center md:text-left">
            <p className="text-orange-500 font-semibold text-xl md:text-2xl">
              Hi! I Am
            </p>
            <h1 className="text-6xl md:text-7xl font-bold">Abbas R S K</h1>
            <p className="text-xl md:text-2xl text-gray-300">
              I do what I love, and I love what I do.
            </p>
            <p className="text-blue-400 text-xl md:text-2xl">
              Software Developer
            </p>
            <p className="text-orange-400 font-semibold text-xl md:text-2xl">
              3+ Years Experience
            </p>
            <button className="bg-orange-500 px-10 py-5 rounded-md font-semibold text-xl hover:bg-orange-600 transition">
              Download Resume
            </button>
          </div>

          {/* Right: Image */}
          <div className="flex justify-center">
            <Image
              src="/images/others/FormalPictureofMyself.jpeg"
              alt="Profile"
              width={420} // increased by ~10%
              height={420}
              className="rounded-full border-4 border-orange-500 shadow-lg"
            />
          </div>
        </div>

        {/* Scroll Down Hint */}
        <div className="absolute bottom-8 w-full text-center">
          <p className="text-gray-400 text-sm md:text-base animate-bounce">
            ↓ Scroll down to learn more about my work & skills
          </p>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section className="py-20 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center text-orange-500 mb-16">
          Experience
        </h2>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-orange-500 h-full"></div>

          <div className="space-y-24">
            {/* Software Analyst */}
            <div className="flex justify-end items-start relative">
              <div className="w-1/2"></div>
              <div className="w-1/2 pl-8">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-neutral-800 p-6 rounded-xl shadow-md border border-orange-500/30 hover:shadow-orange-400/40 transition"
                >
                  <h3 className="text-xl font-bold mb-1">💼 Software Analyst</h3>
                  <p className="text-sm italic text-gray-400 mb-3">
                    Ford Motor Company | Jul 2022 – Present
                  </p>
                  <ul className="space-y-2 text-gray-300 leading-relaxed">
                    <li>➤ Automated workflows with Power Automate Cloud Flows.</li>
                    <li>➤ Built Customer Service Workspace App for Ford of Mexico.</li>
                    <li>➤ Designed 95+ dashboards/views in Dynamics 365.</li>
                    <li>
                      ➤ Developed ETL pipelines with Azure Data Factory (50%
                      faster).
                    </li>
                  </ul>
                </motion.div>
              </div>

              {/* Marker */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-orange-500 rounded-full"></div>
            </div>

            {/* Intern */}
            <div className="flex justify-start items-start relative">
              <div className="w-1/2 pr-8">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-neutral-800 p-6 rounded-xl shadow-md border border-orange-500/30 hover:shadow-orange-400/40 transition"
                >
                  <h3 className="text-xl font-bold mb-1">👨‍💻 Intern (Junior Engineer)</h3>
                  <p className="text-sm italic text-gray-400 mb-3">
                    Ford Motor Company | Feb 2022 – Jun 2022
                  </p>
                  <ul className="space-y-2 text-gray-300 leading-relaxed">
                    <li>➤ Reduced export costs by 50% via Azure Synapse optimization.</li>
                    <li>➤ Migrated schema & data using Config Migration Tool.</li>
                    <li>➤ Contributed to CRM solution deployments.</li>
                    <li>➤ Promoted to full-time in 5 months.</li>
                  </ul>
                </motion.div>
              </div>
              <div className="w-1/2"></div>

              {/* Marker */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-orange-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section className="py-20 px-6 md:px-20 bg-neutral-800">
        <h2 className="text-3xl font-bold text-center text-orange-500 mb-12">
          Skills
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-12 text-center max-w-6xl mx-auto">
          <div>
            <Image
              src="/icons/icons8-dynamics-365-48.png"
              width={60}
              height={60}
              alt="Dynamics 365"
              className="mx-auto"
            />
            <p className="mt-2">Dynamics 365</p>
          </div>
          <div>
            <Image
              src="/icons/icons8-microsoft-power-automate-2020-50.png"
              width={60}
              height={60}
              alt="Power Automate"
              className="mx-auto"
            />
            <p className="mt-2">Power Automate</p>
          </div>
          <div>
            <Image
              src="/icons/icons8-java-script-64.png"
              width={60}
              height={60}
              alt="Java Script"
              className="mx-auto"
            />
            <p className="mt-2">Java Script</p>
          </div>
          <div>
            <Image
              src="/icons/icons8-azure-50.png"
              width={60}
              height={60}
              alt="Azure Data Factory"
              className="mx-auto"
            />
            <p className="mt-2">Azure Data Factory</p>
          </div>
          <div>
            <Image
              src="/icons/icons8-power-apps-80.png"
              width={60}
              height={60}
              alt="Power Apps"
              className="mx-auto"
            />
            <p className="mt-2">Power Apps</p>
          </div>
          <div>
            <Image
              src="/icons/icons8-sql-50.png"
              width={60}
              height={60}
              alt="SQL / Python"
              className="mx-auto"
            />
            <p className="mt-2">SQL / Python</p>
          </div>
        </div>
      </section>
    </main>
  );
}
