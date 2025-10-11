import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "../component/app/sidebar/app-sidebar";
import { SiteHeader } from "../component/app/sidebar/site-header";
import { SectionCards } from "../component/app/section-cards";
import { ChartAreaInteractive } from "../component/app/chart-area-interactive";
import MahasiswaHomePage from "./MahasiswaHomePage";

export default function Page() {
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
                            <MahasiswaHomePage />
                            {/* ISI */}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
