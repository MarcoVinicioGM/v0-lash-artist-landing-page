"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Palette } from "lucide-react";
import { BOOKING_LINKS } from "@/lib/constants";

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUFVVbDQAAmgEGq/6+HQAAAABJRU5ErkJggg==";

// Glam gallery images - focused on makeup artistry
const glamImages = [
  { src: "/images/blonde.jpg", alt: "Full glam transformation - Studio work" },
  { src: "/images/Glam-Headshot-Channen-Famou-Person.JPEG", alt: "Celebrity-style glam makeup" },
  { src: "/images/client-news.jpg", alt: "Soft glam natural beauty" },
  { src: "/images/Studio-Pregant-Lighter-Photo-Calmer.JPG", alt: "Diverse skin tone glam transformation" },
  { src: "/images/GroupPhotoMakeup.jpg", alt: "Group glam session" },
  { src: "/images/Headshot-Darker-Complexion-Makeup.jpg", alt: "Signature soft glam" },
];

export function GlamGallery() {
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
            Signature Artistry
          </p>
          <h1 className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
            Glam Gallery
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-600">
            From subtle natural enhancement to bold red carpet glamour, our makeup artistry
            transforms every canvas into a masterpiece. See the precision and creativity that
            defines Amor Glam.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {glamImages.map((image, index) => (
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
              Ready for Your Glam Transformation?
            </h3>
            <p className="text-zinc-600 mb-6">
              Let our Licensed Aesthetician create the perfect look for your special moment.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#FF69B4] text-white hover:bg-[#FF69B4]/90 rounded-none min-h-[48px]"
            >
              <a href={BOOKING_LINKS.softGlam} target="_blank" rel="noopener noreferrer">
                <Palette className="mr-2 h-4 w-4" />
                Book Your Glam Session
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Note for adding more images */}
        {glamImages.length < 8 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-zinc-400"
          >
            More glam transformations coming soon...
          </motion.p>
        )}
      </div>
    </section>
  );
}