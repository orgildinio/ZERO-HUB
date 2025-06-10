import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import type { Where } from "payload";
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
                tenantSlug: z.string().nullable().optional()
            })
        )
        .query(async ({ ctx, input }) => {
            const where: Where = {
                isArchived: {
                    not_equals: true,
                }
            };

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
                depth: 2,
                where,
                page: input.cursor,
                limit: input.limit,
                select: {
                    name: true,
                    images: true,
                    description: true,
                    pricing: true,
                    badge: true,
                    slug: true,
                }
            });

            return data
        })
})