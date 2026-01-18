import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Clock, Users, Award, Sparkles, Palette, Briefcase, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Education | Amor Glam Beauty",
  description: "Private 1-on-1 makeup lessons and MUA coaching with Anna Garcia. Master the art of beauty with personalized training.",
};

const curriculums = [
  {
    id: "personal-glam",
    title: "The Personal Glam Lesson",
    target: "Everyday Women",
    details: "2 Hours • Hands-on • Bring your own makeup bag",
    description:
      "Learn how to do your own full face for events and daily wear. We audit your kit and teach you the 'Amor' techniques.",
    price: "$250",
    action: "Book Lesson",
    href: "#contact",
  },
  {
    id: "mua-intensive",
    title: "The Aspiring MUA Intensive",
    target: "Career",
    details: "4 Hours • Model Required • Certification",
    description:
      "For the artist ready to start their business. Learn sanitation, skin prep, color theory, and business basics.",
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

      {/* Hero Section */}
      <section className="relative pt-20">
        <div className="mx-auto grid min-h-[85vh] max-w-7xl lg:grid-cols-2">
          {/* Left - Copy */}
          <div className="flex flex-col justify-center px-6 py-16 lg:px-12 lg:py-24">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-zinc-500">
              Private Lessons & Coaching
            </p>
            <h1 className="font-serif text-4xl leading-tight text-black md:text-5xl lg:text-6xl">
              Master the Art
              <br />
              of Beauty.
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-600">
              Private 1-on-1 lessons with Anna Garcia. With over 1,000+ bookings
              by age 23, learn the techniques behind the signature Amor Glam
              look.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-black text-white transition-all duration-200 hover:bg-black/80 hover:scale-[1.02] active:scale-[0.98]"
              >
                <a href="#curriculums">
                  View Curriculums
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative min-h-[400px] lg:min-h-0">
            <Image
              src="/images/education-hero.jpg"
              alt="Anna Garcia - Makeup Artist & Educator"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section id="curriculums" className="bg-[#FAFAFA] py-20 lg:py-28">
        <div className="mx-auto max-w-3xl px-6">
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
              Curriculums
            </p>
            <h2 className="font-serif text-3xl text-black md:text-4xl">
              Choose Your Path
            </h2>
          </div>

          <div className="space-y-6">
            {curriculums.map((curriculum) => (
              <Card
                key={curriculum.id}
                className="group border border-zinc-200 bg-white shadow-none transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex items-center gap-3">
                        <span className="rounded-full bg-[#FDF2F8] px-3 py-1 text-xs font-medium text-[#FF69B4]">
                          {curriculum.target}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl text-black md:text-2xl">
                        {curriculum.title}
                      </h3>
                      <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-zinc-500">
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {curriculum.details.split(" • ")[0]}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {curriculum.details.split(" • ")[1]}
                        </span>
                        {curriculum.details.split(" • ")[2] && (
                          <span className="flex items-center gap-1">
                            <Award className="h-4 w-4" />
                            {curriculum.details.split(" • ")[2]}
                          </span>
                        )}
                      </div>
                      <p className="mt-4 text-zinc-600">
                        {curriculum.description}
                      </p>
                    </div>

                    <div className="flex flex-col items-start gap-4 md:items-end md:text-right">
                      <p className="font-serif text-3xl text-black">
                        {curriculum.price}
                      </p>
                      <Button
                        asChild
                        className="bg-black text-white transition-all duration-200 hover:bg-black/80"
                      >
                        <a href={curriculum.href}>
                          {curriculum.action}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Train With Me Section */}
      <section className="py-20 lg:py-28">
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
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FDF2F8]">
                  <feature.icon className="h-7 w-7 text-[#FF69B4]" />
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
