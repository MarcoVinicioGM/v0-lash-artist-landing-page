import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { MeetTheArtist } from "@/components/meet-artist";
import { Footer } from "@/components/footer";
import dynamic from 'next/dynamic';

const ServiceMenuSection = dynamic(() => 
  import("@/components/service-menu-section").then(mod => mod.ServiceMenuSection),
  { loading: () => <div className="h-96 w-full animate-pulse bg-zinc-50" /> }
);
const ShopSection = dynamic(() => 
  import("@/components/shop-section").then(mod => mod.ShopSection),
  { loading: () => <div className="h-96 w-full animate-pulse bg-zinc-50" /> }
);
const BridalSection = dynamic(() => 
  import("@/components/bridal-section").then(mod => mod.BridalSection),
  { loading: () => <div className="h-96 w-full animate-pulse bg-zinc-50" /> }
);
const InstagramSection = dynamic(() => 
  import("@/components/instagram-section").then(mod => mod.InstagramSection),
  { loading: () => <div className="h-96 w-full animate-pulse bg-zinc-50" /> }
);
const LoveLetters = dynamic(() => 
  import("@/components/love-letters").then(mod => mod.LoveLetters),
  { loading: () => <div className="h-96 w-full animate-pulse bg-zinc-50" /> }
);
const ContactSection = dynamic(() => 
  import("@/components/contact-section").then(mod => mod.ContactSection),
  { loading: () => <div className="h-96 w-full animate-pulse bg-zinc-50" /> }
);

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="scroll-guided">
        <HeroSection />
        <MeetTheArtist />
        <ServiceMenuSection showPrices={false} data-snap="true" />
        <ShopSection data-snap="true" />
        <BridalSection data-snap="true" />
        <InstagramSection data-snap="true" />
        <LoveLetters />
        <ContactSection data-snap="true" />
      </div>
      <Footer />
    </main>
  );
}
