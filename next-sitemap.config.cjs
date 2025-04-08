/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://immonova.org',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    exclude: ['/api/*', '/dashboard/*'],
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
  