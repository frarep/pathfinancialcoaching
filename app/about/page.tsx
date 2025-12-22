'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function About() {
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(null)

  const questions = [
    {
      question: "Why Do I Need A Coach?",
      answer: "A Financial Coach walks with you in discovering the \"WHY\" behind your goals, make a balanced budget, and provides accountability in sticking to the plan."
    },
    {
      question: "How Do We Make The Plan?",
      answer: "Together, we talk about your dreams, make short term goals working towards those dreams, build a budget so that you have a solid foundation to work from, then break through every obstacle in your way."
    },
    {
      question: "What If I Dont Like The Plan?",
      answer: "That's the great part about working with me, you get to choose the plan. I will work with you in making the plan with recommendations and different ideas but YOU get to choose what the plan is."
    },
    {
      question: "What Does A Financial Coach Cost?",
      answer: "The real question I want you to ask yourself is; \"What is it going to cost you to NOT get a financial coach?\". Most people that are doing great with money dont reach out for information on financial coaching. That means that you have just about reached the breaking point on something. Is your debt out of control and every payment seems to do nothing to reduce it? Are you behind on bills and getting calls day and night from collectors? Are you so stressed out that your not sleeping well and it is affecting your performance at work? These are all costs of not being in control of your finances. I CAN HELP YOU! Dont spend another sleepless night, give me a call. Lets make a plan to get you on the right path towards financial security."
    },
    {
      question: "Who Do I Coach?",
      answer: "I coach individuals and couples that come from all walks of life and are in different spots in their journey. In college and want to know how to plan for post graduation? I can help. Getting close to retirement and not sure if you are going to have enough? I can help. Looking at debt piling up, more month to go when the money runs out? I can absolutely help."
    },
    {
      question: "Can I Do This On My Own?",
      answer: "Absolutely! Just like following a diet, making a workout plan, and New Years Resolutions, you can do this on your own. But we all know how often our plans get waylaid when we DIY. Working with me provides that support and accountability that DIY lacks."
    },
    {
      question: "Do I Have To Stop Spending Money?",
      answer: "Not necessarily. What you spend and how much depends on what goals you choose to work towards, how fast you want to achieve them. I wont ever tell you that you can't spend money, it's YOUR money!"
    },
    {
      question: "What If I Can't Afford Coaching?",
      answer: "A lot of people feel like they are already short on money so how can they afford one more thing? Working with me, my clients often are able to free up $800-$1500 in the first month of making the budget. With my coaching clients are usually able to pay off an average of $10,000-$15,000 or more of debt in the first 6 months."
    }
  ]

  return (
    <div>
      {/* Main Header */}
      <section className="section-container py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 text-gray-900">
          MEET YOUR COACH
        </h1>
        <p className="section-subtitle">
          WELCOME TO MY JOURNEY
        </p>
      </section>

      {/* About Section */}
      <section className="section-container">
        <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          {/* Photo */}
          <div className="order-1 md:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5]">
              <picture>
                <source srcSet="/images/patrick-amanda-optimized.webp" type="image/webp" />
                <img
                  src="/images/patrick-amanda-optimized.jpg"
                  alt="Patrick and Amanda Frare"
                  width="1200"
                  height="900"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </picture>
            </div>
          </div>

          {/* Biography */}
          <div className="order-2 md:order-2">
            <div className="space-y-6 text-lg text-gray-900 leading-relaxed font-medium">
              <p>
                Hi, I'm Patrick. I am a Dave Ramsey preferred coach who has also walked through debt, poor money habits, anxiety about savings and retirement, and multiple major car issues at the same time. As a father, husband, firefighter, veteran, friend, coach, I am here to walk with you through issues like these, to make a plan and achieve your dreams. I have been serving others for many years, assisting them in making a plan and executing it to get out of debt, save for retirement, save for kids college, save to buy a house and to pay off the mortgage early, as well as helping to bring peace to stress-filled lives. If you are looking for someone who can help you take your dreams from wishful thinking to reality, then schedule a call with me and lets go!!!
              </p>
              <p>
                Currently I live in Oregon, where there is always sunshine, albeit most often it is the liquid sunshine. Besides being a Financial Coach, I serve the community as an Engineer/Paramedic and I was a Army Flight Paramedic for 8 years. I am blessed to be married to my wife of 15 years and we have 3 amazing kiddos that keep us on our toes. When not at the fire station or coaching, I like to garden, go fishing at local lakes, and do projects with my kids. For example, for Halloween this year we made their costumes; a dog rescuer, a sheriff deputy, and a costume of the MarioKart character "Dry Bones" complete with a spray foam head.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Questions Section */}
      <section className="section-container">
        <h2 className="section-title">COMMON QUESTIONS</h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {questions.map((item, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-xl shadow-lg bg-gradient-to-r from-soft-blue-light via-white to-soft-yellow-light"
            >
              <button
                onClick={() => setExpandedQuestion(expandedQuestion === index ? null : index)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/30 transition-colors"
                aria-expanded={expandedQuestion === index}
                aria-controls={`answer-${index}`}
              >
                <h3 id={`question-${index}`} className="text-lg md:text-xl font-bold text-gray-900 pr-4">{item.question}</h3>
                <ChevronDown
                  className={`flex-shrink-0 h-6 w-6 text-gray-600 transition-transform duration-300 ${
                    expandedQuestion === index ? 'rotate-180' : ''
                  }`}
                  aria-hidden="true"
                />
              </button>
              <div
                id={`answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  expandedQuestion === index ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}
                role="region"
                aria-labelledby={`question-${index}`}
              >
                <div className="px-6 pb-6 pt-2">
                  <p className="text-gray-700 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="section-container bg-gradient-to-r from-soft-blue-light to-soft-yellow-light">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 leading-tight">
            Are You Tired Of Being Scared?<br className="mb-2" /> Are You Ready To Take Control?
          </h2>
          <p className="text-xl md:text-2xl text-gray-800 mb-8 font-medium">
            MAKE THE CHANGE TODAY!
          </p>
          <Link href="/free-consultation" className="btn-primary text-xl">
            GET STARTED
          </Link>
        </div>
      </section>
    </div>
  )
}
