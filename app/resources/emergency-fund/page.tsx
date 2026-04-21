import { Metadata } from 'next'
import { createMetadata } from '../../metadata'
import EmergencyFundGuide from './EmergencyFundGuide'

export const metadata: Metadata = createMetadata({
  title: 'Emergency Fund Guide',
  description: 'Learn what an emergency fund is, why you need one, and use our calculator to find your personal savings target — starter $1,000 fund or 3–6 months of expenses.',
  keywords: ['emergency fund', 'emergency savings', 'starter emergency fund', 'baby step 1', 'baby step 3', 'financial security'],
  path: '/resources/emergency-fund',
})

export default function EmergencyFundPage() {
  return <EmergencyFundGuide />
}
