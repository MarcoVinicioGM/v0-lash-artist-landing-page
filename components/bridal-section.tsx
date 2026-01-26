"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export function BridalSection(props: React.HTMLAttributes<HTMLElement>) {
  return (
    <section id="bridal" className="bg-[#FDF2F8] section-padding" {...props}>
        <div className="container-max">
        <div className="grid items-center gap-6 lg:grid-cols-2 lg:gap-12">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <h2 className="mb-6 font-serif text-4xl font-bold text-black md:text-5xl lg:text-6xl">
              Your Big Day,
              <br />
              <span className="italic">Perfected.</span>
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-black/70">
              From your engagement party to the moment you say 'I do', I craft every detail so you feel confident, radiant, and absolutely special on such a memorable moment.
            </p>

            {/* Bridal Actions */}
            <div className="flex">
              <Button
                asChild
                size="lg"
                className="w-full md:w-auto bg-black text-white transition-all duration-200 hover:bg-black/80 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Link href="/bridal">View Bridal Experience</Link>
              </Button>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="relative aspect-[4/4.5] md:aspect-[4/4] lg:aspect-[4/4.5] overflow-hidden rounded-none">
              <Image
                src="/images/bridal-new.jpg"
                alt="Radiant bride with flawless complexion and soft glam makeup"
                fill
                className="object-cover object-bottom"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
