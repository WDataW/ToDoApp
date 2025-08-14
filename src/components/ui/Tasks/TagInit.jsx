
import { useLang, useTranslation } from "@/context/Language";
import { v4 as randomUUID } from "uuid";
import { KeyboardInput, WarningMessage, ColorPicker, TaskCategory } from "..";
import MiniTag from "./MiniTag";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/Theme";
import { useTags } from "@/context/User";
import { interpreteBuiltInTagTitle, isBuiltInTitle } from "./tasks";
export default function TagInit({ setNewTag, tagToEdit, className = "", children, ...props }) {
    function handleTitleChange(e) {
        // if (tagToEdit?.builtIn) return;
        setTitle(e.target.value);
    }

    const t = useTranslation();
    const [theme] = useTheme();
    const [tags] = useTags();

    const [title, setTitle] = useState(tagToEdit.title);
    const defaultColor = getComputedStyle(document.documentElement).getPropertyValue(`--${theme}-theme-accent-color`).trim();
    const tagColor = tagToEdit.icon.replace("bg-[", "").replace("]", "");
    const [color, setColor] = useState(tagColor || defaultColor);
    const newTagId = `tag:${randomUUID()}`;
    let icon = `bg-[${color}]`;
    const builtInKey = isBuiltInTitle(title, t);
    const uniqueTitle = tags.filter((tag) => {
        return (tag.title.toLowerCase() == title.toLowerCase() ||
            tag.title.toLowerCase() == t(`terms.${builtInKey}`, { lng: "en" }).toLowerCase()) &&
            title.toLowerCase() != tagToEdit.title.toLowerCase()
    }).length == 0;
    let builtInTitle = ""
    if (tagToEdit?.builtIn) {
        builtInTitle = interpreteBuiltInTagTitle(tagToEdit, t);
    }
    const isBuiltIn = builtInKey ? true : false;
    if (isBuiltIn && t(`terms.${builtInKey}`) != title) setTitle(t(`terms.${builtInKey}`));
    const [lang] = useLang();
    const titleToSave = (lang == "ar" && isBuiltIn) ? t(`terms.${builtInKey}`, { lng: "en" }) : title;
    const newTag = {
        builtIn: isBuiltIn,
        id: newTagId,
        ...tagToEdit,
        title: titleToSave,
        icon,
        unique: uniqueTitle,
    }
    useEffect(() => {
        setNewTag(newTag);
    }, [
        title, icon
    ]);

    return (

        <div className=" flex text-[0.9rem] flex-col  gap-[0.8rem]">
            <div className="flex flex-col  max-w-[22rem]">
                <KeyboardInput disabled={builtInTitle} value={builtInTitle || title} handleChange={handleTitleChange} label={t("fields.title")} placeholder={t("fields.enterTaskTitle")} className={`w-full ${className}`} {...props} />
                {!title && <WarningMessage className={"ms-[0.2rem] mt-[0.3rem]"}>{t("warnings.emptyTitle")}</WarningMessage>}
                {!uniqueTitle && <WarningMessage className={"ms-[0.2rem] mt-[0.3rem]"}>Title must be unique</WarningMessage>}
            </div>
            <ColorPicker className={"max-w-[22rem]"} color={color} setColor={setColor}></ColorPicker>
            <div className="flex">
                <div className="p-[0.5rem] overflow-x-auto" >
                    <p className="ms-[0.3rem] mb-[0.2rem]">{t("terms.tagCard")}</p>
                    <div className=" overflow-x-auto">
                        <TaskCategory active={[]} tag={newTag}></TaskCategory>
                    </div>
                </div>
                <div className="p-[0.5rem] max-w-1/2">
                    <p className="ms-[0.3rem] mb-[0.2rem]">{t("terms.tag")}</p>
                    <div className=" overflow-x-auto">
                        <MiniTag className=" min-w-[10rem] min-h-[1.83rem] py-[0.2rem] px-[0.7rem] rounded-full border" tag={newTag} ></MiniTag>
                    </div>
                </div>
            </div>
        </div>
    );
}