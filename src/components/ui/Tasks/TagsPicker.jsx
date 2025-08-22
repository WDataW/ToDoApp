import { useRef, useState } from "react";
import MiniTag from "./MiniTag";
import { useAllTags } from "./tasks";
import { SectionContainer } from "../containers";
import { useTheme } from "@/context/Theme";
import { useTranslation } from "@/context/Language";
import { hidePageContents, showPageContents } from "@/Pages/pages";
import { createPortal } from "react-dom";
import { EditTag } from ".";

const plusIcons = {
    dark: "bg-[url(/src/assets/icons/dark/plus.svg)]",
    light: "bg-[url(/src/assets/icons/light/plus.svg)]"
}

export default function tagsPicker({ noNewTags, close, className = "", selectedTags, setSelectedTags }) {
    const [createTagMode, setCreateTagMode] = useState(false);

    function createTag() {
        hidePageContents(selfRef.current, true)
        setCreateTagMode(true);
    }
    function stopCreatingTag() {
        showPageContents(selfRef.current, true)
        setCreateTagMode(false);

    }


    function handleAddTag() {
        createTag();
    }
    function handleTagClick(e) {
        const newTags = tags.filter((tag) => tag.title !== e.currentTarget.id);
        setTags(newTags);

        const newSelectedTags = [...tags.filter((tag) => tag.title == e.currentTarget.id), ...selectedTags,]
        setSelectedTags(newSelectedTags);
    }

    function handleSelectedTagClick(e) {
        const newSelectedTags = selectedTags.filter((tag) => tag.title !== e.currentTarget.id);
        setSelectedTags(newSelectedTags);

        const newTags = [...selectedTags.filter((tag) => tag.title == e.currentTarget.id), ...tags];
        setTags(newTags);

    }
    const [theme] = useTheme();
    const t = useTranslation();
    const selfRef = useRef();
    const [tags, setTags] = useState(useAllTags(false)[0].filter((tag) => !selectedTags.includes(tag)));

    return (<>
        {createTagMode && createPortal(<EditTag yesFunc={(newTag) => { setTags([newTag, ...tags]) }} overAnOverlay={true} heading={t("terms.createTag")} close={stopCreatingTag} yes={t("terms.create")} no={t("terms.cancel")} />, selfRef.current.closest(".overlay-target"))}

        <SectionContainer >
            <p className="ps-[0.3rem] pb-[0.3rem]">{t("terms.availableTags")}</p>
            <div ref={selfRef} className={`${className}`} >
                <ul className="flex overflow-x-auto gap-[0.3rem] pb-[0.3rem] mb-[1rem] ">
                    <li key={"createNewTag"} aria-label="Create new tag">
                        <button onClick={handleAddTag} className="inline-block h-[1.7rem] w-[1.7rem] aspect-square rounded-full border text-nowrap">
                            <span className={`opacity-60 inline-block h-full w-full  ${plusIcons[theme]} bg-center bg-[length:1.3rem_1.3rem] bg-no-repeat`} />
                        </button>
                    </li>
                    {tags.map((tag, i) => {
                        return <li key={i}>
                            <button id={tag.title} onClick={handleTagClick}>
                                <MiniTag className=" py-[0.2rem] px-[0.7rem] rounded-full border" key={i} tag={tag} />
                            </button>
                        </li>
                    })}
                </ul>
            </div>
            <p className="ps-[0.3rem] pb-[0.3rem]">{t("terms.selectedTags")}</p>
            <div className={` overflow-x-auto pb-[0.3rem]  ${className}`} >
                <ul className="flex overflow-x-auto gap-[0.3rem] pb-[0.3rem]">
                    {selectedTags.map((tag, i) => {
                        return <li key={i}>
                            <button id={tag.title} onClick={handleSelectedTagClick}>
                                <MiniTag className="py-[0.2rem] px-[0.7rem] rounded-full border" key={i} tag={tag} />
                            </button>
                        </li>
                    })}
                    {selectedTags.length == 0 && <p className="p-[0.25rem] opacity-60 ms-[0.3rem]">{t("terms.noSelectedTags")}</p>}
                </ul>

            </div>
        </SectionContainer>
    </>
    );
}