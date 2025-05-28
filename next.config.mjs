/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true, 
    },
    images: {
        domains: ['localhost', 'hoanglh.id.vn', 's3.amazonaws.com'],
    }
};

export default nextConfig;