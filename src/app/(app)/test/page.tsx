import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React from 'react'
import { TestView } from './_components/test-view';

const Page = () => {
    const queryClient = getQueryClient()
    void queryClient.prefetchQuery(trpc.products.getMany.queryOptions({ slug: 'cactus', limit: 12 }));
    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <TestView slug='cactus' />
        </HydrationBoundary>
    )
}

export default Page