"use server";

import { BASE_URL } from "@/backend/api";

/* =========================================================
   GET RELASI BIMBINGAN BERDASARKAN DOSEN ID
========================================================= */
export async function getRelasiByDosenId(dosen_id: string) {
    try {
        const res = await fetch(`${BASE_URL}/api_ekonsul/bimbingan/get_by_dosen.php?dosen_id=${dosen_id}`, { cache: "no-store" });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const json = await res.json();
        return json.status === "success" ? json.data : [];
    } catch (err) {
        console.error("Gagal fetch data relasi (dosen):", err);
        return [];
    }
}

/* =========================================================
   GET RELASI BIMBINGAN BERDASARKAN MAHASISWA ID
========================================================= */
export async function getRelasiByMahasiswaId(mahasiswa_id: string) {
    try {
        const res = await fetch(`${BASE_URL}/api_ekonsul/bimbingan/get_by_mahasiswa.php?mahasiswa_id=${mahasiswa_id}`, { cache: "no-store" });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const json = await res.json();
        return json.status === "success" ? json.data : [];
    } catch (err) {
        console.error("Gagal fetch data relasi (mahasiswa):", err);
        return [];
    }
}

/* =========================================================
   TAMBAH RELASI BIMBINGAN
========================================================= */
export async function addRelasiBimbingan(data: { dosen_id: string; mahasiswa_id: string; tipe_bimbingan: string }) {
    try {
        const res = await fetch(`${BASE_URL}/api_ekonsul/bimbingan/add_relasi.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
            cache: "no-store",
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const json = await res.json();
        return json;
    } catch (err) {
        console.error("Gagal menambah relasi:", err);
        return { status: "error", message: "Terjadi kesalahan jaringan atau server." };
    }
}

/* =========================================================
   UPDATE RELASI BIMBINGAN
========================================================= */
export async function updateRelasiBimbingan(id_relasi_bimbingan: string, data: { tipe_bimbingan?: string }) {
    try {
        const res = await fetch(`${BASE_URL}/api_ekonsul/bimbingan/update_relasi.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_relasi_bimbingan, ...data }),
            cache: "no-store",
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const json = await res.json();
        return json;
    } catch (err) {
        console.error("Gagal update relasi:", err);
        return { status: "error", message: "Terjadi kesalahan jaringan atau server." };
    }
}

/* =========================================================
   HAPUS RELASI BIMBINGAN
========================================================= */
export async function deleteRelasiBimbingan(id_relasi_bimbingan: string) {
    try {
        const res = await fetch(`${BASE_URL}/api_ekonsul/bimbingan/delete_relasi.php`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id_relasi_bimbingan }),
            cache: "no-store",
        });

        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

        const json = await res.json();
        return json;
    } catch (err) {
        console.error("Gagal hapus relasi:", err);
        return { status: "error", message: "Terjadi kesalahan jaringan atau server." };
    }
}
