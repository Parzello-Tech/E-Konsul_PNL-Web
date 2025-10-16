"use server";

import { BASE_URL } from "@/backend/api";

export async function getAllKonseling() {
    try {
        const res = await fetch(`${BASE_URL}/api_ekonsul/konseling/get_konseling_all.php`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const json = await res.json();
        if (json.status === "success") {
            return json.data;
        } else {
            return [];
        }
    } catch (err) {
        console.error("Gagal fetch data konseling:", err);
        return [];
    }
}
export async function getKonselingById(konseling_id: string) {
    try {
        const res = await fetch(`${BASE_URL}/api_ekonsul/konseling/get_konseling_by.php?id_konseling=${konseling_id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const json = await res.json();
        return json; // biarkan komponen yang memutuskan pakai json.data atau tidak
    } catch (err) {
        console.error("Gagal fetch data konseling:", err);
        return { status: "error", data: null };
    }
}

export async function getKonselingMahasiswaID(mahasiswa_id: string) {
    try {
        const res = await fetch(`${BASE_URL}/api_ekonsul/konseling/get_konseling_by.php?mahasiswa_id=${mahasiswa_id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const json = await res.json();
        if (json.status === "success") {
            return json.data;
        } else {
            return [];
        }
    } catch (err) {
        console.error("Gagal fetch data konseling:", err);
        return [];
    }
}

export async function getKonselingDosenID(dosen_id: string) {
    try {
        const res = await fetch(`${BASE_URL}/api_ekonsul/konseling/get_konseling_by.php?dosen_id=${dosen_id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const json = await res.json();
        if (json.status === "success") {
            return json.data;
        } else {
            return [];
        }
    } catch (err) {
        console.error("Gagal fetch data konseling:", err);
        return [];
    }
}

/* --------------------------------------------- */

export async function setKonselingStatus(id_konseling: string, status: string, user_id: string, role_id: string) {
    try {
        const res = await fetch(`${BASE_URL}/api_ekonsul/konseling/set_konseling_status.php`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: id_konseling,
                status,
                user_id,
                role_id,
            }),
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const json = await res.json();
        if (json.status === "success") {
            return {
                success: true,
                message: json.message,
                data: json.data,
            };
        } else {
            return {
                success: false,
                message: json.message || "Gagal mengubah status konseling.",
            };
        }
    } catch (err) {
        console.error("Gagal ubah status konseling:", err);
        return {
            success: false,
            message: "Terjadi kesalahan jaringan atau server.",
        };
    }
}
