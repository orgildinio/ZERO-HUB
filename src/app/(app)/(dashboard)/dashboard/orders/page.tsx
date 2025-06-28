import { getQueryClient } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

{/*
total orders monthly/yearly
orders region 
top regions
--under table
recent orders
completed orders
remain orders    
*/}

const Page = () => {

    const queryClient = getQueryClient();

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            {/* <OrdersView /> */}
        </HydrationBoundary>
    )
}

export default Page