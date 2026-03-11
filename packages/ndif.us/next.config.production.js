// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/ndif-web-beta",
  assetPrefix: "/ndif-web-beta",
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: "/ndif-web-beta",
  },
};

module.exports = nextConfig;
