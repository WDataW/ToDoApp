"use client"

import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    ChartLegend,
    ChartLegendContent
} from "@/components/ui/charts/chart"
import { useTheme } from "@/context/Theme"

export const description = "A multiple line chart"



export default function DoubleLineChart({ chartData, axisKey, chartConfig, line1Key, line2Key, labelFormatter }) {
    const [theme] = useTheme();
    const themeLineColor = `var(--${theme}-theme-accent-color)`;
    return (

        <ChartContainer className={""} config={chartConfig}>
            <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                    top: 12,
                    left: 12,
                    right: 12,
                }}
            >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey={axisKey}
                    tickLine={true}
                    axisLine={false}
                    tickMargin={8}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={labelFormatter}  // Or this
                />} />
                <Line
                    dataKey={line1Key}
                    type="monotone"
                    stroke={themeLineColor}
                    strokeWidth={2}
                    dot={false}
                />
                <Line
                    dataKey={line2Key}
                    type="monotone"
                    stroke={"#3bfb2aff"}
                    strokeWidth={2}
                    dot={false}
                />
                <ChartLegend
                    content={<ChartLegendContent verticalAlign="top" payload={[{ id: "completed" }, { id: "created" }]} />}
                    className="pt-[0.3rem]"
                />
            </LineChart>
        </ChartContainer>

    )
}
