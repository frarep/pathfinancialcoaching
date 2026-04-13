'use client'

import { useState, useMemo } from 'react'
import { Plus, Trash2, Download, ArrowDown } from 'lucide-react'

interface Debt {
  id: number
  name: string
  balance: string
  minPayment: string
  interestRate: string
}

let nextId = 1

function parseNum(s: string) { return parseFloat(s.replace(/[^0-9.]/g, '')) || 0 }
function fmt(n: number) { return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` }
function fmtMonths(m: number) {
  if (m < 1) return '< 1 month'
  const y = Math.floor(m / 12)
  const mo = m % 12
  const yearStr = y === 1 ? '1 year' : `${y} years`
  const moStr = mo === 1 ? '1 month' : `${mo} months`
  if (y === 0) return moStr
  if (mo === 0) return yearStr
  return `${yearStr} ${moStr}`
}

function calcPayoffMonths(balance: number, rate: number, payment: number): number {
  if (balance <= 0) return 0
  if (payment <= 0) return 999
  const monthlyRate = rate / 100 / 12
  if (monthlyRate === 0) return Math.ceil(balance / payment)
  if (payment <= balance * monthlyRate) return 999
  return Math.ceil(Math.log(payment / (payment - balance * monthlyRate)) / Math.log(1 + monthlyRate))
}

function calcTotalInterest(balance: number, rate: number, payment: number): number {
  if (balance <= 0 || payment <= 0) return 0
  const monthlyRate = rate / 100 / 12
  let remaining = balance
  let totalInterest = 0
  let months = 0
  while (remaining > 0.01 && months < 1200) {
    const interest = remaining * monthlyRate
    totalInterest += interest
    remaining = remaining + interest - Math.min(payment, remaining + interest)
    months++
  }
  return totalInterest
}

function generatePDF(debts: Debt[], name: string, extraPayment: string) {
  const sorted = [...debts].sort((a, b) => parseNum(a.balance) - parseNum(b.balance))
  const extra = parseNum(extraPayment)
  const totalBalance = debts.reduce((s, d) => s + parseNum(d.balance), 0)
  const totalMin = debts.reduce((s, d) => s + parseNum(d.minPayment), 0)

  let runningExtra = extra
  let debtFreeMonths = 0
  const rows = sorted.map((debt, i) => {
    const balance = parseNum(debt.balance)
    const min = parseNum(debt.minPayment)
    const rate = parseNum(debt.interestRate)
    const payment = min + runningExtra
    const months = calcPayoffMonths(balance, rate, payment)
    const interest = calcTotalInterest(balance, rate, payment)
    debtFreeMonths = months
    const result = `
      <tr style="${i % 2 === 0 ? 'background:#F9FAFB;' : ''}">
        <td style="padding:8px;"><strong style="color:#DC2626;">#${i + 1}</strong> ${debt.name}</td>
        <td style="padding:8px;text-align:right;">${fmt(balance)}</td>
        <td style="padding:8px;text-align:right;">${fmt(min)}</td>
        <td style="padding:8px;text-align:right;">${debt.interestRate ? debt.interestRate + '%' : '—'}</td>
        <td style="padding:8px;text-align:right;">${fmt(payment)}</td>
        <td style="padding:8px;text-align:right;">${months >= 999 ? '∞' : fmtMonths(months)}</td>
        <td style="padding:8px;text-align:right;">${fmt(interest)}</td>
      </tr>`
    runningExtra += min
    return result
  }).join('')
  const debtFreeHTML = debtFreeMonths > 0 && debtFreeMonths < 999
    ? `<div style="text-align:center;margin-top:20px;padding:14px;background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;">
        <div style="font-size:11px;color:#6B7280;text-transform:uppercase;letter-spacing:0.05em;font-weight:600;margin-bottom:4px;">Debt-Free In</div>
        <div style="font-size:22px;font-weight:bold;color:#DC2626;">${fmtMonths(debtFreeMonths)}</div>
      </div>`
    : ''

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Debt Snowball Calculator — Path Financial Coaching</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; color: #1F2937; font-size: 12px; }
    .header { text-align: center; border-bottom: 3px solid #DC2626; padding-bottom: 14px; margin-bottom: 20px; }
    .header h1 { color: #DC2626; font-size: 24px; margin: 0 0 3px 0; }
    .header .sub { color: #6B7280; font-size: 12px; }
    .meta { display: flex; justify-content: space-between; margin-bottom: 16px; padding: 8px 12px; background: #F9FAFB; border-radius: 6px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    th { background: #DC2626; color: white; padding: 8px; text-align: left; font-size: 11px; }
    th:not(:first-child) { text-align: right; }
    .explainer { background: #FEF2F2; border-left: 4px solid #DC2626; padding: 12px; border-radius: 0 6px 6px 0; margin-bottom: 20px; font-size: 12px; }
    .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 20px; }
    .summary-box { padding: 10px; background: #F9FAFB; border-radius: 6px; text-align: center; }
    .summary-box .label { font-size: 10px; color: #6B7280; }
    .summary-box .value { font-size: 16px; font-weight: bold; color: #DC2626; }
    .footer { text-align: center; margin-top: 30px; padding-top: 14px; border-top: 1px solid #E5E7EB; color: #9CA3AF; font-size: 11px; }
    @media print { body { padding: 8px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>Debt Snowball Calculator</h1>
    <div class="sub">Path Financial Coaching — Your Path to Debt Freedom</div>
  </div>
  <div class="meta">
    <div><strong>Name:</strong> ${name || '___________________________'}</div>
    <div><strong>Extra Monthly Payment:</strong> ${extra > 0 ? fmt(extra) : '$0.00'}</div>
  </div>
  <div class="summary">
    <div class="summary-box"><div class="label">Total Debt</div><div class="value">${fmt(totalBalance)}</div></div>
    <div class="summary-box"><div class="label">Total Minimum Payments</div><div class="value">${fmt(totalMin)}</div></div>
    <div class="summary-box"><div class="label">Number of Debts</div><div class="value">${debts.length}</div></div>
  </div>
  <div class="explainer">
    <strong>Debt Snowball Method:</strong> Pay minimums on all debts. Put every extra dollar toward the smallest balance first. When it's paid off, roll that payment to the next debt — building momentum like a snowball.
  </div>
  <table>
    <thead>
      <tr>
        <th>Debt (Payoff Order)</th>
        <th>Balance</th>
        <th>Minimum Payment</th>
        <th>Interest Rate</th>
        <th>Total Payment</th>
        <th>Payoff Time</th>
        <th>Estimated Interest</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>
  ${debtFreeHTML}
  <div class="footer">
    <p>Path Financial Coaching | pathfinancialcoaching.com</p>
    <p>Coach Patrick Frare — Ramsey Trained Master Financial Coach</p>
  </div>
</body>
</html>`

  const w = window.open('', '_blank')
  if (w) { w.document.write(html); w.document.close(); w.focus(); setTimeout(() => w.print(), 400) }
}

