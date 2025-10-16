"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { ChevronRightIcon } from "lucide-react";
import { IconCalendar, IconCheck, IconCircleX, IconStar, IconX } from "@tabler/icons-react";
import { ConfirmDialog } from "../ConfirmDialog";

interface KonselingActionsProps {
    data: any;
    isMahasiswa: () => boolean;
    isDosen: () => boolean;
    handleStatus: (id: string, status: string) => void;
}
function isToday(dateString?: string | null) {
    if (!dateString) return false;
    const today = new Date().toISOString().split("T")[0];
    const date = new Date(dateString).toISOString().split("T")[0];
    return today === date || today > date;
}

export default function KonselingActions({ data, isMahasiswa, isDosen, handleStatus }: KonselingActionsProps) {
    const status = data.status;
    const today = isToday(data.tanggal_konseling);

    return (
        <>
            <Separator className="my-3 border-t border-gray-200" />
            <div className="flex flex-col gap-2">
                {(() => {
                    // === Diajukan ===
                    if (status === "Diajukan" && isMahasiswa()) {
                        return (
                            <ConfirmDialog
                                title="Batalkan Konseling"
                                description="Apakah Anda yakin ingin membatalkan konseling ini?"
                                confirmText="Ya, Batalkan"
                                cancelText="Batal"
                                onConfirm={() => handleStatus(data.id_konseling.toString(), "Dibatalkan")}
                                trigger={
                                    <Button className="w-full" variant="destructive" size="lg">
                                        <IconCircleX className="mr-2 size-5" />
                                        Batalkan
                                    </Button>
                                }
                            />
                        );
                    }

                    if (status === "Diajukan" && isDosen()) {
                        return (
                            <div className="flex flex-col gap-2">
                                <Button onClick={() => handleStatus(data.id_konseling.toString(), "Disetujui")} className="w-full" variant="default" size="lg">
                                    <IconCheck className="mr-2 size-5" />
                                    Setujui
                                </Button>
                                <Button onClick={() => handleStatus(data.id_konseling.toString(), "Jadwal Ulang")} className="w-full" variant="outline" size="lg">
                                    <IconCalendar className="mr-2 size-5" />
                                    Jadwalkan Ulang
                                </Button>
                                <Button onClick={() => handleStatus(data.id_konseling.toString(), "Ditolak")} className="w-full" variant="destructive" size="lg">
                                    <IconCircleX className="mr-2 size-5" />
                                    Tolak
                                </Button>
                            </div>
                        );
                    }

                    // === Disetujui ===
                    if (status === "Disetujui") {
                        // Jika hari ini adalah jadwal konseling (today == true)
                        if (today) {
                            return (
                                <Button className="w-full" size="lg">
                                    Ruang Konseling
                                    <ChevronRightIcon className="ml-2 size-5" />
                                </Button>
                            );
                        }

                        // Jika pengguna adalah mahasiswa
                        if (isMahasiswa()) {
                            return (
                                <Button className="w-full" size="lg">
                                    Ruang Konseling
                                    <ChevronRightIcon className="ml-2 size-5" />
                                </Button>
                            );
                        }

                        // Jika pengguna adalah dosen
                        if (isDosen()) {
                            return (
                                <div className="flex flex-col gap-2">
                                    <Button className="w-full" size="lg">
                                        Ruang Konseling
                                        <ChevronRightIcon className="ml-2 size-5" />
                                    </Button>
                                    <Button onClick={() => handleStatus(data.id_konseling.toString(), "Diajukan")} className="w-full" variant="destructive" size="lg">
                                        <IconCircleX className="mr-2 size-5" />
                                        Batalkan
                                    </Button>
                                </div>
                            );
                        }
                    }

                    // === Berlangsung (hari ini) ===
                    if (status === "Berlangsung" || (status === "Disetujui" && today)) {
                        return (
                            <div className="flex flex-col gap-2">
                                <Button className="w-full" size="lg">
                                    Ruang Konseling
                                    <ChevronRightIcon className="ml-2 size-5" />
                                </Button>

                                <Button onClick={() => handleStatus(data.id_konseling.toString(), "Diajukan")} className="w-full" variant="destructive" size="lg">
                                    <IconCircleX className="mr-2 size-5" />
                                    Batalkan
                                </Button>
                            </div>
                        );
                    }

                    // === Jadwal Ulang ===
                    if (status === "Jadwal Ulang" && isMahasiswa()) {
                        return (
                            <div className="flex flex-col gap-2">
                                <Button className="w-full" size="lg">
                                    Terima Penjadwalan Ulang
                                    <IconCheck className="ml-2 size-5" />
                                </Button>
                                <Button className="w-full" variant="outline" size="lg">
                                    Jadwalkan Kembali
                                    <IconCalendar className="ml-2 size-5" />
                                </Button>
                            </div>
                        );
                    }

                    // === Selesai ===
                    if (status === "Selesai" && isMahasiswa()) {
                        return (
                            <Button className="w-full" variant="default" size="lg">
                                <IconStar className="mr-2 size-5" />
                                Beri Ulasan
                            </Button>
                        );
                    }

                    // === Dibatalkan / Ditolak ===
                    if (status === "Dibatalkan" || status === "Ditolak") {
                        return (
                            <Button className="w-full" variant="secondary" disabled size="lg">
                                <IconX className="mr-2 size-5" />
                                {status}
                            </Button>
                        );
                    }

                    return null;
                })()}
            </div>
        </>
    );
}
