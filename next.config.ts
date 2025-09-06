import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ccrlkewwciedmkwrfbub.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/category-icons/**',
      },
      {
        protocol: 'https',
        hostname: 'ccrlkewwciedmkwrfbub.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/category-icons/icons/**',
      },
    ],
    //  for Next.js 15.3.0+ (comment out the above if using this)
    // remotePatterns: [
    //   new URL('https://ccrlkewwciedmkwrfbub.supabase.co/storage/v1/object/public/**'),
    // ],
  },
};

export default nextConfig;