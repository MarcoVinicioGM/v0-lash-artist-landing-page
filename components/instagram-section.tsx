"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const images = [
  { src: "/images/blonde.jpg", alt: "Client makeup look" },
  { src: "/images/anna-glammed.jpeg", alt: "Eye makeup detail" },
  { src: "/images/muslim-wedding.jpg", alt: "Bridal makeup" },
  { src: "/images/brow-photo.jpg", alt: "Perfect brows" },
  { src: "/images/wedding-example.jpg", alt: "Full glam look" },
  { src: "/images/famous-person-glammed.jpg", alt: "Glowing skin" },
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

        {/* Masonry Grid */}
        <div className="columns-2 gap-4 md:columns-3">
          {images.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative mb-4 break-inside-avoid overflow-hidden rounded-2xl"
            >
              <div
                className={`relative ${
                  index % 3 === 0
                    ? "aspect-[4/5]"
                    : index % 3 === 1
                      ? "aspect-square"
                      : "aspect-[4/3]"
                }`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                  <Instagram className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
