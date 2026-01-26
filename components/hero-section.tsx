"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Calendar, Sparkles, Award } from "lucide-react";
import { BOOKING_URLS } from "@/lib/constants";

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUFVVbDQAAmgEGq/6+HQAAAABJRU5ErkJggg==";

export function HeroSection() {
  return (
    <section className="relative w-full">
      {/* Full-screen hero with image background */}
      <div className="relative flex h-[100dvh] flex-col items-center justify-center lg:h-screen lg:min-h-screen">
        
        {/* Background Image - Anna in luxury makeup aesthetic */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/anna-glammed.jpeg"
            alt="Anna Garcia - Premier Makeup Artist showcasing signature glam look"
            fill
            sizes="100vw"
            className="object-cover transition-opacity duration-700"
            priority
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/30" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 flex flex-col items-center px-6 text-center text-white">
          
          {/* License Badge - ABOVE FOLD & PROMINENT */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 flex items-center gap-2 rounded-none border border-white/30 bg-white/10 backdrop-blur-sm px-4 py-2"
          >
            <Award className="h-4 w-4 text-[#FF69B4]" />
            <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white">
              Licensed Aesthetician
            </span>
          </motion.div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 text-xs font-medium uppercase tracking-[0.25em] text-white/80 md:text-sm"
          >
            New Orleans&apos; Premier
          </motion.p>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 font-serif text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
          >
            <span className="block">Makeup &</span>
            <span className="block italic text-white/90">Brow Artist</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mb-8 max-w-md text-sm leading-relaxed text-white/80 md:text-base"
          >
            Timeless beauty for your most important moments. 
            Professional makeup & brow artistry in the New Orleans Metro area.
          </motion.p>

          {/* Two Distinct Booking CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-3 sm:flex-row sm:gap-4"
          >
            {/* Makeup Booking (Available Daily) */}
            <Button
              asChild
              size="lg"
              className="min-w-[200px] bg-[#FF69B4] text-white hover:bg-[#FF69B4]/90 rounded-none border-none min-h-[48px] text-sm font-medium"
            >
              <a href={BOOKING_URLS.makeup} target="_blank" rel="noopener noreferrer">
                <Calendar className="mr-2 h-4 w-4" />
                Book Glam
              </a>
            </Button>

            {/* Brows & Skin Booking (Mon-Thurs) */}
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-w-[200px] border-white bg-transparent text-white hover:bg-white hover:text-black rounded-none transition-all min-h-[48px] text-sm font-medium"
            >
              <a href={BOOKING_URLS.browsAndSkin} target="_blank" rel="noopener noreferrer">
                <Sparkles className="mr-2 h-4 w-4" />
                Book Brows & Skin (Mon-Thu)
              </a>
            </Button>
          </motion.div>


        </div>

        {/* Center Logo Overlay - Desktop Only */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 hidden lg:block"
        >
          <div className="flex flex-col items-center justify-center border border-white/20 bg-black/40 backdrop-blur-sm px-8 py-4">
            <h2 className="whitespace-nowrap font-serif text-lg font-bold tracking-widest text-white">
              AMOR GLAM
            </h2>
            <p className="mt-1 text-[9px] uppercase tracking-[0.3em] text-white/60">
              Est. 2020
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
