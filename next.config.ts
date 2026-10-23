import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Guides used to live under /catalogs; keep old links working.
  redirects() {
    return [
      { source: "/catalogs", destination: "/guides", permanent: true },
      {
        source: "/catalogs/:path*",
        destination: "/guides/:path*",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
