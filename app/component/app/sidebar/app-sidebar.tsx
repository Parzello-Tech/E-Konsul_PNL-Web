"use client";

import * as React from "react";
import { IconCamera, IconCategory, IconChartBar, IconDashboard, IconDatabase, IconFileAi, IconFileDescription, IconFileWord, IconFolder, IconHelp, IconHistory, IconHome, IconInnerShadowTop, IconListDetails, IconLogout, IconMessageCircleUser, IconReport, IconSearch, IconSettings, IconUser, IconUsers } from "@tabler/icons-react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { NavUtama } from "./NavUtama";
import { NavUser } from "./nav-user";
import { NavSecondary } from "./nav-secondary";
import { Separator } from "@/components/ui/separator";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },

    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: IconSettings,
        },
        {
            title: "Logout",
            url: "#",
            icon: IconLogout,
        },
    ],
    admin: [
        {
            name: "Dashboard",
            url: "/dashboard",
            icon: IconCategory,
        },
    ],
    mahasiswa: [
        {
            name: "Home",
            url: "/mahasiswa/",
            icon: IconHome,
        },
        {
            name: "Konseling",
            url: "/konseling/",
            icon: IconMessageCircleUser,
        },
        {
            name: "Riwayat",
            url: "/mahasiswa/riwayat",
            icon: IconHistory,
        },
        {
            name: "Profil",
            url: "/mahasiswa/profil",
            icon: IconUser,
        },
    ],
    dosen: [
        {
            name: "Home",
            url: "/dosen/",
            icon: IconHome,
        },
        {
            name: "Konseling",
            url: "/konseling/",
            icon: IconMessageCircleUser,
        },
        {
            name: "Riwayat",
            url: "/dosen/riwayat",
            icon: IconHistory,
        },
        {
            name: "Profil",
            url: "/dosen/profil",
            icon: IconUser,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
                            <a href="#">
                                <IconInnerShadowTop className="!size-5" />
                                <span className="text-base font-semibold">E-Konsul PNL</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <Separator className="" />
                <NavUtama items={data.admin} type="Admin" />
                <NavUtama items={data.mahasiswa} type="Mahasiswa" />
                <NavUtama items={data.dosen} type="Dosen" />
                <Separator className="mt-auto" />
                <NavSecondary items={data.navSecondary} className="" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    );
}
