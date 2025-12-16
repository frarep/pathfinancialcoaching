import { FileText, Download } from 'lucide-react'

export default function Downloads() {
  // When you add PDFs to /public/downloads/, add them to this array
  const documents = [
    // Example structure - uncomment and modify when you add actual files:
    // {
    //   title: "Monthly Budget Worksheet",
    //   description: "A comprehensive template to track your monthly income and expenses.",
    //   filename: "budget-worksheet.pdf",
    //   category: "Budget & Planning"
    // },
    // {
    //   title: "Debt Snowball Tracker",
    //   description: "Track your debt payoff progress using the debt snowball method.",
    //   filename: "debt-snowball-tracker.pdf",
    //   category: "Debt Management"
    // },
    // {
    //   title: "Emergency Fund Tracker",
    //   description: "Monitor your progress toward a fully-funded emergency fund.",
    //   filename: "emergency-fund-tracker.pdf",
    //   category: "Savings"
    // },
  ]

  return (
    <div>
      {/* Main Title */}
      <section className="section-container py-20">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 text-gray-900">
          DOWNLOADABLE FORMS & WORKSHEETS
        </h1>
        <p className="section-subtitle">
          Free resources to help you manage your finances effectively
        </p>
      </section>

      {/* Documents Section */}
      <section className="section-container">
        {documents.length === 0 ? (
          <div className="card max-w-2xl mx-auto text-center">
            <FileText className="h-16 w-16 text-soft-blue mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-3 text-gray-900">Coming Soon</h2>
            <p className="text-gray-700 mb-4">
              We're currently preparing helpful financial forms and worksheets for you to download.
            </p>
            <p className="text-gray-600 text-sm">
              Check back soon for budgeting templates, debt tracking tools, and goal-setting worksheets.
            </p>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {documents.map((doc, index) => (
              <a
                key={index}
                href={`/downloads/${doc.filename}`}
                download
                className="card group hover:bg-gradient-to-br hover:from-soft-blue-light hover:to-white transition-all duration-300 w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] max-w-sm flex flex-col"
              >
                <div className="flex flex-col items-center text-center flex-grow">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    <FileText className="h-12 w-12 text-soft-blue" />
                  </div>
                  <p className="text-sm font-semibold text-brand-red mb-2">{doc.category}</p>
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{doc.title}</h3>
                  <p className="text-gray-700 mb-4 flex-grow">{doc.description}</p>
                </div>
                <div className="flex items-center justify-center gap-2 text-brand-red font-medium mt-auto">
                  Download PDF
                  <Download className="h-4 w-4" />
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Instructions Section */}
      <section className="section-container bg-white/60 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto card">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 text-center">How to Use These Resources</h2>
          <ul className="text-gray-700 space-y-3">
            <li className="flex items-start gap-2">
              <span className="text-brand-red font-bold mt-1">•</span>
              <span>Download the forms that match your current financial goals</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-red font-bold mt-1">•</span>
              <span>Print them out or fill them digitally using a PDF editor</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-red font-bold mt-1">•</span>
              <span>Use these tools alongside your coaching sessions for maximum benefit</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-brand-red font-bold mt-1">•</span>
              <span>Feel free to make copies and use them month after month</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
