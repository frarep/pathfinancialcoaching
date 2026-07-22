import { Metadata } from 'next'
import { createMetadata } from '../metadata'

export const metadata: Metadata = createMetadata({
  title: 'About Coach Patrick',
  description: 'Meet Patrick Frare, a Former Ramsey Preferred Coach and Master Trained Financial Coach. Firefighter, veteran, and dedicated coach helping families achieve financial freedom. Based in Junction City, Oregon.',
  keywords: ['Patrick Frare', 'about financial coach', 'Ramsey coach Oregon', 'financial coach bio', 'firefighter financial coach'],
  path: '/about',
})

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
