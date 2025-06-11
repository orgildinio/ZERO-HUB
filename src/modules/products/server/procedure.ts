import { Category, Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Where } from "payload";
import { z } from "zod";
import { sortedValues } from "../search-param";
import { Sort } from "payload";

const buildSort = (sortOption: string | null | undefined): Sort => {
    const sortMap: Record<string, Sort> = {
        newest: "-createdAt",
        low_to_high: "-pricing.compareAtPrice",
        high_to_low: "+pricing.compareAtPrice",
        featured: "featured"
    }
    return sortOption && sortMap[sortOption] ? sortMap[sortOption] : "-createdAt";
}

const buildPriceFilter = (minPrice?: string | null, maxPrice?: string | null) => {
    if (!minPrice && !maxPrice) return {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const priceFilter: any = {};

    if (minPrice && maxPrice) {
        priceFilter["pricing.compareAtPrice"] = {
            greater_than_equal: minPrice,
            less_than_equal: maxPrice,
        };
    } else if (minPrice) {
        priceFilter["pricing.compareAtPrice"] = {
            greater_than_equal: minPrice
        };
    } else if (maxPrice) {
        priceFilter["pricing.compareAtPrice"] = {
            less_than_equal: maxPrice
        };
    }

    return priceFilter;
};

const buildTenantFilter = (tenantSlug?: string | null) => {
    if (tenantSlug) {
        return { "tenant.slug": { equals: tenantSlug } };
    }
    return { "isPrivate": { not_equals: true } };
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getCategoryWithSubcategories = async (db: any, categories: string[]) => {
    const categoriesData = await db.find({
        collection: "categories",
        depth: 1,
        pagination: false,
        where: {
            slug: { in: categories }
        },
        select: {
            subcategories: true,
            slug: true
        }
    });

    const allCategorySlugs: string[] = [];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
    categoriesData.docs.forEach((doc: any) => {
        allCategorySlugs.push(doc.slug);

        if (doc.subcategories?.docs) {
            const subcategorySlugs = doc.subcategories.docs.map((subdoc: Category) => subdoc.slug);
            allCategorySlugs.push(...subcategorySlugs);
        }
    });

    return [...new Set(allCategorySlugs)];
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const buildWhereClause = async (input: any, db: any): Promise<Where> => {
    const where: Where = {
        ...buildPriceFilter(input.minPrice, input.maxPrice),
        ...buildTenantFilter(input.tenantSlug)
    };

    if (input.category && input.category.length > 0) {
        const categorySlugs = await getCategoryWithSubcategories(db, input.category);
        if (categorySlugs.length > 0) {
            where["category.slug"] = { in: categorySlugs };
        }
    }

    if (input.tags && input.tags.length > 0) {
        where["tags.name"] = { in: input.tags };
    }

    if (input.search) {
        where["name"] = { like: input.search };
    }

    return where;
};


export const productsRouter = createTRPCRouter({
    getMany: baseProcedure
        .input(
            z.object({
                search: z.string().nullable().optional(),
                cursor: z.number().default(1),
                limit: z.number().default(8),
                category: z.array(z.string()).nullable().optional(),
                minPrice: z.string().nullable().optional(),
                maxPrice: z.string().nullable().optional(),
                sort: z.enum(sortedValues).nullable().optional(),
                tags: z.array(z.string()).nullable().optional(),
                tenantSlug: z.string().nullable().optional()
            })
        )
        .query(async ({ ctx, input }) => {

            const sort = buildSort(input.sort);
            const where = await buildWhereClause(input, ctx.db);

            if (input.category) {
                const categoriesData = await ctx.db.find({
                    collection: "categories",
                    limit: 1,
                    depth: 1,
                    pagination: false,
                    where: {
                        slug: {
                            equals: input.category
                        }
                    },
                    select: {
                        subcategories: true,
                        slug: true
                    }
                });

                const formattedData = categoriesData.docs.map((doc) => ({
                    ...doc,
                    subcategories: (doc.subcategories?.docs ?? []).map((subdoc) => ({
                        ...(subdoc as Category),
                    })),
                }));

                const subcategoriesSlugs = [];
                const parentCategory = formattedData[0]

                if (parentCategory) {
                    subcategoriesSlugs.push(...parentCategory.subcategories.map((subcategory) => subcategory.slug))
                    where["category.slug"] = {
                        in: [parentCategory.slug, ...subcategoriesSlugs]
                    }
                }
            }
            if (input.tags && input.tags.length > 0) {
                where["tags.name"] = {
                    in: input.tags
                }
            }

            if (input.search) {
                where["name"] = {
                    like: input.search,
                }
            }

            const data = await ctx.db.find({
                collection: "products",
                depth: 1,
                where,
                sort,
                page: input.cursor,
                limit: input.limit,
                select: {
                    name: true,
                    images: true,
                    description: true,
                    pricing: true,
                    badge: true,
                    slug: true,
                    featured: true,
                    category: true
                }
            });
            const transformedDocs = data.docs.map(doc => ({
                ...doc,
                images: doc.images?.map(imageItem => ({
                    ...imageItem,
                    image: imageItem.image as Media,
                })) || [],
                category: doc.category as Category
            }));

            return {
                ...data,
                docs: transformedDocs
            }
        }),
    getOne: baseProcedure
        .input(
            z.object({
                product: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const product = await ctx.db.find({
                collection: "products",
                limit: 1,
                depth: 1,
                pagination: false,
                where: {
                    slug: {
                        equals: input.product
                    }
                },
                select: {
                    name: true,
                    images: true,
                    description: true,
                    pricing: true,
                    slug: true,
                    category: true,
                    specifications: true,
                    variants: true,
                }
            })
            const data = product.docs[0]
            return {
                ...data,
                images: data.images?.map(imageItem => ({
                    ...imageItem,
                    image: imageItem.image as Media,
                })) || [],
                category: data.category as Category
            }
        })
})