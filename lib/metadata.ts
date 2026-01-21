import { Metadata } from 'next';

interface MetadataProps {
  title: string;
  description: string;
  image?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description,
  image = "/images/anna-glammed.jpeg",
  noIndex = false,
}: MetadataProps): Metadata {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://amorglambeauty.com';
  
  return {
    title: `${title} | Amor Glam Beauty`,
    description,
    openGraph: {
      title: `${title} | Amor Glam Beauty`,
      description,
      url: siteUrl,
      siteName: "Amor Glam Beauty",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
    },
    metadataBase: new URL(siteUrl),
  };
}
