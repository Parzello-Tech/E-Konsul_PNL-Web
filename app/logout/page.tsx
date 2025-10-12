"use client";

import { logoutUser } from "@/backend/auth";

export default function LoginPage() {
    logoutUser();
    window.location.href = "/";
    return;
}
