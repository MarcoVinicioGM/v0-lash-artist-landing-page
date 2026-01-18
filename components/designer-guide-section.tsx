"use client"

import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const looks = [
  {
    name: "The Cindy",
    image: "/images/look-cindy.jpg",
    fullness: "Full",
    curl: "D",
    style: "Hollywood Glam",
  },
  {
    name: "The Jasmynn",
    image: "/images/look-jasmynn.jpg",
    fullness: "Medium",
    curl: "CC",
    style: "Anime",
  },
  {
    name: "The Sophia",
    image: "/images/look-sophia.jpg",
    fullness: "Light",
    curl: "C",
    style: "Natural Cat",
  },
  {
    name: "The Maya",
    image: "/images/look-maya.jpg",
    fullness: "Medium",
    curl: "D",
    style: "Fox Eye",
  },
]

export function DesignerGuideSection() {
  return (
    <section className="py-20 md:py-32 bg-[#FDF2F8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black text-balance">
            Choose Your Character
          </h2>
          <p className="mt-4 text-black/60 text-lg max-w-2xl mx-auto">
            Each look is meticulously crafted to complement your unique features
          </p>
        </motion.div>

        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {looks.map((look, index) => (
            <LookCard key={look.name} look={look} index={index} />
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
          <div className="flex gap-4" style={{ width: "max-content" }}>
            {looks.map((look, index) => (
              <div key={look.name} className="w-72">
                <LookCard look={look} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function LookCard({ look, index }: { look: typeof looks[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
        <div className="relative aspect-[3/4] overflow-hidden">
          <Image
            src={look.image || "/placeholder.svg"}
            alt={`${look.name} lash style - ${look.style}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-5">
          <h3 className="font-serif text-xl text-black">{look.name}</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-[#FDF2F8] text-black/70 text-xs rounded-full">
              Fullness: {look.fullness}
            </span>
            <span className="px-3 py-1 bg-[#FDF2F8] text-black/70 text-xs rounded-full">
              Curl: {look.curl}
            </span>
            <span className="px-3 py-1 bg-[#FDF2F8] text-black/70 text-xs rounded-full">
              {look.style}
            </span>
          </div>
          <Button 
            variant="ghost" 
            className="mt-4 w-full justify-between text-black hover:text-pink-600 hover:bg-transparent p-0"
          >
            Book This Look
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
