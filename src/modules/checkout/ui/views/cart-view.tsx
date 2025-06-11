"use client"

import Link from 'next/link'
import React from 'react'
import { useCart } from '../../hooks/use-cart'
import { CartItem } from '../components/cart-item'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTRPC } from '@/trpc/client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { Separator } from '@/components/ui/separator'

export const CartView = ({ slug }: { slug: string }) => {

    console.log(slug)
    const { totalItems, cartItems, incrementQuantity, decrementQuantity, getProductQuantity, removeProduct } = useCart(slug);

    const productIds = cartItems.map((item) => (
        item.productId
    ));

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.checkout.getProducts.queryOptions({ productIds: productIds }))

    const totalPrice = data?.docs.reduce((acc, product) => {
        const quantity = getProductQuantity(product.id);
        const unitPrice = product.pricing?.compareAtPrice || 0;
        return acc + unitPrice * quantity;
    }, 0);

    return (
        <div className="container px-2 py-8 md:px-6 md:py-12 mx-auto">
            <div className="mb-8 flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Shopping Cart</h1>
                <p className="text-gray-500">{totalItems} items in your cart</p>
            </div>
            {totalItems > 0 ? (
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                    <div className="lg:col-span-2">
                        <div className="rounded-lg border">
                            <div className="hidden border-b p-4 sm:grid sm:grid-cols-6">
                                <div className="col-span-3 font-medium">Product</div>
                                <div className="font-medium">Price</div>
                                <div className="font-medium">Quantity</div>
                                <div className="font-medium">Total</div>
                            </div>
                            {data?.docs.map((product) => (
                                <CartItem
                                    id={product.id}
                                    key={product.id}
                                    image={product.image?.url}
                                    name={product.name}
                                    price={product.pricing.compareAtPrice!}
                                    productQuantity={getProductQuantity(product.id)}
                                    incrementQuantity={incrementQuantity}
                                    decrementQuantity={decrementQuantity}
                                    removeProduct={removeProduct}
                                />
                            ))}
                        </div>
                        <div className="mt-6 flex justify-between">
                            <Button variant="outline" asChild>
                                <Link href="/products">Continue Shopping</Link>
                            </Button>
                            <Button variant="outline">Update Cart</Button>
                        </div>
                    </div>
                    <div>
                        <div className="rounded-lg border p-6">
                            <h2 className="mb-4 text-lg font-medium">Order Summary</h2>
                            <div className="space-y-3">
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span>${totalPrice}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Shipping</span>
                                    <span>${15}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-600">Tax</span>
                                    <span>${(totalPrice * 0.14).toFixed(2)}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-medium">
                                    <span>Total</span>
                                    <span>${(totalPrice + (totalPrice * 0.14) + 15)}</span>
                                </div>
                            </div>
                            <Button className="mt-6 w-full" asChild>
                                <Link href="/checkout">Proceed to Checkout</Link>
                            </Button>
                            <div className="mt-6">
                                <h3 className="mb-2 font-medium">Promo Code</h3>
                                <div className="flex gap-2">
                                    <Input placeholder="Enter code" className="flex-1" />
                                    <Button variant="outline">Apply</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center rounded-lg border py-16 text-center">
                    <h2 className="mb-2 text-xl font-medium">Your cart is empty</h2>
                    <p className="mb-6 text-gray-500">Looks like you haven&apos;t added any products to your cart yet.</p>
                    <Button asChild>
                        <Link href="/products">Start Shopping</Link>
                    </Button>
                </div>
            )}
        </div>
    )
}