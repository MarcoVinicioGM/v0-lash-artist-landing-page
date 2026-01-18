"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { ServiceMenuSection } from "@/components/service-menu-section";

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-24">
        <ServiceMenuSection showPrices={true} />
      </div>
      <Footer />
    </main>
  );
}
