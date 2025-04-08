export default {
    siteUrl: 'https://immonova.org',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    exclude: ['/api/*'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
        additionalSitemaps: [
            'https://immonova.org/sitemap.xml',
        ],
    },
}
  