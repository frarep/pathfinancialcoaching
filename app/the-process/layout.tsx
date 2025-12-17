import { Metadata } from 'next'
import { createMetadata } from '../metadata'

export const metadata: Metadata = createMetadata({
  title: 'The Coaching Process',
  description: 'Discover how financial coaching works. Learn about our proven 4-step process: Consultation, Budget Planning, Financial Education, and Ongoing Maintenance.',
  keywords: ['coaching process', 'financial coaching steps', 'how coaching works', 'budget planning', 'financial consultation'],
  path: '/the-process',
})

export default function TheProcessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
