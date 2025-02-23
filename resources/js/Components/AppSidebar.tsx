import * as React from "react"
import {
  BookOpen,
  Bot,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react"

import { NavMain } from "@/Components/NavMain"
import { NavProjects } from "@/Components/NavProjects"
import { NavSecondary } from "@/Components/NavSecondary"
import { NavUser } from "@/Components/NavUser"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar"

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
      icon: SquareTerminal,
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
      icon: SquareTerminal,
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
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
}

const bgColor = 'bg-neutral-100';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar  className={bgColor} variant="inset" {...props}>
      <SidebarHeader  className={bgColor}>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                  <img src="/logo.png" alt="Logo" className="size-8" />
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">OIPCRMS</span>
                  <span className="truncate text-xs">DOST 10</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader >
      <SidebarContent   className={bgColor}>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter   className={bgColor}>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
