import { Suspense } from "react"
import { CategoriesList } from "../components/products/categories-list"
import { CategoryCardSkeleton } from "../components/products/category-card"

export const CategoryListView = ({ slug }: { slug: string }) => {
    return (
        <div className="container px-2 py-8 md:px-6 md:py-12 mx-auto">
            <div className="mb-8 flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Categories</h1>
                <p className="text-gray-500">Browse our product categories</p>
            </div>
            <Suspense fallback={
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <CategoryCardSkeleton key={i} />
                    ))}
                </div>
            }>
                <CategoriesList slug={slug} key={`categories-${slug}`} />
            </Suspense>
        </div>
    )
}