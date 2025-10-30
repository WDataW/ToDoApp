import { useTranslation } from "@/context/Language";
import PieChart from "./PieChart";
import { useTasks } from "@/context/User";
import { filterTasks, useActivity } from "../tasks/tasks.js";


export default function TasksProgress({ className = "", children, ...props }) {
    const t = useTranslation();
    const [tasks] = useTasks();
    const activeTasks = filterTasks(t, tasks, t("terms.active")).length;
    const completedTasks = filterTasks(t, tasks, t("terms.completed")).length;
    const overdueTasks = filterTasks(t, tasks, t("terms.overdue")).length;

    const chartData = [
        { taskType: "completed", amount: completedTasks, fill: "#3bfb2aff" },
        { taskType: "active", amount: activeTasks, fill: "#5a9afa" },
        { taskType: "overdue", amount: overdueTasks, fill: "crimson" },

    ];
    const chartConfig = {
        amount: {
            label: t("titles.tasks").toLowerCase(),
        },
        completed: {
            label: t("terms.completed").toLowerCase(),
        },
        active: {
            label: t("terms.active").toLowerCase(),
        },
        overdue: {
            label: t("terms.overdue").toLowerCase(),
        },

    }

    useActivity();
    return (
        <PieChart total={completedTasks + activeTasks + overdueTasks} chartData={chartData} chartConfig={chartConfig}>{t("titles.tasksProgress")}</PieChart>
    );
}