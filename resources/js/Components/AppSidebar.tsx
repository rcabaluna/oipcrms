import * as React from "react";

import {
    SquareTerminal,
    Settings,
    Target,
    FileUser,
    Building2,
} from "lucide-react";

import { NavMain } from "@/Components/NavMain";
import { NavProjects } from "@/Components/NavProjects";
import { NavSecondary } from "@/Components/NavSecondary";
import { NavUser } from "@/Components/NavUser";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/Components/ui/sidebar";
import { usePage } from "@inertiajs/react";

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/logo.png",
    },
    navMain: [
        {
            title: "OPCR",
            url: "#",
            icon: Building2,
            isActive: true,
            items: [
                {
                    title: "Dashboard",
                    url: "/opcr/dashboard",
                },
                {
                    title: "Targets",
                    url: "/opcr/targets",
                },
            ],
        },
        {
            title: "IPCR",
            url: "#",
            icon: FileUser,
            isActive: true,
            items: [
                {
                    title: "Dashboard",
                    url: "/opcr/dashboard",
                },
                {
                    title: "Targets",
                    url: "/opcr/targets",
                },
            ],
        },
        {
            title: "Libraries",
            url: "#",
            icon: Settings,
            isActive: true,
            items: [
                {
                    title: "Organizational Structure",
                    url: "/libraries/org-structure",
                },
                {
                    title: "Users",
                    url: "/libraries/users",
                },
                {
                    title: "Accounts",
                    url: "/libraries/accounts",
                },
            ],
        },
    ],
};

const bgColor = "bg-neutral-100";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { props: pageProps } = usePage();

    const userinfo = pageProps.users || {
        useraccountid: null,
        userid: null,
        username: "Guest",
        firstname: "Guest",
        lastname: "",
        middlename: "",
        extension: "",
        group1code: "",
        group2code: "",
        group3code: "",
        position: "Guest User",
        office_name: "N/A",
        division_name: "N/A",
        unit_name: "N/A",
        useraccess: [],
        avatar: "/default-avatar.png",
    };

    return (
        <Sidebar className={bgColor} variant="inset" {...props}>
            <SidebarHeader className={bgColor}>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <a href="#">
                                <img
                                    src="/logo.png"
                                    alt="Logo"
                                    className="size-8"
                                />
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        OIPCRMS
                                    </span>
                                    <span className="truncate text-xs">
                                        DOST 10
                                    </span>
                                </div>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className={bgColor}>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter className={bgColor}>
                <NavUser user={userinfo} />
            </SidebarFooter>
        </Sidebar>
    );
}
