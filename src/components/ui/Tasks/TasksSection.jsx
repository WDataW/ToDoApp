import { SectionContainer } from "../../ui";
import TasksContainer from "./TasksContainer";
export default function TasksSection({ className = "", heading = "", children, ...props }) {
    return (
        <SectionContainer className={`flex  flex-col   ${className}`} >
            <h3 className="border-b mb-[1rem] mx-[0.4rem]">{heading}</h3>
            <TasksContainer {...props} />
        </SectionContainer>
    );
}