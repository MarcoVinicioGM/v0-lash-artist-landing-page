"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Heart } from "lucide-react";
import { BOOKING_LINKS } from "@/lib/constants";

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUFVVbDQAAmgEGq/6+HQAAAABJRU5ErkJggg==";

// Bridal gallery images - focused on wedding and bridal looks
const bridalImages = [
  { src: "/images/bridal-hero.jpg", alt: "Radiant bridal beauty" },
  { src: "/images/wedding-group.jpg", alt: "Bridal party glam session" },
  { src: "/images/muslim-wedding.jpg", alt: "Traditional bridal makeup" },
  { src: "/images/bridal-new.jpg", alt: "Wedding day perfection" },
];

export function BridalGallery() {
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
            Your Big Day
          </p>
          <h1 className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
            Bridal Gallery
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-600">
            Your wedding day deserves perfection. From intimate ceremonies to grand celebrations,
            we specialize in bridal makeup that enhances your natural beauty and captures your
            unique vision.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bridalImages.map((image, index) => (
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

        {/* Services Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="mx-auto max-w-4xl">
            <h3 className="font-serif text-3xl font-bold text-center mb-8">
              Our Bridal Services
            </h3>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-none border border-zinc-200 p-6">
                <h4 className="font-serif text-xl font-semibold mb-3">
                  Bridal Trial ($200)
                </h4>
                <p className="text-zinc-600 mb-4">
                  Perfect your look before the big day. We recommend booking a trial
                  at least 2-4 weeks before your wedding to ensure your vision is realized.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-[#FF69B4] text-white hover:bg-[#FF69B4]/90 rounded-none"
                >
                  <a href="/services">Book Bridal Trial</a>
                </Button>
              </div>
              <div className="rounded-none border border-zinc-200 p-6">
                <h4 className="font-serif text-xl font-semibold mb-3">
                  Wedding Day Glam ($350)
                </h4>
                <p className="text-zinc-600 mb-4">
                  Flawless artistry from ceremony to reception. Includes touch-up kit
                  and the peace of mind that comes with working with a Licensed Aesthetician.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-[#FF69B4] text-white hover:bg-[#FF69B4]/90 rounded-none"
                >
                  <a href="/services">Book Wedding Day</a>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="mx-auto max-w-xl rounded-none border border-zinc-200 bg-zinc-50 p-8">
            <h3 className="font-serif text-2xl font-bold mb-3">
              Start Your Bridal Journey
            </h3>
            <p className="text-zinc-600 mb-6">
              Let us help make your wedding day unforgettable. Contact us to discuss
              your vision and book your consultation.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-[#FF69B4] text-white hover:bg-[#FF69B4]/90 rounded-none min-h-[48px]"
            >
              <a href={BOOKING_LINKS.general} target="_blank" rel="noopener noreferrer">
                <Heart className="mr-2 h-4 w-4" />
                Request Bridal Quote
              </a>
            </Button>
          </div>
        </motion.div>

        {/* Note for adding more images */}
        {bridalImages.length < 8 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-sm text-zinc-400"
          >
            More bridal transformations coming soon...
          </motion.p>
        )}
      </div>
    </section>
  );
}