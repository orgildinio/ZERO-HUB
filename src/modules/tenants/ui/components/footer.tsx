"use client"

import Link from "next/link";
import { Facebook, Instagram, Twitter } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton"
import { generateTenantUrl } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

interface Props {
    slug: string
}

export const Footer = ({ slug }: Props) => {

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));

    return (
        <footer className="border-t bg-white">
            <div className="container px-4 py-12 md:px-6 lg:py-16 mx-auto">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Link href={`${generateTenantUrl(slug)}`} className="mb-4 inline-block">
                            <span className="text-xl font-bold">{data}</span>
                        </Link>
                        <p className="mb-4 text-gray-600">
                            Minimalist design for modern living. Quality products that combine functionality with elegant simplicity.
                        </p>
                        <div className="flex gap-4">
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Facebook className="h-5 w-5" />
                                <span className="sr-only">Facebook</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Instagram className="h-5 w-5" />
                                <span className="sr-only">Instagram</span>
                            </Button>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Twitter className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-medium uppercase">Shop</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href={`${generateTenantUrl(slug)}/products`} className="text-gray-600 hover:text-gray-900">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href={`${generateTenantUrl(slug)}/categories`} className="text-gray-600 hover:text-gray-900">
                                    Furniture
                                </Link>
                            </li>
                            <li>
                                <Link href={`${generateTenantUrl(slug)}/categories`} className="text-gray-600 hover:text-gray-900">
                                    Lighting
                                </Link>
                            </li>
                            <li>
                                <Link href={`${generateTenantUrl(slug)}/categories`} className="text-gray-600 hover:text-gray-900">
                                    Decor
                                </Link>
                            </li>
                            <li>
                                <Link href={`${generateTenantUrl(slug)}/categories`} className="text-gray-600 hover:text-gray-900">
                                    Kitchen
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-medium uppercase">Company</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href={`${generateTenantUrl(slug)}/about`} className="text-gray-600 hover:text-gray-900">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href={`${generateTenantUrl(slug)}/contact`} className="text-gray-600 hover:text-gray-900">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href={`${generateTenantUrl(slug)}/contact`} className="text-gray-600 hover:text-gray-900">
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link href={`${generateTenantUrl(slug)}/contact`} className="text-gray-600 hover:text-gray-900">
                                    Press
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-medium uppercase">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/help" className="text-gray-600 hover:text-gray-900">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="text-gray-600 hover:text-gray-900">
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="text-gray-600 hover:text-gray-900">
                                    Returns
                                </Link>
                            </li>
                            <li>
                                <Link href="/size-guide" className="text-gray-600 hover:text-gray-900">
                                    Size Guide
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <p className="text-sm text-gray-600">© 2024 Minima. All rights reserved.</p>
                        <div className="flex gap-6">
                            <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="text-sm text-gray-600 hover:text-gray-900">
                                Terms of Service
                            </Link>
                            <Link href="/cookies" className="text-sm text-gray-600 hover:text-gray-900">
                                Cookie Policy
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer >
    )
}

export function FooterSkeleton() {
    return (
        <footer className="border-t bg-white">
            <div className="container px-4 py-12 md:px-6 lg:py-16 mx-auto">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <Skeleton className="mb-4 h-6 w-20" />
                        <div className="mb-4 space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-4/5" />
                            <Skeleton className="h-4 w-3/5" />
                        </div>
                        <div className="flex gap-4">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-10 w-10 rounded-full" />
                            ))}
                        </div>
                    </div>

                    {[...Array(3)].map((_, sectionIndex) => (
                        <div key={sectionIndex}>
                            <Skeleton className="mb-4 h-4 w-20" />
                            <div className="space-y-2">
                                {[...Array(5)].map((_, linkIndex) => (
                                    <Skeleton key={linkIndex} className="h-4 w-24" />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 border-t pt-8">
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Skeleton className="h-4 w-48" />
                        <div className="flex gap-6">
                            {[...Array(3)].map((_, i) => (
                                <Skeleton key={i} className="h-4 w-20" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
