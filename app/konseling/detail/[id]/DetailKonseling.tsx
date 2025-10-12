"use client";

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconTrendingUp, IconTrendingDown, IconUsers, IconChevronRight, IconSchool, IconChalkboard, IconUserShare, IconChartBar, IconChartPie, IconCloud, IconMoodEmpty, IconMessage, IconMessage2Plus, IconChevronLeft, IconCalendarTime, IconCircleX, IconFile, IconDownload, IconLocation } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ItemMedia, ItemContent, ItemTitle, ItemActions, Item, ItemDescription } from "@/components/ui/item";

import { BadgeCheckIcon, ChevronRightIcon, Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { useRouter } from "next/navigation";

interface DetailKonselingProps {
    id_konseling: string;
}

export default function DetailKonseling({ id_konseling }: DetailKonselingProps) {
    const connectionColor = "text-green-600 bg-green-100";
    return (
        <div>
            <div className="my-3 px-4 lg:px-6">
                <Card data-slot="card">
                    <CardHeader>
                        <div className="mb-2 flex items-center justify-between">
                            <Link href={"#"} onClick={() => history.back()}>
                                <Button>
                                    <IconChevronLeft />
                                </Button>
                            </Link>
                            <div className="flex flex-col items-end gap-0">
                                <CardTitle className="text-lg font-semibold">Detail Konseling</CardTitle>
                                <CardDescription className="text-sm text-muted-foreground">#{id_konseling}</CardDescription>
                            </div>
                        </div>
                        <Separator />
                    </CardHeader>

                    <CardContent className="flex flex-col gap-3">
                        {/* === Topik & Deskripsi === */}
                        <div>
                            <span className="font-semibold text-sm">Topik & Deskripsi</span>
                            <Separator className="my-2 border-t border-dashed border-gray-200" />
                            <div className="flex flex-col">
                                <span className="font-medium">Topik</span>
                                <span className="text-sm text-muted-foreground">Deskripsi singkat topik</span>
                            </div>
                        </div>

                        {/* === Dosen Pembimbing === */}
                        <div>
                            <span className="font-semibold text-sm">Dosen Pembimbing</span>
                            <Separator className="my-2 border-t border-dashed border-gray-200" />

                            <Item variant="outline" size="sm" asChild>
                                <a href="#" className="block">
                                    <div className="w-full flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                                <AvatarFallback>JD</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="font-medium">Dr. John Doe, M.Pd</span>
                                                <span className="text-sm text-muted-foreground">12345678</span>
                                            </div>
                                        </div>
                                        <Badge>Akademik</Badge>
                                    </div>
                                </a>
                            </Item>
                        </div>

                        {/* === Waktu & Tempat === */}
                        <div>
                            <span className="font-semibold text-sm">Waktu & Tempat</span>
                            <Separator className="my-2 border-t border-dashed border-gray-200" />

                            <div className="w-full flex items-start justify-between text-sm">
                                <div className="flex flex-col items-start">
                                    <span>10 Oktober 2025</span>
                                    <span>13:00 - 14:00</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span>Online</span>
                                    <span className="flex items-center gap-1">
                                        <IconLocation className="size-4" /> Lokasi
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* === File / Attachments === */}
                        <div>
                            <span className="font-semibold text-sm">File / Attachments</span>
                            <Separator className="my-2 border-t border-dashed border-gray-200" />

                            {[1, 2, 3].map((_, i) => (
                                <Item key={i} variant="outline" size="sm" className="mb-2" asChild>
                                    <a href="#" className="block">
                                        <div className="w-full flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <IconFile className="size-4 text-muted-foreground" />
                                                <span className="text-sm">file{i + 1}.pdf</span>
                                            </div>
                                            <IconDownload className="size-4 text-muted-foreground" />
                                        </div>
                                    </a>
                                </Item>
                            ))}
                        </div>

                        {/* === Status & Aksi === */}
                        <Separator className="my-3 border-t border-dashed border-gray-200" />

                        <span className={`text-md font-medium text-center rounded-md py-3 ${connectionColor}`}>Diajukan</span>

                        <Separator className="my-3 border-t border-gray-200" />

                        <div className="flex flex-col gap-2">
                            <Button className="w-full" size="lg">
                                Ruang Konseling
                                <ChevronRightIcon className="ml-2 size-5" />
                            </Button>
                            <Button className="w-full" variant="destructive" size="lg">
                                <IconCircleX className="mr-2 size-5" />
                                Batalkan
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
