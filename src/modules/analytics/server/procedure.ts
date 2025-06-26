import { db } from "@/db";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { z } from "zod";
import { tenants, vTenantMonthlySales } from "../../../../drizzle/schema";
import { and, desc, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const analyticsRouter = createTRPCRouter({
    getTenantMonthlySales: baseProcedure
        .input(
            z.object({
                slug: z.string(),
                year: z.number()
            })
        )
        .query(async ({ input }) => {

            const { slug, year } = input

            const [tenant] = await db
                .select({
                    id: tenants.id
                })
                .from(tenants)
                .where(eq(tenants.slug, slug))
                .limit(1);

            if (!tenant) throw new TRPCError({ code: 'NOT_FOUND', message: 'Tenant not found!' });

            const whereConditions = [eq(vTenantMonthlySales.tenantId, tenant.id)];

            if (year) {
                const yearCondition = and(
                    eq(vTenantMonthlySales.tenantId, tenant.id),
                    eq(vTenantMonthlySales.year, year.toString())
                )
                if (yearCondition) {
                    whereConditions.push(yearCondition)
                }
            }

            const validConditions = whereConditions.filter(Boolean);
            const whereCondition = validConditions.length === 1 ? validConditions[0] : and(...validConditions);

            const data = await db
                .select()
                .from(vTenantMonthlySales)
                .where(whereCondition)
                .orderBy(desc(vTenantMonthlySales.year), desc(vTenantMonthlySales.month));

            if (!data.length) throw new TRPCError({ code: 'NOT_FOUND', message: 'NOT ENOUGH DATA' })
            return data
        }),
    updateProductSalesSummary: baseProcedure
        .input(
            z.object({

            })
        )
        .query(async () => {

        }),
})