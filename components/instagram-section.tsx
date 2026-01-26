"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SOCIAL_LINKS } from "@/lib/constants";

const tabs = [
  { id: "glam", label: "Glam" },
  { id: "brows", label: "Brows & Skin" },
  { id: "bridal", label: "Bridal" },
];

// Gallery images organized by category
const galleryImages = {
  glam: [
    { src: "/images/Studio-Pregant-Lighter-Photo-Calmer.JPG", alt: "Soft glam makeup look" },
    { src: "/images/blonde.jpg", alt: "Full glam transformation" },
    { src: "/images/Glam-Headshot-Channen-Famou-Person.JPEG", alt: "Celebrity-style glam" },
    { src: "/images/client-news.jpg", alt: "Natural beauty enhancement" },
    { src: "/images/GroupPhotoMakeup.jpg", alt: "Group glam session" },
    { src: "/images/Headshot-Darker-Complexion-Makeup.jpg", alt: "Signature soft glam" },
  ],
  bridal: [
    { src: "/images/bridal-hero.jpg", alt: "Radiant bridal beauty" },
    { src: "/images/wedding-group.jpg", alt: "Bridal party glam session" },
    { src: "/images/muslim-wedding.jpg", alt: "Traditional bridal makeup" },
    { src: "/images/bridal-new.jpg", alt: "Wedding day perfection" },
  ],
  brows: [
    { src: "/images/microblading-alt.jpg", alt: "Microblading result" },
    { src: "/images/microblading-new.jpg", alt: "Fresh microblading healed" },
    { src: "/images/brow-photo.jpg", alt: "Brow shaping and tinting" },
  ],
};

type TabId = keyof typeof galleryImages;

export function InstagramSection(props: React.HTMLAttributes<HTMLElement>) {
  const [activeTab, setActiveTab] = useState<TabId>("glam");

  return (
    <section id="gallery" className="bg-white py-20 md:py-32" {...props}>
      <div className="mx-auto max-w-5xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-black/60">
            Follow Along
          </p>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            @AmorGlam
          </h2>
        </motion.div>

        {/* Tab Slider - Same style as Service Menu */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex gap-0.5 rounded-full bg-gray-100 p-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabId)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-black/70 hover:text-black"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="galleryActiveTab"
                    className="absolute inset-0 rounded-full bg-black"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:gap-6"
          >
            {galleryImages[activeTab].map((image, index) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group relative overflow-hidden rounded-none cursor-pointer"
                onClick={() => window.open(SOCIAL_LINKS.instagram, '_blank', 'noopener,noreferrer')}
              >
                <div className="relative aspect-square">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/40">
                    <Instagram className="h-8 w-8 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View Full Gallery CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-black bg-transparent text-black hover:bg-black hover:text-white rounded-none min-h-[48px]"
          >
            <Link href="/gallery">
              View Full Gallery
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
