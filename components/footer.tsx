"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Instagram, Mail, Facebook } from "lucide-react";
import { SOCIAL_LINKS, CONTACT_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-black py-16 text-white md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-2 md:col-span-1 lg:col-span-1"
          >
            <h3 className="mb-4 font-serif text-2xl font-bold">
              AMOR GLAM BEAUTY
            </h3>
            <p className="mb-2 text-sm leading-relaxed text-white/60">
              High-end artistry services and professional-grade beauty products
              for the modern woman.
            </p>
            <p className="mb-6 text-xs text-[#FF69B4] font-medium">
              Licensed Aesthetician | New Orleans, LA
            </p>
            <div className="flex gap-4">
              <Link
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#FF69B4]"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link
                href={SOCIAL_LINKS.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#FF69B4]"
              >
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
              </Link>
              <Link
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-[#FF69B4]"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href={CONTACT_LINKS.email}
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
            className="col-span-1"
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link
                  href="/services"
                  className="transition-colors hover:text-white"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/bridal"
                  className="transition-colors hover:text-white"
                >
                  Bridal
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="transition-colors hover:text-white"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/education"
                  className="transition-colors hover:text-white"
                >
                  Education
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
            className="col-span-1"
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Information
            </h4>
            <ul className="space-y-3 text-sm text-white/60">
              <li>
                <Link
                  href="/faq?tab=policies"
                  className="transition-colors hover:text-white"
                >
                  Policies
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="transition-colors hover:text-white"
                >
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
            className="col-span-2 md:col-span-1 lg:col-span-1"
          >
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              Join the Love List
            </h4>
            <p className="mb-4 text-sm text-white/60">
              Get beauty tips, product drops, and little love notes from Anna.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email for love notes..."
                className="border-white/20 bg-white/10 text-white placeholder:text-white/40 rounded-none"
              />
              <Button
                type="submit"
                className="bg-[#FF69B4] text-white hover:bg-[#FF69B4]/90 rounded-none"
              >
                Join
              </Button>
            </form>
          </motion.div>
        </div>

        {/* Signature */}
        <div className="mt-16 text-center">
          <span className="font-serif italic text-3xl text-white/90 block mb-2">
            With love, Anna
          </span>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-white/40">
          <p>
            &copy; {new Date().getFullYear()} Amor Glam Beauty. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
