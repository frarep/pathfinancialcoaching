import { Metadata } from 'next'
import { createMetadata } from '../metadata'

export const metadata: Metadata = createMetadata({
  title: 'Free Consultation',
  description: 'Schedule your free financial coaching consultation. Get personalized guidance on budgeting, debt elimination, and achieving your financial goals. No obligation.',
  keywords: ['free consultation', 'financial coaching appointment', 'schedule coaching', 'free financial advice', 'coaching session'],
  path: '/free-consultation',
})

export default function FreeConsultationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