export default function DebtCalculator() {
  const [name, setName] = useState('')
  const [extraPayment, setExtraPayment] = useState('')
  const [debts, setDebts] = useState<Debt[]>([
    { id: nextId++, name: 'Credit Card', balance: '', minPayment: '', interestRate: '' },
    { id: nextId++, name: 'Car Loan', balance: '', minPayment: '', interestRate: '' },
    { id: nextId++, name: 'Student Loan', balance: '', minPayment: '', interestRate: '' },
  ])

  const addDebt = () =>
    setDebts(prev => [...prev, { id: nextId++, name: 'New Debt', balance: '', minPayment: '', interestRate: '' }])

  const removeDebt = (id: number) =>
    setDebts(prev => prev.filter(d => d.id !== id))

  const updateDebt = (id: number, field: keyof Debt, val: string) =>
    setDebts(prev => prev.map(d => d.id === id ? { ...d, [field]: val } : d))

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>, row: number, col: number) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const next = document.querySelector<HTMLInputElement>(`[data-row="${row + 1}"][data-col="${col}"]`)
      next?.focus()
    }
  }

  // Snowball: sort by balance ascending, roll payments forward
  const snowball = useMemo(() => {
    const sorted = [...debts]
      .filter(d => parseNum(d.balance) > 0)
      .sort((a, b) => parseNum(a.balance) - parseNum(b.balance))

    const extra = parseNum(extraPayment)
    let runningExtra = extra

    return sorted.map((debt, i) => {
      const balance = parseNum(debt.balance)
      const min = parseNum(debt.minPayment)
      const rate = parseNum(debt.interestRate)
      const payment = min + runningExtra
      const months = calcPayoffMonths(balance, rate, payment)
      const interest = calcTotalInterest(balance, rate, payment)
      runningExtra += min
      return { debt, order: i + 1, balance, min, rate, payment, months, interest }
    })
  }, [debts, extraPayment])

  const totalBalance = debts.reduce((s, d) => s + parseNum(d.balance), 0)
  const totalMin = debts.reduce((s, d) => s + parseNum(d.minPayment), 0)
  const totalInterest = snowball.reduce((s, r) => s + r.interest, 0)

  const inputClass = 'w-full px-2 py-1.5 rounded border border-gray-200 bg-white text-sm focus:ring-1 focus:ring-soft-blue focus:border-transparent transition-all'
  const moneyClass = `${inputClass} text-right font-mono`

  return (
    <div>
      {/* Hero */}
      <section className="section-container py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
            DEBT SNOWBALL CALCULATOR
          </h1>
          <p className="section-subtitle">
            List your debts, enter an extra monthly payment, and see your debt-free date using the debt snowball method.
          </p>
        </div>
      </section>

      <section className="section-container pt-0">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Info Banner */}
          <div className="card bg-red-50 border border-red-100">
            <div className="flex gap-3">
              <ArrowDown className="h-5 w-5 text-brand-red shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <strong className="text-gray-900">How it works:</strong> Pay minimums on all debts. Put every extra dollar toward the <strong>smallest balance first</strong>. When it's paid off, roll that entire payment to the next debt — building momentum like a snowball rolling downhill.
              </div>
            </div>
          </div>

          {/* Personal Info */}
          <div className="card">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-soft-blue focus:border-transparent"
                  placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Extra Monthly Payment</label>
                <input type="text" value={extraPayment} onChange={e => setExtraPayment(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-soft-blue focus:border-transparent font-mono text-right"
                  placeholder="$0.00" />
              </div>
            </div>
          </div>

          {/* Debt Entries */}
          <div className="card">
            <h2 className="font-bold text-gray-900 mb-3">Your Debts</h2>
            <div className="grid grid-cols-[1fr_90px_90px_80px_32px] gap-1 px-1 py-1 text-xs font-bold text-gray-500 uppercase tracking-wide text-center">
              <span className="text-left">Debt Name</span>
              <span>Balance</span>
              <span>Minimum Payment</span>
              <span>Rate %</span>
              <span />
            </div>
            <div className="space-y-1.5">
              {debts.map((debt, index) => (
                <div key={debt.id} className="grid grid-cols-[1fr_90px_90px_80px_32px] gap-1 items-center px-1">
                  <input value={debt.name} onChange={e => updateDebt(debt.id, 'name', e.target.value)}
                    data-row={index} data-col={0} onKeyDown={e => handleEnter(e, index, 0)}
                    className={inputClass} placeholder="Debt name" />
                  <input value={debt.balance} onChange={e => updateDebt(debt.id, 'balance', e.target.value)}
                    data-row={index} data-col={1} onKeyDown={e => handleEnter(e, index, 1)}
                    className={moneyClass} placeholder="$0" />
                  <input value={debt.minPayment} onChange={e => updateDebt(debt.id, 'minPayment', e.target.value)}
                    data-row={index} data-col={2} onKeyDown={e => handleEnter(e, index, 2)}
                    className={moneyClass} placeholder="$0" />
                  <input value={debt.interestRate} onChange={e => updateDebt(debt.id, 'interestRate', e.target.value)}
                    data-row={index} data-col={3} onKeyDown={e => handleEnter(e, index, 3)}
                    className={moneyClass} placeholder="0%" />
                  <button onClick={() => removeDebt(debt.id)} tabIndex={-1} className="text-gray-300 hover:text-red-400 flex justify-center">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addDebt}
              className="mt-3 text-sm text-brand-red hover:text-red-700 flex items-center gap-1 font-medium">
              <Plus className="h-4 w-4" /> Add Debt
            </button>

            {/* Totals Row */}
            <div className="grid grid-cols-[1fr_90px_90px_80px_32px] gap-1 items-end px-1 mt-3 pt-3 border-t border-gray-200">
              <span />
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-0.5">Total Debt Balance</div>
                <div className="text-sm font-bold font-mono text-gray-900">{totalBalance > 0 ? fmt(totalBalance) : '—'}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-0.5">Total Monthly Payment</div>
                <div className="text-sm font-bold font-mono text-gray-900">{totalMin > 0 ? fmt(totalMin) : '—'}</div>
              </div>
              <span />
              <span />
            </div>
          </div>

          {/* Snowball Results */}
          {snowball.length > 0 && (
            <div className="card">
              <h2 className="font-bold text-gray-900 mb-4">Your Debt Snowball Plan</h2>
              <div className="space-y-3">
                {snowball.map(({ debt, order, balance, min, payment, months, interest }) => (
                  <div key={debt.id} className="rounded-lg border border-gray-100 overflow-hidden">
                    <div className="flex items-center gap-3 px-4 py-3 bg-gray-50">
                      <span className="flex items-center justify-center w-7 h-7 rounded-full bg-brand-red text-white text-xs font-bold shrink-0">
                        {order}
                      </span>
                      <span className="font-bold text-gray-900">{debt.name}</span>
                      <span className="ml-auto text-sm font-bold text-gray-700">{fmt(balance)}</span>
                    </div>
                    <div className="grid grid-cols-3 divide-x divide-gray-100 text-center text-sm px-2 py-2">
                      <div className="px-2">
                        <div className="text-xs text-gray-500 mb-0.5">Monthly Payment</div>
                        <div className="font-bold text-gray-900">{fmt(payment)}</div>
                        {payment > min && <div className="text-xs text-green-600">+{fmt(payment - min)} extra</div>}
                      </div>
                      <div className="px-2">
                        <div className="text-xs text-gray-500 mb-0.5">Payoff Time</div>
                        <div className="font-bold text-brand-red">{months >= 999 ? '∞' : fmtMonths(months)}</div>
                      </div>
                      <div className="px-2">
                        <div className="text-xs text-gray-500 mb-0.5">Estimated Interest</div>
                        <div className="font-bold text-gray-700">{fmt(interest)}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total Summary */}
              <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-3 text-center text-sm">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Total Debt</div>
                  <div className="font-bold text-gray-900">{fmt(totalBalance)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Minimum Payments</div>
                  <div className="font-bold text-gray-900">{fmt(totalMin)}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Total Interest</div>
                  <div className="font-bold text-red-600">{fmt(totalInterest)}</div>
                </div>
              </div>

              {/* Debt-Free Timeline */}
              {snowball[snowball.length - 1]?.months < 999 && (
                <div className="mt-4 rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-center">
                  <div className="text-xs text-gray-500 mb-1 uppercase tracking-wide font-semibold">Debt-Free In</div>
                  <div className="text-2xl font-bold text-brand-red">{fmtMonths(snowball[snowball.length - 1].months)}</div>
                </div>
              )}
            </div>
          )}

          {/* Download */}
          <div className="text-center pt-2 pb-8">
            <button onClick={() => generatePDF(debts, name, extraPayment)}
              className="btn-primary inline-flex items-center gap-3">
              <Download className="h-5 w-5" />
              Download as PDF
            </button>
            <p className="text-sm text-gray-500 mt-2">Enter your debts above, then click to download. Select "Save as PDF" in the print dialog.</p>
          </div>

        </div>
      </section>
    </div>
  )
}
