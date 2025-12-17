export default function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: 'Path Financial Coaching',
    description: 'Ramsey Preferred Financial Coaching services helping individuals and families achieve financial freedom through budgeting, debt elimination, and wealth building.',
    url: 'https://pathfinancialcoaching.com',
    email: 'frare.patrick@pathfinancialcoaching.com',
    areaServed: {
      '@type': 'State',
      name: 'Oregon',
    },
    priceRange: '$$',
    serviceType: 'Financial Coaching',
    founder: {
      '@type': 'Person',
      name: 'Patrick Frare',
      jobTitle: 'Ramsey Preferred Financial Coach',
    },
    sameAs: [
      'https://ramseycoach.com/Path-Financial-Coaching',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Financial Coaching Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Financial Coaching Consultation',
            description: 'One-on-one financial coaching to help you get out of debt, build wealth, and achieve financial peace.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Budget Planning',
            description: 'Personalized budget creation and management coaching.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Debt Elimination Strategy',
            description: 'Strategic planning and accountability for becoming debt-free.',
          },
        },
      ],
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
