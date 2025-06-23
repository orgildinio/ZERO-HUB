"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";

export const TestView = ({ slug }: { slug: string }) => {

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.products.getManyByDrizzle.queryOptions({ slug: slug }))
    console.log(data)
    return (
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
    )
}