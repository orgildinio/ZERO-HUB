"use client"

import React from "react"
import { LabelList, Pie, PieChart } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useSuspenseQuery } from "@tanstack/react-query"
import { useTRPC } from "@/trpc/client"
import { formatPrice } from "@/lib/utils"

export const description = "A pie chart with a label"

const chartConfig = {
    totalNetSales: {
        label: "Net Sales",
    },
    categoryName: {
        label: 'Category Name',
        color: "var(--chart-2)"
    },
} satisfies ChartConfig

export function CategoryChart({ tenantId }: { tenantId: string }) {
    const currentYear = new Date().getFullYear()

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.analytics.getTenantTopCategories.queryOptions({
        tenantId: tenantId
    }));

    if (!data || data.length === 0) return <div>No data available</div>;

    const chartData = data.map((item, index) => ({
        categoryName: item.categoryName || 'Unknown',
        totalNetSales: parseFloat(item.totalNetSales || '0'),
        totalNetSalesFormatted: formatPrice(parseFloat(item.totalNetSales || '0')),
        fill: `var(--chart-${index + 1})`,
    }));

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Top Categories by Net Sales</CardTitle>
                <CardDescription>January - December {currentYear}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
                >
                    <PieChart>
                        <ChartTooltip
                            content={<ChartTooltipContent hideLabel />}
                            formatter={(value) => [formatPrice(value as number), ' Net Sales']}
                        />
                        <Pie
                            data={chartData}
                            dataKey="totalNetSales"
                            nameKey="categoryName"
                        >
                            <LabelList
                                fontStretch={2}
                                fontSize={12}
                                dataKey="categoryName"
                                color="#000"
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="text-sm text-center">
                <div className="text-muted-foreground leading-none">
                    Showing top categories for {currentYear}
                </div>
            </CardFooter>
        </Card>
    )
}