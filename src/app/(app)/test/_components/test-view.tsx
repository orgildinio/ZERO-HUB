"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";

type ProductImage = {
    imageId: string;
    parentId: string;
    isPrimary: boolean | null;
    order: number;
    url: string | null;
    filename: string | null;
}

const getProductImage = (images: ProductImage[] | undefined): string | null => {
    if (!images?.length) return null

    const primaryImage = images.find((img) => img.isPrimary)
    if (primaryImage) {
        return primaryImage.url || null
    }

    const firstImage = images[0]
    if (firstImage) {
        return firstImage.url || null
    }

    return null
}

export const TestView = ({ slug }: { slug: string }) => {

    const trpc = useTRPC();
    const { data } = useSuspenseInfiniteQuery(trpc.products.getManyByDrizzle.infiniteQueryOptions(
        { slug: slug },
        {
            getNextPageParam: (lastPage) => {
                return lastPage.hasNextPage ? lastPage.nextCursor : undefined;
            }
        }
    ))
    return (
        <div>
            {data.pages.flatMap((page) => page.data).map((product, index) => (
                <div key={index}>
                    {getProductImage(product.images)}
                    {product.pricingCompareAtPrice}
                </div>
            ))}
        </div>
    )
}