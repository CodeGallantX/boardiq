/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // Configure for dark mode support
    experimental: {
      appDir: true,
      serverActions: true,
    },
  
    // Configure webpack for MUI and other optimizations
    webpack: (config) => {
      return config;
    },
  
    // Optional: Configure images if needed
    images: {
      domains: ['images.unsplash.com'], // Add your image domains here
    },
  
  };
  
  export default nextConfig;