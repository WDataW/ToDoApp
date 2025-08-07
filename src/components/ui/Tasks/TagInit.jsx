
import { useTranslation } from "@/context/Language";
import { KeyboardInput, WarningMessage, ColorPicker, TaskCategory } from "..";
import MiniTag from "./MiniTag";
import { useEffect, useState } from "react";
import { useTheme } from "@/context/Theme";
import { useTags } from "@/context/User";
import { interpreteBuiltInTagTitle } from "./tasks";
export default function TagInit({ setNewTag, tagToEdit, className = "", children, ...props }) {
    function handleTitleChange(e) {
        // if (tagToEdit?.builtIn) return;
        setTitle(e.target.value);
    }


    const t = useTranslation();
    const [theme] = useTheme();

    const [title, setTitle] = useState(tagToEdit.title);
    const defaultColor = getComputedStyle(document.documentElement).getPropertyValue(`--${theme}-theme-accent-color`).trim();
    const tagColor = tagToEdit.icon.replace("bg-[", "").replace("]", "");
    const [color, setColor] = useState(tagColor || defaultColor);
    const newTagId = `tag:${crypto.randomUUID()}`;
    let icon = `bg-[${color}]`;

    let builtInTitle = ""
    if (tagToEdit?.builtIn) {
        builtInTitle = interpreteBuiltInTagTitle(tagToEdit);
    }

    const newTag = {
        id: newTagId,
        ...tagToEdit,
        title,
        icon,
    }
    useEffect(() => {
        setNewTag(newTag);
    }, [
        title, icon
    ]);

    const [tags] = useTags();
    const uniqueTitle = tags.filter((tag) => tag.title.toLowerCase() == title.toLowerCase() && title.toLowerCase() != tagToEdit.title.toLowerCase()).length == 0;
    return (

        <div className=" flex text-[0.9rem] flex-col  gap-[0.8rem]">
            <div className="flex flex-col  max-w-[22rem]">
                <KeyboardInput disabled={builtInTitle} value={builtInTitle || title} handleChange={handleTitleChange} label={t("fields.title")} placeholder={t("fields.enterTaskTitle")} className={`w-full ${className}`} {...props} />
                {!title ? <WarningMessage className={"ms-[0.2rem] mt-[0.3rem]"}>{t("warnings.emptyTitle")}</WarningMessage> : <></>}
                {!uniqueTitle ? <WarningMessage className={"ms-[0.2rem] mt-[0.3rem]"}>Title must be unique</WarningMessage> : <></>}
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