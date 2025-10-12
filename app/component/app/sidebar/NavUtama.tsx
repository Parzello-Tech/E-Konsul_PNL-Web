"use client";

import { usePathname } from "next/navigation";
import { Icon } from "@tabler/icons-react";
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import Link from "next/link";
import clsx from "clsx";

export function NavUtama({
    items,
    type,
}: {
    items: {
        name: string;
        url: string;
        icon: Icon;
    }[];
    type: "Admin" | "Mahasiswa" | "Dosen";
}) {
    const { isMobile } = useSidebar();
    const pathname = usePathname(); // ambil URL aktif

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
            <SidebarGroupLabel>{type}</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) => {
                    const isActive = pathname === item.url; // cocokkan URL sekarang

                    return (
                        <SidebarMenuItem key={item.name}>
                            <SidebarMenuButton asChild>
                                <Link href={item.url} className={clsx("flex items-center gap-2 rounded-md py-2 transition-all", isActive ? "bg-red-100 text-red-700 font-medium" : "hover:bg-muted hover:text-foreground textZZ-foreground")}>
                                    <item.icon className={clsx("size-4", isActive && "text-red-700")} />
                                    <span>{item.name}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    );
                })}
            </SidebarMenu>
        </SidebarGroup>
    );
}
