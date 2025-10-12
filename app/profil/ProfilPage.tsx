"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IconPencil, IconCheck, IconX } from "@tabler/icons-react";
import { getUserData, isLoggedIn } from "@/backend/auth";
import { BASE_URL } from "@/backend/api";

interface UserProfile {
    user_id: number;
    role_id: number;
    profile_photo: string | null;
    profil: {
        nama: string;
        nim?: string;
        nip?: string;
        semester?: string | null;
        bio?: string | null;
        prodi_name?: string;
        jurusan_name?: string;
    };
}

export default function ProfilPage() {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState<any>({});

    useEffect(() => {
        if (isLoggedIn()) {
            const parsedUser = getUserData();
            fetchProfil(parsedUser.user_id);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchProfil = async (user_id: number) => {
        try {
            const res = await fetch(`${BASE_URL}/api_ekonsul/user/profil.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ user_id }),
            });

            const result = await res.json();
            if (result.status === "success") {
                setUser(result.data);
                setForm(result.data.profil);
            }
        } catch (error) {
            console.error("Gagal mengambil profil:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (field: string, value: string) => {
        setForm((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        if (!user) return;
        try {
            const res = await fetch(`https://308d788a9260.ngrok-free.app/api_ekonsul/user/update_profil.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: user.user_id,
                    role_id: user.role_id,
                    ...form,
                }),
            });
            const result = await res.json();
            if (result.status === "success") {
                alert("Profil berhasil diperbarui!");
                setEditMode(false);
                fetchProfil(user.user_id);
            } else {
                alert(result.message || "Gagal menyimpan data");
            }
        } catch (error) {
            console.error("Gagal update profil:", error);
        }
    };

    if (loading) return <div className="flex justify-center items-center h-64 text-muted-foreground">Memuat data profil...</div>;
    if (!user) return <div className="text-center text-muted-foreground py-10">Data profil tidak ditemukan.</div>;

    const { profil } = user;
    const imageUrl = user.profile_photo ? `https://308d788a9260.ngrok-free.app/api_ekonsul/uploads/${user.profile_photo}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(profil.nama)}`;

    return (
        <div className="px-4 lg:px-6 py-6">
            <Card className="border border-border/60">
                <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                        <Avatar className="w-16 h-16">
                            <AvatarImage src={imageUrl} alt={profil.nama} />
                            <AvatarFallback>
                                {profil.nama
                                    ?.split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start">
                            <CardTitle>{profil.nama}</CardTitle>
                            <CardDescription>{user.role_id === 2 ? profil.nip : user.role_id === 3 ? profil.nim : "User"}</CardDescription>
                        </div>
                    </div>

                    {/*   {!editMode ? (
                        <Button className="flex items-center gap-2 w-full md:w-auto" onClick={() => setEditMode(true)}>
                            <IconPencil className="w-4 h-4" /> Edit Profil
                        </Button>
                    ) : (
                        <div className="flex gap-2">
                            <Button variant="default" onClick={handleSave} className="flex items-center gap-2">
                                <IconCheck className="w-4 h-4" /> Simpan
                            </Button>
                            <Button variant="outline" onClick={() => setEditMode(false)} className="flex items-center gap-2">
                                <IconX className="w-4 h-4" /> Batal
                            </Button>
                        </div>
                    )} */}
                </CardHeader>

                <Separator />

                <CardContent className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ProfileField label="Nama" value={form.nama} onChange={(v) => handleChange("nama", v)} editable={editMode} />
                    {user.role_id === 3 ? (
                        <>
                            <ProfileField label="NIM" value={profil.nim || "-"} readOnly />
                            <ProfileField label="Semester" value={form.semester || "-"} onChange={(v) => handleChange("semester", v)} editable={editMode} />
                        </>
                    ) : (
                        <ProfileField label="NIP" value={profil.nip || "-"} readOnly />
                    )}

                    <ProfileField label="Program Studi" value={profil.prodi_name || "-"} readOnly />
                    <ProfileField label="Jurusan" value={profil.jurusan_name || "-"} readOnly />

                    {editMode && (
                        <div className="col-span-2">
                            <Label className="text-sm text-muted-foreground">Bio</Label>
                            <Textarea value={form.bio || ""} onChange={(e) => handleChange("bio", e.target.value)} className="bg-muted/30 border-muted-foreground/20 text-foreground" />
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

function ProfileField({ label, value, editable = false, readOnly = false, onChange }: { label: string; value: string; editable?: boolean; readOnly?: boolean; onChange?: (value: string) => void }) {
    return (
        <div className="flex flex-col gap-1">
            <Label className="text-sm text-muted-foreground">{label}</Label>
            <Input value={value || ""} readOnly={!editable && readOnly} onChange={(e) => onChange?.(e.target.value)} className={`bg-muted/30 border-muted-foreground/20 text-foreground ${editable ? "" : "cursor-default"}`} />
        </div>
    );
}
