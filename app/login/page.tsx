"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "next-themes";
import { getUserData, isLoggedIn } from "@/backend/auth";
import { BASE_URL } from "@/backend/api";

export default function LoginPage() {
    const router = useRouter();
    useEffect(() => {
        if (isLoggedIn()) {
            const user = getUserData();
            if (user.role_id == 1) {
                router.push("/dashboard");
            } else if (user.role_id == 2) {
                router.push("/dosen");
            } else if (user.role_id == 3) {
                router.push("/mahasiswa");
            }
        }
    }, [router]);

    const { theme } = useTheme();

    const [login_id, setLoginId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async (e: { preventDefault: () => void }) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg("");

        try {
            const res = await fetch(`${BASE_URL}/api_ekonsul/user/login.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login_id, password }),
            });

            const data = await res.json();

            if (data.status === "success") {
                // Simpan session di localStorage
                localStorage.setItem("userData", JSON.stringify(data.data));

                if (data.data.role_id == 1) {
                    router.push("/dashboard");
                } else if (data.data.role_id == 2) {
                    router.push("/dosen");
                } else if (data.data.role_id == 3) {
                    router.push("/mahasiswa");
                }
            } else {
                setErrorMsg(data.message || "Login gagal");
            }
        } catch (err) {
            setErrorMsg("Terjadi kesalahan server");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
            <DotPattern glow={false} className={cn("absolute inset-0 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]")} />

            <Card className="p-0 max-w-sm w-full shadow-none border-none">
                <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"} className="p-0">
                    <CardHeader className="border-b border-border p-4 [.border-b]:pb-4">
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Masukkan kredensial akun kamu</CardDescription>
                    </CardHeader>

                    <CardContent className="p-4">
                        <form onSubmit={handleLogin}>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="login_id">Username</Label>
                                    <Input id="login_id" type="text" value={login_id} onChange={(e) => setLoginId(e.target.value)} placeholder="username" required />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                </div>

                                {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
                            </div>

                            <Button type="submit" className="w-full mt-4" disabled={loading}>
                                {loading ? "Loading..." : "Sign In"}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="p-4 border-t border-border [.border-t]:pt-4">
                        <p className="text-sm text-muted-foreground">
                            Belum punya akun?{" "}
                            <a href="/register" className="text-primary underline">
                                Register
                            </a>
                        </p>
                    </CardFooter>
                </MagicCard>
            </Card>
        </div>
    );
}
