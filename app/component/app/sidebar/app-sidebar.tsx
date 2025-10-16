"use client";

import * as React from "react";
import { IconCategory, IconHome, IconMessageCircleUser, IconUser, IconLogout, IconInnerShadowTop, IconSchool, IconExchange, IconUsers, IconBubbleText, IconSlideshow } from "@tabler/icons-react";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { NavUtama } from "./NavUtama";
import { NavUser } from "./nav-user";
import { NavSecondary } from "./nav-secondary";
import { Separator } from "@/components/ui/separator";
import { getUserData, isAdmin, isDosen, isMahasiswa } from "@/backend/auth";

const userData = getUserData();

const data = {
    // ✅ Jika admin, tidak isi user sama sekali
    user: !isAdmin()
        ? {
              name: userData.profil.fullname || "Pengguna",
              nomor_induk: (isMahasiswa() && userData.profil.nim) || (isDosen() && userData.profil.nip) || "000000000",
              avatar: userData.profile_photo ? `${userData.profile_photo}` : "https://ui-avatars.com/api/?name=" + encodeURIComponent(userData.profil.fullname || "Pengguna"),
          }
        : null,

    navSecondary: [
        {
            title: "Logout",
            url: "/logout",
            icon: IconLogout,
        },
    ],

    admin: [
        {
            name: "Dashboard",
            url: "/dashboard",
            icon: IconCategory,
        },

        {
            name: "Kelola Bimbingan",
            url: "/dashboard/bimbingan",
            icon: IconBubbleText,
        },
    ],

    admin_core: [
        {
            name: "Jurusan & Prodi",
            url: "/dashboard/jurusanprodi",
            icon: IconSchool,
        },
        {
            name: "Dosen",
            url: "/dashboard/dosen",
            icon: IconUsers,
        },
        {
            name: "Mahasiswa",
            url: "/dashboard/mahasiswa",
            icon: IconUsers,
        },
        {
            name: "Relasi Bimbingan",
            url: "/dashboard/relasibimbingan",
            icon: IconExchange,
        },
    ],

    admin_setting: [
        {
            name: "Kustomisasi Carousel",
            url: "/dashboard/kustomisasi/carousel",
            icon: IconSlideshow,
        },
    ],

    mahasiswa: [
        {
            name: "Home",
            url: "/homepage",
            icon: IconHome,
        },
        {
            name: "Konseling",
            url: "/konseling",
            icon: IconMessageCircleUser,
        },
        {
            name: "Profil",
            url: "/profil",
            icon: IconUser,
        },
    ],
    dosen: [
        {
            name: "Home",
            url: "/homepage",
            icon: IconHome,
        },
        {
            name: "Konseling",
            url: "/konseling",
            icon: IconMessageCircleUser,
        },
        {
            name: "Profil",
            url: "/profil",
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
                <Separator />

                {/* ✅ Menu berdasarkan role */}
                {isAdmin() && (
                    <div>
                        <NavUtama items={data.admin} type="Admin" />
                        <NavUtama items={data.admin_core} type="Core" />
                        <NavUtama items={data.admin_setting} type="Setting" />
                    </div>
                )}
                {isMahasiswa() && <NavUtama items={data.mahasiswa} type="Mahasiswa" />}
                {isDosen() && <NavUtama items={data.dosen} type="Dosen" />}

                <Separator className="mt-auto" />
                <NavSecondary items={data.navSecondary} />
            </SidebarContent>

            {/* ✅ Footer hanya tampil jika bukan admin */}
            {!isAdmin() && data.user && (
                <SidebarFooter>
                    <NavUser user={data.user} />
                </SidebarFooter>
            )}
        </Sidebar>
    );
}
