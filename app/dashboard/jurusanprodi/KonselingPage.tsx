"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { DataJurusanProdi } from "./DataJurusanProdi";

export default function JurusanProdiPage() {
    return (
        <div>
            <div className="my-0 px-4 lg:px-6">
                <Card data-slot="card">
                    <CardHeader>
                        <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-lg font-semibold">Konseling Anda</CardTitle>
                            </div>
                        </div>
                        <Separator />
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        <DataJurusanProdi />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
