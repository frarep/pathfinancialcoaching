import Link from 'next/link'
import { Mail, ExternalLink } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-soft-blue-light to-soft-yellow-light bg-clip-text text-transparent">
            GET IN TOUCH
          </h3>

          <div className="space-y-4 mb-8">
            <a
              href="mailto:frare.patrick@gmail.com"
              className="inline-flex items-center gap-2 text-lg hover:text-soft-blue-light transition-colors duration-200"
            >
              <Mail className="h-5 w-5" />
              frare.patrick@pathfinancialcoaching.com
            </a>

            <div>
              <a
                href="https://ramseycoach.com/Path-Financial-Coaching"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg hover:text-soft-yellow-light transition-colors duration-200"
              >
                Visit My Ramsey Solutions Coach Profile
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8">
            <p className="text-sm text-gray-400">
              © {currentYear} Path Financial Coaching. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
