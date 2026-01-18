"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Award } from "lucide-react";

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
    },
    {
      id: 2,
      name: "Full Glam",
      price: 150,
      image: "/images/bridal-alt.jpg",
      description: "Bold and camera-ready",
    },
  ],
  brows: [
    {
      id: 1,
      name: "Microblading",
      price: 400,
      image: "/images/microblading-new.jpg",
      badge: "3 Hours",
      badgeIcon: Clock,
    },
    {
      id: 2,
      name: "Signature Facial",
      price: 120,
      image: "/images/anna-glammed.jpeg",
      badge: "30 Mins",
      badgeIcon: Clock,
    },
    {
      id: 3,
      name: "Brow Lamination Bundle",
      price: 75,
      image: "/images/brow-photo.jpg",
      badge: "Best Seller",
      badgeIcon: Award,
    },
  ],
  bridal: [
    {
      id: 1,
      name: "Bridal Trial",
      price: 200,
      image: "/images/muslim-wedding.jpg",
      description: "Perfect your look before the big day",
    },
    {
      id: 2,
      name: "Wedding Day Glam",
      price: 350,
      image: "/images/wedding-group.jpg",
      description: "Flawless from ceremony to reception",
    },
  ],
};

type TabId = keyof typeof services;

export function ServiceMenuSection() {
  const [activeTab, setActiveTab] = useState<TabId>("makeup");

  return (
    <section id="services" className="bg-white py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-black/60">
            Our Services
          </p>
          <h2 className="font-serif text-4xl font-bold md:text-5xl">
            The Menu
          </h2>
        </motion.div>

        {/* Tabs */}
        <div className="mb-12 flex justify-center">
          <div className="inline-flex gap-1 rounded-full bg-gray-100 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabId)}
                className={`relative rounded-full px-6 py-2.5 text-sm font-medium transition-all ${
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
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl bg-gray-50"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {"badge" in service && (
                    <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-medium backdrop-blur-sm">
                      {service.badgeIcon && (
                        <service.badgeIcon className="h-3.5 w-3.5" />
                      )}
                      {service.badge}
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex items-center justify-between p-5">
                  <div>
                    <h3 className="font-serif text-lg font-semibold">
                      {service.name}
                    </h3>
                    {"description" in service && (
                      <p className="mt-1 text-sm text-black/60">
                        {service.description}
                      </p>
                    )}
                    <p className="mt-2 text-lg font-bold">${service.price}</p>
                  </div>
                  <Button
                    size="icon"
                    className="h-10 w-10 rounded-full bg-black text-white hover:bg-black/80"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
