"use client";

import React from "react";

import { useState } from "react";
import Image from "next/image";
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
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalendarIcon, CheckCircle2, Info } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const bridalFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  weddingDate: z.date({ required_error: "Please select your wedding date" }),
  venueLocation: z.string().min(2, "Please enter the venue location"),
  partySize: z.number().min(1, "Party size must be at least 1"),
  details: z.string().optional(),
});

type BridalFormData = z.infer<typeof bridalFormSchema>;

export function BridalSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BridalFormData>({
    resolver: zodResolver(bridalFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      venueLocation: "",
      partySize: 1,
      details: "",
    },
  });

  const onSubmit = (data: BridalFormData) => {
    // Format the data for n8n webhook integration
    const webhookPayload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      weddingDate: data.weddingDate.toISOString(),
      venueLocation: data.venueLocation,
      partySize: data.partySize,
      details: data.details || "",
      submittedAt: new Date().toISOString(),
    };

    console.log(
      "Bridal Quote Request:",
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
    <section id="bridal" className="bg-[#FDF2F8] section-padding">
      <div className="container-max">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-black/50">
              Amor Brides
            </p>
            <h2 className="mb-6 font-serif text-4xl font-bold text-black md:text-5xl lg:text-6xl">
              Your Big Day,
              <br />
              <span className="italic">Perfected.</span>
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-black/70">
              From the engagement party to the honeymoon, we ensure you look
              flawless at every milestone. Our bridal packages include trials,
              touch-up kits, and day-of artistry.
            </p>

            {/* Bridal Actions */}
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-black bg-transparent text-black transition-all duration-200 hover:bg-black/5 hover:scale-[1.02] active:scale-[0.98]"
              >
                <a href="/services">Book Bridal Trial</a>
              </Button>
              <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-black text-white transition-all duration-200 hover:bg-black/80 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Request Wedding Quote
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
                      <h3 className="mb-2 font-serif text-2xl font-bold">
                        Thank You!
                      </h3>
                      <p className="text-muted-foreground">
                        We&apos;ll be in touch within 24-48 hours to discuss
                        your special day.
                      </p>
                    </motion.div>
                  ) : (
                    <>
                      <DialogHeader>
                        <DialogTitle className="font-serif text-2xl">
                          Bridal Concierge
                        </DialogTitle>
                        <DialogDescription>
                          Tell us about your wedding and we&apos;ll create a
                          custom package just for you.
                        </DialogDescription>
                      </DialogHeader>

                      <Alert className="border-[#FF69B4]/20 bg-[#FDF2F8]">
                        <Info className="h-4 w-4 text-[#FF69B4]" />
                        <AlertDescription className="text-sm text-black/70">
                          We highly recommend booking a Bridal Trial ($125)
                          before finalizing your wedding day contract.
                        </AlertDescription>
                      </Alert>

                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="mt-4 space-y-4"
                      >
                        {/* Name */}
                        <div className="space-y-2">
                          <Label htmlFor="bridal-name">Full Name</Label>
                          <Input
                            id="bridal-name"
                            placeholder="Jane Doe"
                            {...register("name")}
                          />
                          {errors.name && (
                            <p className="text-sm text-red-500">
                              {errors.name.message}
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                          <Label htmlFor="bridal-email">Email Address</Label>
                          <Input
                            id="bridal-email"
                            type="email"
                            placeholder="jane@example.com"
                            {...register("email")}
                          />
                          {errors.email && (
                            <p className="text-sm text-red-500">
                              {errors.email.message}
                            </p>
                          )}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                          <Label htmlFor="bridal-phone">Phone Number</Label>
                          <Input
                            id="bridal-phone"
                            type="tel"
                            placeholder="(504) 555-1234"
                            {...register("phone")}
                          />
                          {errors.phone && (
                            <p className="text-sm text-red-500">
                              {errors.phone.message}
                            </p>
                          )}
                        </div>

                        {/* Wedding Date */}
                        <div className="space-y-2">
                          <Label>Wedding Date</Label>
                          <Controller
                            name="weddingDate"
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
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
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
                          {errors.weddingDate && (
                            <p className="text-sm text-red-500">
                              {errors.weddingDate.message}
                            </p>
                          )}
                        </div>

                        {/* Venue Location */}
                        <div className="space-y-2">
                          <Label htmlFor="bridal-venue">Venue Location</Label>
                          <Input
                            id="bridal-venue"
                            placeholder="e.g. Hotel Monteleone, New Orleans"
                            {...register("venueLocation")}
                          />
                          {errors.venueLocation && (
                            <p className="text-sm text-red-500">
                              {errors.venueLocation.message}
                            </p>
                          )}
                        </div>

                        {/* Party Size */}
                        <div className="space-y-2">
                          <Label htmlFor="bridal-party-size">
                            Bridal Party Size
                          </Label>
                          <Input
                            id="bridal-party-size"
                            type="number"
                            min={1}
                            placeholder="1"
                            {...register("partySize", { valueAsNumber: true })}
                          />
                          {errors.partySize && (
                            <p className="text-sm text-red-500">
                              {errors.partySize.message}
                            </p>
                          )}
                        </div>

                        {/* Details */}
                        <div className="space-y-2">
                          <Label htmlFor="bridal-details">
                            Additional Details{" "}
                            <span className="text-muted-foreground">
                              (Optional)
                            </span>
                          </Label>
                          <Textarea
                            id="bridal-details"
                            placeholder="Tell us about your vision, any special requests, or questions..."
                            rows={3}
                            {...register("details")}
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-black text-white transition-all duration-200 hover:bg-black/80 hover:scale-[1.02] active:scale-[0.98]"
                        >
                          {isSubmitting ? "Submitting..." : "Submit Request"}
                        </Button>
                      </form>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-none">
              <Image
                src="/images/bridal-hero.jpg"
                alt="Beautiful bride with flawless makeup"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
