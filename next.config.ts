import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Guides used to live under /catalogs; keep old links working.
  redirects() {
    return [
      // Guides has no landing page; send old links to the first guide.
      { source: "/guides", destination: "/guides/steps", permanent: false },
      { source: "/catalogs", destination: "/guides/steps", permanent: false },
      {
        source: "/catalogs/:path*",
        destination: "/guides/:path*",
        permanent: true,
      },
      // These moved from Guides to Library.
      ...["forms", "roles", "systems", "screens", "letters"].map((id) => ({
        source: `/guides/${id}/:path*`,
        destination: `/library/${id}`,
        permanent: true,
      })),
    ]
  },
}

export default nextConfig
