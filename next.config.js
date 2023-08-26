/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: ['geotag.club', '*.geotag.club', 'avatars.githubusercontent.com', 'public.blob.vercel-storage.com', 'lossless.geotag.club', 'akima.geotag.club', ],
  },
  reactStrictMode: false,
};
