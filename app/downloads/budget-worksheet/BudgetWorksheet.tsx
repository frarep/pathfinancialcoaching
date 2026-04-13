'use client'

import { useState } from 'react'
import { Plus, Trash2, Download, Pencil, Check, X } from 'lucide-react'

// ─── Types ─────────────────────────────────────────────────────────────────

interface LineItem {
  id: number
  name: string
  budgeted: string
  actual: string
}

interface Category {
  id: number
  name: string
  items: LineItem[]
}

// ─── Default EveryDollar-style categories ──────────────────────────────────

const defaultCategories: Category[] = [
  {
    id: 1, name: 'Giving', items: [
      { id: 1, name: 'Tithe / Church', budgeted: '', actual: '' },
      { id: 2, name: 'Charitable Giving', budgeted: '', actual: '' },
    ],
  },
  {
    id: 2, name: 'Saving', items: [
      { id: 1, name: 'Emergency Fund', budgeted: '', actual: '' },
      { id: 2, name: 'Retirement (401k / IRA)', budgeted: '', actual: '' },
      { id: 3, name: 'College Fund', budgeted: '', actual: '' },
    ],
  },
  {
    id: 3, name: 'Housing', items: [
      { id: 1, name: 'Mortgage / Rent', budgeted: '', actual: '' },
      { id: 2, name: 'Electric', budgeted: '', actual: '' },
      { id: 3, name: 'Gas', budgeted: '', actual: '' },
      { id: 4, name: 'Water', budgeted: '', actual: '' },
      { id: 5, name: 'Internet', budgeted: '', actual: '' },
      { id: 6, name: 'Phone', budgeted: '', actual: '' },
      { id: 7, name: 'Trash', budgeted: '', actual: '' },
      { id: 8, name: 'Home Maintenance', budgeted: '', actual: '' },
    ],
  },
  {
    id: 4, name: 'Transportation', items: [
      { id: 1, name: 'Car Payment', budgeted: '', actual: '' },
      { id: 2, name: 'Car Insurance', budgeted: '', actual: '' },
      { id: 3, name: 'Gas / Fuel', budgeted: '', actual: '' },
      { id: 4, name: 'Car Maintenance / Oil Change', budgeted: '', actual: '' },
      { id: 5, name: 'Registration / License', budgeted: '', actual: '' },
    ],
  },
  {
    id: 5, name: 'Food', items: [
      { id: 1, name: 'Groceries', budgeted: '', actual: '' },
      { id: 2, name: 'Restaurants / Dining Out', budgeted: '', actual: '' },
    ],
  },
  {
    id: 6, name: 'Personal', items: [
      { id: 1, name: 'Clothing', budgeted: '', actual: '' },
      { id: 2, name: 'Haircuts / Personal Care', budgeted: '', actual: '' },
      { id: 3, name: 'Subscriptions / Streaming', budgeted: '', actual: '' },
      { id: 4, name: 'Gym / Fitness', budgeted: '', actual: '' },
    ],
  },
  {
    id: 7, name: 'Health', items: [
      { id: 1, name: 'Health Insurance', budgeted: '', actual: '' },
      { id: 2, name: 'Doctor / Dentist', budgeted: '', actual: '' },
      { id: 3, name: 'Prescriptions', budgeted: '', actual: '' },
      { id: 4, name: 'Vision', budgeted: '', actual: '' },
    ],
  },
  {
    id: 8, name: 'Lifestyle', items: [
      { id: 1, name: 'Entertainment', budgeted: '', actual: '' },
      { id: 2, name: 'Hobbies', budgeted: '', actual: '' },
      { id: 3, name: 'Vacation / Travel', budgeted: '', actual: '' },
      { id: 4, name: 'Gifts', budgeted: '', actual: '' },
      { id: 5, name: 'Pet Care', budgeted: '', actual: '' },
    ],
  },
  {
    id: 9, name: 'Debt Payments', items: [
      { id: 1, name: 'Credit Card', budgeted: '', actual: '' },
      { id: 2, name: 'Student Loan', budgeted: '', actual: '' },
      { id: 3, name: 'Personal Loan', budgeted: '', actual: '' },
    ],
  },
]

