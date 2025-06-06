"use client"

import React, { memo, useMemo } from 'react'
import Link from 'next/link'
import { ArrowRight, Leaf, Sparkles } from 'lucide-react'
import { Background } from '../components/background'
import Image from 'next/image'
import Newsletter from '../components/news-letter'

import { Button } from '@/components/ui/button'
import { generateTenantUrl } from '@/lib/utils'

const HERO_STATS = [
    { value: "10K+", label: "Happy Customers" },
    { value: "500+", label: "Unique Products" },
    { value: "50+", label: "Countries Served" }
] as const

export const HomeView = memo(({ slug }: { slug: string }) => {
    // const trpc = useTRPC()

    // const categoriesQuery = useMemo(() =>
    //     trpc.categories.getMany.queryOptions({ tenantSlug: slug }),
    //     [trpc.categories.getMany, slug]
    // )

    // const productsQuery = useMemo(() =>
    //     trpc.products.getMany.infiniteQueryOptions(
    //         { tenantSlug: slug },
    //         { getNextPageParam: (lastpage) => lastpage.docs.length > 0 ? lastpage.nextPage : undefined }
    //     ),
    //     [trpc.products.getMany, slug]
    // )

    // const { data: categories } = useSuspenseQuery(categoriesQuery)
    // const { data: products } = useSuspenseInfiniteQuery(productsQuery)

    // const featuredCategories = useMemo(() => categories.slice(0, 4), [categories])
    // const featuredProducts = useMemo(() =>
    //     products?.pages.flatMap((page) => page.docs).slice(0, 4) || [],
    //     [products]
    // )

    const tenantUrl = useMemo(() => generateTenantUrl(slug), [slug])

    return (
        <div className="flex flex-col">
            <section className="relative min-h-[90vh] w-full overflow-hidden bg-gradient-to-br from-stone-50 via-amber-50 to-orange-50">
                <Background />
                <div className="relative flex min-h-[90vh] flex-col items-center justify-center px-4 text-center">
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/80 backdrop-blur-sm px-4 py-2 text-sm font-medium text-stone-700 shadow-lg">
                        <Sparkles className="h-4 w-4 text-amber-500" />
                        New Collection Available
                    </div>

                    <h1 className="mb-6 max-w-4xl text-5xl font-bold tracking-tight text-stone-900 md:text-6xl lg:text-7xl">
                        Product That
                        <span className="block bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                            Speaks to You
                        </span>
                    </h1>

                    <p className="mb-8 max-w-2xl text-xl text-stone-600 leading-relaxed">
                        Thoughtfully crafted pieces that transform your space into a sanctuary of style and comfort
                    </p>

                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Button size="lg" className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105" asChild>
                            <Link href={`${tenantUrl}/products`} className="flex items-center gap-2">
                                Explore Collection
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>
                        <Button variant="outline" size="lg" className="border-2 border-stone-300 hover:border-stone-900 px-8 py-4 text-lg rounded-full transition-all duration-300" asChild>
                            <Link href={`${tenantUrl}/about`}>Our Story</Link>
                        </Button>
                    </div>

                    <div className="mt-16 grid grid-cols-3 gap-8 text-center">
                        {HERO_STATS.map(({ value, label }) => (
                            <div key={label} className="flex flex-col items-center">
                                <div className="mb-2 text-2xl font-bold text-stone-900">{value}</div>
                                <div className="text-sm text-stone-600">{label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* <section className="py-20 bg-white">
                <div className="container px-2 mx-auto md:px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold tracking-tight text-stone-900 mb-4">Shop by Lifestyle</h2>
                        <p className="text-xl text-stone-600 max-w-2xl mx-auto">
                            Find pieces that match your unique style and transform your everyday moments
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {featuredCategories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                name={category.name}
                                image={category.thumbnail.url!}
                                itemCount={category.stats?.productCount}
                                href={`${tenantUrl}/categories/${category.slug}`}
                                description={category.description}
                            />
                        ))}
                    </div>
                </div>
            </section> */}

            {/* <section className="py-20 bg-gradient-to-b from-stone-50 to-white">
                <div className="container px-2 md:px-6 mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800 mb-4">
                            <Award className="h-4 w-4" />
                            Editor&apos;s Choice
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight text-stone-900 mb-4">This Week&apos;s Favorites</h2>
                        <p className="text-xl text-stone-600 max-w-2xl mx-auto">Handpicked pieces that our community loves most</p>
                    </div>
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {featuredProducts.map((product) => (
                            <Suspense fallback={<ProductCardSkeleton />} key={product.id}>
                                <ProductCard
                                    name={product.name}
                                    price={product.pricing.compareAtPrice!}
                                    originalPrice={product.pricing.price}
                                    image={product.primaryImage.url!}
                                    category={product.category}
                                    badge={product.badge}
                                    featured={product.featured}
                                    slug={product.slug}
                                    tenantSlug={slug}
                                />
                            </Suspense>
                        ))}
                    </div>
                    <div className="mt-16 text-center">
                        <Button variant="outline" size="lg" className="border-2 border-stone-300 hover:border-stone-900 px-8 py-4 text-lg rounded-full transition-all duration-300" asChild>
                            <Link href={`${tenantUrl}/products`} className="flex items-center gap-2">
                                View All Products
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section> */}

            <section className="py-20 bg-stone-900 text-white overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900" />
                <div className="absolute top-0 left-0 w-full h-full opacity-10">
                    <div className="absolute top-10 left-10 w-40 h-40 bg-amber-400 rounded-full blur-3xl" />
                    <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-400 rounded-full blur-2xl" />
                </div>

                <div className="container px-2 md:px-6 relative mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm font-medium mb-6">
                                <Leaf className="h-4 w-4 text-green-400" />
                                Sustainably Made
                            </div>

                            <h2 className="text-4xl font-bold mb-6 leading-tight">
                                Crafted with Purpose,
                                <span className="block text-amber-400">Designed for Life</span>
                            </h2>

                            <p className="text-xl text-stone-300 mb-8 leading-relaxed">
                                Every piece tells a story of thoughtful design, sustainable materials, and the skilled hands that bring
                                them to life. We believe beautiful design should also be responsible design.
                            </p>

                            <div className="grid grid-cols-2 gap-6 mb-8">
                                <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                                    <div className="text-2xl font-bold text-amber-400 mb-1">100%</div>
                                    <div className="text-sm text-stone-300">Sustainable Materials</div>
                                </div>
                                <div className="text-center p-4 rounded-lg bg-white/5 backdrop-blur-sm">
                                    <div className="text-2xl font-bold text-amber-400 mb-1">Carbon</div>
                                    <div className="text-sm text-stone-300">Neutral Shipping</div>
                                </div>
                            </div>

                            <Button variant="outline" size="lg" className="border-2 border-white/30 hover:border-white text-white hover:bg-white hover:text-stone-900 px-8 py-4 text-lg rounded-full transition-all duration-300 bg-transparent" asChild>
                                <Link href="/about">Learn Our Story</Link>
                            </Button>
                        </div>

                        <div className="relative">
                            <div className="aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-amber-200 to-orange-200 p-8">
                                <Image
                                    src="/placeholder.png"
                                    alt="Artisan crafting furniture"
                                    width={600}
                                    height={600}
                                    className="w-full h-full object-cover rounded-xl"
                                    loading="lazy"
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-white text-stone-900 p-6 rounded-xl shadow-2xl">
                                <div className="text-2xl font-bold">2015</div>
                                <div className="text-sm text-stone-600">Founded with passion</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Newsletter />
        </div>
    )
})

HomeView.displayName = 'HomeView'