'use client'

import { useState } from 'react'
import { AlertTriangle, CheckCircle, XCircle, Download, PiggyBank, Target } from 'lucide-react'

function parseNum(s: string) { return parseFloat(s.replace(/[^0-9.]/g, '')) || 0 }
function fmt(n: number)      { return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` }
function fmtRound(n: number) { return `$${Math.round(n).toLocaleString('en-US')}` }

function generatePDF(name: string, totalMonthly: number, months: number, alreadySaved: number, fundTarget: number, stillNeeded: number) {
  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Emergency Fund Plan — Path Financial Coaching</title>
  <style>
    @page { margin: 0.6in; }
    html, body { margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto; padding: 20px; color: #1F2937; font-size: 12px; }
    .header { text-align: center; border-bottom: 3px solid #DC2626; padding-bottom: 14px; margin-bottom: 20px; }
    .header h1 { color: #DC2626; font-size: 24px; margin: 0 0 3px 0; }
    .header .sub { color: #6B7280; font-size: 12px; }
    .meta { display: flex; justify-content: space-between; margin-bottom: 20px; padding: 8px 12px; background: #F9FAFB; border-radius: 6px; }
    .section-title { font-size: 14px; font-weight: bold; color: #111827; margin: 20px 0 8px 0; border-bottom: 1px solid #E5E7EB; padding-bottom: 4px; }
    .results { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 12px; }
    .result-box { padding: 14px; border-radius: 8px; text-align: center; }
    .result-box .label { font-size: 11px; color: #6B7280; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600; margin-bottom: 4px; }
    .result-box .value { font-size: 20px; font-weight: bold; }
    .target { background: #F0FDF4; border: 1px solid #BBF7D0; }
    .target .value { color: #16A34A; }
    .saved { background: #EFF6FF; border: 1px solid #BFDBFE; }
    .saved .value { color: #2563EB; }
    .needed { background: #FEF2F2; border: 1px solid #FECACA; }
    .needed .value { color: #DC2626; }
    .funded { background: #F0FDF4; border: 1px solid #BBF7D0; }
    .funded .value { color: #16A34A; }
    .starter-row { display: flex; justify-content: space-between; align-items: center; background: #FFF7ED; border: 1px solid #FED7AA; border-radius: 8px; padding: 10px 14px; margin-top: 12px; }
    .starter-label { font-size: 11px; color: #92400E; font-weight: 600; }
    .starter-value { font-size: 16px; font-weight: bold; color: #EA580C; }
    .note { background: #FEF2F2; border-left: 4px solid #DC2626; padding: 10px 12px; border-radius: 0 6px 6px 0; margin-top: 16px; font-size: 11px; color: #6B7280; }
    .steps { margin-top: 8px; }
    .step { display: flex; gap: 10px; margin-bottom: 10px; align-items: flex-start; page-break-inside: avoid; }
    .step-badge { background: #DC2626; color: white; border-radius: 50%; width: 22px; height: 22px; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 11px; flex-shrink: 0; margin-top: 1px; }
    .step-text .step-title { font-weight: bold; color: #111827; margin-bottom: 2px; }
    .step-text .step-desc { color: #4B5563; }
    .footer { text-align: center; margin-top: 30px; padding-top: 14px; border-top: 1px solid #E5E7EB; color: #9CA3AF; font-size: 11px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Emergency Fund Plan</h1>
    <div class="sub">Path Financial Coaching — Your Path to Financial Peace</div>
  </div>
  <div class="meta">
    <div><strong>Name:</strong> ${name || '___________________________'}</div>
    <div><strong>Coverage Goal:</strong> ${months} month${months !== 1 ? 's' : ''} of expenses</div>
  </div>

  <div class="section-title">Your Numbers</div>
  <div class="results">
    <div class="result-box target">
      <div class="label">Full Fund Target (${months} months)</div>
      <div class="value">${totalMonthly > 0 ? fmtRound(fundTarget) : '—'}</div>
      <div style="font-size:11px;color:#6B7280;margin-top:4px;">${totalMonthly > 0 ? fmt(totalMonthly) + '/mo × ' + months + ' months' : ''}</div>
    </div>
    <div class="result-box saved">
      <div class="label">Already Saved</div>
      <div class="value">${alreadySaved > 0 ? fmtRound(alreadySaved) : '—'}</div>
    </div>
  </div>
  ${totalMonthly > 0 ? `
  <div class="results" style="margin-top:12px;grid-template-columns:1fr;">
    ${stillNeeded <= 0
      ? `<div class="result-box funded"><div class="label">Status</div><div class="value">Fully Funded!</div><div style="font-size:11px;color:#6B7280;margin-top:4px;">Your emergency fund goal is met.</div></div>`
      : `<div class="result-box needed"><div class="label">Still Needed</div><div class="value">${fmtRound(stillNeeded)}</div><div style="font-size:11px;color:#6B7280;margin-top:4px;">to reach your ${months}-month goal</div></div>`
    }
  </div>
  <div class="starter-row">
    <div>
      <div class="starter-label">Starter Emergency Fund Goal</div>
      <div style="font-size:11px;color:#92400E;">Save this first — before tackling debt</div>
    </div>
    <div class="starter-value">$1,000</div>
  </div>` : ''}

  <div class="section-title" style="margin-top:24px;">Your Action Steps</div>
  <div class="steps">
    <div class="step">
      <div class="step-badge">1</div>
      <div class="step-text">
        <div class="step-title">Save $1,000 — Fast</div>
        <div class="step-desc">Sell things, pick up extra shifts, cut non-essentials. Get to $1,000 as quickly as possible and park it in a separate savings account.</div>
      </div>
    </div>
    <div class="step">
      <div class="step-badge">2</div>
      <div class="step-text">
        <div class="step-title">Pay Off All Non-Mortgage Debt</div>
        <div class="step-desc">Use the debt snowball method to eliminate all non-mortgage debt. Keep your $1,000 starter fund in place during this step.</div>
      </div>
    </div>
    <div class="step">
      <div class="step-badge">3</div>
      <div class="step-text">
        <div class="step-title">Build Your Fully Funded Emergency Fund</div>
        <div class="step-desc">Once debt-free, save ${totalMonthly > 0 ? fmtRound(fundTarget) : '3–6 months of expenses'} in a high-yield savings account. This is your security blanket.</div>
      </div>
    </div>
  </div>

  <div class="note">
    <strong>Remember:</strong> An emergency fund is for true emergencies only — job loss, medical bills, car repairs, home repairs. Keep it in a separate, easily accessible savings account — not tied to your checking account.
  </div>

  <div class="footer">
    <p>Path Financial Coaching | pathfinancialcoaching.com</p>
    <p>Coach Patrick Frare — Ramsey Trained Master Financial Coach</p>
  </div>
</body>
</html>`

  const w = window.open('', '_blank')
  if (w) { w.document.write(html); w.document.close(); w.focus(); setTimeout(() => w.print(), 400) }
}

