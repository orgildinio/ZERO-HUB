"use client"

import Image from "next/image"
import { useState } from "react"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { Media } from "@/payload-types";
import { ShieldCheck, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { RichText } from '@payloadcms/richtext-lexical/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ProductReview } from "./product-review";
import { useCart } from "@/modules/checkout/hooks/use-cart";

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

export const ProductHero = ({ product, slug }: { slug: string, product: string }) => {
    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.products.getOne.queryOptions({ product: product }))

    const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {};
        data.variants?.forEach((variant) => {
            if (variant.options && variant.options.length > 0) {
                initial[variant.name] = variant.options[0].label;
            }
        });
        return initial;
    });

    const calculateTotalPrice = () => {
        const basePrice = data.pricing.price || 0;
        let totalAdjustment = 0;

        data.variants?.forEach((variant) => {
            const selectedLabel = selectedVariants[variant.name];
            const selectedOption = variant.options?.find(option => option.label === selectedLabel);
            if (selectedOption?.priceAdjustment) {
                totalAdjustment += selectedOption.priceAdjustment;
            }
        });

        return totalAdjustment !== 0 ? totalAdjustment : basePrice;
    };

    const handleVariantChange = (variantName: string, optionLabel: string) => {
        setSelectedVariants(prev => ({
            ...prev,
            [variantName]: optionLabel
        }));
    };

    const { addProduct } = useCart(slug)

    return (
        <>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                <div className="flex flex-col gap-4">
                    <div className="relative aspect-square overflow-hidden rounded-lg border bg-gray-50">
                        <Image
                            src={getProductImage(data.images) || "/placeholder.png"}
                            alt={data.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                        {data.images?.map((image, i) => (
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
                                {/* Rating stars placeholder */}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <div className="text-2xl font-bold">
                            ${calculateTotalPrice().toFixed(2)}
                        </div>
                        {data.pricing.compareAtPrice && data.pricing.compareAtPrice > (data.pricing.price || 0) && (
                            <div className="text-lg text-gray-500 line-through">
                                ${data.pricing.compareAtPrice.toFixed(2)}
                            </div>
                        )}
                    </div>

                    {data.variants && data.variants.length > 0 && (
                        <div className="space-y-4">
                            {data.variants.map((variant) => (
                                <div key={variant.name} className="space-y-2">
                                    <h3 className="font-medium">{variant.name}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {variant.options?.map((option) => {
                                            const isSelected = selectedVariants[variant.name] === option.label;
                                            return (
                                                <button
                                                    key={option.label}
                                                    onClick={() => handleVariantChange(variant.name, option.label)}
                                                    className={cn(
                                                        "rounded-md border px-3 py-2 text-sm transition-colors",
                                                        isSelected
                                                            ? "border-gray-900 bg-gray-900 text-white"
                                                            : "border-gray-300 bg-white text-gray-900 hover:border-gray-400"
                                                    )}
                                                >
                                                    <span>{option.label}</span>
                                                    {option.priceAdjustment && option.priceAdjustment !== 0 && (
                                                        <span className="ml-1 text-xs">
                                                            ${option.priceAdjustment.toFixed(2)}
                                                        </span>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button size="lg" className="flex-1" onClick={() => addProduct}>
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
                                <p className="font-medium">
                                    {data.shipping?.freeShipping ? "Free Shipping" : "Shipping Available"}
                                </p>
                                <p className="text-sm text-gray-500">Delivery in 3-5 business days</p>
                            </div>
                        </div>
                        <Separator className="my-3" />
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-5 w-5 text-gray-600" />
                            <div>
                                <p className="font-medium">{data.refundPolicy.replace('-', ' ').toUpperCase()} Policy</p>
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
                </div>
            </div>
            <div className="mt-12">
                <Tabs defaultValue="specifications">
                    <TabsList className="w-full justify-start">
                        <TabsTrigger value="specifications">Specifications</TabsTrigger>
                        <TabsTrigger value="reviews">Reviews</TabsTrigger>
                    </TabsList>
                    <TabsContent value="specifications" className="mt-6">
                        <div className="rounded-lg border">
                            {data.specifications && data.specifications.length > 0 ? (
                                data.specifications.map((spec) => (
                                    <div key={spec.name} className={cn("border-b last:border-b-0")}>
                                        <div className="grid grid-cols-2 gap-4 px-4 py-3">
                                            <div className="font-medium">{spec.name}</div>
                                            <div className="text-gray-600">{spec.value}</div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-8 text-center text-gray-500">
                                    No specifications available
                                </div>
                            )}
                        </div>
                    </TabsContent>
                    <TabsContent value="reviews" className="mt-6">
                        <ProductReview
                            ratingDistribution={data.ratingDistribution}
                            reviewCount={data.reviewCount}
                            reviewRating={data.reviewRating}
                            reviews={data.reviews}
                            product={product}
                        />
                    </TabsContent>
                </Tabs>
            </div >
        </>
    )
}