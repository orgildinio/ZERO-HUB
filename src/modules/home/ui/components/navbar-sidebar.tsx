import { memo, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NavbarDropdown } from "./navbar-dropdown";
import { featureItems, resourceItems } from "@/constants";

interface NavbarItem {
    href: string;
    children: React.ReactNode;
}

interface Props {
    items: NavbarItem[];
    featuresDropdownRef: React.RefObject<HTMLDivElement | null>;
    featuresContainerRef: React.RefObject<HTMLDivElement | null>;
    featuresOverflow: boolean;
    resourcesDropdownRef: React.RefObject<HTMLDivElement | null>;
    resourcesContainerRef: React.RefObject<HTMLDivElement | null>;
    resourcesOverflow: boolean;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const NavLink = memo<{
    href: string;
    children: React.ReactNode;
    onClick: () => void;
}>(({ href, children, onClick }) => (
    <Link
        href={href}
        className="w-full text-left p-3 font-medium flex items-center text-base hover:bg-zinc-800/50 transition-colors"
        onClick={onClick}
    >
        {children}
    </Link>
));

NavLink.displayName = "NavLink";

const AuthSection = memo<{ onClose: () => void }>(({ onClose }) => (
    <div className="pt-4 border-t border-zinc-800 space-y-4 px-4">
        <Button
            variant="outline"
            className="w-full border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white"
            asChild
        >
            <Link href="/login" prefetch onClick={onClose}>
                Login
            </Link>
        </Button>

        <Button
            className="w-full bg-zinc-100 text-black hover:bg-zinc-200"
            asChild
        >
            <Link href="/sign-up" prefetch onClick={onClose}>
                Start Selling
            </Link>
        </Button>
    </div>
));

AuthSection.displayName = "AuthSection";

export const NavbarSidebar = memo<Props>(({
    items,
    onOpenChange,
    open,
    featuresContainerRef,
    featuresDropdownRef,
    featuresOverflow,
    resourcesContainerRef,
    resourcesDropdownRef,
    resourcesOverflow
}) => {
    const pathname = usePathname();
    const handleClose = useCallback(() => onOpenChange(false), [onOpenChange]);

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent
                side="left"
                className="p-0 transition-none border-zinc-800 w-full"
                aria-label="Navigation menu"
            >
                <SheetHeader className="p-4 border-b border-zinc-800">
                    <SheetTitle>Menu</SheetTitle>
                </SheetHeader>

                <ScrollArea className="flex flex-col overflow-auto h-full pb-2">
                    <NavbarDropdown
                        title="Features"
                        subtitle="Explore Features"
                        active={pathname}
                        containerRef={featuresContainerRef}
                        dropdownRef={featuresDropdownRef}
                        items={featureItems}
                        overflow={featuresOverflow}
                        mobile
                    />
                    <NavbarDropdown
                        title="Resources"
                        subtitle="Explore Resources"
                        active={pathname}
                        containerRef={resourcesContainerRef}
                        dropdownRef={resourcesDropdownRef}
                        items={resourceItems}
                        overflow={resourcesOverflow}
                        mobile
                    />
                    {items.map((item) => (
                        <NavLink
                            key={item.href}
                            href={item.href}
                            onClick={handleClose}
                        >
                            {item.children}
                        </NavLink>
                    ))}

                    <AuthSection onClose={handleClose} />
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
});

NavbarSidebar.displayName = "NavbarSidebar";