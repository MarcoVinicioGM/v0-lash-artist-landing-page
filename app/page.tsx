import { Suspense } from "react";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { MeetTheArtist } from "@/components/meet-artist";
import { Footer } from "@/components/footer";
import dynamic from 'next/dynamic';

/**
 * Loading skeleton for below-fold sections
 * Uses content-visibility for paint optimization
 */
function SectionSkeleton() {
  return <div className="h-96 w-full animate-pulse bg-zinc-50 content-visibility-auto" />;
}

// Dynamic imports with code splitting for below-fold sections
// These will be loaded on-demand, reducing initial bundle size
const ServiceMenuSection = dynamic(() => 
  import("@/components/service-menu-section").then(mod => mod.ServiceMenuSection),
  { 
    loading: () => <SectionSkeleton />,
    ssr: true, // Enable SSR for SEO
  }
);

const BridalSection = dynamic(() => 
  import("@/components/bridal-section").then(mod => mod.BridalSection),
  { 
    loading: () => <SectionSkeleton />,
    ssr: true,
  }
);

const InstagramSection = dynamic(() => 
  import("@/components/instagram-section").then(mod => mod.InstagramSection),
  { 
    loading: () => <SectionSkeleton />,
    ssr: true,
  }
);

const LoveLetters = dynamic(() => 
  import("@/components/love-letters").then(mod => mod.LoveLetters),
  { 
    loading: () => <SectionSkeleton />,
    ssr: true,
  }
);

const ContactSection = dynamic(() => 
  import("@/components/contact-section").then(mod => mod.ContactSection),
  { 
    loading: () => <SectionSkeleton />,
    ssr: true,
  }
);

/**
 * HomePage - Main landing page with PPR enabled
 * 
 * Static Shell (prerendered):
 * - Navigation
 * - HeroSection  
 * - MeetTheArtist
 * - Footer
 * 
 * Dynamic/Streamed:
 * - ServiceMenuSection
 * - BridalSection
 * - InstagramSection
 * - LoveLetters
 * - ContactSection
 */
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="scroll-guided">
        {/* Above-the-fold: Critical content rendered immediately */}
        <HeroSection />
        <MeetTheArtist />
        
        {/* Below-the-fold: Streamed with Suspense boundaries */}
        <Suspense fallback={<SectionSkeleton />}>
          <ServiceMenuSection showPrices={false} data-snap="true" />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <BridalSection data-snap="true" />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <InstagramSection data-snap="true" />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <LoveLetters />
        </Suspense>
        
        <Suspense fallback={<SectionSkeleton />}>
          <ContactSection data-snap="true" />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
