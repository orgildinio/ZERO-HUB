"use client"

import { ProductCard } from "./product-card";

import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { Media } from "@/payload-types";

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

export const ProductsList = ({ slug }: { slug: string }) => {
    const trpc = useTRPC();

    const { data } = useSuspenseInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
        {
            tenantSlug: slug,
            limit: 4,
        },
        {
            getNextPageParam: (lastPage) => lastPage.docs.length > 0 ? lastPage.nextPage : undefined
        }
    ))

    return (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
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
    )
}