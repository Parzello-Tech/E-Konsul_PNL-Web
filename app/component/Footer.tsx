"use client";

import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t mt-auto dark:bg-[#140205ff]">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-6 text-foreground">
                <p className="text-sm">&copy; {new Date().getFullYear()} MyApp. All rights reserved.</p>
                <div className="flex gap-4 text-sm mt-4 md:mt-0">
                    <a href="#" className="hover:underline">
                        Privacy
                    </a>
                    <a href="#" className="hover:underline">
                        Terms
                    </a>
                </div>
            </div>
        </footer>
    );
}
