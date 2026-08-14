/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Hapus basePath jika repo kamu adalah custom domain atau <username>.github.io
  // Kalau repo kamu public repo biasa (misal: personal-portfolio), isi basePath:
  basePath: process.env.NODE_ENV === 'production' ? '/personal-portfolio' : '',
};

export default nextConfig;