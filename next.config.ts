import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Guides used to live under /catalogs; keep old links working.
  redirects() {
    return [
      // Guides has no landing page; send old links to the first category.
      {
        source: "/guides",
        destination: "/guides/getting-started",
        permanent: false,
      },
      {
        source: "/catalogs",
        destination: "/guides/getting-started",
        permanent: false,
      },
      {
        source: "/guides/steps",
        destination: "/guides/process-breakdown",
        permanent: true,
      },
      {
        source: "/guides/getting-started/process-breakdown",
        destination: "/guides/process-breakdown",
        permanent: true,
      },
      // Training Material became a course under Getting Started.
      {
        source: "/guides/training/:path*",
        destination: "/guides/getting-started/training/:path*",
        permanent: true,
      },
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
