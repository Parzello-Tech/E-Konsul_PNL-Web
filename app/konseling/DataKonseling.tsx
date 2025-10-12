"use client";

import * as React from "react";
import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/backend/api";

export type Konseling = {
    id_konseling: string;
    mahasiswa_id: string;
    dosen_id: string;
    tujuan_konseling: string;
    jenis_konseling: string;
    tanggal_konseling: string;
    waktu_mulai: string;
    waktu_selesai: string;
    status: "Diajukan" | "Diterima" | "Berlangsung" | "Selesai" | "Ditolak" | "Dibatalkan";
    lampiran?: string;
    created_at: string;
    updated_at: string;
};

export const columns: ColumnDef<Konseling>[] = [
    {
        id: "select",
        header: ({ table }) => <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")} onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all" />,
        cell: ({ row }) => <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "id_konseling",
        header: "ID Konseling",
        cell: ({ row }) => <div className="font-medium">{row.getValue("id_konseling")}</div>,
    },
    {
        accessorKey: "tujuan_konseling",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                Tujuan Konseling
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => row.getValue("tujuan_konseling"),
    },
    {
        accessorKey: "jenis_konseling",
        header: "Jenis",
        cell: ({ row }) => row.getValue("jenis_konseling"),
    },
    {
        accessorKey: "tanggal_konseling",
        header: "Tanggal",
        cell: ({ row }) => row.getValue("tanggal_konseling"),
    },
    {
        accessorKey: "waktu_mulai",
        header: "Waktu Mulai",
        cell: ({ row }) => row.getValue("waktu_mulai"),
    },
    {
        accessorKey: "waktu_selesai",
        header: "Waktu Selesai",
        cell: ({ row }) => row.getValue("waktu_selesai"),
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.getValue("status") as string;
            const color = status === "Diajukan" ? "bg-yellow-100 text-yellow-700" : status === "Diterima" ? "bg-green-100 text-green-700" : status === "Berlangsung" ? "bg-blue-100 text-blue-700" : status === "Selesai" ? "bg-gray-100 text-gray-700" : status === "Ditolak" ? "bg-red-100 text-red-700" : "bg-gray-100 text-gray-700";

            return <Badge className={`${color} capitalize`}>{status}</Badge>;
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const item = row.original;
            const router = useRouter();

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => router.push(`/konseling/detail/${item.id_konseling}`)}>Lihat Detail</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">Batalkan</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export function DataKonseling() {
    const router = useRouter();

    const [data, setData] = React.useState<Konseling[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [globalFilter, setGlobalFilter] = React.useState("");

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`${BASE_URL}/api_ekonsul/konseling/get_konseling_all.php`);

                // Cek status response dan tipe kontennya
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }

                const contentType = res.headers.get("Content-Type");
                if (contentType && contentType.includes("application/json")) {
                    const json = await res.json();
                    alert(JSON.stringify(json));
                    if (json.status === "success") {
                        setData(json.data);
                    } else {
                        setData([]);
                    }
                } else {
                    const text = await res.text();
                    throw new Error(`Response is not JSON, but HTML: ${text}`);
                }
            } catch (err) {
                setError("Gagal memuat data konseling");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            globalFilter,
        },
    });

    if (loading) return <div className="text-center py-8 text-muted-foreground">Memuat data...</div>;
    if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

    return (
        <div className="w-full">
            <div className="flex items-center py-4">
                <Input placeholder="Cari data konseling..." value={globalFilter ?? ""} onChange={(event) => setGlobalFilter(event.target.value)} className="max-w-sm" />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Kolom <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                                    {column.id.replaceAll("_", " ")}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="overflow-hidden rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} onClick={() => router.push(`/konseling/detail/${row.original.id_konseling}`)} className="cursor-pointer">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Tidak ada data.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="text-muted-foreground flex-1 text-sm">
                    {table.getFilteredSelectedRowModel().rows.length} dari {table.getFilteredRowModel().rows.length} data dipilih.
                </div>
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        Sebelumnya
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        Berikutnya
                    </Button>
                </div>
            </div>
        </div>
    );
}
