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
