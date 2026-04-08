import { Metadata } from 'next'
import { createMetadata } from '../../metadata'
import BabySteps from './BabySteps'

export const metadata: Metadata = createMetadata({
  title: 'Baby Steps Tracker',
  description: "Track your progress through Dave Ramsey's 7 Baby Steps. Set milestones, record your progress, and download your personalized tracker as a PDF.",
  keywords: ['baby steps', 'Dave Ramsey baby steps', 'financial peace', 'baby steps tracker', 'debt free plan'],
  path: '/downloads/baby-steps',
})

export default function BabyStepsPage() {
  return <BabySteps />
}
