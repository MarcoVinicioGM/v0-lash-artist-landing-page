"use client";

import { motion } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const reviews = [
  {
    text: "10/10 birthday glam! The blend, the glow, the lashes, the lip…everything was perfect! I felt like the best version of myself and got so many compliments. You truly have a gift.",
    author: "Joana R.",
    category: "Birthday Glam",
  },
  {
    text: "I've been going to Anna for six years now, and she's the only person I trust to do my makeup. She's the G.O.A.T. Even though I live in Texas now, I still go to her for any important events when I'm back home!",
    author: "Deidra S.",
    category: "Long-term Client",
  },
  {
    text: "The best MUA! Makeup is always flawless and lasts 12+ hours. She listens to what you want and executes it perfectly. I always feel so stunning after leaving her chair. Book with Anna!",
    author: "Morgan P.",
    category: "Full Glam Client",
  },
  {
    text: "Anna is not only a joy to be around but is so incredibly talented! I've literally never felt prettier or more confident. Her technique is amazing lasted all night and looked beautiful in photographs.",
    author: "Reina T.",
    category: "Glam Client",
  },
  {
    text: "She was absolutely amazing!!! She did my makeup for my bridal shower and I was obsessed with it! I got so many compliments the day of. I will definitely be back!",
    author: "Carly P.",
    category: "Bridal Shower",
  },
  {
    text: "After being hesitant on letting anyone do my makeup. I decided to try out Anna and absolutely loved her work. Expect not only a beautiful glam but also a good time! She's so sweet and has an exceptional work ethic.",
    author: "Stephanie M.",
    category: "New Client",
  },
];

export function LoveLetters() {
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
    return () => {
      if (emblaApi) emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className="bg-white section-padding overflow-hidden">
      <div className="container-max">
        <div className="mb-8 md:mb-12 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#FF69B4] mb-3">
            Testimonials
          </p>
          <h2 className="font-serif text-3xl md:text-5xl text-black">
            Love Letters
          </h2>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {reviews.map((review, i) => (
                <div
                  key={i}
                  className="flex-[0_0_100%] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-stone-50 p-8 md:p-10 rounded-none border border-stone-100 flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="flex gap-1 mb-6 text-[#FF69B4]">
                        {[...Array(5)].map((_, starI) => (
                          <Star key={starI} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-zinc-600 italic leading-relaxed text-lg mb-8" suppressHydrationWarning>
                        &ldquo;{review.text}&rdquo;
                      </p>
                    </div>
                    <div>
                      <p className="font-serif text-xl text-black mb-1">
                        {review.author}
                      </p>
                      <p className="text-xs font-medium uppercase tracking-widest text-zinc-400">
                        {review.category}
                      </p>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-10 lg:hidden">
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
      </div>
    </section>
  );
}
