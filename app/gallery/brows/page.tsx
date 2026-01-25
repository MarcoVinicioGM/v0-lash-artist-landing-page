import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { BrowsGallery } from "@/components/brows-gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brows Gallery | Amor Glam",
  description: "View our professional brow work including microblading, brow lamination, and brow shaping. See the precision and artistry that goes into every brow service.",
};

export default function BrowsGalleryPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <BrowsGallery />
      <Footer />
    </main>
  );
}
