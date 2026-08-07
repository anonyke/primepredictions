/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    unoptimized: true,
  },
async rewrites() {
    const apiBase = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_API_BASE_URL;
    // In production, NEXT_PUBLIC_API_URL must be set to the deployed backend URL.
    // If it is not set, fall back to a same-origin rewrite (the frontend domain).
    const destination = apiBase
      ? `${apiBase.replace(/\/$/, '')}/api/:path*`
      : '/api/:path*';
    return [
      {
        source: '/api/:path*',
        destination,
      },
    ];
  },
};

export default nextConfig;
