import type { Where } from "payload";
import { z } from "zod";

import { Category, Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const categoriesRouter = createTRPCRouter({
    getMany: baseProcedure
        .input(
            z.object({
                tenantSlug: z.string().nullable().optional()
            })
        )
        .query(async ({ ctx, input }) => {
            const where: Where = {
                status: {
                    not_equals: 'inactive',
                }
            };
            if (input.tenantSlug) {
                where["tenant.slug"] = {
                    equals: input.tenantSlug,
                }
            } else {
                where["status"] = {
                    not_equals: 'inactive',
                }
            }
            const categories = await ctx.db.find({
                collection: "categories",
                depth: 1,
                pagination: false,
                where: where,
                sort: 'name'
            });

            const data = categories.docs.map((doc) => ({
                ...doc,
                subcategories: (doc.subcategories?.docs ?? []).map((subdoc) => ({
                    ...(subdoc as Category),
                })),
                banner: doc.images?.banner as Media,
                thumbnail: doc.images?.thumbnail as Media
            }));
            return data;
        })
})