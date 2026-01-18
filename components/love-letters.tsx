"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

const reviews = [
  {
    text: "Anna did my makeup as well as my entire bridal party for my wedding, bridal shower, and rehearsal! From someone who doesn't trust many people to do my makeup, she was an absolute breeze to work with.",
    author: "Sierra B.",
    category: "Bridal Client",
  },
  {
    text: "The best MUA! Makeup is always flawless and lasts 12+ hours. She listens to what you want and executes it perfectly. I always feel so stunning after leaving her chair. Book with Anna!",
    author: "Morgan P.",
    category: "Full Glam Client",
  },
  {
    text: "I've been going to Anna for six years now, and she's the only person I trust. Even though I live in Texas now, I still go to her for any important events when I'm back home!",
    author: "Deidra S.",
    category: "Long-term Client",
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:overflow-visible overflow-x-auto scrollbar-hide flex md:flex-row flex-nowrap snap-x snap-mandatory -mx-6 px-6 md:mx-0 md:px-0">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-stone-50 p-8 md:p-10 rounded-none border border-stone-100 flex flex-col justify-between min-w-[85vw] md:min-w-0 snap-center"
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
