import React from 'react'

import { CategoryView } from '@/modules/tenants/ui/views/category-view';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getQueryClient, trpc } from '@/trpc/server';

interface Props {
    params: Promise<{ slug: string; category: string }>
}

const CategoryPage = async ({ params }: Props) => {

    const { slug, category } = await params;
    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.categories.getOne.queryOptions({ category: category }))

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <CategoryView slug={slug} category={category} />
        </HydrationBoundary>
    )
}

export default CategoryPage