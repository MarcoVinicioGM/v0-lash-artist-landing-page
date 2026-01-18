"use client"

import Image from "next/image"
import { ShoppingBag } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const products = [
  {
    name: "Wispy Classic Tray",
    image: "/images/product-lash-tray-1.jpg",
    price: 24.99,
    originalPrice: null,
    badge: "Best Seller",
  },
  {
    name: "Volume Fan Tray",
    image: "/images/product-lash-tray-2.jpg",
    price: 19.99,
    originalPrice: 28.99,
    badge: "Sale",
  },
  {
    name: "Mink Collection",
    image: "/images/product-lash-tray-3.jpg",
    price: 34.99,
    originalPrice: null,
    badge: null,
  },
  {
    name: "Hybrid Mix Tray",
    image: "/images/product-lash-tray-4.jpg",
    price: 22.99,
    originalPrice: null,
    badge: "Best Seller",
  },
]

export function BestSellersSection() {
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
        >
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black text-balance">
              Best Sellers
            </h2>
            <p className="mt-2 text-black/60 text-lg">Professional-grade supplies for artists</p>
          </div>
          <Button 
            variant="link" 
            className="text-black hover:text-pink-600 font-medium px-0 self-start sm:self-auto"
          >
            View All Products
          </Button>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 mb-4">
                {product.badge && (
                  <span className="absolute top-3 left-3 z-10 px-3 py-1 bg-pink-500 text-white text-xs font-medium rounded-full">
                    {product.badge}
                  </span>
                )}
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                <Button 
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 bg-black text-white hover:bg-pink-600 rounded-full"
                  size="sm"
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </div>
              <h3 className="font-medium text-black">{product.name}</h3>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-black font-medium">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-black/40 line-through text-sm">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
