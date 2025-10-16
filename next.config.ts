import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    eslint: {
        // ⛔ Abaikan semua error ESLint saat build
        ignoreDuringBuilds: true,
    },
    typescript: {
        // ⛔ Abaikan error TypeScript saat build
        ignoreBuildErrors: true,
    },
    /*  output: "export",
    images: {
        unoptimized: true,
    }, */
};

export default nextConfig;
