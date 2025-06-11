"use client"

import Image from "next/image"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { Media } from "@/payload-types";
import { ShieldCheck, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RichText } from '@payloadcms/richtext-lexical/react'

type ProductImage = {
    image: Media;
    isPrimary?: boolean | null;
};

const getProductImage = (images: ProductImage[] | undefined): string | null => {
    if (!images || images.length === 0) return null

    const primaryImage = images.find(img => img.isPrimary)
    if (primaryImage?.image && typeof primaryImage.image === 'object' && 'url' in primaryImage.image) {
        return primaryImage.image.url || null;
    }

    const firstImage = images[0];
    if (firstImage?.image && typeof firstImage.image === 'object' && 'url' in firstImage.image) {
        return firstImage.image.url || null;
    }

    return null;
}

export const ProductHero = ({ slug, product }: { slug: string, product: string }) => {

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.products.getOne.queryOptions({ product: product }))

    return (
        <>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="flex flex-col gap-4">
                    <div className="relative aspect-square overflow-hidden rounded-lg border bg-gray-50">
                        <Image
                            src={getProductImage(data.images)!}
                            alt={data.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {data.images.map((image, i) => (
                            <div key={i} className="relative aspect-square overflow-hidden rounded-md border bg-gray-50">
                                <Image
                                    src={image.image.url || "/placeholder.png"}
                                    alt={`${data.name} - View ${i + 1}`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-2xl font-bold md:text-3xl">{data.name}</h1>
                        <div className="mt-2 flex items-center gap-2">
                            <div className="flex">
                                {/* {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`h-4 w-4 ${i < Math.floor(data.rating) ? "fill-gray-900 text-gray-900" : i < product.rating ? "fill-gray-900 text-gray-900 [clip-path:inset(0_50%_0_0)]" : "text-gray-300"}`}
                                    />
                                ))} */}
                            </div>
                            {/* <span className="text-sm text-gray-600">
                                {product.rating} ({product.reviewCount} reviews)
                            </span> */}
                        </div>
                    </div>

                    <div className="text-2xl font-bold">${data.pricing.compareAtPrice}</div>

                    

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button size="lg" className="flex-1">
                            Add to Cart
                        </Button>
                        <Button variant="outline" size="lg">
                            Save to Wishlist
                        </Button>
                    </div>

                    <div className="rounded-lg border bg-gray-50 p-4">
                        <div className="flex items-center gap-3">
                            <Truck className="h-5 w-5 text-gray-600" />
                            <div>
                                <p className="font-medium">Free Shipping</p>
                                <p className="text-sm text-gray-500">Delivery in 3-5 business days</p>
                            </div>
                        </div>
                        <Separator className="my-3" />
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-5 w-5 text-gray-600" />
                            <div>
                                <p className="font-medium">2-Year Warranty</p>
                                <p className="text-sm text-gray-500">Shop with confidence</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-2 font-medium">Description</h3>
                        {data.description ? (
                                <RichText data={data.description} />
                            ) : (
                                <p className="text-gray-600">No description provided.</p>
                            )}
                    </div>

                    <div>
                        <h3 className="mb-2 font-medium">Details</h3>
                        {/* <ul className="list-inside list-disc space-y-1 text-gray-600">
                            {data.specifications.map((detail, i) => (
                                <li key={i}>{detail}</li>
                            ))}
                        </ul> */}
                    </div>
                </div>
            </div>
        </>
    )
}