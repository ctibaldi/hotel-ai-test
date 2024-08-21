const nextConfig = {
  // output: 'export',
  reactStrictMode: false,
  compress: true,
  env: {
    apiHost: process?.env?.NEXT_PUBLIC_API_URL || '',
    portal: process?.env?.NEXT_PUBLIC_PORTAL || '',
  },
  publicRuntimeConfig: {
    apiHost: process?.env?.NEXT_PUBLIC_API_URL || '',
    portal: process?.env?.NEXT_PUBLIC_PORTAL || '',
  },
  serverRuntimeConfig: {
    apiHost: process?.env?.NEXT_PUBLIC_API_URL || '',
    portal: process?.env?.NEXT_PUBLIC_PORTAL || '',
  },
  images: {
    loader: 'custom',
    domains: ['booking.com', 'imagedelivery.net', 'lh3.googleusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },
  trailingSlash: true,
  // exportTrailingSlash: true,
};

module.exports = nextConfig;
