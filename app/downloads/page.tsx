import { Target, DollarSign, CreditCard, ListChecks, ArrowRight } from 'lucide-react'
import { Metadata } from 'next'
import { createMetadata } from '../metadata'
import Link from 'next/link'

export const metadata: Metadata = createMetadata({
  title: 'Free Downloads & Worksheets',
  description: 'Free interactive financial worksheets — goal-setting, budget planner, debt calculator, and baby steps tracker. Fill online and download as PDF.',
  keywords: ['financial worksheets', 'budget templates', 'debt tracker', 'free downloads', 'financial planning tools', 'goal setting'],
  path: '/downloads',
})

const resources = [
  {
    href: '/downloads/goal-setting',
    icon: Target,
    category: 'Goal Planning',
    title: 'Goal-Setting Worksheet',
    description: 'Define your financial goals using the SMART framework. Set specific, measurable targets and build a 7, 30, and 90-day action plan.',
    available: true,
  },
  {
    href: '/downloads/budget-worksheet',
    icon: DollarSign,
    category: 'Budgeting',
    title: 'Monthly Budget Worksheet',
    description: "Zero-based budget following Dave Ramsey's EveryDollar format. Customizable income and expense categories with automatic calculations.",
    available: true,
  },
  {
    href: '/downloads/debt-calculator',
    icon: CreditCard,
    category: 'Debt Management',
    title: 'Debt Snowball Calculator',
    description: 'List all your debts, see your payoff order using the debt snowball method, and track your progress toward becoming debt-free.',
    available: true,
  },
  {
    href: '/downloads/baby-steps',
    icon: ListChecks,
    category: 'Baby Steps',
    title: 'Baby Steps Tracker',
    description: "Track your progress through Dave Ramsey's 7 Baby Steps with a personalized milestone tracker.",
    available: true,
  },
]

export default function Downloads() {
  return (
    <div>
      {/* Hero */}
      <section className="section-container py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 text-gray-900">
          INTERACTIVE WORKSHEETS
        </h1>
        <p className="section-subtitle">
          Free tools to help you plan, budget, and track your financial journey. Fill them out online and download as a PDF to keep.
        </p>
      </section>

      {/* Resource Cards */}
      <section className="section-container pt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {resources.map(({ href, icon: Icon, category, title, description, available }) => (
            available ? (
              <Link key={href} href={href}
                className="card group hover:bg-gradient-to-br hover:from-soft-blue-light hover:to-white transition-all duration-300 flex flex-col">
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-soft-blue-light rounded-lg group-hover:bg-white transition-colors">
                      <Icon className="h-6 w-6 text-brand-red" />
                    </div>
                    <span className="text-xs font-semibold text-brand-red uppercase tracking-wide">{category}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
                  <p className="text-gray-600 text-sm flex-grow">{description}</p>
                </div>
                <div className="flex items-center gap-1 text-brand-red font-semibold text-sm mt-4">
                  Open Worksheet <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ) : (
              <div key={href} className="card opacity-60 flex flex-col cursor-not-allowed">
                <div className="flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <Icon className="h-6 w-6 text-gray-400" />
                    </div>
                    <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{category}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-500 mb-2">{title}</h2>
                  <p className="text-gray-400 text-sm flex-grow">{description}</p>
                </div>
                <div className="text-xs font-semibold text-gray-400 mt-4 uppercase tracking-wide">Coming Soon</div>
              </div>
            )
          ))}
        </div>
      </section>

      {/* How to Use */}
      <section className="section-container">
        <div className="max-w-3xl mx-auto card">
          <h2 className="text-xl font-bold mb-4 text-gray-900 text-center">How to Use These Worksheets</h2>
          <ul className="text-gray-700 space-y-3 text-sm">
            {[
              'Fill out the worksheet directly on this page — no account needed.',
              'Click "Download as PDF" when done. In the print dialog, choose "Save as PDF".',
              'Use these tools alongside your coaching sessions for maximum benefit.',
              'Print copies or save digitally to revisit and update over time.',
            ].map((tip, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="text-brand-red font-bold mt-0.5 shrink-0">•</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
