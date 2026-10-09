import { site } from '@/lib/site';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = site.url;

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
