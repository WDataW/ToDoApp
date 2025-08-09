import { useTranslation } from "@/context/Language";
import { useActivity } from "../tasks/tasks";
import { ChartRadarDots } from "./RadarChart";
export default function ActivityChart({ className = "", children, ...props }) {
    const t = useTranslation();
    const activity = useActivity();
    const chartConfig = {
        completed: {
            label: "completed",
        },
    }

    return (
        <ChartRadarDots title={t("titles.activityByWeekdays")} chartConfig={chartConfig} chartData={activity} dataKey={"completed"} axisKey="day" name={t("terms.tasksCompleted")}></ChartRadarDots>
    );
}