import { Metadata } from 'next'
import { createMetadata } from '../metadata'
import Link from 'next/link'

export const metadata: Metadata = createMetadata({
  title: 'Page Coming Soon',
  description: 'This page is currently being rebuilt. Please check back soon.',
  path: '/coming-soon',
})

export default function ComingSoon() {
  return (
    <div className="section-container py-20 flex flex-col items-center justify-center min-h-[50vh] text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
        We're Working On It
      </h1>
      <p className="text-xl text-gray-700 max-w-xl mb-8">
        We are sorry, this page is being rebuilt. Please check back soon.
      </p>
      <Link
        href="/resources#additional-information"
        className="btn-primary"
      >
        Back to Resources
      </Link>
    </div>
  )
}
