import React, { Suspense } from 'react'

import { CheckoutView } from '@/modules/checkout/ui/views/checkout-view'

interface Props {
    params: Promise<{ slug: string }>
}

const CheckoutPage = async ({ params }: Props) => {

    const { slug } = await params;

    return (
        <Suspense>
            <CheckoutView slug={slug} />
        </Suspense>
    )
}

export default CheckoutPage