import { CartView } from "@/modules/checkout/ui/views/cart-view"

interface Props {
    params: Promise<{ slug: string }>
}

const CartPage = async ({ params }: Props) => {

    const { slug } = await params;

    return <CartView slug={slug} />

}

export default CartPage