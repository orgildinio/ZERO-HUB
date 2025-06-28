import { getQueryClient } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";


const Page = () => {

    const queryClient = getQueryClient();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {/* <OrdersView /> */}
        </HydrationBoundary>
    )
}

export default Page