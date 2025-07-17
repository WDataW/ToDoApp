import { useTasks } from "../../../context/User";
import { filterTasks } from "./tasks";
import { useTranslation } from "../../../context/Language";
import Task from "./Task";
export default function TasksContainer({ className = "", filterKey = "", children, ...props }) {
    const [tasks, setTasks] = useTasks();
    const filteredTasks = filterTasks(tasks, filterKey);
    const t = useTranslation();
    return (
        <ol className={`flex flex-col gap-[0.5rem] overflow-auto max-h-[20rem]   px-[0.4rem] ${className}`} {...props}>
            {filteredTasks.map((task, i) => {
                return (
                    <li key={i}>
                        <Task taskObj={task} />
                    </li>)
            })}
            {filteredTasks.length == 0 && <h4>{t("terms.noTasksAvaiable")}</h4>}
        </ol>
    );
}