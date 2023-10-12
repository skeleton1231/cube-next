/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        // Will be available on both server and client
        apiUrl: 'http://localhost:8000',
      },
}

module.exports = nextConfig

