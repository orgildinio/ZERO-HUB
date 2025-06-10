import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { generateTenantUrl } from "@/lib/utils"
import { Heart, ShoppingBag, Star } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { memo, useMemo } from "react"

interface Props {
    name: string
    slug: string
    price?: number | null
    originalPrice?: number | null
    image?: string | null
    category?: string | null
    badge?: string | null
    rating?: number
    reviews?: number
    featured?: boolean | null
    tenantSlug: string
}

const BADGE_COLORS = {
    Sale: "bg-red-100 text-red-800",
    Bestseller: "bg-green-100 text-green-800",
    New: "bg-blue-100 text-blue-800",
    Trending: "bg-purple-100 text-purple-800",
    Limited: "bg-red-100 text-red-800",
    default: "bg-gray-100 text-gray-800"
} as const

export const ProductCard = memo(({
    name,
    slug,
    price,
    originalPrice,
    image,
    category,
    badge,
    rating,
    reviews,
    featured,
    tenantSlug
}: Props) => {

    const badgeColor = useMemo(() => badge ? (BADGE_COLORS[badge as keyof typeof BADGE_COLORS] || BADGE_COLORS.default) : '', [badge]);
    const hasDiscount = useMemo(() => originalPrice && originalPrice !== price, [originalPrice, price]);

    const starElements = useMemo(() => {
        if (!rating) return null
        return Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(rating) ? "fill-amber-400 text-amber-400" : "text-stone-300"}`}
            />
        ))
    }, [rating])

    const productUrl = useMemo(() => `${generateTenantUrl(tenantSlug)}/products/${slug}`, [tenantSlug, slug])

    return (
        <div className="group relative">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {badge && (
                    <div className="absolute top-4 left-4 z-10">
                        <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${badgeColor}`}>
                            {badge}
                        </span>
                    </div>
                )}

                <Link href={productUrl} className="block">
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-stone-50 to-stone-100">
                        <Image
                            src={image || "/placeholder.png"}
                            alt={name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                </Link>

                <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                        aria-label="Add to wishlist"
                    >
                        <Heart className="h-4 w-4" />
                    </Button>
                </div>

                <div className="p-6">
                    {category && (
                        <p className="text-xs uppercase tracking-wider text-stone-500 font-medium mb-2">{category}</p>
                    )}

                    <Link href={productUrl}>
                        <h3 className="text-lg font-bold text-stone-900 mb-3 group-hover:text-amber-600 transition-colors duration-300 leading-tight">
                            {name}
                        </h3>
                    </Link>

                    {rating && reviews && (
                        <div className="flex items-center gap-2 mb-3">
                            <div className="flex items-center" aria-label={`Rating: ${rating} out of 5`}>
                                {starElements}
                            </div>
                            <span className="text-sm text-stone-600">({reviews})</span>
                        </div>
                    )}

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-2">
                            <div className="text-xl font-bold text-stone-900">${price}</div>
                            {hasDiscount && (
                                <div className="text-sm text-stone-500 line-through">${originalPrice}</div>
                            )}
                        </div>
                        {featured && (
                            <div className="flex items-center gap-1" aria-label="Featured product">
                                {Array.from({ length: 5 }, (_, i) => (
                                    <div key={i} className="w-1 h-1 rounded-full bg-amber-400" />
                                ))}
                            </div>
                        )}
                    </div>

                    <Button
                        className="w-full bg-stone-900 hover:bg-amber-600 text-white rounded-full transition-all duration-300 transform hover:scale-105"
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

ProductCard.displayName = 'ProductCard'

export function ProductCardSkeleton() {
    return (
        <div className="group relative">
            <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg">
                <div className="absolute top-4 left-4 z-10">
                    <Skeleton className="h-6 w-16 rounded-full" />
                </div>

                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-stone-50 to-stone-100">
                    <Skeleton className="h-full w-full" />
                </div>

                <div className="absolute top-4 right-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                </div>

                <div className="p-6">
                    <Skeleton className="h-3 w-20 mb-2" />

                    <Skeleton className="h-5 w-full mb-1" />
                    <Skeleton className="h-5 w-3/4 mb-3" />

                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <Skeleton key={i} className="h-4 w-4 rounded-sm" />
                            ))}
                        </div>
                        <Skeleton className="h-4 w-8" />
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-4 w-12" />
                    </div>

                    <Skeleton className="h-10 w-full rounded-full" />
                </div>
            </div>
        </div>
    )
}
