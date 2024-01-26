/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // تنظیم تصویر favicon
  async headers() {
    return [
      {
        source: "/images/logo.png",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=604800, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
