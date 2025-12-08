'use client'

import { Mail, ExternalLink } from 'lucide-react'
import { useState } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [showCopied, setShowCopied] = useState(false)
  const email = 'frare.patrick@pathfinancialcoaching.com'

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(email)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 3000)
  }

  return (
    <footer className="bg-gray-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative">
          {/* Coaching Promise Link - Left Side */}
          <div className="absolute left-0 top-0 hidden lg:block">
            <a
              href="#coaching-promise"
              className="inline-flex items-center gap-2 text-sm hover:text-soft-yellow-light transition-colors duration-200"
            >
              <ExternalLink className="h-4 w-4" />
              Coaching Promise
            </a>
          </div>

          {/* Main Footer Content - Centered */}
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-6 bg-gradient-to-r from-soft-blue-light to-soft-yellow-light bg-clip-text text-transparent">
              GET IN TOUCH
            </h3>

          <div className="space-y-4 mb-8">
            <div className="relative inline-block">
              <button
                onClick={copyEmailToClipboard}
                className="inline-flex items-center gap-2 text-lg hover:text-soft-yellow-light transition-colors duration-200 cursor-pointer"
              >
                <Mail className="h-5 w-5" />
                EMAIL
              </button>
              {showCopied && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-green-500 text-white text-sm rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
                  Email copied to clipboard!
                </div>
              )}
            </div>

            <div>
              <a
                href="https://ramseycoach.com/Path-Financial-Coaching"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-lg hover:text-soft-yellow-light transition-colors duration-200"
              >
                Visit My Ramsey Solutions Preferred Coach Profile
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

          {/* Mobile Coaching Promise Link */}
          <div className="text-center mt-6 lg:hidden">
            <a
              href="#coaching-promise"
              className="inline-flex items-center gap-2 text-sm hover:text-soft-yellow-light transition-colors duration-200"
            >
              <ExternalLink className="h-4 w-4" />
              Coaching Promise
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
