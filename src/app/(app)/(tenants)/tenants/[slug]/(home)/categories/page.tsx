import { CategoriesView } from '@/modules/tenants/ui/views/categories-view'
import { getQueryClient, trpc } from '@/trpc/server';
import { HydrationBoundary } from '@tanstack/react-query'
import React from 'react'

interface Props {
    params: Promise<{ slug: string }>
}

const CategoriesPage = async ({ params }: Props) => {

    const { slug } = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions({
        tenantSlug: slug
    }))

    return (
        <HydrationBoundary>
            <CategoriesView slug={slug} />
        </HydrationBoundary>
    )
}

export default CategoriesPage