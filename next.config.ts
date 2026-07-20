import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
      }
    ]
  }
};

export default nextConfig;
