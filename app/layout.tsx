import React from "react"
import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { WebVitals } from '@/components/web-vitals'
import './globals.css'

export const metadata: Metadata = {
  title: 'Amor Glam Beauty | Artistry Services & Professional Products',
  description: 'High-end makeup artistry, esthetics services, and professional-grade beauty products. Bridal packages, facials, microblading, and the Amor Collection.',
  generator: 'v0.app',
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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased debug-screens`}>
        {children}
        <Analytics />
        <WebVitals />
      </body>
    </html>
  )
}
