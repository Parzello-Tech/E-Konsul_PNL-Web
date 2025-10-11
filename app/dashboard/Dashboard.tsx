import { Card, CardAction, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconTrendingUp, IconTrendingDown, IconUsers, IconChevronRight, IconSchool, IconChalkboard, IconUserShare } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartAreaInteractive } from "../component/app/chart-area-interactive";

export default function DashboardAdmin() {
    const Menu = [
        { description: "Mahasiswa", icon: <IconUsers />, value: 500, buttonText: "Tampilkan Data" },
        { description: "Dosen", icon: <IconUsers />, value: 500, buttonText: "Tampilkan Data" },
        { description: "Jurusan", icon: <IconSchool />, value: 500, buttonText: "Tampilkan Data" },
        { description: "Prodi", icon: <IconSchool />, value: 500, buttonText: "Tampilkan Data" },
        { description: "Kelas", icon: <IconChalkboard />, value: 500, buttonText: "Tampilkan Data" },
        { description: "Pembimbing", icon: <IconUserShare />, value: 500, buttonText: "Tampilkan Data" },
        {
            description: "Growth Rate",
            value: "4.5%",
            badge: (
                <Badge variant="outline">
                    <IconTrendingUp /> +4.5%
                </Badge>
            ),
        },
    ];

    return (
        <div>
            <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
            </div>
            <div className="my-5"></div>
            <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
                {Menu.map((Menu, idx) => (
                    <Card key={idx} className="@container/card">
                        <CardHeader>
                            <CardDescription>{Menu.description}</CardDescription>
                            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                                <div className="inline-flex items-center gap-1">
                                    {Menu.icon}
                                    {Menu.value}
                                </div>
                            </CardTitle>
                            <CardAction>
                                {/* <Badge variant="outline"></Badge> */}
                                <IconChevronRight />
                            </CardAction>
                        </CardHeader>
                        <CardFooter className="flex-col items-start gap-1.5 text-sm">
                            <Button variant="outline" className="w-full">
                                Tampilkan Data
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
