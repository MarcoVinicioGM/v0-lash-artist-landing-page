"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Check,
  MapPin,
  Calendar as CalendarIcon,
  Users,
  Clock,
  Sparkles,
  Heart,
  ChevronLeft,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Footer } from "@/components/footer";

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS & DATA
// ─────────────────────────────────────────────────────────────────────────────

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUFVVbDQAAmgEGq/6+HQAAAABJRU5ErkJggg==";

const PACKAGES = [
  {
    id: "bride",
    title: "The Bride",
    price: "$350",
    description:
      "The signature Amor Glam look, perfected for photography and longevity. Includes premium lashes and a touch-up kit.",
    features: [
      "90-Minute Application",
      "Premium Mink or Silk Lashes",
      "Décolleté Glow & Body Shimmer",
      "Full Touch-Up Kit (Lipstick, Powder, Blotting Papers)",
      "Veil & Accessory Placement Assistance",
    ],
  },
  {
    id: "party",
    title: "Bridal Party",
    price: "$150",
    description:
      "Cohesive, stunning looks for bridesmaids and mothers. We ensure the entire party complements the bride's aesthetic.",
    features: [
      "45-Minute Application",
      "Custom Strip Lashes",
      "24-Hour Wear Setting Spray",
      "Lip Touch-Up Sample",
      "Skin Prep for All Ages",
    ],
  },
  {
    id: "trial",
    title: "The Preview (Trial)",
    price: "$200",
    description:
      "A 2-hour collaborative session at our studio to design your perfect look before the big day.",
    features: [
      "2-Hour Consultation & Application",
      "Multiple Lip/Eye Options",
      "Face Chart & Product Breakdown",
      "Skin Prep Routine Recommendations",
      "Photos & Lighting Test",
    ],
  },
];

const PROCESS_STEPS = [
  {
    number: "01",
    title: "Inquiry & Proposal",
    desc: "Submit your wedding details. We'll check availability and send a custom proposal within 24 hours.",
  },
  {
    number: "02",
    title: "Secure the Date",
    desc: "A 50% retainer and signed contract officially reserve your date. We cannot hold dates without this.",
  },
  {
    number: "03",
    title: "The Preview",
    desc: "We meet for your trial (usually 2-3 months out) to perfect your signature look.",
  },
  {
    number: "04",
    title: "The Big Day",
    desc: "We arrive early with a full setup. You relax, drink champagne, and get glam.",
  },
];

const FAQS = [
  {
    q: "Do you travel for weddings?",
    a: "Yes! We specialize in destination weddings. For local weddings (New Orleans/Metairie), travel is included within 20 miles. Beyond that, a standard mileage rate applies.",
  },
  {
    q: "Is there a minimum booking requirement?",
    a: "For Saturday weddings during peak season (March-June, Sept-Nov), we require a minimum booking of Bride + 4 services.",
  },
  {
    q: "How should I prep my skin?",
    a: "We recommend a hydrating facial 2 weeks prior. On the day of, please arrive with a clean face and your skincare routine completed.",
  },
  {
    q: "Do you provide hair services?",
    a: "We focus exclusively on makeup artistry to ensure perfection. However, we have a list of preferred hair stylists we love to work with!",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: SPECIALIZED BRIDAL NAVIGATION
// ─────────────────────────────────────────────────────────────────────────────

function BridalNav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-white/90 backdrop-blur-md border-b border-zinc-100 h-[72px]">
      <div className="w-24">
        <Link
          href="/"
          className="flex items-center text-sm font-medium text-zinc-500 hover:text-black transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Home
        </Link>
      </div>

      <Link
        href="/"
        className="font-serif text-xl font-bold tracking-wide text-black"
      >
        AMOR GLAM
      </Link>

      <div className="w-24 flex justify-end">
        <div className="relative h-16 w-16">
          <Image
            src="/images/Icon-Heart-WEdding-Gown.png"
            alt="Wedding Gown Heart Icon"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: INQUIRY FORM
// ─────────────────────────────────────────────────────────────────────────────

const bridalSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  date: z.string().min(1, "Wedding date is required"),
  venue: z.string().min(2, "Venue is required"),
  partySize: z.string().min(1, "Estimated count required"),
  details: z.string().optional(),
});

type BridalFormData = z.infer<typeof bridalSchema>;

