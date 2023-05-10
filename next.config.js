/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [{
            protocol: 'http',
            hostname: 'localhost',
            port: '8022',
            pathname: '/static/**'
        }]
    }
}

module.exports = nextConfig
