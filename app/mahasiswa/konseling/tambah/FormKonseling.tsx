"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { IconCalendarTime, IconChevronLeft, IconMessage } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getUserData } from "@/backend/auth";
import { BASE_URL } from "@/backend/api";
import { getAllDosen } from "@/backend/DosenBackend";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function FormKonseling() {
    const router = useRouter();

    const [formData, setFormData] = useState({
        mahasiswa_id: "",
        dosen_id: "",
        tujuan_konseling: "",
        topik_konseling: "",
        catatan: "",
        jenis_konseling: "",
        tanggal_konseling: "",
        waktu_mulai: "",
        waktu_selesai: "",
    });

    const [aturSelesai, setAturSelesai] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listDosen, setListDosen] = useState<{ user_id: string; dosen_id: string; nip: string; nama: string; profile_photo?: string }[]>([]);

    useEffect(() => {
        const user = getUserData();
        if (user?.profil?.mahasiswa_id) {
            setFormData((prev) => ({
                ...prev,
                mahasiswa_id: user.profil.mahasiswa_id,
            }));
        }

        fetchDosen();
    }, []);

    const fetchDosen = async () => {
        setLoading(true);
        try {
            const result = await getAllDosen();

            if (!Array.isArray(result)) {
                console.error("Format data dosen tidak valid:", result);
                setListDosen([]);
                return;
            }

            // Filter hanya dosen yang valid
            const filtered = result.filter((d) => d && d.dosen_id && d.nip && d.nama && d.profile_photo);

            // Tambahkan pilihan default
            setListDosen([{ user_id: "", dosen_id: "", nip: "", nama: "Pilih Dosen Pembimbing", profile_photo: "" }, ...filtered]);
        } catch (err) {
            console.error("Gagal memuat data dosen:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/api_ekonsul/konseling/add_konseling.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const result = await res.json();

            if (result.status === "success") {
                alert("Konseling berhasil diajukan!");
                router.push("/mahasiswa");
            } else {
                alert("Gagal: " + (result.message || "Tidak diketahui"));
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Terjadi kesalahan koneksi.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="my-3 px-4 lg:px-6">
            <Card>
                <CardHeader>
                    <div className="mb-2 flex items-center justify-between">
                        <Link href={"/mahasiswa"}>
                            <Button variant="outline" size="icon">
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
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Pilih Dosen */}
                        <div>
                            <Label className="mb-2">Pilih Dosen Pembimbing</Label>
                            <Select onValueChange={(v) => setFormData((prev) => ({ ...prev, dosen_id: v }))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Dosen Pembimbing" />
                                </SelectTrigger>
                                <SelectContent>
                                    {listDosen.map((dosen) => (
                                        <SelectItem key={dosen.dosen_id} value={dosen.dosen_id || "none"}>
                                            <div className="flex items-center gap-3 my-1">
                                                <Avatar className="h-6 w-6">
                                                    <AvatarImage src={dosen.profile_photo || "https://avatar.iran.liara.run/public/6"} alt={dosen.nama} />
                                                    <AvatarFallback>
                                                        {dosen.nama
                                                            ?.split(" ")
                                                            .map((n) => n[0])
                                                            .join("")
                                                            .toUpperCase()
                                                            .slice(0, 2)}
                                                    </AvatarFallback>
                                                </Avatar>

                                                <div className="flex flex-col text-left">
                                                    <span className="font-medium">{dosen.nama}</span>
                                                    {dosen.nip && <span className="text-xs text-muted-foreground">NIP: {dosen.nip}</span>}
                                                </div>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Tujuan Konseling */}
                        <div>
                            <Label className="mb-2">Tujuan Bimbingan</Label>
                            <Select value={formData.tujuan_konseling} onValueChange={(v) => setFormData((prev) => ({ ...prev, tujuan_konseling: v }))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Tujuan Bimbingan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Bimbingan Tugas Akhir">Bimbingan Tugas Akhir</SelectItem>
                                    <SelectItem value="Bimbingan Akademik">Bimbingan Akademik</SelectItem>
                                    <SelectItem value="Bimbingan PKL">Bimbingan PKL</SelectItem>
                                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Topik & Catatan */}
                        <div>
                            <Label className="mb-2">Topik Bimbingan (Opsional)</Label>
                            <Input placeholder="Masukkan topik" value={formData.topik_konseling} onChange={(e) => setFormData((prev) => ({ ...prev, topik_konseling: e.target.value }))} />
                        </div>

                        <div>
                            <Label className="mb-2">Catatan (Opsional)</Label>
                            <Textarea placeholder="Tuliskan catatan..." value={formData.catatan} onChange={(e) => setFormData((prev) => ({ ...prev, catatan: e.target.value }))} />
                        </div>

                        <Separator />

                        {/* Jenis Konseling */}
                        <div>
                            <Label className="mb-2">Jenis Konseling</Label>
                            <Select value={formData.jenis_konseling} onValueChange={(v) => setFormData((prev) => ({ ...prev, jenis_konseling: v }))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Pilih Jenis Konseling" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Ditentukan Dosen">Ditentukan Dosen</SelectItem>
                                    <SelectItem value="Offline">Offline</SelectItem>
                                    <SelectItem value="Online">Online</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Tanggal & Waktu */}
                        <div>
                            <Label className="mb-2">Tanggal Konseling</Label>
                            <Input type="date" value={formData.tanggal_konseling} onChange={(e) => setFormData((prev) => ({ ...prev, tanggal_konseling: e.target.value }))} />
                        </div>

                        <div>
                            <Label className="mb-2">Waktu Mulai</Label>
                            <Input type="time" value={formData.waktu_mulai} onChange={(e) => setFormData((prev) => ({ ...prev, waktu_mulai: e.target.value }))} />
                        </div>

                        <div className="flex items-center gap-3 my-5">
                            <Checkbox checked={aturSelesai} onCheckedChange={(v) => setAturSelesai(Boolean(v))} />
                            <Label>Atur waktu selesai</Label>
                        </div>

                        {aturSelesai && (
                            <div>
                                <Label className="mb-2">Waktu Selesai</Label>
                                <Input type="time" value={formData.waktu_selesai} onChange={(e) => setFormData((prev) => ({ ...prev, waktu_selesai: e.target.value }))} />
                            </div>
                        )}

                        <div className="pt-2">
                            <Button type="submit" size="lg" className="w-full" disabled={loading}>
                                {loading ? "Mengirim..." : "Ajukan Bimbingan"}
                                <IconCalendarTime className="ml-2" />
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
