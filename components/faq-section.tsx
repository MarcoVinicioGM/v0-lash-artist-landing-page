"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    id: "cancellation",
    question: "Cancellation Policy",
    answer:
      "Please provide 24 hours notice for any cancellations or rescheduling. Cancellations made less than 24 hours before your appointment may be subject to a cancellation fee of 50% of the service price. No-shows will be charged the full service amount.",
  },
  {
    id: "late-arrivals",
    question: "Late Arrivals",
    answer:
      "After 15 minutes, your appointment may be rescheduled to accommodate other clients. If you are running late, please contact us immediately so we can do our best to accommodate you. Significantly late arrivals may result in a shortened service time while being charged the full price.",
  },
  {
    id: "bridal-retainers",
    question: "Bridal Retainers",
    answer:
      "A 50% non-refundable retainer is required to secure your wedding date. This retainer will be applied to your final balance. The remaining balance is due 2 weeks before your wedding date. Retainers are non-refundable but may be transferred to a different date within 12 months, subject to availability.",
  },
  {
    id: "shipping",
    question: "Shipping & Returns",
    answer:
      "Products ship within 2-3 business days via USPS Priority Mail. Orders over $50 qualify for complimentary shipping within the continental US. Due to the nature of beauty products, we cannot accept returns on opened items. Unopened products may be returned within 14 days for store credit.",
  },
];

export function FaqSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="font-serif text-3xl font-light tracking-tight sm:text-4xl">
            Studio Policies & FAQ
          </h2>
          <p className="mt-3 text-sm text-zinc-500">
            Everything you need to know before your visit
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem key={item.id} value={item.id} className="border-zinc-200">
                <AccordionTrigger className="font-serif text-base font-normal hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-zinc-600 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
