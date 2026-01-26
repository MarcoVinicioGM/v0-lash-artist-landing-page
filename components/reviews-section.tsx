"use client";

import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    text: "10/10 birthday glam! The blend, the glow, the lashes, the lip…everything was perfect! I felt like the best version of myself and got so many compliments. You truly have a gift.",
    author: "Joana R.",
  },
  {
    text: "I've been going to Anna for 8 years now, and she's the only person I trust to do my makeup. She's G.O.A.T.",
    author: "Deidra S.",
  },
  {
    text: "The best MUA! Makeup is always flawless and lasts 12+ hours. She listens to what you want and executes it perfectly. I always feel so stunning after leaving her chair.",
    author: "Morgan P.",
  },
  {
    text: "Anna is not only a joy to be around but is so incredibly talented! I've literally never felt prettier or more confident. Her technique is amazing lasted all night and looked beautiful in photographs.",
    author: "Reina T.",
  },
  {
    text: "She was absolutely amazing!!! She did my makeup for my bridal shower and I was obsessed with it! I got so many compliments the day of.",
    author: "Carly P.",
  },
  {
    text: "After being hesitant on letting anyone do my makeup. I decided to try out Anna and absolutely loved her work. Expect not only a beautiful glam but also a good time! She's so sweet and has an exceptional work ethic.",
    author: "Stephanie M.",
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
