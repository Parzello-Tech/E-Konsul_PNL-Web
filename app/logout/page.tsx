"use client";

import { useEffect } from "react";
import { logoutUser } from "@/backend/auth";

export default function LogoutPage() {
    useEffect(() => {
        // Panggil hanya di client
        logoutUser();

        // Redirect ke halaman utama
        window.location.href = "/";
    }, []);

    return <p>Logging out...</p>;
}
