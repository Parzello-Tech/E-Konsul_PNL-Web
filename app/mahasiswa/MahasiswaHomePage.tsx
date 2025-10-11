import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconTrendingUp, IconTrendingDown, IconUsers, IconChevronRight, IconSchool, IconChalkboard, IconUserShare, IconChartBar, IconChartPie, IconCloud, IconMoodEmpty, IconMessage, IconMessage2Plus } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartAreaInteractive } from "../component/app/chart-area-interactive";
import { HeroCarousel } from "../component/app/Carousel";
import { Separator } from "@/components/ui/separator";
import { ItemMedia, ItemContent, ItemTitle, ItemActions, Item, ItemDescription } from "@/components/ui/item";

import { BadgeCheckIcon, ChevronRightIcon, Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Link from "next/link";
import BimbinganItemCard from "../component/app/BimbinganItemCard";

export default function MahasiswaHomePage() {
    return (
        <div>
            <div className="px-4 lg:px-6">
                <HeroCarousel />
            </div>
            <div className="my-7">
                <Separator />
            </div>

            <div className="my-3 px-4 lg:px-6">
                <Card data-slot="card">
                    <CardHeader>
                        <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <IconMessage />
                                <CardTitle className="text-lg font-semibold">Konseling Anda</CardTitle>
                            </div>
                        </div>
                        <Separator />
                    </CardHeader>
                    <CardContent>
                        <Link href="/mahasiswa/konseling/tambah" className="w-full">
                            <Button variant="default" size="lg" className="w-full">
                                Mulai Bimbingan <IconMessage2Plus className="ml-2" />
                            </Button>
                        </Link>
                        <div className="my-3">
                            <Separator />
                        </div>
                        <Tabs defaultValue="aktif" className="">
                            <TabsList>
                                <TabsTrigger value="aktif">Aktif</TabsTrigger>
                                <TabsTrigger value="selesai">Selesai</TabsTrigger>
                            </TabsList>
                            <TabsContent value="aktif">
                                <ScrollArea className="h-75 rounded-md border">
                                    <div className="p-4 flex flex-col gap-2">
                                        <BimbinganItemCard title="Konseling Akademik" subtitle="Semester Ganjil 2025" name="Muhammad Kholis" id="2022573010098" avatarUrl="https://avatars.githubusercontent.com/u/51697492?v=4&size=64" date="10 Okt 2025" time="19:45 WIB" statusConnection="Online" statusActivity="Berlangsung" />
                                        <BimbinganItemCard title="Konseling Akademik" subtitle="Semester Ganjil 2025" name="Muhammad Kholis" id="2022573010098" avatarUrl="https://avatars.githubusercontent.com/u/51697492?v=4&size=64" date="10 Okt 2025" time="19:45 WIB" statusConnection="Online" statusActivity="Berlangsung" />
                                        <BimbinganItemCard title="Konseling Akademik" subtitle="Semester Ganjil 2025" name="Muhammad Kholis" id="2022573010098" avatarUrl="https://avatars.githubusercontent.com/u/51697492?v=4&size=64" date="10 Okt 2025" time="19:45 WIB" statusConnection="Online" statusActivity="Berlangsung" />
                                    </div>
                                </ScrollArea>
                            </TabsContent>
                            <TabsContent value="selesai">
                                <Empty className="border border-dashed">
                                    <EmptyHeader>
                                        <EmptyMedia variant="icon">
                                            <IconMoodEmpty />
                                        </EmptyMedia>
                                        <EmptyTitle>Belum ada Bimbingan</EmptyTitle>
                                        <EmptyDescription>Mulai konseling sekarang dan dapatkan dukungan dari dosen.</EmptyDescription>
                                    </EmptyHeader>
                                    <EmptyContent>
                                        <Link href="/mahasiswa/konseling/tambah">
                                            <Button variant="default" size="lg">
                                                Mulai Bimbingan
                                            </Button>
                                        </Link>
                                    </EmptyContent>
                                </Empty>
                            </TabsContent>
                        </Tabs>

                        <div className="my-3">
                            <Separator />
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="my-5">
                <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 md:grid-cols-3">
                    {/* Card 1 */}
                    <Card data-slot="card">
                        <CardHeader>
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <IconUsers />
                                    <CardTitle className="text-lg font-semibold">Dosen Pembimbing</CardTitle>
                                </div>
                            </div>
                            <Separator />
                        </CardHeader>
                        <CardContent>
                            <Item variant="outline" size="sm" asChild>
                                <a href="#">
                                    <ItemMedia>
                                        <Avatar>
                                            <AvatarImage src="https://avatars.githubusercontent.com/u/51697492?v=4&size=64" alt="@shadcn" />
                                            <AvatarFallback>MK</AvatarFallback>
                                        </Avatar>
                                    </ItemMedia>
                                    <ItemContent>
                                        <ItemTitle>Muhammad Kholis</ItemTitle>
                                        <ItemDescription>2022573010098</ItemDescription>
                                    </ItemContent>
                                    <ItemActions>
                                        <ChevronRightIcon className="size-4" />
                                    </ItemActions>
                                </a>
                            </Item>
                        </CardContent>
                    </Card>

                    {/* Card 2 - Statistik Konsultasi */}
                    <Card data-slot="card">
                        <CardHeader>
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <IconChartBar />
                                    <CardTitle className="text-lg font-semibold">Statistik Konsultasi</CardTitle>
                                </div>
                            </div>
                            <Separator />
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-3 gap-4 text-center">
                                <div className="border-r">
                                    <p className="text-sm text-blue-400">Total</p>
                                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">20</p>
                                </div>
                                <div>
                                    <p className="text-sm text-orange-400">Aktif</p>
                                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">5</p>
                                </div>
                                <div className="border-l">
                                    <p className="text-sm text-green-400">Selesai</p>
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">13</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Card 3 - Distribusi Konsultasi */}
                    <Card data-slot="card">
                        <CardHeader>
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <IconChartPie />
                                    <CardTitle className="text-lg font-semibold">Distribusi Konsultasi</CardTitle>
                                </div>
                            </div>
                            <Separator />
                        </CardHeader>
                        <CardContent>
                            <div className="relative h-40 flex items-center justify-center">
                                <div className="size-28 rounded-full border-8 border-primary/30 border-t-primary animate-spin-slow"></div>
                                <div className="absolute text-center">
                                    <p className="text-xs text-muted-foreground">Selesai</p>
                                    <p className="text-lg font-bold text-primary">72%</p>
                                </div>
                            </div>
                            <div className="mt-3 grid grid-cols-2 gap-2 text-sm items-center justify-center">
                                <div className="flex items-center gap-2">
                                    <span className="size-3 rounded-full bg-primary/80"></span>
                                    <span>Selesai (72%)</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="size-3 rounded-full bg-muted-foreground/40"></span>
                                    <span>Aktif (28%)</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
