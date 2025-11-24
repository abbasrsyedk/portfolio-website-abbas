"use client";

import books from "@/data/books.json";
import { motion } from "framer-motion";
import Star from "@/components/Star";
import { useMemo } from "react";

export default function Reading() {
  const parseRating = (rating) => {
    const num = parseInt(rating, 10);
    return isNaN(num) ? 0 : num;
  };

  const { recommendedBooks, otherBooks } = useMemo(() => {
    const processed = books
      .map((b, i) => ({ ...b, id: i, ratingNum: parseRating(b.rating) }))
      .sort((a, b) => b.ratingNum - a.ratingNum);

    return {
      recommendedBooks: processed.filter((b) => b.recommended === true),
      otherBooks: processed.filter((b) => b.recommended !== true),
    };
  }, []);

  const Card = ({ book, index, ratio = "auto", variant = "default" }) => (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.03, duration: 0.4 }}
      className="break-inside-avoid"
    >
      <article className="relative overflow-hidden border border-white/10 shadow-sm backdrop-blur transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 rounded-2xl bg-gradient-to-b from-gray-900/70 to-gray-900/40 flex flex-col">
        {/* Cover */}
        {book.cover ? (
          <motion.img
            src={book.cover}
            alt={book.title}
            loading="lazy"
            initial={{ scale: 1.02, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            onError={(e) => {
              if (!e.currentTarget.dataset.fallback) {
                e.currentTarget.src = "/images/books/placeholder.jpg";
                e.currentTarget.dataset.fallback = "true";
              }
            }}
            className={`w-full object-cover rounded-t-2xl ${ratio === "3/4" ? "aspect-[3/4]" : "h-48"}`}
          />
        ) : (
          <div
            className={`w-full flex items-center justify-center text-gray-400 bg-gray-800/60 ${ratio === "3/4" ? "aspect-[3/4]" : "h-48"}`}
          >
            No Cover
          </div>
        )}

        {/* Glow outline */}
        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-orange-500/0 hover:ring-2 hover:ring-orange-400/70 transition-all" />

        {/* Meta */}
        <div className={`p-3 sm:p-4 flex-1 flex flex-col justify-between ${variant === "recommended" ? "min-h-[106px]" : ""}`}>
          <div className="flex items-center justify-between gap-3">
            <h3 className={`text-sm sm:text-base font-semibold leading-tight ${variant === "recommended" ? "line-clamp-1" : "line-clamp-2"}`}>
              {book.title}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
              <Star rating={book.rating} />
              <span className="text-[10px] text-gray-400 ml-1">{book.ratingNum}</span>
            </div>
          </div>
          {book.author && (
            <p className="text-xs text-gray-400 mt-1">by {book.author}</p>
          )}
        </div>
      </article>
    </motion.div>
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 pt-28 md:pt-32">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight scroll-mt-28 md:scroll-mt-32">Reading 📚</h1>
        <p className="text-gray-400 mt-2">
          A curated shelf of books I rated highly. See more on{" "}
          <a
            href="https://www.goodreads.com/user/show/170422645-abbas-rsk"
            target="_blank"
            rel="noopener noreferrer"
            className="text-orange-400 hover:underline"
          >
            my Goodreads
          </a>
          .
        </p>
      </motion.div>

      {/* Section: Most Recommended */}
      <section className="mb-12">
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl font-semibold">Most Recommended</h2>
          <span className="text-xs text-gray-500">{recommendedBooks.length} items</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 items-start">
          {recommendedBooks.map((book, idx) => (
            <Card key={`rec-${book.id}`} book={book} index={idx} ratio="3/4" variant="recommended" />
          ))}
        </div>
      </section>

      {/* Section: Books Read */}
      <section>
        <div className="flex items-end justify-between mb-4">
          <h2 className="text-2xl font-semibold">Books Read</h2>
          <span className="text-xs text-gray-500">{otherBooks.length} items</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6 items-start">
          {otherBooks.map((book, idx) => (
            <Card key={`other-${book.id}`} book={book} index={idx} />
          ))}
        </div>
      </section>
    </section>
  );
}
