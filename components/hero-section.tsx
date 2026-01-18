"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, Calendar } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative w-full">
      {/* Responsive Height Strategy:
        - Mobile: 100dvh (Dynamic Viewport Height - ignores address bar)
        - Desktop: min-h-screen (Ensures it never shrinks below viewport)
      */}
      <div className="flex h-[100dvh] flex-col lg:h-screen lg:min-h-screen lg:flex-row">

        {/* LEFT SIDE - SERVICES
          Strategy: Relative container for text flow, Absolute background for image
        */}
        <div className="relative flex h-1/2 w-full items-center justify-center bg-zinc-900 lg:h-full lg:w-1/2">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/anna-glammed.jpeg"
              alt="Anna - Lead Makeup Artist"
              fill
              // Critical: Only download 50vw on desktop, 100vw on mobile
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-60 transition-opacity duration-700"
              priority // High Priority: This is the LCP Element
            />
            {/* Gradient Overlay for Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-black/20" />
          </div>

          {/* Content Layer */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center text-white lg:items-end lg:pr-24 lg:text-right">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-white/80 md:text-sm"
            >
              Artistry Services
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 font-serif text-4xl font-bold leading-tight md:text-6xl lg:text-7xl"
            >
              <span className="block">Unforgettable</span>
              <span className="block italic text-white/90">Artistry</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                asChild
                size="lg"
                className="min-w-[160px] bg-white text-black hover:bg-zinc-100 rounded-none border-none"
              >
                <Link href="/services">
                  <Calendar className="mr-2 h-4 w-4" />
                  Book Appointment
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE - PRODUCTS
        */}
        <div className="relative flex h-1/2 w-full items-center justify-center bg-[#FDF2F8] lg:h-full lg:w-1/2">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/lash-glue.png"
              alt="Amor Collection products"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover opacity-30 mix-blend-multiply transition-opacity duration-700 hover:opacity-40"
              priority
            />
          </div>

          {/* Content Layer */}
          <div className="relative z-10 flex flex-col items-center px-6 text-center lg:items-start lg:pl-24 lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-black/60 md:text-sm"
            >
              Shop Collection
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 font-serif text-4xl font-bold leading-tight text-black md:text-6xl lg:text-7xl"
            >
              <span className="block">The Amor</span>
              <span className="block italic text-black">Collection</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-w-[160px] border-black bg-transparent text-black hover:bg-black hover:text-white rounded-none transition-all"
              >
                <Link href="#shop">
                  {/* Pink Heart Restored */}
                  <Heart className="mr-2 h-4 w-4 text-[#FF69B4] fill-current" />
                  Shop Essentials
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* CENTER LOGO OVERLAY
          - Hidden on Mobile
          - Absolutely centered on Desktop
        */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="absolute left-1/2 top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
        >
          <div className="flex flex-col items-center justify-center border border-zinc-100 bg-white px-10 py-8 shadow-2xl">
            <h1 className="whitespace-nowrap font-serif text-2xl font-bold tracking-widest text-black">
              AMOR GLAM
            </h1>
            <p className="mt-2 text-[10px] uppercase tracking-[0.3em] text-zinc-400">
              Est. 2020
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
