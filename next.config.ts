import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: [
      'unsplash.it',
      'picsum.photos'
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  experimental: {
    turbo: {
      rules: {
        "*.inline.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.ts",
        }
      }
    }
  }
};

export default withNextIntl(nextConfig);
