/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ['mongoose']
  }
}

module.exports = nextConfig
