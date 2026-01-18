"use client";

import React from "react"

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from "framer-motion";
import { CalendarIcon, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function BridalSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [weddingDate, setWeddingDate] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setWeddingDate(undefined);
    }, 2500);
  };

  return (
    <section id="bridal" className="bg-[#FDF2F8] py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
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
            <div className="mb-8 rounded-2xl bg-white/60 p-6 backdrop-blur-sm">
              <p className="text-sm font-medium uppercase tracking-wide text-black/50">
                Bridal Packages Starting From
              </p>
              <p className="mt-1 font-serif text-4xl font-bold text-black">
                $1,000
              </p>
            </div>

            {/* Bridal Quote Modal */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  size="lg"
                  className="bg-black text-white transition-all duration-200 hover:bg-black/80 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Request Bridal Quote
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-md">
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
                      We&apos;ll be in touch within 24-48 hours to discuss your
                      special day.
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
                        custom package for you.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="bridal-name">Your Name</Label>
                        <Input
                          id="bridal-name"
                          placeholder="Jane Doe"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bridal-email">Email Address</Label>
                        <Input
                          id="bridal-email"
                          type="email"
                          placeholder="jane@example.com"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Wedding Date</Label>
                        <Popover
                          open={isCalendarOpen}
                          onOpenChange={setIsCalendarOpen}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !weddingDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {weddingDate
                                ? format(weddingDate, "PPP")
                                : "Select a date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={weddingDate}
                              onSelect={(date) => {
                                setWeddingDate(date);
                                setIsCalendarOpen(false);
                              }}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                      <div className="space-y-2">
                        <Label>Venue Location</Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="nola">New Orleans</SelectItem>
                            <SelectItem value="metairie">Metairie</SelectItem>
                            <SelectItem value="other">
                              Other (Please specify in message)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="bridal-party-size">
                          Number of People in Bridal Party
                        </Label>
                        <Select required>
                          <SelectTrigger>
                            <SelectValue placeholder="Select party size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Just me (Bride)</SelectItem>
                            <SelectItem value="2-4">2-4 people</SelectItem>
                            <SelectItem value="5-8">5-8 people</SelectItem>
                            <SelectItem value="9+">9+ people</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-[#FF69B4] text-white transition-all duration-200 hover:bg-[#FF69B4]/90 hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Submit Request
                      </Button>
                    </form>
                  </>
                )}
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src="/images/bridal-new.jpg"
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
