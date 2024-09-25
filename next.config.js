await import('./src/env.js');

/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';
import nextIntl from 'next-intl/plugin';

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ];
  },
  output: 'standalone',
};

const withNextIntl = nextIntl('./src/i18n.ts');

const config =
  process.env.ANALYZE === 'true'
    ? withBundleAnalyzer(withNextIntl(nextConfig))
    : withNextIntl(nextConfig);

export default config;
