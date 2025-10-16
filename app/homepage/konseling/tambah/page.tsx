import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import MahasiswaHomePage from "./FormKonseling";
import FormKonseling from "./FormKonseling";
import { AppSidebar } from "@/app/component/app/sidebar/app-sidebar";
import { SiteHeader } from "@/app/component/app/sidebar/site-header";

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
                            <FormKonseling />
                            {/* ISI */}
                        </div>
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
