"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Calendar, Heart, Monitor, Star, Instagram } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { SOCIAL_LINKS } from "@/lib/constants";

interface LinkButtonProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  href?: string;
  target?: string;
  rel?: string;
}

function LinkButton({ icon, title, subtitle, href = "#", target, rel }: LinkButtonProps) {
  return (
    <Link href={href} target={target} rel={rel} className="group relative block w-full">
      <div className="absolute inset-0 translate-x-[3px] translate-y-[3px] border-2 border-white/40" />
      <div className="relative flex w-full items-stretch border-2 border-white bg-black text-white transition-all duration-200 hover:bg-white/5 active:scale-95">
        <div className="flex w-16 items-center justify-center border-r-2 border-white bg-black">
          <div className="text-white">{icon}</div>
        </div>
        <div className="flex flex-1 flex-col justify-center px-4 py-3 text-left">
          <span className="font-serif text-base font-bold uppercase tracking-wider text-white">
            {title}
          </span>
          <span className="mt-1 text-xs font-light text-gray-300">
            {subtitle}
          </span>
        </div>
      </div>
    </Link>
  );
}

const reviews = [
  {
    text: "Anna did my makeup as well as my entire bridal party for my wedding, bridal shower, and rehearsal! From someone who doesn't trust many people to do my makeup, she was an absolute breeze to work with.",
    author: "SIERRA B.",
  },
  {
    text: "The best MUA! Makeup is always flawless and lasts 12+ hours. She listens to what you want and executes it perfectly. I always feel so stunning after leaving her chair. Book with Anna!",
    author: "MORGAN PITRE",
  },
  {
    text: "I've been going to Anna for six years now, and she's the only person I trust. Even though I live in Texas now, I still go to her for any important events when I'm back home!",
    author: "DEIDRA S.",
  },
  {
    text: "10/10 she gets the job done right every single time. My lashes last forever. Professional, talented, and makes you feel like a queen.",
    author: "JESSICA M.",
  },
];

function LinkBioCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);

    const intervalId = setInterval(() => {
      if (emblaApi.canScrollNext()) {
        emblaApi.scrollNext();
      }
    }, 5000);

    const stopInterval = () => clearInterval(intervalId);
    emblaApi.on("pointerDown", stopInterval);

    return () => {
      clearInterval(intervalId);
      if (emblaApi) emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  return (
    <div className="flex w-full flex-col items-center">
      <div className="mb-6 flex items-center justify-center gap-1">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="h-5 w-5 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      <div className="w-full max-w-sm overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex min-w-full flex-col items-center justify-center px-4 text-center"
            >
              <blockquote className="mb-6 font-light italic leading-relaxed text-white/90">
                &ldquo;{review.text}&rdquo;
              </blockquote>
              <p className="font-serif text-sm uppercase tracking-widest text-white">
                - {review.author}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex gap-2">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === selectedIndex ? "w-6 bg-pink-300" : "w-2 bg-gray-600"
            }`}
            aria-label={`Go to review ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function LinkInBioPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 py-8">
      <div className="flex w-full max-w-md flex-col items-center">
        <div className="relative mb-5 h-56 w-56">
          <div className="absolute inset-0 overflow-hidden rounded-full border-[3px] border-pink-300">
            <Image
              src="/images/anna-profile.jpg"
              alt="Anna Garcia - Makeup Artist"
              fill
              className="object-cover object-[center_15%]"
              priority
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          </div>
        </div>

        <h1 className="mb-1.5 font-serif text-3xl uppercase tracking-[0.2em] text-white">
          ANNA GARCIA
        </h1>

        <h2 className="mb-3 text-center font-serif text-[13px] font-bold italic leading-tight text-gray-300">
          New Orleans Makeup, Brows & Aesthetics Artist
        </h2>

        <p className="mb-6 px-4 text-center font-sans text-sm text-gray-400">
          Book your services at one of my studios
          <br />
          (Metairie + Houma) or at your location 👇🏼
        </p>

        <div className="mb-12 w-full space-y-5">
          <LinkButton
            href="/services"
            icon={<Calendar className="h-5 w-5" />}
            title="Book An Appointment"
            subtitle="Convenient Online Booking"
          />
          <LinkButton
            href="/#bridal"
            icon={<Heart className="h-5 w-5 fill-white" />}
            title="Bridal Bookings"
            subtitle="Request a Quote For Wedding Glam"
          />
          <LinkButton
            href="/education"
            icon={<Monitor className="h-5 w-5" />}
            title="Book A Makeup Lesson"
            subtitle="Master Makeup On Yourself Or Others"
          />
          <LinkButton
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            icon={<Instagram className="h-5 w-5" />}
            title="Instagram"
            subtitle="@makeupbyannagarcia"
          />
          <LinkButton
            href={SOCIAL_LINKS.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            icon={<svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>}
            title="TikTok"
            subtitle="@anna6arcia"
          />
        </div>

        <LinkBioCarousel />
      </div>
    </main>
  );
}
