import { ExternalLink, BookOpen, TrendingUp, PiggyBank, FileText, Lightbulb, BarChart3 } from 'lucide-react'
import { Metadata } from 'next'
import { createMetadata } from '../metadata'

export const metadata: Metadata = createMetadata({
  title: 'Financial Resources & Tools',
  description: 'Access helpful financial calculators, budgeting apps, and educational resources. Connect with trusted financial partners including SmartVestor pros and real estate experts.',
  keywords: ['financial calculators', 'budgeting apps', 'SmartVestor', 'financial education', 'financial resources'],
  path: '/resources',
})

export default function Resources() {
  // Resources Section: Calculators, Forms, Apps
  const resources = [
    {
      icon: <img src="/images/flat-blue-50-ramsey-logo.svg" alt="Ramsey Solutions" width="120" height="48" className="h-10 sm:h-12 w-auto" loading="eager" />,
      title: "Budget Calculator",
      description: "The budget calculator helps you see where you stand with your money right now.",
      link: "https://www.ramseysolutions.com/budgeting/budget-calculator"
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-soft-blue" />,
      title: "Debt Payoff Calculator",
      description: "Calculate how quickly you can become debt-free with the debt snowball method.",
      link: "#"
    },
    {
      icon: <img src="/images/Social Security Logo.svg" alt="Social Security Administration" width="120" height="48" className="h-10 sm:h-12 w-auto" loading="eager" />,
      title: "Social Security Calculator",
      description: "Estimate your Social Security benefits and plan for retirement income.",
      link: "https://www.ssa.gov/OACT/quickcalc/index.html"
    },
    {
      icon: <img src="/images/flat-blue-50-ramsey-logo.svg" alt="Ramsey Solutions" width="120" height="48" className="h-10 sm:h-12 w-auto" loading="eager" />,
      title: "Retirement Calculator",
      description: "Calculate how much you need to save for a comfortable retirement.",
      link: "https://www.ramseysolutions.com/retirement/retirement-calculator"
    },
    {
      icon: <FileText className="h-12 w-12 text-soft-blue" />,
      title: "Financial Forms",
      description: "Download templates for budgeting, debt tracking, and goal setting.",
      link: "/downloads"
    },
    {
      icon: <img src="/images/everydollar-logo.png" alt="EveryDollar" width="120" height="48" className="h-10 sm:h-12 w-auto mt-4 sm:mt-8" loading="eager" />,
      title: "",
      description: "Ramsey's free budgeting app to create and track your monthly budget on any device.",
      link: "https://www.ramseysolutions.com/money/everydollar"
    }
  ]

  // Additional Information Section: Educational Content
  const additionalInfo = [
    {
      icon: <BookOpen className="h-12 w-12 text-soft-green" />,
      title: "Financial Education Articles",
      description: "Access articles, videos, and courses on personal finance fundamentals.",
      link: "#"
    },
    {
      icon: <PiggyBank className="h-12 w-12 text-soft-green" />,
      title: "Emergency Fund Guide",
      description: "Learn how to build and maintain a fully-funded emergency fund.",
      link: "#"
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-soft-green" />,
      title: "Money Tips & Insights",
      description: "Regular tips and strategies for improving your financial situation.",
      link: "#"
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-soft-green" />,
      title: "Financial Planning Resources",
      description: "Comprehensive guides for long-term financial planning and wealth building.",
      link: "#"
    }
  ]

  // Trusted Partners Section
  const partners = [
    // Financial Advisors
    {
      icon: <img src="/images/SmartVestor-Logo-Ramsey-Color-5-21-1117436319.png" alt="SmartVestor" width="120" height="48" className="h-10 sm:h-12 w-auto mt-4 sm:mt-8 mb-8 sm:mb-12" loading="eager" />,
      businessName: "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0",
      serviceType: "Financial Advisors",
      description: "Ramsey-trusted investment professionals who can help you plan for your financial future.",
      link: "https://www.ramseysolutions.com/retirement/smartvestor"
    },
    {
      icon: <img src="/images/derek-a-gilbert_0171d_400x490.webp" alt="Derek Gilbert" width="128" height="128" className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 object-cover rounded-full" style={{objectPosition: '45% 0%', filter: 'brightness(1.15)'}} loading="eager" />,
      businessName: "Derek Gilbert",
      serviceType: "Financial Advisor",
      description: "Experienced financial advisor providing personalized investment and retirement planning.",
      link: "https://www.ameripriseadvisors.com/Derek.Gilbert/"
    },
    // Real Estate
    {
      icon: <img src="/images/Annesha.webp" alt="Annesha Montez" width="128" height="128" className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 object-cover rounded-full" style={{objectPosition: '50% 0%', filter: 'brightness(1.15)'}} loading="eager" />,
      businessName: "Annesha Montez",
      serviceType: "Real Estate",
      description: "Trusted real estate professional with extensive market expertise. Dedicated to making your home buying and selling process smooth and stress-free.",
      link: "https://www.anneshamontez.realtor/"
    },
    {
      icon: <img src="/images/Tara jo.webp" alt="Tara Jo Hayes" width="128" height="128" className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 object-cover rounded-full" style={{objectPosition: '50% 15%', filter: 'brightness(1.15)'}} loading="eager" />,
      businessName: "Tara Jo Hayes",
      serviceType: "Real Estate",
      description: "Born and raised locally with deep knowledge of the area. Determined, attentive, and always available for your call. High standards and strong focus on great results.",
      link: "https://www.windermere.com/directory/agents/tara-jo-hayes"
    },
    // Counselors
    {
      icon: <img src="/images/Tabitha2 adjusted.webp" alt="Tabitha Ramos" width="128" height="128" className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 object-cover rounded-full" style={{objectPosition: '50% 15%', filter: 'brightness(1.15)'}} loading="eager" />,
      businessName: "Tabitha Ramos, LCSW",
      serviceType: "Counseling Services",
      description: "Passionate about helping women and couples overcome relationship challenges and grow their own way. Specializing in trauma treatment including EMDR therapy.",
      link: "https://growyourownwaytherapy.com/"
    }
  ]

  return (
    <div>
      {/* Main Title */}
      <section className="section-container py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 text-gray-900">
          HELPFUL RESOURCES
        </h1>
        <p className="section-subtitle">
          Tools, information, and partners to support your financial journey
        </p>
      </section>

      {/* Resources Section */}
      <section className="section-container">
        <h2 className="section-title">Resources</h2>
        <p className="section-subtitle">
          Financial tools and calculators to help you take control
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card group hover:bg-gradient-to-br hover:from-soft-blue-light hover:to-white transition-all duration-300 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-sm flex flex-col"
            >
              <div className="flex flex-col items-center text-center flex-grow">
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {resource.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{resource.title}</h3>
                <p className="text-gray-700 mb-4 flex-grow">{resource.description}</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-brand-red font-medium mt-auto">
                Learn More
                <ExternalLink className="h-4 w-4" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="section-container">
        <h2 className="section-title">Additional Information</h2>
        <p className="section-subtitle">
          Educational content to expand your financial knowledge
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {additionalInfo.map((info, index) => (
            <a
              key={index}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card group hover:bg-gradient-to-br hover:from-green-50 hover:to-white transition-all duration-300 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(50%-0.75rem)] max-w-sm flex flex-col"
            >
              <div className="flex flex-col items-center text-center flex-grow">
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{info.title}</h3>
                <p className="text-gray-700 mb-4 flex-grow">{info.description}</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-brand-red font-medium mt-auto">
                Read More
                <ExternalLink className="h-4 w-4" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Trusted Partners Section */}
      <section className="section-container">
        <h2 className="section-title">Trusted Partners</h2>
        <p className="section-subtitle">
          Professionals I recommend for complementary services
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card group hover:bg-gradient-to-br hover:from-soft-yellow-light hover:to-white transition-all duration-300 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-sm flex flex-col"
            >
              <div className="flex flex-col items-center text-center flex-grow">
                <p className="text-base font-semibold text-brand-red mb-2">{partner.serviceType}</p>
                <div className="mt-4 mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {partner.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{partner.businessName}</h3>
                <p className="text-gray-700 mb-4 flex-grow">{partner.description}</p>
              </div>
              <div className="flex items-center justify-center gap-2 text-brand-red font-medium mt-auto">
                Contact Partner
                <ExternalLink className="h-4 w-4" />
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Note Section */}
      <section className="section-container">
        <div className="max-w-3xl mx-auto text-center card">
          <p className="text-gray-700 leading-relaxed">
            <strong>Note:</strong> The resources and partners listed on this page are recommendations based on quality and trustworthiness. I may receive referral compensation from some partners, but I only recommend services I truly believe will benefit your financial journey.
          </p>
        </div>
      </section>
    </div>
  )
}
