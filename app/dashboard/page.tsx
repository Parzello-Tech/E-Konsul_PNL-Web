"use client";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import data from "./data.json";
import { AppSidebar } from "../component/app/sidebar/app-sidebar";
import { SiteHeader } from "../component/app/sidebar/site-header";
import { SectionCards } from "../component/app/section-cards";
import { ChartAreaInteractive } from "../component/app/chart-area-interactive";
import DashboardAdmin from "./Dashboard";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/backend/auth";
import { useEffect } from "react";

export default function Page() {
    /* CEK LOGIN */
    const router = useRouter();
    useEffect(() => {
        if (!isLoggedIn()) {
            router.push("/login");
        }
    }, [router]);
    /* CEK LOGIN */
    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2">
                        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
                            {/* ISI */}
                            <DashboardAdmin />
                            {/* ISI */}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
