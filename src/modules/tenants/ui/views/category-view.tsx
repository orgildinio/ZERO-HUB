"use client"

import Link from "next/link";
import { Grid3X3, List, SlidersHorizontal } from "lucide-react";
import { CategoryHero } from "../components/products/categoro-hero";
import { ProductListView } from "./products-list-view";
import { ProductCard } from "../components/products/product-card";
import Image from "next/image";

import { useTRPC } from "@/trpc/client"
import { useSuspenseInfiniteQuery, useSuspenseQuery } from "@tanstack/react-query";
import { generateTenantUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"

export const CategoryView = ({ category, slug }: { category: string; slug: string }) => {

    const trpc = useTRPC();
    const { data: categoryData } = useSuspenseQuery(trpc.categories.getOne.queryOptions({ category: category }))
    const { data: categoriesData } = useSuspenseQuery(trpc.categories.getMany.queryOptions({ tenantSlug: slug }))
    const { data: productsData } = useSuspenseInfiniteQuery(trpc.products.getMany.infiniteQueryOptions(
        {
            category: categoryData.slug,
            limit: 4
        },
        {
            getNextPageParam: (lastpage) => {
                return lastpage.docs.length > 0 ? lastpage.nextPage : undefined
            }
        }
    ))
    console.log(categoryData)

    return (
        <div className="min-h-screen bg-white">
            <div className="border-b border-stone-200/50 bg-stone-50/50">
                <div className="container px-4 py-4 md:px-6">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href={`${generateTenantUrl(slug)}`} className="text-stone-600 hover:text-stone-900 transition-colors">
                            Home
                        </Link>
                        <span className="text-stone-400">/</span>
                        <Link href="/categories" className="text-stone-600 hover:text-stone-900 transition-colors">
                            Categories
                        </Link>
                        <span className="text-stone-400">/</span>
                        <span className="text-stone-900 font-medium">{ }</span>
                    </nav>
                </div>
            </div>
            <CategoryHero
                name={categoryData.name}
                description={categoryData.description}
                image={categoryData.images.thumbnail.url}
                productCount={categoryData.stats?.productCount}
                featured={categoryData.featured}
            />
            <section className="py-8 border-b border-stone-200/50">
                <div className="container px-2 md:px-6 mx-auto">
                    <div className="flex flex-wrap gap-3">
                        <Button
                            variant="outline"
                            className="rounded-full border-stone-300 hover:border-amber-500 hover:text-amber-600"
                        >
                            All {categoryData.name}
                        </Button>
                        {categoryData.subcategories.map((subcategory) => (
                            <Button key={subcategory.slug} variant="ghost" className="rounded-full hover:bg-amber-50 hover:text-amber-600">
                                {subcategory.name}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>
            <section className="py-8">
                <div className="container px-2 mx-auto md:px-6">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
                        <div className="hidden lg:block">
                            <div className="sticky top-24">
                                {/* <ProductFilters /> */}
                            </div>
                        </div>
                        <div>
                            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-4">
                                    <h2 className="text-2xl font-bold text-stone-900">{categoryData.name} Collection</h2>
                                    <span className="text-stone-600">({categoryData.stats?.productCount} products)</span>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Button variant="outline" className="lg:hidden" size="sm">
                                        <SlidersHorizontal className="h-4 w-4 mr-2" />
                                        Filters
                                    </Button>
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-stone-600 hidden sm:block">Sort by:</span>
                                        <Select defaultValue="featured">
                                            <SelectTrigger className="w-[180px]">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="featured">Featured</SelectItem>
                                                <SelectItem value="price-low">Price: Low to High</SelectItem>
                                                <SelectItem value="price-high">Price: High to Low</SelectItem>
                                                <SelectItem value="name">Name: A to Z</SelectItem>
                                                <SelectItem value="rating">Highest Rated</SelectItem>
                                                <SelectItem value="newest">Newest</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Tabs defaultValue="grid" className="hidden sm:block">
                                        <TabsList className="grid w-full grid-cols-2">
                                            <TabsTrigger value="grid" className="flex items-center gap-2">
                                                <Grid3X3 className="h-4 w-4" />
                                                <span className="hidden md:inline">Grid</span>
                                            </TabsTrigger>
                                            <TabsTrigger value="list" className="flex items-center gap-2">
                                                <List className="h-4 w-4" />
                                                <span className="hidden md:inline">List</span>
                                            </TabsTrigger>
                                        </TabsList>
                                    </Tabs>
                                </div>
                            </div>
                            <Tabs defaultValue="grid" className="w-full">
                                <TabsContent value="grid" className="mt-0">
                                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                        {productsData?.pages.flatMap((page) => page.docs).map((product) => (
                                            <ProductCard
                                                key={product.slug}
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
                                        ))}
                                    </div>
                                </TabsContent>

                                <TabsContent value="list" className="mt-0">
                                    <div className="space-y-6">
                                        {productsData?.pages.flatMap((page) => page.docs).map((product) => (
                                            <ProductListView
                                                slug={product.slug}
                                                tenantSlug={product.tenant.slug}
                                                key={product.id}
                                                name={product.name}
                                                price={product.pricing.compareAtPrice}
                                                originalPrice={product.pricing.price}
                                                image={product.primaryImage.url}
                                                category={product.category}
                                                badge={product.badge}
                                            // rating={product.rating}
                                            // reviews={product.reviews}
                                            />
                                        ))}
                                    </div>
                                </TabsContent>
                            </Tabs>
                            <div className="mt-12 text-center">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="border-2 border-stone-300 hover:border-stone-900 px-8 py-4 text-lg rounded-full transition-all duration-300"
                                >
                                    Load More Products
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-16 bg-stone-50">
                <div className="container px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-stone-900 mb-4">Explore More Categories</h2>
                        <p className="text-xl text-stone-600">Discover other collections that complement your style</p>
                    </div>

                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {categoriesData.map((cat) => (
                            <Link
                                key={cat.name}
                                href={cat.slug}
                                className="group block overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-stone-100 to-stone-200">
                                    <Image
                                        src={cat.images.thumbnail.url || "/placeholder.png"}
                                        alt={cat.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-stone-900 mb-2 group-hover:text-amber-600 transition-colors duration-300">
                                        {cat.name}
                                    </h3>
                                    <p className="text-stone-600">{cat.description}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}