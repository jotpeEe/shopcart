/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
const withNextIntl = require('next-intl/plugin')();

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

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
