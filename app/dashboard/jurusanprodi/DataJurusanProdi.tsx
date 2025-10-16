"use client";

import * as React from "react";
import { ColumnDef, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, SortingState, useReactTable, VisibilityState } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Plus, Edit, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getJurusanProdi } from "@/backend/JurusanProdiBackend";
import { useRouter } from "next/navigation";

interface JurusanProdi {
    jurusan_id: number;
    nama_jurusan: string;
    prodi: { prodi_id: number; nama_prodi: string }[];
}

// ✅ Kolom tabel
export const columns: ColumnDef<JurusanProdi>[] = [
    {
        accessorKey: "jurusan_id",
        header: ({ column }) => (
            <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                ID Jurusan
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ row }) => row.getValue("jurusan_id"),
    },
    {
        accessorKey: "nama_jurusan",
        header: "Nama Jurusan",
        cell: ({ row }) => <div className="font-medium">{row.getValue("nama_jurusan")}</div>,
    },
    {
        id: "prodi_list",
        header: "Daftar Prodi",
        cell: ({ row }) => {
            const prodiList = row.original.prodi;
            if (!prodiList || prodiList.length === 0) return <span className="text-muted-foreground italic">Tidak ada prodi</span>;
            return (
                <ul className="list-disc pl-5 space-y-1">
                    {prodiList.map((p) => (
                        <li key={p.prodi_id} className="flex items-center justify-between">
                            <span>{p.nama_prodi}</span>
                            <div className="flex gap-2">
                                <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => alert(`Edit prodi: ${p.nama_prodi}`)}>
                                    <Edit className="w-3 h-3" />
                                </Button>
                                <Button variant="destructive" size="icon" className="h-6 w-6" onClick={() => alert(`Hapus prodi: ${p.nama_prodi}`)}>
                                    <Trash className="w-3 h-3" />
                                </Button>
                            </div>
                        </li>
                    ))}
                </ul>
            );
        },
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const jurusan = row.original;
            const router = useRouter();

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Aksi Jurusan</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => alert(`Edit Jurusan: ${jurusan.nama_jurusan}`)}>Edit Jurusan</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => confirm(`Yakin ingin hapus jurusan "${jurusan.nama_jurusan}"?`) && alert(`Hapus Jurusan: ${jurusan.nama_jurusan}`)}>Hapus Jurusan</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => alert(`Tambah Prodi di ${jurusan.nama_jurusan}`)}>Tambah Prodi</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export function DataJurusanProdi() {
    const [data, setData] = React.useState<JurusanProdi[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = React.useState("");
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});

    React.useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const json = await getJurusanProdi();
                setData(Array.isArray(json) ? json : []);
            } catch (err) {
                console.error("Fetch data error:", err);
                setError("Gagal memuat data jurusan dan prodi.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const table = useReactTable({
        data,
        columns,
        state: { sorting, globalFilter, columnVisibility },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
    });

    if (loading) return <div className="text-center py-8 text-muted-foreground">Memuat data...</div>;
    if (error) return <div className="text-center py-8 text-red-600">{error}</div>;

    return (
        <div className="w-full">
            {/* Header Controls */}
            <div className="flex items-center justify-between py-4">
                <Input placeholder="Cari jurusan atau prodi..." value={globalFilter ?? ""} onChange={(event) => setGlobalFilter(event.target.value)} className="max-w-sm" />

                <div className="flex items-center gap-2">
                    <Button onClick={() => alert("Tambah Jurusan Baru")} className="flex items-center gap-1">
                        <Plus className="w-4 h-4" /> Tambah Jurusan
                    </Button>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="flex items-center gap-1">
                                Kolom <ChevronDown className="h-4 w-4" />
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
            </div>

            {/* Tabel */}
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
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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

            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Sebelumnya
                </Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Berikutnya
                </Button>
            </div>
        </div>
    );
}
