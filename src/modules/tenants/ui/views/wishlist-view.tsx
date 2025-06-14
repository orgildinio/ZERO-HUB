"use client"

import { ArrowRight, Heart, ShoppingBag } from "lucide-react"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { useWishlist } from "@/modules/products/hooks/use-wishlist";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { generateTenantUrl } from "@/lib/utils";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { ProductCard } from "../components/products/product-card";
import { Media } from "@/payload-types";
import { useCart } from "@/modules/checkout/hooks/use-cart";
import toast from "react-hot-toast";

export const WishlistView = ({ slug }: { slug: string }) => {

    const { wishlistItems, productIds } = useWishlist(slug);
    const { addProductToCart } = useCart(slug);

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.checkout.getProducts.queryOptions({ productIds: productIds }));

    const handleAllAddToCart = () => {
        productIds.map((productId) => (addProductToCart(productId)))
        toast.success("Products added to cart!")
    }

    return (
        <div className="bg-gradient-to-b from-stone-50 to-white min-h-screen">
            <section className="relative py-16 md:py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('/placeholder.png')] bg-cover bg-center opacity-5" />
                <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl animate-pulse" />
                <div className="absolute bottom-32 right-16 w-24 h-24 bg-orange-200/40 rounded-full blur-lg animate-pulse delay-1000" />
                <div className="container relative px-4 md:px-6 mx-auto">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-stone-700 shadow-lg mb-6">
                            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                            Your Favorites
                        </div>
                        <h1 className="mb-6 text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">My Wishlist</h1>
                        <p className="mb-8 text-xl text-stone-600 leading-relaxed">
                            Keep track of your favorite products and never miss out on the items you love
                        </p>
                    </div>
                </div>
            </section>
            <div className="container px-4 pb-16 md:px-6 md:pb-24 mx-auto">
                {wishlistItems.length > 0 ? (
                    <>
                        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-stone-900 mb-2">Saved Items</h2>
                                <p className="text-stone-600">{wishlistItems.length} items in your wishlist</p>
                            </div>
                        </div>
                        <Tabs defaultValue="grid" className="w-full">
                            <TabsContent value="grid" className="mt-0">
                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                    {data?.docs.map((product) => (
                                        <ProductCard
                                            id={product.id}
                                            key={product.slug}
                                            name={product.name}
                                            price={product.pricing.compareAtPrice}
                                            originalPrice={product.pricing.price}
                                            image={product.image?.url}
                                            category={product.category.name}
                                            badge={product.badge}
                                            featured={true}
                                            slug={product.slug}
                                            tenantSlug={slug}
                                        />
                                    ))}
                                </div>
                            </TabsContent>
                        </Tabs>
                        <div className="mt-12 flex justify-center">
                            <Button
                                className="bg-stone-900 hover:bg-amber-600 text-white rounded-full px-8 py-6 transition-all duration-300 transform hover:scale-105"
                                size="lg"
                                onClick={handleAllAddToCart}
                            >
                                <ShoppingBag className="h-5 w-5 mr-2" />
                                Add All to Cart
                            </Button>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="flex flex-col items-center justify-center rounded-2xl border border-stone-200 bg-white py-20 text-center shadow-sm">
                            <div className="relative w-40 h-40 mb-8">
                                <div className="absolute inset-0 bg-red-100 rounded-full opacity-50 animate-pulse"></div>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Heart className="h-20 w-20 text-red-500" strokeWidth={1.5} />
                                </div>
                            </div>
                            <h2 className="mb-4 text-3xl font-bold text-stone-900">Your wishlist is empty</h2>
                            <p className="mb-8 text-xl text-stone-600 max-w-md">
                                Start adding products you love to keep track of them and shop later.
                            </p>
                            <Button
                                asChild
                                className="bg-stone-900 hover:bg-amber-600 text-white rounded-full px-8 py-6 transition-all duration-300 transform hover:scale-105"
                                size="lg"
                            >
                                <Link href={`${generateTenantUrl(slug)}/products`} className="flex items-center gap-2">
                                    Start Shopping
                                    <ArrowRight className="h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}