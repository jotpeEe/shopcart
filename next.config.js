/** @type {import('next').NextConfig} */

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
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

module.exports = withBundleAnalyzer(withNextIntl(nextConfig));
