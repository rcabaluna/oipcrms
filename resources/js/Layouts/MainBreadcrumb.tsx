import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from '@/Components/ui/breadcrumb'
import { Separator } from '@/Components/ui/separator';
import { SidebarTrigger } from '@/Components/ui/sidebar'

import React from 'react'

interface MainBreadcrumbProps {
  blink?: string;
  bpage?: string;

}

const MainBreadcrumb: React.FC<MainBreadcrumbProps> = ({blink, bpage}) => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                    {blink}
                </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                <BreadcrumbPage>{bpage}</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
            </Breadcrumb>
        </div>
    </header>
  )
}

export default MainBreadcrumb