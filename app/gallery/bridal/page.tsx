import { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Bridal Gallery | Amor Glam",
  description: "Discover our bridal makeup artistry for weddings and special occasions. From trials to wedding day, see how we perfect every bride's vision.",
};

export default function BridalGalleryPage() {
  redirect("/bridal");
}