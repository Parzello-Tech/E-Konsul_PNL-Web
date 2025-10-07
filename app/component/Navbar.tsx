"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Warna } from "./Configuration";

export function Navbar() {
    return (
        <nav className="w-full bg-white/80 dark:bg-[#140205ff] backdrop-blur-md border-b sticky top-0 z-50 ">
            <div className="container mx-auto flex items-center justify-between px-6 py-4">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold tracking-tight">
                    E-Konsul
                </Link>

                {/* Menu */}
                <div className="hidden md:flex gap-6 font-medium text-gray-700 dark:text-gray-200">
                    <Link href="#features" className="hover:text-black dark:hover:text-white transition">
                        Home
                    </Link>
                    <Link href="#about" className="hover:text-black dark:hover:text-white transition">
                        About
                    </Link>
                    <Link href="#contact" className="hover:text-black dark:hover:text-white transition">
                        CTA
                    </Link>
                </div>

                {/* CTA + Theme Toggle */}
                <div className="flex items-center gap-3">
                    <ThemeToggle />
                    {/*  <Link href="/get-started" className="px-4 py-2 text-sm rounded-md bg-black text-white dark:bg-white dark:text-black hover:opacity-90 transition">
                        Get Started
                    </Link> */}
                </div>
            </div>
        </nav>
    );
}

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // Untuk hindari hydration mismatch
    useEffect(() => setMounted(true), []);
    return (
        <div>
            {mounted && (
                <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="p-2 rounded-md border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer">
                    {theme === "dark" ? "🌞" : "🌙"}
                </button>
            )}
        </div>
    );
}
