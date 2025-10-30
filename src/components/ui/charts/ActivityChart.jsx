import { useTranslation } from "@/context/Language";
import { useActivity } from "../tasks/tasks.js";
import { ChartRadarDots } from "./RadarChart";
export default function ActivityChart({ className = "", children, ...props }) {
    const t = useTranslation();
    const activity = useActivity();
    const chartConfig = {

    }

    return (
        <ChartRadarDots title={t("titles.activityByWeekdays")} chartConfig={chartConfig} chartData={activity} dataKey={"completed"} axisKey="day" name={t("terms.tasksCompleted")}></ChartRadarDots>
    );
}