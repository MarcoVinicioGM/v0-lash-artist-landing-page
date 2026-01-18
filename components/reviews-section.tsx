"use client";

import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";

const reviews = [
  {
    text: "10/10 she gets the job done right every single time. My lashes last forever.",
    author: "Jessica M.",
  },
  {
    text: "Best lashes I've ever had! The attention to detail is unmatched.",
    author: "Samantha K.",
  },
  {
    text: "I'm obsessed! Everyone asks me where I get my lashes done.",
    author: "Tiffany R.",
  },
  {
    text: "Professional, talented, and makes you feel like a queen.",
    author: "Maria L.",
  },
  {
    text: "My go-to for over 2 years now. Can't imagine going anywhere else!",
    author: "Ashley B.",
  },
];

export function ReviewsSection() {
  return (
    <section className="py-20 md:py-32 bg-[#FDF2F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#FF69B4]">
            Testimonials
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black">
            What Our Clients Say
          </h2>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div className="relative flex w-full overflow-hidden mask-linear-fade">
        <motion.div
          className="flex gap-6 pr-6"
          animate={{ x: "-50%" }}
          transition={{
            ease: "linear",
            duration: 40,
            repeat: Infinity,
          }}
          // Pause animation on hover so users can read
          whileHover={{ animationPlayState: "paused" }}
        >
          {/* We duplicate the reviews array 4 times to ensure seamless looping on large screens */}
          {[...reviews, ...reviews, ...reviews, ...reviews].map((review, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[300px] md:w-[400px]"
            >
              <div className="h-full bg-white rounded-none p-8 border border-zinc-100/50 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-start mb-6">
                  <Quote className="h-8 w-8 text-[#FF69B4]/20" />
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-[#FF69B4] text-[#FF69B4]" />
                    ))}
                  </div>
                </div>
                <p className="text-zinc-700 text-lg leading-relaxed font-medium mb-6">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-400">
                    {review.author.charAt(0)}
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-900">
                    {review.author}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
