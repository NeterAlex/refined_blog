/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        APP_ENV: process.env.APP_ENV
    },
    images: {
        remotePatterns: [{
            protocol: 'http',
            hostname: 'localhost',
            port: '8022',
            pathname: '/static/**'
        }, {
            protocol: 'https',
            hostname: 'apt.neteralex.cn',
            port: '80',
            pathname: '/static/**'
        }]
    }
}

module.exports = nextConfig
