import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Amor Glam",
  description: "Browse our portfolio of makeup artistry, bridal looks, and brow transformations. See the quality and precision that goes into every service.",
};

const BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mMUFVVbDQAAmgEGq/6+HQAAAABJRU5ErkJggg==";

const galleryCategories = [
  {
    title: "Glam",
    description: "Signature makeup artistry & transformations",
    href: "/gallery/glam",
    image: "/images/blonde.jpg",
  },
  {
    title: "Bridal",
    description: "Wedding day & special occasion looks",
    href: "/gallery/bridal",
    image: "/images/bridal-hero.jpg",
  },
  {
    title: "Brows",
    description: "Microblading, lamination & shaping",
    href: "/gallery/brows",
    image: "/images/microblading-alt.jpg",
  },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <section className="bg-white pt-28 pb-20 md:pt-32 md:pb-32">
        <div className="mx-auto max-w-6xl px-6">
          {/* Header */}
          <div className="mb-12 text-center">
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-[#FF69B4]">
              Our Work
            </p>
            <h1 className="font-serif text-4xl font-bold md:text-5xl lg:text-6xl">
              Gallery
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-600">
              Explore our portfolio of transformations. From signature glam to bridal perfection,
              see the artistry and attention to detail that defines Amor Glam.
            </p>
          </div>

          {/* Category Grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {galleryCategories.map((category) => (
              <Link 
                key={category.title}
                href={category.href}
                className="group relative overflow-hidden rounded-none"
              >
                <div className="relative aspect-[3/4]">
                  <Image
                    src={category.image}
                    alt={category.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    placeholder="blur"
                    blurDataURL={BLUR_DATA_URL}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="font-serif text-2xl font-bold mb-1">
                      {category.title}
                    </h3>
                    <p className="text-sm text-white/80">
                      {category.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
