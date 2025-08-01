"use client"

import { Pie, PieChart } from "recharts"


import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent
} from "@/components/ui/charts/chart"




const colors = {
    light: "var(--light-theme-accent-color)",
    dark: "var(--dark-theme-accent-color)",
    neutral: "var(--neutral-theme-color)"
}
import { useTranslation } from "@/context/Language"
export default function CustomPieChart({ chartData, chartConfig, children }) {
    const t = useTranslation();




    return (
        <ChartContainer
            config={chartConfig}
            className={`mx-auto aspect-square max-h-[17rem]`}
        >
            <h3 className="border-b  mx-[0.4rem]">{children}</h3>

            <PieChart className="text-[0.8rem] ">
                <ChartTooltip
                    cursor={false}
                    labelClassName="text-white"
                    content={<ChartTooltipContent className="text-[0.8rem]" hideLabel />}
                />
                <Pie data={chartData} dataKey="amount" nameKey={"taskType"} />
                <ChartLegend
                    content={<ChartLegendContent verticalAlign="top" nameKey="taskType" />}
                    className=""
                />
            </PieChart>
        </ChartContainer>
    )
}

























