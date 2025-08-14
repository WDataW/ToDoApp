import { useTranslation } from "@/context/Language";
import { useTheme, bgThemeColors } from "@/context/Theme";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EditTag } from "..";
export default function CreateTagButton({ activeTags, setActiveTags, customTheme, className, ...props }) {
    const t = useTranslation();
    const [theme] = customTheme || useTheme();
    const selfRef = useRef();
    const [createTagMode, setCreateTagMode] = useState(false);

    function createTag() {
        const main = selfRef.current.closest("main");
        main.classList.add("hidden");

        const pageHeader = main.parentElement.querySelector("header");
        pageHeader.classList.add("hidden");

        setCreateTagMode(true);
    }
    function stopCreatingTag() {
        const main = selfRef.current.closest("main");
        main.classList.remove("hidden");

        const pageHeader = main.parentElement.querySelector("header");
        pageHeader.classList.remove("hidden");

        setCreateTagMode(false);
    }
    return (<>
        {createTagMode && createPortal(<EditTag activeTags={activeTags} setActiveTags={setActiveTags} heading={t("terms.createTag")} close={stopCreatingTag} yes={t("terms.create")} no={t("terms.cancel")} />, selfRef.current.closest("main").parentElement)}
        <button ref={selfRef} onClick={createTag} className={`${className} ${bgThemeColors[theme]} rounded-[0.4rem]  text-white`}  {...props}>{t("terms.createTag")}</button>
    </>
    );
}