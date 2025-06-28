import React from 'react'

import { caller, getQueryClient, trpc } from '@/trpc/server'
import { SalesView } from '@/modules/analytics/ui/views/sales-view'
import { Tenant } from '@/payload-types';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export const dynamic = 'force-dynamic'

const Page = async () => {

    const session = await caller.auth.session();
    const tenant = session.user?.tenants?.[0].tenant as Tenant;

    const queryClient = getQueryClient();

    void queryClient.prefetchQuery(trpc.analytics.getTenantMonthlySales.queryOptions({
        tenantId: tenant.id,
    }));
    void queryClient.prefetchQuery(trpc.analytics.getTenantTopCategories.queryOptions({
        tenantId: tenant.id,
    }));
    void queryClient.prefetchQuery(trpc.analytics.getTenantTopProducts.queryOptions({
        tenantId: tenant.id
    }));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SalesView
                tenantId={tenant.id}
            />
        </HydrationBoundary>
    )
}

export default Page