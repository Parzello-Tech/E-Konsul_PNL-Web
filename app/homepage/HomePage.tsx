"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IconUsers, IconChartBar, IconChartPie, IconMoodEmpty, IconMessage, IconMessage2Plus } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyMedia, EmptyTitle, EmptyDescription, EmptyContent } from "@/components/ui/empty";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUserData, isDosen, isMahasiswa } from "@/backend/auth";
import { getKonselingDosenID, getKonselingMahasiswaID } from "@/backend/KonselingBackend";
import BimbinganItemCard from "../component/app/BimbinganItemCard";
import { HeroCarousel } from "../component/app/Carousel";
import { Konseling } from "@/backend/interface";
import { getRelasiByDosenId, getRelasiByMahasiswaId } from "@/backend/RelasiBimbinganBackend";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";

export default function HomePage() {
    const [konselingList, setKonselingList] = useState<Konseling[]>([]);
    const [relasiList, setRelasiList] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const user = getUserData();
                if (!user) return;

                const response = isMahasiswa() ? await getKonselingMahasiswaID(user.profil.mahasiswa_id) : isDosen() ? await getKonselingDosenID(user.profil.dosen_id) : null;

                if (response && Array.isArray(response)) {
                    setKonselingList(response);
                } else {
                    setKonselingList([]);
                }
            } catch (err) {
                console.error("Gagal memuat data konseling:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();

        const fetchRelasi = async () => {
            const user = getUserData();
            try {
                if (isMahasiswa()) {
                    const data = await getRelasiByMahasiswaId(user.profil.mahasiswa_id);
                    setRelasiList(data);
                } else if (isDosen()) {
                    const data = await getRelasiByDosenId(user.profil.dosen_id);
                    setRelasiList(data);
                }
            } catch (err) {
                console.error("Gagal memuat relasi bimbingan:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchRelasi();
    }, []);

    // ✅ Filter status disesuaikan dengan status yang kamu gunakan
    const aktif = konselingList.filter((item) => {
        const status = item.status.trim().toLowerCase();
        return ["diajukan", "disetujui", "jadwal ulang"].includes(status);
    });

    const selesai = konselingList.filter((item) => {
        const status = item.status.trim().toLowerCase();
        return ["selesai", "dibatalkan", "ditolak"].includes(status);
    });

    return (
        <div>
            <div className="px-4 lg:px-6">
                <HeroCarousel />
            </div>

            <div className="my-7">
                <Separator />
            </div>

            <div className="my-3 px-4 lg:px-6">
                <Card>
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
                        {isMahasiswa() && (
                            <Link href="/homepage/konseling/tambah" className="w-full">
                                <Button variant="default" size="lg" className="w-full">
                                    Mulai Bimbingan <IconMessage2Plus className="ml-2" />
                                </Button>
                            </Link>
                        )}

                        <div className="my-3">
                            <Separator />
                        </div>

                        <Tabs defaultValue="aktif">
                            <TabsList>
                                <TabsTrigger value="aktif">Aktif</TabsTrigger>
                                <TabsTrigger value="selesai">Selesai</TabsTrigger>
                            </TabsList>

                            {/* === Tab Aktif === */}
                            <TabsContent value="aktif">
                                {loading ? (
                                    <p className="text-center text-sm text-muted-foreground p-4">Memuat data...</p>
                                ) : aktif.length > 0 ? (
                                    <ScrollArea className="h-75 rounded-md border">
                                        <div className="p-4 flex flex-col gap-2">
                                            {aktif.map((item) =>
                                                isMahasiswa() ? (
                                                    <BimbinganItemCard key={item.id_konseling} title={item.tujuan_konseling} subtitle={item.topik_konseling} name={item.dosen?.fullname ?? "Tidak diketahui"} no_induk={item.dosen?.nip ?? "-"} id={item.id_konseling.toString()} avatarUrl={item.dosen?.profile_photo ?? undefined} date={item.tanggal_konseling} waktu_mulai={item.waktu_mulai} waktu_selesai={item.waktu_selesai} statusConnection={item.jenis_konseling} statusActivity={item.status} />
                                                ) : isDosen() ? (
                                                    <BimbinganItemCard
                                                        key={item.id_konseling}
                                                        title={item.tujuan_konseling}
                                                        subtitle={item.topik_konseling}
                                                        name={item.mahasiswa?.fullname ?? "Tidak diketahui"}
                                                        no_induk={item.mahasiswa?.nim ?? "-"}
                                                        id={item.id_konseling.toString()}
                                                        avatarUrl={item.mahasiswa?.profile_photo ?? undefined}
                                                        date={item.tanggal_konseling}
                                                        waktu_mulai={item.waktu_mulai}
                                                        waktu_selesai={item.waktu_selesai}
                                                        statusConnection={item.jenis_konseling}
                                                        statusActivity={item.status}
                                                    />
                                                ) : null
                                            )}
                                        </div>
                                    </ScrollArea>
                                ) : (
                                    <Empty className="border border-dashed">
                                        <EmptyHeader>
                                            <EmptyMedia variant="icon">
                                                <IconMoodEmpty />
                                            </EmptyMedia>
                                            <EmptyTitle>Tidak ada Bimbingan aktif</EmptyTitle>
                                            <EmptyDescription>{isMahasiswa() && "Mulai bimbingan baru dengan dosen pembimbing Anda."}</EmptyDescription>
                                            <EmptyDescription>{isDosen() && "Permintaan bimbingan Mahasiswa akan muncul disini."}</EmptyDescription>
                                        </EmptyHeader>
                                    </Empty>
                                )}
                            </TabsContent>

                            {/* === Tab Selesai === */}
                            <TabsContent value="selesai">
                                {loading ? (
                                    <p className="text-center text-sm text-muted-foreground p-4">Memuat data...</p>
                                ) : selesai.length > 0 ? (
                                    <ScrollArea className="h-75 rounded-md border">
                                        <div className="p-4 flex flex-col gap-2">
                                            {selesai.map((item) =>
                                                isMahasiswa() ? (
                                                    <BimbinganItemCard key={item.id_konseling} title={item.tujuan_konseling} subtitle={item.topik_konseling} name={item.dosen?.fullname ?? "Tidak diketahui"} no_induk={item.dosen?.nip ?? "-"} id={item.id_konseling.toString()} avatarUrl={item.dosen?.profile_photo ?? undefined} date={item.tanggal_konseling} waktu_mulai={item.waktu_mulai} waktu_selesai={item.waktu_selesai} statusConnection={item.jenis_konseling} statusActivity={item.status} />
                                                ) : isDosen() ? (
                                                    <BimbinganItemCard
                                                        key={item.id_konseling}
                                                        title={item.tujuan_konseling}
                                                        subtitle={item.topik_konseling}
                                                        name={item.mahasiswa?.fullname ?? "Tidak diketahui"}
                                                        no_induk={item.mahasiswa?.nim ?? "-"}
                                                        id={item.id_konseling.toString()}
                                                        avatarUrl={item.mahasiswa?.profile_photo ?? undefined}
                                                        date={item.tanggal_konseling}
                                                        waktu_mulai={item.waktu_mulai}
                                                        waktu_selesai={item.waktu_selesai}
                                                        statusConnection={item.jenis_konseling}
                                                        statusActivity={item.status}
                                                    />
                                                ) : null
                                            )}
                                        </div>
                                    </ScrollArea>
                                ) : (
                                    <Empty className="border border-dashed">
                                        <EmptyHeader>
                                            <EmptyMedia variant="icon">
                                                <IconMoodEmpty />
                                            </EmptyMedia>
                                            <EmptyTitle>Belum ada Bimbingan Selesai</EmptyTitle>
                                            <EmptyDescription>Bimbingan selesai akan tampil di sini.</EmptyDescription>
                                        </EmptyHeader>
                                        <EmptyContent></EmptyContent>
                                    </Empty>
                                )}
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            {/* === Statistik dan Info Tambahan === */}
            <div className="my-5">
                <div className="grid grid-cols-1 gap-4 px-4 lg:px-6 md:grid-cols-3">
                    {/* Card 1 - Dosen Pembimbing */}
                    {loading ? (
                        <Card data-slot="card">
                            <CardHeader>
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <IconUsers />
                                        <CardTitle className="text-lg font-semibold">{isMahasiswa() ? "Dosen Pembimbing" : "Mahasiswa Bimbingan"}</CardTitle>
                                    </div>
                                </div>
                                <Separator />
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">Memuat data...</p>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card data-slot="card">
                            <CardHeader>
                                <div className="mb-2 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <IconUsers />
                                        {isMahasiswa() && <CardTitle className="text-lg font-semibold">Dosen Pembimbing</CardTitle>}
                                        {isDosen() && <CardTitle className="text-lg font-semibold">Mahasiswa Bimbingan</CardTitle>}
                                    </div>
                                    {relasiList.length > 0 && <Badge>{relasiList.length}</Badge>}
                                </div>
                                <Separator />
                            </CardHeader>

                            <CardContent>
                                <ScrollArea className="h-50 p-3 rounded-md border whitespace-nowrap">
                                    {relasiList.length > 0 ? (
                                        <div className="space-y-3">
                                            {isMahasiswa() &&
                                                relasiList.map((item, i) => (
                                                    <Item variant="outline" key={i}>
                                                        <ItemContent>
                                                            <div className="flex item-center gap-3">
                                                                <Avatar>
                                                                    <AvatarImage src={item.dosen?.foto ?? ""} />
                                                                    <AvatarFallback>{item.nama_dosen?.[0] ?? "D"}</AvatarFallback>
                                                                </Avatar>
                                                                <div className="">
                                                                    <ItemTitle>{item.nama_dosen ?? "Tidak diketahui"}</ItemTitle>
                                                                    <ItemDescription>{item.nip ?? "-"}.</ItemDescription>
                                                                    <Badge className="mt-1">{item.tipe_bimbingan}</Badge>
                                                                </div>
                                                            </div>
                                                        </ItemContent>
                                                        <ItemActions className="w-full">
                                                            <Button variant="outline" size="sm" className="w-full">
                                                                Lihat Profil
                                                            </Button>
                                                        </ItemActions>
                                                    </Item>
                                                ))}

                                            {isDosen() &&
                                                relasiList.map((item, i) => (
                                                    <Item variant="outline" key={i}>
                                                        <ItemContent>
                                                            <div className="flex item-center gap-3">
                                                                <Avatar>
                                                                    <AvatarImage src={item.mahasiswa?.foto ?? ""} />
                                                                    <AvatarFallback>{item.nama_mahasiswa?.[0] ?? "D"}</AvatarFallback>
                                                                </Avatar>
                                                                <div className="">
                                                                    <ItemTitle>{item.nama_mahasiswa ?? "Tidak diketahui"}</ItemTitle>
                                                                    <ItemDescription>{item.nim ?? "-"}.</ItemDescription>
                                                                    <Badge className="mt-1">{item.tipe_bimbingan}</Badge>
                                                                </div>
                                                            </div>
                                                        </ItemContent>
                                                        <ItemActions className="w-full">
                                                            <Button variant="outline" size="sm" className="w-full">
                                                                Lihat Profil
                                                            </Button>
                                                        </ItemActions>
                                                    </Item>
                                                ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-muted-foreground">
                                            {isMahasiswa() && "Belum ada Dosen Pembimbing terdaftar."}
                                            {isDosen() && "Belum ada Mahasiswa Bimbingan terdaftar."}
                                        </p>
                                    )}
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    )}

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
                                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{konselingList.length}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-orange-400">Aktif</p>
                                    <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">{aktif.length}</p>
                                </div>
                                <div className="border-l">
                                    <p className="text-sm text-green-400">Selesai</p>
                                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">{selesai.length}</p>
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
                                    <p className="text-lg font-bold text-primary">{konselingList.length ? Math.round((selesai.length / konselingList.length) * 100) : 0}%</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