function BridalInquiryForm({ onSuccess }: { onSuccess: () => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BridalFormData>({
    resolver: zodResolver(bridalSchema),
  });

  const onSubmit = async (data: BridalFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Bridal Lead:", data);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="b-name">Full Name</Label>
          <Input
            id="b-name"
            placeholder="Jane Doe"
            {...register("name")}
            className="bg-zinc-50"
          />
          {errors.name && (
            <p className="text-xs text-red-500">{errors.name.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="b-email">Email Address</Label>
          <Input
            id="b-email"
            type="email"
            placeholder="jane@example.com"
            {...register("email")}
            className="bg-zinc-50"
          />
          {errors.email && (
            <p className="text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="b-date">Wedding Date</Label>
          <div className="relative">
            <CalendarIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input
              id="b-date"
              type="date"
              className="pl-10 bg-zinc-50"
              {...register("date")}
            />
          </div>
          {errors.date && (
            <p className="text-xs text-red-500">{errors.date.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="b-venue">Venue Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <Input
              id="b-venue"
              placeholder="e.g. Hotel Monteleone"
              className="pl-10 bg-zinc-50"
              {...register("venue")}
            />
          </div>
          {errors.venue && (
            <p className="text-xs text-red-500">{errors.venue.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="b-party">Estimated Party Size</Label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            id="b-party"
            type="number"
            placeholder="Bride + ?"
            className="pl-10 bg-zinc-50"
            {...register("partySize")}
          />
        </div>
        {errors.partySize && (
          <p className="text-xs text-red-500">{errors.partySize.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="b-details">Additional Details</Label>
        <Textarea
          id="b-details"
          placeholder="Tell us about your vision, timeline, or any questions..."
          className="bg-zinc-50 min-h-[100px]"
          {...register("details")}
        />
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-12 bg-brand-pink hover:bg-brand-pink/90 text-white font-medium"
      >
        {isSubmitting ? "Sending Request..." : "Request Custom Quote"}
      </Button>
    </form>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPONENT: PAGE
// ─────────────────────────────────────────────────────────────────────────────

export default function BridalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Scroll Handler (Fixes Header Overlap)
  const scrollToPackages = () => {
    const section = document.getElementById("packages");
    if (section) {
      const headerOffset = 100;
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Parallax Logic
  const heroRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <main className="min-h-screen bg-white">
      <BridalNav />

      {/* ════════ HERO ════════ */}
      <section
        ref={heroRef}
        className="relative h-[90svh] md:h-[90dvh] w-full overflow-hidden bg-black"
      >
        <motion.div
          style={{ y: shouldReduceMotion ? 0 : yBackground }}
          className="absolute inset-0 h-[120%] w-full"
        >
          <Image
            src="/images/bridal-hero.jpg"
            alt="Beautiful bride with flawless makeup in soft light"
            fill
            className="object-cover object-[center_30%]"
            priority
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </motion.div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-brand-pink">
              Bridal Concierge
            </p>
            <h1 className="mb-6 max-w-4xl font-serif text-6xl font-bold leading-tight md:text-7xl lg:text-8xl">
              Your Big Day,
              <br />
              <span className="italic text-white/90">Perfected.</span>
            </h1>
            <p className="mb-10 max-w-lg text-lg text-white/80 font-light mx-auto leading-relaxed">
              From the engagement party to the honeymoon, we ensure you look
              flawless at every milestone.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => setIsModalOpen(true)}
                size="lg"
                className="h-14 px-8 rounded-none bg-brand-pink hover:bg-brand-pink/90 text-white font-medium"
              >
                Inquire for 2026
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 rounded-none border-white text-white hover:bg-white hover:text-black bg-transparent"
              >
                <a
                  href="https://amor-glam.square.site"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Trial Run
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ════════ INTRO / PHILOSOPHY ════════ */}
      <section className="bg-white py-16 lg:py-32">
        <div className="container-max grid lg:grid-cols-2 gap-0 lg:gap-16 items-center">
          <div className="relative h-[400px] lg:h-auto lg:aspect-square overflow-hidden bg-zinc-100">
            <Image
              src="/images/muslim-wedding.jpg"
              alt="Close up of bride with traditional jewelry and makeup"
              fill
              className="object-cover"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
            />
          </div>
          <div className="px-6 py-12 lg:p-0 max-w-lg">
            <h2 className="mb-6 text-3xl lg:text-5xl text-brand-dark leading-tight">
              The Art of <br />
              <span className="italic text-brand-pink">Longevity</span>
            </h2>
            <p className="mb-6 text-base lg:text-lg text-zinc-600 leading-relaxed">
              Wedding makeup isn't just about looking good in the mirror—it's
              about looking flawless in 4K video, soft in candlelight, and
              vibrant after 8 hours of dancing.
            </p>
            <p className="mb-8 text-base lg:text-lg text-zinc-600 leading-relaxed">
              My signature "Editorial Bridal" technique focuses on skin prep and
              layering to create a look that feels weightless but withstands
              humidity, tears, and time.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-rose">
                  <Clock className="h-5 w-5 text-brand-pink" />
                </div>
                <span className="text-sm font-medium">12+ Hour Wear</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-rose">
                  <Sparkles className="h-5 w-5 text-brand-pink" />
                </div>
                <span className="text-sm font-medium">Flash Friendly</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════ PACKAGES ════════ */}
      <section id="packages" className="bg-brand-rose py-16 lg:py-32">
        <div className="container-max">
          <div className="text-center mb-12 lg:mb-16 px-6">
            <p className="text-xs font-bold uppercase tracking-widest mb-4 text-brand-pink">
              Investment
            </p>
            <h2 className="text-3xl lg:text-5xl text-brand-dark mb-4">
              Bridal Packages
            </h2>
            <button
              onClick={scrollToPackages}
              className="text-sm font-medium text-brand-pink/60 hover:text-brand-pink underline underline-offset-4 transition-colors"
            >
              How it works
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 px-6 lg:px-0">
            {PACKAGES.map((pkg, i) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 border border-zinc-100 shadow-sm flex flex-col hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-6">
                  <h3 className="font-serif text-2xl font-bold mb-2">
                    {pkg.title}
                  </h3>
                  <div className="text-3xl font-bold text-brand-pink">
                    {pkg.price}
                  </div>
                </div>
                <p className="text-zinc-600 mb-8 text-sm leading-relaxed min-h-[60px]">
                  {pkg.description}
                </p>
                <ul className="space-y-4 mb-8 flex-1">
                  {pkg.features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-3 text-sm text-zinc-700"
                    >
                      <Check className="h-4 w-4 text-brand-pink shrink-0 mt-0.5" />
                      {feat}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => setIsModalOpen(true)}
                  className="w-full bg-black text-white hover:bg-zinc-800 rounded-none h-12"
                >
                  Request Quote
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════ THE PROCESS ════════ */}
      <section className="bg-white py-16 lg:py-32">
        <div className="container-max">
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-12 lg:gap-24 items-center px-6 lg:px-0">
            <div className="w-full order-2 lg:order-1">
              <p className="text-xs font-bold uppercase tracking-widest mb-4 text-zinc-400">
                Timeline
              </p>
              <h2 className="text-3xl lg:text-5xl mb-12">The Experience</h2>
              <div className="space-y-10 lg:space-y-12">
                {PROCESS_STEPS.map((step, i) => (
                  <div key={i} className="flex gap-6 group">
                    <span className="font-serif text-4xl text-brand-pink/20 font-bold group-hover:text-brand-pink transition-colors">
                      {step.number}
                    </span>
                    <div>
                      <h4 className="font-serif text-xl font-bold mb-2">
                        {step.title}
                      </h4>
                      <p className="text-zinc-600 text-sm leading-relaxed max-w-sm">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative w-full h-[400px] lg:h-[600px] bg-zinc-100 order-1 lg:order-2 overflow-hidden">
              <Image
                src="/images/wedding-group.jpg"
                alt="Wedding party group photo in black and white"
                fill
                className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ════════ FAQ ════════ */}
      <section className="bg-zinc-50 py-16 lg:py-32">
        <div className="container-max px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl text-center mb-12 lg:mb-16">
              Common Questions
            </h2>
            <Accordion
              type="single"
              collapsible
              className="w-full bg-white border border-zinc-200 rounded-none shadow-sm"
            >
              {FAQS.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="px-6 border-b border-zinc-100 last:border-0"
                >
                  <AccordionTrigger className="text-left font-serif text-lg py-6 hover:no-underline hover:text-brand-pink transition-colors">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-zinc-600 pb-6 leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* ════════ BOTTOM CTA ════════ */}
      <section className="py-32 bg-black text-white text-center">
        <div className="container-max">
          <Heart className="h-8 w-8 text-brand-pink mx-auto mb-6" />
          <h2 className="text-white mb-6">Love is in the details.</h2>
          <p className="text-zinc-400 max-w-lg mx-auto mb-10 text-lg">
            Dates for 2026 are filling up fast. Secure your date today to ensure
            you get the Amor Glam experience.
          </p>
          <Button
            onClick={() => setIsModalOpen(true)}
            size="lg"
            className="h-16 px-10 rounded-full bg-brand-pink hover:bg-brand-pink/90 text-white text-lg font-bold"
          >
            Start Your Inquiry
          </Button>
        </div>
      </section>

      {/* ════════ INQUIRY MODAL ════════ */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-none border-zinc-100 p-0">
          {isSubmitted ? (
            <div className="p-12 text-center flex flex-col items-center justify-center h-full min-h-[400px]">
              <div className="h-16 w-16 bg-brand-rose rounded-full flex items-center justify-center mb-6">
                <Check className="h-8 w-8 text-brand-pink" />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-3">
                Inquiry Sent!
              </h3>
              <p className="text-zinc-500 max-w-xs mx-auto">
                Thank you for choosing Amor Glam. We will review your date and
                venue and reply within 24-48 hours.
              </p>
              <Button
                onClick={() => {
                  setIsModalOpen(false);
                  setIsSubmitted(false);
                }}
                className="mt-8 bg-black text-white hover:bg-zinc-800"
              >
                Close
              </Button>
            </div>
          ) : (
            <div className="p-6 sm:p-8">
              <DialogHeader className="mb-6">
                <DialogTitle className="font-serif text-3xl">
                  Bridal Concierge
                </DialogTitle>
                <DialogDescription>
                  Please provide your wedding details so we can check
                  availability.
                </DialogDescription>
              </DialogHeader>
              <BridalInquiryForm onSuccess={() => setIsSubmitted(true)} />
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  );
}
