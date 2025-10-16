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
    output: "export", // 🧠 ini menggantikan next export
    images: {
        unoptimized: true, // penting biar gambar bisa jalan di static mode
    },
};

export default nextConfig;