export default function EmergencyFundGuide() {
  const [name, setName] = useState('')
  const [monthlyExpenses, setMonthlyExpenses] = useState('')
  const [alreadySaved, setAlreadySaved] = useState('')
  const [months, setMonths] = useState(3)
  const [customMonths, setCustomMonths] = useState('')

  const totalMonthly   = parseNum(monthlyExpenses)
  const savedAmount    = parseNum(alreadySaved)
  const selectedMonths = customMonths ? Math.max(1, parseNum(customMonths)) : months
  const fundTarget     = totalMonthly * selectedMonths
  const stillNeeded    = Math.max(0, fundTarget - savedAmount)
  const isFullyFunded  = totalMonthly > 0 && savedAmount >= fundTarget

  const inputClass = 'w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-soft-blue focus:border-transparent font-mono text-right text-sm'

  return (
    <div>
      {/* Hero */}
      <section className="section-container !pt-20 !pb-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            EMERGENCY FUND GUIDE
          </h1>
          <p className="section-subtitle">
            Your financial safety net — what it is, why you need it, and exactly how much to save.
          </p>
        </div>
      </section>

      {/* Hero Image */}
      <section className="section-container !pt-0 !pb-4">
        <div className="max-w-3xl mx-auto">
          <img
            src="/images/What-is-an-Emergency-Fund (1).webp"
            alt="What is an Emergency Fund"
            className="w-[85%] mx-auto block rounded-2xl shadow-lg object-cover"
          />
        </div>
      </section>

      {/* What is an Emergency Fund */}
      <section className="section-container">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-8">What Is an Emergency Fund?</h2>
          <div className="space-y-6 text-lg text-gray-900 leading-relaxed font-medium">
            <p className="drop-shadow-sm">
              An emergency fund is money you set aside specifically for unexpected, unavoidable expenses — the kind of financial surprises that life throws at you when you least expect them. It is not a savings account for vacations or holiday shopping. It is a dedicated cash reserve that sits quietly in a separate account, ready to protect you when something goes wrong.
            </p>
            <p className="drop-shadow-sm">
              Without an emergency fund, a single unexpected expense forces you into debt — back to credit cards, personal loans, or borrowing from family. With one in place, you handle the problem, pay cash, and move on. It is the foundation of financial stability.
            </p>
          </div>
        </div>
      </section>

      {/* What is it used for */}
      <section className="section-container">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center">What Counts as an Emergency?</h2>
          <p className="section-subtitle">Not every unplanned expense is a true emergency. Knowing the difference is key.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="card border-green-200 !bg-green-50">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600 shrink-0" />
                <h3 className="text-lg font-bold text-green-800">True Emergencies</h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                {[
                  'Job loss or unexpected income reduction',
                  'Medical or dental bills',
                  'Car breakdown or major repair',
                  'Home repair (roof, HVAC, plumbing)',
                  'Emergency travel for a family crisis',
                  'Unexpected veterinary bills',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card border-red-200 !bg-red-50">
              <div className="flex items-center gap-2 mb-4">
                <XCircle className="h-6 w-6 text-red-500 shrink-0" />
                <h3 className="text-lg font-bold text-red-800">Not Emergencies</h3>
              </div>
              <ul className="space-y-2 text-gray-700 text-sm">
                {[
                  'Vacations or travel plans',
                  'Holiday gifts or seasonal shopping',
                  'A sale on something you want',
                  'Planned home upgrades or renovations',
                  'New electronics or appliances (non-urgent)',
                  'Entertainment or dining out',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <XCircle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 card !bg-yellow-50 border border-yellow-200">
            <div className="flex gap-3 items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">
                <strong className="text-gray-900">The test:</strong> Ask yourself — is this unexpected, is it necessary, and is it urgent? If yes to all three, it is an emergency. If any answer is no, find another way to fund it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Two Emergency Funds */}
      <section className="section-container">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center">The Two Emergency Funds</h2>
          <p className="section-subtitle">There are two distinct emergency funds — each built at a different stage of your financial journey.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            <div className="card border-2 border-orange-200 !bg-orange-50">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-orange-600 mb-1">$1,000</div>
                <h3 className="text-xl font-bold text-gray-900">Starter Emergency Fund</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                This is your first priority. Before you tackle debt, you need a small buffer so that a minor emergency does not derail your progress. Save $1,000 as fast as possible — sell things, take extra shifts, cut non-essentials.
              </p>
              <p className="text-sm text-gray-700"><strong className="text-base">Purpose:</strong> A small cushion to keep life&apos;s minor surprises from sending you back into debt while you pay off everything else.</p>
            </div>

            <div className="card border-2 border-green-200 !bg-green-50">
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-green-600 mb-1">3–6 Months</div>
                <h3 className="text-xl font-bold text-gray-900">Fully Funded Emergency Fund</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                After you are completely debt-free (except the house), build this up. Three to six months of living expenses gives you real security — enough to weather a job loss, medical crisis, or major repair without panic.
              </p>
              <p className="text-sm text-gray-700"><strong className="text-base">Where to keep it:</strong> A separate checking account or a high-yield savings account — kept apart from your everyday money and immediately accessible in the event of an emergency.</p>
            </div>
          </div>

          <div className="mt-6 card !bg-yellow-50 border border-yellow-200">
            <div className="flex gap-3 items-start">
              <PiggyBank className="h-5 w-5 text-soft-blue shrink-0 mt-0.5" />
              <p className="text-sm text-gray-700">
                <strong className="text-gray-900">Why not skip straight to 3–6 months?</strong> Because while you&apos;re paying off debt, you need momentum above all else. The $1,000 starter fund is big enough to handle most minor emergencies, but small enough that you can save it quickly and get to work on your debt without delay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator */}
      <section className="section-container">
        <div className="max-w-3xl mx-auto">
          <h2 className="section-title text-center">Emergency Fund Calculator</h2>
          <p className="section-subtitle">Enter your monthly expenses and see exactly how much you need — and how close you already are.</p>

          <div className="space-y-6 mt-8">

            {/* Name + Inputs */}
            <div className="card space-y-4 !bg-blue-50 border border-blue-200">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Your Name <span className="font-normal text-gray-400">(optional)</span></label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Total Monthly Expenses</label>
                <p className="text-xs text-gray-500 mb-2">Your total essential monthly expenses — rent, utilities, groceries, transportation, insurance, etc. Use your completed budget as a reference.</p>
                <input
                  type="text"
                  inputMode="decimal"
                  value={monthlyExpenses}
                  onChange={e => setMonthlyExpenses(e.target.value)}
                  className={inputClass}
                  placeholder="$0.00"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Amount Already Saved <span className="font-normal text-gray-400">(optional)</span></label>
                <p className="text-xs text-gray-500 mb-2">How much do you currently have set aside for emergencies?</p>
                <input
                  type="text"
                  inputMode="decimal"
                  value={alreadySaved}
                  onChange={e => setAlreadySaved(e.target.value)}
                  className={inputClass}
                  placeholder="$0.00"
                />
              </div>
            </div>

            {/* Months Selector */}
            <div className="card !bg-blue-50 border border-blue-200">
              <h3 className="font-bold text-gray-900 mb-1">Months of Coverage</h3>
              <p className="text-sm text-gray-500 mb-4">
                Three months is a solid starting point. Six months is recommended if your income is variable or your household has a single earner.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[3, 4, 5, 6].map(m => (
                  <button
                    key={m}
                    onClick={() => { setMonths(m); setCustomMonths('') }}
                    className={`px-5 py-2 rounded-lg font-bold text-sm border-2 transition-colors ${
                      selectedMonths === m && !customMonths
                        ? 'bg-brand-red text-white border-brand-red'
                        : 'bg-white text-gray-700 border-gray-300 hover:border-brand-red'
                    }`}
                  >
                    {m} months
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-bold text-gray-700 whitespace-nowrap">Custom:</label>
                <input
                  type="text"
                  inputMode="decimal"
                  value={customMonths}
                  onChange={e => setCustomMonths(e.target.value)}
                  className="w-28 px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-soft-blue focus:border-transparent font-mono text-right text-sm"
                  placeholder="e.g. 4.5"
                />
              </div>
            </div>

            {/* Results */}
            <div className="card !bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-5">
                <Target className="h-5 w-5 text-brand-red" />
                <h3 className="font-bold text-gray-900">Your Results</h3>
              </div>

              {totalMonthly === 0 ? (
                <p className="text-center text-sm text-gray-400 py-4">Enter your monthly expenses above to see your personalized target.</p>
              ) : (
                <div className="space-y-3">
                  {/* Target + Saved row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="rounded-xl bg-green-50 border border-green-200 p-4 text-center">
                      <div className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Full Fund Target ({selectedMonths} months)</div>
                      <div className="text-3xl font-bold text-green-600">{fmtRound(fundTarget)}</div>
                      <div className="text-xs text-gray-500 mt-1">{fmt(totalMonthly)}/mo × {selectedMonths} months</div>
                    </div>
                    <div className="rounded-xl bg-blue-50 border border-blue-200 p-4 text-center">
                      <div className="text-xs font-bold text-blue-700 uppercase tracking-wide mb-1">Already Saved</div>
                      <div className="text-3xl font-bold text-blue-600">{savedAmount > 0 ? fmtRound(savedAmount) : '—'}</div>
                    </div>
                  </div>

                  {/* Still Needed */}
                  {isFullyFunded ? (
                    <div className="rounded-xl bg-green-50 border-2 border-green-400 p-4 text-center">
                      <div className="text-xs font-bold text-green-700 uppercase tracking-wide mb-1">Status</div>
                      <div className="text-2xl font-bold text-green-600">Fully Funded!</div>
                      <div className="text-sm text-gray-600 mt-1">Your emergency fund goal is met. Great work!</div>
                    </div>
                  ) : (
                    <div className="rounded-xl bg-red-50 border border-red-200 p-4 text-center">
                      <div className="text-xs font-bold text-brand-red uppercase tracking-wide mb-1">Still Needed</div>
                      <div className="text-3xl font-bold text-brand-red">{fmtRound(stillNeeded)}</div>
                      <div className="text-xs text-gray-500 mt-1">to reach your {selectedMonths}-month goal</div>
                    </div>
                  )}

                  {/* Starter milestone */}
                  <div className="rounded-xl bg-orange-50 border border-orange-200 p-4 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-orange-700 uppercase tracking-wide mb-0.5">Starter Emergency Fund Goal</div>
                      <div className="text-xs text-gray-500">Save this first — before tackling debt</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-orange-600">$1,000</div>
                      {savedAmount >= 1000 && (
                        <div className="text-xs text-green-600 font-semibold">Complete ✓</div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Print Button */}
            <div className="text-center pt-2 pb-8">
              <button
                onClick={() => generatePDF(name, totalMonthly, selectedMonths, savedAmount, fundTarget, stillNeeded)}
                className="btn-primary inline-flex items-center gap-3"
              >
                <Download className="h-5 w-5" />
                Print / Save as PDF
              </button>
              <p className="text-sm text-gray-500 mt-2">Opens a print-ready summary. Select &quot;Save as PDF&quot; in the print dialog.</p>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
