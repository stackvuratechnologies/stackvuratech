// src/app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        // Explicitly allow leading AI search engines
        userAgent: ['OAI-SearchBot', 'PerplexityBot', 'Google-Extended'],
        allow: '/',
      }
    ],
    sitemap: 'https://stackvuratechnologies.online/sitemap.xml',
  };
}