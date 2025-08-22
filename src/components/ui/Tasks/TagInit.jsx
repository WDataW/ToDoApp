
import { useLang, useTranslation } from "@/context/Language";
import { v4 as randomUUID } from "uuid";
import { KeyboardInput, WarningMessage, ColorPicker, TaskCategory } from "..";
import MiniTag from "./MiniTag";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/Theme";
import { interpreteBuiltInTagTitle, isBuiltInTitle, useAllTags } from "./tasks";
import ThemedCheckboxInput from "../checkboxes/ThemedCheckboxInput";
export default function TagInit({ setNewTag, tagToEdit, className = "", children, ...props }) {
    function handleTitleChange(e) {
        // if (tagToEdit?.builtIn) return;
        setTitle(e.target.value);
    }
    const [tags] = useAllTags();
    const [title, setTitle] = useState(tagToEdit.title);
    const t = useTranslation();
    const [home, setHome] = useState(tagToEdit.home);
    const builtInKey = isBuiltInTitle(title, t);
    function isUnique() {
        function isUniqueTitle() {
            return tags.filter((tag) => tag.title.toLowerCase() == title.toLowerCase()).length == 0;
        }
        function isUniqueBuiltInTitle() {
            return tags.filter((tag) => tag.title.toLowerCase() == t(`terms.${builtInKey}`, { lng: "en" }).toLowerCase()).length == 0;
        }
        function isTagToEditTitle() {
            if (tagToEdit.builtIn) {
                return t(`terms.${builtInKey}`, { lng: "en" }).toLowerCase() == tagToEdit.title.toLowerCase();
            }
            return title.toLowerCase() == tagToEdit.title.toLowerCase();
        }
        return (isUniqueTitle() && isUniqueBuiltInTitle()) || isTagToEditTitle();

    }
    const [theme] = useTheme();

    const defaultColor = getComputedStyle(document.documentElement).getPropertyValue(`--${theme}-theme-accent-color`).trim();
    const tagColor = tagToEdit.icon.replace("bg-[", "").replace("]", "");
    const [color, setColor] = useState(tagColor || defaultColor);
    const newTagId = `tag:${randomUUID()}`;
    let icon = `bg-[${color}]`;
    const uniqueTitle = isUnique();

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
        color,
        unique: uniqueTitle,
        home,
    }
    useEffect(() => {
        setNewTag(newTag);
    }, [
        title, icon, home
    ]);

    return (

        <div className=" flex text-[0.9rem] flex-col  gap-[0.8rem]">
            <div className="flex flex-col  max-w-[22rem]">
                <KeyboardInput disabled={builtInTitle} value={builtInTitle || title} handleChange={handleTitleChange} label={t("fields.title")} placeholder={t("fields.enterTaskTitle")} className={`w-full ${className}`} {...props} />
                {!title && <WarningMessage className={"ms-[0.2rem] mt-[0.3rem]"}>{t("warnings.emptyTitle")}</WarningMessage>}
                {!uniqueTitle && <WarningMessage className={"ms-[0.2rem] mt-[0.3rem]"}>{t("terms.uniqueTitle")}</WarningMessage>}
            </div>
            <ColorPicker className={"max-w-[22rem]"} color={color} setColor={setColor}></ColorPicker>

            <div className="flex">
                <div className="p-[0.5rem] overflow-x-auto" >
                    <p className="ms-[0.3rem] mb-[0.2rem]">{t("terms.tagCard")}</p>
                    <div className=" overflow-x-auto rounded-[0.5rem]">
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
            <div>
                <label className="ms-[0.3rem] gap-[0.5rem] flex items-center">
                    <span>{t("terms.addToHome")}</span>
                    <ThemedCheckboxInput checked={home} handleChange={(e) => { setHome(!home) }} className="" />
                </label>
            </div>
        </div>
    );

}