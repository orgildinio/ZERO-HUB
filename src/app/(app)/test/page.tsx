import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React from 'react'
import { TestView } from './_components/test-view';

const Page = () => {
    const queryClient = getQueryClient()
    void queryClient.prefetchInfiniteQuery(trpc.products.getManyByDrizzle.infiniteQueryOptions({ slug: 'cactus' }));
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <TestView slug='cactus' />
        </HydrationBoundary>
    )
}

export default Page