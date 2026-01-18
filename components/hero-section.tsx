"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen">
      <div className="grid min-h-screen md:grid-cols-2">
        {/* Left Side - Services */}
        <div className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-black md:min-h-screen">
          <Image
            src="/images/anna-glammed.jpeg"
            alt="Anna - Lead Makeup Artist"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="relative z-10 px-8 text-center text-white">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 text-sm font-medium uppercase tracking-[0.2em]"
            >
              Artistry Services
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 font-serif text-4xl font-bold md:text-5xl lg:text-6xl"
            >
              <span className="text-balance">Unforgettable</span>
              <br />
              <span className="italic">Artistry</span>
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-white/90"
              >
                <Link href="#services">Book Appointments</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Products */}
        <div className="relative flex min-h-[50vh] items-center justify-center overflow-hidden bg-[#FDF2F8] md:min-h-screen">
          <Image
            src="/images/lash-glue.png"
            alt="Amor Collection products"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="relative z-10 px-8 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-black/70"
            >
              Shop Collection
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-6 font-serif text-4xl font-bold text-black md:text-5xl lg:text-6xl"
            >
              <span className="text-balance">The Amor</span>
              <br />
              <span className="italic">Collection</span>
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
                className="border-black bg-transparent text-black hover:bg-black hover:text-white"
              >
                <Link href="#shop">
                  <Heart className="mr-2 h-4 w-4 fill-current text-[#FF69B4]" />
                  Shop Essentials
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Center Overlay Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="rounded-full bg-white px-8 py-6 shadow-2xl md:px-12 md:py-8">
          <h1 className="whitespace-nowrap font-serif text-xl font-bold tracking-wide md:text-2xl lg:text-3xl">
            AMOR GLAM BEAUTY
          </h1>
        </div>
      </motion.div>
    </section>
  );
}
