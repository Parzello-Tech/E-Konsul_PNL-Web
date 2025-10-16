"use client";

// app/page.tsx
import Image from "next/image";
import Link from "next/link";
import { Warna } from "./component/Configuration";
import { FileText, CalendarCheck, Smartphone, Users, MessageCircle, ArrowRightIcon } from "lucide-react";

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { RainbowButton } from "@/components/magicui/rainbow-button";
import { ScrollProgress } from "@/components/magicui/scroll-progress";
import { Safari } from "@/components/magicui/safari";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { cn } from "@/lib/utils";
import { ProgressiveBlur } from "@/components/magicui/progressive-blur";
import { Footer } from "./component/Footer";
import { Navbar } from "./component/Navbar";
import { BASE_URL } from "@/backend/api";
import router from "next/router";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";

export default function Home() {
    return (
        <div className="">
            <Navbar />
            <div className=" font-sans flex flex-col min-h-screen bg-background dark:bg-[#140205ff]">
                <ScrollProgress className="top-[72px]" />
                {/* Hero Section */}
                <section id="home" className="flex flex-col items-center justify-center text-center py-20 px-6 bg-gradient-to-b from-background to-violet-50 dark:to-[#140205ff]">
                    {/* Shiny */}
                    <div className=" flex items-center justify-center">
                        <div className={cn("group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800")}>
                            <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                                <span>✨ Introducing E-Konsul PNL</span>
                                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
                            </AnimatedShinyText>
                        </div>
                    </div>
                    {/* Shiny */}
                    <div className="my-2"></div>
                    {/* <Image src="/images/logo_poltek.png" alt="E-Konsul Logo" width={120} height={120} priority className="mb-6" /> */}
                    <SparklesText className="mb-6">
                        <span style={{ color: Warna.brand.primary }}>E-Konsul App</span>
                    </SparklesText>
                    <p className="leading-7 [&:not(:first-child)]:mt-0 mb-8 max-w-2xl text-foreground/80">Platform digital untuk memudahkan mahasiswa dan dosen dalam melakukan bimbingan akademik secara terstruktur, efisien, dan terdokumentasi.</p>
                    <div className="flex gap-4 flex-col sm:flex-row">
                        <RainbowButton size={"lg"} className="text-lg py-5">
                            <Link href="/login"> Masuk ke Dashboard</Link>
                        </RainbowButton>
                        <RainbowButton size={"lg"} variant={"outline"} className="text-lg py-5">
                            Download Mobile v.1.0 (Terbaru)
                        </RainbowButton>
                    </div>
                    <div className="my-10"></div>

                    <div className="relative">
                        <div className=""></div>
                        <Safari url="ekonsul" mode="default" className="size-full shadow-lg " imageSrc={`/images/web_showcase.png`} />
                    </div>
                </section>

                <section className="bg-foreground dark:bg-[#370b0bff] relative w-full overflow-hidden py-6">
                    {/* Background Blur Layer */}
                    <div className="absolute inset-0 bg-foreground dark:bg-[#370b0bff] opacity-5 backdrop-blur-md" />

                    {/* Running Text */}
                    <motion.div animate={{ x: ["0%", "-100%"] }} transition={{ repeat: Infinity, duration: 20, ease: "linear" }} className="flex whitespace-nowrap relative">
                        <p className="text-1xl font-bold bg-clip-text text-white dark:text-[#ffbcbcff] px-8">🎓 Konsultasi Akademik · 📅 Penjadwalan Bimbingan · 📝 Dokumentasi Progres · 💬 Chat Mahasiswa & Dosen · 🔔 Notifikasi Real-time · 🌐 Akses Fleksibel · 📊 Riwayat Konsultasi</p>
                        <p className="text-1xl font-bold bg-clip-text text-white dark:text-[#ffbcbcff] px-8">🎓 Konsultasi Akademik · 📅 Penjadwalan Bimbingan · 📝 Dokumentasi Progres · 💬 Chat Mahasiswa & Dosen · 🔔 Notifikasi Real-time · 🌐 Akses Fleksibel · 📊 Riwayat Konsultasi</p>
                        <p className="text-1xl font-bold bg-clip-text text-white dark:text-[#ffbcbcff] px-8">🎓 Konsultasi Akademik · 📅 Penjadwalan Bimbingan · 📝 Dokumentasi Progres · 💬 Chat Mahasiswa & Dosen · 🔔 Notifikasi Real-time · 🌐 Akses Fleksibel · 📊 Riwayat Konsultasi</p>
                    </motion.div>
                </section>

                <div className="md:px-40 mt-20 mb-10">
                    {/* Features Section */}
                    <section id="features" className="container mx-auto py-10 px-6 grid gap-8 sm:grid-cols-3">
                        {[
                            {
                                icon: FileText,
                                title: "Mudah Digunakan",
                                desc: "Mahasiswa dan dosen dapat memulai sesi konsultasi hanya dengan beberapa klik.",
                            },
                            {
                                icon: CalendarCheck,
                                title: "Terintegrasi Akademik",
                                desc: "Dukungan jadwal, topik bimbingan, serta riwayat konsultasi dalam satu aplikasi.",
                            },
                            {
                                icon: Smartphone,
                                title: "Akses Fleksibel",
                                desc: "Gunakan E-Konsul di perangkat apapun, kapan saja, dengan pengalaman yang konsisten.",
                            },
                        ].map((item, i) => (
                            <Card key={i} className="rounded-2xl backdrop-blur-md bg-background/50 shadow-none dark:bg-[#370b0bff]/30">
                                <CardHeader className="flex flex-col items-center text-center">
                                    <item.icon className="w-10 h-10 mb-4 text-[#C7103B]" />
                                    <CardTitle className="text-xl">{item.title}</CardTitle>
                                    <CardDescription>{item.desc}</CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </section>

                    {/* How It Works Section */}
                    <section className="  py-10 px-6">
                        <div className="container mx-auto text-center">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Bagaimana Cara Kerja E-Konsul?</h2>
                            <p className="text-foreground/60 max-w-2xl mx-auto mb-12">Proses bimbingan akademik menjadi lebih terstruktur dan mudah diikuti oleh mahasiswa maupun dosen.</p>
                            <div className="grid gap-8 sm:grid-cols-3">
                                {[
                                    {
                                        icon: Users,
                                        title: "Daftar & Login",
                                        desc: "Mahasiswa dan dosen masuk menggunakan akun kampus untuk keamanan data.",
                                    },
                                    {
                                        icon: CalendarCheck,
                                        title: "Buat Jadwal",
                                        desc: "Mahasiswa dapat mengajukan jadwal konsultasi, dan dosen dapat mengonfirmasi.",
                                    },
                                    {
                                        icon: MessageCircle,
                                        title: "Konsultasi & Dokumentasi",
                                        desc: "Diskusi dilakukan melalui aplikasi dan tersimpan otomatis sebagai riwayat.",
                                    },
                                ].map((step, i) => (
                                    <Card key={i} className="rounded-2xl backdrop-blur-md bg-background/50 shadow-none dark:bg-[#370b0bff]/30">
                                        <CardHeader className="flex flex-col items-center text-center">
                                            <step.icon className="w-10 h-10 mb-4" style={{ color: Warna.brand.primary }} />
                                            <CardTitle className="text-xl">{step.title}</CardTitle>
                                            <CardDescription>{step.desc}</CardDescription>
                                        </CardHeader>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Testimonials Section */}
                    <section className="py-10 px-6 ">
                        <div className="container mx-auto text-center">
                            <h2 className="text-3xl sm:text-4xl font-bold mb-6">Apa Kata Mereka?</h2>
                            <p className="text-foreground/60 max-w-2xl mx-auto mb-12">E-Konsul telah membantu banyak mahasiswa dan dosen dalam proses bimbingan akademik.</p>
                            <div className="grid gap-8 sm:grid-cols-2">
                                <Card className="rounded-xl bg-white dark:bg-[#370b0bff]/30 border shadow-none">
                                    <CardContent className="p-6">
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">“Dengan E-Konsul, saya bisa lebih mudah menjadwalkan bimbingan tanpa harus bolak-balik ke kampus.”</p>
                                        <span className="font-semibold">– Mahasiswa Teknik Informatika</span>
                                    </CardContent>
                                </Card>

                                <Card className="rounded-xl bg-white dark:bg-[#370b0bff]/30 border shadow-none">
                                    <CardContent className="p-6">
                                        <p className="text-gray-700 dark:text-gray-300 mb-4">“Riwayat konsultasi mahasiswa tercatat rapi. Sangat membantu untuk memantau progres bimbingan.”</p>
                                        <span className="font-semibold">– Dosen Pembimbing</span>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>
                    {/* Call to Action */}
                    <section id="cta" className="bg-white dark:bg-[#370b0bff] mb-15 rounded-lg text-foreground py-16 text-center backdrop-blur-lg">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4">Siap Memulai Bimbingan Lebih Mudah?</h2>
                        <p className="text-foreground/50 mb-6">Gunakan E-Konsul untuk mendukung proses akademik Anda secara efektif dan efisien.</p>

                        <Button variant="outline" size={"lg"} className="px-6 py-3 font-medium">
                            Coba Sekarang
                        </Button>
                    </section>
                </div>
            </div>
            <Footer />
        </div>
    );
}
