import { Metadata } from 'next'
import { createMetadata } from '../../metadata'
import GoalSettingForm from './GoalSettingForm'

export const metadata: Metadata = createMetadata({
  title: 'Goal-Setting Worksheet',
  description: 'Set SMART financial goals with our interactive worksheet. Define specific, measurable, achievable, relevant, and time-bound goals — then download as a PDF.',
  keywords: ['financial goals', 'SMART goals', 'goal setting worksheet', 'financial planning', 'goal tracker'],
  path: '/downloads/goal-setting',
})

export default function GoalSettingPage() {
  return <GoalSettingForm />
}
