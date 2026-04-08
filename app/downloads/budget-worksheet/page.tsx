import { Metadata } from 'next'
import { createMetadata } from '../../metadata'
import BudgetWorksheet from './BudgetWorksheet'

export const metadata: Metadata = createMetadata({
  title: 'Monthly Budget Worksheet',
  description: "Zero-based budget worksheet following Dave Ramsey's EveryDollar format. Customizable income and expense categories with automatic totals. Download as PDF.",
  keywords: ['budget worksheet', 'zero-based budget', 'EveryDollar', 'monthly budget', 'income expenses tracker'],
  path: '/downloads/budget-worksheet',
})

export default function BudgetWorksheetPage() {
  return <BudgetWorksheet />
}
