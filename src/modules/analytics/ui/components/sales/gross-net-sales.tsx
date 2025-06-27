"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"

export const description = "An interactive area chart"

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    totalGrossSales: {
        label: " Gross Sales",
        color: "oklch(0.488 0.243 264.376)",
    },
    totalNetSales: {
        label: " Net Sales",
        color: "oklch(0.696 0.17 162.48)",
    },
} satisfies ChartConfig

export function GrossNetSales({ tenantId }: { tenantId: string }) {

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.analytics.getTenantMonthlySales.queryOptions({ tenantId: tenantId }));

    const chartData = data?.map(item => ({
        date: item.month,
        totalGrossSales: typeof item.totalGrossSales === 'string'
            ? parseFloat(item.totalGrossSales)
            : item.totalGrossSales,
        totalNetSales: typeof item.totalNetSales === 'string'
            ? parseFloat(item.totalNetSales)
            : item.totalNetSales,
    })) || [];

    return (
        <Card className="@container/card">
            <CardHeader className="relative flex items-center">
                <CardTitle>Gross v/s Net Sales</CardTitle>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer
                    config={chartConfig}
                    className="aspect-auto h-[250px] w-full"
                >
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="fillGrossSales" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="0%"
                                    stopColor="var(--color-totalGrossSales)"
                                    stopOpacity={1.0}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-totalGrossSales)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                            <linearGradient id="fillNetSales" x1="0" y1="0" x2="0" y2="1">
                                <stop
                                    offset="0%"
                                    stopColor="var(--color-totalNetSales)"
                                    stopOpacity={0.8}
                                />
                                <stop
                                    offset="95%"
                                    stopColor="var(--color-totalNetSales)"
                                    stopOpacity={0.1}
                                />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                // Handle both date strings and month names
                                try {
                                    const date = new Date(value);
                                    if (!isNaN(date.getTime())) {
                                        return date.toLocaleDateString("en-IN", {
                                            month: "short",
                                            year: "2-digit",
                                        });
                                    }
                                } catch {
                                    return value;
                                }
                                return value;
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        try {
                                            const date = new Date(value);
                                            if (!isNaN(date.getTime())) {
                                                return date.toLocaleDateString("en-IN", {
                                                    month: "long",
                                                    year: "numeric",
                                                });
                                            }
                                        } catch {
                                            return value;
                                        }
                                        return value;
                                    }}
                                    indicator="dot"
                                    formatter={(value, name) => [
                                        new Intl.NumberFormat('en-IN', {
                                            style: 'currency',
                                            currency: 'INR'
                                        }).format(Number(value)),
                                        chartConfig[name as keyof typeof chartConfig]?.label || name
                                    ]}
                                />
                            }
                        />
                        <Area
                            dataKey="totalNetSales"
                            type="natural"
                            fill="url(#fillNetSales)"
                            stroke="var(--color-totalNetSales)"
                            stackId="a"
                        />
                        <Area
                            dataKey="totalGrossSales"
                            type="natural"
                            fill="url(#fillGrossSales)"
                            stroke="var(--color-totalGrossSales)"
                            stackId="a"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}