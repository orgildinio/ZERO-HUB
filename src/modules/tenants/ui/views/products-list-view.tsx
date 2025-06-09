import { memo, useMemo } from "react"
import Image from "next/image"
import { Heart, ShoppingBag, Star } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { generateTenantUrl } from "@/lib/utils"

interface Props {
    name: string
    slug: string
    tenantSlug: string
    price?: number | null
    originalPrice?: number | null
    image?: string | null
    category?: string | null
    badge?: string | null
    rating?: number
    reviews?: number
}

export const ProductListView = memo(({ name, slug, price, tenantSlug, originalPrice, image, category, badge, rating, reviews }: Props) => {
    const productUrl = useMemo(() => `${generateTenantUrl(tenantSlug)}/products/${slug}`, [tenantSlug, slug])
    return (
        <div className="group flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-2xl border border-stone-200 hover:border-stone-300 hover:shadow-lg transition-all duration-300">
            <div className="relative w-full sm:w-48 aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-stone-50 to-stone-100 flex-shrink-0">
                {badge && (
                    <div className="absolute top-3 left-3 z-10">
                        <span
                            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${badge === "Sale"
                                ? "bg-red-100 text-red-800"
                                : badge === "New"
                                    ? "bg-blue-100 text-blue-800"
                                    : badge === "Bestseller"
                                        ? "bg-green-100 text-green-800"
                                        : badge === "Limited"
                                            ? "bg-purple-100 text-purple-800"
                                            : badge === "Trending"
                                                ? "bg-orange-100 text-orange-800"
                                                : "bg-gray-100 text-gray-800"
                                }`}
                        >
                            {badge}
                        </span>
                    </div>
                )}

                <Link href={productUrl}>
                    <Image
                        src={image || "/placeholder.png"}
                        alt={name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </Link>

                <Button
                    variant="secondary"
                    size="icon"
                    className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                    <Heart className="h-4 w-4" />
                    <span className="sr-only">Add to wishlist</span>
                </Button>
            </div>
            <div className="flex-1 flex flex-col justify-between">
                <div>
                    <div className="flex items-start justify-between mb-2">
                        <p className="text-xs uppercase tracking-wider text-stone-500 font-medium">{category}</p>
                        {rating && reviews && (
                            <div className="flex items-center gap-1">
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`h-3 w-3 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-stone-300"}`}
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-stone-600">({reviews})</span>
                            </div>
                        )}
                    </div>

                    <Link href={`/products/${slug}`}>
                        <h3 className="text-xl font-bold text-stone-900 mb-3 group-hover:text-amber-600 transition-colors duration-300 leading-tight">
                            {name}
                        </h3>
                    </Link>

                    <p className="text-stone-600 mb-4 line-clamp-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
                        dolore magna aliqua.
                    </p>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="text-2xl font-bold text-stone-900">${price}</div>
                        {originalPrice && <div className="text-lg text-stone-500 line-through">${originalPrice}</div>}
                    </div>

                    <Button
                        className="bg-stone-900 hover:bg-amber-600 text-white rounded-full transition-all duration-300 transform hover:scale-105"
                        size="sm"
                    >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
                    </Button>
                </div>
            </div>
        </div>
    )
})

ProductListView.displayName = 'ProductListView'