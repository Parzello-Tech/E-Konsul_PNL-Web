"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle, ItemMedia } from "@/components/ui/item"; // sesuaikan path komponenmu
import { ChevronRightIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface BimbinganItemCardProps {
    title: string;
    subtitle: string;
    name: string;
    no_induk: string;
    id: string;
    avatarUrl?: string;
    date: string;
    waktu_mulai: string;
    waktu_selesai: string;
    statusConnection: string;
    statusActivity: string;
}

export default function BimbinganItemCard({ title, subtitle, name, no_induk, id, avatarUrl, date, waktu_mulai, waktu_selesai, statusConnection, statusActivity }: BimbinganItemCardProps) {
    const connectionColor = statusConnection === "Online" ? "text-green-600 bg-green-100" : "text-gray-600 bg-gray-100";

    const activityColor = {
        Diterima: "text-green-600",
        Berlangsung: "text-blue-600",
        Diajukan: "text-amber-600",
        Selesai: "text-emerald-600",
        Ditolak: "text-red-600",
        Dibatalkan: "text-gray-500",
    }[statusActivity];

    const router = useRouter();

    return (
        <Item variant="outline" size="sm" asChild>
            <a onClick={() => router.push(`/konseling/detail/${id}`)} className="flex flex-col items-start gap-2 w-full">
                {/* Row 1: Title, Subtitle, Status Connection */}
                <div className="w-full flex items-start justify-between">
                    <div>
                        <h3 className="text-sm font-semibold">{title}</h3>
                        <p className="text-xs text-muted-foreground">{subtitle}</p>
                    </div>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${connectionColor}`}>{statusConnection}</span>
                </div>

                {/* Row 2: Avatar + Username */}
                <div className="w-full flex items-center justify-between border rounded-lg p-2">
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={avatarUrl} alt={name} />
                            <AvatarFallback>{name?.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col items-start">
                            <ItemTitle className="text-sm font-medium">{name}</ItemTitle>
                            <ItemDescription className="text-xs">{no_induk}</ItemDescription>
                        </div>
                    </div>
                    <ItemActions>
                        <ChevronRightIcon className="size-4" />
                    </ItemActions>
                </div>

                {/* Row 3: Date, Time, Status Activity */}
                <div className="w-full flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex flex-col items-start ">
                        <span>{date}</span>
                        <div>
                            <span>{waktu_mulai}</span>
                            <span> - </span>
                            <span>{waktu_selesai}</span>
                        </div>
                    </div>

                    <Badge style={{ backgroundColor: activityColor }} asChild>
                        <span className={`font-medium ${activityColor}`}>{statusActivity}</span>
                    </Badge>
                </div>
            </a>
        </Item>
    );
}
