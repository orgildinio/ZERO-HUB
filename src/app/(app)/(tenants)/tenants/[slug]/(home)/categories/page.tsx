import React from 'react'

import { CategoryListView } from '@/modules/tenants/ui/views/categories-list-view';
import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface Props {
    params: Promise<{ slug: string }>
}

const CategoriesPage = async ({ params }: Props) => {

    const { slug } = await params;
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions({
        tenantSlug: slug,
    }))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CategoryListView slug={slug} />
        </HydrationBoundary>
    )
}

export default CategoriesPage