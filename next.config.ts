import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  /* config options here */
  allowedDevOrigins: ['192.168.12.24', 'localhost']
};

export default withPWA(nextConfig);
