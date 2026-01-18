"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative h-[85dvh] w-full overflow-hidden lg:h-screen lg:min-h-screen">
      <div className="flex h-full flex-col lg:flex-row">
        {/* Left Side - Services */}
        <div className="relative h-1/2 w-full bg-black lg:h-full lg:w-1/2">
          <Image
            src="/images/anna-glammed.jpeg"
            alt="Anna - Lead Makeup Artist"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center text-white lg:pr-32 lg:-translate-y-12 2xl:pr-0 2xl:translate-y-0">
            {/* Background overlay for mobile readability */}
            <div className="absolute inset-0 -z-10 bg-black/40 backdrop-blur-sm lg:hidden" />
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-2 text-xs font-medium uppercase tracking-[0.2em] lg:mb-4 lg:text-sm"
            >
              Artistry Services
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 font-serif text-3xl font-bold md:text-5xl lg:mb-6 lg:text-5xl xl:text-6xl"
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
                size="default"
                className="bg-white text-black hover:bg-white/90 lg:size-lg"
              >
                <Link href="/services">Book Appointments</Link>
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Products */}
        <div className="relative h-1/2 w-full bg-[#FDF2F8] lg:h-full lg:w-1/2">
          <Image
            src="/images/lash-glue.png"
            alt="Amor Collection products"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-8 text-center lg:pl-32 lg:-translate-y-12 2xl:pl-0 2xl:translate-y-0">
            {/* Background overlay for mobile readability */}
            <div className="absolute inset-0 -z-10 bg-white/40 backdrop-blur-sm lg:hidden" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-black/70 lg:mb-4 lg:text-sm"
            >
              Shop Collection
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 font-serif text-3xl font-bold text-black md:text-5xl lg:mb-6 lg:text-5xl xl:text-6xl"
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
                size="default"
                variant="outline"
                className="border-black bg-transparent text-black hover:bg-black hover:text-white lg:size-lg"
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
        className="hidden lg:block absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 lg:scale-75 2xl:scale-100"
      >
        <div className="rounded-none bg-white px-8 py-6 shadow-2xl md:px-12 md:py-8 border border-zinc-100">
          <h1 className="whitespace-nowrap font-serif text-xl font-bold tracking-wide md:text-2xl lg:text-3xl">
            AMOR GLAM BEAUTY
          </h1>
        </div>
      </motion.div>
    </section>
  );
}
