"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/Components/ui/sidebar";
import { useForm } from "@inertiajs/react";

// Define TypeScript type for user props
interface User {
    useraccountid: number;
    userid: number;
    username: string;
    firstname?: string; // Made optional
    lastname?: string; // Made optional
    middlename?: string;
    extension?: string;
    group1code?: string;
    group2code?: string;
    group3code?: string;
    position?: string;
    office_name?: string;
    division_name?: string;
    unit_name?: string;
    useraccess?: string;
    avatar?: string;
}

interface NavUserProps {
    user?: User | User[]; // Allow both object and array format
}

export function NavUser({ user }: NavUserProps) {
    const { isMobile } = useSidebar();
    const { post } = useForm();

    // Ensure we are working with an object, not an array
    const userData = Array.isArray(user) ? user[0] : user;

    const logout = () => {
        post("/logout");
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src={userData?.avatar}
                                    alt={`${userData?.firstname || "User"} ${
                                        userData?.lastname || ""
                                    }`}
                                />
                                <AvatarFallback className="rounded-lg">
                                    {(userData?.firstname?.charAt(0) || "U") +
                                        (userData?.lastname?.charAt(0) || "")}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {userData?.firstname || "Unknown"}{" "}
                                    {userData?.lastname || "User"}
                                </span>
                                <span className="truncate text-xs">
                                    {userData?.group3code ||
                                        userData?.group2code ||
                                        userData?.group1code ||
                                        "No Group"}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={userData?.avatar}
                                        alt={`${
                                            userData?.firstname || "User"
                                        } ${userData?.lastname || ""}`}
                                    />
                                    <AvatarFallback className="rounded-lg">
                                        {(userData?.firstname?.charAt(0) ||
                                            "U") +
                                            (userData?.lastname?.charAt(0) ||
                                                "")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {userData?.firstname || "Unknown"}{" "}
                                        {userData?.lastname || "User"}
                                    </span>
                                    <span className="truncate text-xs">
                                        {userData?.group3code ||
                                            userData?.group2code ||
                                            userData?.group1code}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={logout}
                            className="cursor-pointer"
                        >
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
