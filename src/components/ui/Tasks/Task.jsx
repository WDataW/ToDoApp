import { useTheme } from "../../../context/Theme";
import CheckTask from "../checkboxes/CheckTask";
import { useDeleteTask, useEditTask } from "./tasks";
import { MeatballMenu } from "../buttons";
import { useRef, useState } from "react";
import { getDueDate, getDueTime, getFinalTaskTags } from "./tasks";
import { createPortal } from 'react-dom';
import ActionsContainer from "./ActionsContainer";
import MiniTag from "./MiniTag";
import { EditTask } from ".";
import { useTranslation } from "@/context/Language";
import DeleteSomething from "../buttons/DeleteSomething";
import { useTasks } from "@/context/User";
const themeStyles = {
    dark: "bg-[#222222] text-white",
    light: "bg-[#E9EBEB] text-black"
};
const icons = {
    light: {
        calendar: "bg-[url(/src/assets/icons/light/calendar.svg)]",
        clock: "bg-[url(/src/assets/icons/light/clock.svg)]"
    },
    dark: {
        calendar: "bg-[url(/src/assets/icons/dark/calendar.svg)]",
        clock: "bg-[url(/src/assets/icons/dark/clock.svg)]"
    }
}


let actionsMenu;
export default function Task({ className = "", taskObj = {}, completed = "false", children, ...props }) {
    const editTask = useEditTask();
    const meatballButtonRef = useRef(null);
    const selfRef = useRef();
    const [editMode, setEditMode] = useState(false);

    function editTaskAction(e) {
        const main = e.target.closest("main");
        main.classList.add("hidden");

        const pageHeader = main.parentElement.querySelector("header");
        pageHeader.classList.add("hidden");

        setEditMode(true);
    }
    const [tasks, setTasks] = useTasks();
    function editPin() {
        setPinned(!pinned);
        const newTask = { ...taskObj, pinned: !pinned };
        let newTasks = tasks.filter((cTask) => cTask.id !== taskObj.id);
        newTasks = [newTask, ...newTasks];
        if (meatballButtonRef.current) meatballButtonRef.current.click();
        setTasks(newTasks);

    }
    function stopEditingTask() {
        const main = selfRef.current.closest("main");
        main.classList.remove("hidden");

        const pageHeader = main.parentElement.querySelector("header");
        pageHeader.classList.add("hidden");

        setEditMode(false);
    }
    function startDeletingTask() {
        setDeleteMode(true)
    }
    function stopDeletingTask() {
        setDeleteMode(false)
    }
    function handleMeatballClick(e) {
        const meatballButton = e.target;
        if (!opened) {
            const position = meatballButton.getBoundingClientRect();
            const scrolableParent = meatballButton.closest(".tasks-container");
            actionsMenu = <ActionsContainer
                actionsArray={[
                    { label: "edit", action: editTaskAction },
                    { label: pinned ? "unpin" : "pin", action: () => { editPin() } },
                    { label: "delete", action: startDeletingTask }
                ]}
                yOffset={5.3}
                scrolableParent={scrolableParent}
                meatballButton={meatballButton}
                hideMenu={hideActionsMenu}
                position={position}
            />
        }
        setOpened(!opened);
    }

    function hideActionsMenu() {
        setOpened(false);

    }
    const [opened, setOpened] = useState(false);
    const [theme] = useTheme();
    const [checked, setChecked] = useState(completed);
    const [deleteMode, setDeleteMode] = useState(false);
    const [pinned, setPinned] = useState(taskObj.pinned);
    const deleteTask = useDeleteTask();
    const t = useTranslation()
    const taskContent = (
        <div id={taskObj.id} ref={selfRef} className={`${themeStyles[theme]} relative py-[0.5rem] px-[0.8rem] flex  rounded-[1.5rem] ${className}`} {...props}>
            {editMode && createPortal(<EditTask heading={t("titles.editTask")} yes={t("terms.save")} no={t("terms.cancel")} close={stopEditingTask} taskToEdit={taskObj} />, selfRef.current.closest("main").parentElement)}
            {deleteMode && createPortal(<DeleteSomething page={selfRef.current.closest("main").parentElement} title={t("terms.tasks", { count: 1 })} something={taskObj.title} yesFunc={() => { deleteTask((taskObj)) }} noFunc={stopDeletingTask}></DeleteSomething>, selfRef.current.closest("main").parentElement)}
            {(opened && !checked) && createPortal(actionsMenu, document.querySelector("main"))}
            <CheckTask checked={checked} onChange={handleChecked} className=" ms-[0.15rem] me-[0.9rem] mt-[0.65rem] " />
            <div className="me-[0.5rem]">
                <div className="text-[0.7rem] opacity-">
                    <div className=" opacity-60 flex items-center flex-wrap gap-x-[0.5rem]">
                        {!checked && pinned && <div><span className="inline-block bg-size-[108%] h-[0.6rem] w-[0.6rem] me-[0.2rem] bg-[url(/src/assets/icons/dark/pin.svg)]  bg-no-repeat bg-center bg-cover " ></span>{t("terms.pinned")}</div>}
                        <div className="text-nowrap"> <span className={`inline-block h-[0.6rem] w-[0.6rem]  me-[0.2rem] ${icons[theme]["calendar"]} bg-cover bg-no-repeat bg-center `}></span>{getDueDate(taskObj)}</div>
                        <div className="text-nowrap">   <span className={`inline-block h-[0.6rem] w-[0.6rem]  me-[0.2rem] ${icons[theme]["clock"]} bg-cover bg-center bg-no-repeat`}></span>{getDueTime(taskObj)}</div>
                    </div>
                    <div className="flex items-center gap-x-[0.5rem] flex-wrap">
                        {
                            getFinalTaskTags(taskObj).map((tag, i) => {
                                if (!tag.title) { return null }
                                return (
                                    <MiniTag key={i} tag={tag} />

                                );
                            }
                            )
                        }
                    </div>
                </div>
                <p>{taskObj.title}</p>
                <div className="hyphens-auto wrap-anywhere opacity-60 text-[0.85rem] text-wrap">{taskObj.description}</div>
            </div>
            {!checked && <MeatballMenu ref={meatballButtonRef} onClick={(e) => {
                handleMeatballClick(e);
            }} className="meatball-actions ms-auto me-[0.25rem] mt-[0.65rem]  h-[1.4rem] w-[1.4rem]"></MeatballMenu>}

        </div>
    );

    function handleChecked() {
        editTask({ ...taskObj, status: !checked ? "completed" : "active", completedAt: new Date().toISOString(), pinned: false });
        setChecked(!checked);
        setOpened(false);
    }



    return (
        <>
            {!checked ? <div className="animate-in-opacity">{taskContent}</div> : <del className="animate-out-opacity">{taskContent}</del>}
        </>
    );
}