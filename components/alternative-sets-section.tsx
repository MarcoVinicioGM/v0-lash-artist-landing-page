"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const styles = [
  {
    name: "Soft Girl",
    image: "/images/anna-profile.jpg",
    description: "Delicate, natural-looking lashes for an effortlessly beautiful everyday look.",
  },
  {
    name: "Hybrid",
    image: "/images/blonde.jpg",
    description: "The perfect balance of volume and natural. Versatile for any occasion.",
  },
  {
    name: "Volume",
    image: "/images/famous-person-glammed.jpg",
    description: "Bold, dramatic fullness that makes a statement. For the fearless.",
  },
]

export function AlternativeSetsSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black text-balance">
            Alternative Sets
          </h2>
          <p className="mt-4 text-black/60 text-lg max-w-2xl mx-auto">
            Not sure which designer look suits you? Explore our signature styles
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {styles.map((style, index) => (
            <motion.div
              key={style.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6">
                <Image
                  src={style.image || "/placeholder.svg"}
                  alt={`${style.name} lash style`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              </div>
              <h3 className="font-serif text-2xl text-black">{style.name}</h3>
              <p className="mt-2 text-black/60 leading-relaxed">{style.description}</p>
              <Button 
                variant="link" 
                className="mt-3 px-0 text-black hover:text-pink-600 font-medium"
              >
                Explore Style
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
