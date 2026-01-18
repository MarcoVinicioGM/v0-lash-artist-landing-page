"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQTabsProps {
  policies: FAQItem[];
  faqs: FAQItem[];
}

function FAQTabsContent({ policies, faqs }: FAQTabsProps) {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get("tab") || "policies";

  return (
    <Tabs defaultValue={defaultTab} className="w-full">
      <TabsList className="grid w-full grid-cols-2 mb-8 bg-zinc-100 p-1">
        <TabsTrigger value="policies" className="font-medium">Policies</TabsTrigger>
        <TabsTrigger value="faqs" className="font-medium">Common Questions</TabsTrigger>
      </TabsList>
      
      <TabsContent value="policies" className="mt-0">
        <Accordion type="single" collapsible className="w-full border-t">
          {policies.map((item, i) => (
            <AccordionItem key={i} value={`policy-${i}`}>
              <AccordionTrigger className="text-left font-serif text-lg py-6 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-600 leading-relaxed pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </TabsContent>

      <TabsContent value="faqs" className="mt-0">
        <Accordion type="single" collapsible className="w-full border-t">
          {faqs.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left font-serif text-lg py-6 hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-zinc-600 leading-relaxed pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </TabsContent>
    </Tabs>
  );
}

export function FAQTabs(props: FAQTabsProps) {
  return (
    <Suspense fallback={<div className="h-64 flex items-center justify-center text-zinc-400">Loading details...</div>}>
      <FAQTabsContent {...props} />
    </Suspense>
  );
}
