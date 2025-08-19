import { useTranslation } from "@/context/Language";
import { useTheme, bgThemeColors } from "@/context/Theme";
import { useRef, useState } from "react";
import { createPortal } from "react-dom";
import { EditTag } from "..";
import { hidePageContents, showPageContents } from "@/Pages/pages";
export default function CreateTagButton({ activeTags, setActiveTags, customTheme, className, ...props }) {
    const t = useTranslation();
    const [theme] = customTheme || useTheme();
    const selfRef = useRef();
    const [createTagMode, setCreateTagMode] = useState(false);

    function createTag() {
        hidePageContents(selfRef.current)
        setCreateTagMode(true);
    }
    function stopCreatingTag() {
        showPageContents(selfRef.current)
        setCreateTagMode(false);
    }
    return (<>
        {createTagMode && createPortal(<EditTag activeTags={activeTags} setActiveTags={setActiveTags} heading={t("terms.createTag")} close={stopCreatingTag} yes={t("terms.create")} no={t("terms.cancel")} />, selfRef.current.closest("main").parentElement)}
        <button ref={selfRef} onClick={createTag} className={`create-tag ${className} ${bgThemeColors[theme]} rounded-[0.4rem]  text-white`}  {...props}>{t("terms.createTag")}</button>
    </>
    );
}