"use client"

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, Text } from "recharts"

import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/charts/chart"
import { useTheme } from "@/context/Theme"
import { useLang, useTranslation } from "@/context/Language"

export const description = "A radar chart with dots"



export function ChartRadarDots({ chartData, chartConfig, dataKey, axisKey, name, title }) {
    const [theme] = useTheme();
    const [lang] = useLang();
    const t = useTranslation();
    function renderPolarAngleAxis({ payload, x, y, cx, cy, ...rest }) {
        return (
            <Text
                {...rest}
                verticalAnchor="middle"
                y={y + (y - cy) / (lang == "ar" ? 10 : 15)}
                x={x + (x - cx) / (lang == "ar" ? 3 : 20)}
            >
                {payload.value}
            </Text>
        );
    }

    return (
        <ChartContainer
            config={chartConfig}
            className="mx-auto  aspect-square max-h-[17rem] "
        >
            <h3 className="border-b  mx-[0.4rem]">{title}</h3>

            <RadarChart data={chartData} className={`mt-[0.5rem] max-h-[15.5rem]`}>
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <PolarAngleAxis tick={props => renderPolarAngleAxis(props)} dataKey={axisKey} />
                <PolarGrid stroke={theme == "dark" ? "rgb(226, 226, 226)" : "rgb(50, 50, 50)"} />
                <Radar
                    name={name}
                    dataKey={dataKey}
                    fill={`${theme == "dark" ? "var(--dark-theme-accent-color)" : "var(--light-theme-accent-color)"}`}
                    fillOpacity={0.6}
                    dot={{
                        r: 4,
                        fillOpacity: 1,
                    }}
                />
            </RadarChart>
        </ChartContainer>

    )
}
