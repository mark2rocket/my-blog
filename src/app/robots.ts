import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.SITE_URL || 'https://example.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/privacy-policy', '/data-deletion'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
