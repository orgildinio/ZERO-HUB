"use client"

import { useState } from "react";
import { ProductCard } from "./product-card";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Media } from "@/payload-types";
import { Button } from "@/components/ui/button";

type ProductImage = {
    image: Media;
    isPrimary?: boolean | null;
};

const getProductImage = (images: ProductImage[] | undefined): string | null => {
    if (!images || images.length === 0) return null

    const primaryImage = images.find(img => img.isPrimary)
    if (primaryImage?.image && typeof primaryImage.image === 'object' && 'url' in primaryImage.image) {
        return primaryImage.image.url || null;
    }

    const firstImage = images[0];
    if (firstImage?.image && typeof firstImage.image === 'object' && 'url' in firstImage.image) {
        return firstImage.image.url || null;
    }

    return null;
}

export const ProductsGrid = ({ slug }: { slug: string }) => {

    const [sortBy, setSortBy] = useState("featured")

    const trpc = useTRPC();
    const { data, hasNextPage, isFetchingNextPage, fetchNextPage } = useSuspenseInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
        {
            tenantSlug: slug
        },
        {
            getNextPageParam: (lastPage) => lastPage.docs.length > 0 ? lastPage.nextPage : undefined
        }
    ))

    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <p className="text-gray-600">{data?.pages?.[0]?.docs.length} products</p>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="featured">Featured</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="name">Name: A to Z</SelectItem>
                            <SelectItem value="newest">Newest</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {data?.pages.flatMap((page) => page.docs).map((product) => (
                    <ProductCard
                        key={product.slug}
                        name={product.name}
                        price={product.pricing.compareAtPrice}
                        originalPrice={product.pricing.price}
                        image={getProductImage(product.images)}
                        category={product.category.name}
                        badge={product.badge}
                        featured={true}
                        slug={product.slug}
                        tenantSlug={slug}
                    />
                ))}
            </div>
            <div className="mt-12 flex justify-center">
                {hasNextPage && (
                    <Button disabled={isFetchingNextPage} onClick={() => fetchNextPage()} variant="outline">Load More Products</Button>
                )}
            </div>
        </div>
    )
}