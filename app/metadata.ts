import { Metadata } from 'next'

export const siteConfig = {
  name: 'Path Financial Coaching',
  description: 'Transform your financial future with personalized coaching from a Ramsey Preferred Coach. Get out of debt, build wealth, and achieve financial peace.',
  url: 'https://pathfinancialcoaching.com', // Update with actual domain
  ogImage: '/images/pablo-heimplatz-EAvS-4KnGrk-unsplash.jpg',
  creator: 'Patrick Frare',
  keywords: ['financial coaching', 'Ramsey Solutions', 'debt elimination', 'budgeting', 'financial planning', 'financial peace', 'Oregon financial coach', 'Dave Ramsey coach'],
}

export function createMetadata({
  title,
  description,
  keywords,
  path = '/',
  image,
}: {
  title?: string
  description?: string
  keywords?: string[]
  path?: string
  image?: string
}): Metadata {
  const metaTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name
  const metaDescription = description || siteConfig.description
  const metaKeywords = keywords ? [...siteConfig.keywords, ...keywords] : siteConfig.keywords
  const metaImage = image || siteConfig.ogImage
  const url = `${siteConfig.url}${path}`

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: metaKeywords.join(', '),
    authors: [{ name: siteConfig.creator }],
    creator: siteConfig.creator,
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: url,
      title: metaTitle,
      description: metaDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
      creator: '@pathfinancial', // Update with actual Twitter handle if available
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
