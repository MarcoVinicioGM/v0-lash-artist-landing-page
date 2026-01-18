"use client";

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
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
  CalendarIcon,
  CheckCircle2,
  Brush,
  Camera,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

const lessonFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  preferredDate: z.date({ required_error: "Please select a preferred date" }),
  lessonType: z.string().min(1, "Please select a lesson type"),
  skillLevel: z.string().min(1, "Please select your skill level"),
  details: z.string().optional(),
});

type LessonFormData = z.infer<typeof lessonFormSchema>;

const curriculums = [
  {
    id: "personal-glam",
    title: "The Personal Glam Lesson",
    duration: "2 Hours",
    target: "Everyday Women",
    details: "Hands-on • Bring your own makeup bag",
    description:
      "Learn how to do your own full face for events and daily wear. We audit your kit and teach you the 'Amor' techniques. You'll leave with a personalized face chart and shopping list.",
    action: "Book Lesson",
  },
  {
    id: "mua-intensive",
    title: "The Aspiring MUA Intensive",
    duration: "4 Hours",
    target: "Career",
    details: "Model Required • Certification included",
    description:
      "For the artist ready to start their business. Learn sanitation, skin prep, color theory, and business basics. Includes a full kit audit, portfolio building tips, and a certificate of completion.",
    action: "Apply for Mentorship",
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
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
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

  const onSubmit = (data: LessonFormData) => {
    const webhookPayload = {
      ...data,
      preferredDate: data.preferredDate.toISOString(),
      submittedAt: new Date().toISOString(),
    };

    console.log(
      "Lesson Inquiry Request:",
      JSON.stringify(webhookPayload, null, 2),
    );

    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      reset();
    }, 2500);
  };

  const handleBookNow = (title: string) => {
    setValue("lessonType", title);
    setIsOpen(true);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* 1. Power Hero Section */}
      <section className="relative h-[60vh] xl:h-[85vh] w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/anna-makeup-room.jpg"
            alt="Anna Garcia - Master Your Own Face"
            fill
            className="object-cover object-[center_20%]"
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
              <Star className="mr-1 h-3.5 w-3.5 fill-[#FF69B4] text-[#FF69B4]" />
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

      {/* 2. Why Train With Me Section (Moved Up) */}
      <section className="bg-stone-50 py-20 lg:py-32">
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
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#FDF2F8] shadow-sm">
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

      {/* 3. Visual Curriculum Gallery */}
      <section className="bg-white py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-16 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-widest text-zinc-500">
              The Experience
            </p>
            <h2 className="font-serif text-3xl text-black md:text-5xl">
              What You Will Master
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Slot 1: Technique */}
            <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl">
              <Image
                src="/images/brow-photo.jpg"
                alt="Precision Blending & Skin Prep"
                fill
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
            </div>

            {/* Slot 2: The Kit */}
            <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl">
              <Image
                src="/images/bridal-alt.jpg"
                alt="Kit Audit & Hygiene Standards"
                fill
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
            </div>

            {/* Slot 3: Business */}
            <div className="group relative aspect-[3/4] overflow-hidden rounded-3xl">
              <Image
                src="/images/wedding-group.jpg"
                alt="Content Creation & Client Photos"
                fill
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
            </div>
          </div>
        </div>
      </section>

      {/* 4. Choose Your Lesson (Pricing List) */}
      <section id="curriculums" className="bg-white py-24 lg:py-36 border-t border-zinc-100">
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
                          onClick={() => handleBookNow(curriculum.title)}
                          className="w-full bg-black text-white hover:bg-black/90 md:w-auto"
                        >
                          {curriculum.action}
                          <ArrowRight className="ml-2 h-4 w-4" />
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

      {/* Inquiry Dialog (Standalone) */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          {isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <CheckCircle2 className="mb-4 h-16 w-16 text-[#FF69B4]" />
              <h3 className="mb-2 font-serif text-2xl font-bold">Inquiry Sent!</h3>
              <p className="text-muted-foreground">
                Thank you for your interest. Anna will be in touch within 24-48
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="lesson-name">Full Name</Label>
                    <Input
                      id="lesson-name"
                      placeholder="Jane Doe"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500">
                        {errors.name.message}
                      </p>
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

                <div className="space-y-2">
                  <Label htmlFor="lesson-email">Email Address</Label>
                  <Input
                    id="lesson-email"
                    type="email"
                    placeholder="jane@example.com"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

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

      <Footer />
    </main>
  );
}
