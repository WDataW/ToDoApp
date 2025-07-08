import SectionContainer from "../Containers/SectionContainer";
import { useTasks } from "../../../context/User";
import { filterTasks, sortTasksByDate } from "./tasks";
import Task from "./Task";
export default function TasksContainer({ className = "", filterKey = "", children, ...props }) {
    const [tasks, setTasks] = useTasks();
    const filteredTasks = filterTasks(tasks, filterKey);
    return (
        <ol className={`flex flex-col gap-[0.5rem] overflow-auto max-h-[20rem]   px-[0.4rem] ${className}`} {...props}>
            {filteredTasks.map((task) => {
                return <Task taskObj={task} />
            })}
        </ol>
    );
}