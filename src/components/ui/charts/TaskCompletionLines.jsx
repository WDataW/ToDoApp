import { numToArabic, useLang, useTranslation } from "@/context/Language";
import { DoubleLineChart } from ".";
import { useMonthlyTasksData, useYearlyTasksData } from "../tasks/tasks.js";
import { useState } from "react";
import { Select, MonthPicker, YearPicker } from "../selects";
export default function TaskCompletionLines({ className = "", children, ...props }) {
    const t = useTranslation();
    const [mode, setMode] = useState("monthly");
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const chartData = mode == "monthly" ? useMonthlyTasksData(year, month) : useYearlyTasksData(year);
    const chartConfig = {
        created: {
            label: t("terms.created"),
        },
        completed: {
            label: t("terms.wasCompleted").toLowerCase(),
        },
    }
    const [lang] = useLang();
    const toolTipMonth = lang == "ar" ? numToArabic(month) : month;
    const toolTipYear = lang == "ar" ? numToArabic(year) : year;

    function labelFormatter(label) {
        if (mode == "monthly") {
            if (lang == "ar") {
                return `${toolTipYear}/${toolTipMonth}/${label}`;
            }
            return `${label}/${toolTipMonth}/${toolTipYear}`
        }
        return label;
    }
    return (
        <div className={`${className}`} {...props}>
            <h3 className="border-b  mx-[0.4rem]">{t("titles.completionVsCreation")}</h3>
            <div className="flex mt-[1rem] gap-[0.5rem]">
                <Select value={mode} onChange={(e) => { setMode(e.target.value) }} label={t("terms.mode")}>
                    <option value="monthly">{t("terms.monthly")}</option>
                    <option value="yearly">{t("terms.yearly")}</option>
                </Select>
                <YearPicker year={year} setYear={setYear}></YearPicker>
                {mode == "monthly" && <MonthPicker month={month} setMonth={setMonth} ></MonthPicker>}
            </div>
            <DoubleLineChart chartData={chartData} chartConfig={chartConfig} axisKey={mode == "monthly" ? "day" : "month"} line1Key={"created"} line2Key={"completed"} labelFormatter={labelFormatter} ></DoubleLineChart>
            {children}
        </div>
    );
}