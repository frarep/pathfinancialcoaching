import { Metadata } from 'next'
import { createMetadata } from '../../metadata'
import DebtCalculator from './DebtCalculator'

export const metadata: Metadata = createMetadata({
  title: 'Debt Snowball Calculator',
  description: 'Calculate your debt-free date using the debt snowball method. List your debts, add an extra monthly payment, and see your payoff plan. Download as PDF.',
  keywords: ['debt snowball', 'debt calculator', 'debt payoff', 'debt free', 'Dave Ramsey debt'],
  path: '/downloads/debt-calculator',
})

export default function DebtCalculatorPage() {
  return <DebtCalculator />
}
