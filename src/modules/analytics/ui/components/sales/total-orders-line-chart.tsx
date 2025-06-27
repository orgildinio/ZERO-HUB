"use client"

import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

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

export const description = "A line chart with a label"

const chartConfig = {
    totalOrders: {
        label: "Total Orders",
        color: "oklch(0.7715 0.2086 136)",
    },
} satisfies ChartConfig

const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
]

export function TotalOrdersLineChart({ tenantId }: { tenantId: string }) {

    const currentYear = new Date().getFullYear();

    const trpc = useTRPC();
    const { data } = useSuspenseQuery(trpc.analytics.getTenantMonthlySales.queryOptions({
        tenantId: tenantId,
    }))

    const chartData = data?.map((item) => ({
        month: monthNames[parseInt(item.month) - 1],
        totalOrders: Number(item.totalOrders) || 0,
    }))

    return (
        <Card>
            <CardHeader>
                <CardTitle>Total Orders</CardTitle>
                <CardDescription>January - December {currentYear}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="max-h-[250px] pb-0 w-full">
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                            dataKey="totalOrders"
                            type="linear"
                            stroke="var(--color-totalOrders)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-totalOrders)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="text-sm">
                <div className="text-muted-foreground leading-none">
                    Showing total orders for {currentYear}
                </div>
            </CardFooter>
        </Card>
    )
}
