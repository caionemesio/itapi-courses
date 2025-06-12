import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: [
      'www.google.com',
      'www.alura.com.br',
      'encrypted-tbn0.gstatic.com',
      'simulare.com.br',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nzzvzeyickprazrurdws.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
}

export default nextConfig
