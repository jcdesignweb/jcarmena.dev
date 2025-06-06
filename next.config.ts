import * as dotenv from 'dotenv';
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

dotenv.config();

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withNextIntl(nextConfig);
