import { z } from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";

export const tenantsRouter = createTRPCRouter({
    getOne: baseProcedure
        .input(
            z.object({
                slug: z.string()
            })
        )
        .query(async ({ ctx, input }) => {

            const tenant = await ctx.db.find({
                collection: "tenants",
                depth: 0,
                limit: 1,
                pagination: false,
                where: {
                    slug: {
                        equals: input.slug
                    }
                }
            });
            const data = tenant.docs[0].store
            if (!data) return null;

            return data;
        })
})