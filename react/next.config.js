/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  basePath: '/ocean-storm-viewer',
  env: {
    baseSiteTitle: 'Ocean Storm Viewer - ',
  },
}

module.exports = nextConfig
