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
      hoverText: "During this meeting we will dive into what your current financial situation is, what dreams and goals you have, and find out the why behind those dreams. You will leave this meeting with a better understanding of who I am, how I coach, and a recommendation on if and how financial coaching would be beneficial in your situation.",
      backgroundImage: "/images/Lone tree simon-wilkes-S297j2CsdlM-unsplash.jpg"
    },
    {
      icon: <Calculator className="h-16 w-16" />,
      title: "Budget",
      hoverText: "This is our first month together where we build the solid foundation of your plan. We will have 2-3 in depth sessions really diving into your financial situation; income, expenses, debt, savings, everything. With this we build your budget how YOU choose.",
      backgroundImage: "/images/Sunset Clouds zenad-nabil-U4tC-9eS03M-unsplash.jpg"
    },
    {
      icon: <GraduationCap className="h-16 w-16" />,
      title: "Education",
      hoverText: "These sessions are generally for budget adjustments as you get used to working the plan, learning about money habits, paying off debt, and achieving your goals.",
      backgroundImage: "/images/Ocean boardwalk sunset ishan-seefromthesky-IvCtHt8raJo-unsplash.jpg"
    },
    {
      icon: <RefreshCw className="h-16 w-16" />,
      title: "Maintenance",
      hoverText: "These sessions can vary quite a bit in content, duration, and frequency. Some clients continue with monthly sessions for continued education, accountability, and encouragement. Others will schedule sessions every couple months for budget reviews and ensuring they are following the plan and achieving their goals.",
      backgroundImage: "/images/Galaxy Cluster adrian-mag-OcCmoDlcHjs-unsplash.jpg"
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
      <section className="section-container" style={{ maxWidth: '100rem' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mx-auto">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-80 flex flex-col items-center justify-center text-center cursor-pointer overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-soft-blue/30">
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${step.backgroundImage}')` }}
                />
                {/* Semi-transparent overlay for readability */}
                <div className="absolute inset-0 bg-white/70 backdrop-blur-[2px]" />

                {/* Default State */}
                <div
                  className={`absolute inset-0 flex flex-col items-center justify-center p-6 transition-opacity duration-300 ${
                    hoveredCard === index ? 'opacity-0' : 'opacity-100'
                  }`}
                >
                  <div className="mb-4 drop-shadow-md" style={{ color: 'var(--color-icon-blue)' }}>{step.icon}</div>
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase drop-shadow-sm">{step.title}</h3>
                </div>

                {/* Hover State */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    hoveredCard === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-soft-blue to-soft-yellow"></div>
                  <div className="absolute inset-0 bg-white/20"></div>
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <p className="text-gray-900 font-semibold leading-relaxed text-base drop-shadow-sm">{step.hoverText}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="section-container">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 drop-shadow-sm">
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
            <div key={index} className="relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/images/Balloons luca-upper-Z-4kOr93RCI-unsplash.jpg')" }}
              />
              {/* Semi-transparent overlay for readability */}
              <div className="absolute inset-0 bg-white/85 backdrop-blur-[1px]" />

              {/* Content */}
              <div className="relative p-6">
                <div className="mb-4">
                  <svg className="h-8 w-8 text-yellow-500 drop-shadow-md" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>
                <p className="text-gray-800 mb-4 italic leading-relaxed font-medium">
                  {testimonial.quote}
                </p>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="section-container">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 drop-shadow-sm">
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
