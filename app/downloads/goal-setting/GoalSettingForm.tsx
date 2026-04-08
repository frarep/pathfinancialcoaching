'use client'

import { useState } from 'react'
import { Plus, Trash2, Download, Target, ChevronDown, ChevronUp } from 'lucide-react'

interface Goal {
  id: number
  title: string
  specific: string
  measurable: string
  achievable: string
  relevant: string
  targetDate: string
  next7Days: string
  next30Days: string
  next90Days: string
  obstacles: string
  overcome: string
  accountability: string
}

function generatePDF(goals: Goal[], name: string, date: string) {
  const goalsHTML = goals.map((goal, index) => `
    <div class="goal-section">
      <h2>Goal ${index + 1}${goal.title ? ': ' + goal.title : ''}</h2>
      <div class="smart-section">
        <div class="smart-item">
          <div class="smart-label">S — Specific</div>
          <div class="smart-question">What exactly do you want to achieve?</div>
          <div class="answer">${goal.specific || '—'}</div>
        </div>
        <div class="smart-item">
          <div class="smart-label">M — Measurable</div>
          <div class="smart-question">How will you know when you've achieved it?</div>
          <div class="answer">${goal.measurable || '—'}</div>
        </div>
        <div class="smart-item">
          <div class="smart-label">A — Achievable</div>
          <div class="smart-question">What steps will you take to get there?</div>
          <div class="answer">${goal.achievable || '—'}</div>
        </div>
        <div class="smart-item">
          <div class="smart-label">R — Relevant</div>
          <div class="smart-question">Why is this goal important to you?</div>
          <div class="answer">${goal.relevant || '—'}</div>
        </div>
        <div class="smart-item">
          <div class="smart-label">T — Time-Bound</div>
          <div class="smart-question">Target completion date</div>
          <div class="answer">${goal.targetDate || '—'}</div>
        </div>
      </div>
      <div class="subsection">
        <h3>Action Steps</h3>
        <div class="action-item"><div class="action-label">Next 7 Days:</div><div class="answer">${goal.next7Days || '—'}</div></div>
        <div class="action-item"><div class="action-label">Next 30 Days:</div><div class="answer">${goal.next30Days || '—'}</div></div>
        <div class="action-item"><div class="action-label">Next 90 Days:</div><div class="answer">${goal.next90Days || '—'}</div></div>
      </div>
      <div class="subsection">
        <h3>Potential Obstacles</h3>
        <div class="action-item"><div class="action-label">What might hold you back?</div><div class="answer">${goal.obstacles || '—'}</div></div>
        <div class="action-item"><div class="action-label">How will you overcome them?</div><div class="answer">${goal.overcome || '—'}</div></div>
      </div>
      <div class="subsection">
        <h3>Accountability</h3>
        <div class="action-item"><div class="action-label">Accountability Partner:</div><div class="answer">${goal.accountability || '—'}</div></div>
      </div>
    </div>
  `).join('')

  const html = `<!DOCTYPE html>
<html>
<head>
  <title>Financial Goal-Setting Worksheet — Path Financial Coaching</title>
  <style>
    body { font-family: Arial, sans-serif; max-width: 760px; margin: 0 auto; padding: 24px; color: #1F2937; }
    .header { text-align: center; border-bottom: 3px solid #DC2626; padding-bottom: 16px; margin-bottom: 24px; }
    .header h1 { color: #DC2626; font-size: 26px; margin: 0 0 4px 0; }
    .header .subtitle { color: #6B7280; font-size: 13px; }
    .meta { display: flex; justify-content: space-between; margin-bottom: 28px; padding: 10px 14px; background: #F9FAFB; border-radius: 8px; font-size: 14px; }
    .goal-section { margin-bottom: 36px; page-break-inside: avoid; }
    .goal-section h2 { background: #DC2626; color: white; padding: 10px 14px; border-radius: 6px; margin-bottom: 14px; font-size: 17px; }
    .smart-item { margin-bottom: 10px; padding: 10px 12px; border-left: 4px solid #DC2626; background: #FEF2F2; border-radius: 0 6px 6px 0; }
    .smart-label { font-weight: bold; color: #DC2626; font-size: 13px; }
    .smart-question { color: #6B7280; font-size: 11px; margin: 2px 0 5px 0; font-style: italic; }
    .answer { color: #1F2937; font-size: 13px; line-height: 1.5; min-height: 18px; white-space: pre-wrap; }
    .subsection { margin-top: 16px; }
    .subsection h3 { color: #374151; font-size: 15px; border-bottom: 2px solid #E5E7EB; padding-bottom: 4px; margin-bottom: 8px; }
    .action-item { margin-bottom: 8px; padding: 9px 12px; background: #F9FAFB; border-radius: 6px; }
    .action-label { font-weight: bold; font-size: 12px; color: #374151; margin-bottom: 3px; }
    .footer { text-align: center; margin-top: 36px; padding-top: 16px; border-top: 1px solid #E5E7EB; color: #9CA3AF; font-size: 11px; }
    @media print { body { padding: 8px; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>Financial Goal-Setting Worksheet</h1>
    <div class="subtitle">Path Financial Coaching — Building Your Financial Future</div>
  </div>
  <div class="meta">
    <div><strong>Name:</strong> ${name || '___________________________'}</div>
    <div><strong>Date:</strong> ${date || '_______________'}</div>
  </div>
  ${goalsHTML}
  <div class="footer">
    <p>Path Financial Coaching | pathfinancialcoaching.com</p>
    <p>Coach Patrick Frare — Ramsey Trained Master Financial Coach</p>
  </div>
</body>
</html>`

  const printWindow = window.open('', '_blank')
  if (printWindow) {
    printWindow.document.write(html)
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => printWindow.print(), 400)
  }
}

