"use client"

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts"
import { AnimatePresence, motion } from "motion/react";
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/charts/chart"
import { useTheme } from "@/context/Theme";
import { useLang, useTranslation } from "@/context/Language";

export const description = "A bar chart with a label";
export default function ChartBarLabel({ chartData, chartConfig, dataKey, axisKey }) {
    const [theme] = useTheme();
    const [lang] = useLang();
    const t = useTranslation();
    return (
        <ChartContainer className={"relative"} config={chartConfig}>
            <BarChart
                accessibilityLayer
                data={chartData}
                margin={{
                    top: 20,
                }}
            >
                <CartesianGrid stroke={theme == "dark" ? "rgba(226, 226, 226, 0.5)" : "rgb(50, 50, 50, 0.3)"} vertical={false} />
                <XAxis
                    dataKey={axisKey}
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                />
                <Bar name={t("terms.tasksCount")} dataKey={dataKey} fill="var(--color-desktop)" radius={8} />

            </BarChart>
            {chartData.length == 0 && <p className={`text-[0.9rem] absolute top-1/2 start-1/2 -translate-y-1/2 ${lang == "ar" ? "translate-x-1/2" : "-translate-x-1/2"}`}>{t("terms.noMatchingResults")}</p>}
        </ChartContainer>

    )
}
