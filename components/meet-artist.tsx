"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function MeetTheArtist() {
  return (
    <section className="bg-white py-20 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-3xl"
          >
            <Image
              src="/images/anna-profile.jpg"
              alt="Anna Garcia - Editorial Portrait"
              fill
              className="object-cover filter grayscale"
            />
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#FF69B4] mb-4">
              Meet The Artist
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black mb-8">
              The Art of Detail.
            </h2>
            <div className="space-y-6 text-lg text-zinc-600 leading-relaxed">
              <p>
                I believe makeup shouldn&apos;t mask your features—it should celebrate them. 
                With over 5 years of experience and 1,000+ faces glamorized, my signature 
                style blends red-carpet precision with real-world wearability.
              </p>
              <p>
                Every client who sits in my chair receives more than just a service; 
                they receive a personalized transformation designed to highlight 
                their unique bone structure and natural radiance.
              </p>
            </div>
            
            <div className="mt-12">
              <span className="font-serif italic text-4xl text-black block mb-1">
                Anna Garcia
              </span>
              <p className="text-sm text-zinc-400 font-medium uppercase tracking-widest">
                Founder & Master Artist
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
