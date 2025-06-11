import Link from "next/link"
import { Background } from "../components/background"
import { ArrowRight, Award, Sparkles } from "lucide-react"
import { CategoryListView } from "./categories-list-view"
import { Button } from "@/components/ui/button"
import { memo } from "react"
import { ProductsListView } from "./products-list-view"

const HERO_STATS = [
    { value: "10K+", label: "Happy Customers" },
    { value: "500+", label: "Unique Products" },
    { value: "50+", label: "Countries Served" }
] as const

const HeroSection = memo(({ slug }: { slug: string }) => (
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

            <p className="mb-8 text-xl text-stone-600 leading-relaxed">
                Thoughtfully crafted pieces that transform your space into a sanctuary of style and comfort
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-stone-900 hover:bg-stone-800 text-white px-8 py-4 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105" asChild>
                    <Link href={`${slug}/products`} className="flex items-center gap-2">
                        Explore Collection
                        <ArrowRight className="h-5 w-5" />
                    </Link>
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
))

HeroSection.displayName = 'HeroSection'

const CategorySection = memo(({ slug }: { slug: string }) => (
    <section className="py-20 bg-white">
        <div className="container px-2 mx-auto md:px-6">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold tracking-tight text-stone-900 mb-4">Shop by Lifestyle</h2>
                <p className="text-xl text-stone-600 max-w-2xl mx-auto">
                    Find pieces that match your unique style and transform your everyday moments
                </p>
            </div>
            <CategoryListView slug={slug} />
        </div>
    </section>
))

CategorySection.displayName = 'CategorySection'

const ProductsSection = memo(({ slug }: { slug: string }) => (
    <section className="py-20 bg-gradient-to-b from-stone-50 to-white">
        <div className="container px-2 md:px-6 mx-auto">
            <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800 mb-4">
                    <Award className="h-4 w-4" />
                    Editor&apos;s Choice
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-stone-900 mb-4">This Week&apos;s Favorites</h2>
                <p className="text-xl text-stone-600 max-w-2xl mx-auto">Handpicked pieces that our community loves most</p>
            </div>
            <ProductsListView slug={slug} />
        </div>
    </section>
))

ProductsSection.displayName = 'ProductsSection'

export const HomeView = ({ slug }: { slug: string }) => {
    return (
        <div className="flex flex-col">
            <HeroSection slug={slug} />
            <CategorySection slug={slug} />
            <ProductsSection slug={slug} />
        </div>
    )
}