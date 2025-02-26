"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useForm } from "@inertiajs/react";

import { Button } from "@/Components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/Components/ui/alert-dialog";

import { Checkbox } from "@/Components/ui/checkbox";
import { DataTableColumnHeader } from "@/Components/table-functions/DataTableColumnHeader";
export type UsersCols = {
    userid: number;
    lastname: string;
    firstname: string;
    middlename?: string;
    extension?: string;
    position: string;
    group1Name: string; // Office
    group2Name: string; // Division
    group3Name: string; // Unit
    is_head: boolean;
};

export const columns: ColumnDef<UsersCols>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        id: "name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => {
            const { lastname, firstname, middlename, extension } = row.original;
            return `${lastname}, ${firstname} ${
                middlename ? middlename.charAt(0) + "." : ""
            } ${extension ?? ""}`.trim();
        },
    },
    {
        accessorKey: "position",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Position" />
        ),
    },
    {
        accessorKey: "group1Name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Office" />
        ),
    },
    {
        accessorKey: "group2Name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Division" />
        ),
    },
    {
        accessorKey: "group3Name",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Unit" />
        ),
    },
    {
        accessorKey: "is_head",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Head" />
        ),
        cell: ({ row }) =>
            row.original.is_head ? (
                <span className="text-green-500 font-bold">Yes</span>
            ) : (
                <span className="text-gray-500">No</span>
            ),
    },
    {
        id: "actions",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Actions" />
        ),
        cell: ({ row }) => {
            const users = row.original;
            const { delete: destroy } = useForm();
            const [open, setOpen] = useState(false);

            const ConfirmDelete = () => {
                destroy(route("users.destroy", { user: users.userid }), {
                    onSuccess: () => {
                        setOpen(false); // Close the dropdown
                    },
                });
            };

            return (
                <DropdownMenu open={open} onOpenChange={setOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                >
                                    Delete
                                </DropdownMenuItem>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Are you sure?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete this entry.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                        onClick={ConfirmDelete}
                                        className="bg-red-500"
                                    >
                                        Confirm
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
