import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "./component/Navbar";
import { Footer } from "./component/Footer";
import { ThemeProvider } from "./provider";
import { Toaster } from "sonner";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Landing Page | MyApp",
    description: "Modern landing page built with Next.js + TailwindCSS",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased flex min-h-screen flex-col`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <main className="flex-1 ">{children}</main>
                </ThemeProvider>
                <Toaster richColors closeButton position="top-right" />
            </body>
        </html>
    );
}
