"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram, Play } from "lucide-react";

const galleryItems = [
  // TikTok slots (9:16 vertical)
  {
    type: "tiktok",
    label: "Latest TikTok",
    placeholder: true,
    aspectRatio: "aspect-[9/16]",
  },
  {
    type: "tiktok",
    label: "Latest TikTok",
    placeholder: true,
    aspectRatio: "aspect-[9/16]",
  },
  // Instagram slots (1:1 square)
  {
    type: "instagram",
    src: "/images/DarkerSkinComplexion.jpg",
    alt: "Client makeup look",
    aspectRatio: "aspect-square",
  },
  {
    type: "instagram",
    src: "/images/GroupPhotoMakeup.jpg",
    alt: "Eye makeup detail",
    aspectRatio: "aspect-square",
  },
  // AI Image 1
  {
    type: "instagram",
    src: "/images/blonde.jpg",
    alt: "Blonde makeup look",
    aspectRatio: "aspect-square",
  },
  // AI Image 2
  {
    type: "instagram",
    src: "/images/bridal-hero.jpg",
    alt: "Bridal makeup look",
    aspectRatio: "aspect-square",
  },
];

export function InstagramSection() {
  return (
    <section id="gallery" className="bg-white py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-black/60">
            Follow Along
          </p>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            @AmorGlamBeauty
          </h2>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {/* TikTok 1 - Tall vertical */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0 }}
            className="group relative col-span-1 row-span-2 overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-[9/16] h-full w-full bg-zinc-100">
              {/* Placeholder skeleton */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-zinc-100 to-zinc-200">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/80 shadow-sm">
                  <Play className="h-6 w-6 text-zinc-600" />
                </div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Latest TikTok
                </p>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                <svg
                  className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* TikTok 2 - Tall vertical */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="group relative col-span-1 row-span-2 overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-[9/16] h-full w-full bg-zinc-100">
              {/* Placeholder skeleton */}
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-zinc-100 to-zinc-200">
                <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white/80 shadow-sm">
                  <Play className="h-6 w-6 text-zinc-600" />
                </div>
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  Latest TikTok
                </p>
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                <svg
                  className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Instagram 1 - Square */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="group relative col-span-1 overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-square">
              <Image
                src="/images/DarkerSkinComplexion.jpg"
                alt="Client makeup look"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                <Instagram className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>
          </motion.div>

          {/* Instagram 2 - Square */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="group relative col-span-1 overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-square">
              <Image
                src="/images/GroupPhotoMakeup.jpg"
                alt="Eye makeup detail"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                <Instagram className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>
          </motion.div>

          {/* Instagram 3 - Square */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="group relative col-span-1 overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-square">
              <Image
                src="/images/blonde.jpg"
                alt="Blonde makeup look"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                <Instagram className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>
          </motion.div>

          {/* Instagram 4 - Square */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="group relative col-span-1 overflow-hidden rounded-2xl"
          >
            <div className="relative aspect-square">
              <Image
                src="/images/bridal-hero.jpg"
                alt="Bridal makeup look"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                <Instagram className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
