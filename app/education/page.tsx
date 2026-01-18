import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import {
  Clock,
  Users,
  Award,
  Sparkles,
  Palette,
  Briefcase,
  ArrowRight,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Education | Amor Glam Beauty",
  description:
    "Private 1-on-1 makeup lessons and MUA coaching with Anna Garcia. Master the art of beauty with personalized training.",
};

const curriculums = [
  {
    id: "personal-glam",
    title: "The Personal Glam Lesson",
    duration: "2 Hours",
    target: "Everyday Women",
    details: "Hands-on • Bring your own makeup bag",
    description:
      "Learn how to do your own full face for events and daily wear. We audit your kit and teach you the 'Amor' techniques. You'll leave with a personalized face chart and shopping list.",
    price: "$250",
    action: "Book Lesson",
    href: "#contact",
  },
  {
    id: "mua-intensive",
    title: "The Aspiring MUA Intensive",
    duration: "4 Hours",
    target: "Career",
    details: "Model Required • Certification included",
    description:
      "For the artist ready to start their business. Learn sanitation, skin prep, color theory, and business basics. Includes a full kit audit, portfolio building tips, and a certificate of completion.",
    price: "$550",
    action: "Apply for Mentorship",
    href: "#contact",
  },
];

const features = [
  {
    icon: Sparkles,
    title: "Real World Experience",
    description: "1,000+ clients served across bridal, editorial, and studio.",
  },
  {
    icon: Palette,
    title: "Product Knowledge",
    description:
      "Unbiased reviews of what's actually in your kit vs. what you need.",
  },
  {
    icon: Briefcase,
    title: "Business Mentorship",
    description: "Learn how I built a full-time studio by age 23.",
  },
];

export default function EducationPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Power Hero Section */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/anna-glammed.jpeg"
            alt="Anna Garcia - Master Your Own Face"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          {/* Trust Signal Pill */}
          <div className="mb-8 animate-fade-in-up">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30">
              <Star className="mr-1 h-3 w-3 fill-current text-yellow-400" />
              1,000+ Bookings Served
            </span>
          </div>

          {/* Headline */}
          <h1 className="max-w-4xl font-serif text-6xl font-bold leading-tight text-white md:text-7xl lg:text-8xl">
            Master Your
            <br />
            Own Face
          </h1>

          <p className="mt-6 max-w-xl text-lg text-zinc-200 md:text-xl">
            Private 1-on-1 makeup lessons and professional coaching.
            <br className="hidden md:block" /> Elevate your artistry with
            personalized guidance.
          </p>
        </div>
      </section>

      {/* Compact Booking Menu (The List) */}
      <section id="curriculums" className="bg-white py-20 lg:py-32">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
              Curriculums
            </p>
            <h2 className="font-serif text-3xl text-black md:text-5xl">
              Choose Your Lesson
            </h2>
          </div>

          <div className="mx-auto max-w-2xl">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {curriculums.map((curriculum) => (
                <AccordionItem
                  key={curriculum.id}
                  value={curriculum.id}
                  className="rounded-xl border border-zinc-200 px-6 transition-all hover:border-zinc-300 hover:shadow-md data-[state=open]:border-black data-[state=open]:shadow-lg"
                >
                  <AccordionTrigger className="py-6 hover:no-underline">
                    <div className="flex w-full items-center justify-between pr-4 text-left">
                      <div>
                        <h3 className="text-lg font-semibold text-black md:text-xl">
                          {curriculum.title}
                        </h3>
                        <p className="text-sm font-medium text-zinc-500">
                          {curriculum.duration}
                        </p>
                      </div>
                      <span className="text-lg font-semibold text-black">
                        {curriculum.price}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6">
                    <div className="space-y-4 pt-2">
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-[#FDF2F8] px-3 py-1 text-xs font-medium text-[#FF69B4]">
                          {curriculum.target}
                        </span>
                        <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600">
                          {curriculum.details}
                        </span>
                      </div>
                      <p className="text-base leading-relaxed text-zinc-600">
                        {curriculum.description}
                      </p>
                      <div className="pt-2">
                        <Button
                          asChild
                          className="w-full bg-black text-white hover:bg-black/90 md:w-auto"
                        >
                          <a href={curriculum.href}>
                            {curriculum.action}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Why Train With Me Section */}
      <section className="bg-stone-50 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
              The Amor Advantage
            </p>
            <h2 className="font-serif text-3xl text-black md:text-4xl">
              Why Train With Me?
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="text-center">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
                  <feature.icon className="h-7 w-7 text-black" />
                </div>
                <h3 className="mb-3 font-serif text-xl text-black">
                  {feature.title}
                </h3>
                <p className="text-zinc-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Boxes Section */}
      <section className="pb-20 pt-10 bg-stone-50 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/bridal-hero.jpg"
                alt="Bridal Makeup Education"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/GroupPhotoMakeup.jpg"
                alt="Makeup Masterclass"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl">
              <Image
                src="/images/DarkerSkinComplexion.jpg"
                alt="Color Theory and Skin Prep"
                fill
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-black py-20 text-white lg:py-28">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl">
            Ready to Elevate Your Skills?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-zinc-400">
            Whether you want to perfect your personal glam or launch your career
            as an MUA, I&apos;m here to guide you every step of the way.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-white text-black transition-all duration-200 hover:bg-zinc-100 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Link href="/#contact">Send an Inquiry</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white bg-transparent text-white transition-all duration-200 hover:bg-white/10"
            >
              <Link href="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

