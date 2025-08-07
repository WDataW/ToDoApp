import { OverlayPage } from "@/Pages";
import { Main, YesNoButtons } from "..";
import TagInit from "./tagInit";
import { useState } from "react";
import { useEditTag } from "./tasks";
export default function EditTag({ close, tagToEdit = { title: "", icon: "" }, yes, no, className = "", children, ...props }) {
    const editTag = useEditTag();
    const [newTag, setNewTag] = useState();
    function save() {

        editTag(newTag);
        close();
    }

    return (
        <OverlayPage close={close} className={`${className}`} {...props}>
            <Main className="flex items-center flex-col ">
                <div className="max-w-full  sm:max-w-[22rem]  ">
                    <TagInit setNewTag={setNewTag} tagToEdit={tagToEdit}></TagInit>
                    <YesNoButtons disabled={!newTag?.title} className="justify-center flex mt-[1rem] text-[0.9rem]" yesFunc={save} yes={yes} noFunc={close} no={no} />
                </div>
            </Main>
        </OverlayPage>
    );
}