import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { WebVitals } from '@/components/web-vitals'
import './globals.css'

/**
 * Viewport configuration - Next.js 16 pattern
 * Separated from metadata for better static optimization
 */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#09090b' },
  ],
}

/**
 * Root metadata - enhanced for SEO and social sharing
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://amorglambeauty.com'),
  title: {
    default: 'Amor Glam Beauty | Artistry Services & Professional Products',
    template: '%s | Amor Glam Beauty',
  },
  description: 'High-end makeup artistry, esthetics services, and professional-grade beauty products. Bridal packages, facials, microblading, and the Amor Collection.',
  keywords: ['makeup artist', 'bridal makeup', 'microblading', 'New Orleans', 'beauty', 'lashes', 'brows'],
  authors: [{ name: 'Anna Garcia', url: 'https://amorglambeauty.com' }],
  creator: 'Amor Glam Beauty',
  publisher: 'Amor Glam Beauty',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://amorglambeauty.com',
    siteName: 'Amor Glam Beauty',
    title: 'Amor Glam Beauty | Premier Makeup & Brow Artistry',
    description: 'High-end makeup artistry, esthetics services, and professional-grade beauty products in New Orleans.',
    images: [
      {
        url: '/images/anna-glammed.jpeg',
        width: 1200,
        height: 630,
        alt: 'Amor Glam Beauty - Premier Makeup Artistry',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amor Glam Beauty | Premier Makeup & Brow Artistry',
    description: 'High-end makeup artistry in New Orleans. Bridal packages, microblading, and professional beauty services.',
    images: ['/images/anna-glammed.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
        <WebVitals />
      </body>
    </html>
  )
}
