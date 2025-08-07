import { useTranslation } from "@/context/Language";
import PieChart from "./PieChart";
import { useTasks } from "@/context/User";
import { filterTasks } from "../tasks/tasks";


export default function TasksProgress({ className = "", children, ...props }) {
    const t = useTranslation();
    const [tasks] = useTasks();
    const activeTasks = filterTasks(tasks, t("terms.active")).length;
    const completedTasks = filterTasks(tasks, t("terms.completed")).length;
    const overdueTasks = filterTasks(tasks, t("terms.overdue")).length;

    const chartData = [
        { taskType: "completed", amount: completedTasks, fill: "#e12afb" },
        { taskType: "active", amount: activeTasks, fill: "#5a9afa" },
        { taskType: "overdue", amount: overdueTasks, fill: "crimson" },

    ];
    const chartConfig = {
        amount: {
            label: t("titles.tasks"),
        },
        completed: {
            label: t("terms.completed"),
        },
        active: {
            label: t("terms.active"),
        },
        overdue: {
            label: t("terms.overdue"),
        },

    }
    return (
        <PieChart chartData={chartData} chartConfig={chartConfig}>{t("titles.tasksProgress")}</PieChart>
    );
}