import { verifySchema } from "../schema";

import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { razorpay } from "../lib/utils";

const planId: Record<string, string> = {
    starter: process.env.STARTER_PLAN_ID as string,
    pro: process.env.PROFESSIONAL_PLAN_ID as string,
    enterprise: process.env.ENTERPRISE_PLAN_ID as string,
}

export const subscriptionRouter = createTRPCRouter({
    verify: protectedProcedure
        .input(verifySchema)
        .mutation(async ({ ctx, input }) => {
            try {
                const user = await ctx.db.findByID({
                    collection: "users",
                    id: ctx.session.user.id,
                    depth: 0,
                });
                if (!user) throw new TRPCError({ code: "NOT_FOUND", message: "User not found" });

                const tenantId = user.tenants?.[0]?.tenant.toString() as string;
                const tenant = await ctx.db.findByID({
                    collection: "tenants",
                    id: tenantId
                });
                if (!tenant) throw new TRPCError({ code: "NOT_FOUND", message: "Tenant not found." });

                const plan = await ctx.db.find({
                    collection: 'subscription-plans',
                    where: {
                        razorpayPlanId: {
                            equals: planId[input.plan]
                        },
                    }
                });
                if (!plan) {
                    throw new Error('Plan not found or not configured');
                }

                const existingSubscription = await ctx.db.find({
                    collection: "subscriptions",
                    limit: 1,
                    where: {
                        tenant: {
                            equals: tenant.id
                        },
                        status: {
                            in: ["active", "authenticated"]
                        }
                    }
                });
                if (existingSubscription.docs.length > 0) {
                    throw new TRPCError({ code: "BAD_REQUEST", message: 'User already has an active subscription' });
                }

                const razorpaySubscription = await razorpay.subscriptions.create({
                    plan_id: planId[input.plan],
                    quantity: 1,
                    total_count: 1,
                });

                const subscription = await ctx.db.create({
                    collection: "subscriptions",
                    data: {
                        tenant: tenant.id,
                        plan: plan.docs?.[0].id,
                        razorpaySubscriptionId: razorpaySubscription.id,
                        status: razorpaySubscription.status,
                        startAt: razorpaySubscription.start_at
                            ? new Date(razorpaySubscription.start_at * 1000).toISOString()
                            : null,
                        endAt: razorpaySubscription.end_at
                            ? new Date(razorpaySubscription.end_at * 1000).toISOString()
                            : null,
                        currentStart: razorpaySubscription.current_start
                            ? new Date(razorpaySubscription.current_start * 1000).toISOString()
                            : null,
                        currentEnd: razorpaySubscription.current_end
                            ? new Date(razorpaySubscription.current_end * 1000).toISOString()
                            : null,
                        chargeAt: razorpaySubscription.charge_at
                            ? new Date(razorpaySubscription.charge_at * 1000).toISOString()
                            : null,
                        paidCount: razorpaySubscription.paid_count,
                        remainingCount: parseInt(razorpaySubscription.remaining_count),
                    }
                })

                //TODO: Assign default template to tenant
                return {
                    subscription: razorpaySubscription,
                    payloadSubscription: subscription,
                };
            } catch (error) {
                console.log(error)
            }
        })
})