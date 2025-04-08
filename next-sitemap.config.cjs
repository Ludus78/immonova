/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://immonova.org',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    exclude: ['/api/*', '/dashboard/*'],
    changefreq: 'daily',
    priority: 0.7,
    autoLastmod: true,
    generateIndexSitemap: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/*', '/dashboard/*'],
            },
        ],
        additionalSitemaps: [
            'https://immonova.org/sitemap.xml',
        ],
    },
    // Configuration pour la génération des fichiers
    outDir: 'public',
    // Configuration pour les URLs
    alternateRefs: [
        {
            href: 'https://immonova.org',
            hreflang: 'fr',
        },
    ],
}
  