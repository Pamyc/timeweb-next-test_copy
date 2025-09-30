/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // заменяет старый next export
  images: { unoptimized: true }, // чтобы статический экспорт не ругался на next/image
};

module.exports = nextConfig;
