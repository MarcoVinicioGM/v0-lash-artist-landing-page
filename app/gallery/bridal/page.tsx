import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { BridalGallery } from "@/components/bridal-gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bridal Gallery | Amor Glam",
  description: "Discover our bridal makeup artistry for weddings and special occasions. From trials to wedding day, see how we perfect every bride's vision.",
};

export default function BridalGalleryPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <BridalGallery />
      <Footer />
    </main>
  );
}