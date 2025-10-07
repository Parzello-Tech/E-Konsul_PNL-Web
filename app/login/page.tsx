"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { MagicCard } from "@/components/magicui/magic-card";
import { useTheme } from "next-themes";
import { memo } from "react";

export default function LoginPage() {
    const { theme } = useTheme();
    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
            {/* Background DotPattern */}
            <DotPattern
                glow={false} // matikan glow kalau tidak terlalu perlu
                className={cn("absolute inset-0 [mask-image:radial-gradient(500px_circle_at_center,white,transparent)]")}
            />
            {/* Card Login */}
            <Card className="p-0 max-w-sm w-full shadow-none border-none">
                <MagicCard gradientColor={theme === "dark" ? "#262626" : "#D9D9D955"} className="p-0">
                    <CardHeader className="border-b border-border p-4 [.border-b]:pb-4">
                        <CardTitle>Login</CardTitle>
                        <CardDescription>Enter your credentials to access your account</CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                        <form>
                            <div className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" placeholder="name@example.com" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password" type="password" />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter className="p-4 border-t border-border [.border-t]:pt-4">
                        <Button className="w-full">
                            <Link href="/dashboard"> Sign In</Link>
                        </Button>
                    </CardFooter>
                </MagicCard>
            </Card>
        </div>
    );
}
