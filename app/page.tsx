import Link from 'next/link'
import { Image } from 'lucide-react'

export default function Home() {
  const helpItems = [
    "Get out of debt",
    "Learn how to handle money",
    "Pay off student loans",
    "Set up a monthly budget and stick to it",
    "Buy a home",
    "Plan for retirement",
    "Achieve your dreams"
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="section-container py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[21/9] bg-gradient-to-br from-soft-blue to-soft-yellow flex items-center justify-center">
            <Image className="h-32 w-32 text-white opacity-40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-white text-4xl md:text-5xl font-bold mb-2">Make Your Dreams A Reality</h1>
              <p className="text-white text-sm opacity-70 absolute bottom-4 right-4">Photo By Pablo Heimplatz</p>
            </div>
          </div>
        </div>
      </section>

      {/* What Is A Financial Coach Section */}
      <section className="section-container bg-white/60 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title">WHAT IS A FINANCIAL COACH?</h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              A financial coach is a guide who helps individuals and couples set and achieve financial goals, such as budgeting and paying off debt.
            </p>
            <p className="font-medium text-gray-800">
              Translation: Together, we'll identify your goals, uncover what's holding you back, and create a plan to help you build the life you dream of. We celebrate wins together and we work through setbacks together. I am here to encourage you as well as call out the hard truths. I believe that even in the darkest time, there is light and a path forward.
            </p>
          </div>
        </div>
      </section>

      {/* How a Financial Coach Can Help You Section */}
      <section className="section-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="section-title mb-12">HOW A FINANCIAL COACH CAN HELP YOU</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {helpItems.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-6 rounded-lg bg-white/80 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-brand-red/20 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-brand-red"></div>
                  </div>
                </div>
                <p className="text-lg font-medium text-gray-800">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Coach Patrick Section */}
      <section className="section-container bg-white/60 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="section-title mb-12">MEET COACH PATRICK</h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6 max-w-lg">
              <div className="space-y-4 text-lg text-gray-700 leading-relaxed">
                <p className="font-semibold text-xl text-gray-900">
                  Do your dreams feel out of reach? I believe they're not.
                </p>
                <p>
                  Dreams are what move us forward—and with the right plan, they can become reality.
                </p>
                <p>
                  Let's talk about your goals and how we can make them happen.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/about">
                  <button className="btn-primary text-lg w-full sm:w-auto">
                    LEARN MORE
                  </button>
                </Link>
                <Link href="/free-consultation">
                  <button className="btn-primary text-lg w-full sm:w-auto">
                    GET STARTED
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Column - Headshot Placeholder */}
            <div className="order-first md:order-last">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[3/4] bg-gradient-to-br from-soft-blue to-soft-yellow flex items-center justify-center">
                <Image className="h-32 w-32 text-white opacity-40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-xl font-semibold opacity-60">Professional Headshot</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
