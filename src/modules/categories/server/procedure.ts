import { z } from "zod";

import { Category, Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";

export const categoriesRouter = createTRPCRouter({
    getMany: baseProcedure
        .input(
            z.object({
                tenantSlug: z.string().nullable().optional(),
            })
        )
        .query(async ({ ctx, input }) => {

            const categories = await ctx.db.find({
                collection: "categories",
                depth: 1,
                pagination: false,
                where: {
                    "tenant.slug": {
                        equals: input.tenantSlug
                    }
                },
                select: {
                    name: true,
                    slug: true,
                    subcategories: true,
                    images: true,
                    "stats.productCount": true
                },
                sort: 'name'
            });

            const data = categories.docs.map((doc) => ({
                ...doc,
                subcategories: (doc.subcategories?.docs ?? []).map((subdoc) => ({
                    ...(subdoc as Category),
                })),
                images: {
                    banner: doc.images?.banner as Media,
                    thumbnail: doc.images?.thumbnail as Media
                }
            }));
            return data;
        }),
    getOne: baseProcedure
        .input(
            z.object({
                category: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const category = await ctx.db.find({
                collection: "categories",
                limit: 1,
                pagination: false,
                depth: 2,
                where: {
                    slug: {
                        equals: input.category
                    }
                },
                select: {
                    name: true,
                    slug: true,
                    status: true,
                    description: true,
                    featured: true,
                    parent: true,
                    subcategories: true,
                    seo: true,
                    stats: true,
                    images: true,
                }
            });
            const data = category.docs[0]
            if (!data) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Category not found'
                });
            }
            return {
                ...data,
                subcategories: (data.subcategories?.docs ?? []).map((subdoc) => ({
                    ...(subdoc as Category)
                })),
                images: {
                    banner: data.images?.banner as Media,
                    thumbnail: data.images?.thumbnail as Media
                }
            }
        })
})