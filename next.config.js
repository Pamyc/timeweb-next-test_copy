/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',        // чтобы Next сам сделал статику в /out
  images: { unoptimized: true }
};
module.exports = nextConfig;
