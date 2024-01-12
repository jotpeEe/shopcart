/** @type {import('next').NextConfig} */

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

module.exports = withNextIntl(nextConfig);
