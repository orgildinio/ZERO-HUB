"use client"

import { CategoryCard } from "./category-card"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { generateTenantUrl } from "@/lib/utils"
import { useMemo } from "react"

export const CategoriesList = ({ slug }: { slug: string }) => {

    const trpc = useTRPC()

    const queryOptions = useMemo(() => {
        return trpc.categories.getMany.queryOptions({
            tenantSlug: slug,
            limit: 4
        })
    }, [trpc.categories.getMany, slug])

    const { data } = useSuspenseQuery({
        ...queryOptions,
    })

    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {data.map((category) => (
                <CategoryCard
                    key={category.slug}
                    name={category.name}
                    image={category.images.thumbnail.url!}
                    itemCount={42}
                    href={`${generateTenantUrl(slug)}/categories/${category.slug}`}
                    description="Comfort meets elegance"
                />
            ))}
        </div>
    )
}