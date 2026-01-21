"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Check, Heart } from "lucide-react";

const features = [
  "Long-wear formula (8+ hours)",
  "100% Waterproof",
  "Latex-free & hypoallergenic",
  "Professional grade adhesion",
];

export function ShopSection(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <section id="shop" className="bg-black section-padding" {...props}>
        <div className="container-max">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative aspect-[4/5] h-[400px] md:h-auto overflow-hidden rounded-none bg-zinc-900">
              <Image
                src="/images/lash-glue.png"
                alt="Amor Glam Professional Lash Adhesive"
                fill
                className="object-cover"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -right-4 top-8 rounded-full bg-[#FF69B4] px-4 py-2 text-sm font-medium text-white shadow-lg md:-right-6">
              Best Seller
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-white/60">
              The Amor Collection
            </p>
            <h2 className="mb-6 font-serif text-4xl font-bold md:text-5xl">
              Professional Grade.
              <br />
              <span className="italic text-[#FF69B4]">Artist Approved.</span>
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-white/70">
              Our signature lash adhesive trusted by professionals worldwide.
              Formulated for sensitive eyes without compromising hold.
            </p>

            {/* Features */}
            <ul className="mb-10 space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FF69B4]/20">
                    <Check className="h-3 w-3 text-[#FF69B4]" />
                  </div>
                  <span className="text-white/80">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Price & CTA */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div>
                <span className="text-3xl font-bold">$28</span>
                <span className="ml-2 text-white/50 line-through">$35</span>
              </div>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90"
              >
                <Heart className="mr-2 h-4 w-4 fill-current text-[#FF69B4]" />
                Add to Cart
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
