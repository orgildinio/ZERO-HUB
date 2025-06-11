import { Suspense } from "react"
import { ProductFilters } from "../components/products/product-filters"
import { ProductsGrid } from "../components/products/products-grid"
import { ProductCardSkeleton } from "../components/products/product-card"

export const ProductsView = ({ slug }: { slug: string }) => {
    return (
        <div className="container px-2 py-8 md:px-6 md:py-12 mx-auto">
            <div className="mb-8 flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">All Products</h1>
                <p className="text-gray-500">Browse our collection of minimalist products</p>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[280px_1fr]">
                <ProductFilters slug={slug} />
                <Suspense fallback={
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                }>
                    <ProductsGrid slug={slug} />
                </Suspense>
            </div>
        </div>
    )
}