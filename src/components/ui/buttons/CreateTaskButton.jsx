import { useTranslation } from "@/context/Language";
import { useTheme, bgThemeColors } from "@/context/Theme";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EditTask } from "../tasks";
import { hidePageContents, showPageContents } from "@/Pages/pages";
import { useLevel } from "@/context/PageLevel";
import { useEffectEvent } from "react";
export default function CreateTaskButton({ customTheme, className, children, ...props }) {
    const t = useTranslation();
    const [theme] = customTheme || useTheme();
    const selfRef = useRef();
    const [createTaskMode, setCreateTaskMode] = useState(false);
    function rememeberFocus() {
        selfRef.current.focus();
    }
    function createTask() {
        hidePageContents(selfRef.current)
        setCreateTaskMode(true);
    }
    function stopCreatingTask() {
        showPageContents(selfRef.current)
        setCreateTaskMode(false);
        rememeberFocus();

    }
    const [level] = useLevel();
    const closePopstate = useEffectEvent(
        () => {
            if (level == 1) stopCreatingTask()
        }
    )
    useEffect(() => {
        window.addEventListener("popstate", closePopstate);
        return () => window.removeEventListener("popstate", closePopstate);

    }, []);
    return (<>
        {createTaskMode && createPortal(<EditTask heading={t("terms.createTask")} close={stopCreatingTask} yes={t("terms.create")} no={t("terms.cancel")} {...props} />, selfRef.current.closest("main").parentElement)}
        <button ref={selfRef} onClick={createTask} className={`${className} ${bgThemeColors[theme]} rounded-[0.4rem]  text-white`} >{t("terms.createTask")}</button>
    </>
    );
}