"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { ProductCard } from "./product-card";

export const ProductsList = ({ slug }: { slug: string }) => {
    const trpc = useTRPC();
    const { data } = useSuspenseInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
        {
            tenantSlug: 'cactus',
            limit: 4,
        },
        {
            getNextPageParam: (lastPage) => lastPage.docs.length > 0 ? lastPage.nextPage : undefined
        }
    ))
    console.log(data)
    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {data?.pages.flatMap((page) => page.docs).map((product) => (
                <ProductCard
                    key={product.slug}
                    name={product.name}
                    price={product.pricing.compareAtPrice}
                    originalPrice={product.pricing.price}
                    image='/placeholder.png'
                    category={'Indoor plants'}
                    badge={product.badge}
                    featured={true}
                    slug={product.slug}
                    tenantSlug={slug}
                />
            ))}
        </div>
    )
}