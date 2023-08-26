/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['geotag.club', '*.geotag.club'],
  },
  reactStrictMode: false,
};
