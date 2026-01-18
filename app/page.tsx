import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { MeetTheArtist } from "@/components/meet-artist";
import { ServiceMenuSection } from "@/components/service-menu-section";
import { ShopSection } from "@/components/shop-section";
import { BridalSection } from "@/components/bridal-section";
import { InstagramSection } from "@/components/instagram-section";
import { LoveLetters } from "@/components/love-letters";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <MeetTheArtist />
      <ServiceMenuSection showPrices={false} />
      <ShopSection />
      <BridalSection />
      <InstagramSection />
      <LoveLetters />
      <ContactSection />
      <Footer />
    </main>
  );
}
