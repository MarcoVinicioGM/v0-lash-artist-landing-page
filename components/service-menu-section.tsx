"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { BOOKING_LINKS } from "@/lib/constants";

const tabs = [
  { id: "makeup", label: "Makeup" },
  { id: "brows", label: "Brows & Skin" },
  { id: "bridal", label: "Bridal" },
];

const services = {
  makeup: [
    {
      id: 1,
      name: "Soft Glam",
      price: 125,
      image: "/images/client-news.jpg",
      description: "Natural beauty enhanced",
      bookingLink: BOOKING_LINKS.softGlam,
    },
    {
      id: 2,
      name: "Full Glam",
      price: 150,
      image: "/images/famous-person-glammed.jpg",
      description: "Bold and camera-ready",
      bookingLink: BOOKING_LINKS.fullGlam,
    },
    {
      id: 3,
      name: "On Location Glam",
      price: 225,
      image: "/images/DarkerSkinComplexion.jpg",
      description: "Starting at $225 in the New Orleans Metro Area",
      bookingLink: BOOKING_LINKS.houseCall,
    },
  ],
  brows: [
    {
      id: 1,
      name: "Microblading",
      price: 400,
      image: "/images/microblading-new.jpg",
      bookingLink: BOOKING_LINKS.microblading,
    },
    {
      id: 2,
      name: "Signature Facial",
      price: 120,
      image: "/images/blonde.jpg",
      bookingLink: BOOKING_LINKS.general,
    },
    {
      id: 3,
      name: "Brow Lamination Bundle",
      price: 75,
      image: "/images/brow-photo.jpg",
      bookingLink: BOOKING_LINKS.browLaminationBundle,
    },
  ],
  bridal: [
    {
      id: 1,
      name: "Bridal Trial",
      price: 200,
      image: "/images/muslim-wedding.jpg",
      description: "Perfect your look before the big day",
      bookingLink: BOOKING_LINKS.bridal,
    },
    {
      id: 2,
      name: "Wedding Day Glam",
      price: 350,
      image: "/images/wedding-group.jpg",
      description: "Flawless from ceremony to reception",
      bookingLink: BOOKING_LINKS.bridal,
    },
  ],
};

type TabId = keyof typeof services;

export function ServiceMenuSection({ showPrices = true, ...props }: { showPrices?: boolean } & React.HTMLAttributes<HTMLElement>) {
  const [activeTab, setActiveTab] = useState<TabId>("makeup");

  return (
    <section id="services" className="bg-white section-padding" {...props}>
      <div className="container-max">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-4 text-center"
        >
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-black/60">
            Our Services
          </p>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            {showPrices ? "The Full Menu" : "The Menu"}
          </h2>
        </motion.div>

        <div className="mb-4 flex justify-center">
          <div className="inline-flex gap-0.5 rounded-full bg-gray-100 p-0.5">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabId)}
                className={`relative rounded-full px-3 py-1.5 text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "text-white"
                    : "text-black/70 hover:text-black"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.span
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-black"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
             {services[activeTab].map((service, index) => (
              <motion.article
                key={service.id}
                data-testid="service-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-gray-50 flex flex-col h-full"
              >
                {!showPrices && (
                  <Link href="/services" className="absolute inset-0 z-10" />
                )}
                 <div className="relative aspect-[3/2] md:aspect-[4/3] overflow-hidden">
                   <Image
                     src={service.image || "/placeholder.svg"}
                     alt={service.name}
                     fill
                     className="object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                 </div>

                <div className="flex flex-col flex-1 p-3 md:p-5">
                  <div className="flex items-start justify-between mb-0 md:mb-2">
                    <h3 className="font-serif text-base md:text-lg font-semibold">
                      {service.name}
                    </h3>
                    {showPrices && (
                      <p className="text-base md:text-lg font-bold">${service.price}</p>
                    )}
                  </div>
                  
                  {"description" in service && (
                    <p className="hidden md:block text-xs md:text-sm text-black/60 mb-4 md:mb-6">
                      {service.description}
                    </p>
                  )}

                  <div className="mt-auto">
                    {showPrices && (
                       <Button
                         asChild
                         className="w-full bg-black text-white hover:bg-black/80"
                       >
<a href={service.bookingLink || BOOKING_LINKS.general} target="_blank" rel="noopener noreferrer">
                            Book Appointment
                          </a>
                       </Button>
                     )}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
