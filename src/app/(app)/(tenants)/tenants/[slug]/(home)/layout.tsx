import React from 'react'
import "./style.css";

import { Header } from '@/modules/tenants/ui/components/header';
import { ThemeProvider } from '@/providers/theme-provider';

interface Props {
    children: React.ReactNode;
}

const TenantLayout = ({ children }: Props) => {

    // const queryClient = getQueryClient();
    // void queryClient.prefetchQuery(trpc.tenants.getOne.queryOptions({
    //     slug: slug
    // }));
    return (
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
            {/* <HydrationBoundary state={dehydrate(queryClient)}> */}
            {/* <Suspense fallback={<HeaderSkeleton />}> */}
            <Header slug={'Cactus'} />
            {/* </Suspense> */}
            {/* </HydrationBoundary> */}
            <main className='min-h-screen'>
                {children}
            </main>
        </ThemeProvider >
    )
}

export default TenantLayout