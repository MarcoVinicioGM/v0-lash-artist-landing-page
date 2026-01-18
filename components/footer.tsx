"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 font-serif text-2xl font-bold">
              AMOR GLAM BEAUTY
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-white/60">
              High-end artistry services and professional-grade beauty products
              for the modern woman.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://instagram.com/amorglambeauty"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#FF69B4]"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href="mailto:hello@amorglambeauty.com"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#FF69B4]"
              >
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link href="#services" className="transition-colors hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#shop" className="transition-colors hover:text-white">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="#bridal" className="transition-colors hover:text-white">
                  Bridal
                </Link>
              </li>
              <li>
                <Link href="#gallery" className="transition-colors hover:text-white">
                  Gallery
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Policies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Information
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link href="/policies" className="transition-colors hover:text-white">
                  Policies
                </Link>
              </li>
              <li>
                <Link href="/ingredients" className="transition-colors hover:text-white">
                  Ingredients
                </Link>
              </li>
              <li>
                <Link href="/track-order" className="transition-colors hover:text-white">
                  Track Order
                </Link>
              </li>
              <li>
                <Link href="/faq" className="transition-colors hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Join the Amor Glam Club
            </h4>
            <p className="mb-4 text-sm text-white/60">
              Get exclusive offers, beauty tips, and early access to new
              products.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="border-white/20 bg-white/10 text-white placeholder:text-white/40"
              />
              <Button
                type="submit"
                className="bg-[#FF69B4] text-white hover:bg-[#FF69B4]/90"
              >
                Join
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} Amor Glam Beauty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
