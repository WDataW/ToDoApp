"use client"

import { Pie, PieChart, Label } from "recharts"
import { motion } from "motion/react";
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
import { useTheme } from "@/context/Theme"
export default function CustomPieChart({ total, chartData, chartConfig, children }) {
    const t = useTranslation();

    const [theme] = useTheme();


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
                <Pie data={chartData} innerRadius={70} dataKey="amount" nameKey={"taskType"} >
                    <Label
                        content={({ viewBox }) => {
                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                return (
                                    <motion.text
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1, transition: { duration: 2 } }}
                                        x={viewBox.cx}
                                        y={viewBox.cy}
                                        textAnchor="middle"
                                        dominantBaseline="middle"
                                    >
                                        <tspan
                                            x={viewBox.cx}
                                            y={viewBox.cy}
                                            className={`${theme == "dark" ? "fill-white" : "fill-black"} ${total > 999999 ? "text-[2.1rem]" : "text-[2.3rem]"}  font-bold`}
                                        >
                                            {total}
                                        </tspan>
                                        <tspan
                                            x={viewBox.cx}
                                            y={(viewBox.cy || 0) + 24}
                                            className={`${theme == "dark" ? "fill-white" : "fill-black"} `}
                                        >
                                            {t("terms.tasks")}
                                        </tspan>
                                    </motion.text>
                                )
                            }
                        }}
                    />
                </Pie>
                <ChartLegend
                    content={<ChartLegendContent verticalAlign="top" nameKey="taskType" />}
                    className=""
                />
            </PieChart>
        </ChartContainer>
    )
}