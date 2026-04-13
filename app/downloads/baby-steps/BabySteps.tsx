'use client'

import { useState } from 'react'
import { Download, Check } from 'lucide-react'

interface Step {
  number: number
  title: string
  description: string
  detail: string
  goal: string
  goalPlaceholder: string
  notePlaceholder: string
}

const STEPS: Step[] = [
  {
    number: 1,
    title: '$1,000 Starter Emergency Fund',
    description: 'Save $1,000 as fast as you can.',
    detail: 'This is your safety net — a buffer between you and life. It keeps small emergencies from becoming debt.',
    goal: '$1,000',
    goalPlaceholder: 'Current savings: $0',
    notePlaceholder: 'Where will you keep this money? When will you reach $1,000?',
  },
  {
    number: 2,
    title: 'Pay Off All Debt (Debt Snowball)',
    description: 'Pay off all debt (except the house) using the debt snowball.',
    detail: 'List your debts smallest to largest. Pay minimums on everything except the smallest, and attack it with every extra dollar.',
    goal: 'Debt-free (except mortgage)',
    goalPlaceholder: 'Total debt remaining: $',
    notePlaceholder: 'What is your smallest debt? What is your target payoff date?',
  },
  {
    number: 3,
    title: '3–6 Months of Expenses Saved',
    description: 'Build a fully funded emergency fund.',
    detail: 'This covers 3–6 months of living expenses. Keeps job loss, medical bills, or major repairs from wrecking your progress.',
    goal: '3–6 months of expenses',
    goalPlaceholder: 'Monthly expenses × 3–6 = target $',
    notePlaceholder: 'What is your monthly expense total? What is your savings target?',
  },
  {
    number: 4,
    title: 'Invest 15% for Retirement',
    description: 'Invest 15% of your household income for retirement.',
    detail: 'Start with your 401(k) up to the employer match, then max a Roth IRA. Invest the remainder in your 401(k) to hit 15%.',
    goal: '15% of income',
    goalPlaceholder: 'Annual income × 15% = $ per year',
    notePlaceholder: 'Where are you investing? (401k, Roth IRA, etc.)',
  },
  {
    number: 5,
    title: 'Save for Kids\' College',
    description: 'Save for your children\'s college using ESAs and 529s.',
    detail: 'Use Education Savings Accounts (ESAs) and 529s. Start with $2,000/year per child in an ESA, then supplement with a 529.',
    goal: 'Education savings goal',
    goalPlaceholder: 'Target per child: $',
    notePlaceholder: 'How many children? What type of accounts are you using?',
  },
  {
    number: 6,
    title: 'Pay Off Your Home Early',
    description: 'Pay off your home early.',
    detail: 'Put all extra money toward your mortgage principal. Even small extra payments dramatically reduce your payoff timeline.',
    goal: 'Mortgage payoff',
    goalPlaceholder: 'Mortgage balance remaining: $',
    notePlaceholder: 'What is your target payoff date? How much extra are you paying monthly?',
  },
  {
    number: 7,
    title: 'Build Wealth & Give Generously',
    description: 'Build wealth, become outrageously generous, and live like no one else.',
    detail: 'Keep investing, grow your wealth, and give generously. This is the reward for all the hard work — true financial peace.',
    goal: 'Build wealth & give',
    goalPlaceholder: 'Net worth goal: $',
    notePlaceholder: 'What does financial freedom look like for you? How do you want to give?',
  },
]

type StepData = Record<number, { status: 'not-started' | 'in-progress' | 'complete'; progress: string; notes: string; targetDate: string }>

