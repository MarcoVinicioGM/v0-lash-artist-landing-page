// @ts-check

/**
 * Next.js 16 Configuration
 * @see https://nextjs.org/docs/app/api-reference/config/next-config-js
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  reactStrictMode: true,

  typescript: {
    ignoreBuildErrors: false,
  },

  // Cache Components - moved out of experimental in Next.js 16
  cacheComponents: true,

  // Turbopack root directory to silence lockfile warnings
  turbopack: {
    root: process.cwd(),
  },

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "date-fns",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-tabs",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-slot",
    ],
    serverActions: {
      bodySizeLimit: "2mb",
    },
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },

  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [],
  },

  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === "development",
    },
  },

  headers: async () => [
    {
      source: "/images/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, max-age=31536000, immutable",
        },
      ],
    },
    {
      source: "/:path*",
      headers: [
        {
          key: "X-DNS-Prefetch-Control",
          value: "on",
        },
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "Referrer-Policy",
          value: "origin-when-cross-origin",
        },
      ],
    },
  ],
};

let config = nextConfig;

if (process.env.ANALYZE === "true") {
  const withBundleAnalyzer = (await import("@next/bundle-analyzer")).default({
    enabled: true,
  });
  config = withBundleAnalyzer(nextConfig);
}

export default config;
