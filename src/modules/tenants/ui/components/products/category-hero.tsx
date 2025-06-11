"use client"

import { Award, Star, Users } from "lucide-react"
import Image from "next/image"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export const CategoryHero = ({ category }: { category: string }) => {

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.categories.getOne.queryOptions({ category: category }))

    return (
        <>
            <section className="relative overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50">
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-xl animate-pulse" />
                    <div className="absolute bottom-20 right-16 w-24 h-24 bg-orange-200/40 rounded-full blur-lg animate-pulse delay-1000" />
                    <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-stone-300/50 rounded-full blur-md animate-bounce delay-500" />
                </div>
                <div className="container px-2 py-16 md:px-6 md:py-24 mx-auto">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                {data.featured && (
                                    <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
                                        <Award className="h-4 w-4" />
                                        Featured Collection
                                    </div>
                                )}
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-stone-900 mb-6 md:text-5xl lg:text-6xl">
                                {data.name}
                                <span className="block text-2xl md:text-3xl lg:text-4xl font-normal text-stone-600 mt-2">Collection</span>
                            </h1>
                            <p className="text-xl text-stone-600 mb-8 leading-relaxed max-w-lg">
                                {data.description}
                            </p>
                            <div className="flex flex-wrap gap-6 mb-8">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center">
                                        {[...Array(5)].map((_, i) => (
                                            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                                        ))}
                                    </div>
                                    <span className="text-sm text-stone-600">4.8 average rating</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users className="h-4 w-4 text-stone-600" />
                                    <span className="text-sm text-stone-600">2.3k+ customers</span>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-6 text-center">
                                <div className="p-4 rounded-lg bg-white/60 backdrop-blur-sm">
                                    <div className="text-2xl font-bold text-stone-900">{data.stats?.productCount}</div>
                                    <div className="text-sm text-stone-600">Products</div>
                                </div>
                                <div className="p-4 rounded-lg bg-white/60 backdrop-blur-sm">
                                    <div className="text-2xl font-bold text-stone-900">4.8</div>
                                    <div className="text-sm text-stone-600">Rating</div>
                                </div>
                                <div className="p-4 rounded-lg bg-white/60 backdrop-blur-sm">
                                    <div className="text-2xl font-bold text-stone-900">Free</div>
                                    <div className="text-sm text-stone-600">Shipping</div>
                                </div>
                            </div>
                        </div>
                        <div className="relative">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200 shadow-2xl">
                                <Image
                                    src={data.images.thumbnail.url!}
                                    alt={`collection`}
                                    fill
                                    priority
                                    className="object-cover"
                                />
                            </div>
                            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg animate-float">
                                <div className="text-lg font-bold text-stone-900">New</div>
                                <div className="text-sm text-stone-600">Arrivals</div>
                            </div>

                            <div className="absolute -bottom-6 -left-6 bg-amber-500 text-white p-4 rounded-xl shadow-lg animate-float delay-1000">
                                <div className="text-lg font-bold">Free</div>
                                <div className="text-sm">Delivery</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-8 border-b border-stone-200/50">
                <div className="container px-2 md:px-6 mx-auto">
                    <div className="flex flex-wrap gap-3">
                        <Button
                            variant="outline"
                            className="rounded-full border-stone-300 hover:border-amber-500 hover:text-amber-600"
                        >
                            All {data.name}
                        </Button>
                        {data.subcategories.map((subcategory) => (
                            <Button key={subcategory.slug} variant="ghost" className="rounded-full hover:bg-amber-50 hover:text-amber-600">
                                {subcategory.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export const CategoryHeroSkeleton = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50">
            <div className="container px-4 py-16 md:px-6 md:py-24">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    <div className="relative z-10">
                        {/* Badge skeleton */}
                        <div className="flex items-center gap-4 mb-6">
                            <Skeleton className="h-8 w-40 rounded-full" />
                        </div>

                        {/* Title skeleton */}
                        <div className="mb-6">
                            <Skeleton className="h-12 w-full mb-2 md:h-16 lg:h-20" />
                            <Skeleton className="h-8 w-32 md:h-10 lg:h-12" />
                        </div>

                        {/* Description skeleton */}
                        <div className="mb-8">
                            <Skeleton className="h-5 w-full mb-2" />
                            <Skeleton className="h-5 w-4/5 mb-2" />
                            <Skeleton className="h-5 w-3/5" />
                        </div>

                        {/* Rating and users skeleton */}
                        <div className="flex flex-wrap gap-6 mb-8">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Skeleton key={i} className="h-4 w-4 rounded-sm" />
                                    ))}
                                </div>
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        </div>

                        {/* Stats skeleton */}
                        <div className="grid grid-cols-3 gap-6 text-center">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="p-4 rounded-lg bg-white/60 backdrop-blur-sm">
                                    <Skeleton className="h-8 w-12 mx-auto mb-1" />
                                    <Skeleton className="h-4 w-16 mx-auto" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image skeleton */}
                    <div className="relative">
                        <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200">
                            <Skeleton className="h-full w-full" />
                        </div>

                        {/* Floating elements skeleton */}
                        <div className="absolute -top-6 -right-6">
                            <Skeleton className="h-16 w-16 rounded-xl" />
                        </div>
                        <div className="absolute -bottom-6 -left-6">
                            <Skeleton className="h-16 w-16 rounded-xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}