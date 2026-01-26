"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Check, Star, ArrowUpRight, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { SQUARESPACE_PRODUCT_URL } from "@/lib/constants";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

const BLUR_DATA_URL = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUFVVbDQAAmgEGq/6+HQAAAABJRU5ErkJggg==";

const FEATURES = [
  "24-Hour Extreme Hold",
  "Latex-Free & Hypoallergenic",
  "Waterproof & Cry-Proof",
  "Brush-On Applicator for Precision",
  "Dries Clear in Seconds"
];

// ─────────────────────────────────────────────────────────────────────────────
// PAGE COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export default function ShopPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="container-max px-6">
          
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* PRODUCT VISUAL (Left) */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative order-2 lg:order-1"
            >
              {/* Artistic Background Blob */}
              <div className="absolute inset-0 bg-[#FDF2F8] rounded-full scale-125 blur-3xl opacity-60 -z-10" />
              
              <div className="relative aspect-square w-full max-w-lg mx-auto bg-white border border-zinc-100 shadow-2xl shadow-[#FF69B4]/10 p-8 flex items-center justify-center">
                <Image
                  src="/images/lash-glue.png"
                  alt="Detailed shot of Amor Glam Lash Adhesive bottle"
                  width={600}
                  height={600}
                  className="object-contain drop-shadow-xl"
                  placeholder="blur"
                  blurDataURL={BLUR_DATA_URL}
                  priority
                />
                {/* Floating Badge */}
                <div className="absolute top-6 right-6 bg-[#09090b] text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-none">
                  Best Seller
                </div>
              </div>
            </motion.div>

            {/* PRODUCT DETAILS (Right) */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="mb-6 flex items-center gap-2">
                <div className="flex text-[#FF69B4]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-zinc-500 font-medium">(150+ Reviews)</span>
              </div>

              <h1 className="font-serif text-5xl lg:text-6xl font-bold text-[#09090b] mb-4">
                The Amor Adhesive
              </h1>
              <p className="text-xl text-zinc-600 mb-8 leading-relaxed max-w-md">
                The only lash glue you'll ever need. Engineered for professional artists and daily wearers who demand perfection.
              </p>

              <div className="bg-[#FDF2F8]/50 p-6 border-l-2 border-[#FF69B4] mb-10">
                <ul className="space-y-3">
                  {FEATURES.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-[#09090b] font-medium">
                      <div className="h-5 w-5 rounded-full bg-white flex items-center justify-center border border-[#FF69B4]/20">
                        <Check className="h-3 w-3 text-[#FF69B4]" />
                      </div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="flex flex-col">
                  <span className="text-3xl font-bold text-[#09090b]">$18.00</span>
                  <span className="text-sm text-zinc-500">In stock • Ships next day</span>
                </div>
                
                <Button 
                  asChild
                  size="lg"
                  className="h-14 px-8 w-full sm:w-auto bg-[#FF69B4] hover:bg-[#FF69B4]/90 text-white rounded-none text-lg font-bold shadow-lg shadow-[#FF69B4]/20"
                >
                  <a href={SQUARESPACE_PRODUCT_URL} target="_blank" rel="noopener noreferrer">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Buy Now
                  </a>
                </Button>
              </div>

              <p className="mt-6 text-xs text-zinc-400 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                Checkout handled securely via Square
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
