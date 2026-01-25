import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { GlamGallery } from "@/components/glam-gallery";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Glam Gallery | Amor Glam",
  description: "Explore our signature makeup artistry and glam transformations. From soft natural looks to bold red carpet glamour, see the artistry that defines Amor Glam.",
};

export default function GlamGalleryPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <GlamGallery />
      <Footer />
    </main>
  );
}