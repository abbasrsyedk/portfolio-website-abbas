"use client";

import { motion } from "framer-motion";
import { Mail, Linkedin, Github, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-4"
      >
        Let’s Connect 🤝
      </motion.h1>
      <p className="text-gray-400 mb-12 text-lg">
        Whether you're a recruiter, fellow engineer, or a curious human —
        here’s where you can reach me.
      </p>

      {/* Contact Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Email */}
        <motion.a
          href="mailto:rskabbas@outlook.com"
          whileHover={{ scale: 1.05 }}
          className="flex items-center p-6 bg-gray-900 rounded-lg shadow-md hover:bg-orange-600 transition"
        >
          <Mail className="w-8 h-8 mr-4" />
          <div>
            <h3 className="text-xl font-semibold">Email</h3>
            <p className="text-gray-300">rskabbas@outlook.com</p>
          </div>
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          href="https://www.linkedin.com/in/rskabbas/"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="flex items-center p-6 bg-gray-900 rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          <Linkedin className="w-8 h-8 mr-4" />
          <div>
            <h3 className="text-xl font-semibold">LinkedIn</h3>
            <p className="text-gray-300">/in/rskabbas</p>
          </div>
        </motion.a>

        {/* GitHub */}
        <motion.a
          href="https://github.com/abbasrsyedk"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          className="flex items-center p-6 bg-gray-900 rounded-lg shadow-md hover:bg-gray-700 transition"
        >
          <Github className="w-8 h-8 mr-4" />
          <div>
            <h3 className="text-xl font-semibold">GitHub</h3>
            <p className="text-gray-300">@abbasrsyedk</p>
          </div>
        </motion.a>

        {/* Location */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center p-6 bg-gray-900 rounded-lg shadow-md hover:bg-teal-600 transition"
        >
          <MapPin className="w-8 h-8 mr-4" />
          <div>
            <h3 className="text-xl font-semibold">Location</h3>
            <p className="text-gray-300">Tirupati, India</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
