import React, { Suspense } from 'react'

import { getQueryClient, trpc } from '@/trpc/server';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Header, HeaderSkeleton } from '@/modules/tenants/ui/components/header';

interface Props {
    children: React.ReactNode;
    params: Promise<{ slug: string }>;
}

const TenantLayout = async ({ children, params }: Props) => {
    const { slug } = await params;

    const queryClient = getQueryClient();
    void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({
        slug: slug
    }));
    return (
        <div>
            <HydrationBoundary state={dehydrate(queryClient)}>
                <Suspense fallback={<HeaderSkeleton />}>
                    <Header slug={slug} />
                </Suspense>
            </HydrationBoundary>
            <main className='min-h-screen'>
                {children}
            </main>
        </div>
    )
}

export default TenantLayout