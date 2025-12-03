import { ExternalLink, Calculator, BookOpen, TrendingUp, PiggyBank, FileText, Lightbulb, Users, Briefcase, Home, Heart, Scale } from 'lucide-react'

export default function Resources() {
  const resources = [
    {
      icon: <Calculator className="h-12 w-12 text-soft-blue" />,
      title: "Budget Calculator",
      description: "Free tools to help you create and track your monthly budget effectively.",
      link: "#"
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-soft-blue" />,
      title: "Debt Payoff Calculator",
      description: "Calculate how quickly you can become debt-free with the debt snowball method.",
      link: "#"
    },
    {
      icon: <BookOpen className="h-12 w-12 text-soft-blue" />,
      title: "Financial Education",
      description: "Access articles, videos, and courses on personal finance fundamentals.",
      link: "#"
    },
    {
      icon: <PiggyBank className="h-12 w-12 text-soft-blue" />,
      title: "Emergency Fund Guide",
      description: "Learn how to build and maintain a fully-funded emergency fund.",
      link: "#"
    },
    {
      icon: <FileText className="h-12 w-12 text-soft-blue" />,
      title: "Financial Forms",
      description: "Download templates for budgeting, debt tracking, and goal setting.",
      link: "#"
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-soft-blue" />,
      title: "Money Tips & Insights",
      description: "Regular tips and strategies for improving your financial situation.",
      link: "#"
    }
  ]

  const partners = [
    {
      icon: <Briefcase className="h-12 w-12 text-soft-yellow" />,
      businessName: "Example Insurance Agency",
      serviceType: "Insurance Services",
      description: "Comprehensive life, health, and property insurance solutions for your family's protection.",
      link: "#"
    },
    {
      icon: <Home className="h-12 w-12 text-soft-yellow" />,
      businessName: "Trusted Mortgage Advisors",
      serviceType: "Mortgage Services",
      description: "Expert guidance for home buying, refinancing, and mortgage planning.",
      link: "#"
    },
    {
      icon: <Scale className="h-12 w-12 text-soft-yellow" />,
      businessName: "Legal Partners LLC",
      serviceType: "Legal Services",
      description: "Estate planning, wills, and trusts to protect your family's future.",
      link: "#"
    },
    {
      icon: <Heart className="h-12 w-12 text-soft-yellow" />,
      businessName: "Community Tax Services",
      serviceType: "Tax Preparation",
      description: "Professional tax preparation and planning services year-round.",
      link: "#"
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
          Tools and partners to support your financial journey
        </p>
      </section>

      {/* External Resources Section */}
      <section className="section-container">
        <h2 className="section-title">Recommended Resources</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card group hover:bg-gradient-to-br hover:from-soft-blue-light hover:to-white transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {resource.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{resource.title}</h3>
                <p className="text-gray-700 mb-4">{resource.description}</p>
                <div className="flex items-center gap-2 text-brand-red font-medium">
                  Learn More
                  <ExternalLink className="h-4 w-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Referral Partners Section */}
      <section className="section-container bg-white/60 backdrop-blur-sm">
        <h2 className="section-title">Trusted Partners</h2>
        <p className="section-subtitle">
          Professionals I recommend for complementary services
        </p>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {partners.map((partner, index) => (
            <a
              key={index}
              href={partner.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card group hover:bg-gradient-to-br hover:from-soft-yellow-light hover:to-white transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {partner.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">{partner.businessName}</h3>
                <p className="text-sm font-semibold text-brand-red mb-3">{partner.serviceType}</p>
                <p className="text-gray-700 mb-4">{partner.description}</p>
                <div className="flex items-center gap-2 text-brand-red font-medium">
                  Contact Partner
                  <ExternalLink className="h-4 w-4" />
                </div>
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
