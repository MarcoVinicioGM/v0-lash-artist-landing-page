import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Anna Garcia | Book Your Appointment',
  description: 'Book makeup services, bridal packages, and makeup lessons with Anna Garcia in New Orleans. Studios in Metairie and Houma.',
}

export default function LinkInBioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
