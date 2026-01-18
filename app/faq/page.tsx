import { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FAQTabs } from "@/components/faq-tabs";

export const metadata: Metadata = {
  title: "Studio Concierge | Amor Glam Beauty",
  description: "Studio policies and frequently asked questions.",
};

const policies = [
  {
    question: "Cancellation Policy",
    answer: "We require 24 hours notice for all cancellations. Cancellations with less than 24 hours notice will forfeit their deposit. No-shows will be charged 100% of the service fee.",
  },
  {
    question: "Deposits & Payments",
    answer: "A non-refundable deposit is required to secure all bookings. The remaining balance is due on the day of service via cash, Zelle, or credit card.",
  },
  {
    question: "Late Arrivals",
    answer: "Please arrive on time. If you are more than 15 minutes late, your appointment may be shortened or cancelled to avoid impacting other clients, and your deposit will not be refunded.",
  },
];

const faqs = [
  {
    question: "Do you travel for appointments?",
    answer: "Yes, we offer on-site services for bridal parties and editorial projects. A travel fee applies based on distance from our Metairie studio.",
  },
  {
    question: "How should I prep my skin?",
    answer: "Please arrive with a clean, moisturized face. Avoid exfoliating or new skincare treatments 48 hours prior to your appointment.",
  },
  {
    question: "What is your signature style?",
    answer: "We specialize in 'Editorial Glam'—a look that looks stunning in person and flawless on camera, focusing on skin-like finishes and precise detail.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />
      
      <div className="mx-auto max-w-2xl px-6 pt-32 pb-20">
        <header className="mb-12 text-center">
          <h1 className="font-serif text-4xl font-bold text-black md:text-5xl">
            Studio Concierge
          </h1>
          <p className="mt-4 text-zinc-500">
            Everything you need to know about your Amor Glam experience.
          </p>
        </header>

        <FAQTabs policies={policies} faqs={faqs} />
      </div>

      <Footer />
    </main>
  );
}
