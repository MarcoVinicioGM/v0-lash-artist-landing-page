"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
  ArrowRight,
  CalendarIcon,
  CheckCircle2,
  Clock,
  Target,
  FileText,
  ChevronLeft,
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

const courseData = {
  "personal-glam": {
    title: "The Personal Glam Lesson",
    duration: "2 Hours",
    target: "Everyday Women",
    details: "Hands-on • Bring your own makeup bag",
    description:
      "Learn how to do your own full face for events and daily wear. We audit your kit and teach you the 'Amor' techniques. You'll leave with a personalized face chart and shopping list.",
    price: "$250",
    image: "/images/anna-makeup-room.jpg",
    action: "Book Lesson",
  },
  "mua-intensive": {
    title: "The Aspiring MUA Intensive",
    duration: "4 Hours",
    target: "Career Artists",
    details: "Model Required • Certification included",
    description:
      "For the artist ready to start their business. Learn sanitation, skin prep, color theory, and business basics. Includes a full kit audit, portfolio building tips, and a certificate of completion.",
    price: "$550",
    image: "/images/anna-outside.jpg",
    action: "Apply for Mentorship",
  },
};

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const course = courseData[slug as keyof typeof courseData];

  if (!course) {
    notFound();
  }

  const [isOpen, setIsOpen] = useState(false);
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
      lessonType: course.title,
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
      "Course Inquiry Request:",
      JSON.stringify(webhookPayload, null, 2),
    );

    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      reset();
    }, 2500);
  };

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      {/* Back Button */}
      <div className="container-max pt-28 px-6">
        <Button variant="ghost" asChild className="mb-8 -ml-4 text-zinc-500 hover:text-black">
          <Link href="/education">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Education
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden mb-20">
        <div className="container-max px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-[#FF69B4]">
                Course Details
              </p>
              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-8">
                {course.title}
              </h1>
              <div className="flex flex-wrap gap-6 mb-8 text-sm text-zinc-500 font-medium">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-[#FF69B4]" />
                  {course.duration}
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-[#FF69B4]" />
                  {course.target}
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#FF69B4]" />
                  {course.details}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl"
            >
              <Image
                src={course.image}
                alt={course.title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content & Investment */}
      <section className="bg-stone-50 py-20 lg:py-32 mb-20">
        <div className="container-max px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-16 items-start">
              <div className="md:col-span-2">
                <h2 className="font-serif text-3xl mb-6">About the Course</h2>
                <p className="text-lg text-zinc-600 leading-relaxed mb-8">
                  {course.description}
                </p>
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">What you&apos;ll learn:</h3>
                  <ul className="grid sm:grid-cols-2 gap-4">
                    {[
                      "Signature Skin Prep",
                      "Color Correction & Foundation",
                      "Amor Blending Techniques",
                      "Product Recommendations",
                      "Business & Branding Basics",
                      "Lighting & Content Tips",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-zinc-600">
                        <CheckCircle2 className="h-5 w-5 text-[#FF69B4]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-white p-8 md:p-10 shadow-xl border border-zinc-100 rounded-none text-center">
                <p className="text-sm font-medium uppercase tracking-widest text-zinc-400 mb-4">
                  The Investment
                </p>
                <div className="font-serif text-5xl font-bold mb-8">
                  {course.price}
                </div>
                
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      className="w-full bg-black text-white hover:bg-black/90"
                    >
                      {course.action}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
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
                            Course Inquiry
                          </DialogTitle>
                          <DialogDescription>
                            Secure your spot for {course.title}.
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

                <p className="mt-6 text-xs text-zinc-400">
                  Payments are non-refundable but transferable with 48h notice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
