import { HomeView } from "@/modules/tenants/ui/views/home-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

export const dynamic = "force-dynamic"

interface Props {
    params: Promise<{ slug: string }>
}

const TenantsPage = async ({ params }: Props) => {

    const { slug } = await params;

    const queryClient = getQueryClient();
    await Promise.all([
        queryClient.prefetchQuery(trpc.categories.getMany.queryOptions({ tenantSlug: slug })),
        queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({
            tenantSlug: slug,
            limit: 4
        })),
    ])

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <HomeView slug={slug} />
        </HydrationBoundary>
    )
}

export default TenantsPage