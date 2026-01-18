"use client";

import React from "react"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Mail, MapPin, HelpCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="bg-[#FAFAFA] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-black/50">
            We&apos;re Here to Help
          </p>
          <h2 className="font-serif text-4xl font-bold text-black md:text-5xl">
            Get in Touch
          </h2>
        </motion.div>

        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-6 font-serif text-2xl font-semibold text-black">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FF69B4]/10">
                    <Mail className="h-5 w-5 text-[#FF69B4]" />
                  </div>
                  <div>
                    <p className="font-medium text-black">Email Us</p>
                    <a
                      href="mailto:hello@amorglambeauty.com"
                      className="text-black/60 transition-colors hover:text-[#FF69B4]"
                    >
                      hello@amorglambeauty.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FF69B4]/10">
                    <MapPin className="h-5 w-5 text-[#FF69B4]" />
                  </div>
                  <div>
                    <p className="font-medium text-black">Studio Location</p>
                    <p className="text-black/60">
                      New Orleans & Metairie, Louisiana
                      <br />
                      <span className="text-sm italic">
                        House calls available upon request
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#FF69B4]/10">
                    <HelpCircle className="h-5 w-5 text-[#FF69B4]" />
                  </div>
                  <div>
                    <p className="font-medium text-black">
                      Frequently Asked Questions
                    </p>
                    <Link
                      href="/faq"
                      className="text-black/60 transition-colors hover:text-[#FF69B4]"
                    >
                      View our FAQ page &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="mb-2 font-serif text-lg font-semibold text-black">
                Have questions about allergies or sensitivities?
              </p>
              <p className="text-sm text-black/60">
                We use professional-grade, hypoallergenic products. If you have
                specific concerns about ingredients or skin sensitivities,
                please let us know in your inquiry and we&apos;ll accommodate
                your needs.
              </p>
            </div>
          </motion.div>

          {/* Right Column - General Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="rounded-3xl bg-white p-8 shadow-sm">
              <h3 className="mb-6 font-serif text-2xl font-semibold text-black">
                General Inquiry
              </h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle2 className="mb-4 h-16 w-16 text-[#FF69B4]" />
                  <h4 className="mb-2 font-serif text-xl font-bold">
                    Message Sent!
                  </h4>
                  <p className="text-muted-foreground">
                    We&apos;ll get back to you as soon as possible.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Name</Label>
                      <Input
                        id="contact-name"
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Email</Label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="What can we help with?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="booking">
                          Booking Assistance
                        </SelectItem>
                        <SelectItem value="house-call">
                          House Call Inquiry
                        </SelectItem>
                        <SelectItem value="allergies">
                          Allergies / Product Questions
                        </SelectItem>
                        <SelectItem value="group">
                          Group Booking (Non-Bridal)
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell us more about your inquiry..."
                      rows={4}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-black text-white transition-all duration-200 hover:bg-black/80 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Send Message
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
