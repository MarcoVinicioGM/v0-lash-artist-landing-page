"use client";

import React, { useState, useEffect, useRef } from "react"
import { Calendar, Heart, Monitor, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface LinkButtonProps {
  icon: React.ReactNode
  title: string
  subtitle: string
  href?: string
}

function LinkButton({ icon, title, subtitle, href = "#" }: LinkButtonProps) {
  return (
    <Link
      href={href}
      className="group relative block w-full"
    >
      <div className="absolute inset-0 border border-white/30 translate-x-[3px] translate-y-[3px]" />
      <div className="relative flex w-full items-stretch border border-white bg-black text-white transition-all duration-200 hover:bg-white/5 active:scale-95">
        <div className="flex w-16 items-center justify-center border-r border-white bg-black">
          <div className="text-white">
            {icon}
          </div>
        </div>
        <div className="flex flex-1 flex-col justify-center px-4 py-3 text-left">
          <span className="font-serif font-bold tracking-wider text-white uppercase text-sm">
            {title}
          </span>
          <span className="text-xs font-light text-gray-300 mt-1">
            {subtitle}
          </span>
        </div>
      </div>
    </Link>
  )
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: currentIndex * containerRef.current.clientWidth,
        behavior: 'smooth'
      });
    }
  }, [currentIndex]);

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const itemWidth = containerRef.current.clientWidth;
      const newIndex = Math.round(scrollLeft / itemWidth);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex items-center justify-center gap-1 mb-6">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className="h-5 w-5 fill-yellow-400 text-yellow-400"
          />
        ))}
      </div>

      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 scrollbar-hide w-full max-w-sm mx-auto scroll-smooth"
      >
        {reviews.map((review, index) => (
          <div
            key={index}
            className="min-w-[100%] snap-center flex flex-col items-center justify-center text-center px-4"
          >
            <blockquote className="text-white/90 italic font-light leading-relaxed mb-6">
              &ldquo;{review.text}&rdquo;
            </blockquote>
            <p className="text-white font-serif uppercase tracking-widest text-sm">
              - {review.author}
            </p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mt-6">
        {reviews.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex ? "w-6 bg-pink-300" : "w-2 bg-gray-600"
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
    <main className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md flex flex-col items-center">
        <div className="relative w-48 h-48 mb-6">
          <div className="absolute inset-0 rounded-full border-[3px] border-pink-300 overflow-hidden">
            <Image
              src="/images/anna-profile.jpg"
              alt="Anna Garcia - Makeup Artist"
              width={192}
              height={192}
              className="w-full h-full object-cover object-[center_15%]"
              priority
            />
          </div>
        </div>

        <h1 className="font-serif text-3xl tracking-[0.2em] text-white mb-3 uppercase">
          ANNA GARCIA
        </h1>

        <h2 className="font-serif text-lg text-gray-300 text-center mb-6 italic">
          New Orleans Makeup, Brows & Aesthetics Artist
        </h2>

        <p className="text-gray-400 text-sm text-center mb-8 px-4 font-sans">
          Book your services at one of my studios
          <br />
          (Metairie + Houma) or at your location 👇🏼
        </p>

        <div className="w-full space-y-5 mb-12">
          <LinkButton
            href="/services"
            icon={<Calendar className="w-5 h-5" />}
            title="Book An Appointment"
            subtitle="Convenient Online Booking"
          />
          <LinkButton
            href="/#bridal"
            icon={<Heart className="w-5 h-5 fill-white" />}
            title="Bridal Bookings"
            subtitle="Request a Quote For Wedding Glam"
          />
          <LinkButton
            href="/education"
            icon={<Monitor className="w-5 h-5" />}
            title="Book A Makeup Lesson"
            subtitle="Master Makeup On Yourself Or Others"
          />
        </div>

        <LinkBioCarousel />
      </div>
    </main>
  )
}
