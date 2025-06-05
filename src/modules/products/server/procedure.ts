import { Category, Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Sort, Where } from "payload";
import { z } from "zod";

export const productsRouter = createTRPCRouter({
    getMany: baseProcedure
        .input(
            z.object({
                search: z.string().nullable().optional(),
                cursor: z.number().default(1),
                limit: z.number().default(8),
                category: z.string().nullable().optional(),
                minPrice: z.string().nullable().optional(),
                maxPrice: z.string().nullable().optional(),
                tags: z.array(z.string()).nullable().optional(),
                // sort: z.enum(sortedValues).nullable().optional(),
                tenantSlug: z.string().nullable().optional()
            })
        )
        .query(async ({ ctx, input }) => {
            const where: Where = {
                isArchived: {
                    not_equals: true,
                }
            };
            const sort: Sort = "-createdAt";

            // if (input.sort === "trending") {
            //     sort = "+createdAt"
            // }
            // if (input.sort === "hot_and_new") {
            //     sort = "-createdAt"
            // }
            // if (input.sort === "curated") {
            //     sort = "-createdAt"
            // }

            if (input.minPrice && input.maxPrice) {
                where["pricing.compareAtPrice"] = {
                    greater_than_equal: input.minPrice,
                    less_than_equal: input.maxPrice,
                }
            } else if (input.minPrice) {
                where["pricing.compareAtPrice"] = {
                    greater_than_equal: input.minPrice
                }
            } else if (input.maxPrice) {
                where["pricing.compareAtPrice"] = {
                    less_than_equal: input.maxPrice
                }
            }

            if (input.tenantSlug) {
                where["tenant.slug"] = {
                    equals: input.tenantSlug,
                }
            } else {
                where["isPrivate"] = {
                    not_equals: true,
                }
            }

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
                depth: 2,
                where,
                sort,
                page: input.cursor,
                limit: input.limit,
                select: {
                    content: false,
                }
            });

            return {
                ...data,
                docs: data.docs.map((doc) => {
                    const images = Array.isArray(doc.images)
                        ? doc.images.map(imageItem => ({
                            ...imageItem,
                            image: imageItem.image as Media
                        }))
                        : [];
                    const primaryImage = images.find(img => img.isPrimary)?.image || images[0]?.image || null;
                    const category = (doc.categories as Category)?.name || null;
                    return {
                        ...doc,
                        images,
                        category,
                        primaryImage,
                        tenant: doc.tenant as Tenant & { image: Media | null }
                    };
                })
            };
        })
})