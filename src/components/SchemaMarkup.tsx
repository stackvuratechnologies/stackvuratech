// src/components/SchemaMarkup.tsx
import React from 'react';

export default function SchemaMarkup() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'Organization'],
    name: 'StackVura Technologies',
    url: 'https://stackvuratechnologies.online',
    logo: 'https://stackvuratechnologies.online/logo.png', 
    image: 'https://stackvuratechnologies.online/og-image.png',
    description: 'StackVura Technologies is an enterprise cloud architecture firm that deploys custom software, DevSecOps workflows, and Web3 integrations.',
    telephone: '+254 726 396 632',
    email: 'admin@stackvuratechnologies.online',
    foundingDate: '2026-08',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Machakos',
      addressRegion: 'Machakos County',
      addressCountry: 'KE'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '-1.5177',
      longitude: '37.2634'
    },
    sameAs: [
      'https://github.com/StackvuraTechnologies',
      'https://linkedin.com/company/stackvura-technologies' 
    ]
  };

  // Replace the '<' character with its unicode equivalent '\u003c' to prevent XSS injection vulnerabilities
  const safeJsonLd = JSON.stringify(jsonLd).replace(/</g, '\\u003c');

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd }}
    />
  );
}