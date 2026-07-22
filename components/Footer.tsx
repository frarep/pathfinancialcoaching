'use client'

import Link from 'next/link'
import { Mail, MapPin, ArrowRight, Check, Copy } from 'lucide-react'
import { useState } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [showCopied, setShowCopied] = useState(false)
  const email = 'frare.patrick@pathfinancialcoaching.com'

  const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/the-process', label: 'The Process' },
    { href: '/free-consultation', label: 'Free Consultation' },
    { href: '/about', label: 'Coach Patrick' },
    { href: '/resources', label: 'Resources' },
  ]

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(email)
    setShowCopied(true)
    setTimeout(() => setShowCopied(false), 3000)
  }

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      {/* Brand accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-blue-700 via-white to-orange-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-soft-blue-light to-soft-yellow-light bg-clip-text text-transparent">
              PATH FINANCIAL COACHING
            </h3>
            <p className="text-sm leading-relaxed text-gray-400 mb-5 max-w-xs">
              Coaching to help you get out of debt, build wealth, and make
              your dreams a reality.
            </p>
            <div className="flex items-start gap-2 text-sm text-gray-400">
              <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-soft-blue" aria-hidden="true" />
              <span>Based in Junction City, Oregon · Serving clients nationwide</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center text-sm text-gray-400 hover:text-soft-yellow-light transition-colors duration-200"
                  >
                    <ArrowRight
                      className="h-3.5 w-3.5 mr-2 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
                      aria-hidden="true"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in touch */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-white mb-5">
              Get In Touch
            </h4>
            <div className="relative inline-block mb-6">
              <button
                onClick={copyEmailToClipboard}
                className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-soft-yellow-light transition-colors duration-200 cursor-pointer break-all text-left"
                aria-label="Copy email address to clipboard"
              >
                {showCopied ? (
                  <Check className="h-4 w-4 flex-shrink-0 text-green-400" aria-hidden="true" />
                ) : (
                  <Mail className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                )}
                <span>{email}</span>
                {!showCopied && (
                  <Copy className="h-3.5 w-3.5 flex-shrink-0 opacity-60" aria-hidden="true" />
                )}
              </button>
              {showCopied && (
                <div className="absolute top-full left-0 mt-2 px-3 py-1.5 bg-green-500 text-white text-xs rounded-lg shadow-lg whitespace-nowrap animate-fade-in">
                  Email copied to clipboard!
                </div>
              )}
            </div>
            <Link
              href="/free-consultation"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-green-600 hover:scale-105"
            >
              Book a Free Consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            © {currentYear} Path Financial Coaching. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 text-center sm:text-right">
            Patrick Frare · Master Trained Financial Coach
          </p>
        </div>
      </div>
    </footer>
  )
}
