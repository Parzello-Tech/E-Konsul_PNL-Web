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
    const [listDosen, setListDosen] = useState<{ id: string; nip: string; nama: string; prodi_id: string; profile_photo?: string }[]>([]);

    useEffect(() => {
        const user = getUserData();
        if (user) {
            setFormData((prev) => ({ ...prev, mahasiswa_id: user.profil.mahasiswa_id }));
        }

        /* fetchDosen(); */
        setListDosen([
            { id: "1", nip: "123456", nama: "Dr. Budi Santoso", prodi_id: "TI", profile_photo: "https://avatar.iran.liara.run/public/6" },
            { id: "2", nip: "654321", nama: "Prof. Siti Aminah", prodi_id: "SI", profile_photo: "https://avatar.iran.liara.run/public/6" },
            { id: "3", nip: "112233", nama: "Dr. Agus Salim", prodi_id: "TK", profile_photo: "https://avatar.iran.liara.run/public/6" },
        ]);
    }, []);

    const fetchDosen = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api_ekonsul/user/get_all_dosen.php`);
            const result = await res.json();

            if (result.status === "success") {
                setListDosen(result.data);
            } else {
                console.error("Gagal ambil dosen:", result.message);
            }
        } catch (error) {
            console.error("Error fetch dosen:", error);
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
                alert("Gagal: " + result.message);
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
                        {/* Dosen */}
                        <div>
                            <Label>Pilih Dosen Pembimbing</Label>
                            <Select onValueChange={(v) => setFormData((prev) => ({ ...prev, dosen_id: v }))}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Dosen Pembimbing" />
                                </SelectTrigger>
                                <SelectContent>
                                    {listDosen.map((dosen) => (
                                        <SelectItem key={dosen.id} value={dosen.id}>
                                            <div className="flex items-center gap-3">
                                                <img src={dosen.profile_photo} alt={dosen.nama} className="w-8 h-8 rounded-full object-cover border" />
                                                <span>{dosen.nama}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Tujuan */}
                        <div>
                            <Label>Tujuan Bimbingan</Label>
                            <Select onValueChange={(v) => setFormData((prev) => ({ ...prev, tujuan_konseling: v }))}>
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

                        <div>
                            <Label>Topik Bimbingan (Opsional)</Label>
                            <Input placeholder="Masukkan topik" onChange={(e) => setFormData((prev) => ({ ...prev, topik_konseling: e.target.value }))} />
                        </div>

                        <div>
                            <Label>Catatan (Opsional)</Label>
                            <Textarea placeholder="Tuliskan catatan..." onChange={(e) => setFormData((prev) => ({ ...prev, catatan: e.target.value }))} />
                        </div>

                        <Separator />

                        {/* Jenis Konseling */}
                        <div>
                            <Label>Jenis Konseling</Label>
                            <Select onValueChange={(v) => setFormData((prev) => ({ ...prev, jenis_konseling: v }))}>
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

                        <div>
                            <Label>Tanggal Konseling</Label>
                            <Input type="date" onChange={(e) => setFormData((prev) => ({ ...prev, tanggal_konseling: e.target.value }))} />
                        </div>

                        <div>
                            <Label>Waktu Mulai</Label>
                            <Input type="time" onChange={(e) => setFormData((prev) => ({ ...prev, waktu_mulai: e.target.value }))} />
                        </div>

                        <div className="flex items-center gap-3">
                            <Checkbox checked={aturSelesai} onCheckedChange={(v) => setAturSelesai(!!v)} />
                            <Label>Atur waktu selesai</Label>
                        </div>

                        {aturSelesai && (
                            <div>
                                <Label>Waktu Selesai</Label>
                                <Input type="time" onChange={(e) => setFormData((prev) => ({ ...prev, waktu_selesai: e.target.value }))} />
                            </div>
                        )}

                        <div className="pt-2">
                            <Button type="submit" size="lg" className="w-full" disabled={loading}>
                                {loading ? "Mengirim..." : "Ajukan Bimbingan"} <IconCalendarTime className="ml-2" />
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
