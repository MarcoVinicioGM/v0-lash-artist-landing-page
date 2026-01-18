"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    text: "Anna made me feel like the most beautiful version of myself. Her attention to detail is unmatched, and the glam lasted all night through dancing and tears.",
    author: "Sarah J.",
    category: "Bridal Client",
  },
  {
    text: "The ultimate professional. I've never had my skin look so flawless yet natural. She really understands lighting and how makeup translates to camera.",
    author: "Michelle R.",
    category: "Editorial Project",
  },
  {
    text: "Mastered exactly what I wanted even when I didn't know how to describe it. Anna is truly an artist in every sense of the word. Highly recommend!",
    author: "Ashley D.",
    category: "Full Glam Session",
  },
];

export function LoveLetters() {
  return (
    <section className="bg-white py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#FF69B4] mb-3">
            Testimonials
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-black">
            Love Letters
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-stone-50 p-8 md:p-10 rounded-3xl flex flex-col justify-between"
            >
              <div>
                <div className="flex gap-1 mb-6 text-[#FF69B4]">
                  {[...Array(5)].map((_, starI) => (
                    <Star key={starI} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="text-zinc-600 italic leading-relaxed text-lg mb-8">
                  &ldquo;{review.text}&rdquo;
                </p>
              </div>
              <div>
                <p className="font-serif text-xl text-black mb-1">
                  {review.author}
                </p>
                <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
                  {review.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
