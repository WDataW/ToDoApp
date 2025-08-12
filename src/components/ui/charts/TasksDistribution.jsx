import BarChart from "./BarChart"
import { Select } from "..";
import { useState } from "react";
import { useTranslation } from "@/context/Language";
import { useTagBars } from "../tasks/tasks";



const chartConfig = {

}

export default function TasksDistribution({ className = "", children, ...props }) {
    const t = useTranslation();
    const [filter1, setFilter1] = useState("all");
    const [filter2, setFilter2] = useState("all");
    const filter = [t(`terms.${filter1}`), t(`terms.${filter2}`)];
    const bars = useTagBars(filter);
    return (
        <div className="flex flex-col transition transition-all  justify-between h-full">
            <div>

                <h3 className="border-b  mx-[0.4rem]">{t("titles.taskDistributionByTags")}</h3>
                <div className="mt-[1rem] ">
                    <div className="flex gap-[0.5rem]">

                        <Select className="max-w-[9rem]" value={filter1} label={t("fields.category")} onChange={(e) => { setFilter1(e.target.value) }} >
                            <option value="all">{t("terms.all")}</option>
                            <option value="today">{t("terms.today")}</option>
                            {filter2 !== "overdue" && <option value="tomorrow">{t("terms.tomorrow")}</option>}
                            <option value="highPriority">{t("terms.highPriority")}</option>
                            <option value="mediumPriority">{t("terms.mediumPriority")}</option>
                            <option value="lowPriority">{t("terms.lowPriority")}</option>
                        </Select>
                        <Select className="max-w-[9rem]" value={filter2} label={t("fields.filter")} onChange={(e) => { setFilter2(e.target.value) }} >
                            <option value="all">{t("terms.all")}</option>
                            <option value="active">{t("terms.active")}</option>
                            {filter1 !== "tomorrow" && <option value="overdue">{t("terms.overdue")}</option>}
                            <option value="completed">{t("terms.completed")}</option>
                        </Select>
                    </div>
                </div>
                <BarChart chartData={bars} dataKey={"frequency"} chartConfig={chartConfig} axisKey={"tag"} className={` ${className}`} {...props}>
                    {children}
                </BarChart>
            </div>
        </div>
    );
}