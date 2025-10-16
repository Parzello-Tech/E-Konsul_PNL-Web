"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { IconChevronLeft, IconCircleX, IconFile, IconDownload, IconLocation, IconX, IconRating12Plus, IconStar, IconCheck, IconCalendar } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Item } from "@/components/ui/item";
import { ChevronRightIcon, Icon } from "lucide-react";
import { getKonselingById, setKonselingStatus } from "@/backend/KonselingBackend";
import { getUserData, isDosen, isMahasiswa } from "@/backend/auth";
import { Konseling } from "@/backend/interface";
import { ConfirmDialog } from "@/app/component/app/ConfirmDialog";
import KonselingActions from "@/app/component/app/konseling/KonselingAction";
import { toast } from "sonner";

interface DetailKonselingProps {
    id_konseling: string;
}

function isToday(dateString?: string | null) {
    if (!dateString) return false;
    const today = new Date().toISOString().split("T")[0];
    const date = new Date(dateString).toISOString().split("T")[0];
    return today === date || today > date;
}

export default function DetailKonseling({ id_konseling }: DetailKonselingProps) {
    const [data, setData] = useState<Konseling | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getKonselingById(id_konseling);
                if (result?.data) {
                    setData(result.data);
                } else {
                    console.error("Data tidak ditemukan:", result);
                }
            } catch (err) {
                console.error("Gagal memuat data konseling:", err);
            } finally {
                setLoading(false);
            }
        };

        if (id_konseling) fetchData();
    }, [id_konseling]);

    if (loading) return <div className="flex items-center justify-center h-40 text-muted-foreground">Memuat detail konseling...</div>;

    if (!data)
        return (
            <div className="flex flex-col items-center justify-center gap-3 text-muted-foreground">
                Data tidak ditemukan.{" "}
                <Button variant="default" onClick={() => history.back()}>
                    <IconChevronLeft /> Kembali
                </Button>
            </div>
        );

    return (
        <div className="my-3 px-4 lg:px-6">
            <Card>
                <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                        <Button size="icon" variant="outline" onClick={() => history.back()}>
                            <IconChevronLeft />
                        </Button>
                        <div className="flex flex-col items-end gap-0">
                            <CardTitle className="text-lg font-semibold">Detail Konseling</CardTitle>
                            <CardDescription className="text-sm text-muted-foreground">#{data.id_konseling}</CardDescription>
                        </div>
                    </div>
                    <Separator />
                </CardHeader>

                <CardContent className="flex flex-col gap-4">
                    {/* === Topik & Deskripsi === */}
                    <section>
                        <span className="font-semibold text-sm">Judul & Deskripsi</span>
                        <Separator className="my-2 border-t border-dashed border-gray-200" />
                        <div className="flex justify-between items-center gap-4">
                            <div className="flex flex-col">
                                <span className="text-sm font-medium">{data.topik_konseling || "-"}</span>
                                <span className="text-sm text-muted-foreground">{data.catatan || "-"}</span>
                            </div>
                            <Badge variant="outline">{data.tujuan_konseling}</Badge>
                        </div>
                    </section>
                    {/* === Dosen Pembimbing === */}
                    <section>
                        <span className="font-semibold text-sm">Dosen Pembimbing</span>
                        <Separator className="my-2 border-t border-dashed border-gray-200" />

                        <Item variant="outline" size="sm" asChild>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${data.dosen?.fullname || "Dosen"}`} alt="Dosen" />
                                        <AvatarFallback>
                                            {data.dosen?.fullname
                                                ? data.dosen.fullname
                                                      .split(" ")
                                                      .map((n) => n[0])
                                                      .join("")
                                                : "DS"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{data.dosen?.fullname || "-"}</span>
                                        <span className="text-sm text-muted-foreground">{data.dosen?.nip || "-"}</span>
                                    </div>
                                </div>
                                <Badge variant="outline">Pembimbing</Badge>
                            </div>
                        </Item>
                    </section>
                    {/* === Mahasiswa === */}
                    <section>
                        <span className="font-semibold text-sm">Mahasiswa</span>
                        <Separator className="my-2 border-t border-dashed border-gray-200" />

                        <Item variant="outline" size="sm" asChild>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3">
                                    <Avatar>
                                        <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${data.mahasiswa?.fullname || "Mahasiswa"}`} alt="Mahasiswa" />
                                        <AvatarFallback>
                                            {data.mahasiswa?.fullname
                                                ? data.mahasiswa.fullname
                                                      .split(" ")
                                                      .map((n) => n[0])
                                                      .join("")
                                                : "MH"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex flex-col">
                                        <span className="font-medium">{data.mahasiswa?.fullname || "-"}</span>
                                        <span className="text-sm text-muted-foreground">{data.mahasiswa?.nim || "-"}</span>
                                    </div>
                                </div>
                            </div>
                        </Item>
                    </section>
                    {/* === Waktu === */}
                    <section>
                        <span className="font-semibold text-sm">Tanggal Konseling</span>
                        <Separator className="my-2 border-t border-dashed border-gray-200" />
                        <div className="flex flex-col">
                            <span className="font-medium">
                                {data.tanggal_konseling
                                    ? new Date(data.tanggal_konseling).toLocaleDateString("id-ID", {
                                          day: "2-digit",
                                          month: "long",
                                          year: "numeric",
                                      })
                                    : "-"}
                            </span>
                            <span className="text-sm text-muted-foreground">
                                {data.waktu_mulai} - {data.waktu_selesai}
                            </span>
                        </div>
                    </section>
                    {/* === Lampiran === */}
                    {data.lampiran && (
                        <section>
                            <span className="font-semibold text-sm">Lampiran</span>
                            <Separator className="my-2 border-t border-dashed border-gray-200" />
                            <Item variant="outline" size="sm" asChild>
                                <a href={data.lampiran} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-3">
                                        <IconFile className="size-4 text-muted-foreground" />
                                        <span className="text-sm truncate max-w-[180px]">{data.lampiran.split("/").pop()}</span>
                                    </div>
                                    <IconDownload className="size-4 text-muted-foreground" />
                                </a>
                            </Item>
                        </section>
                    )}
                    {/* === Status === */}
                    <section>
                        <Separator className="my-3 border-t border-dashed border-gray-200" />
                        {(() => {
                            const statusInfo = getStatusStyle(data.status, data.tanggal_konseling);
                            return <span className={`text-md font-medium text-center rounded-md py-3 block ${statusInfo.className}`}>{statusInfo.label}</span>;
                        })()}
                    </section>
                    {/* === Aksi === */}
                    <KonselingActions data={data} isMahasiswa={isMahasiswa} isDosen={isDosen} handleStatus={handleStatus} />
                </CardContent>
            </Card>
        </div>
    );
}

