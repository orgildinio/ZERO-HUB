import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ProductHero } from "../components/products/product-hero"
import { ProductsList } from "../components/products/products-list"
import { Suspense } from "react"
import { ProductCardSkeleton } from "../components/products/product-card"

import { generateTenantUrl } from "@/lib/utils"

export const ProductView = ({ slug, product }: { slug: string; product: string }) => {
    return (
        <div className="container px-2 py-8 md:px-6 md:py-12 mx-auto">
            <Link href={`${generateTenantUrl(slug)}/products`} className="mb-6 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-4 w-4" />
                Back to Products
            </Link>
            <ProductHero slug={slug} product={product} />
            <div className="mt-16">
                <h2 className="mb-6 text-2xl font-bold">Related Products</h2>
                <Suspense fallback={
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <ProductCardSkeleton key={i} />
                        ))}
                    </div>
                }>
                    <ProductsList slug={slug} key={`categories-${slug}`} />
                </Suspense>
            </div>
        </div>
    )
}