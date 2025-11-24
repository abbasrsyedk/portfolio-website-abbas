"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function PhotoGallery() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    async function fetchPhotos() {
      try {
        const res = await fetch("/api/photos");
        const data = await res.json();
        setPhotos(data);
      } catch (error) {
        console.error("Failed to load photos:", error);
      }
    }

    fetchPhotos();

    // 🔁 Optional: auto-refresh every 10s
    const interval = setInterval(fetchPhotos, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold mb-8"
      >
        Photography 📸
      </motion.h1>
      <p className="text-gray-400 mb-10">
        A few shots I’ve captured on my journeys.
      </p>

      <div className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
        {photos.map((photo, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="break-inside-avoid overflow-hidden rounded-lg shadow-md hover:scale-[1.02] transform transition"
          >
            <Image
              src={photo}
              alt={`Photo ${idx + 1}`}
              width={800}
              height={600}
              className="w-full h-auto object-cover"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
