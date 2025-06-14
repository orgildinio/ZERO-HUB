import React, { Suspense } from 'react'

import { WishlistView } from '@/modules/tenants/ui/views/wishlist-view'

interface Props {
    params: Promise<{ slug: string }>
}

const page = async ({ params }: Props) => {

    const { slug } = await params;

    return (
        <Suspense>
            <WishlistView slug={slug} />
        </Suspense>
    )
}

export default page