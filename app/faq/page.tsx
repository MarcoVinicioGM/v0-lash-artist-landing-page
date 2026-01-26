import { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FAQTabs } from "@/components/faq-tabs-ssr";

export const metadata: Metadata = {
  title: "Studio Concierge | Amor Glam Beauty",
  description: "Studio policies and frequently asked questions.",
};

const policies = [
  {
    question: "Cancellation Policy",
    answer: "We require 1 week notice for cancellations. For weddings, you must advise us of cancellations 3 months beforehand. Cancellations made with less notice may be subject to fees.",
  },
  {
    question: "Payment Methods",
    answer: "We accept Cash, Venmo, or Card for deposits and payments.",
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
    answer: "Please arrive with a clean, moisturized face. We recommend exfoliating or dermaplaning week of your appointment.",
  },
  {
    question: "What is your signature style?",
    answer: "We specialize in 'Editorial Glam'—a look that looks stunning in person and flawless on camera, focusing on skin-like finishes and precise detail.",
  },
];

export default async function FAQPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const activeTab = (params.tab as string) || "policies";

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

        <FAQTabs policies={policies} faqs={faqs} activeTab={activeTab} />
      </div>

      <Footer />
    </main>
  );
}
