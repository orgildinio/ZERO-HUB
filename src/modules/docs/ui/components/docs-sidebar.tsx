import { BookOpen, ChevronDown, Clock, FileText, Globe, HelpCircle, Key, Map, Paintbrush, Rocket, Settings, Shield, Users } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import React, { useState } from "react"

import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type DocsSidebarNavProps = React.HTMLAttributes<HTMLDivElement>

export const DocsSidebar = ({ className, ...props }: DocsSidebarNavProps) => {
    return (
        <div className={cn("space-y-6", className)} {...props}>
            <div className="space-y-3">
                <div className="flex items-center gap-2 px-2">
                    <Rocket className="h-4 w-4 text-blue-400" />
                    <h4 className="text-sm font-semibold text-white">Getting Started</h4>
                </div>
                <div className="space-y-1">
                    <NavLink href="/docs" exact icon={<BookOpen className="h-4 w-4" />}>
                        Overview
                    </NavLink>
                    <NavLink href="/docs/introduction" icon={<FileText className="h-4 w-4" />}>
                        Introduction
                    </NavLink>
                    <NavLink href="/docs/account-setup" icon={<FileText className="h-4 w-4" />}>
                        Accout Setup
                    </NavLink>
                    <NavLink href="/docs/account-subscription" icon={<FileText className="h-4 w-4" />}>
                        Account Subscription
                    </NavLink>
                    <NavLink href="/docs/account-verification" icon={<FileText className="h-4 w-4" />}>
                        Account Verification
                    </NavLink>
                </div>
            </div>

            <div className="space-y-3">
                <NavGroup icon={<Paintbrush className="h-4 w-4 text-amber-400" />} title="Templates" badge="Secure">
                    <NavLink href="/docs/templates/purchase" icon={<Key className="h-4 w-4" />}>
                        Purchase Templates
                    </NavLink>
                    <NavLink href="/docs/templates/apply" icon={<Globe className="h-4 w-4" />}>
                        Apply Templates
                    </NavLink>
                    <NavLink href="/docs/templates/customize" icon={<Users className="h-4 w-4" />}>
                        Customize Templates
                    </NavLink>
                    <NavLink href="/docs/templates/custom" icon={<Shield className="h-4 w-4" />}>
                        Custom Templates
                    </NavLink>
                </NavGroup>
            </div>

            <div className="space-y-3">
                <div className="flex items-center gap-2 px-2">
                    <HelpCircle className="h-4 w-4 text-cyan-400" />
                    <h4 className="text-sm font-semibold text-white">Resources</h4>
                </div>
                <div className="space-y-1">
                    <NavLink href="/docs/resources/faq" icon={<HelpCircle className="h-4 w-4" />}>
                        FAQ
                    </NavLink>
                    <NavLink href="/docs/resources/troubleshooting" icon={<Settings className="h-4 w-4" />}>
                        Troubleshooting
                    </NavLink>
                    <NavLink href="/docs/resources/changelog" icon={<Clock className="h-4 w-4" />}>
                        Changelog
                    </NavLink>
                    <NavLink href="/docs/resources/roadmap" icon={<Map className="h-4 w-4" />}>
                        Roadmap
                    </NavLink>
                </div>
            </div>
        </div>
    )
}

interface NavLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode
    href: string
    exact?: boolean
    icon?: React.ReactNode
}

function NavLink({ children, href, exact = false, icon, className, ...props }: NavLinkProps) {
    const pathname = usePathname()
    const isActive = exact ? pathname === href : pathname?.startsWith(href)

    return (
        <Link
            href={href}
            className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-zinc-800/50",
                isActive
                    ? "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-l-2 border-blue-500 text-white shadow-lg"
                    : "text-zinc-400 hover:text-white",
                className,
            )}
            {...props}
        >
            {icon && (
                <span
                    className={cn(
                        "transition-colors duration-200",
                        isActive ? "text-blue-400" : "text-zinc-500 group-hover:text-zinc-300",
                    )}
                >
                    {icon}
                </span>
            )}
            <span className="flex-1">{children}</span>
        </Link>
    )
}

interface NavGroupProps {
    title: string
    children: React.ReactNode
    icon?: React.ReactNode
    defaultOpen?: boolean
    badge?: string
}

function NavGroup({ title, children, icon, defaultOpen = false, badge }: NavGroupProps) {
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const pathname = usePathname()

    const childLinks = React.Children.toArray(children) as React.ReactElement<NavLinkProps>[]
    const isActive = childLinks.some((child) => pathname?.startsWith(child.props.href))

    React.useEffect(() => {
        if (isActive) {
            setIsOpen(true)
        }
    }, [isActive])

    return (
        <div className="space-y-1">
            <button
                className={cn(
                    "group flex w-full items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium hover:bg-zinc-800/50",
                    isActive || isOpen ? "text-white" : "text-zinc-400 hover:text-white",
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3">
                    {icon && (
                        <span
                            className={cn(
                                "transition-colors duration-200",
                                isActive || isOpen ? "text-current" : "text-zinc-500 group-hover:text-zinc-300",
                            )}
                        >
                            {icon}
                        </span>
                    )}
                    <span>{title}</span>
                    {badge && (
                        <Badge variant="outline" className="text-xs border-zinc-700 text-zinc-400">
                            {badge}
                        </Badge>
                    )}
                </div>
                <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", isOpen ? "rotate-180" : "")} />
            </button>
            {isOpen && <div className="ml-6 space-y-1 border-l border-zinc-800 pl-4">{children}</div>}
        </div>
    )
}