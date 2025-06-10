import React from 'react'
import { Metadata } from 'next'

import { getQueryClient, trpc } from '@/trpc/server'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ProductsView } from '@/modules/tenants/ui/views/products-view'

export const metadata: Metadata = {
  title: "Products",
  description: "Browse our collection of minimalist products for your home",
}

interface Props {
  params: Promise<{ slug: string }>
}

const Products = async ({ params }: Props) => {

  const { slug } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchInfiniteQuery(trpc.products.getMany.infiniteQueryOptions({ tenantSlug: slug }))
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions({ tenantSlug: slug }))

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductsView slug={slug} />
    </HydrationBoundary>
  )
}

export default Products