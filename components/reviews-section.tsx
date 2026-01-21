"use client";

import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    text: "10/10 she gets the job done right every single time. My lashes last forever.",
    author: "Jessica M.",
  },
  {
    text: "Best lashes I've ever had! The attention to detail is unmatched.",
    author: "Samantha K.",
  },
  {
    text: "I'm obsessed! Everyone asks me where I get my lashes done.",
    author: "Tiffany R.",
  },
  {
    text: "Professional, talented, and makes you feel like a queen.",
    author: "Maria L.",
  },
  {
    text: "My go-to for over 2 years now. Can't imagine going anywhere else!",
    author: "Ashley B.",
  },
];

export function ReviewsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    
    // Auto-scroll logic for "smooth animations"
    const intervalId = setInterval(() => {
      if (emblaApi) emblaApi.scrollNext();
    }, 4000);

    return () => {
      if (emblaApi) emblaApi.off("select", onSelect);
      clearInterval(intervalId);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="py-20 md:py-32 bg-[#FDF2F8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#FF69B4]">
            Testimonials
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-black">
            What Our Clients Say
          </h2>
        </motion.div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="hidden md:block overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-6">
            {[...reviews, ...reviews].map((review, index) => (
              <div
                key={index}
                className="flex-[0_0_50%] min-w-0 pl-6"
              >
                <div className="h-full bg-white rounded-none p-8 border border-zinc-100/50 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex justify-between items-start mb-6">
                    <Quote className="h-8 w-8 text-[#FF69B4]/20" />
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-[#FF69B4] text-[#FF69B4]" />
                      ))}
                    </div>
                  </div>
                  <p className="text-zinc-700 text-lg leading-relaxed font-medium mb-6">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-400">
                      {review.author.charAt(0)}
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-zinc-900">
                      {review.author}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grid for small screens */}
        <div className="md:hidden space-y-6">
          {reviews.slice(0, 3).map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-none p-8 border border-zinc-100/50"
            >
              <div className="flex justify-between items-start mb-6">
                <Quote className="h-8 w-8 text-[#FF69B4]/20" />
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#FF69B4] text-[#FF69B4]" />
                  ))}
                </div>
              </div>
              <p className="text-zinc-700 text-lg leading-relaxed font-medium mb-6">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-zinc-100 flex items-center justify-center text-xs font-bold text-zinc-400">
                  {review.author.charAt(0)}
                </div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-900">
                  {review.author}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden md:flex justify-center gap-4 mt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="rounded-full border-black bg-white hover:bg-black hover:text-white disabled:opacity-30"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="rounded-full border-black bg-white hover:bg-black hover:text-white disabled:opacity-30"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
