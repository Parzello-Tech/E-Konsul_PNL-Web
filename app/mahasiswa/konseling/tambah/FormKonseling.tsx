"use client";

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconTrendingUp, IconTrendingDown, IconUsers, IconChevronRight, IconSchool, IconChalkboard, IconUserShare, IconChartBar, IconChartPie, IconCloud, IconMoodEmpty, IconMessage, IconMessage2Plus, IconChevronLeft, IconCalendarTime } from "@tabler/icons-react";
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

export default function FormKonseling() {
    const router = useRouter();
    return (
        <div>
            <div className="my-3 px-4 lg:px-6">
                <Card data-slot="card">
                    <CardHeader>
                        <div className="mb-2 flex items-center justify-between">
                            <Link href={"/mahasiswa"}>
                                <Button>
                                    <IconChevronLeft />
                                </Button>
                            </Link>
                            <div className="flex items-center gap-2">
                                <IconMessage />
                                <CardTitle className="text-lg font-semibold">Ajukan Bimbingan</CardTitle>
                            </div>
                        </div>
                        <Separator />
                    </CardHeader>

                    <CardContent>
                        <form className="space-y-4">
                            {/* Dosen Pembimbing */}
                            <div className="">
                                <label htmlFor="pembimbing" className="text-sm font-medium">
                                    Pilih Dosen Pembimbing
                                </label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Dosen Pembimbing" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Dosen 1">Dosen 1</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Tujuan Bimbingan */}
                            <div className=" ">
                                <label htmlFor="tujuan" className="text-sm font-medium">
                                    Pilih Tujuan Bimbingan
                                </label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Tujuan Bimbingan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Bimbingan Tugas Akhir">Bimbingan Tugas Akhir</SelectItem>
                                        <SelectItem value="Bimbingan Akademik">Bimbingan Akademik</SelectItem>
                                        <SelectItem value="Bimbingan PKL">Bimbingan PKL</SelectItem>
                                        <SelectItem value="Lainnya">Lainnya</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Topik Bimbingan */}
                            <div className=" ">
                                <label htmlFor="topik" className="text-sm font-medium">
                                    Topik Bimbingan (Opsional)
                                </label>
                                <Input id="topik" placeholder="Masukkan topik bimbingan" />
                            </div>

                            {/* Catatan */}
                            <div className=" ">
                                <label htmlFor="catatan" className="text-sm font-medium">
                                    Catatan (Opsional)
                                </label>
                                <Textarea id="catatan" placeholder="Tuliskan catatan atau deskripsi singkat..." />
                            </div>

                            <Separator />

                            {/* Jenis Konseling */}
                            <div className=" ">
                                <label htmlFor="" className="text-sm font-medium">
                                    Jenis Konseling
                                </label>
                                <Select>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Jenis Konseling" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Ditentukan Dosen">Ditentukan Dosen</SelectItem>
                                        <SelectItem value="Offline">Offline</SelectItem>
                                        <SelectItem value="Online">Online</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Tanggal Konseling */}
                            <div className=" ">
                                <label htmlFor="tanggal" className="text-sm font-medium">
                                    Tanggal
                                </label>
                                <Input id="tanggal" type="date" />
                            </div>

                            {/* Waktu Mulai */}
                            <div className=" ">
                                <label htmlFor="waktumulai" className="text-sm font-medium">
                                    Waktu Mulai
                                </label>
                                <Input id="waktumulai" type="time" />
                            </div>

                            <div className="flex items-center gap-3">
                                <Checkbox id="setselesai" />
                                <Label htmlFor="setselesai">Atur waktu selesai</Label>
                            </div>

                            {/* Waktu Selesai */}
                            <div className=" ">
                                <label htmlFor="waktuselesai" className="text-sm font-medium">
                                    Waktu Selesai
                                </label>
                                <Input id="waktuselesai" type="time" />
                            </div>

                            {/* Tombol Simpan */}
                            <div className="pt-2">
                                <Button type="submit" size={"lg"} className="w-full">
                                    Ajukan Bimbingan <IconCalendarTime />
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