function getStatusStyle(status: string, tanggal?: string | null) {
    const today = new Date().toISOString().split("T")[0];
    const date = tanggal ? new Date(tanggal).toISOString().split("T")[0] : null;

    // Jika tanggal sama dengan hari ini → "Berlangsung"
    if (date === today) {
        return {
            label: "Berlangsung",
            className: "bg-emerald-100 text-emerald-700",
        };
    }

    switch (status) {
        case "Diajukan":
            return { label: "Diajukan", className: "bg-yellow-100 text-yellow-700" };
        case "Disetujui":
            return { label: "Disetujui", className: "bg-green-100 text-green-700" };
        case "Ditolak":
            return { label: "Ditolak", className: "bg-red-100 text-red-700" };
        case "Dibatalkan":
            return { label: "Dibatalkan", className: "bg-gray-200 text-gray-700" };
        case "Selesai":
            return { label: "Selesai", className: "bg-blue-100 text-blue-700" };
        default:
            return { label: status || "-", className: "bg-muted text-muted-foreground" };
    }
}

/* HANDLE */
async function handleStatus(id_konseling: string, status: string) {
    const user = getUserData();
    if (!user) {
        toast.error("Silakan login terlebih dahulu.");
        return;
    }

    // Tampilkan loading toast
    const toastId = toast.loading("Memperbarui status konseling...");

    try {
        const res = await setKonselingStatus(id_konseling, status, user.user_id, user.role_id);

        if (res.success) {
            toast.success(`Status berhasil diubah menjadi "${status}"`, {
                id: toastId,
            });

            // reload dengan delay agar toast sempat tampil
            setTimeout(() => window.location.reload(), 1500);
        } else {
            toast.error(res.message || "Gagal memperbarui status.", {
                id: toastId,
            });
        }
    } catch (error) {
        toast.error("Terjadi kesalahan jaringan.", { id: toastId });
    }
}
