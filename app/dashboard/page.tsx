import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import data from "./data.json";
import { AppSidebar } from "./component/sidebar/app-sidebar";
import { SiteHeader } from "./component/sidebar/site-header";
import { SectionCards } from "./component/section-cards";
import { DataTable } from "./component/data-table";
import { ChartAreaInteractive } from "./component/chart-area-interactive";
import DashboardAdmin from "./page/dashboard-admin";

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
                            <DashboardAdmin />

                            <DataTable data={data} />
                            {/* ISI */}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
