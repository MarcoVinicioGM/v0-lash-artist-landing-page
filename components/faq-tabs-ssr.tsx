"use client";

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
  activeTab: string;
}

export function FAQTabs({ policies, faqs, activeTab }: FAQTabsProps) {
  return (
    <Tabs defaultValue={activeTab} className="w-full">
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
