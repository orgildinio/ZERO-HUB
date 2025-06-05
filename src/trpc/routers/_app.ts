import { tenantsRouter } from "@/modules/tenants/server/procedure";
import { createTRPCRouter } from "../init";

import { authRouter } from "@/modules/auth/server/procedure";
import { categoriesRouter } from "@/modules/categories/server/procedure";
import { productsRouter } from "@/modules/products/server/procedure";

export const appRouter = createTRPCRouter({
    auth: authRouter,
    tenants: tenantsRouter,
    categories: categoriesRouter,
    products: productsRouter
})

export type AppRouter = typeof appRouter;