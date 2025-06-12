import { z } from "zod";

import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { Media, Tenant } from "@/payload-types";

export const checkoutRouter = createTRPCRouter({
    getProducts: baseProcedure
        .input(
            z.object({
                productIds: z.array(z.string())
            })
        )
        .query(async ({ ctx, input }) => {
            const data = await ctx.db.find({
                collection: "products",
                depth: 2,
                where: {
                    id: {
                        in: input.productIds
                    }
                },
                select: {
                    tenant: true,
                    name: true,
                    slug: true,
                    pricing: true,
                    images: true,
                    shipping: true,
                }
            });
            if (data.totalDocs !== input.productIds.length) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Product not found." })
            }

            const totalPrice = data.docs.reduce((acc, product) => {
                const price = Number(product.pricing.compareAtPrice);
                return acc + (isNaN(price) ? 0 : price)
            }, 0);

            return {
                ...data,
                totalPrice: totalPrice,
                docs: data.docs.map(({ images, ...doc }) => {
                    const primaryImageObj = images.find(image => image.isPrimary);
                    const primaryImage = primaryImageObj?.image as Media | null;

                    return {
                        ...doc,
                        image: primaryImage,
                        tenant: doc.tenant as Tenant & { image: Media | null }
                    }
                })
            }
        })
})