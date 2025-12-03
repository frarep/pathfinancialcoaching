'use client'

import Link from 'next/link'
import { MessageCircle, Calculator, GraduationCap, RefreshCw } from 'lucide-react'
import { useState } from 'react'

export default function TheProcess() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const processSteps = [
    {
      icon: <MessageCircle className="h-16 w-16" />,
      title: "Consultation",
      hoverText: "During this meeting we will dive into what your current financial situation is, what dreams and goals you have, and find out the why behind those dreams. You will leave this meeting with a better understanding of who I am, how I coach, and a recommendation on if and how financial coaching would be beneficial in your situation."
    },
    {
      icon: <Calculator className="h-16 w-16" />,
      title: "Budget",
      hoverText: "This is our first month together where we build the solid foundation of your plan. We will have 2-3 in depth sessions really diving into your financial situation; income, expenses, debt, savings, everything. With this we build your budget how YOU choose."
    },
    {
      icon: <GraduationCap className="h-16 w-16" />,
      title: "Education",
      hoverText: "These sessions are generally for budget adjustments as you get used to working the plan, learning about money habits, paying off debt, and achieving your goals."
    },
    {
      icon: <RefreshCw className="h-16 w-16" />,
      title: "Maintenance",
      hoverText: "These sessions can vary quite a bit in content, duration, and frequency. Some clients continue with monthly sessions for continued education, accountability, and encouragement. Others will schedule sessions every couple months for budget reviews and ensuring they are following the plan and achieving their goals."
    }
  ]

  const testimonials = [
    {
      quote: "S. & C. are consumer debt free, building their emergency fund, and on their way to achieving their dreams!",
      name: ""
    },
    {
      quote: "Sonja is completely debt free including her mortgage! She is now saving for retirement and will be able to retire comfortably when she chooses to.",
      name: ""
    },
    {
      quote: "M. & J. have paid off almost $10,000 of consumer debt in their first 3 months!",
      name: ""
    }
  ]

  return (
    <div>
      {/* Main Title Section */}
      <section className="section-container py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 text-gray-900">
          HOW DOES COACHING WORK?
        </h1>
      </section>

      {/* Four Dynamic Action Boxes */}
      <section className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="card h-80 flex flex-col items-center justify-center text-center cursor-pointer relative overflow-hidden">
                {/* Default State */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-300 ${
                    hoveredCard === index ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <div className="text-soft-blue mb-4">{step.icon}</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase">{step.title}</h3>
                </div>

                {/* Hover State */}
                <div
                  className={`absolute inset-0 flex items-center justify-center p-6 bg-gradient-to-br from-soft-blue to-soft-yellow transition-opacity duration-300 ${
                    hoveredCard === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <p className="text-gray-800 leading-relaxed text-sm overflow-y-auto">{step.hoverText}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="section-container bg-white/60 backdrop-blur-sm">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
            Are you ready to take control of your future? Click the button below.
          </h2>
          <Link href="/free-consultation">
            <button className="btn-primary text-xl">
              GET STARTED
            </button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section-container">
        <h2 className="section-title">CLIENT SUCCESS STORIES</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="card">
              <div className="mb-4">
                <svg className="h-8 w-8 text-soft-yellow" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="text-gray-700 mb-4 italic leading-relaxed">
                {testimonial.quote}
              </p>
              <p className="font-semibold text-gray-900">{testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="section-container bg-gradient-to-r from-soft-blue-light to-soft-yellow-light">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
            Not sure that Financial Coaching is right for you? Click the button below and get an honest answer.
          </h2>
          <Link href="/free-consultation">
            <button className="btn-primary text-xl">
              FIND OUT
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
