"use server";

import { BASE_URL } from "@/backend/api";
import { JurusanProdi } from "./interface";

export async function getJurusanProdi(): Promise<JurusanProdi[]> {
    try {
        const res = await fetch(`${BASE_URL}/api_ekonsul/jurusanprodi/get_jurusanprodi.php`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const json = await res.json();

        // Pastikan struktur sesuai
        if (json.status === "success" && Array.isArray(json.data)) {
            return json.data as JurusanProdi[];
        } else {
            return [];
        }
    } catch (err) {
        console.error("Gagal fetch data jurusan & prodi:", err);
        return [];
    }
}
