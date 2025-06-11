import { Metadata } from 'next'
import React from 'react'

import { ProductView } from '@/modules/tenants/ui/views/product-view'
import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'

export const metadata: Metadata = {
    title: "Product Details",
    description: "View detailed information about this product",
}

interface Props {
    params: Promise<{ slug: string; product: string }>
}

const ProductPage = async ({ params }: Props) => {

    const { slug, product } = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.products.getOne.queryOptions({ product: product }))
    void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({ tenantSlug: slug }))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <ProductView slug={slug} product={product} />
        </HydrationBoundary>
    )
}

export default ProductPage