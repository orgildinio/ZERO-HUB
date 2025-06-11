import { createTRPCRouter } from "../init";

import { authRouter } from "@/modules/auth/server/procedure";
import { tenantsRouter } from "@/modules/tenants/server/procedure";
import { categoriesRouter } from "@/modules/categories/server/procedure";
import { productsRouter } from "@/modules/products/server/procedure";
import { subscriptionRouter } from "@/modules/subscriptions/server/procedure";
import { reviewsRouter } from "@/modules/reviews/server/procedure";
import { checkoutRouter } from "@/modules/checkout/server/procedure";

export const appRouter = createTRPCRouter({
    auth: authRouter,
    tenants: tenantsRouter,
    categories: categoriesRouter,
    products: productsRouter,
    subscriptions: subscriptionRouter,
    reviews: reviewsRouter,
    checkout: checkoutRouter
})

export type AppRouter = typeof appRouter;