const emptyGoal = (id: number): Goal => ({
  id, title: '', specific: '', measurable: '', achievable: '',
  relevant: '', targetDate: '', next7Days: '', next30Days: '',
  next90Days: '', obstacles: '', overcome: '', accountability: '',
})

export default function GoalSettingForm() {
  const [name, setName] = useState('')
  const [date, setDate] = useState(() => new Date().toLocaleDateString('en-US'))
  const [goals, setGoals] = useState<Goal[]>([emptyGoal(1)])
  const [expanded, setExpanded] = useState<Set<number>>(new Set([1]))

  const addGoal = () => {
    const newId = Math.max(...goals.map(g => g.id)) + 1
    setGoals(prev => [...prev, emptyGoal(newId)])
    setExpanded(prev => new Set([...prev, newId]))
  }

  const removeGoal = (id: number) => {
    if (goals.length === 1) return
    setGoals(prev => prev.filter(g => g.id !== id))
    setExpanded(prev => { const s = new Set(prev); s.delete(id); return s })
  }

  const updateGoal = (id: number, field: keyof Goal, value: string) =>
    setGoals(prev => prev.map(g => g.id === id ? { ...g, [field]: value } : g))

  const toggleGoal = (id: number) =>
    setExpanded(prev => {
      const s = new Set(prev)
      s.has(id) ? s.delete(id) : s.add(id)
      return s
    })

  const inputClass = 'w-full px-3 py-2 rounded-lg border border-gray-300 bg-white focus:ring-2 focus:ring-soft-blue focus:border-transparent transition-all'
  const textareaClass = `${inputClass} resize-vertical`
  const labelClass = 'block text-sm font-bold text-gray-700 mb-1'

  return (
    <div>
      {/* Hero */}
      <section className="section-container py-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-4">
            <Target className="h-14 w-14 text-brand-red" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-gray-900">
            GOAL-SETTING WORKSHEET
          </h1>
          <p className="section-subtitle">
            Define your financial goals using the SMART framework — Specific, Measurable, Achievable, Relevant, and Time-bound.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="section-container pt-0">
        <div className="max-w-3xl mx-auto space-y-6">

          {/* Personal Info */}
          <div className="card">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Your Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)}
                  className={inputClass} placeholder="Your name" />
              </div>
              <div>
                <label className={labelClass}>Date</label>
                <input type="text" value={date} onChange={e => setDate(e.target.value)}
                  className={inputClass} />
              </div>
            </div>
          </div>

          {/* Goal Cards */}
          {goals.map((goal, index) => (
            <div key={goal.id} className="card">
              {/* Goal Header */}
              <div className="flex items-center justify-between mb-0">
                <button
                  onClick={() => toggleGoal(goal.id)}
                  className="flex items-center gap-2 text-lg font-bold text-gray-900 flex-1 text-left"
                >
                  {expanded.has(goal.id)
                    ? <ChevronUp className="h-5 w-5 shrink-0" />
                    : <ChevronDown className="h-5 w-5 shrink-0" />}
                  Goal {index + 1}{goal.title ? `: ${goal.title}` : ''}
                </button>
                {goals.length > 1 && (
                  <button onClick={() => removeGoal(goal.id)}
                    className="text-red-400 hover:text-red-600 p-1 ml-2 shrink-0" title="Remove goal">
                    <Trash2 className="h-4 w-4" />
                  </button>
                )}
              </div>

              {expanded.has(goal.id) && (
                <div className="mt-5 space-y-5">
                  {/* Title */}
                  <div>
                    <label className={labelClass}>Goal Title</label>
                    <input type="text" value={goal.title}
                      onChange={e => updateGoal(goal.id, 'title', e.target.value)}
                      className={inputClass}
                      placeholder="e.g., Pay off credit card debt, Build emergency fund" />
                  </div>

                  {/* SMART */}
                  <div className="border-l-4 border-brand-red pl-4 space-y-4">
                    <h3 className="font-bold text-brand-red text-sm uppercase tracking-wide">SMART Framework</h3>

                    {[
                      { field: 'specific' as keyof Goal, letter: 'S', label: 'Specific', hint: 'What exactly do you want to achieve? Include amounts, accounts, and details.' },
                      { field: 'measurable' as keyof Goal, letter: 'M', label: 'Measurable', hint: 'How will you track progress? What numbers or milestones will mark success?' },
                      { field: 'achievable' as keyof Goal, letter: 'A', label: 'Achievable', hint: 'What realistic steps will you take to get there?' },
                      { field: 'relevant' as keyof Goal, letter: 'R', label: 'Relevant', hint: "Why is this goal important to you? What's your deeper \"why\"?" },
                    ].map(({ field, letter, label, hint }) => (
                      <div key={field}>
                        <label className="block text-sm font-bold text-gray-700 mb-1">
                          <span className="text-brand-red">{letter}</span> — {label}
                          <span className="font-normal text-gray-500 ml-2 text-xs">{hint}</span>
                        </label>
                        <textarea value={goal[field] as string}
                          onChange={e => updateGoal(goal.id, field, e.target.value)}
                          rows={3} className={textareaClass}
                          placeholder={hint} />
                      </div>
                    ))}

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">
                        <span className="text-brand-red">T</span> — Time-Bound
                        <span className="font-normal text-gray-500 ml-2 text-xs">Target completion date</span>
                      </label>
                      <input type="date" value={goal.targetDate}
                        onChange={e => updateGoal(goal.id, 'targetDate', e.target.value)}
                        className={inputClass} />
                    </div>
                  </div>

                  {/* Action Steps */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Action Steps</h3>
                    <div className="space-y-3">
                      {([
                        { field: 'next7Days', label: 'Next 7 Days', placeholder: 'What will you do this week?' },
                        { field: 'next30Days', label: 'Next 30 Days', placeholder: 'What will you accomplish this month?' },
                        { field: 'next90Days', label: 'Next 90 Days', placeholder: 'Where will you be in 3 months?' },
                      ] as { field: keyof Goal; label: string; placeholder: string }[]).map(({ field, label, placeholder }) => (
                        <div key={field}>
                          <label className={labelClass}>{label}</label>
                          <textarea value={goal[field] as string}
                            onChange={e => updateGoal(goal.id, field, e.target.value)}
                            rows={2} className={textareaClass} placeholder={placeholder} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Obstacles */}
                  <div>
                    <h3 className="font-bold text-gray-800 mb-3">Potential Obstacles</h3>
                    <div className="space-y-3">
                      <div>
                        <label className={labelClass}>What might hold you back?</label>
                        <textarea value={goal.obstacles}
                          onChange={e => updateGoal(goal.id, 'obstacles', e.target.value)}
                          rows={2} className={textareaClass}
                          placeholder="Identify potential challenges..." />
                      </div>
                      <div>
                        <label className={labelClass}>How will you overcome them?</label>
                        <textarea value={goal.overcome}
                          onChange={e => updateGoal(goal.id, 'overcome', e.target.value)}
                          rows={2} className={textareaClass}
                          placeholder="Plan your response to setbacks..." />
                      </div>
                    </div>
                  </div>

                  {/* Accountability */}
                  <div>
                    <label className={labelClass}>Accountability Partner</label>
                    <input type="text" value={goal.accountability}
                      onChange={e => updateGoal(goal.id, 'accountability', e.target.value)}
                      className={inputClass}
                      placeholder="Who will hold you accountable? (e.g., Coach Patrick, spouse, friend)" />
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Add Goal */}
          <button onClick={addGoal}
            className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-brand-red hover:text-brand-red transition-colors flex items-center justify-center gap-2 font-medium">
            <Plus className="h-5 w-5" />
            Add Another Goal
          </button>

          {/* Download */}
          <div className="text-center pt-2 pb-8">
            <button onClick={() => generatePDF(goals, name, date)} className="btn-primary inline-flex items-center gap-3">
              <Download className="h-5 w-5" />
              Download as PDF
            </button>
            <p className="text-sm text-gray-500 mt-2">Fill in your goals above, then click to download. Select "Save as PDF" in the print dialog.</p>
          </div>

        </div>
      </section>
    </div>
  )
}
