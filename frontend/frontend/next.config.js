/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'images.unsplash.com'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  },
  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: './tsconfig.json',
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  webpack: (config, { isServer }) => {
    // Exclude backend files from webpack compilation
    config.resolve.alias = {
      ...config.resolve.alias,
    }
    
    config.module.rules.push({
      test: /\.ts$/,
      exclude: [
        /node_modules/,
        /backend/,
        /data/,
        /\.next/,
      ],
    })
    
    return config
  },
}

module.exports = nextConfig
