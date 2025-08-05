import { OverlayPage } from "@/Pages";
import { useTranslation } from "@/context/Language";
import { TaskInit } from ".";
import { Main, YesNoButtons } from "..";
import { useState } from "react";
import { useEditTask } from "./tasks";
export default function EditTask({ close, taskToEdit = {}, className = "", children, ...props }) {
    const t = useTranslation();

    const editTask = useEditTask()
    const [newTask, setNewTask] = useState();
    function save() {
        editTask(newTask);
        close();
    }
    return (
        <OverlayPage heading={t("titles.editTask")} close={close} className={`${className}`} {...props}>
            <Main className="flex items-center flex-col ">
                <div className="w-full  sm:max-w-3/4 ">
                    <TaskInit setNewTask={setNewTask} taskToEdit={taskToEdit} />
                    <YesNoButtons disabled={!newTask?.title || !newTask?.dueDate} className="justify-center mt-[1rem] text-[0.9rem]" yesFunc={save} yes={t("terms.save")} noFunc={close} no={t("terms.cancel")} />
                </div>
            </Main>
        </OverlayPage>
    );
}