import SectionContainer from "../Containers/SectionContainer";
import { useTasks } from "../../../context/User";
import { filterTasks } from "./filterTasks";
import Task from "./Task";
export default function TasksContainer({className="", filterKey="today" ,children, ...props}){
    const [ tasks ] = useTasks();
    const filteredTasks =filterTasks(tasks ,filterKey);
    return(
        <ol className={`flex flex-col gap-[0.5rem] overflow-auto max-h-[20rem]   px-[0.4rem] ${className}`} {...props}>
                <Task/>
                
        </ol>
    );
}