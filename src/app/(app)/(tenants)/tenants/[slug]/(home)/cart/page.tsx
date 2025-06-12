import { Suspense } from "react";

import { CartLoading, CartView } from "@/modules/checkout/ui/views/cart-view"

interface Props {
    params: Promise<{ slug: string }>
}

const CartPage = async ({ params }: Props) => {

    const { slug } = await params;

    return (
        <Suspense fallback={<CartLoading />}>
            <CartView slug={slug} />
        </Suspense>
    )

}

export default CartPage