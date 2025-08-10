import { useTasks } from "../../../context/User";
import { filterTasks, loopFilterTasks } from "./tasks";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "../../../context/Language";
import Task from "./Task";
export default function TasksContainer({ className = "", tagsFilter = "", searchFilter = "", children, ...props }) {
    const [tasks] = useTasks();
    let filteredTasks = loopFilterTasks(tasks, tagsFilter, "tag");
    if (searchFilter) filteredTasks = filterTasks(filteredTasks, searchFilter, "search");
    const t = useTranslation();

    return (
        <ol className={`tasks-container flex flex-col gap-[0.5rem] overflow-auto max-h-[20rem]   px-[0.4rem] ${className}`} {...props}>
            <AnimatePresence mode="wait">
                {filteredTasks.map((task, i) => {
                    return (
                        <motion.li key={task.id} exit={{ opacity: 0, scale: 0.8 }} initial={{ opacity: 0 }} viewport={{ once: true }} whileInView={{ opacity: 1, transition: { duration: 0.4 } }}>
                            <div >
                                <Task taskObj={task} completed={task.status == "completed"} />
                            </div>
                        </motion.li>)
                })}
                {filteredTasks.length == 0 && <motion.h4 initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={"h4"}>{t("terms.noTasksAvaiable")}</motion.h4>}
            </AnimatePresence>
        </ol>
    );
}