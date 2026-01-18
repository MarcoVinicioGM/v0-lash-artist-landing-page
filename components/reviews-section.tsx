"use client"

import { Quote, Star } from "lucide-react"
import { motion } from "framer-motion"

const reviews = [
  {
    text: "10/10 she gets the job done right every single time.",
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
]

export function ReviewsSection() {
  return (
    <section className="py-16 md:py-24 bg-[#FDF2F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-serif text-3xl sm:text-4xl text-black text-center text-balance"
        >
          What Our Clients Say
        </motion.h2>
      </div>

      {/* Marquee Container */}
      <div className="relative">
        <div className="flex animate-marquee">
          {[...reviews, ...reviews].map((review, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-80 md:w-96 mx-4"
            >
              <div className="bg-white rounded-2xl p-6 shadow-sm h-full">
                <Quote className="h-8 w-8 text-pink-400 mb-4" />
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-pink-500 text-pink-500" />
                  ))}
                </div>
                <p className="text-black text-lg leading-relaxed">{`"${review.text}"`}</p>
                <p className="mt-4 text-black/60 text-sm">— {review.author}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </section>
  )
}
