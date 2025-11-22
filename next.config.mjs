/** @type {import('next').NextConfig} */
const nextConfig = {
  // Abaikan error TypeScript (seperti 'any') saat build
  typescript: {
    ignoreBuildErrors: true,
  },
  // Abaikan aturan kerapian kode (ESLint) saat build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;