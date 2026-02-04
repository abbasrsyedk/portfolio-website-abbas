"use client";

// import Layout from "@/components/Layout";
import Image from "next/image";
import books from "@/data/books.json";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

export default function BookPage() {
  const { book } = useParams();
  const bookData = books[parseInt(book)];

  if (!bookData) {
    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
          <h1 className="text-3xl font-bold">Book not found</h1>
        </div>

    );
  }

  const coverUrl = bookData.isbn
    ? `https://covers.openlibrary.org/b/isbn/${bookData.isbn}-L.jpg`
    : null;

  return (
      <section className="max-w-4xl mx-auto px-6 py-12">
        {coverUrl && (
          <div className="relative w-full h-96 rounded-lg mb-6 overflow-hidden">
            <Image
              src={coverUrl}
              alt={bookData.title}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </div>
        )}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-2"
        >
          {bookData.title}
        </motion.h1>
        <p className="text-gray-400 mb-4">by {bookData.author}</p>
        <p className="text-gray-300">{bookData.review}</p>
      </section>

  );
}
