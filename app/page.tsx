import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ServiceMenuSection } from "@/components/service-menu-section";
import { ShopSection } from "@/components/shop-section";
import { BridalSection } from "@/components/bridal-section";
import { InstagramSection } from "@/components/instagram-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <ServiceMenuSection />
      <ShopSection />
      <BridalSection />
      <InstagramSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
