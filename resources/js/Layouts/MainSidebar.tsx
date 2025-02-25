import { AppSidebar } from "@/Components/AppSidebar";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/Components/ui/sidebar";
import React, { ReactNode } from "react";
import MainBreadcrumb from "./MainBreadcrumb";

interface MainSidebarProps {
    children: ReactNode;
    blink: string;
    bpage: string;
}

const MainSidebar: React.FC<MainSidebarProps> = ({
    children,
    blink,
    bpage,
}) => {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <MainBreadcrumb blink={blink} bpage={bpage} />
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
};

export default MainSidebar;
