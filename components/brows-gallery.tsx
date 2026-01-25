"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Sparkles } from "lucide-react";
import { BOOKING_URLS } from "@/lib/constants";

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUFVVbDQAAmgEGq/6+HQAAAABJRU5ErkJggg==";

// Brow gallery images - Add more brow-specific images as you get them
const browImages = [
  {
    src: "/images/microblading-alt.jpg",
    alt: "Microblading result - natural brow enhancement",
    category: "Microblading",
  },
  {
    src: "/images/microblading-new.jpg",
    alt: "Fresh microblading - healed results",
    category: "Microblading",
  },
  {
    src: "/images/brow-photo.jpg",
    alt: "Brow shaping and tinting",
    category: "Brow Shaping",
  },
  // Add more brow images here as they become available
  // {
  //   src: "/images/brow-lamination-1.jpg",
  //   alt: "Brow lamination result",
  //   category: "Brow Lamination",
  // },
];

export function BrowsGallery() {
  return (
    <section className="bg-white pt-28 pb-20 md:pt-32 md:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link 
            href="/gallery" 
            className="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-black transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Gallery
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#FF69B4]">
            Precision Artistry
          </p>
          <h1 className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
            Brows Portfolio
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-600">
            Every brow is unique. As a Licensed Aesthetician, I specialize in creating 
            symmetrical, natural-looking brows that enhance your features. From microblading 
            to brow lamination, see the precision that goes into every service.
          </p>
        </motion.div>

        {/* Services Available */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 flex flex-wrap justify-center gap-3"
        >
          {["Microblading", "Brow Lamination", "Brow Shaping", "Brow Tinting"].map((service) => (
            <span 
              key={service}
              className="rounded-none border border-zinc-200 bg-zinc-50 px-4 py-2 text-sm text-zinc-700"
            >
              {service}
            </span>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {browImages.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-none bg-zinc-100"
            >
              <div className="relative aspect-square">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="text-sm font-medium text-white">{image.category}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="mx-auto max-w-xl rounded-none border border-zinc-200 bg-zinc-50 p-8">
            <h3 className="font-serif text-2xl font-bold mb-3">
              Ready for Your Perfect Brows?
            </h3>
            <p className="text-zinc-600 mb-6">
              Brow & Skin services are available Monday through Thursday. 
              Book your consultation today.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#FF69B4] text-white hover:bg-[#FF69B4]/90 rounded-none min-h-[48px]"
            >
              <a href={BOOKING_URLS.browsAndSkin} target="_blank" rel="noopener noreferrer">
                <Sparkles className="mr-2 h-4 w-4" />
                Book Brows & Skin (Mon-Thu)
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Note for adding more images */}
        {browImages.length < 6 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-zinc-400"
          >
            More brow transformations coming soon...
          </motion.p>
        )}
      </div>
    </section>
  );
}
