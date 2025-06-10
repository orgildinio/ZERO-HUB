import Link from "next/link"
import { CategoryListView } from "./categories-list-view";
import { CategoryHero } from "../components/products/category-hero";

import { generateTenantUrl } from "@/lib/utils";

export const CategoryView = ({ slug, category }: { slug: string; category: string }) => {
    return (
        <div className="min-h-screen bg-white">
            <div className="border-b border-stone-200/50 bg-stone-50/50">
                <div className="container px-2 py-4 md:px-6">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href={`${generateTenantUrl(slug)}`} className="text-stone-600 hover:text-stone-900 transition-colors">
                            Home
                        </Link>
                        <span className="text-stone-400">/</span>
                        <Link href={`${generateTenantUrl(slug)}/categories`} className="text-stone-600 hover:text-stone-900 transition-colors">
                            Categories
                        </Link>
                        <span className="text-stone-400">/</span>
                        <span className="text-stone-900 font-medium">{ }</span>
                    </nav>
                </div>
            </div>
            <CategoryHero category={category} />
            <section className="py-16 bg-stone-50">
                <div className="container px-4 md:px-6 mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-stone-900 mb-4">Explore More Categories</h2>
                        <p className="text-xl text-stone-600">Discover other collections that complement your style</p>
                    </div>
                    <CategoryListView slug={slug} />
                </div>
            </section>
        </div>
    )
}