/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // чтобы next build → out/ (статическая выдача)
  images: { unoptimized: true }
};
module.exports = nextConfig;
