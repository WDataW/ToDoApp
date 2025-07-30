import { useTasks } from "../../../context/User";
import { filterTasks, loopFilterTasks } from "./tasks";
import { motion } from "motion/react";
import { useTranslation } from "../../../context/Language";
import Task from "./Task";
export default function TasksContainer({ className = "", tagsFilter = "", searchFilter = "", children, ...props }) {
    const [tasks] = useTasks();
    let filteredTasks = loopFilterTasks(tasks, tagsFilter, "tag");
    if (searchFilter) filteredTasks = filterTasks(filteredTasks, searchFilter, "search");
    const t = useTranslation();
    return (
        <ol className={`tasks-container flex flex-col gap-[0.5rem] overflow-auto max-h-[20rem]   px-[0.4rem] ${className}`} {...props}>
            {filteredTasks.map((task, i) => {
                return (
                    <li key={i}>
                        <motion.div initial={{ opacity: 0 }} viewport={{ once: true }} whileInView={{ opacity: 1, transition: { duration: 0.4 } }} >
                            <Task taskObj={task} />
                        </motion.div>
                    </li>)
            })}
            {filteredTasks.length == 0 && <h4>{t("terms.noTasksAvaiable")}</h4>}
        </ol>
    );
}