function generatePDF(name: string, currentStep: number, stepData: StepData) {
  const stepRows = STEPS.map(step => {
    const data = stepData[step.number] || { status: 'not-started', progress: '', notes: '', targetDate: '' }
    const statusLabel = data.status === 'complete' ? '✓ Complete' : data.status === 'in-progress' ? '▶ In Progress' : '○ Not Started'
    const statusColor = data.status === 'complete' ? '#16A34A' : data.status === 'in-progress' ? '#DC2626' : '#9CA3AF'
    const isActive = step.number === currentStep
    return `
      <div style="margin-bottom:16px;padding:14px;border-radius:8px;border-left:5px solid ${isActive ? '#DC2626' : data.status === 'complete' ? '#16A34A' : '#D1D5DB'};background:${isActive ? '#FEF2F2' : '#F9FAFB'};">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:6px;">
          <div>
            <span style="color:#DC2626;font-weight:bold;font-size:12px;">BABY STEP ${step.number}</span>
            ${isActive ? '<span style="background:#DC2626;color:white;font-size:10px;padding:1px 6px;border-radius:10px;margin-left:8px;">CURRENT STEP</span>' : ''}
            <div style="font-size:15px;font-weight:bold;color:#111827;margin-top:2px;">${step.title}</div>
          </div>
          <div style="color:${statusColor};font-weight:bold;font-size:12px;white-space:nowrap;margin-left:12px;">${statusLabel}</div>
        </div>
        <div style="font-size:12px;color:#6B7280;margin-bottom:8px;">${step.description}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;font-size:12px;">
          <div><strong>Progress:</strong> ${data.progress || '—'}</div>
          <div><strong>Target Date:</strong> ${data.targetDate || '—'}</div>
          ${data.notes ? `<div style="grid-column:1/-1;"><strong>Notes:</strong> ${data.notes}</div>` : ''}
        </div>
      </div>`
  }).join('')

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Baby Steps Tracker — Path Financial Coaching</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 760px; margin: 0 auto; padding: 20px; color: #1F2937; }
    .header { text-align: center; border-bottom: 3px solid #DC2626; padding-bottom: 14px; margin-bottom: 20px; }
    .header h1 { color: #DC2626; font-size: 24px; margin: 0 0 3px 0; }
    .header .sub { color: #6B7280; font-size: 12px; }
    .meta { display: flex; justify-content: space-between; margin-bottom: 20px; padding: 8px 12px; background: #F9FAFB; border-radius: 6px; font-size: 13px; }
    .footer { text-align: center; margin-top: 30px; padding-top: 14px; border-top: 1px solid #E5E7EB; color: #9CA3AF; font-size: 11px; }
    @media print { body { padding: 8px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>Baby Steps Tracker</h1>
    <div class="sub">Path Financial Coaching — Dave Ramsey's 7 Baby Steps</div>
  </div>
  <div class="meta">
    <div><strong>Name:</strong> ${name || '___________________________'}</div>
    <div><strong>Current Step:</strong> Baby Step ${currentStep}</div>
    <div><strong>Date:</strong> ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</div>
  </div>
  ${stepRows}
  <div class="footer">
    <p>Path Financial Coaching | pathfinancialcoaching.com</p>
    <p>Coach Patrick Frare — Ramsey Trained Master Financial Coach</p>
  </div>
</body>
</html>`

  const w = window.open('', '_blank')
  if (w) { w.document.write(html); w.document.close(); w.focus(); setTimeout(() => w.print(), 400) }
}

const STATUS_OPTIONS = [
  { value: 'not-started', label: 'Not Started', color: 'text-gray-400' },
  { value: 'in-progress', label: 'In Progress', color: 'text-brand-red' },
  { value: 'complete', label: 'Complete', color: 'text-green-600' },
] as const

export default function BabySteps() {
  const [name, setName] = useState('')
  const [manualOverride, setManualOverride] = useState(false)
  const [manualStep, setManualStep] = useState(1)
  const [stepData, setStepData] = useState<StepData>({})

  const getStepData = (n: number) =>
    stepData[n] || { status: 'not-started' as const, progress: '', notes: '', targetDate: '' }

  const updateStepData = (n: number, field: string, value: string) =>
    setStepData(prev => ({
      ...prev,
      [n]: { ...getStepData(n), [field]: value },
    }))

  const completedCount = STEPS.filter(s => getStepData(s.number).status === 'complete').length
  const progressPct = Math.round((completedCount / 7) * 100)

  const autoStep = STEPS.find(s => getStepData(s.number).status !== 'complete')?.number ?? 7
  const currentStep = manualOverride ? manualStep : autoStep

  return (
    <div>
      {/* Hero */}
      <section className="section-container py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
            BABY STEPS TRACKER
          </h1>
          <p className="section-subtitle">
            Track your progress through Dave Ramsey's 7 Baby Steps — your proven path to financial peace.
          </p>
        </div>
      </section>

      <section className="section-container pt-0">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Personal Info */}
          <div className="card">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                  placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">I am currently on Baby Step</label>
                <select value={currentStep}
                  onChange={e => { setManualStep(Number(e.target.value)); setManualOverride(true) }}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-soft-blue focus:border-transparent">
                  {STEPS.map(s => <option key={s.number} value={s.number}>Baby Step {s.number}</option>)}
                </select>
                <div className="mt-1.5 flex items-center gap-1.5 text-xs">
                  {manualOverride ? (
                    <>
                      <span className="text-amber-600 font-medium">Manual override</span>
                      <span className="text-gray-400">·</span>
                      <button onClick={() => setManualOverride(false)}
                        className="text-brand-red hover:underline font-medium">
                        Reset to auto
                      </button>
                    </>
                  ) : (
                    <span className="text-green-600 font-medium">Auto-calculated from completed steps</span>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{completedCount} of 7 steps complete</span>
                <span>{progressPct}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-brand-red rounded-full transition-all duration-500"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>
          </div>

          {/* Step Cards */}
          {STEPS.map(step => {
            const data = getStepData(step.number)
            const isActive = step.number === currentStep
            const isComplete = data.status === 'complete'

            return (
              <div key={step.number}
                className={`card transition-all duration-300 ${isActive ? 'border-2 border-brand-red' : isComplete ? 'border-2 border-green-400' : ''}`}>

                {/* Step Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 font-bold text-lg
                    ${isComplete ? 'bg-green-500 text-white' : isActive ? 'bg-brand-red text-white' : 'bg-gray-200 text-gray-600'}`}>
                    {isComplete ? <Check className="h-5 w-5" /> : step.number}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-brand-red uppercase tracking-wide">Baby Step {step.number}</span>
                      {isActive && (
                        <span className="text-xs bg-brand-red text-white px-2 py-0.5 rounded-full font-bold">Current Step</span>
                      )}
                    </div>
                    <h3 className="font-bold text-gray-900 text-base mt-0.5">{step.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{step.detail}</p>
                  </div>
                </div>

                {/* Status + Fields */}
                <div className="space-y-3">
                  {/* Status selector */}
                  <div className="flex gap-2 flex-wrap">
                    {STATUS_OPTIONS.map(opt => (
                      <button key={opt.value}
                        onClick={() => updateStepData(step.number, 'status', opt.value)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all
                          ${data.status === opt.value
                            ? opt.value === 'complete' ? 'bg-green-500 text-white border-green-500'
                              : opt.value === 'in-progress' ? 'bg-brand-red text-white border-brand-red'
                              : 'bg-gray-400 text-white border-gray-400'
                            : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400'}`}>
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">My Progress / Current Amount</label>
                      <input type="text" value={data.progress}
                        onChange={e => updateStepData(step.number, 'progress', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-sm focus:ring-1 focus:ring-soft-blue focus:border-transparent"
                        placeholder={step.goalPlaceholder} />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1">Target Date</label>
                      <input type="date" value={data.targetDate}
                        onChange={e => updateStepData(step.number, 'targetDate', e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-sm focus:ring-1 focus:ring-soft-blue focus:border-transparent" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Notes</label>
                    <textarea value={data.notes}
                      onChange={e => updateStepData(step.number, 'notes', e.target.value)}
                      rows={2}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-sm focus:ring-1 focus:ring-soft-blue focus:border-transparent resize-vertical"
                      placeholder={step.notePlaceholder} />
                  </div>
                </div>
              </div>
            )
          })}

          {/* Download */}
          <div className="text-center pt-2 pb-8">
            <button onClick={() => generatePDF(name, currentStep, stepData)}
              className="btn-primary inline-flex items-center gap-3">
              <Download className="h-5 w-5" />
              Download as PDF
            </button>
            <p className="text-sm text-gray-500 mt-2">Fill in your progress above, then click to download. Select "Save as PDF" in the print dialog.</p>
          </div>

        </div>
      </section>
    </div>
  )
}
