/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    env: {
        APP_ENV: 'production',
    },
    images: {
        remotePatterns: [{
            protocol: 'http',
            hostname: 'localhost',
            port: '8022',
            pathname: '/static/**'
        }, {
            protocol: 'https',
            hostname: 'api.neteralex.cn',
            port: '80',
            pathname: '/static/**'
            ,
        }]
    }
}

module.exports = nextConfig
