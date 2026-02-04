"use client";

import { useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Star, BookOpen, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import books from "@/data/books.json"; 

export default function ReadingPage() {
  // --- DATA PROCESSING ---
  const { recommendedBooks, otherBooks } = useMemo(() => {
    const processed = books
      .map((b, i) => ({ ...b, id: i, ratingNum: parseInt(b.rating) || 0 }))
      .sort((a, b) => b.ratingNum - a.ratingNum);

    return {
      recommendedBooks: processed.filter((b) => b.recommended === true),
      otherBooks: processed.filter((b) => b.recommended !== true),
    };
  }, []);

  return (
    <main 
      className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500 selection:text-white relative overflow-x-hidden lg:cursor-none pt-24 pb-20 md:pt-32"
    >
      
      {/* BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent"></div>
      </div>
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: `url("/images/noise.svg")` }}></div>

      <Header />

      {/* HERO SECTION */}
      <section className="relative px-6 md:px-20 max-w-7xl mx-auto mb-12 flex flex-col items-center text-center">
        
        {/* REMOVED: The Library Pill Badge */}

        <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            // CHANGE: Updated text and applied gradient coloring
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-2"
        >
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Library</span>
        </motion.h1>

        <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="text-neutral-400 text-lg max-w-xl leading-relaxed mb-2"
        >
            A curated collection of books that have shaped my thinking.
        </motion.p>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="mt-1">
            <a 
                href="https://www.goodreads.com/user/show/170422645-abbas-rsk"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/50 transition-all"
            >
                <span className="font-bold text-sm text-white group-hover:text-emerald-400 transition-colors">View Goodreads Profile</span>
                <ArrowUpRight size={16} className="text-neutral-500 group-hover:text-emerald-400 transition-colors" />
            </a>
        </motion.div>
      </section>

      {/* RECOMMENDED SECTION */}
      <section className="px-6 md:px-20 max-w-7xl mx-auto mb-10">
        <div className="flex items-center gap-4 mb-5">
            <h2 className="text-2xl md:text-3xl font-bold text-white shrink-0">Highly Recommended</h2>
            <div className="h-px bg-gradient-to-r from-emerald-500/50 to-transparent w-full max-w-xs"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
            {recommendedBooks.map((book, i) => (
                <BookCard key={i} book={book} featured />
            ))}
        </div>
      </section>

      {/* ALL BOOKS SECTION */}
      <section className="px-6 md:px-20 max-w-7xl mx-auto">
        <div className="flex items-end gap-4 mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-neutral-300">Bookshelf</h2>
            <div className="h-px bg-white/10 flex-1 mb-2"></div>
            <span className="text-xs font-mono text-neutral-600">{otherBooks.length} items</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-4 md:gap-6">
            {otherBooks.map((book, i) => (
                <BookCard key={i} book={book} />
            ))}
        </div>
      </section>

    </main>
  );
}

// --- COMPONENT: Book Card (Unchanged) ---
function BookCard({ book, featured }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative flex flex-col gap-3"
        >
            {/* Cover Image Container */}
            <div className={`relative w-full aspect-[2/3] rounded-xl overflow-hidden border border-white/10 bg-white/5 shadow-lg group-hover:shadow-emerald-500/20 group-hover:-translate-y-2 transition-all duration-500 ${featured ? 'shadow-2xl' : ''}`}>
                {book.cover ? (
                    <Image 
                        src={book.cover} 
                        alt={book.title} 
                        fill 
                        className="object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-neutral-900 text-neutral-700 font-mono text-xs p-2 text-center">
                        No Cover
                    </div>
                )}
                
                {/* Glossy Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                
                {/* Rating Badge (Top Right) */}
                <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1">
                    <Star size={10} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-[10px] font-bold">{book.ratingNum}</span>
                </div>
            </div>

            {/* Meta Data */}
            <div className="space-y-1">
                <h3 className={`font-bold text-white leading-tight group-hover:text-emerald-400 transition-colors line-clamp-2 ${featured ? 'text-base' : 'text-sm'}`}>
                    {book.title}
                </h3>
                <p className="text-xs text-neutral-500 line-clamp-1">{book.author}</p>
            </div>
        </motion.div>
    )
}
