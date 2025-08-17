import { useTranslation } from "@/context/Language";
import { useTheme, bgThemeColors } from "@/context/Theme";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EditTask } from "../tasks";
export default function CreateTaskButton({ customTheme, className, children, ...props }) {
    const t = useTranslation();
    const [theme] = customTheme || useTheme();
    const selfRef = useRef();
    const [createTaskMode, setCreateTaskMode] = useState(false);

    function createTask() {
        const main = selfRef.current.closest("main");
        main.classList.add("hidden");

        const pageHeader = main.parentElement.querySelector("header");
        pageHeader.classList.add("hidden");

        setCreateTaskMode(true);
    }
    function stopCreatingTask() {
        const main = selfRef.current.closest("main");
        main.classList.remove("hidden");

        const pageHeader = main.parentElement.querySelector("header");
        pageHeader.classList.remove("hidden");

        setCreateTaskMode(false);
    }
    return (<>
        {createTaskMode && createPortal(<EditTask heading={t("terms.createTask")} close={stopCreatingTask} yes={t("terms.create")} no={t("terms.cancel")} {...props} />, selfRef.current.closest("main").parentElement)}
        <button ref={selfRef} onClick={createTask} className={`${className} ${bgThemeColors[theme]} rounded-[0.4rem]  text-white`} >{t("terms.createTask")}</button>
    </>
    );
}