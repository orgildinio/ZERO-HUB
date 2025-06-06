import { HomeView } from "@/modules/tenants/ui/views/home-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";

export const revalidate = 3600;

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;

    return {
        title: `${slug} - Premium Products`,
        description: "Thoughtfully crafted pieces that transform your space",
    };
}