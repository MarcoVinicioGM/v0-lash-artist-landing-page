"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function MeetTheArtist() {
  return (
    <section className="bg-white overflow-hidden section-padding">
        <div className="container-max">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-[3/4] md:aspect-[4/5] h-[400px] md:h-auto overflow-hidden rounded-none"
          >
            <Image
              src="/images/anna-profile.jpg"
              alt="Anna Garcia - Professional Headshot"
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
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#FF69B4] mb-2">
              Meet The Artist
            </p>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-black mb-8">
              The Art of Detail.
            </h2>
            <div className="space-y-6 text-lg text-zinc-600 leading-relaxed">
              <p>
                I stumbled upon the world of beauty when I immigrated to this country at 9 years old. In an entirely new environment with a new language and culture, I fled reality by playing with makeup, something I was passionate about since a baby when I would crawl with a lipstick in my hand.
              </p>
              <p>
                Shortly after entering high school, I was recognized locally and acquired fully booked weekends by my sophomore year. With 8 years of experience and thousands of faces and hundreds of brides glamorized, my signature style blends red-carpet precision with real-world wearability.
              </p>
            </div>
            
            <div className="mt-8">
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
