import { OverlayPage } from "@/Pages";
import { Main, YesNoButtons } from "..";
import TagInit from "./tagInit";
import { useState } from "react";
import { isBuiltInTitle, useEditTag } from "./tasks";
import { useTranslation } from "@/context/Language";
export default function EditTag({ yesFunc, setActiveTags, activeTags, close, tagToEdit = { title: "", icon: "" }, yes, no, className = "", children, ...props }) {
    const editTag = useEditTag();
    const [newTag, setNewTag] = useState();
    const t = useTranslation();
    function save() {
        editTag(newTag);
        if (activeTags && activeTags.length == 0) setActiveTags(newTag.builtIn ? [t(`terms.${isBuiltInTitle(newTag.title, t)}`)] : [newTag.id]);
        if (yesFunc) yesFunc(newTag);
        close();
    }

    return (
        <OverlayPage close={close} className={`${className}`} {...props}>
            <Main className="flex items-center flex-col ">
                <div className="max-w-full  sm:max-w-[22rem]  ">
                    <TagInit setNewTag={setNewTag} tagToEdit={tagToEdit}></TagInit>
                    <YesNoButtons disabled={!newTag?.title || !newTag?.unique} className="justify-center flex mt-[1rem] text-[0.9rem]" yesFunc={save} yes={yes} noFunc={close} no={no} />
                </div>
            </Main>
        </OverlayPage>
    );
}