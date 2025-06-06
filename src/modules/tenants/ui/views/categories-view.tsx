"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { CategoryCardSkeleton } from "../components/products/category-card";
import { generateTenantUrl } from "@/lib/utils";

export const CategoriesView = ({ slug }: { slug: string }) => {

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions({ tenantSlug: slug }))

    return (
        <div className="container px-2 py-8 md:px-6 md:py-12 mx-auto">
            <div className="mb-8 flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Categories</h1>
                <p className="text-gray-500">Browse our product categories</p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data.map((category) => (
                    <Suspense
                        key={category.slug}
                        fallback={<CategoryCardSkeleton />}
                    >
                        <Link
                            href={`${generateTenantUrl(slug)}/categories/${category.slug}`}
                            className="group overflow-hidden rounded-lg border bg-white transition-all hover:shadow-md"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                                <Image
                                    src={category.thumbnail.url || "/placeholder.png"}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-4">
                                <h2 className="text-lg font-medium">{category.name}</h2>
                                <p className="text-sm text-gray-500">{category.stats?.productCount} products</p>
                            </div>
                        </Link>
                    </Suspense>
                ))}
            </div>
        </div>
    )
}