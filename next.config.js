/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    turbo: {},
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  // Utiliser index.tsx comme page principale au lieu de page.tsx
  trailingSlash: true,
}

export default nextConfig
