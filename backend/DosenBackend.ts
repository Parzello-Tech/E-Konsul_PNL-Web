"use server";

import { BASE_URL } from "@/backend/api";

export async function getAllDosen() {
    try {
        const res = await fetch(`${BASE_URL}/api_ekonsul/user/get_all_dosen.php`, {
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
