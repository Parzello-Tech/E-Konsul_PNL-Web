"use client";

import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconTrendingUp, IconTrendingDown, IconUsers, IconChevronRight, IconSchool, IconChalkboard, IconUserShare, IconChartBar, IconChartPie, IconCloud, IconMoodEmpty, IconMessage, IconMessage2Plus, IconChevronLeft, IconCalendarTime, IconCircleX, IconFile, IconDownload, IconLocation } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ItemMedia, ItemContent, ItemTitle, ItemActions, Item, ItemDescription } from "@/components/ui/item";

import { BadgeCheckIcon, ChevronRightIcon, Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { useRouter } from "next/navigation";
import { DataJurusanProdi } from "./DataJurusanProdi";

export default function JurusanProdiPage() {
    const router = useRouter();
    const connectionColor = "text-green-600 bg-green-100";
    return (
        <div>
            <div className="my-0 px-4 lg:px-6">
                <Card data-slot="card">
                    <CardHeader>
                        <div className="mb-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <CardTitle className="text-lg font-semibold">Konseling Anda</CardTitle>
                            </div>
                        </div>
                        <Separator />
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                        <DataJurusanProdi />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
