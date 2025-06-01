import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: [
      'www.google.com',
      'www.alura.com.br',
      'encrypted-tbn0.gstatic.com',
    ], // Adicione outros domínios que você precisar
  },
}

export default nextConfig
