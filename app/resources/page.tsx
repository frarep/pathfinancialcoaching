import { ExternalLink, Calculator, BookOpen, TrendingUp, PiggyBank, FileText, Lightbulb, Users, Briefcase, Home, Heart, Scale, BarChart3, GraduationCap } from 'lucide-react'

export default function Resources() {
  // Resources Section: Calculators, Forms, Apps
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
      icon: <PiggyBank className="h-12 w-12 text-soft-blue" />,
      title: "Social Security Calculator",
      description: "Estimate your Social Security benefits and plan for retirement income.",
      link: "#"
    },
    {
      icon: <TrendingUp className="h-12 w-12 text-soft-blue" />,
      title: "Ramsey Retirement Calculator",
      description: "Calculate how much you need to save for a comfortable retirement.",
      link: "#"
    },
    {
      icon: <FileText className="h-12 w-12 text-soft-blue" />,
      title: "Financial Forms",
      description: "Download templates for budgeting, debt tracking, and goal setting.",
      link: "#"
    },
    {
      icon: <img src="/images/everydollar-logo.png" alt="EveryDollar" className="h-12 w-auto mt-8" />,
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

  // Trusted Partners Section: 2 spots for each category
  const partners = [
    // Financial Advisors
    {
      icon: <BarChart3 className="h-12 w-12 text-soft-yellow" />,
      businessName: "SmartVestor Pros",
      serviceType: "Financial Advisors",
      description: "Ramsey-trusted investment professionals who can help you plan for your financial future.",
      link: "#"
    },
    {
      icon: <BarChart3 className="h-12 w-12 text-soft-yellow" />,
      businessName: "Derek Gilbert",
      serviceType: "Financial Advisor",
      description: "Experienced financial advisor providing personalized investment and retirement planning.",
      link: "#"
    },
    // Real Estate
    {
      icon: <Home className="h-12 w-12 text-soft-yellow" />,
      businessName: "Real Estate Partner 1",
      serviceType: "Real Estate",
      description: "Trusted real estate professional to help you buy or sell your home.",
      link: "#"
    },
    {
      icon: <Home className="h-12 w-12 text-soft-yellow" />,
      businessName: "Real Estate Partner 2",
      serviceType: "Real Estate",
      description: "Experienced realtor specializing in your local market.",
      link: "#"
    },
    // Mortgage Advisors
    {
      icon: <Briefcase className="h-12 w-12 text-soft-yellow" />,
      businessName: "Mortgage Advisor 1",
      serviceType: "Mortgage Services",
      description: "Expert guidance for home buying, refinancing, and mortgage planning.",
      link: "#"
    },
    {
      icon: <Briefcase className="h-12 w-12 text-soft-yellow" />,
      businessName: "Mortgage Advisor 2",
      serviceType: "Mortgage Services",
      description: "Competitive rates and personalized mortgage solutions.",
      link: "#"
    },
    // Legal Services
    {
      icon: <Scale className="h-12 w-12 text-soft-yellow" />,
      businessName: "Legal Partner 1",
      serviceType: "Legal Services",
      description: "Estate planning, wills, and trusts to protect your family's future.",
      link: "#"
    },
    {
      icon: <Scale className="h-12 w-12 text-soft-yellow" />,
      businessName: "Legal Partner 2",
      serviceType: "Legal Services",
      description: "Comprehensive legal services for your personal and financial needs.",
      link: "#"
    },
    // Tax Services
    {
      icon: <Heart className="h-12 w-12 text-soft-yellow" />,
      businessName: "Tax Services 1",
      serviceType: "Tax Preparation",
      description: "Professional tax preparation and planning services year-round.",
      link: "#"
    },
    {
      icon: <Heart className="h-12 w-12 text-soft-yellow" />,
      businessName: "Tax Services 2",
      serviceType: "Tax Preparation",
      description: "Expert tax advisors helping you maximize deductions and minimize liability.",
      link: "#"
    },
    // Counselors
    {
      icon: <Users className="h-12 w-12 text-soft-yellow" />,
      businessName: "Counselor 1",
      serviceType: "Counseling Services",
      description: "Professional counseling for financial stress and life transitions.",
      link: "#"
    },
    {
      icon: <Users className="h-12 w-12 text-soft-yellow" />,
      businessName: "Counselor 2",
      serviceType: "Counseling Services",
      description: "Compassionate support for mental health and relationship guidance.",
      link: "#"
    },
    // Job Coaches
    {
      icon: <GraduationCap className="h-12 w-12 text-soft-yellow" />,
      businessName: "Job Coach 1",
      serviceType: "Career Coaching",
      description: "Career coaching to help you find the right job or advance in your field.",
      link: "#"
    },
    {
      icon: <GraduationCap className="h-12 w-12 text-soft-yellow" />,
      businessName: "Job Coach 2",
      serviceType: "Career Coaching",
      description: "Resume building, interview prep, and career transition support.",
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
          Tools, information, and partners to support your financial journey
        </p>
      </section>

      {/* Resources Section */}
      <section className="section-container">
        <h2 className="section-title">Resources</h2>
        <p className="section-subtitle">
          Financial tools and calculators to help you take control
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
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

      {/* Additional Information Section */}
      <section className="section-container bg-white/60 backdrop-blur-sm">
        <h2 className="section-title">Additional Information</h2>
        <p className="section-subtitle">
          Educational content to expand your financial knowledge
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalInfo.map((info, index) => (
            <a
              key={index}
              href={info.link}
              target="_blank"
              rel="noopener noreferrer"
              className="card group hover:bg-gradient-to-br hover:from-green-50 hover:to-white transition-all duration-300"
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {info.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{info.title}</h3>
                <p className="text-gray-700 mb-4">{info.description}</p>
                <div className="flex items-center gap-2 text-brand-red font-medium">
                  Read More
                  <ExternalLink className="h-4 w-4" />
                </div>
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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
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
      <section className="section-container bg-white/60 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto text-center card">
          <p className="text-gray-700 leading-relaxed">
            <strong>Note:</strong> The resources and partners listed on this page are recommendations based on quality and trustworthiness. I may receive referral compensation from some partners, but I only recommend services I truly believe will benefit your financial journey.
          </p>
        </div>
      </section>
    </div>
  )
}
