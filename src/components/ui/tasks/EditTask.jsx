import { OverlayPage } from "@/Pages";
import { TaskInit } from ".";
import { Main, YesNoButtons } from "..";
import { useEffect, useState } from "react";
import { taskSkeleton, useEditTask } from "./tasks";
import { createTask, patchTask } from "@/scripts/requests";
export default function EditTask({ noNewTags = false, close, taskToEdit = { ...taskSkeleton }, yes, no, className = "", children, ...props }) {

    const editTask = useEditTask();
    const [newTask, setNewTask] = useState();
    async function save() {
        let response;
        if (!taskToEdit?.id) response = await createTask(newTask); // indicates we're creating a task not editing one
        else response = await patchTask(newTask);
        if (response && response.status == 201 || response.status == 200) editTask(response.data);
        close();
    }
    return (
        <OverlayPage close={close} className={`${className}`} {...props}>
            <Main className="flex items-center flex-col ">
                <div className="w-full  sm:max-w-3/4 ">
                    <TaskInit noNewTags={noNewTags} close={close} setNewTask={setNewTask} taskToEdit={taskToEdit} />
                    <YesNoButtons to={true} disabled={!newTask?.title || !newTask?.dueDate} className="justify-center mt-[1rem] text-[0.9rem]" yesFunc={save} yes={yes} noFunc={close} no={no} />
                </div>
            </Main>
        </OverlayPage>
    );
}