// ─── PDF Generation ────────────────────────────────────────────────────────

function formatMoney(val: string): string {
  const n = parseFloat(val.replace(/[^0-9.]/g, ''))
  if (isNaN(n)) return '—'
  return `$${n.toFixed(2)}`
}

function generatePDF(
  categories: Category[],
  incomeItems: LineItem[],
  name: string,
  month: string,
) {
  const totalBudgetedIncome = incomeItems.reduce((s, i) => s + (parseFloat(i.budgeted) || 0), 0)
  const totalActualIncome = incomeItems.reduce((s, i) => s + (parseFloat(i.actual) || 0), 0)

  const totalBudgetedExp = categories.reduce((s, c) =>
    s + c.items.reduce((cs, i) => cs + (parseFloat(i.budgeted) || 0), 0), 0)
  const totalActualExp = categories.reduce((s, c) =>
    s + c.items.reduce((cs, i) => cs + (parseFloat(i.actual) || 0), 0), 0)

  const diffBudgeted = totalBudgetedIncome - totalBudgetedExp
  const diffActual = totalActualIncome - totalActualExp

  const catRows = categories.map(cat => {
    const catBudgeted = cat.items.reduce((s, i) => s + (parseFloat(i.budgeted) || 0), 0)
    const catActual = cat.items.reduce((s, i) => s + (parseFloat(i.actual) || 0), 0)
    const itemRows = cat.items.map(item => `
      <tr>
        <td style="padding:5px 8px;color:#374151;">${item.name}</td>
        <td style="padding:5px 8px;text-align:right;">${formatMoney(item.budgeted)}</td>
        <td style="padding:5px 8px;text-align:right;">${formatMoney(item.actual)}</td>
      </tr>`).join('')
    return `
      <tr style="background:#F3F4F6;">
        <td style="padding:6px 8px;font-weight:bold;color:#111827;">${cat.name}</td>
        <td style="padding:6px 8px;text-align:right;font-weight:bold;">$${catBudgeted.toFixed(2)}</td>
        <td style="padding:6px 8px;text-align:right;font-weight:bold;">$${catActual.toFixed(2)}</td>
      </tr>
      ${itemRows}`
  }).join('')

  const incomeRows = incomeItems.map(i => `
    <tr>
      <td style="padding:5px 8px;color:#374151;">${i.name}</td>
      <td style="padding:5px 8px;text-align:right;">${formatMoney(i.budgeted)}</td>
      <td style="padding:5px 8px;text-align:right;">${formatMoney(i.actual)}</td>
    </tr>`).join('')

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Monthly Budget Worksheet — Path Financial Coaching</title>
  <style>
    @page { margin: 0.6in; }
    html, body { font-family: Arial, sans-serif; margin: 0; padding: 0; color: #1F2937; font-size: 13px; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
    .header { text-align: center; border-bottom: 3px solid #DC2626; padding-bottom: 14px; margin-bottom: 20px; }
    .header h1 { color: #DC2626; font-size: 24px; margin: 0 0 3px 0; }
    .header .sub { color: #6B7280; font-size: 12px; }
    .meta { display: flex; justify-content: space-between; margin-bottom: 20px; padding: 8px 12px; background: #F9FAFB; border-radius: 6px; }
    table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
    th { background: #DC2626; color: white; padding: 8px; text-align: left; font-size: 12px; }
    th:not(:first-child) { text-align: right; }
    .total-row td { background: #1F2937; color: white; font-weight: bold; padding: 8px; }
    .total-row td:not(:first-child) { text-align: right; }
    .summary { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 20px; }
    .summary-box { padding: 12px; border-radius: 6px; text-align: center; }
    .summary-box .label { font-size: 11px; color: #6B7280; margin-bottom: 3px; }
    .summary-box .value { font-size: 20px; font-weight: bold; }
    .positive { background: #F0FDF4; color: #16A34A; }
    .negative { background: #FEF2F2; color: #DC2626; }
    .neutral { background: #F9FAFB; color: #374151; }
    .footer { text-align: center; margin-top: 30px; padding-top: 14px; border-top: 1px solid #E5E7EB; color: #9CA3AF; font-size: 11px; }
    @media print { body { padding: 8px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>Monthly Budget Worksheet</h1>
    <div class="sub">Path Financial Coaching — Zero-Based Budgeting</div>
  </div>
  <div class="meta">
    <div><strong>Name:</strong> ${name || '___________________________'}</div>
    <div><strong>Month:</strong> ${month || '_______________'}</div>
  </div>

  <table>
    <thead><tr><th>Income</th><th>Budgeted</th><th>Actual</th></tr></thead>
    <tbody>
      ${incomeRows}
      <tr class="total-row">
        <td>Total Income</td>
        <td>$${totalBudgetedIncome.toFixed(2)}</td>
        <td>$${totalActualIncome.toFixed(2)}</td>
      </tr>
    </tbody>
  </table>

  <table>
    <thead><tr><th>Expenses</th><th>Budgeted</th><th>Actual</th></tr></thead>
    <tbody>
      ${catRows}
      <tr class="total-row">
        <td>Total Expenses</td>
        <td>$${totalBudgetedExp.toFixed(2)}</td>
        <td>$${totalActualExp.toFixed(2)}</td>
      </tr>
    </tbody>
  </table>

  <div class="summary">
    <div class="summary-box ${diffBudgeted >= 0 ? 'positive' : 'negative'}">
      <div class="label">Budgeted Remaining (Goal: $0.00)</div>
      <div class="value">$${diffBudgeted.toFixed(2)}</div>
    </div>
    <div class="summary-box ${diffActual >= 0 ? 'positive' : 'negative'}">
      <div class="label">Actual Remaining</div>
      <div class="value">$${diffActual.toFixed(2)}</div>
    </div>
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

// ─── Helpers ───────────────────────────────────────────────────────────────

let nextId = 100

function newItem(name = ''): LineItem {
  return { id: nextId++, name, budgeted: '', actual: '' }
}

function parseNum(s: string) { return parseFloat(s.replace(/[^0-9.]/g, '')) || 0 }

const inputClass = 'w-full px-2 py-1.5 rounded border border-gray-200 bg-white text-sm focus:ring-1 focus:ring-soft-blue focus:border-transparent transition-all'
const moneyClass = `${inputClass} text-right font-mono`

// ─── Editable Category Name ─────────────────────────────────────────────────

function EditableName({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(value)

  if (editing) {
    return (
      <span className="flex items-center gap-1">
        <input autoFocus value={draft} onChange={e => setDraft(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') { onChange(draft); setEditing(false) } if (e.key === 'Escape') setEditing(false) }}
          className="px-2 py-0.5 rounded border border-brand-red text-sm font-bold text-gray-900 w-36" />
        <button onClick={() => { onChange(draft); setEditing(false) }} className="text-green-600"><Check className="h-4 w-4" /></button>
        <button onClick={() => setEditing(false)} className="text-gray-400"><X className="h-4 w-4" /></button>
      </span>
    )
  }
  return (
    <span className="flex items-center gap-1 font-bold text-gray-900 text-sm">
      {value}
      <button onClick={() => { setDraft(value); setEditing(true) }} className="text-gray-400 hover:text-brand-red ml-1">
        <Pencil className="h-3.5 w-3.5" />
      </button>
    </span>
  )
}

// ─── Main Component ────────────────────────────────────────────────────────

export default function BudgetWorksheet() {
  const [name, setName] = useState('')
  const [month, setMonth] = useState(() => new Date().toLocaleString('en-US', { month: 'long', year: 'numeric' }))
  const [incomeItems, setIncomeItems] = useState<LineItem[]>([
    newItem('Paycheck 1'),
    newItem('Paycheck 2'),
  ])
  const [categories, setCategories] = useState<Category[]>(defaultCategories)

  // ── Income helpers ────────────────────────────────────────────────────────
  const updateIncome = (id: number, field: keyof LineItem, val: string) =>
    setIncomeItems(prev => prev.map(i => i.id === id ? { ...i, [field]: val } : i))
  const addIncomeItem = () => setIncomeItems(prev => [...prev, newItem('Income Source')])
  const removeIncomeItem = (id: number) => setIncomeItems(prev => prev.filter(i => i.id !== id))

  // ── Category helpers ──────────────────────────────────────────────────────
  const updateCatName = (catId: number, name: string) =>
    setCategories(prev => prev.map(c => c.id === catId ? { ...c, name } : c))

  const addCategory = () =>
    setCategories(prev => [...prev, { id: nextId++, name: 'New Category', items: [newItem('Item')] }])

  const removeCategory = (catId: number) =>
    setCategories(prev => prev.filter(c => c.id !== catId))

  const addItem = (catId: number) =>
    setCategories(prev => prev.map(c => c.id === catId ? { ...c, items: [...c.items, newItem()] } : c))

  const removeItem = (catId: number, itemId: number) =>
    setCategories(prev => prev.map(c =>
      c.id === catId ? { ...c, items: c.items.filter(i => i.id !== itemId) } : c))

  const updateItem = (catId: number, itemId: number, field: keyof LineItem, val: string) =>
    setCategories(prev => prev.map(c =>
      c.id === catId
        ? { ...c, items: c.items.map(i => i.id === itemId ? { ...i, [field]: val } : i) }
        : c))

  // ── Totals ─────────────────────────────────────────────────────────────────
  const totalBudgetedIncome = incomeItems.reduce((s, i) => s + parseNum(i.budgeted), 0)
  const totalActualIncome = incomeItems.reduce((s, i) => s + parseNum(i.actual), 0)

  const totalBudgetedExp = categories.reduce((s, c) =>
    s + c.items.reduce((cs, i) => cs + parseNum(i.budgeted), 0), 0)
  const totalActualExp = categories.reduce((s, c) =>
    s + c.items.reduce((cs, i) => cs + parseNum(i.actual), 0), 0)

  const diffBudgeted = totalBudgetedIncome - totalBudgetedExp
  const diffActual = totalActualIncome - totalActualExp

  const fmt = (n: number) => `$${n.toFixed(2)}`
  const diffColor = (n: number) => n >= 0 ? 'text-green-600' : 'text-red-600'
  const diffBg = (n: number) => n >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'

  // ── Table header ───────────────────────────────────────────────────────────
  const ColHeaders = () => (
    <div className="grid grid-cols-[1fr_100px_100px_32px] gap-1 px-3 py-1 text-xs font-bold text-gray-500 uppercase tracking-wide">
      <span>Item</span>
      <span className="text-right">Budgeted</span>
      <span className="text-right">Actual</span>
      <span />
    </div>
  )

  return (
    <div>
      {/* Hero */}
      <section className="section-container py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
            MONTHLY BUDGET WORKSHEET
          </h1>
          <p className="section-subtitle">
            Zero-based budgeting — give every dollar a job. Customize your categories, enter your numbers, and download as a PDF.
          </p>
        </div>
      </section>

      <section className="section-container pt-0">
        <div className="max-w-3xl mx-auto space-y-6">

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
                <label className="block text-sm font-bold text-gray-700 mb-1">Month</label>
                <input type="text" value={month} onChange={e => setMonth(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-soft-blue focus:border-transparent" />
              </div>
            </div>
          </div>

          {/* Income */}
          <div className="card">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-bold text-gray-900">Income</h2>
              <div className="text-sm font-semibold text-gray-500">
                Budgeted: <span className="text-gray-900">{fmt(totalBudgetedIncome)}</span>
                <span className="mx-2">·</span>
                Actual: <span className="text-gray-900">{fmt(totalActualIncome)}</span>
              </div>
            </div>
            <ColHeaders />
            <div className="space-y-1">
              {incomeItems.map(item => (
                <div key={item.id} className="grid grid-cols-[1fr_100px_100px_32px] gap-1 items-center px-1">
                  <input value={item.name} onChange={e => updateIncome(item.id, 'name', e.target.value)}
                    className={inputClass} placeholder="Income source" />
                  <input value={item.budgeted} onChange={e => updateIncome(item.id, 'budgeted', e.target.value)}
                    className={moneyClass} placeholder="$0.00" />
                  <input value={item.actual} onChange={e => updateIncome(item.id, 'actual', e.target.value)}
                    className={moneyClass} placeholder="$0.00" />
                  <button onClick={() => removeIncomeItem(item.id)} className="text-gray-300 hover:text-red-400 flex justify-center">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addIncomeItem}
              className="mt-3 text-sm text-brand-red hover:text-red-700 flex items-center gap-1 font-medium">
              <Plus className="h-4 w-4" /> Add Income Source
            </button>
          </div>

          {/* Expense Categories */}
          {categories.map(cat => {
            const catBudgeted = cat.items.reduce((s, i) => s + parseNum(i.budgeted), 0)
            const catActual = cat.items.reduce((s, i) => s + parseNum(i.actual), 0)
            return (
              <div key={cat.id} className="card">
                <div className="flex items-center justify-between mb-3">
                  <EditableName value={cat.name} onChange={v => updateCatName(cat.id, v)} />
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-500">
                      {fmt(catBudgeted)} / {fmt(catActual)}
                    </span>
                    <button onClick={() => removeCategory(cat.id)}
                      className="text-gray-300 hover:text-red-400" title="Remove category">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <ColHeaders />
                <div className="space-y-1">
                  {cat.items.map(item => (
                    <div key={item.id} className="grid grid-cols-[1fr_100px_100px_32px] gap-1 items-center px-1">
                      <input value={item.name} onChange={e => updateItem(cat.id, item.id, 'name', e.target.value)}
                        className={inputClass} placeholder="Item name" />
                      <input value={item.budgeted} onChange={e => updateItem(cat.id, item.id, 'budgeted', e.target.value)}
                        className={moneyClass} placeholder="$0.00" />
                      <input value={item.actual} onChange={e => updateItem(cat.id, item.id, 'actual', e.target.value)}
                        className={moneyClass} placeholder="$0.00" />
                      <button onClick={() => removeItem(cat.id, item.id)}
                        className="text-gray-300 hover:text-red-400 flex justify-center">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={() => addItem(cat.id)}
                  className="mt-3 text-sm text-brand-red hover:text-red-700 flex items-center gap-1 font-medium">
                  <Plus className="h-4 w-4" /> Add Item
                </button>
              </div>
            )
          })}

          {/* Add Category */}
          <button onClick={addCategory}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-brand-red hover:text-brand-red transition-colors flex items-center justify-center gap-2 font-medium">
            <Plus className="h-5 w-5" /> Add Category
          </button>

          {/* Summary */}
          <div className="card">
            <h2 className="font-bold text-gray-900 mb-4">Summary</h2>
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-gray-600">Total Income</span><span className="font-bold">{fmt(totalBudgetedIncome)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Total Expenses</span><span className="font-bold">{fmt(totalBudgetedExp)}</span></div>
                <div className={`flex justify-between font-bold border rounded-lg px-2 py-1 ${diffBg(diffBudgeted)}`}>
                  <span>Budgeted Remaining</span>
                  <span className={diffColor(diffBudgeted)}>{fmt(diffBudgeted)}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between"><span className="text-gray-600">Actual Income</span><span className="font-bold">{fmt(totalActualIncome)}</span></div>
                <div className="flex justify-between"><span className="text-gray-600">Actual Expenses</span><span className="font-bold">{fmt(totalActualExp)}</span></div>
                <div className={`flex justify-between font-bold border rounded-lg px-2 py-1 ${diffBg(diffActual)}`}>
                  <span>Actual Remaining</span>
                  <span className={diffColor(diffActual)}>{fmt(diffActual)}</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 text-center">Goal: Budgeted Remaining = $0.00 (every dollar has a job)</p>
          </div>

          {/* Download */}
          <div className="text-center pt-2 pb-8">
            <button onClick={() => generatePDF(categories, incomeItems, name, month)}
              className="btn-primary inline-flex items-center gap-3">
              <Download className="h-5 w-5" />
              Download as PDF
            </button>
            <p className="text-sm text-gray-500 mt-2">Fill in your budget above, then click to download. Select "Save as PDF" in the print dialog.</p>
          </div>

        </div>
      </section>
    </div>
  )
}
