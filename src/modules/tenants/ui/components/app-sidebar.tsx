"use client"

import * as React from "react"
import {
    ArrowUpCircleIcon,
    BarChart3,
    PackageSearch,
    Users,
    Wallet,
    Boxes,
    CreditCard,
    MousePointerClick,
    Percent,
    ClipboardListIcon,
    DatabaseIcon,
    FileIcon,
    HelpCircleIcon,
    SearchIcon,
    SettingsIcon,
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "./nav-user"
import { NavSecondary } from "./nav-secondary"
import { NavDocuments } from "./nav-documents"
import { NavAnalytics } from "./nav-analytics"

const data = {
    user: {
        name: "shadcn",
        email: "m@example.com",
        avatar: "/avatars/shadcn.jpg",
    },
    navSecondary: [
        {
            title: "Settings",
            url: "#",
            icon: SettingsIcon,
        },
        {
            title: "Get Help",
            url: "#",
            icon: HelpCircleIcon,
        },
        {
            title: "Search",
            url: "#",
            icon: SearchIcon,
        },
    ],
    analytics: [
        {
            name: "Sales Analytics",
            url: "/dashboard/sales",
            icon: BarChart3,
        },
        {
            name: "Traffic Analytics",
            url: "#",
            icon: MousePointerClick,
        },
        {
            name: "Orders Analytics",
            url: "#",
            icon: PackageSearch,
        },
        {
            name: "Revenue Analytics",
            url: "#",
            icon: Wallet,
        },
        {
            name: "Inventory Analytics",
            url: "#",
            icon: Boxes,
        },
        {
            name: "Payment Analytics",
            url: "#",
            icon: CreditCard,
        },
        {
            name: "Coupon Analytics",
            url: "#",
            icon: Percent,
        },
        {
            name: "Customers Analytics",
            url: "#",
            icon: Users,
        },
    ],
    documents: [
        {
            name: "Data Library",
            url: "#",
            icon: DatabaseIcon,
        },
        {
            name: "Reports",
            url: "#",
            icon: ClipboardListIcon,
        },
        {
            name: "Word Assistant",
            url: "#",
            icon: FileIcon,
        },
    ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="offcanvas" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <a href="#">
                                <ArrowUpCircleIcon className="h-5 w-5" />
                                <span className="text-base font-semibold">Acme Inc.</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className="hide-scrollbar">
                <NavAnalytics items={data.analytics} />
                <NavDocuments items={data.documents} />
                <NavSecondary items={data.navSecondary} className="mt-auto" />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={data.user} />
            </SidebarFooter>
        </Sidebar>
    )
}