import { z } from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import redis from "@/lib/redis";

export const tenantsRouter = createTRPCRouter({
    getOne: baseProcedure
        .input(
            z.object({
                slug: z.string()
            })
        )
        .query(async ({ ctx, input }) => {
            const cacheKey = `tenant:${input.slug}`;

            try {
                const cached = await redis.get(cacheKey);
                if (cached) {
                    return cached;
                }
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
                if (!data) {
                    await redis.setex(cacheKey, 300, JSON.stringify(null));
                    return null;
                }

                await redis.setex(cacheKey, 3600, data);

                return data;
            } catch {
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
                return data
            }
        })
})