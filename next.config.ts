import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.18.222"],
  async redirects() {
    return [
      {
        source: '/hotshot',
        destination: '/trucking-services/expedited-trucking',
        permanent: false,
      },
      {
        source: '/hotshot-trucking-services',
        destination: '/trucking-services/expedited-trucking',
        permanent: false,
      },
      {
        source: '/trucking-services/hotshot',
        destination: '/trucking-services/expedited-trucking',
        permanent: false,
      },
      {
        source: '/trucking-services/hotshot-trucking-services',
        destination: '/trucking-services/expedited-trucking',
        permanent: false,
      },
      {
        source: '/admin',
        destination: '/admin/portal',
        permanent: false,
      }
    ]
  }
};

export default nextConfig;
