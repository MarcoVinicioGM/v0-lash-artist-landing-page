"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, Suspense } from "react";
import { format } from "date-fns";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { lessonFormSchema, type LessonFormData } from "@/lib/schemas";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { GridSkeleton, AccordionSkeleton } from "@/components/skeletons";
import {
  Sparkles,
  Palette,
  Briefcase,
  ArrowRight,
  Star,
  CalendarIcon,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

/* ─────────────────────────────────────────────────────────────────────────
   STATIC DATA
   ───────────────────────────────────────────────────────────────────────── */

const curriculums = [
  {
    id: "personal-glam",
    slug: "personal-glam",
    title: "The Personal Glam Lesson",
    duration: "2 Hours",
    target: "Everyday Women",
    details: "Hands-on • Bring your own makeup bag",
    description:
      "Learn how to do your own full face for events and daily wear. We audit your kit and teach you the 'Amor' techniques. You'll leave with a personalized face chart and shopping list.",
    action: "View Course Details",
  },
  {
    id: "mua-intensive",
    slug: "mua-intensive",
    title: "The Aspiring MUA Intensive",
    duration: "4 Hours",
    target: "Career",
    details: "Model Required • Certification included",
    description:
      "For the artist ready to start their business. Learn sanitation, skin prep, color theory, and business basics. Includes a full kit audit, portfolio building tips, and a certificate of completion.",
    action: "View Course Details",
  },
];

const features = [
  {
    icon: Sparkles,
    title: "Real World Experience",
    description: "2,400+ clients served across bridal, editorial, and studio. Anna handled every single booking.",
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

/* ─────────────────────────────────────────────────────────────────────────
   FORM DIALOG COMPONENT (Extracted)
   ───────────────────────────────────────────────────────────────────────── */

function LessonInquiryDialog({
  isOpen,
  onOpenChange,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LessonFormData>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      lessonType: "",
      skillLevel: "",
      details: "",
    },
  });

  const onSubmit = async (data: LessonFormData) => {
    try {
      const payload = {
        ...data,
        preferredDate: data.preferredDate.toISOString(),
        type: "lesson_inquiry",
        submittedAt: new Date().toISOString(),
      };

      const response = await fetch("/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Submission failed");

      setIsSubmitted(true);
      setTimeout(() => {
        onOpenChange(false);
        setIsSubmitted(false);
        reset();
      }, 2500);
    } catch (error) {
      console.error("Lesson inquiry submission error:", error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90dvh] overflow-y-auto sm:max-w-lg">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-8 text-center"
          >
            <CheckCircle2 className="mb-4 h-16 w-16 text-[#FF69B4]" />
            <h3 className="mb-2 font-serif text-2xl font-bold">Inquiry Sent!</h3>
            <p className="text-muted-foreground">
              Thank you for your interest. Anna will be in touch within 24–48
              hours.
            </p>
          </motion.div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-serif text-2xl">
                Lesson Inquiry
              </DialogTitle>
              <DialogDescription>
                Start your journey to mastering the Amor Glam signature look.
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
              {/* Name & Phone Row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="lesson-name">Full Name</Label>
                  <Input
                    id="lesson-name"
                    placeholder="Jane Doe"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lesson-phone">Phone Number</Label>
                  <Input
                    id="lesson-phone"
                    placeholder="(504) 555-1234"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="lesson-email">Email Address</Label>
                <Input
                  id="lesson-email"
                  type="email"
                  placeholder="jane@example.com"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* Date & Skill Level Row */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Preferred Date</Label>
                  <Controller
                    name="preferredDate"
                    control={control}
                    render={({ field }) => (
                      <Popover
                        open={isCalendarOpen}
                        onOpenChange={setIsCalendarOpen}
                      >
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal bg-transparent",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {field.value
                              ? format(field.value, "PPP")
                              : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => {
                              field.onChange(date);
                              setIsCalendarOpen(false);
                            }}
                            disabled={(date) => date < new Date()}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                  {errors.preferredDate && (
                    <p className="text-xs text-red-500">
                      {errors.preferredDate.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Skill Level</Label>
                  <Controller
                    name="skillLevel"
                    control={control}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger className="bg-transparent">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="beginner">
                            Beginner (Do my own face)
                          </SelectItem>
                          <SelectItem value="intermediate">
                            Intermediate (Aspiring MUA)
                          </SelectItem>
                          <SelectItem value="pro">
                            Professional (Working MUA)
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.skillLevel && (
                    <p className="text-xs text-red-500">
                      {errors.skillLevel.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Lesson Type */}
              <div className="space-y-2">
                <Label>Lesson Type</Label>
                <Controller
                  name="lessonType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="bg-transparent">
                        <SelectValue placeholder="Select lesson" />
                      </SelectTrigger>
                      <SelectContent>
                        {curriculums.map((c) => (
                          <SelectItem key={c.id} value={c.title}>
                            {c.title}
                          </SelectItem>
                        ))}
                        <SelectItem value="custom">
                          Custom Mentorship
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.lessonType && (
                  <p className="text-xs text-red-500">
                    {errors.lessonType.message}
                  </p>
                )}
              </div>

              {/* Details */}
              <div className="space-y-2">
                <Label htmlFor="lesson-details">
                  What do you hope to learn? (Optional)
                </Label>
                <Textarea
                  id="lesson-details"
                  placeholder="e.g. Winged liner, skin prep for oily skin, color theory..."
                  rows={3}
                  {...register("details")}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-black text-white hover:bg-black/80"
              >
                {isSubmitting ? "Sending..." : "Submit Inquiry"}
              </Button>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FEATURE CARD COMPONENT (Extracted)
   ───────────────────────────────────────────────────────────────────────── */

function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="text-center"
    >
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FDF2F8] shadow-sm mx-auto">
        <Icon className="h-7 w-7 text-[#FF69B4]" />
      </div>
      <h3 className="mb-3 font-serif text-xl text-black">{title}</h3>
      <p className="text-zinc-600">{description}</p>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CURRICULUM CARD COMPONENT (Extracted)
   ───────────────────────────────────────────────────────────────────────── */

function CurriculumCard({
  curriculum,
}: {
  curriculum: (typeof curriculums)[0];
}) {
  return (
    <AccordionItem
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
              <Link href={`/education/${curriculum.slug}`}>
                {curriculum.action}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   MAIN PAGE COMPONENT
   ───────────────────────────────────────────────────────────────────────── */

export default function EducationPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* ════════════════════════════════════════════════════════════════
          1. HERO SECTION
          ═════════════════════════════════════════════════════════════ */}
      <section className="relative h-[85dvh] w-full overflow-hidden">
        {/* Background Image with Proper CLS Prevention */}
        <div className="absolute inset-0">
          <Image
            src="/images/anna-makeup-room.jpg"
            alt="Anna Garcia teaching a makeup lesson in her studio"
            fill
            sizes="100vw"
            className="object-cover object-[center_20%]"
            priority
          />
          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
          {/* Trust Signal Pill */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/30">
              <Star className="h-3.5 w-3.5 fill-[#FF69B4] text-[#FF69B4]" />
              2,400+ Bookings Served
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl font-serif text-5xl font-bold leading-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Master Your
            <br />
            Own Face
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-xl text-base sm:text-lg text-zinc-200 md:text-xl"
          >
            Private 1-on-1 makeup lessons and professional coaching.
            <br className="hidden md:block" /> Elevate your artistry with
            personalized guidance.
          </motion.p>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          2. WHY TRAIN WITH ME SECTION
          ═════════════════════════════════════════════════════════════ */}
      <section className="bg-stone-50 py-20 lg:py-32">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
              The Amor Advantage
            </p>
            <h2 className="font-serif text-4xl font-bold text-black md:text-5xl">
              Why Train With Me?
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, idx) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          3. CURRICULUM GALLERY (Visual Section)
          ═════════════════════════════════════════════════════════════ */}
      <section className="bg-white py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
              The Experience
            </p>
            <h2 className="font-serif text-4xl font-bold text-black md:text-5xl">
              What You Will Master
            </h2>
          </motion.div>

          <Suspense fallback={<GridSkeleton />}>
            <div className="grid gap-6 md:grid-cols-3">
            {/* Technique Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl"
            >
              <Image
                src="/images/brow-photo.jpg"
                alt="Close up of brow shaping technique"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm font-medium uppercase tracking-widest text-white/70">
                  Technique
                </p>
                <h3 className="mt-1 font-serif text-xl font-bold text-white">
                  Precision Blending & Skin Prep
                </h3>
              </div>
            </motion.div>

            {/* Kit Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl"
            >
              <Image
                src="/images/bridal-alt.jpg"
                alt="Professional makeup kit setup"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm font-medium uppercase tracking-widest text-white/70">
                  The Kit
                </p>
                <h3 className="mt-1 font-serif text-xl font-bold text-white">
                  Kit Audit & Hygiene Standards
                </h3>
              </div>
            </motion.div>

            {/* Business Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl"
            >
              <Image
                src="/images/GroupPhotoMakeup.jpg"
                alt="Group of clients showcasing diverse makeup looks"
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-sm font-medium uppercase tracking-widest text-white/70">
                  Business
                </p>
                <h3 className="mt-1 font-serif text-xl font-bold text-white">
                  Content Creation & Client Photos
                </h3>
              </div>
            </motion.div>
          </div>
          </Suspense>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          4. CHOOSE YOUR LESSON (Accordion)
          ═════════════════════════════════════════════════════════════ */}
      <section
        id="curriculums"
        className="border-t border-zinc-100 bg-white py-24 lg:py-36"
      >
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
              Curriculums
            </p>
            <h2 className="font-serif text-4xl font-bold text-black md:text-5xl">
              Choose Your Lesson
            </h2>
          </motion.div>

          <Suspense fallback={<AccordionSkeleton />}>
            <div className="mx-auto max-w-2xl">
              <Accordion type="single" collapsible className="w-full space-y-4">
                {curriculums.map((curriculum) => (
                  <CurriculumCard key={curriculum.id} curriculum={curriculum} />
                ))}
              </Accordion>
            </div>
          </Suspense>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          5. CTA SECTION
          ═════════════════════════════════════════════════════════════ */}
      <section className="bg-stone-50 py-20 lg:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4 font-serif text-4xl font-bold text-black">
              Ready to Begin?
            </h2>
            <p className="mb-8 text-lg text-zinc-600">
              Submit your lesson inquiry and let&apos;s create your personalized
              Amor Glam experience.
            </p>
            <Button
              size="lg"
              onClick={() => setIsDialogOpen(true)}
              className="bg-black text-white hover:bg-black/90"
            >
              Start Your Inquiry
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          DIALOG & FOOTER
          ═════════════════════════════════════════════════════════════ */}
      <LessonInquiryDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />

      <Footer />
    </main>
  );
}
