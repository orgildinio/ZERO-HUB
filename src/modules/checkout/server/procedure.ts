import { z } from "zod";
import crypto from 'crypto'
import { NextResponse } from "next/server";
import { checkoutSchema } from "../schema";

import { TRPCError } from "@trpc/server";
import { Category, Media } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { razorpay } from "@/lib/razorpay";

export const checkoutRouter = createTRPCRouter({
    getMany: baseProcedure
        .input(
            z.object({
                productIds: z.array(z.string())
            })
        )
        .query(async ({ ctx, input }) => {
            const data = await ctx.db.find({
                collection: "products",
                pagination: false,
                where: {
                    id: {
                        in: input.productIds
                    }
                },
                depth: 1,
                select: {
                    name: true,
                    slug: true,
                    pricing: true,
                    images: true,
                    category: true,
                    badge: true
                }
            });
            if (data.totalDocs !== input.productIds.length) {
                throw new TRPCError({ code: "NOT_FOUND", message: "Product not found." })
            }

            const totalPrice = data.docs.reduce((acc, product) => {
                const price = Number((product.pricing.compareAtPrice ? product.pricing.compareAtPrice : product.pricing.price));
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
                        category: doc.category as Category,
                        image: primaryImage,
                    }
                })
            }
        }),
    createOrder: baseProcedure
        .input(checkoutSchema)
        .mutation(async ({ ctx, input }) => {
            const tenant = await ctx.db.find({
                collection: "tenants",
                limit: 1,
                depth: 0,
                pagination: false,
                where: {
                    slug: {
                        equals: input.tenant
                    }
                },
                select: {
                    name: false,
                    slug: false,
                    image: false,
                    phone: false,
                    store: false,
                    activeTemplate: false,
                    subscription: false,
                    maxProducts: false,
                    analytics: false,
                    createdAt: false,
                    updatedAt: false
                }
            })
            const customer = await ctx.db.create({
                collection: "customers",
                data: {
                    firstname: input.firstname,
                    email: input.email,
                    lastname: input.lastname,
                    newsLetter: input.newsletter,
                    shippingAddress: {
                        street: input.street,
                        apartment: input.apartment,
                        city: input.city,
                        postalCode: input.zip,
                        state: input.city,
                        country: input.country
                    },
                    deliveryOption: input.deliveryOption,
                    specialInstructions: input.instruction,
                    tenant: tenant.docs[0].id
                }
            })

            const order = await ctx.db.create({
                collection: "orders",
                data: {
                    name: customer.firstname,
                    customer: customer.id,
                    isPaid: false,
                    orderItems: input.products.map(product => ({
                        product: product.name,
                        quantity: product.quantity
                    })),
                    tenant: tenant.docs[0].id
                }
            });
            if (!tenant.docs[0].bankDetails?.razorpayLinkedAccountId) throw new TRPCError({ code: "BAD_REQUEST", message: "Tenant not verified" })
            const razorpayOrder = await razorpay.orders.create({
                amount: input.finalAmount * 100,
                currency: 'INR',
                receipt: `order-${order.id.substring(0, 30)}`,
                transfers: [
                    {
                        account: tenant.docs[0].bankDetails.razorpayLinkedAccountId,
                        amount: input.finalAmount * 100,
                        currency: 'INR',
                        on_hold: false,
                    },
                ]
            });

            return {
                razorpay_order_id: razorpayOrder.id,
                amount: razorpayOrder.amount,
                currency: razorpayOrder.currency,
                uniqueId: order.id,
                customerEmail: input.email,
                customerPhone: input.phone,
                customerName: `${input.firstname}  ${input.lastname}`,
            }
        }),
    verifyOrder: baseProcedure
        .input(
            z.object({
                razorpay_order_id: z.string().optional(),
                amount: z.union([z.number(), z.string()]).optional(),
                uniqueId: z.string().optional(),
                razorpay_payment_id: z.string().optional(),
                razorpay_signature: z.string().optional(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const body = `${input.razorpay_order_id}|${input.razorpay_payment_id}`;
            const sha = crypto.createHmac('sha256', process.env.RAZOR_PAY_SECRET_KEY as string);
            sha.update(`${input.razorpay_order_id}|${input.razorpay_payment_id}`);
            const expectedSignature = crypto
                .createHmac('sha256', process.env.RAZOR_PAY_SECRET_KEY as string)
                .update(body)
                .digest('hex');

            if (expectedSignature !== input.razorpay_signature) {
                return new NextResponse("Invalid transaction", { status: 401 });
            }

            await ctx.db.update({
                collection: "orders",
                where: {
                    id: {
                        equals: input.uniqueId
                    },
                },
                data: {
                    isPaid: true,
                    razorpayCheckoutSessionId: input.razorpay_payment_id,
                    razorpayOrderId: input.razorpay_order_id
                }
            });
        })
})