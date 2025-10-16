// utils/auth.ts

export function getUserData() {
    if (typeof window === "undefined") return null; // pastikan client-side
    const data = localStorage.getItem("userData");
    return data ? JSON.parse(data) : null;
}

export function isLoggedIn() {
    if (typeof window === "undefined") return false;
    const data = localStorage.getItem("userData");
    return data !== null;
}

export function logoutUser() {
    if (typeof window === "undefined") return;
    localStorage.removeItem("userData");
}

/* === Role Helper === */

// role_id: 1 = Admin, 2 = Dosen, 3 = Mahasiswa
export function isAdmin(): boolean {
    if (typeof window === "undefined") return false;
    const user = getUserData();
    return user?.role_id === 1;
}

export function isDosen(): boolean {
    if (typeof window === "undefined") return false;
    const user = getUserData();
    return user?.role_id === 2;
}

export function isMahasiswa(): boolean {
    if (typeof window === "undefined") return false;
    const user = getUserData();
    return user?.role_id === 3;
}
