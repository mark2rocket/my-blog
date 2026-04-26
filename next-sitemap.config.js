/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://example.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: '*',
        disallow: ['/api/', '/_next/', '/privacy-policy', '/data-deletion'],
      },
    ],
    additionalSitemaps: [],
  },
  exclude: ['/api/*', '/_next/*', '/privacy-policy', '/data-deletion'],
  changefreq: 'weekly',
  priority: 0.7,
};
