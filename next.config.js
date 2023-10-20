/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

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

module.exports = withNextIntl(nextConfig);
